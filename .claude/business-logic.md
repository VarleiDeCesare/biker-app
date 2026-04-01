# Business Logic Rules

## Vehicles

A user can register unlimited vehicles. Each vehicle has an `initial_km` set at registration time and a `current_km` that is updated automatically after every completed trip. The `current_km` is updated by adding `distance_meters / 1000` from the completed trip to the previous `current_km`. This update happens inside the trip finalization transaction — never update `current_km` separately.

When a vehicle is deleted, all associated trips, trip_points, maintenance_records, fuel_logs and push_tokens are deleted via database CASCADE. There is no soft delete.

---

## Trip Lifecycle

A trip has three possible statuses: `in_progress`, `completed` and `cancelled`.

A trip is created with status `in_progress` when the rider taps "Start Ride". Only one trip per user can have status `in_progress` at any time. Before creating a new trip, the API must check if there is an existing `in_progress` trip for the user and return a `409 Conflict` if one exists.

A trip transitions to `completed` when the rider taps "Stop" and the client calls `PATCH /trips/:id/finish`. At this point the API calculates all stats, stores the route geography and updates `vehicle.current_km`. A completed trip is immutable — its stats and route cannot be changed after finalization.

A trip transitions to `cancelled` if the rider discards the trip from the Trip Summary screen via `DELETE /trips/:id`. A cancelled trip and all its points are permanently deleted.

A trip with zero distance (all points at the same location or fewer than 2 points) can be finalized but will have `distance_meters = 0`. The mobile client should warn the user before saving a trip with distance below 100 meters.

---

## Maintenance Alerts

Each maintenance record can have two independent alert triggers: `next_alert_km` (a vehicle odometer reading) and `next_alert_date` (a calendar date). Either, both or neither can be set.

Alert status shown in the UI is derived at query time, never stored:
- **OK**: `current_km < next_alert_km - 200` AND `next_alert_date > today + 7 days` (or the field is null)
- **Due soon**: `current_km` is within 200 km of `next_alert_km`, OR `next_alert_date` is within 7 days
- **Overdue**: `current_km >= next_alert_km`, OR `next_alert_date < today`

If both km and date triggers exist, the status shown is the most severe one.

The push notification scheduler (daily cron at 08:00 Brasília time) sends a notification when an alert transitions to "Due soon" or "Overdue". It checks `alert_sent_at` to avoid sending the same alert twice. Once a new maintenance record is logged for the same type on the same vehicle, the previous record's alert is considered resolved and will not trigger new notifications.

---

## Fuel Consumption

Average fuel consumption (km/l) requires at least two fuel log entries to be calculated — the first entry establishes the odometer reference, the second entry provides the distance driven since then. If fewer than two entries exist for a vehicle, show "—" in the UI instead of a calculated value.

Total fuel cost for the current month is the sum of `total_cost` across all `fuel_logs` entries for the vehicle where `logged_at` falls within the current calendar month.

When the user logs a fuel entry, `km_at_fueling` must be greater than or equal to the vehicle's `current_km`. If the user enters a value lower than `current_km`, return a `400 Bad Request` with a clear message.

---

## Speed Calculations

The API receives speed in meters per second (`speed_mps`) from the GPS sensor. All speed values stored in the database are in meters per second. All speed values returned to the client in API responses are converted to km/h by the service layer (multiply by 3.6). The mobile client stores `speed_mps` internally and converts for display using `src/utils/units.ts`.

Average speed is the arithmetic mean of all non-null `speed_mps` values for the trip, converted to km/h.

Maximum speed is the highest `speed_mps` value recorded for the trip, converted to km/h.

Suspiciously high speed readings (above 300 km/h, i.e. 83.3 m/s) are considered GPS noise and must be excluded from average and max speed calculations. Log these outliers for debugging but do not store them in the stats.

---

## Distance Calculation

Distance is calculated using `ST_Length` on a `GEOGRAPHY` type, which returns the geodesic distance in meters (accurate for real-world distances on the Earth's surface, accounting for curvature). Do not use `ST_Length` on a `GEOMETRY` type for this purpose — it returns planar distance in the coordinate unit, which is degrees, not meters.

---

## Profile Statistics

The lifetime stats shown on the Profile screen are:

- **Total km**: sum of `distance_meters / 1000` across all `completed` trips for the user
- **Total rides**: count of `completed` trips for the user
- **Total hours**: sum of `duration_seconds / 3600` across all `completed` trips for the user, rounded to one decimal place

These are calculated on-the-fly via a single aggregation query on the `trips` table filtered by `user_id` and `status = 'completed'`. Do not cache these values — they are cheap to compute.

---

## Navigation Structure (Mobile)

The app has 4 bottom tabs: Home, Ride, History and Profile.

**Home tab** is the dashboard. It shows the currently selected vehicle (or a CTA to add one), any active maintenance alerts, a quick stats summary for the current month, a shortcut to start a ride and the most recent trip card.

**Ride tab** is the GPS tracking flow. It is a linear three-screen flow: Pre-Ride → Live Tracking → Trip Summary. While a ride is `in_progress`, the bottom tab bar must be hidden and replaced only by the Live Tracking screen. The user cannot navigate away from Live Tracking using the tab bar while a ride is active — they must stop the ride first.

**History tab** shows all completed trips. It supports filtering by vehicle and date range. Tapping a trip opens the Trip Detail screen.

**Profile tab** combines the rider profile and the garage (list of vehicles). From here the user can navigate to Bike Detail, which contains the Maintenance and Fuel sub-screens. Settings are also accessible from this tab.

---

## Garage Rules

The "currently selected bike" is the vehicle the user last rode or manually selected on the Pre-Ride screen. It is persisted in MMKV on the mobile client. It is not stored server-side. If a user has only one vehicle, it is automatically selected. If the selected vehicle is deleted, the selection is cleared and the user is prompted to select or add a vehicle.

---

## Notifications Content

Maintenance alert push notification format:
- Title: `"[Vehicle brand + model]"`
- Body (Due soon): `"[Item name] is due in [X km] or [X days]. Time for a check."`
- Body (Overdue): `"[Item name] is overdue by [X km] or [X days]. Schedule a service."`

Oil change is the highest priority maintenance type. If the oil change alert is overdue, the Home dashboard must show a prominent orange banner regardless of whether the user has seen the push notification.
