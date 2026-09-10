/**
 * The explainer graphics.
 *
 * THE BRAND BOOK'S RULE, WHICH IS THE HARD PART: scene, then claim, then
 * mechanism — and "do not force step 3. Not every feature is a flow story. A
 * diagram there would be decoration pretending to be explanation, and the
 * pattern weakens each time it repeats without meaning."
 *
 * So each of these had to earn it, and each one draws something a paragraph
 * genuinely cannot:
 *
 *   BookSplit   — the shape of a practice. Two stacks, one wired to a workplace
 *                 and one standing alone. The claim IS structural.
 *   GrantGrid   — what a consultant can open. A sentence about "only what they
 *                 share" is a promise; a grid with three cells lit out of forty
 *                 is the actual size of the permission.
 *   RuleFanout  — one line of statute becoming twelve dated obligations. Fan-out
 *                 is a quantity, and quantities are what diagrams are for.
 *   FunnelFlow  — a message becoming a signup. A flow, genuinely.
 *
 * Everything is drawn with hairlines and solid squares: axis-aligned 1px borders
 * that need no anti-aliasing, no radius, no shadow, no gradient. Colours come
 * from the tokens so the whole set rethemes for free.
 */

/* ── Shared bits ─────────────────────────────────────────────────────────── */

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-2xl text-[0.8125rem] leading-relaxed" style={{ color: 'var(--lotus-ink-soft)' }}>
      {children}
    </p>
  );
}

const cell = (filled: boolean): React.CSSProperties => ({
  width: '100%',
  aspectRatio: '1 / 1',
  border: `1px solid ${filled ? 'var(--lotus-amber)' : 'var(--lotus-hairline)'}`,
  background: filled ? 'var(--lotus-amber)' : 'transparent',
});

/* ── A. The shape of a practice ──────────────────────────────────────────── */

const ON_JRI = ['Sharma Textiles', 'Vertex Foods', 'Nandi Logistics'];
const OFF_JRI = ['Kirana Stores', 'Anand Motors', 'Sai Fabricators', 'MG Traders', 'Deepak & Sons'];

export function BookSplit() {
  return (
    <div className="mt-10">
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {/* On the platform: each client is wired to a workplace that pushes data up. */}
        <div>
          <p className="lotus-eyebrow">On Jri.AI · they share with you</p>
          <hr className="lotus-rule mt-3" />
          <ul className="mt-5 space-y-2.5">
            {ON_JRI.map((n) => (
              <li key={n} className="flex items-center gap-3">
                <span style={{ ...cell(true), width: 10, height: 10, aspectRatio: 'auto' }} />
                <span className="h-px flex-1" style={{ background: 'var(--lotus-amber)' }} />
                <span className="text-[0.8125rem]">{n}</span>
              </li>
            ))}
          </ul>
          <p className="lotus-eyebrow mt-5" style={{ color: 'var(--lotus-ink-faint)' }}>
            Live figures · you are a guest
          </p>
        </div>

        {/* Off it: no wire. The only channel is the message you send. */}
        <div>
          <p className="lotus-eyebrow">Not on Jri.AI · your private book</p>
          <hr className="lotus-rule mt-3" />
          <ul className="mt-5 space-y-2.5">
            {OFF_JRI.map((n) => (
              <li key={n} className="flex items-center gap-3">
                <span style={{ ...cell(false), width: 10, height: 10, aspectRatio: 'auto' }} />
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--lotus-hairline)' }}
                />
                <span className="text-[0.8125rem]">{n}</span>
              </li>
            ))}
          </ul>
          <p className="lotus-eyebrow mt-5" style={{ color: 'var(--lotus-ink-faint)' }}>
            No account · reachable only by the message you send
          </p>
        </div>
      </div>
      <Caption>
        Most practices are shaped like the right-hand column and most software only serves the left.
        The filled squares are businesses that can push you live figures; the empty ones are
        businesses you still have to chase — and until now, chase somewhere else.
      </Caption>
    </div>
  );
}

/* ── B. What the grant actually is ───────────────────────────────────────── */

const ROWS = ['Profit & loss', 'GST returns', 'Bank', 'Invoices', 'Payroll'];
const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
/** [row, column] pairs the business actually granted. Three cells out of forty. */
const GRANTED = new Set(['0-4', '1-3', '1-4']);

export function GrantGrid() {
  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <div className="min-w-[420px]">
          {/* Month header */}
          <div className="grid" style={{ gridTemplateColumns: '8.5rem repeat(8, 1fr)', gap: '0.35rem' }}>
            <span />
            {MONTHS.map((m) => (
              <span key={m} className="lotus-eyebrow text-center" style={{ color: 'var(--lotus-ink-faint)' }}>
                {m}
              </span>
            ))}
          </div>

          {ROWS.map((r, ri) => (
            <div
              key={r}
              className="mt-1.5 grid items-center"
              style={{ gridTemplateColumns: '8.5rem repeat(8, 1fr)', gap: '0.35rem' }}
            >
              <span className="pr-3 text-[0.75rem]" style={{ color: 'var(--lotus-ink-soft)' }}>{r}</span>
              {MONTHS.map((_, ci) => (
                <span key={ci} style={cell(GRANTED.has(`${ri}-${ci}`))} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Caption>
        Forty cells; they lit three. Those three are what you can open — and the other thirty-seven
        are not greyed out in the interface, they are unreachable from your session. The switch for
        their compliance calendar is separate again, and off unless they turn it on.
      </Caption>
    </div>
  );
}

/* ── C. One rule, twelve dates ───────────────────────────────────────────── */

const YEAR = [
  ['Apr', '20'], ['May', '20'], ['Jun', '20'], ['Jul', '20'],
  ['Aug', '20'], ['Sep', '20'], ['Oct', '20'], ['Nov', '20'],
  ['Dec', '20'], ['Jan', '20'], ['Feb', '20'], ['Mar', '20'],
];

export function RuleFanout() {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        {/* The rule, as one object. */}
        <div className="shrink-0" style={{ border: '1px solid var(--lotus-hairline)', padding: '0.9rem 1.1rem' }}>
          <p className="lotus-eyebrow" style={{ color: 'var(--lotus-amber)' }}>The rule</p>
          <p className="font-display mt-2" style={{ fontSize: '1.35rem' }}>GSTR-3B</p>
          <p className="mt-1 text-[0.6875rem] leading-relaxed" style={{ color: 'var(--lotus-ink-soft)' }}>
            CGST Rules r.61(1)
            <br />
            20th of the following month
          </p>
        </div>

        {/* The route. Orthogonal, because a curve has no pixel grid. */}
        <div className="hidden h-px w-10 shrink-0 lg:block" style={{ background: 'var(--lotus-hairline)' }} />

        {/* Twelve dated obligations. */}
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
            {YEAR.map(([m, d]) => (
              <div key={m} style={{ border: '1px solid var(--lotus-hairline)', padding: '0.4rem 0.2rem' }}>
                <p className="lotus-eyebrow text-center" style={{ color: 'var(--lotus-ink-faint)' }}>{m}</p>
                <p className="text-center text-[0.8125rem] font-semibold" style={{ color: 'var(--lotus-amber)' }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Caption>
        One line of the rule book becomes a year of dates on one client's calendar, each carrying the
        section that fixes it. Run it twice and it adds nothing the second time. Where a date depends
        on something we cannot know — a state, a turnover, an AGM — we generate nothing at all and
        say so, because a compliance calendar nobody trusts is worse than none.
      </Caption>
    </div>
  );
}

/* ── D. A message becoming a client ──────────────────────────────────────── */

/** 24 cells across the 120-unit route: the packet's x positions, and evenly
 *  spaced times that make each one a hard jump rather than a glide. */
const STEP_N = 24;
const STEP_VALUES = Array.from({ length: STEP_N }, (_, n) => ((n * 114) / (STEP_N - 1)).toFixed(1)).join(';');
const STEP_TIMES = Array.from({ length: STEP_N }, (_, n) => (n / (STEP_N - 1)).toFixed(4)).join(';');

const STAGES = [
  { k: 'You', line: 'The reminder is written for you' },
  { k: 'Them', line: 'Read on WhatsApp, on a phone' },
  { k: 'The line', line: 'One sentence about Jri.AI, every time' },
  { k: 'Signed up', line: 'Recorded against the client' },
];

export function FunnelFlow() {
  return (
    <div className="mt-10">
      <hr className="lotus-rule" />
      <div className="grid grid-cols-1 sm:grid-cols-4">
        {STAGES.map((s, i) => (
          <div key={s.k} className="relative py-8 sm:pr-8">
            <p className="lotus-eyebrow" style={{ color: 'var(--lotus-amber)' }}>{`0${i + 1}`}</p>
            <p className="font-display mt-3" style={{ fontSize: '1.35rem' }}>{s.k}</p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--lotus-ink-soft)' }}>
              {s.line}
            </p>

            {i < STAGES.length - 1 && (
              <svg className="mt-6 block h-3 w-full" viewBox="0 0 120 6"
                   shapeRendering="crispEdges" aria-hidden="true" focusable="false">
                <rect x="0" y="2" width="120" height="2" fill="var(--lotus-hairline)" />
                <rect x="0" y="0" width="6" height="6" fill="var(--lotus-amber)">
                  {/* calcMode="discrete" with matched values/keyTimes IS steps(24) in SMIL —
                      the packet jumps cell to cell instead of gliding. The two lists must be
                      the same length or the browser drops the animation without a word. */}
                  <animate attributeName="x" dur="2.4s" begin={`${i * 0.6}s`}
                           repeatCount="indefinite" calcMode="discrete"
                           values={STEP_VALUES} keyTimes={STEP_TIMES} />
                </rect>
              </svg>
            )}
          </div>
        ))}
      </div>
      <hr className="lotus-rule" />
      <Caption>
        You are already chasing these businesses. Every message the app writes carries one line about
        Jri.AI at the bottom — so the work you do anyway is the thing that brings them across, and
        the app counts how many.
      </Caption>
    </div>
  );
}
