# AGENTS.md

## Project overview

IncidentFlow AI is a work-in-progress incident-management platform. The repository currently contains:

- `apps/web`: React 19 + TypeScript + Vite frontend.
- `apps/api`: Express 5 + TypeScript API using Prisma and PostgreSQL.
- `apps/ai-service`: early FastAPI service for future AI/provider integration.
- `docs`: product notes, API contracts, authentication notes, debugging guidance, and SQL performance examples.

## Source of truth

- Treat the Prisma schema in `apps/api/prisma/schema.prisma` as the database model source of truth.
- Keep request/response contracts aligned across API Zod schemas, controllers, and frontend Zod schemas.
- Preserve organization isolation in every database read and write. Never look up tenant-owned records by resource ID alone.
- Do not commit `.env` files, credentials, provider keys, session secrets, or production data.

## Local setup

1. Start PostgreSQL from the repository root with `docker compose up -d`.
2. In `apps/api`, create `.env` from `.env.example`, then run `npm install`, `npx prisma generate`, and `npx prisma migrate dev`.
3. In `apps/web`, create `.env` from `.env.example`, then run `npm install` and `npm run dev`.
4. The API defaults to port 4000 and the web app to port 5173.

## Verification commands

Run checks in the package you changed.

### API (`apps/api`)

- `npm run typecheck`
- `npm test`

### Web (`apps/web`)

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build` for changes affecting bundling, routing, or environment configuration.

### AI service (`apps/ai-service`)

- Use the repository virtual environment when available.
- Run `pytest` from `apps/ai-service`.

Do not use autofix, snapshot updates, generated migrations, or database-destructive commands unless the task explicitly requires them.

## Implementation guidelines

- Keep route handlers thin: validate at the HTTP boundary, put business rules in services, and database access in repositories.
- Use the shared `AppError` envelope for expected API failures.
- Validate untrusted input and external responses with Zod or Pydantic.
- Keep authentication cookies HTTP-only and production-secure. Any state-changing cookie-authenticated endpoint must retain an explicit CSRF defense.
- Scope incident, service, timeline, and user operations by `organizationId`.
- Use transactions when one operation must create or update multiple records atomically.
- Avoid logging passwords, session tokens, provider keys, incident-sensitive data, or full external-provider payloads.
- Prefer bounded list endpoints with pagination and deterministic ordering.
- Keep React Query keys centralized in the feature API module and invalidate the narrowest relevant key after mutations.
- Surface mutation and query failures to the user; do not leave rejected promises as the only error handling.

## Tests

- Add regression tests for changed behavior, not only happy paths.
- API tests should cover validation, authentication, tenant isolation, response contracts, and failure envelopes.
- Frontend tests should cover validation parity with the API, loading/error states, successful mutations, and navigation.
- AI-provider tests should cover timeout, connection failure, rate limiting, invalid JSON, and unexpected status codes.
- Do not depend on test order or shared mutable state.

## Working with existing changes

- Check `git status` and relevant diffs before editing.
- Preserve unrelated user changes and do not rewrite or delete them.
- Never use destructive Git commands to clean the worktree.
- Keep changes focused and report which checks were run and which could not be run.
