import type { TarotCardData } from "@/lib/tarot/deck";

/**
 * Deterministic, fully local SVG artwork for a single Tarot card.
 *
 * Every one of the 78 cards renders a genuinely different image: Major
 * Arcana each have a bespoke hand-picked symbol, Minor Arcana combine a
 * suit-specific emblem with a rank-accurate pip layout (or a court-card
 * figure treatment for Page/Knight/Queen/King). Nothing here is a shared
 * placeholder — the art is generated from the card's own data, inline,
 * so there is no external image request, no layout shift, and no asset
 * that can go missing.
 */

const SUIT_THEME: Record<
  string,
  { from: string; to: string; ink: string; accent: string }
> = {
  wands: { from: "#3a1d0d", to: "#7a3b12", ink: "#ffd9a8", accent: "#ff9d4d" },
  cups: { from: "#0d2436", to: "#154a6b", ink: "#bfe8ff", accent: "#4fc3f7" },
  swords: { from: "#1c1c2b", to: "#3c3c5c", ink: "#e4e4f7", accent: "#b8b8ff" },
  pentacles: { from: "#1a2412", to: "#3c4d20", ink: "#e4f0c8", accent: "#a8d84f" },
};

const MAJOR_THEME = { from: "#1a0d2e", to: "#3d1a5c", ink: "#f3e6ff", accent: "#c084fc" };

function SuitGlyph({
  suit,
  x,
  y,
  size,
  color,
}: {
  suit: string;
  x: number;
  y: number;
  size: number;
  color: string;
}) {
  const s = size;
  switch (suit) {
    case "wands":
      return (
        <g transform={`translate(${x} ${y})`}>
          <rect x={-s * 0.09} y={-s * 0.5} width={s * 0.18} height={s} rx={s * 0.09} fill={color} />
          <circle cx="0" cy={-s * 0.5} r={s * 0.14} fill={color} opacity="0.85" />
        </g>
      );
    case "cups":
      return (
        <g transform={`translate(${x} ${y})`} fill={color}>
          <path d={`M ${-s * 0.4} ${-s * 0.3} Q ${-s * 0.4} ${s * 0.35} 0 ${s * 0.35} Q ${s * 0.4} ${s * 0.35} ${s * 0.4} ${-s * 0.3} Z`} />
          <rect x={-s * 0.07} y={s * 0.35} width={s * 0.14} height={s * 0.22} />
          <rect x={-s * 0.22} y={s * 0.55} width={s * 0.44} height={s * 0.1} rx={s * 0.04} />
        </g>
      );
    case "swords":
      return (
        <g transform={`translate(${x} ${y})`} fill={color}>
          <rect x={-s * 0.06} y={-s * 0.55} width={s * 0.12} height={s * 0.85} />
          <rect x={-s * 0.28} y={s * 0.22} width={s * 0.56} height={s * 0.1} rx={s * 0.04} />
          <path d={`M 0 ${-s * 0.55} L ${-s * 0.14} ${-s * 0.36} L ${s * 0.14} ${-s * 0.36} Z`} />
        </g>
      );
    case "pentacles":
      return (
        <g transform={`translate(${x} ${y})`}>
          <circle r={s * 0.42} fill="none" stroke={color} strokeWidth={s * 0.06} />
          <path
            d={pentagramPath(s * 0.3)}
            fill="none"
            stroke={color}
            strokeWidth={s * 0.05}
            strokeLinejoin="round"
          />
        </g>
      );
    default:
      return null;
  }
}

function pentagramPath(r: number): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const angle = -Math.PI / 2 + (i * (4 * Math.PI)) / 5;
    pts.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }
  return `M ${pts.map((p) => p.join(",")).join(" L ")} Z`;
}

const PIP_LAYOUTS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[0, -22], [0, 22]],
  3: [[0, -30], [0, 0], [0, 30]],
  4: [[-14, -22], [14, -22], [-14, 22], [14, 22]],
  5: [[-14, -28], [14, -28], [0, 0], [-14, 28], [14, 28]],
  6: [[-14, -30], [14, -30], [-14, 0], [14, 0], [-14, 30], [14, 30]],
  7: [[-14, -34], [14, -34], [0, -14], [-14, 6], [14, 6], [-14, 34], [14, 34]],
  8: [[-14, -36], [14, -36], [-14, -14], [14, -14], [-14, 12], [14, 12], [-14, 36], [14, 36]],
  9: [[-14, -38], [14, -38], [-14, -16], [14, -16], [0, 0], [-14, 16], [14, 16], [-14, 38], [14, 38]],
  10: [[-14, -40], [14, -40], [-14, -20], [14, -20], [0, -3], [0, 3], [-14, 20], [14, 20], [-14, 40], [14, 40]],
};

const COURT_LABEL: Record<number, string> = { 11: "P", 12: "K", 13: "Q", 14: "R" };

/** Simple, deterministic hash so subtle background variation still ties
 * back to the card's own id rather than being random on every render. */
function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return h;
}

const MAJOR_SYMBOL: Record<number, (t: typeof MAJOR_THEME) => React.ReactElement> = {
  0: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <circle cx="0" cy="-40" r="14" />
      <path d="M0 -26 L0 30 M-20 -6 L20 -6 M0 30 L-16 55 M0 30 L16 55" />
    </g>
  ),
  1: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-30 40 H30" />
      <path d="M0 40 V-40" />
      <path d="M-18 -40 H18" />
      <circle cx="0" cy="-52" r="6" fill={t.ink} stroke="none" />
    </g>
  ),
  2: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-34 0 Q0 -50 34 0 Q0 50 -34 0 Z" />
      <path d="M0 -35 V35" strokeDasharray="4 6" />
    </g>
  ),
  3: (t) => (
    <g fill={t.ink}>
      <ellipse cx="0" cy="0" rx="34" ry="44" fill="none" stroke={t.ink} strokeWidth="3" />
      <circle cx="-10" cy="-10" r="5" />
      <circle cx="10" cy="-10" r="5" />
      <path d="M-14 12 Q0 26 14 12" fill="none" stroke={t.ink} strokeWidth="3" />
    </g>
  ),
  4: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <rect x="-30" y="-30" width="60" height="60" rx="6" />
      <path d="M-30 0 H30 M0 -30 V30" />
    </g>
  ),
  5: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-30 -20 H30 M-30 0 H30 M-30 20 H30" />
      <circle cx="0" cy="-40" r="10" />
    </g>
  ),
  6: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <circle cx="-16" cy="-10" r="18" />
      <circle cx="16" cy="10" r="18" />
    </g>
  ),
  7: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <rect x="-28" y="-22" width="56" height="44" rx="10" />
      <circle cx="-14" cy="0" r="7" />
      <circle cx="14" cy="0" r="7" />
    </g>
  ),
  8: (t) => (
    <path
      d="M0 44c14-30 30-34 30-54a30 30 0 0 0-60 0c0 20 16 24 30 54z"
      fill="none"
      stroke={t.ink}
      strokeWidth="3"
    />
  ),
  9: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <circle cx="0" cy="-46" r="12" />
      <path d="M0 -34 V30" />
      <path d="M-20 6 H20" />
    </g>
  ),
  10: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <circle r="34" />
      <path d="M0 -34 V34 M-34 0 H34" strokeDasharray="3 8" />
    </g>
  ),
  11: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-30 20 Q0 -40 30 20" />
      <path d="M-14 20 V-4 M14 20 V-4" />
    </g>
  ),
  12: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-24 -30 L24 30 M24 -30 L-24 30" />
      <path d="M0 -20 Q14 0 0 20 Q-14 0 0 -20 Z" />
    </g>
  ),
  13: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-30 20 A30 30 0 0 1 30 20" />
      <path d="M-30 20 H30" />
    </g>
  ),
  14: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <rect x="-22" y="-10" width="44" height="40" rx="4" />
      <path d="M-22 -10 L-10 -34 L0 -14 L10 -34 L22 -10" />
    </g>
  ),
  15: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-24 -20 L24 -20 L14 30 L-14 30 Z" />
      <path d="M-10 -34 Q0 -44 10 -34" />
    </g>
  ),
  16: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-14 -50 V50 M14 -50 V50 M-30 -20 H30 M-30 20 H30" />
      <path d="M-40 -50 L-14 -30 M40 -50 L14 -30" strokeDasharray="2 5" />
    </g>
  ),
  17: (t) => (
    <g stroke={t.ink} strokeWidth="2.5" fill="none">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = (i * Math.PI) / 3.5;
        return <path key={i} d={`M0 0 L${40 * Math.cos(a)} ${40 * Math.sin(a)}`} />;
      })}
      <circle r="12" />
    </g>
  ),
  18: (t) => (
    <g fill={t.ink}>
      <path d="M10 -40a40 40 0 1 0 0 80 32 32 0 1 1 0-80z" />
    </g>
  ),
  19: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <circle r="22" fill={t.ink} stroke="none" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i * Math.PI) / 4;
        return (
          <path
            key={i}
            d={`M${30 * Math.cos(a)} ${30 * Math.sin(a)} L${44 * Math.cos(a)} ${44 * Math.sin(a)}`}
          />
        );
      })}
    </g>
  ),
  20: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <path d="M-20 20 Q0 -50 20 20" />
      <path d="M-30 20 H30" />
      <circle cx="0" cy="-4" r="6" fill={t.ink} stroke="none" />
    </g>
  ),
  21: (t) => (
    <g stroke={t.ink} strokeWidth="3" fill="none">
      <ellipse rx="40" ry="26" />
      <ellipse rx="24" ry="15" strokeDasharray="3 6" />
    </g>
  ),
};

export interface CardArtProps {
  card: TarotCardData;
  reversed?: boolean;
  className?: string;
}

export function CardArt({ card, reversed = false, className }: CardArtProps) {
  const seed = hashSeed(card.id);
  const theme = card.arcana === "major" ? MAJOR_THEME : SUIT_THEME[card.suit ?? "wands"];
  const twinkleOffset = seed % 100;

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label={`${card.nameEn} / ${card.nameRu}`}
      style={{ transform: reversed ? "rotate(180deg)" : undefined }}
    >
      <defs>
        <linearGradient id={`bg-${card.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.from} />
          <stop offset="100%" stopColor={theme.to} />
        </linearGradient>
        <radialGradient id={`glow-${card.id}`} cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="2" y="2" width="196" height="316" rx="14" fill={`url(#bg-${card.id})`} />
      <rect x="2" y="2" width="196" height="316" rx="14" fill={`url(#glow-${card.id})`} />
      <rect
        x="8"
        y="8"
        width="184"
        height="304"
        rx="10"
        fill="none"
        stroke={theme.accent}
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />

      {/* Ambient stars, position derived from the card id so it's stable. */}
      {Array.from({ length: 10 }).map((_, i) => {
        const sx = ((seed >> (i % 8)) * (i + 3)) % 180 + 10;
        const sy = ((seed >> (i % 5)) * (i + 7)) % 300 + 10;
        return (
          <circle
            key={i}
            cx={sx}
            cy={sy}
            r={0.8 + ((i + twinkleOffset) % 3) * 0.4}
            fill={theme.ink}
            opacity={0.25 + ((i * 13) % 40) / 100}
          />
        );
      })}

      <g transform="translate(100 120) scale(1.15)">
        {card.arcana === "major"
          ? MAJOR_SYMBOL[card.rank]?.(theme)
          : card.rank <= 10
            ? (PIP_LAYOUTS[card.rank] ?? [[0, 0]]).map(([px, py], i) => (
                <SuitGlyph
                  key={i}
                  suit={card.suit ?? "wands"}
                  x={px}
                  y={py}
                  size={26}
                  color={theme.ink}
                />
              ))
            : (
                <g>
                  <SuitGlyph suit={card.suit ?? "wands"} x={0} y={0} size={64} color={theme.ink} />
                  <text
                    x="0"
                    y="-58"
                    textAnchor="middle"
                    fontSize="20"
                    fontFamily="serif"
                    fill={theme.accent}
                    fontWeight="700"
                  >
                    {COURT_LABEL[card.rank]}
                  </text>
                </g>
              )}
      </g>

      <text
        x="100"
        y="284"
        textAnchor="middle"
        fontSize="11"
        fontFamily="serif"
        letterSpacing="0.5"
        fill={theme.ink}
        opacity="0.85"
      >
        {card.arcana === "major" ? card.nameEn : card.nameEn}
      </text>
      {card.arcana === "major" && (
        <text
          x="100"
          y="24"
          textAnchor="middle"
          fontSize="12"
          fontFamily="serif"
          fill={theme.accent}
          opacity="0.9"
        >
          {card.rank}
        </text>
      )}
    </svg>
  );
}

CardArt.displayName = "CardArt";
