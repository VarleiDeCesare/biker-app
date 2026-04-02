# Mobile Rules — Expo + React Native

## Stack

- Framework: Expo SDK 52, React Native 0.76, TypeScript strict mode
- Routing: Expo Router v4 (file-based routing)
- UI: NativeWind v4 (Tailwind CSS for React Native) + lucide-react-native icons
- Forms: react-hook-form + zod + @hookform/resolvers
- Data fetching: TanStack Query v5
- Auth client: better-auth (configured for React Native)
- Animation: react-native-reanimated v3
- SVG: react-native-svg
- Testing: Jest + @testing-library/react-native

---

## Project Structure (apps/mobile)

```
apps/mobile/
├── app/                     # Expo Router — file-based routing
│   ├── _layout.tsx          # Root Stack layout (providers, fonts)
│   ├── index.tsx            # / → Onboarding
│   ├── login.tsx            # /login
│   ├── register.tsx         # /register
│   ├── live-tracking.tsx    # /live-tracking (no tab bar)
│   ├── trip-summary.tsx     # /trip-summary (no tab bar)
│   ├── trip-detail.tsx      # /trip-detail (no tab bar)
│   ├── bike-detail.tsx      # /bike-detail (no tab bar)
│   └── (tabs)/
│       ├── _layout.tsx      # Tab navigator config
│       ├── dashboard.tsx    # /dashboard
│       ├── ride.tsx         # /ride
│       ├── history.tsx      # /history
│       └── profile.tsx      # /profile
├── src/
│   ├── components/
│   │   ├── ride/            # Domain components (converted to RN primitives)
│   │   └── charts/          # SimpleLineChart (SVG-based)
│   └── theme.ts             # Color/spacing constants
├── global.css               # Tailwind/NativeWind directives
├── tailwind.config.ts       # Hardcoded color values (no CSS vars)
├── metro.config.js          # Metro + NativeWind + monorepo config
├── babel.config.js          # babel-preset-expo + nativewind + reanimated
├── app.json                 # Expo config
├── tsconfig.json            # Extends expo/tsconfig.base
└── .env.example
```

---

## React Native Primitives Mapping

| Web (old)           | React Native (new)                            |
|---------------------|-----------------------------------------------|
| `<div>`             | `<View>`                                      |
| `<button onClick>`  | `<Pressable onPress>`                         |
| `<p>`, `<span>`, `<h1-6>` | `<Text>`                              |
| `<input>`           | `<TextInput>`                                 |
| `<svg>`, `<path>`   | `<Svg>`, `<Path>` from react-native-svg       |
| overflow-x scroll   | `<ScrollView horizontal showsHorizontalScrollIndicator={false}>` |
| `useNavigate()`     | `useRouter()` from expo-router                |
| `navigate('/path')` | `router.push('/path')`                        |
| `navigate(-1)`      | `router.back()`                               |

---

## Design System Constants

All colors are in `src/theme.ts`. Never hardcode hex values in component files. Import `colors` from `@/theme`.

For icon colors, use the `color` prop directly: `<Play size={18} color={colors.primary} />`.

NativeWind Tailwind classes like `bg-primary`, `text-muted-foreground` etc. map to the colors defined in `tailwind.config.ts`.

---

## Styling Rules

- Use NativeWind `className` prop for all styling — same Tailwind classes as the web design.
- `min-h-screen` is replaced by `flex-1` with `<SafeAreaView>`.
- `pt-14` (status bar spacing) is handled by `<SafeAreaView edges={['top']}>`.
- `pb-20` (bottom nav spacing) is handled by the Expo Router tab bar automatically.
- `fixed inset-0` → use absolute positioning with `StyleSheet.absoluteFill` or insets.
- `grid grid-cols-N` → use `flex-row` with `flex-1` children.
- `overflow-x-auto` → `<ScrollView horizontal>`.
- No inline styles. Use NativeWind classes or the `style` prop with `StyleSheet`.

---

## Routing (Expo Router v4)

- Screens inside `app/(tabs)/` inherit the tab bar.
- Screens outside `(tabs)` at the root level are stack screens (no tab bar).
- Use `useRouter()` from `expo-router`. Never call `router.push` inside render — only in event handlers or effects.
- Route segments follow kebab-case.

---

## Data Fetching (TanStack Query)

Same rules as before — all server state through TanStack Query, query keys follow `[resource, ...params]`, mutations invalidate on success.

---

## Authentication (better-auth)

Configure the better-auth client for React Native. Use `AsyncStorage` as the storage adapter instead of cookies.

---

## Environment Variables

Use `EXPO_PUBLIC_` prefix (replaces `VITE_`). Access via `process.env.EXPO_PUBLIC_*`. Document in `apps/mobile/.env.example`.

---

## Error Handling in UI

Same rule: every async component handles loading, error and empty states. Use TanStack Query's built-in states.

---

## Turbo Integration

- `dev` → `expo start` (persistent Metro bundler — turbo `persistent: true` ✓)
- `build` → `expo export` (outputs to `dist/` — turbo `outputs: ["dist/**"]` ✓)
- `typecheck`, `lint` → unchanged
