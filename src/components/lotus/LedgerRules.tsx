/**
 * LedgerRules — the material this surface is printed on.
 *
 * The marketing site's sky is weather: white cumulus drifting SIDEWAYS across
 * three parallax bands. This is its opposite number — ruled accounting paper,
 * drifting slowly UPWARD, the way a page of accounts moves when somebody scrolls
 * it. Same loop technique, perpendicular axis. The motion itself tells you which
 * of the two products you are looking at, before you have read a word.
 *
 * IT MAY SIT BEHIND BODY COPY, WHICH THE SKY MAY NOT. A cloud is a white shape:
 * cream text on one measures about 1:1, so the sky had to be confined to a band
 * above the type. These are 0.09-alpha hairlines — text over them measures the
 * same as text on the flat field — so the ledger runs the whole page, which is
 * what makes it read as paper rather than as a decorative header.
 *
 * Crisp by construction: 1px axis-aligned rects at integer positions, with
 * shapeRendering="crispEdges" so no line ever renders as a soft grey smear.
 */

/** One line every 26px, one column rule every 132px. */
const ROW = 26;
const COL = 132;

export function LedgerRules({ rows = 48 }: { rows?: number }) {
  const height = rows * ROW;
  const columns = 12;

  return (
    <div className="lotus-ledger" aria-hidden="true">
      {/* Two stacked copies inside a 200%-tall track: the second takes over as
          the first leaves, so the drift never shows a seam. */}
      <div className="lotus-ledger-track" style={{ animationDuration: '150s' }}>
        {[0, 1].map((pass) => (
          <svg
            key={pass}
            width="100%"
            height="50%"
            viewBox={`0 0 ${COL * columns} ${height}`}
            preserveAspectRatio="none"
            shapeRendering="crispEdges"
            style={{ display: 'block' }}
            focusable="false"
          >
            {Array.from({ length: rows }, (_, i) => (
              <rect key={`r${i}`} x={0} y={i * ROW} width={COL * columns} height={1}
                    fill="var(--ledger-rule)" />
            ))}
            {Array.from({ length: columns }, (_, i) => (
              <rect key={`c${i}`} x={i * COL} y={0} width={1} height={height}
                    fill="var(--ledger-column)" />
            ))}
          </svg>
        ))}
      </div>
    </div>
  );
}
