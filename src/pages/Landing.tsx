import { Link } from 'react-router-dom';
import {
  ArrowRight, BarChart3, Building2, CalendarClock, FileText, IndianRupee,
  MessageCircle, ShieldCheck, Users,
} from 'lucide-react';
import { BrandMark } from '../components/BrandMark';

/**
 * The one page a consultant reads before deciding whether this is worth an account.
 *
 * THE DESIGN IS THE BUSINESS APP'S, NOT A LANDING PAGE'S. Warm paper canvas, the lotus, a Cormorant
 * wordmark and display line over Inter body, muted pastel accents, graphite ink — and deliberately
 * no glass, no hero gradient, no floating cards. The brand's own overhaul removed glass for exactly
 * this reason, and a marketing page that looks nothing like the product is a promise the product
 * then breaks on the first screen.
 *
 * THE VOICE IS THE PRODUCT'S VOICE: calm, specific, and never claiming more than the app does. A
 * chartered accountant reading this has been sold software before. The most persuasive thing
 * available is an accurate description of what happens after they sign in.
 *
 * THE STRUCTURE IS ONE ARGUMENT, MADE ONCE. Their practice has two halves — the businesses that
 * are on JRI and the ones that have never heard of it — and every other product serves only the
 * first. That contrast is the whole page; the feature list underneath it is evidence, not the
 * pitch.
 */

const CAPABILITIES = [
  {
    icon: CalendarClock,
    title: 'A compliance calendar that cites its source',
    body: 'GST, TDS, payroll, advance tax and ROC dates, generated for any client from the statutory rule — each one carrying the section that fixes it. Nothing is invented, and what we refuse to guess is written down.',
    tone: '--jri-lavender',
  },
  {
    icon: MessageCircle,
    title: 'Reminders that go out on WhatsApp',
    body: 'One tap opens a message already written, addressed to the right person, with the deadline in it. From your number, in your name.',
    tone: '--jri-cyan',
  },
  {
    icon: FileText,
    title: 'Their documents, held privately',
    body: 'Ask for a bank statement, file what comes back. Stored in a private bucket only you and your firm can open — and every link expires in a minute.',
    tone: '--jri-sage',
  },
  {
    icon: IndianRupee,
    title: 'Getting paid, without an invoice tool',
    body: 'Your UPI ID becomes a QR and a tappable link. Send it inside the same message as the reminder. The money reaches your bank, not ours.',
    tone: '--jri-amber',
  },
  {
    icon: BarChart3,
    title: 'The practice from above',
    body: 'Which obligation you keep letting slip, how much is late, where documents are piling up — the questions a per-client screen cannot answer. Exports to a spreadsheet.',
    tone: '--jri-lavender',
  },
  {
    icon: Users,
    title: 'Your firm, with real names on the record',
    body: 'Colleagues work your clients without sharing your login, so who did what stays visible. Solo? Skip it entirely — nothing here makes you invent a firm.',
    tone: '--jri-cyan',
  },
];

export default function Landing() {
  return (
    <div className="min-h-full">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <BrandMark to={null} subtitle="for consultants" />
        <nav className="flex items-center gap-2">
          <Link
            to="/signin"
            className="rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/join"
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-90"
            style={{ background: 'hsl(var(--jri-lavender))' }}
          >
            Create an account
          </Link>
        </nav>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 pb-14 pt-10 sm:pt-16">
        <p className="type-eyebrow text-muted-foreground">For chartered accountants, company secretaries and lawyers</p>
        <h1 className="font-brand mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          Your practice has two halves.
          <br />
          <span style={{ color: 'hsl(var(--jri-lavender))' }}>Most software serves one.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Some of your clients keep their books on Jri.AI and can share them with you directly. The
          rest have never heard of us — and you still chase their GST dates, hold their documents and
          ask them to pay you. This is one place for both.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/join"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: 'hsl(var(--jri-lavender))' }}
          >
            Create your account <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/invite"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-accent/15"
          >
            I have an invitation
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Free while we are building it. No card, no seat count.
        </p>
      </section>

      {/* ── The two halves ─────────────────────────────────────────────── */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-5xl gap-px overflow-hidden px-5 py-14 sm:grid-cols-2 sm:gap-10">
          <div>
            <span
              className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'hsl(var(--jri-cyan) / 0.13)', color: 'hsl(var(--jri-cyan))' }}
            >
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h2 className="font-brand text-2xl font-semibold">Clients who are on Jri.AI</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              They choose what to share, and you read it live — no month-end PDF, no spreadsheet
              emailed twice. Ask for a document and it arrives against their name. Record a filing
              and it stays on the record. You see exactly what they granted and nothing else, they
              can see when you opened it, and either of you can end it in a click.
            </p>
          </div>
          <div>
            <span
              className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'hsl(var(--jri-lavender) / 0.13)', color: 'hsl(var(--jri-lavender))' }}
            >
              <Building2 className="h-5 w-5" />
            </span>
            <h2 className="font-brand text-2xl font-semibold">Clients who are not</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Your own private book. Keep the business, its GSTIN, its documents and its deadlines;
              send the reminder on WhatsApp; ask to be paid by UPI. They need no account and see
              nothing but the message you send. If one of them later joins Jri.AI, you record it —
              and your practice can finally see how many did.
            </p>
          </div>
        </div>
      </section>

      {/* ── What you get ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <p className="type-eyebrow text-muted-foreground">What is actually in it</p>
        <h2 className="font-brand mt-3 text-3xl font-semibold tracking-tight">
          Built for the work between the filings
        </h2>

        <div className="mt-9 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {CAPABILITIES.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="flex gap-3.5">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `hsl(var(${c.tone}) / 0.13)`, color: `hsl(var(${c.tone}))` }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── The boundary ───────────────────────────────────────────────── */}
      {/* This section exists because it is the objection every accountant has, and answering it
          plainly is more persuasive than any feature above it. */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center">
          <p className="type-eyebrow text-muted-foreground">Where the line is</p>
          <h2 className="font-brand mt-3 text-3xl font-semibold tracking-tight">
            You are a guest in their books, and it stays that way
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A business shares one report, or a year of them, and that is all you can open. Sharing a
            profit and loss is not consent to see their filing calendar — that is a separate switch,
            off by default. They see every time you open something. Nothing you do here touches their
            staff, their invoices or their bank. It is enforced by the database, not by this
            application being polite about it.
          </p>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-16 text-center">
        <BrandMark to={null} size="lg" className="justify-center" />
        <h2 className="font-brand mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Bring the clients you already have.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Nothing to migrate and nothing to set up. Add one business you look after, fill its
          calendar, and send the first reminder in about two minutes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/join"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: 'hsl(var(--jri-lavender))' }}
          >
            Create your account <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/signin"
            className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-accent/15"
          >
            Sign in
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-7">
          <p className="text-xs text-muted-foreground">
            Jri.AI — incorporation, compliance and accounting for Indian businesses.
          </p>
          <a
            href="https://jri.ai"
            className="text-xs font-semibold transition hover:opacity-80"
            style={{ color: 'hsl(var(--jri-lavender))' }}
          >
            For businesses → jri.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
