# Mobile Rules — Vite + React SPA (web)

## Stack

- Bundler: Vite 5
- Framework: React 18, TypeScript strict mode
- Routing: react-router-dom v6 (client-side routing)
- UI: shadcn/ui (Radix UI primitives) + Tailwind CSS + lucide-react icons
- Forms: react-hook-form + zod + @hookform/resolvers
- Data fetching: TanStack Query v5
- Auth client: better-auth browser client
- HTTP client: `fetch` / TanStack Query (no axios)
- Charts: recharts
- Animation: framer-motion
- Testing: Vitest + @testing-library/react

---

## Project Structure (apps/mobile)

```
apps/mobile/
├── index.html               # Vite SPA entry
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── components.json          # shadcn/ui config
├── app/
│   └── src/
│       ├── main.tsx         # React entry point
│       ├── App.tsx          # Root component / router setup
│       ├── App.css
│       └── index.css        # Tailwind directives
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui generated components
│   │   └── domain/          # Business-domain components (TripCard, BikeCard, etc.)
│   ├── pages/               # Route-level components
│   │   ├── auth/            # Login, Register, Onboarding
│   │   ├── dashboard/
│   │   ├── ride/
│   │   ├── history/
│   │   └── profile/
│   ├── hooks/               # Custom hooks
│   ├── services/            # API client, auth
│   ├── stores/              # State management
│   ├── utils/               # Pure utility functions
│   └── constants/           # Theme, config
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

When using Tailwind, map these values via `tailwind.config.ts` rather than using arbitrary values in class names.

---

## Component Rules

- `src/components/ui/` — shadcn/ui primitives (generated via `npx shadcn add`). Do not manually edit generated files unless absolutely necessary.
- `src/components/domain/` — business-domain components (TripCard, BikeCard, MaintenanceRow, FuelEntryRow, etc.).
- Every component that accepts props must have its props type defined in the same file, named `[ComponentName]Props`.
- No inline styles. Use Tailwind utility classes. For values not in the Tailwind config, extend the config — never use arbitrary `[]` values for design system tokens.

---

## Routing (react-router-dom v6)

- All routes are defined in `app/src/App.tsx` using `createBrowserRouter` or `<Routes>`.
- Auth-gated routes use a layout route that checks session state and redirects to `/login` if unauthenticated.
- Route segments follow kebab-case (e.g. `/trip-history`, `/bike/:id/maintenance`).
- Never use `useNavigate` directly in components — wrap it in a custom hook or call it from an event handler only.

---

## Data Fetching (TanStack Query)

- All server state goes through TanStack Query. No direct `fetch` calls in components.
- Query keys follow the pattern `[resource, ...params]` (e.g. `['vehicles']`, `['trips', vehicleId]`).
- Query functions live in `src/services/api/`. Each resource has its own file.
- Mutations must invalidate the relevant query keys on success.

---

## Authentication (better-auth)

Use the better-auth browser client configured in `src/services/auth/client.ts`. The client points to the API's `/api/auth` base path. Session state is managed via a custom hook `useSession` that wraps the better-auth client. Auth-gated routes check session state from this hook.

---

## Forms (react-hook-form + zod)

- Every form has a corresponding zod schema defined in the same file or a co-located `schema.ts`.
- Always use `zodResolver` from `@hookform/resolvers/zod`.
- Never use uncontrolled inputs without registering them with `useForm`.

---

## Error Handling in UI

Every component that loads async data must handle three states: loading (skeleton or spinner), error (error message with retry button) and empty (empty state with CTA). Never show a blank screen. Standardize this with a custom hook at `src/hooks/useAsyncData.ts` or TanStack Query's built-in states.

---

## Environment Variables

Read via `import.meta.env`. Prefix all custom vars with `VITE_`. Never access `process.env` in the frontend. Document all required vars in `apps/mobile/.env.example`.
