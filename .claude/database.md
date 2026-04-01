# Database Rules — PostgreSQL + PostGIS + Drizzle ORM

## Setup Requirements

The PostgreSQL instance must have the PostGIS extension enabled before running any migrations. On Railway, run `CREATE EXTENSION IF NOT EXISTS postgis;` once after provisioning the database. This is a prerequisite for all geometry columns to work.

The Drizzle instance is exported from `apps/api/src/db/index.ts` and injected as a NestJS provider via `DbModule`. Never import the Drizzle instance directly from outside this module — always inject it.

---

## Schema Conventions

- Table names: `snake_case`, plural (e.g. `users`, `vehicles`, `trip_points`)
- Column names: `snake_case`
- Primary keys: `id` using `uuid` type, defaulting to `gen_random_uuid()`
- Foreign keys: named `[referenced_table_singular]_id` (e.g. `vehicle_id`, `user_id`)
- Timestamps: all tables have `created_at` defaulting to `now()`. Tables that are mutated also have `updated_at` managed via Drizzle's `$onUpdate`.
- Soft deletes: not used. Records are hard-deleted.
- Boolean columns: prefixed with `is_` (e.g. `is_active`, `is_synced`)

---

## Table Definitions

### users
Managed by better-auth. Do not manually create or alter this table outside of better-auth's drizzle adapter. The adapter creates `users`, `sessions`, `accounts` and `verifications` tables automatically.

```
id            text        PK   (better-auth uses cuid2 strings, not uuid)
name          text        NOT NULL
email         text        NOT NULL UNIQUE
email_verified boolean    NOT NULL DEFAULT false
image         text        NULLABLE
created_at    timestamp   NOT NULL DEFAULT now()
updated_at    timestamp   NOT NULL DEFAULT now()
```

### vehicles
```
id            uuid        PK   DEFAULT gen_random_uuid()
user_id       text        NOT NULL REFERENCES users(id) ON DELETE CASCADE
brand         text        NOT NULL
model         text        NOT NULL
year          integer     NOT NULL
color         text        NULLABLE
plate         text        NULLABLE
initial_km    numeric     NOT NULL DEFAULT 0
current_km    numeric     NOT NULL DEFAULT 0
image_url     text        NULLABLE
created_at    timestamp   NOT NULL DEFAULT now()
updated_at    timestamp   NOT NULL DEFAULT now()
```

### trips
```
id               uuid       PK   DEFAULT gen_random_uuid()
vehicle_id       uuid       NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE
user_id          text       NOT NULL REFERENCES users(id) ON DELETE CASCADE
status           text       NOT NULL DEFAULT 'in_progress'  -- 'in_progress' | 'completed' | 'cancelled'
started_at       timestamp  NOT NULL DEFAULT now()
ended_at         timestamp  NULLABLE
distance_meters  numeric    NULLABLE   -- calculated by PostGIS on finalization
duration_seconds integer    NULLABLE
avg_speed_kmh    numeric    NULLABLE
max_speed_kmh    numeric    NULLABLE
elevation_gain_m numeric    NULLABLE
route_geography  geography  NULLABLE   -- GEOGRAPHY(LineString, 4326) — stored on finalization
created_at       timestamp  NOT NULL DEFAULT now()
```

### trip_points
```
id           bigserial   PK   (auto-increment, not uuid — high write volume)
trip_id      uuid        NOT NULL REFERENCES trips(id) ON DELETE CASCADE
location     geography   NOT NULL   -- GEOGRAPHY(Point, 4326)
speed_mps    numeric     NULLABLE   -- meters per second from GPS
altitude_m   numeric     NULLABLE
recorded_at  timestamp   NOT NULL   -- device timestamp, not server timestamp
```

Index required: `CREATE INDEX idx_trip_points_trip_id_recorded_at ON trip_points(trip_id, recorded_at);`

### maintenance_records
```
id               uuid       PK   DEFAULT gen_random_uuid()
vehicle_id       uuid       NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE
type             text       NOT NULL  -- 'oil_change' | 'tire' | 'brake' | 'chain' | 'air_filter' | 'brake_fluid' | 'custom'
label            text       NULLABLE  -- custom label when type = 'custom'
done_at_km       numeric    NULLABLE
done_at          timestamp  NOT NULL DEFAULT now()
next_alert_km    numeric    NULLABLE
next_alert_date  timestamp  NULLABLE
notes            text       NULLABLE
cost             numeric    NULLABLE
alert_sent_at    timestamp  NULLABLE  -- prevents duplicate push notifications
created_at       timestamp  NOT NULL DEFAULT now()
```

### fuel_logs
```
id              uuid       PK   DEFAULT gen_random_uuid()
vehicle_id      uuid       NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE
liters          numeric    NOT NULL
price_per_liter numeric    NULLABLE
total_cost      numeric    NULLABLE
km_at_fueling   numeric    NOT NULL
logged_at       timestamp  NOT NULL DEFAULT now()
created_at      timestamp  NOT NULL DEFAULT now()
```

### push_tokens
```
id          uuid       PK   DEFAULT gen_random_uuid()
user_id     text       NOT NULL REFERENCES users(id) ON DELETE CASCADE
token       text       NOT NULL UNIQUE
platform    text       NOT NULL  -- 'ios' | 'android'
created_at  timestamp  NOT NULL DEFAULT now()
```

---

## PostGIS Queries

All PostGIS operations must use Drizzle's tagged `sql` template. Always add a comment above the query explaining what the PostGIS function does.

### Calculate trip distance from points
```typescript
// ST_MakeLine builds a LineString from ordered points.
// ST_Length on a geography column returns distance in meters.
const result = await db.execute(sql`
  SELECT
    ST_Length(
      ST_MakeLine(location::geometry ORDER BY recorded_at)::geography
    ) AS distance_meters
  FROM trip_points
  WHERE trip_id = ${tripId}
`);
```

### Store route as LineString on trip finalization
```typescript
// Build and store the route geography for future spatial queries and exports.
await db.execute(sql`
  UPDATE trips SET
    route_geography = (
      SELECT ST_MakeLine(location::geometry ORDER BY recorded_at)::geography
      FROM trip_points WHERE trip_id = ${tripId}
    )
  WHERE id = ${tripId}
`);
```

### Insert a GPS point
```typescript
// Always use ST_MakePoint(longitude, latitude) — note the order: lng first.
await db.execute(sql`
  INSERT INTO trip_points (trip_id, location, speed_mps, altitude_m, recorded_at)
  VALUES (
    ${tripId},
    ST_SetSRID(ST_MakePoint(${point.longitude}, ${point.latitude}), 4326)::geography,
    ${point.speedMps},
    ${point.altitudeM},
    ${point.recordedAt}
  )
`);
```

---

## Elevation Gain Calculation

Elevation gain is the sum of all positive altitude differences between consecutive points ordered by `recorded_at`. A negative difference (going downhill) is ignored — only uphill meters are counted.

```typescript
const result = await db.execute(sql`
  SELECT COALESCE(SUM(diff), 0) AS elevation_gain_m
  FROM (
    SELECT
      altitude_m - LAG(altitude_m) OVER (ORDER BY recorded_at) AS diff
    FROM trip_points
    WHERE trip_id = ${tripId} AND altitude_m IS NOT NULL
  ) AS diffs
  WHERE diff > 0
`);
```

---

## Fuel Consumption Calculation

Average consumption (km/l) is calculated from the fuel_logs table by dividing the km difference between consecutive entries by the liters used. This must be calculated on-the-fly when requested — do not store a pre-calculated value that could become stale.

```typescript
// Returns avg km/l for a vehicle based on the last N fuel entries (default: all)
const result = await db.execute(sql`
  SELECT
    AVG((km_at_fueling - prev_km) / liters) AS avg_km_per_liter
  FROM (
    SELECT
      liters,
      km_at_fueling,
      LAG(km_at_fueling) OVER (ORDER BY logged_at) AS prev_km
    FROM fuel_logs
    WHERE vehicle_id = ${vehicleId}
    ORDER BY logged_at
  ) AS pairs
  WHERE prev_km IS NOT NULL AND liters > 0
`);
```

---

## Migrations

- Development: use `drizzle-kit push` to apply schema changes directly.
- Production: use `drizzle-kit generate` to create migration files, then `drizzle-kit migrate` as part of the Railway deploy pipeline.
- Never edit generated migration files manually.
- Migration files are committed to the repository in `apps/api/src/db/migrations/`.
- The Railway deploy command is: `node dist/main && drizzle-kit migrate`. Run migrations before starting the server.

---

## Performance Rules

- The `trip_points` table will grow very fast. Always filter by `trip_id` first in any query. Never do a full table scan.
- For the Live Tracking screen, do not query `trip_points` for real-time display. The mobile client renders points from its local buffer. The API only reads points during finalization.
- When listing trips, never join `trip_points` — use only the aggregated columns stored on the `trips` table (`distance_meters`, `avg_speed_kmh`, etc.).
- Add database indexes for all foreign keys and for any column used in WHERE clauses.
