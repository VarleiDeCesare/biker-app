# Biker App — Claude Code Rules

This file defines all rules, conventions and architecture decisions for the Biker App project.
Claude must read and follow every section before writing any code.

---

## Project Overview

Biker App is a mobile companion app for motorcycle enthusiasts. It allows riders to track GPS trips in real time, manage their motorcycle garage, log maintenance records, track fuel consumption and receive maintenance alerts. The backend is a REST API built with NestJS. The mobile app is built with React Native using Expo.

---

## Monorepo Structure

```
biker-app/
├── apps/
│   ├── api/          # NestJS backend
│   └── mobile/       # React Native (Expo)
├── packages/
│   └── shared/       # Shared TypeScript types and constants
├── turbo.json
├── package.json      # Root (pnpm workspaces)
└── .claude/          # Claude Code rules (this folder)
```

Always respect this structure. Never place backend code inside the mobile app or vice versa. Shared types always go in `packages/shared`.

---

## Package Manager

Always use `pnpm`. Never use `npm` or `yarn`. Always run commands from the monorepo root unless explicitly working inside a specific app.

---

## General Code Rules

- All code is TypeScript with strict mode enabled. Never use `any`. Use `unknown` and narrow types properly.
- Never disable ESLint rules inline unless there is an explicit comment explaining why and it is absolutely necessary.
- Never use `console.log` in production code. Use the project logger (NestJS Logger on the API, a custom logger utility on mobile).
- All files use named exports. No default exports except for React Native screen components and Expo Router pages (which require default exports).
- Keep functions small and single-purpose. If a function exceeds 40 lines, consider splitting it.
- Always handle errors explicitly. Never swallow errors silently.
- Use `const` by default. Only use `let` when reassignment is genuinely needed. Never use `var`.
- All async functions must have proper error handling with try/catch or propagate errors intentionally.

---

## Naming Conventions

- Files and folders: `kebab-case` everywhere (e.g. `trip-points.service.ts`, `fuel-log.controller.ts`)
- Classes: `PascalCase`
- Functions and variables: `camelCase`
- Constants and env variable names: `SCREAMING_SNAKE_CASE`
- TypeScript interfaces: prefix with `I` only for dependency injection tokens. Plain data shapes do not use the `I` prefix.
- TypeScript types: `PascalCase`, suffix with `Dto` for request/response shapes, `Entity` for database entities, `Payload` for JWT or event payloads.

---

## Environment Variables

Never hardcode secrets, API keys, database URLs or any environment-specific values. Always read from environment variables via `ConfigService` on the API and `expo-constants` or `.env` on mobile. All required env vars must be documented in the relevant `.env.example` file. The API `.env.example` lives at `apps/api/.env.example`. The mobile `.env.example` lives at `apps/mobile/.env.example`.

---

## Git Conventions

Commit messages follow Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`. Never commit directly to `main`. All changes go through a feature branch. Branch names follow the pattern `feat/short-description` or `fix/short-description`.

---

## Backend (apps/api)

See `.claude/api.md` for detailed backend rules.

## Mobile (apps/mobile)

See `.claude/mobile.md` for detailed mobile rules.

## Database

See `.claude/database.md` for schema, migrations and query rules.

## Business Logic

See `.claude/business-logic.md` for domain rules, calculations and alert logic.
