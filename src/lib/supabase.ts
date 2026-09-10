import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required. Copy .env.example to .env.',
  );
}

/**
 * The SAME Supabase project the business app uses.
 *
 * That is the point: a consultant's account, the invitation that linked them, and the report
 * snapshots they read all live in one database. What separates the two products is not the data
 * store — it is which rows the caller is allowed to see, and that is enforced by
 * `consultant_can_read_report()` server-side, not by this app being a different bundle.
 */
export const supabase = createClient<Database>(url.replace(/\/$/, ''), anonKey, {
  auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
});
