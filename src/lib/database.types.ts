/**
 * The database's shape, as the database itself reports it.
 *
 * WHY THIS FILE IS A WRAPPER AND NOT THE GENERATED OUTPUT. Regenerating overwrites the whole
 * generated file — postgres-meta does not merge — and in the business app that once deleted 25
 * hand-written aliases appended to the bottom of it, breaking 76 import sites at once. So the
 * generated output lives untouched in `database.generated.ts` and anything hand-written lives here,
 * on the other side of a re-export that regeneration cannot reach.
 *
 * REGENERATE with (from this directory):
 *
 *   ssh -i ~/.ssh/jri_hetzner_supabase jriadmin@49.12.224.121 \
 *     'docker exec supabase-meta node -e "fetch(\"http://localhost:8080/generators/typescript?included_schemas=public\").then(r=>r.text()).then(t=>process.stdout.write(t))"' \
 *     > src/lib/database.generated.ts
 *
 * It describes the ENTIRE public schema, most of which this app must never touch. That is not a
 * mistake: the types are a reflection of the database, and the boundary is enforced by RLS and by
 * the SECURITY DEFINER functions in `api.ts` and `funnel.ts` — never by pretending the other tables
 * do not exist. What this file buys is that a mistyped function name or a wrong argument becomes a
 * build error instead of a runtime one a consultant discovers.
 */
export type { Database, Json } from './database.generated';
