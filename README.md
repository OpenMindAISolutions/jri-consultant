# JRI.AI — Consultant app

Where a business's own accountant or CA signs in to see the reports that business chose to share.

**This is not the business app.** Consultants have no workplace, never join a team, and cannot reach
invoices, payroll, banking or contacts. They see report *snapshots*, for the reports and periods they
were granted, and nothing else.

## How access actually works

Enforced in the database, not here:

- `workplace_consultants` — the relationship (invited → active → revoked)
- `consultant_report_grants` — one row per report **and period**
- `consultant_can_read_report()` — the authority function
- one extra SELECT policy on `report_snapshots` — the entire read surface
- `consultant_access_log` — every open is recorded, and the business can see it

Migrations live in the **user app** repo (`jri-user-arc/supabase/migrations/20260904100000_*`),
because that is where this platform's schema history lives. They must be applied before this app
returns anything.

## Running it

```bash
npm install
cp .env.example .env   # same Supabase project as the business app
npm run dev
```

## Regenerating report names

`src/lib/reportNames.ts` mirrors the 42 reports in the business app's `src/lib/reportCatalog.ts`.
Two fields are copied — name and category — rather than dragging 23 report components across repos.

An unknown report key renders as the key itself, never blank, so a report added to the business app
still works here until this file is refreshed. To refresh, re-run the generator against
`jri-user-arc/src/lib/reportCatalog.ts`.

## Why reports render generically

The business app has 23 bespoke report components backed by its whole store layer. Copying them here
is the drift trap that damaged the admin app. This app renders the *shape* of `report_data` instead —
scalars as a figure grid, arrays of objects as tables — which covers all 42 reports and degrades
honestly on a new one.

## The one thing this app must always be honest about

A snapshot is written when **the business** opens a report, not when it is shared. Figures can be
months old. Every screen shows how old they are, and `ReportView` says so in words. Never remove that.

## WhatsApp

The connection belongs to **the consultant or their firm — never to a workplace**. Their number,
their Meta account, their consent obligation. Firm connection wins over a personal one, because in a
practice the firm's number is the one clients recognise.

Two routes, both supported:

- **`meta_direct`** — they paste their own Meta credentials. The access token is encrypted with
  `pgp_sym_encrypt` under the `app.consultant_secret_key` GUC, and the column is revoked from
  `authenticated` **by name** so it is unreadable even to someone who can read the row.
  Only `service_role` can decrypt it, and only through `take_whatsapp_send_job`.
- **`bsp`** — a Business Solution Provider holds the secret and we keep a reference.

**Two rules live in the database, not in the sender:** no message without a Meta-approved template,
and no message without recorded consent from that number. `queue_consultant_whatsapp` enforces both,
so the send function only ever delivers what was already approved.

**What is not built:** the function that actually calls Meta. Everything up to and including the
queue is done and tested; delivery needs a real Meta account and approved templates, which is days
of external review and cannot be written blind.

## Deployment

Static site. Two environment variables:

```
VITE_SUPABASE_URL=        # same Supabase project as the business app
VITE_SUPABASE_ANON_KEY=
VITE_USER_APP_URL=        # optional — where to send someone who is a business owner
```

`npm run build` emits `dist/`. Point the host at it with SPA fallback to `index.html`, or deep links
like `/invite?token=…` will 404.
