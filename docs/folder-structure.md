# Application & Folder Structure

This project uses the Next.js App Router with a domain-driven layout. The key directories are below (paths are relative to the repo root):

| Path | Purpose |
| --- | --- |
| `src/app` | Route tree the App Router consumes. Every folder here becomes a URL segment unless wrapped in parentheses. |
| `src/app/(auth)` | **Route group**. Parentheses mean “don’t include this segment in the URL”. Everything inside still lives under `/`, so `src/app/(auth)/login/page.tsx` is served at `/login`. Groups keep auth-specific code isolated without affecting routes. |
| `src/app/api` | Server-only routes (Edge/Node) exposed under `/api/*`. Each subfolder exports HTTP methods (`GET`, `POST`, etc.) from a `route.ts`. |
| `src/lib` | Long-lived singletons and helpers used by both server and client modules (`prisma.ts`, `utils.ts`, …). |
| `src/components` | Reusable UI primitives. The `ui/` subfolder mirrors the shadcn pattern (Button, inputs, etc.). |
| `prisma/` | Prisma schema, migrations, and configuration. |
| `docs/` | Explanatory guides (this file plus deep dives for auth and Prisma). |

## Route-group quick reference

```
src/app
├── (auth)
│   └── login
│       └── page.tsx  → /login
├── api
│   └── auth
│       └── [...nextauth]
│           └── route.ts → /api/auth/* (NextAuth handlers)
├── layout.tsx         → shared HTML skeleton
└── page.tsx           → homepage (/)
```

- **Parentheses**: purely organizational, removed from the URL path.
- **Square brackets**: dynamic segments. `[...nextauth]` is a catch-all, so `/api/auth/*` hits the same handler (e.g., `/api/auth/signin/google`, `/api/auth/callback/google`, etc.).
- **page.tsx**: React Server Component rendered for that route segment.
- **route.ts**: Server entry point exporting HTTP method functions.

Keeping auth pages and API routes inside their own groups makes it easy to reason about everything involved in signing in without scattering files throughout the repo. The remaining directories (`public/`, config files, etc.) follow the standard Next.js + Prisma template.***

