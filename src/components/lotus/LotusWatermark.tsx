import PixelLotus from './PixelLotus';

/**
 * The mark at page scale, and completely still.
 *
 * WHAT IT REPLACED AND WHY. The background used to be ruled ledger lines that
 * drifted upward. It was a good idea about paper and a bad idea about reading:
 * horizontal hairlines crossing behind body copy sit ON the reading line, and
 * these ones also moved. A line that will not hold still under a sentence is
 * interference, whatever it is meant to evoke.
 *
 * This is the opposite failure mode by construction. A single lotus, enormous,
 * bled off one edge, at an alpha that keeps it under everything — and with NO
 * animation at all. It cannot fight a line of text because it has no lines, and
 * it cannot distract because it never changes.
 *
 * The ruled-grid idea did not die; it moved into the diagrams, which are
 * actually grids and where a rule means something.
 *
 * Rendered at grid 17 so the satellite dots and the inner star survive at size —
 * the 9- and 11-cell bitmaps drop detail that is very visible when the sprite is
 * 600px across.
 */
export function LotusWatermark({
  side = 'right',
  size = 620,
  top = '-8%',
  opacity = 0.05,
}: {
  side?: 'left' | 'right';
  size?: number;
  /** CSS length; negative values bleed it off the top of the section. */
  top?: string;
  opacity?: number;
}) {
  return (
    <div
      className="lotus-watermark"
      aria-hidden="true"
      style={{
        top,
        // Bled a third of its width off the edge: a mark that fits entirely on
        // the page reads as an illustration, one that runs off reads as ground.
        [side]: `-${Math.round(size / 3)}px`,
        opacity,
      }}
    >
      <PixelLotus size={size} grid={17} tone="cream" litCore={false} />
    </div>
  );
}
