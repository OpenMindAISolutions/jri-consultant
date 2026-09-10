import PixelLotus, { type LotusTone } from './PixelLotus';

/**
 * LotusField — scattered pixel lotuses drifting at different speeds.
 *
 * The single element doing the most work to keep a two-colour page from reading
 * as simply empty. Sparse on purpose: the brand book says seven in a hero and
 * three or four elsewhere, because a field of them stops being weather and
 * starts being a pattern.
 *
 * Positions come from a seeded PRNG rather than Math.random. The marketing site
 * needs that because it server-renders and a mismatch throws a hydration error;
 * this app does not server-render, but determinism is still worth having — a
 * scatter that reshuffles on every re-render flickers.
 */

/** mulberry32 — small, fast, deterministic. */
function makeRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Weighted toward "brand" so the scatter reads as the actual mark, with a few
 *  tinted ones for depth against the sky. */
const TONES: LotusTone[] = ['brand', 'brand', 'cream', 'brand', 'periwinkle', 'brand', 'deep'];

export function LotusField({
  count = 7, seed = 7, avoidBand,
}: {
  count?: number;
  seed?: number;
  /** Keep sprites out of a horizontal band (0-1 fractions) so they never drift
   *  across the middle of a headline. */
  avoidBand?: [number, number];
}) {
  const rand = makeRandom(seed);
  const sprites = Array.from({ length: count }, (_, i) => {
    let top = rand();
    if (avoidBand) {
      const [lo, hi] = avoidBand;
      // Push it out of the band rather than re-rolling: re-rolling consumes a
      // varying number of draws and makes the seed stop being deterministic.
      if (top > lo && top < hi) top = top < (lo + hi) / 2 ? lo * rand() : hi + (1 - hi) * rand();
    }
    return {
      id: i,
      left: rand() * 94,
      top: top * 92,
      size: 14 + rand() * 26,
      tone: TONES[i % TONES.length],
      duration: 7 + rand() * 9,
      delay: rand() * 6,
      opacity: 0.5 + rand() * 0.45,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sprites.map((s) => (
        <span
          key={s.id}
          className="lotus-sprite"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <PixelLotus size={s.size} grid={s.size < 22 ? 11 : 17} tone={s.tone} opacity={s.opacity} />
        </span>
      ))}
    </div>
  );
}
