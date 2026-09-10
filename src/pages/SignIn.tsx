import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { BrandMark } from '../components/BrandMark';
import { Notice, fieldClass } from '../components/ui';
import { googleSignIn, signInConsultant } from '../lib/auth';

/**
 * Signing in, and only signing in.
 *
 * IT USED TO BE BOTH. One screen with a sign-in/sign-up toggle, on the reasoning that somebody
 * arriving from an emailed invitation may not know which they need. That reasoning was right about
 * the problem and wrong about the fix: a toggle makes the page ambiguous for BOTH audiences, and an
 * invitation deserves a page that explains itself. Creating an account now happens on /join, which
 * says who invited you and what you will be able to see; this page is the short one for people who
 * have been here before, with a link across for anyone who has not.
 *
 * The invite token still rides through, because a returning consultant can be invited by a NEW
 * client — signing in has to claim that invitation exactly as signing up does. `acceptInvite` runs
 * inside `signInConsultant` for that reason, and again in App.tsx on every arrival with a session.
 */
export default function SignIn() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? undefined;
  const navigate = useNavigate();

  const [email, setEmail] = useState(params.get('email') ?? '');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signInConsultant({ email, password, token });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'That did not work. Please try again.');
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <BrandMark to="/" subtitle="for consultants" />

        <h1 className="font-brand mt-7 text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your clients' shared reports, and your own client book.
        </p>

        {error && <Notice className="mt-5">{error}</Notice>}

        <form onSubmit={submit} className="mt-6 space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11.5px] font-medium text-muted-foreground">Email</span>
            <input className={fieldClass} type="email" required value={email} autoComplete="email"
                   onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11.5px] font-medium text-muted-foreground">Password</span>
            <input className={fieldClass} type="password" required value={password}
                   autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button
            type="submit" disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: 'hsl(var(--jri-lavender))' }}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[10.5px] uppercase tracking-wider text-muted-foreground">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setBusy(true);
            void googleSignIn(token).catch((e) => {
              setError(e instanceof Error ? e.message : 'Google sign-in could not start.');
              setBusy(false);
            });
            // On success the browser leaves for Google; nothing after this runs.
          }}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-accent/15 disabled:opacity-60"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          No account yet?{' '}
          <Link to={`/join${token ? `?token=${encodeURIComponent(token)}` : ''}`}
                className="font-semibold" style={{ color: 'hsl(var(--jri-lavender))' }}>
            Create one
          </Link>
        </p>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
          Run a business on Jri.AI instead?{' '}
          {/* The fallback used to be app.jri.ai, a host that does not resolve — it came from a stale
              .env.example and would have sent a confused person to a dead page. */}
          <a className="underline underline-offset-2"
             href={import.meta.env.VITE_USER_APP_URL || 'https://user.jri.ai'}>
            Go to the business app
          </a>
        </p>
      </div>
    </div>
  );
}
