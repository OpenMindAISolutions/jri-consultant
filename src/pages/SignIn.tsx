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
