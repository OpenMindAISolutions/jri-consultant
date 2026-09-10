import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, CalendarClock, Check, Loader2, Mail, ShieldCheck, Users } from 'lucide-react';
import { BrandMark } from '../components/BrandMark';
import { Notice, fieldClass } from '../components/ui';
import { googleSignIn, signUpConsultant } from '../lib/auth';

/**
 * The page an invited consultant lands on, and the only one whose job is to be reassuring.
 *
 * WHY IT IS SEPARATE FROM THE SIGN-IN SCREEN. It used to be the same screen with a toggle, on the
 * theory that somebody arriving from an email may not know whether they already have an account.
 * That is true and it is still handled — there is a link to sign in. But it cost the invitation its
 * context: a chartered accountant clicked a link from a client and arrived at a login form with no
 * explanation of what they were logging in to, which is indistinguishable from a phishing page.
 *
 * So this page says who it is from, what happens next, and what they will and will not be able to
 * see. The panel on the left is not decoration — it is the answer to "should I trust this link",
 * and it is the reason the form on the right gets filled in.
 *
 * THE AUTH ITSELF IS NOT WRITTEN HERE. It lives in lib/auth.ts, shared with the sign-in screen,
 * because the subtle parts — the confirmation email's return address, carrying the invite token
 * through it, claiming the invitation on arrival — were each learned from a real failure and must
 * not be re-typed per screen.
 */

const PROMISES = [
  {
    icon: ShieldCheck,
    title: 'You see only what they share',
    body: 'One report or a year of them, their choice, revocable at any time. Never their staff, invoices or bank.',
  },
  {
    icon: CalendarClock,
    title: 'And your own clients too',
    body: 'Businesses that are not on Jri.AI live here as your private book — deadlines, documents, WhatsApp reminders, payment requests.',
  },
  {
    icon: Users,
    title: 'Free while we are building it',
    body: 'No card, no per-seat pricing, no trial that ends.',
  },
];

export default function Join() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? undefined;
  const navigate = useNavigate();

  const [email, setEmail] = useState(params.get('email') ?? '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const out = await signUpConsultant({ email, password, name, token });
      if (out.status === 'confirm_email') setSentTo(out.email);
      else navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'That did not work. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  // The confirmation state gets the whole page. A one-line notice under a still-filled form reads
  // as "nothing happened", and the next thing that person does is fill it in again.
  if (sentTo) {
    return (
      <div className="mx-auto flex min-h-full max-w-md flex-col justify-center px-5 py-16 text-center">
        <BrandMark to={null} size="lg" className="justify-center" />
        <span
          className="mx-auto mt-8 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: 'hsl(var(--status-ok) / 0.13)', color: 'hsl(var(--status-ok))' }}
        >
          <Mail className="h-5 w-5" />
        </span>
        <h1 className="font-brand mt-5 text-3xl font-semibold tracking-tight">Check your email</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We sent a confirmation link to <strong className="text-foreground">{sentTo}</strong>. Open
          it and you will come straight back here, with your invitation already accepted.
        </p>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Nothing in your inbox after a minute or two? Look in spam — and check the address above is
          the one your client invited.
        </p>
        <Link
          to="/signin"
          className="mt-7 inline-flex items-center justify-center gap-1.5 text-xs font-semibold"
          style={{ color: 'hsl(var(--jri-lavender))' }}
        >
          Already confirmed? Sign in <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-full max-w-5xl items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:py-16">
      {/* ── The reassurance ──────────────────────────────────────────── */}
      <div className="order-2 lg:order-1">
        <BrandMark to={null} subtitle="for consultants" />
        <h1 className="font-brand mt-7 text-4xl font-semibold leading-[1.1] tracking-tight">
          {token ? 'A client has invited you.' : 'Run your practice here.'}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {token
            ? 'Create your account and their reports appear in your client list straight away. You will not be asked to set up a business of your own — this application does not have one.'
            : 'Create an account and bring the clients you already look after. Nothing to migrate, nothing to configure.'}
        </p>

        <ul className="mt-8 space-y-5">
          {PROMISES.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.title} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'hsl(var(--jri-lavender) / 0.12)', color: 'hsl(var(--jri-lavender))' }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold">{p.title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{p.body}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── The form ─────────────────────────────────────────────────── */}
      <div className="order-1 lg:order-2">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
          <h2 className="text-base font-semibold">Create your account</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {token ? 'Your invitation is attached to this page.' : 'Takes about a minute.'}
          </p>

          {error && <Notice className="mt-4">{error}</Notice>}

          <button
            type="button"
            onClick={() => void googleSignIn(token).catch((e) =>
              setError(e instanceof Error ? e.message : 'Google sign-in did not start.'))}
            className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-accent/15"
          >
            <GoogleG /> Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[10.5px] uppercase tracking-wider text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-[11.5px] font-medium text-muted-foreground">Your name</span>
              <input className={fieldClass} value={name} autoComplete="name"
                     placeholder="CA Anita Rao" onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11.5px] font-medium text-muted-foreground">Email</span>
              <input className={fieldClass} type="email" required value={email} autoComplete="email"
                     onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11.5px] font-medium text-muted-foreground">Password</span>
              <input className={fieldClass} type="password" required minLength={8} value={password}
                     autoComplete="new-password" placeholder="At least 8 characters"
                     onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: 'hsl(var(--jri-lavender))' }}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Create account
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link to={`/signin${token ? `?token=${encodeURIComponent(token)}` : ''}`}
                  className="font-semibold" style={{ color: 'hsl(var(--jri-lavender))' }}>
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
          This is Jri.AI's application for consultants. It is a different application from the one
          your clients use, and it never asks you to create a business.
        </p>
      </div>
    </div>
  );
}

/** Google's mark, inline. Four paths, no network request, no third-party script on an auth page. */
function GoogleG() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.14 6.16-4.14Z" />
    </svg>
  );
}
