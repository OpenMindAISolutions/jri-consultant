import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Briefcase, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { acceptInvite } from '../lib/api';

/**
 * Sign in or sign up. Deliberately ONE screen with a toggle rather than two routes: a consultant
 * arrives here from an emailed link and usually does not know whether they already have an account.
 *
 * The invite token rides through in the URL, so signing up from the link lands them straight in
 * their client list. If the token is lost, `accept_consultant_invite` also matches on email —
 * "I signed up and see nothing" is the worst possible first run.
 */
export default function SignIn() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? undefined;
  const navigate = useNavigate();

  const [mode, setMode] = useState<'in' | 'up'>(token ? 'up' : 'in');
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null); setNotice(null);
    try {
      if (mode === 'up') {
        const { error: e1 } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { name },
            // WITHOUT THIS the confirmation email sends people to SITE_URL, which is the BUSINESS
            // app (user.jri.ai) — a consultant confirms their address and lands in an application
            // they have no account for and no reason to see. It happened on the first real
            // invitation. Come back here instead, carrying the token so the invite is claimed on
            // arrival rather than lost.
            emailRedirectTo: `${window.location.origin}/invite${token ? `?token=${encodeURIComponent(token)}` : ''}`,
          },
        });
        if (e1) throw e1;
        const { data: sess } = await supabase.auth.getSession();
        if (!sess.session) {
          // Email confirmation is on. Say so plainly — a blank screen here reads as failure.
          setNotice('Check your email to confirm your address, then sign in.');
          setMode('in');
          return;
        }
      } else {
        const { error: e1 } = await supabase.auth.signInWithPassword({
          email: email.trim(), password,
        });
        if (e1) throw e1;
      }
      // Claim any invitation waiting for this person, by token or by email address.
      await acceptInvite(token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'That did not work. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  /**
   * Google, the same way the business and admin apps do it.
   *
   * The return URL keeps the invite token when there is one, so a consultant who arrives from an
   * invitation and chooses Google still gets linked: App.tsx claims on every arrival with a
   * session, and it reads the token from the URL it lands on.
   *
   * NOTE FOR DEPLOYMENT: this redirect must be on GoTrue's ADDITIONAL_REDIRECT_URLS or auth will
   * refuse the callback. Password sign-in is refused by the same list.
   */
  const signInWithGoogle = async () => {
    setBusy(true); setError(null);
    try {
      const back = `${window.location.origin}/invite${token ? `?token=${encodeURIComponent(token)}` : ''}`;
      const { error: e1 } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: back, queryParams: { access_type: 'offline', prompt: 'consent' } },
      });
      if (e1) throw e1;
      // On success the browser leaves for Google; nothing after this runs.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in could not start.');
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: 'hsl(var(--jri-lavender) / 0.14)', color: 'hsl(var(--jri-lavender))' }}
          >
            <Briefcase className="h-4.5 w-4.5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold">JRI.AI</span>
            <span className="type-eyebrow text-muted-foreground">for consultants</span>
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          {token ? 'You have been invited' : mode === 'in' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {token
            ? 'Create your account to see the reports this business has shared with you.'
            : 'See the reports your clients have shared with you. Nothing else — you never join their team.'}
        </p>

        {notice && (
          <p className="mt-4 rounded-lg px-3 py-2 text-sm"
             style={{ background: 'hsl(var(--status-ok) / 0.12)', color: 'hsl(var(--status-ok))' }}>
            {notice}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-lg px-3 py-2 text-sm"
             style={{ background: 'hsl(var(--status-danger) / 0.1)', color: 'hsl(var(--status-danger))' }}>
            {error}
          </p>
        )}

        <form onSubmit={submit} className="mt-5 space-y-3">
          {mode === 'up' && (
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Your name" autoComplete="name"
              className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus:border-[hsl(var(--jri-lavender))]"
            />
          )}
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address" autoComplete="email"
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus:border-[hsl(var(--jri-lavender))]"
          />
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" autoComplete={mode === 'up' ? 'new-password' : 'current-password'}
            className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus:border-[hsl(var(--jri-lavender))]"
          />
          <button
            type="submit" disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: 'hsl(var(--jri-lavender))' }}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === 'in' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={() => void signInWithGoogle()}
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-accent/15 disabled:opacity-60"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setError(null); }}
          className="mt-4 w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline"
        >
          {mode === 'in' ? 'No account yet? Create one' : 'Already have an account? Sign in'}
        </button>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          Run a business on JRI instead?{' '}
          <a
            className="underline underline-offset-2"
            href={import.meta.env.VITE_USER_APP_URL || 'https://app.jri.ai'}
          >
            Go to the business app
          </a>
        </p>
      </div>
    </div>
  );
}
