# Mobile Rules — React Native (Expo)

## Stack

- Framework: React Native with Expo (bare workflow)
- Language: TypeScript strict mode
- Navigation: Expo Router v3+ (file-based routing)
- Maps: Mapbox (`@rnmapbox/maps`)
- GPS Tracking: `expo-location` + `expo-task-manager`
- Local database (offline): WatermelonDB (`@nozbe/watermelondb`)
- State management: Zustand
- Auth client: `better-auth/react-native`
- Session storage: MMKV (`react-native-mmkv`)
- Push notifications: `expo-notifications`
- Network detection: `@react-native-community/netinfo`
- Charts: `victory-native` (XL / Skia)
- HTTP client: `axios` with a typed API client wrapper
- Build: EAS Build

---

## Project Structure (apps/mobile)

```
apps/mobile/
├── app/                    # Expo Router pages (file-based routing)
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── onboarding.tsx
│   ├── (tabs)/
│   │   ├── index.tsx           # Home / Dashboard
│   │   ├── ride/
│   │   │   ├── index.tsx       # Pre-Ride
│   │   │   ├── tracking.tsx    # Live Tracking
│   │   │   └── summary.tsx     # Trip Summary
│   │   ├── history/
│   │   │   ├── index.tsx       # Trip List
│   │   │   └── [id].tsx        # Trip Detail
│   │   └── profile/
│   │       ├── index.tsx       # Profile + Garage
│   │       └── bikes/
│   │           ├── [id].tsx    # Bike Detail
│   │           └── [id]/
│   │               ├── maintenance.tsx
│   │               └── fuel.tsx
│   └── _layout.tsx
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Design system primitives
│   │   └── domain/         # Business-domain components
│   ├── stores/             # Zustand stores
│   ├── services/           # API client, location, notifications
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Pure utility functions
│   ├── constants/          # Colors, spacing, config
│   └── tasks/              # Expo background tasks
├── assets/
├── app.json
├── eas.json
└── .env.example
```

---

## Design System Constants

All colors, spacing values and typography must be imported from `src/constants/theme.ts`. Never hardcode hex values or spacing numbers directly in component files.

```typescript
// src/constants/theme.ts
export const colors = {
  background: '#0D0D0D',
  surface: '#1A1A1A',
  surfaceRaised: '#242424',
  primary: '#FF4D00',
  primarySoft: '#FF8C42',
  textPrimary: '#F5F5F5',
  textMuted: '#888888',
  success: '#2ECC71',
  danger: '#E74C3C',
  divider: '#2A2A2A',
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
} as const;

export const radius = {
  sm: 4, md: 8, lg: 16, xl: 24,
} as const;
```

---

## Component Rules

- Every component lives in `src/components/`. UI primitives (Button, Input, Card, Badge, StatCard) go in `src/components/ui/`. Domain components (TripCard, BikeCard, MaintenanceRow, FuelEntryRow) go in `src/components/domain/`.
- Component files are named in `PascalCase` (e.g. `StatCard.tsx`, `TripCard.tsx`).
- Every component that accepts props must have its props type defined in the same file, named `[ComponentName]Props`.
- Never use inline styles for anything that is part of the design system (colors, spacing, radius). Always use `StyleSheet.create()` referencing `theme` constants.
- Inline styles are only acceptable for truly one-off dynamic values (e.g. a width calculated at runtime).

```typescript
// Good
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
  },
});

// Bad
<View style={{ backgroundColor: '#1A1A1A', padding: 16 }} />
```

---

## Navigation (Expo Router)

- File-based routing via Expo Router v3. The `app/` directory maps directly to routes.
- Tab navigation is defined in `app/(tabs)/_layout.tsx` with exactly 4 tabs: Home, Ride, History, Profile.
- Auth screens live in `app/(auth)/`. Use a root layout guard to redirect unauthenticated users to `/(auth)/login`.
- Never use `react-navigation` directly. Always use Expo Router's `useRouter`, `useLocalSearchParams`, `Link` and `Stack`/`Tabs` components.
- Route parameters are typed using Expo Router's typed routes feature.

---

## State Management (Zustand)

Each domain has its own Zustand store in `src/stores/`. Stores are named `use[Domain]Store` (e.g. `useVehiclesStore`, `useTripStore`, `useAuthStore`).

```typescript
// Store structure convention
interface VehiclesStore {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  selectVehicle: (id: string) => void;
}
```

Never put API calls directly in components. Always go through a store action or a custom hook. Stores call the API service from `src/services/api/`.

---

## API Client

All HTTP calls go through a typed API client at `src/services/api/client.ts` built on top of `axios`. The client automatically attaches the auth session token from MMKV to every request. It handles 401 responses by attempting a session refresh and retrying once. If the refresh fails, it clears the session and redirects to login.

Each resource has its own API service file (e.g. `src/services/api/vehicles.ts`, `src/services/api/trips.ts`) that exports typed functions. Never call `axios` directly from components or stores — always use these service functions.

---

## Authentication (Better-Auth)

Use the `better-auth/react-native` client configured in `src/services/auth/client.ts`. The session is persisted using MMKV via a custom storage adapter. The `useAuthStore` manages the session state and exposes `signIn`, `signUp`, `signOut` and `session` to the rest of the app. On app start, the root layout checks for an existing session and redirects accordingly.

---

## GPS Tracking

The background location task is defined in `src/tasks/location-task.ts` using `expo-task-manager`. The task name constant is `BACKGROUND_LOCATION_TASK` exported from `src/constants/tasks.ts`.

When a ride starts, the `useTripStore` action `startRide(vehicleId)` calls the API to create a trip record and then starts the background location task via `Location.startLocationUpdatesAsync`. Location config: `accuracy: Location.Accuracy.BestForNavigation`, `distanceInterval: 10` (meters), `timeInterval: 3000` (ms).

Points are accumulated in the `useTripStore` local buffer (`pendingPoints`). A separate interval (every 10 seconds) flushes the buffer to the API via `POST /trips/:id/points`. If the flush fails due to network unavailability, points are written to WatermelonDB for later sync.

When a ride stops, `stopRide()` flushes any remaining pending points, calls `PATCH /trips/:id/finish` to trigger server-side stat calculation, and then stops the location task.

The Live Tracking screen reads speed from the most recent location update in the store, not from a separate calculation. Speed unit conversion (km/h to mph) is handled in a utility function at `src/utils/units.ts`.

---

## Offline Support (WatermelonDB)

WatermelonDB is used exclusively for offline trip point buffering. It is not a general-purpose local cache. The schema has a single `pending_trip_points` table with columns: `trip_id`, `latitude`, `longitude`, `speed_mps`, `altitude_m`, `recorded_at`, `synced_at`.

The `OfflineSyncService` at `src/services/offline-sync.ts` listens for network reconnection via NetInfo and flushes unsynced points to the API in batches of 50. After a successful flush, it marks the records as synced. A cleanup job deletes synced records older than 24 hours.

---

## Push Notifications

On first app launch after login, register the device for push notifications via `expo-notifications` and save the Expo Push Token to the API via `POST /push-tokens`. Request permission before registering. If permission is denied, do not retry automatically — respect the user's choice and show a settings prompt only if the user explicitly enables reminders in the Profile settings.

Notification handlers are configured in the root layout. Tapping a maintenance alert notification navigates to the relevant bike's maintenance screen.

---

## Live Tracking Screen Rules

This screen is used while the phone is mounted on the handlebars. Apply these rules strictly:

- The current speed display must be at minimum 72sp font size, monospace, in white or `colors.primary`.
- The stop button must be at minimum 64x64dp with a red background, positioned in the top-right corner always reachable by thumb.
- No animations on this screen except the polyline updating.
- Keep the screen always-on while tracking using `expo-keep-awake`.
- Disable any gesture-based navigation (swipe back) while a ride is active.
- Show elapsed time and distance in large type below the speed. These update every second.

---

## Charts (Victory Native XL)

Use `victory-native` with Skia renderer for all charts. Charts appear in Trip Summary, Trip Detail and the Bike Detail fuel tab. Always set explicit `width` and `height` via `useWindowDimensions`. Use `colors.primary` (`#FF4D00`) for line strokes and `colors.surface` for chart backgrounds. No grid lines. No axis labels unless they add clear value. Keep charts minimal.

---

## Error Handling in UI

Every screen that loads async data must handle three states: loading (show a skeleton or spinner), error (show an error message with a retry button) and empty (show an empty state illustration with a CTA). Never show a blank screen. Use a `useAsyncData` custom hook at `src/hooks/useAsyncData.ts` to standardize this pattern.

---

## EAS Build Configuration

`eas.json` must define three profiles: `development` (debug build, internal distribution), `preview` (release build, internal distribution, used for QA) and `production` (release build, store submission). Environment variables for each profile are managed via EAS Secrets, not committed to the repository.
