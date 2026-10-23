# PhysioCare Backend

Phase 1 API for the PhysioCare Patient app, Doctor app and Admin panel.
NestJS 12 (ES modules) on Node.js 24, TypeScript 6, PostgreSQL (from PC-103).

## Getting started

```bash
nvm use            # Node 24, from .nvmrc
npm install        # also installs the git pre-commit hook
cp .env.example .env
npm run start:dev  # http://localhost:3000/health
```

## Scripts

| Script                            | What it does                                 |
| --------------------------------- | -------------------------------------------- |
| `npm run start:dev`               | Run with watch mode                          |
| `npm run build`                   | Compile to `dist/`                           |
| `npm run start:prod`              | Run the compiled build                       |
| `npm run typecheck`               | Type-check `src` and `test` without emitting |
| `npm run lint` / `lint:fix`       | ESLint with type-aware rules                 |
| `npm run format` / `format:check` | Prettier                                     |
| `npm test`                        | Unit tests (Vitest, `src/**/*.spec.ts`)      |
| `npm run test:e2e`                | End-to-end tests (`test/**/*.e2e-spec.ts`)   |
| `npm run test:cov`                | Unit tests with coverage                     |

## Routes

- `GET /health` — liveness check, outside the API prefix
- Everything else is versioned: `/<API_PREFIX>/v1/<resource>` (default `/api/v1/...`)

## Configuration

All environment variables are declared and validated in `src/config/env.schema.ts`;
the app refuses to start if one is missing or malformed. Read config through the
injectable `AppConfig` service, never `process.env`. See `.env.example` for the list.

## Project layout

```
src/
  main.ts              bootstrap
  app.setup.ts         routing, versioning, CORS (shared with e2e tests)
  app.module.ts
  config/              env schema + typed AppConfig
  common/              guards, filters, interceptors (PC-104)
  modules/<feature>/   one folder per feature module
test/                  e2e tests
```

## Conventions

- ES modules: relative imports end in `.js` (`import { X } from './x.js'`).
- No `console.*`; use the Nest `Logger` (pino arrives in PC-104).
- Every promise is awaited or explicitly voided (`no-floating-promises` is an error).
- The pre-commit hook runs ESLint and Prettier on staged files.
