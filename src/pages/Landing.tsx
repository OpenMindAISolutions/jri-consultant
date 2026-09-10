import { Link } from 'react-router-dom';
import PixelClouds from '../components/lotus/PixelClouds';
import PixelLotus from '../components/lotus/PixelLotus';
import { LotusField } from '../components/lotus/LotusField';
import { Reveal } from '../components/lotus/Reveal';
import { useDaypart } from '../lib/daypart';
import '../styles/lotus.css';

/**
 * The one page a consultant reads before deciding whether this is worth an
 * account — written in the lotus language of the jri.ai marketing site rather
 * than in this application's own warm-paper surface.
 *
 * WHY THE TWO LOOK DIFFERENT ON PURPOSE. The marketing system scopes itself to
 * `.lotus-root` so it cannot leak into the other sixty routes of the site, and
 * that scoping is a decision, not an implementation detail: a saturated sky
 * with cream type is right for persuading somebody and wrong for a screen they
 * work in for six hours. So the landing is lotus and everything behind the sign
 * -in is paper. The lotus and the Cormorant wordmark are what carry across.
 *
 * THE FOUR RULES, FROM BRAND.md, AND WHAT THEY COST ME. The first version of
 * this page was rounded cards, soft shadows and an accent gradient — the house
 * style of every SaaS landing page, and a straight violation of three of the
 * four. No gradients, no shadows, NO CARDS: every division on this page is a
 * hairline or whitespace. Motion is one linear cloud drift, one stepped packet
 * and one reveal; there is nothing that eases for decoration.
 *
 * THE SKY IS HERO AND CLOSING ONLY. White cloud under cream body copy measures
 * 1.29:1, and the alpha that would fix that makes the clouds invisible. Display
 * type tolerates a cloud behind it at 3:1; body copy does not. Structural, not
 * a preference — see lotus.css.
 *
 * PAGE PATTERN: scene, then claim, then mechanism — and the brand book's own
 * warning that step three must not be forced. Here it is earned exactly once:
 * how a reminder turns into a signup is genuinely a flow, and it is the only
 * diagram on the page.
 */

/** Verb-first, one word. The brand book is explicit about it. */
const CTA = 'Start';

const CAPABILITIES: { label: string; body: string }[] = [
  {
    label: 'Compliance calendar',
    body: 'GST, TDS, payroll, advance tax and ROC dates, generated for a client from the statutory rule — each carrying the section that fixes it. Nothing is invented, and what we refuse to guess is written down.',
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

export default function Landing() {
  useDaypart();

  return (
    <div className="lotus-root min-h-screen">
      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header
        className="lotus-above flex items-center justify-between"
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

      {/* ── Hero: the only place with a sky, and one of two ───────────────── */}
      <section className="relative overflow-hidden">
        {/* THE SKY IS A BAND ABOVE THE TYPE, not a layer behind it.
            The brand book says display type tolerates a cloud at 3:1 — but that assumes the
            cloud is not actually behind the glyphs, because CREAM ON A WHITE CLOUD IS ABOUT
            1:1 at any size, and the amber line on one is 1.9:1. On a 375px screen the clouds
            landed squarely on the wordmark and the tagline. So the band is bounded and the
            hero's top padding is what keeps the type below it, at every width. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[var(--sky-band)] overflow-hidden"
             style={{ ['--sky-band' as string]: 'clamp(9rem, 22vw, 17rem)' }}>
          <PixelClouds topRange={[4, 62]} />
        </div>
        {/* Seven sprites, kept out of the band the headline occupies. */}
        <LotusField count={7} seed={19} avoidBand={[0.34, 0.72]} />

        <div
          className="lotus-above"
          /* Top padding clears the sky band above; the type starts on flat field. */
          style={{ padding: 'clamp(10rem,24vw,19rem) var(--lotus-gutter) clamp(3rem,7vw,6rem)' }}
        >
          <h1 className="lotus-wordmark" style={{ fontSize: 'clamp(3rem,13vw,11rem)' }}>
            Jri.AI
          </h1>

          {/* The brand line, in its twin for this audience. "Practice" is a
              double-decker the same way "company" is — the firm, and the
              practice of a profession. */}
          <p
            className="font-display mt-2"
            style={{ fontSize: 'clamp(1.5rem,4.4vw,3rem)', color: 'var(--lotus-amber)' }}
          >
            Your smart practice.
          </p>

          {/* Below the display type, not above it — the marketing site does the same, and
              for the same reason: this is the smallest text on the page. */}
          <p className="lotus-eyebrow mt-6">For chartered accountants, company secretaries and lawyers</p>

          <p
            className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed sm:text-[1.1875rem]"
            style={{ color: 'var(--lotus-ink-soft)' }}
          >
            Some of your clients keep their books on Jri.AI and can share them with you. The rest have
            never heard of us — and you still chase their GST dates, hold their papers and ask them to
            pay you. One place for both.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/join" className="lotus-pill">{CTA}</Link>
            <Link to="/invite" className="lotus-pill lotus-pill--ghost">I have an invitation</Link>
          </div>

          <p className="lotus-eyebrow mt-6">Free while we are building it · no card</p>
        </div>
      </section>

      {/* ── The claim ────────────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
        <hr className="lotus-rule" />
        <Reveal>
          <h2
            className="font-display mt-12 max-w-4xl"
            style={{ fontSize: 'clamp(2rem,5.6vw,4.5rem)', lineHeight: 0.99 }}
          >
            Your practice has two halves.
            <br />
            {/* ink-soft, NOT ink-faint. As faint it measured 1.88:1 at 71px, under the 3:1
                floor for large text — and this is half the page's main claim, not furniture. */}
            <span style={{ color: 'var(--lotus-ink-soft)' }}>Most software serves one.</span>
          </h2>

          <div className="mt-14 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            <div>
              <p className="lotus-eyebrow">On Jri.AI</p>
              <hr className="lotus-rule mt-3" />
              <p className="mt-5 text-[0.9375rem] leading-relaxed" style={{ color: 'var(--lotus-ink-soft)' }}>
                They choose what to share and you read it live — no month-end PDF, no spreadsheet
                emailed twice. Ask for a document and it arrives against their name. Record a filing
                and it stays on the record. They can see when you opened it, and either of you can end
                it in a click.
              </p>
            </div>
            <div>
              <p className="lotus-eyebrow">Not on Jri.AI</p>
              <hr className="lotus-rule mt-3" />
              <p className="mt-5 text-[0.9375rem] leading-relaxed" style={{ color: 'var(--lotus-ink-soft)' }}>
                Your own private book. Keep the business, its GSTIN, its papers and its deadlines; send
                the reminder on WhatsApp; ask to be paid by UPI. They need no account and see nothing
                but the message you send. If one later joins Jri.AI, you record it — and your practice
                can finally count how many did.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── What is in it: rows and hairlines, never cards ────────────────── */}
      <section style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
        <Reveal>
          <p className="lotus-eyebrow">What is actually in it</p>
          <h2
            className="font-display mt-5 max-w-3xl"
            style={{ fontSize: 'clamp(1.65rem,3.9vw,3rem)', lineHeight: 1.04 }}
          >
            Built for the work between the filings
          </h2>

          <div className="mt-11">
            {CAPABILITIES.map((c) => (
              <div key={c.label}>
                <hr className="lotus-rule" />
                <div className="lotus-row grid grid-cols-1 items-baseline gap-x-10 gap-y-2 py-7 sm:grid-cols-12">
                  <p className="font-display sm:col-span-4" style={{ fontSize: 'clamp(1.15rem,2vw,1.6rem)' }}>
                    {c.label}
                  </p>
                  <p
                    className="text-[0.9375rem] leading-relaxed sm:col-span-8"
                    style={{ color: 'var(--lotus-ink-soft)' }}
                  >
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
            <hr className="lotus-rule" />
          </div>
        </Reveal>
      </section>

      {/* ── Mechanism: earned exactly once ───────────────────────────────── */}
      <section style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
        <Reveal>
          <p className="lotus-eyebrow">The mechanism</p>
          <h2
            className="font-display mt-5 max-w-3xl"
            style={{ fontSize: 'clamp(1.65rem,3.9vw,3rem)', lineHeight: 1.04 }}
          >
            How a reminder becomes a client
          </h2>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed" style={{ color: 'var(--lotus-ink-soft)' }}>
            You are already chasing these businesses. Every message the app writes carries one line
            about Jri.AI at the bottom — so the work you do anyway is the thing that brings them across.
          </p>
          <FunnelFlow />
        </Reveal>
      </section>

      {/* ── The boundary, and the operating principle ─────────────────────── */}
      <section style={{ padding: 'var(--lotus-section) var(--lotus-gutter)' }}>
        <Reveal>
          <hr className="lotus-rule" />
          <div className="mt-12 grid gap-x-14 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="lotus-eyebrow">Where the line is</p>
              <h2 className="font-display mt-5" style={{ fontSize: 'clamp(1.5rem,3.2vw,2.5rem)', lineHeight: 1.05 }}>
                You are a guest in their books, and it stays that way
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[0.9375rem] leading-relaxed" style={{ color: 'var(--lotus-ink-soft)' }}>
                A business shares one report, or a year of them, and that is all you can open. Sharing a
                profit and loss is not consent to see their filing calendar — that is a separate switch,
                off by default. Nothing you do here touches their staff, their invoices or their bank.
                It is enforced in the database, not by this application being polite about it.
              </p>
              {/* The operating principle goes where the product's limits are described,
                  which the brand book is specific about. */}
              {/* The accent moves to a square, and the words take full ink.
                  Amber on the field is 3.16:1 — correct for large text and UI, and NOT
                  enough for a 10px label, which needs 4.5:1. Keeping the amber as a mark
                  rather than as type preserves the accent without failing the floor. */}
              <p className="lotus-eyebrow mt-8 flex items-center gap-2" style={{ color: 'var(--lotus-ink)' }}>
                <span
                  aria-hidden="true"
                  style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--lotus-amber)' }}
                />
                It prepares · you decide · it never files
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Close: the second and last sky ───────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[var(--sky-band)] overflow-hidden"
             style={{ ['--sky-band' as string]: 'clamp(7rem, 16vw, 12rem)' }}>
          <PixelClouds topRange={[6, 58]} />
        </div>
        <LotusField count={4} seed={41} avoidBand={[0.28, 0.8]} />
        <div
          className="lotus-above text-center"
          style={{ padding: 'clamp(8rem,18vw,14rem) var(--lotus-gutter) clamp(3.5rem,8vw,7rem)' }}
        >
          <PixelLotus size={54} grid={17} tone="brand" className="mx-auto" />
          <h2
            className="font-display mx-auto mt-7 max-w-3xl"
            style={{ fontSize: 'clamp(1.9rem,5vw,3.75rem)', lineHeight: 1.02 }}
          >
            Bring the clients you already have.
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed"
            style={{ color: 'var(--lotus-ink-soft)' }}
          >
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
  );
}

/**
 * The one explainer graphic on the page.
 *
 * ORTHOGONAL ROUTES AND SQUARE PACKETS, because a curve has no pixel grid and a
 * round dot is not an 8-bit packet. The packet motion is `steps(24)` — that is
 * the difference between an 8-bit animation and a smooth one that merely uses
 * square shapes, and the brand book treats it as absolute.
 *
 * `prefers-reduced-motion` stops the packets in lotus.css, which leaves a
 * perfectly readable static diagram rather than an empty box.
 */
/** 24 cells across the 120-unit route: the packet's x positions, and the evenly
 *  spaced times that make each one a hard jump rather than a glide. */
const STEP_N = 24;
const STEP_VALUES = Array.from({ length: STEP_N }, (_, n) =>
  ((n * 114) / (STEP_N - 1)).toFixed(1)).join(';');
const STEP_TIMES = Array.from({ length: STEP_N }, (_, n) =>
  (n / (STEP_N - 1)).toFixed(4)).join(';');

function FunnelFlow() {
  const STAGES = [
    { k: 'You', line: 'Reminder written for you' },
    { k: 'Them', line: 'Read on WhatsApp' },
    { k: 'The line', line: 'One line about Jri.AI' },
    { k: 'Signup', line: 'Recorded against the client' },
  ];

  return (
    <div className="mt-11">
      <hr className="lotus-rule" />
      <div className="grid grid-cols-1 gap-y-0 sm:grid-cols-4">
        {STAGES.map((s, i) => (
          <div key={s.k} className="relative py-8 sm:pr-8">
            <p className="lotus-eyebrow">{`0${i + 1}`}</p>
            <p className="font-display mt-3" style={{ fontSize: '1.35rem' }}>{s.k}</p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--lotus-ink-soft)' }}>
              {s.line}
            </p>

            {/* The route to the next stage. Drawn only between stages, never
                trailing off the last one into nothing. */}
            {i < STAGES.length - 1 && (
              <svg
                className="mt-6 block h-3 w-full"
                viewBox="0 0 120 6"
                shapeRendering="crispEdges"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="0" y="2" width="120" height="2" fill="var(--lotus-hairline)" />
                <rect x="0" y="0" width="6" height="6" fill="var(--lotus-amber)">
                  {/* calcMode="discrete" with 24 matched values/keyTimes IS steps(24) in SMIL —
                      the packet jumps cell to cell instead of gliding. `values` and `keyTimes`
                      must be the same length or the browser drops the animation silently. */}
                  <animate
                    attributeName="x"
                    dur="2.4s"
                    begin={`${i * 0.6}s`}
                    repeatCount="indefinite"
                    calcMode="discrete"
                    values={STEP_VALUES}
                    keyTimes={STEP_TIMES}
                  />
                </rect>
              </svg>
            )}
          </div>
        ))}
      </div>
      <hr className="lotus-rule" />
    </div>
  );
}
