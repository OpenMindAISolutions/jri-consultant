/**
 * PixelLotus — the JRI mark redrawn as an 8-bit sprite.
 *
 * These bitmaps are traced from public/brand/jri-logo.png, not invented. The
 * real mark has a specific structure that a generic rose curve does not
 * reproduce:
 *
 *   - eight petals, with the four cardinal ones reaching further than the
 *     four diagonals (an equal-lobed curve reads as a snowflake instead)
 *   - an inner four-point star, rotated 45° off the cardinals
 *   - an amber diamond core with a bright centre
 *   - four detached amber satellite dots at the cardinal extremes
 *
 * Rendered with shape-rendering="crispEdges" so cells stay hard at any scale.
 *
 * Palette is measured from the logo file — see BRAND below.
 */

export type LotusTone =
  | "brand"
  | "ink"
  | "cream"
  | "amber"
  | "deep"
  | "periwinkle";

/** '.' empty · d deep petal · p petal · l light petal · c core · y core centre · a satellite */
const BITMAPS: Record<number, string[]> = {
  9: [
    ".........",
    "...dpd...",
    "..dpppd..",
    ".dplclpd.",
    ".ppcycpp.",
    ".dplclpd.",
    "..dpppd..",
    "...dpd...",
    ".........",
  ],
  11: [
    ".....a.....",
    "....dpd....",
    "...dpppd...",
    "..dllplld..",
    ".dpllcllpd.",
    "apppcycpppa",
    ".dpllcllpd.",
    "..dllplld..",
    "...dpppd...",
    "....dpd....",
    ".....a.....",
  ],
  17: [
    "........a........",
    ".......ddd.......",
    "......dpppd......",
    "....dddpppddd....",
    "...ddpppppppdd...",
    "...dplllplllpd...",
    "..ddplllclllpdd..",
    ".dpppllcycllpppd.",
    "adppppcyyycppppda",
    ".dpppllcycllpppd.",
    "..ddplllclllpdd..",
    "...dplllplllpd...",
    "...ddpppppppdd...",
    "....dddpppddd....",
    "......dpppd......",
    ".......ddd.......",
    "........a........",
  ],
};

/**
 * The logo's own palette, every value measured from public/brand/jri-logo.png
 * rather than approximated:
 *   petal  darkest #5568F8 · mid #9CA8FF (3rd commonest) · light #C1C5FF (commonest)
 *   core   darkest #FFAD3D · commonest #FFCA7E · lightest #FFEDB4
 * The satellite dots take the solid warm tone; the core runs light centre to
 * amber edge, the way the gradient does in the source file.
 */
const BRAND: Record<string, string> = {
  d: "#5568F8",
  p: "#9CA8FF",
  l: "#C1C5FF",
  c: "#FFCA7E",
  y: "#FFEDB4",
  a: "#FFAD3D",
};

/** Monochrome tints keep the petal shading as opacity steps. */
const TINT: Record<Exclude<LotusTone, "brand">, string> = {
  ink: "#FFFEF7",
  cream: "#FFFDF6",
  amber: "#FFC873",
  deep: "#7FB3FF",
  periwinkle: "#C1C5FF",
};

const SHADE: Record<string, number> = { d: 0.62, p: 0.84, l: 1, c: 1, y: 1, a: 0.9 };

interface PixelLotusProps {
  /** Rendered edge length in px. */
  size?: number;
  /** Cells per side — 9, 11 or 17. Smaller grids drop the satellite dots. */
  grid?: 9 | 11 | 17;
  /** "brand" paints the real logo colours; anything else tints monochrome. */
  tone?: LotusTone;
  /** Keep the core amber even when tinted. */
  litCore?: boolean;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

const PixelLotus = ({
  size = 24,
  grid = 17,
  tone = "brand",
  litCore = true,
  opacity = 1,
  className,
  style,
  title,
}: PixelLotusProps) => {
  const rows = BITMAPS[grid] ?? BITMAPS[17];
  const n = rows.length;
  const cells: React.ReactNode[] = [];

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const ch = rows[y][x];
      if (ch === ".") continue;

      const isCore = ch === "c" || ch === "y" || ch === "a";
      let fill: string;
      let cellOpacity = 1;

      if (tone === "brand") {
        fill = BRAND[ch];
      } else if (isCore && litCore) {
        fill = ch === "y" ? "#FFEDB4" : "#FFCA7E";
      } else {
        fill = TINT[tone];
        cellOpacity = SHADE[ch];
      }

      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={1}
          height={1}
          fill={fill}
          opacity={cellOpacity}
        />
      );
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${n} ${n}`}
      shapeRendering="crispEdges"
      className={className}
      style={{ opacity, ...style }}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {cells}
    </svg>
  );
};

export default PixelLotus;
