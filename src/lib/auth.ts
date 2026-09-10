import { supabase } from './supabase';
import { acceptInvite } from './api';

/**
 * Signing in and signing up, in ONE place.
 *
 * WHY THIS WAS EXTRACTED. Two screens now create accounts — the sign-in form and the dedicated
 * invitation page — and the details below are the kind that are wrong in the copy rather than in
 * the original. Every one of them was learned from a real failure on a real first consultant:
 *
 *   `emailRedirectTo` — WITHOUT IT the confirmation email sends people to SITE_URL, which is the
 *   BUSINESS app. A consultant confirms their address and lands in an application they have no
 *   account for and no reason to see. This happened on the first real invitation.
 *
 *   The token rides through the redirect, so the invitation is claimed when they come BACK from
 *   their inbox rather than lost on the way out.
 *
 *   `acceptInvite` is called after every successful auth, not just sign-up. It is idempotent and
 *   matches on the token OR the signed-in address, so it rescues somebody who already signed up and
 *   ended up with no client links — "I signed up and see nothing" is the worst possible first run.
 */

export type AuthOutcome =
  /** Session is live; send them into the app. */
  | { status: 'signed_in' }
  /** Email confirmation is switched on. Say so plainly — a blank screen here reads as failure. */
  | { status: 'confirm_email'; email: string };

/** Where the confirmation email should bring them back to, carrying the invitation. */
function returnUrl(token?: string): string {
  return `${window.location.origin}/invite${token ? `?token=${encodeURIComponent(token)}` : ''}`;
}

export async function signUpConsultant(p: {
  email: string; password: string; name?: string; token?: string;
}): Promise<AuthOutcome> {
  const email = p.email.trim();
  const { error } = await supabase.auth.signUp({
    email,
    password: p.password,
    options: { data: { name: p.name ?? '' }, emailRedirectTo: returnUrl(p.token) },
  });
  if (error) throw error;

  const { data: sess } = await supabase.auth.getSession();
  if (!sess.session) return { status: 'confirm_email', email };

  await acceptInvite(p.token);
  return { status: 'signed_in' };
}

export async function signInConsultant(p: {
  email: string; password: string; token?: string;
}): Promise<AuthOutcome> {
  const { error } = await supabase.auth.signInWithPassword({
    email: p.email.trim(), password: p.password,
  });
  if (error) throw error;
  await acceptInvite(p.token);
  return { status: 'signed_in' };
}

/**
 * Continue with Google.
 *
 * `redirectTo` is the same reasoning as `emailRedirectTo` above and the same bug if omitted: the
 * provider hands the session back to whatever GoTrue's SITE_URL says, which is the business app.
 * The host must also be in GoTrue's ADDITIONAL_REDIRECT_URLS or it silently falls back there —
 * non-allowlisted redirects do not error, they just go somewhere else.
 */
export async function googleSignIn(token?: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    // queryParams carried over verbatim from the sign-in screen that proved this flow works.
    options: {
      redirectTo: returnUrl(token),
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  });
  if (error) throw error;
}
