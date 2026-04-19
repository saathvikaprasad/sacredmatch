# Candidate Directory

A production-ready Next.js App Router application with Supabase Auth, Database, and Storage. It includes:

- Google-only user sign-in with whitelist validation
- Separate admin login at `/admin/login`
- Candidate directory with responsive cards, detail pages, filters, debounced search, and loading skeletons
- Role-based editing for approved users
- Admin whitelist management with single-user add/update, CSV bulk import, and CSV template download
- Supabase SQL schema and Row Level Security policies

## Tech Stack

- Next.js (App Router)
- React
- Supabase (`Auth`, `Database`, `Storage`)
- Tailwind CSS
- TypeScript
- Sonner for toast support

## 1. Create the environment file

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`NEXT_PUBLIC_APP_URL` is used for the Google OAuth callback redirect.

## 2. Configure Supabase

1. In the Supabase dashboard, enable Google provider in `Authentication > Providers`.
2. Add your local callback URL:

```text
http://localhost:3000/auth/callback
```

3. Run the SQL in [supabase/setup.sql](/Users/ggd/Documents/Codex/2026-04-17-writing-variant-standard-id-84291-build/supabase/setup.sql).
4. Verify the setup:

```bash
npm run supabase:verify
```

5. Create at least one row in `allowed_users` for your Google account:

```bash
npm run supabase:seed-whitelist -- your-email@example.com edit
```

If you prefer fully scripted setup and you have a Supabase personal access token, add `SUPABASE_ACCESS_TOKEN` to your env file and run:

```bash
npm run supabase:bootstrap
```

The bootstrap script calls Supabase's Management API to apply [supabase/setup.sql](/Users/ggd/Documents/Codex/2026-04-17-writing-variant-standard-id-84291-build/supabase/setup.sql). This endpoint is access-controlled by Supabase and may not be enabled for every account.

## 3. Install dependencies and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## App Routes

- `/login` for approved Google users
- `/dashboard` for candidate browsing
- `/candidate/[id]` for candidate detail
- `/candidate/[id]/edit` for creator-only editing
- `/add-candidate` for approved `edit` users
- `/admin/login` for admin sign-in
- `/admin/dashboard` for whitelist management

## Permissions

- Approved Google users with `view` can browse all candidates.
- Approved Google users with `edit` can create candidates and edit only their own records.
- Admins can manage `allowed_users`, but they do not get candidate edit capabilities.

## Notes

- Candidate writes use authenticated Supabase sessions so the RLS rules stay meaningful.
- Whitelist checks are enforced after Google login and before protected user routes render.
- Admin auth is handled separately with an HTTP-only signed cookie derived from env credentials.
