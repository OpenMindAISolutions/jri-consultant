/// <reference types="vite/client" />

/**
 * The env this app reads. Declared explicitly rather than relying on the loose index signature,
 * so a typo in a variable name is a compile error instead of `undefined` at runtime — which here
 * would mean a Supabase client pointed at nothing.
 */
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_USER_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
