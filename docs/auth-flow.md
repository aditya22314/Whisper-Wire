# Authentication Flow

This document explains how the login UI, backend route, and third‑party OAuth glue together.

## 1. Login page (`src/app/(auth)/login/page.tsx`)

- Rendered at `/login` because the `(auth)` folder is a route group.
- Declared as a **client component** (`"use client";`) so it can call `signIn` from `next-auth/react`.
- Renders two sign-in options:
  - Email/password `<form>` (currently un-wired; use it once you add a `signIn("credentials", ...)` call).
  - `GoogleLoginButton` from `react-social-login-buttons`. Clicking it runs `signIn("google")`, which instructs NextAuth to start the Google OAuth flow.

## 2. How `signIn("google")` triggers `/api/auth/signin/google`

1. `signIn("google")` packages the provider id (`"google"`) and posts to `/api/auth/signin/google`.
2. Because the repo uses the **App Router**, `/api/auth/*` is handled by `src/app/api/auth/[...nextauth]/route.ts`.
3. The `[...]` catch-all lets NextAuth respond to every sub-route it needs (`signin/google`, `callback/google`, `_log`, etc.) via the same handler.

## 3. NextAuth server route (`src/app/api/auth/[...nextauth]/route.ts`)

- Imports `NextAuth` plus the Prisma adapter and providers.
- Builds a single `authOptions` object:
  - `adapter: PrismaAdapter(prisma)` persists users/sessions via Prisma.
  - `session: { strategy: "database" }` stores sessions in the DB rather than JWTs only.
  - `providers`: `Credentials` (custom email/password via Prisma + bcrypt) and `Google` (OAuth).
- Creates a handler with `const handler = NextAuth(authOptions);` and exports it for `GET` and `POST`, which satisfies the App Router contract.
- Environment variables used:
  - `NEXTAUTH_SECRET`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - (Anything Prisma needs, e.g., `DATABASE_URL`)

## 4. Google OAuth round-trip

1. User clicks the Google button → `signIn("google")`.
2. Browser hits `/api/auth/signin/google` (handled by NextAuth).
3. NextAuth redirects to Google’s consent screen using the credentials above.
4. Google redirects back to `/api/auth/callback/google`.
5. NextAuth exchanges the code for tokens, then uses `PrismaAdapter` to upsert the user (email, name, avatar).
6. Session is persisted (database strategy) and a cookie/session token is set.
7. NextAuth redirects back to the originating page (defaults to `/` if not provided).

## 5. Credentials provider flow

1. When you wire the email/password form to `signIn("credentials", { email, password, redirect: false })`, the request goes to `/api/auth/callback/credentials`.
2. `authorize` in `route.ts` runs:
   - Finds the user via `prisma.user.findUnique`.
   - Verifies the hashed password with `bcrypt.compare`.
   - Returns a minimal user object if valid; otherwise `null` to reject the login.
3. Rest mirrors the Google flow: session stored via Prisma, cookie set, redirect.

## 6. Common debugging tips

- If you see `MISSING_NEXTAUTH_API_ROUTE_ERROR`, ensure the folder is named `[...nextauth]` **lowercase** and restart the dev server (Turbopack caches old names).
- For provider errors, confirm `.env` values and that they are exposed to the server (restart after editing).
- Use `/api/auth/signin` in the browser to see NextAuth’s default provider list and manual nodes for debugging.

With these pieces, you can confidently add more providers, improve the credentials form, or customize redirects while understanding exactly how a client click becomes an authenticated session.***

