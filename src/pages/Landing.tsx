import { Link } from 'react-router-dom';
import PixelLotus from '../components/lotus/PixelLotus';
import { LotusWatermark } from '../components/lotus/LotusWatermark';
import { LotusField } from '../components/lotus/LotusField';
import { Reveal } from '../components/lotus/Reveal';
import { BookSplit, FunnelFlow, GrantGrid, RuleFanout } from '../components/lotus/diagrams';
import '../styles/lotus.css';

/**
 * The one page a consultant reads before deciding whether this is worth an
 * account.
 *
 * IT IS DELIBERATELY NOT THE SAME PAGE AS jri.ai. The two were running the same
 * field, the same clouds and the same wordmark, which made them one page in two
 * sets of words — and a consultant arriving here needs to know within a second
 * that this is a different product for a different person. The brand book says
 * where the room is: across the four dayparts "layout, type and components are
 * IDENTICAL — only the sky and its ink change." Colour and texture are the
 * declared variable. So that is the axis, and nothing structural moved.
 *
 *   jri.ai            SKY — clouds, weather, four dayparts on the clock.
 *                     A founder looking up and out.
 *   consultant.jri.ai INK — a ruled ledger, fixed, quiet, drifting upward.
 *                     Somebody looking down at paper.
 *
 * The lotus, Cormorant, Silkscreen, the pills, the hairlines and the four
 * absolute rules are unchanged, because it still has to be the same company.
 *
 * FOUR EXPLAINERS, EACH EARNING ITS PLACE. The book warns that scene-claim-
 * mechanism weakens every time step three repeats without meaning, so each
 * diagram here draws something a paragraph genuinely cannot: the shape of a
 * practice, the actual size of a permission, a fan-out, and a flow.
 */

/** Verb-first, one word. The brand book is explicit about it. */
const CTA = 'Start';

const CAPABILITIES: { label: string; body: string }[] = [
  {
    label: 'Compliance calendar',
    body: 'GST, TDS, payroll, advance tax and ROC dates generated from the statutory rule, each carrying the section that fixes it.',
  },
  {
    label: 'Reminders on WhatsApp',
    body: 'One tap opens a message already written, with the deadline in it, from your number in your name.',
  },
  {
    label: 'Their documents',
    body: 'Ask for a bank statement; file what comes back. A private store only you and your firm can open, and every link expires in a minute.',
  },
  {
    label: 'Getting paid',
    body: 'Your UPI ID becomes a QR and a tappable link, sent inside the same message. The money reaches your bank, not ours.',
  },
  {
    label: 'The practice, from above',
    body: 'Which obligation you keep letting slip, how much is late, where documents are piling up. Exports to a spreadsheet.',
  },
  {
    label: 'Your firm',
    body: 'Colleagues work your clients without sharing your login, so who did what stays visible. Solo? Skip it — nothing here makes you invent a firm.',
  },
];

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="lotus-eyebrow">{eyebrow}</p>
      <h2
        className="font-display mt-5 max-w-3xl"
        style={{ fontSize: 'clamp(1.65rem,3.9vw,3rem)', lineHeight: 1.04 }}
      >
        {title}
      </h2>
    </>
  );
}

export default function Landing() {
  return (
    <div className="lotus-root min-h-screen">
      <div className="lotus-above">
        {/* ── Nav ─────────────────────────────────────────────────────────── */}
        <header
          className="flex items-center justify-between"
          style={{ padding: '1.25rem var(--lotus-gutter)' }}
        >
          <span className="flex items-center gap-2.5">
            <PixelLotus size={26} grid={11} tone="brand" />
            <span className="lotus-wordmark text-[1.35rem]">Jri.AI</span>
          </span>
          <nav className="flex items-center gap-5">
            <Link to="/signin" className="lotus-link text-sm font-semibold">Sign in</Link>
            <Link to="/join" className="lotus-pill">{CTA}</Link>
          </nav>
        </header>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ padding: 'clamp(3rem,8vw,6rem) var(--lotus-gutter) clamp(3rem,7vw,6rem)' }}>
          <LotusWatermark side="right" size={640} top="-14%" opacity={0.055} />
          {/* Three sprites, not seven. The book's figure for a surface that is not
              a hero sky, and on ruled paper a crowd of them would read as clutter. */}
          <LotusField count={3} seed={23} avoidBand={[0.2, 0.85]} />

          <div className="lotus-above">
            <h1 className="lotus-wordmark" style={{ fontSize: 'clamp(3rem,13vw,11rem)' }}>
              Jri.AI
            </h1>

            {/* The brand line's twin for this audience. "Practice" is a double-decker
                the same way "company" is — the firm, and the practice of a profession. */}
            <p
              className="font-display mt-2"
              style={{ fontSize: 'clamp(1.5rem,4.4vw,3rem)', color: 'var(--lotus-amber)' }}
            >
              Your smart practice.
            </p>

            <p className="lotus-eyebrow mt-6">
              For chartered accountants, company secretaries and lawyers
            </p>

            <p
              className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed sm:text-[1.1875rem]"
              style={{ color: 'var(--lotus-ink-soft)' }}
            >
              Some of your clients keep their books on Jri.AI and can share them with you. The rest
              have never heard of us — and you still chase their GST dates, hold their papers and ask
              them to pay you. One place for both.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/join" className="lotus-pill">{CTA}</Link>
              <Link to="/invite" className="lotus-pill lotus-pill--ghost">I have an invitation</Link>
            </div>

            <p className="lotus-eyebrow mt-6">Free while we are building it · no card</p>
          </div>
        </section>

        {/* ── The claim, then the claim drawn ─────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
          <LotusWatermark side="left" size={520} top="18%" opacity={0.04} />
          <hr className="lotus-rule" />
          <Reveal className="lotus-above">
            <h2
              className="font-display mt-12 max-w-4xl"
              style={{ fontSize: 'clamp(2rem,5.6vw,4.5rem)', lineHeight: 0.99 }}
            >
              Your practice has two halves.
              <br />
              <span style={{ color: 'var(--lotus-ink-soft)' }}>Most software serves one.</span>
            </h2>
            <BookSplit />
          </Reveal>
        </section>

        {/* ── What is in it: rows and hairlines, never cards ───────────────── */}
        <section style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
          <Reveal>
            <SectionHead eyebrow="What is actually in it" title="Built for the work between the filings" />
            <div className="mt-11">
              {CAPABILITIES.map((c) => (
                <div key={c.label}>
                  <hr className="lotus-rule" />
                  <div className="lotus-row grid grid-cols-1 items-baseline gap-x-10 gap-y-2 py-7 sm:grid-cols-12">
                    <p className="font-display sm:col-span-4" style={{ fontSize: 'clamp(1.15rem,2vw,1.6rem)' }}>
                      {c.label}
                    </p>
                    <p className="text-[0.9375rem] leading-relaxed sm:col-span-8"
                       style={{ color: 'var(--lotus-ink-soft)' }}>
                      {c.body}
                    </p>
                  </div>
                </div>
              ))}
              <hr className="lotus-rule" />
            </div>
          </Reveal>
        </section>

        {/* ── Mechanism 1: the calendar ───────────────────────────────────── */}
        <section style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
          <Reveal>
            <SectionHead eyebrow="How the calendar is built" title="One rule, twelve dates, none of them invented" />
            <RuleFanout />
          </Reveal>
        </section>

        {/* ── Mechanism 2: the funnel ─────────────────────────────────────── */}
        <section style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
          <Reveal>
            <SectionHead eyebrow="The mechanism" title="How a reminder becomes a client" />
            <FunnelFlow />
          </Reveal>
        </section>

        {/* ── The boundary, drawn ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
          <LotusWatermark side="right" size={560} top="6%" opacity={0.045} />
          <Reveal className="lotus-above">
            <SectionHead eyebrow="Where the line is" title="You are a guest in their books, and it stays that way" />
            <GrantGrid />
            {/* The operating principle goes where the limits are described. The
                accent is a square rather than the type: amber on the field is
                fine for large text and UI, not for a 10px label. */}
            <p className="lotus-eyebrow mt-8 flex items-center gap-2" style={{ color: 'var(--lotus-ink)' }}>
              <span aria-hidden="true"
                    style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--lotus-amber)' }} />
              It prepares · you decide · it never files
            </p>
          </Reveal>
        </section>

        {/* ── Close ───────────────────────────────────────────────────────── */}
        <section
          className="relative text-center"
          style={{ padding: 'clamp(4rem,9vw,7rem) var(--lotus-gutter)' }}
        >
          <hr className="lotus-rule" />
          <div className="pt-14">
            <PixelLotus size={54} grid={17} tone="brand" className="mx-auto" />
            <h2
              className="font-display mx-auto mt-7 max-w-3xl"
              style={{ fontSize: 'clamp(1.9rem,5vw,3.75rem)', lineHeight: 1.02 }}
            >
              Bring the clients you already have.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed"
               style={{ color: 'var(--lotus-ink-soft)' }}>
              Nothing to migrate and nothing to configure. Add one business you look after, fill its
              calendar, send the first reminder — about two minutes.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link to="/join" className="lotus-pill">{CTA}</Link>
              <Link to="/signin" className="lotus-pill lotus-pill--ghost">Sign in</Link>
            </div>
          </div>
        </section>

        <footer style={{ padding: '0 var(--lotus-gutter) 2.5rem' }}>
          <hr className="lotus-rule" />
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
            <p className="lotus-eyebrow">Jri.AI · incorporation, compliance and accounting</p>
            <a href="https://jri.ai" className="lotus-link text-sm font-semibold">
              For businesses → jri.ai
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
