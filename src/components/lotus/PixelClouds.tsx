/**
 * PixelClouds — the Ghibli 8-bit sky the whole system sits in.
 *
 * The field used to be a flat colour plus a dot grid, which read as a UI
 * background rather than a sky. These are hand-traced 8-bit cloud silhouettes
 * — domed tops with a flat underside, the shape a cloud takes when it is drawn
 * on a pixel grid — drifting across three parallax bands.
 *
 * The layer is `position: fixed`, so the sky sits still behind the page while
 * content scrolls over it. Each band is a 200%-wide track holding two copies of
 * the same cloud row, translated -50% on a loop, which makes the drift seamless
 * without any JS.
 *
 * Positions are seeded, never Math.random, because this app server-renders.
 */

/** '.' empty · 'x' cloud. Domed top, flat base — see the note above. */
const CLOUDS: Record<"big" | "mid" | "small", string[]> = {
  big: [
    "..................xxxx........",
    ".......xxxxx....xxxxxxxx......",
    "......xxxxxxx...xxxxxxxx......",
    ".....xxxxxxxxxxxxxxxxxxxx.....",
    ".....xxxxxxxxxxxxxxxxxxxxxx...",
    "...xxxxxxxxxxxxxxxxxxxxxxxxx..",
    "..xxxxxxxxxxxxxxxxxxxxxxxxxxx.",
    "..xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    ".xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  ],
  mid: [
    ".......xx...........",
    ".....xxxxxx.........",
    ".....xxxxxx.xx......",
    "...xxxxxxxxxxxx.....",
    "..xxxxxxxxxxxxxxxx..",
    ".xxxxxxxxxxxxxxxxxx.",
    ".xxxxxxxxxxxxxxxxxx.",
  ],
  small: [
    ".....xxx.....",
    "....xxxxx....",
    "..xxxxxxxxx..",
    ".xxxxxxxxxxx.",
    ".xxxxxxxxxxx.",
  ],
};

type CloudSize = keyof typeof CLOUDS;

/** mulberry32 — deterministic, so SSR and hydration agree. */
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

/** One cloud, drawn as a run-length row of rects so the DOM stays small. */
const Cloud = ({ size, width }: { size: CloudSize; width: number }) => {
  const rows = CLOUDS[size];
  const w = rows[0].length;
  const h = rows.length;
  const rects: React.ReactNode[] = [];

  rows.forEach((row, y) => {
    let runStart: number | null = null;
    for (let x = 0; x <= w; x++) {
      const filled = row[x] === "x";
      if (filled && runStart === null) runStart = x;
      if (!filled && runStart !== null) {
        rects.push(
          <rect
            key={`${y}-${runStart}`}
            x={runStart}
            y={y}
            width={x - runStart}
            height={1}
            fill="currentColor"
          />
        );
        runStart = null;
      }
    }
  });

  return (
    <svg
      width={width}
      height={(width / w) * h}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      {rects}
    </svg>
  );
};

/**
 * Three bands: far clouds are small, faint and slow; near clouds are large,
 * brighter and quicker. That difference is what produces the depth — a single
 * speed reads as a flat sheet sliding past.
 */
const BANDS: {
  size: CloudSize;
  count: number;
  width: number;
  opacity: number;
  duration: number;
  seed: number;
}[] = [
  { size: "small", count: 7, width: 90, opacity: 0.5, duration: 190, seed: 3 },
  { size: "mid", count: 5, width: 170, opacity: 0.66, duration: 130, seed: 17 },
  { size: "big", count: 4, width: 300, opacity: 0.82, duration: 90, seed: 29 },
];

interface PixelCloudsProps {
  /**
   * Vertical band the clouds may occupy, as percentages of the section.
   * Defaults to the upper half: display type tolerates a cloud behind it
   * (3:1 suffices at >=24px bold), body copy does not, and body copy always
   * sits lower in these sections.
   */
  topRange?: [number, number];
}

const PixelClouds = ({ topRange = [0, 48] }: PixelCloudsProps) => (
  <div className="lotus-sky" aria-hidden="true">
    {BANDS.map((band) => {
      const rand = makeRandom(band.seed);
      // Lay the row out once; the track renders it twice for a seamless loop.
      const row = Array.from({ length: band.count }, (_, i) => ({
        id: i,
        left: (i / band.count) * 100 + rand() * (60 / band.count),
        top: topRange[0] + rand() * (topRange[1] - topRange[0]),
        scale: 0.75 + rand() * 0.5,
      }));

      const copy = (pass: number) =>
        row.map((c) => (
          <span
            key={`${pass}-${c.id}`}
            style={{
              position: "absolute",
              left: `${pass * 50 + c.left / 2}%`,
              top: `${c.top}%`,
              // Band weight x the daypart's cloud alpha: white cumulus by day,
              // faint moonlit wisps at night.
              opacity: `calc(${band.opacity} * var(--lotus-cloud-alpha, 0.8))`,
              transform: `scale(calc(${c.scale} * var(--lotus-cloud-scale, 1)))`,
            }}
          >
            <Cloud size={band.size} width={band.width} />
          </span>
        ));

      return (
        <div
          key={band.size}
          className="lotus-sky-track"
          style={{ animationDuration: `${band.duration}s` }}
        >
          {copy(0)}
          {copy(1)}
        </div>
      );
    })}
  </div>
);

export default PixelClouds;
