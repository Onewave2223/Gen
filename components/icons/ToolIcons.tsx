import type { SVGProps } from "react";

/**
 * Shared line-icon system for TryGenHub tool categories.
 *
 * Replaces emoji glyphs as primary interface icons with a consistent
 * SVG language: 1.6px stroke, rounded joins, 24x24 viewbox, currentColor
 * by default so each call site can theme via text color / gradients.
 * Every icon accepts standard SVG props so callers can add
 * `aria-label`/`role="img"` (decorative by default via aria-hidden).
 */

export type ToolIconProps = SVGProps<SVGSVGElement>;

function base(props: ToolIconProps) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

/** Tarot: a mystical card face with a star at its center. */
export function TarotIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M12 8.6l1.05 2.3 2.45.28-1.83 1.72.47 2.5L12 14.15l-2.14 1.25.47-2.5-1.83-1.72 2.45-.28L12 8.6z" />
      <path d="M9 3v1.4M15 3v1.4" opacity=".6" />
    </svg>
  );
}

/** Magic / Crystal Ball: sphere with an inner glint on a small stand. */
export function CrystalBallIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="10.5" r="7" />
      <path d="M9 8.4c.6-1 1.7-1.6 3-1.6" opacity=".7" />
      <path d="M8 20h8M9.5 17.2 8 20M14.5 17.2 16 20" />
    </svg>
  );
}

/** Fortune / sparkle: layered stars for wish / fortune tools. */
export function SparkleIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M11 3.5l1.4 3.6 3.6 1.4-3.6 1.4L11 13.5 9.6 9.9 6 8.5l3.6-1.4L11 3.5z" />
      <path d="M18 14l.75 1.9L20.6 16.7l-1.85.75L18 19.3l-.75-1.85L15.4 16.7l1.85-.8L18 14z" opacity=".7" />
    </svg>
  );
}

/** Coin flip / decisions: two overlapping discs. */
export function CoinIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <circle cx="10.5" cy="10.5" r="3.2" opacity=".6" />
      <path d="M17.2 9c1.6.9 2.8 2.5 2.8 4.6a5.6 5.6 0 0 1-5.6 5.6c-1.9 0-3.5-1-4.5-2.4" opacity=".8" />
    </svg>
  );
}

/** Numerology / life path: ascending path with a node highlight. */
export function PathNumberIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 18c3-1 3-5 6-6s3-5 6-6" />
      <circle cx="4" cy="18" r="1.4" />
      <circle cx="10" cy="12" r="1.4" />
      <circle cx="16" cy="6" r="1.4" />
    </svg>
  );
}

/** IQ / brain: brain outline with a puzzle seam. */
export function BrainIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 4.5a3 3 0 0 0-3 3v.3A2.7 2.7 0 0 0 4.5 10a2.7 2.7 0 0 0 1 5 2.9 2.9 0 0 0 2.7 3.5H9.5V4.5H9z" />
      <path d="M15 4.5a3 3 0 0 1 3 3v.3A2.7 2.7 0 0 1 19.5 10a2.7 2.7 0 0 1-1 5 2.9 2.9 0 0 1-2.7 3.5H14.5V4.5H15z" />
      <path d="M12 5v13.5" opacity=".5" />
    </svg>
  );
}

/** Random generators: dice pips. */
export function DiceIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="8.3" cy="8.3" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="15.7" cy="8.3" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="8.3" cy="15.7" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="15.7" cy="15.7" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Shuffle: crossed arrows, used for pickers / spinners. */
export function ShuffleIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6h3.2c1.8 0 2.7 1 3.6 2.2M4 18h3.2c1.8 0 2.7-1 3.6-2.2" />
      <path d="M15 6h5m0 0-2.2-2.2M20 6l-2.2 2.2" />
      <path d="M15 18h5m0 0-2.2 2.2M20 18l-2.2-2.2" />
      <path d="M11.6 12 13 13.7" opacity=".7" />
    </svg>
  );
}

/** Text tools: lines of a document. */
export function TextDocumentIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
      <path d="M14 3.5V7h3.5" />
      <path d="M8.5 12h7M8.5 15h7M8.5 9h3" opacity=".7" />
    </svg>
  );
}

/** Name generators: a small typographic spark/badge. */
export function NameBadgeIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="6" width="17" height="12" rx="2.4" />
      <path d="M8 15V9.5l2.4 3.2L12.8 9.5V15" opacity=".85" />
      <circle cx="17" cy="12.2" r="1.9" opacity=".85" />
    </svg>
  );
}

/** Calculators: display + keypad. */
export function CalculatorIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <rect x="7.3" y="5.3" width="9.4" height="3.4" rx="0.6" opacity=".8" />
      <circle cx="8" cy="12.4" r=".9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12.4" r=".9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12.4" r=".9" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16.2" r=".9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16.2" r=".9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16.2" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Developer tools: code brackets. */
export function CodeBracketsIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 6 4 12l5 6" />
      <path d="M15 6l5 6-5 6" />
    </svg>
  );
}

/** Fun / random questions and games: two chat sparks. */
export function FunIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v4A2.5 2.5 0 0 1 13.5 13H9l-3.2 2.6a.5.5 0 0 1-.8-.4V13a2.5 2.5 0 0 1-1-2v-4.5z" />
      <path d="M18.5 10c1.4.3 2.5 1.4 2.5 2.9v3.4a.5.5 0 0 1-.8.4L18 15.5" opacity=".7" />
    </svg>
  );
}

/** Daily Reading: a radiant sunburst, for the "energy of the day". */
export function SunburstIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3v2.4M12 18.6V21M21 12h-2.4M5.4 12H3M18.1 5.9l-1.7 1.7M7.6 16.4l-1.7 1.7M18.1 18.1l-1.7-1.7M7.6 7.6 5.9 5.9" opacity=".75" />
    </svg>
  );
}

/** Compatibility: two linked hearts / connection. */
export function HeartLinkIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8.3 5.3c-2 0-3.6 1.6-3.6 3.6 0 3.2 3.4 5.3 6.3 7.7 1.1-.9 2.4-1.9 3.6-3" />
      <path d="M15.7 8.3c2 0 3.6 1.6 3.6 3.6 0 1.1-.5 2.1-1.2 3" opacity=".8" />
      <path d="M10.5 11.5 12 13l1.5-1.5" opacity=".6" />
    </svg>
  );
}

/** Generic symbol icon family shared by several daily-reading symbols
 * whose imagery is close enough to reuse one glyph (e.g. Moon /
 * Crescent / Night Sky). Deliberately generic/abstract rather than a
 * literal illustration of any single symbol name. */
export function MoonSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15.5 5.5A7 7 0 1 0 18.5 18a8.4 8.4 0 0 1-3-12.5z" />
    </svg>
  );
}

export function FeatherSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 4c-6 0-12 4-12 12v2.5" />
      <path d="M18 4 6 16.5" opacity=".7" />
      <path d="M9.5 13 13 9.5M7.5 15.5l3-3" opacity=".6" />
    </svg>
  );
}

export function WaveSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 10.5c1.6-1.6 3.2-1.6 4.8 0s3.2 1.6 4.8 0 3.2-1.6 4.8 0 3.2 1.6 4.8 0" />
      <path d="M3 15.5c1.6-1.6 3.2-1.6 4.8 0s3.2 1.6 4.8 0 3.2-1.6 4.8 0 3.2 1.6 4.8 0" opacity=".6" />
    </svg>
  );
}

export function MountainSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 18 9 8l3.5 5.5L15 10l6 8z" />
      <circle cx="8.5" cy="6.5" r="1.4" opacity=".7" />
    </svg>
  );
}

export function FlameSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5c1 2 .3 3.2-.7 4.4-1.2 1.4-2.3 2.7-2.3 4.6a3 3 0 0 0 6 0c0-1 -.4-1.7-1-2.3.9.3 2 1.6 2 3.6a4.7 4.7 0 0 1-9.4 0c0-4 3-5.6 5.4-10.3z" />
    </svg>
  );
}

export function KeySymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="8" cy="8" r="3.4" />
      <path d="M10.3 10.3 19 19M15.5 14.5l2 2M13 17l2 2" opacity=".8" />
    </svg>
  );
}

export function AnchorSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="5.2" r="1.6" />
      <path d="M12 7v13M7 13H3.5a8.5 8.5 0 0 0 8.5 7.5A8.5 8.5 0 0 0 20.5 13H17" opacity=".8" />
      <path d="M8.5 10h7" opacity=".6" />
    </svg>
  );
}

export function CompassSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M14.8 9.2 13 13l-3.8 1.8L11 11z" />
    </svg>
  );
}

export function LeafSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19.5 4.5c.6 7-2.4 13-9 15C4 21 3.5 15 6 11 8.6 7 14 4.5 19.5 4.5z" />
      <path d="M18 6c-4 3-7 6.5-9 12" opacity=".6" />
    </svg>
  );
}

export function LanternSymbolIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="8" y="7" width="8" height="11" rx="2" />
      <path d="M10 3.5h4M12 3.5V7M9 21h6" opacity=".7" />
      <path d="M10.3 12h3.4" opacity=".6" />
    </svg>
  );
}

/* -------------------------------------------------------------------- */
/* Generators / Tools / Calculators / Fun — full icon rollout           */
/* Each icon below is a distinct, purpose-built glyph for one tool      */
/* concept (shared only when the EN and RU pages are the same tool).    */
/* -------------------------------------------------------------------- */

/** Password generator: padlock. */
export function LockIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Random color generator: paint drop with palette dots. */
export function PaletteIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5c-4.7 0-8.5 3.6-8.5 8 0 3.3 2.6 5.3 5.4 5.3.9 0 1.4-.5 1.4-1.2 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-1 0-.7.6-1.3 1.3-1.3H13c3 0 5.5-2.2 5.5-5.4 0-3.5-3.2-6.4-6.5-6.4z" />
      <circle cx="8.3" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="11.3" cy="7.7" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Random date generator: calendar page with a highlighted day. */
export function CalendarDiceIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M8 3.5v3M16 3.5v3" />
      <circle cx="12" cy="14.3" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Random emoji generator: smiling face outline. */
export function SmileyIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.3 14.2c.9 1.3 2.1 2 3.7 2s2.8-.7 3.7-2" />
      <circle cx="9" cy="10" r=".9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Random letter generator: single letter tile. */
export function LetterTileIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9.5 15.5 12 8.5l2.5 7M10.2 13h3.6" />
    </svg>
  );
}

/** Random name generator: person silhouette. */
export function PersonIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c.8-3.6 3.5-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
    </svg>
  );
}

/** Random number generator: numeric hash/order glyph. */
export function HashNumberIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 4 7 20M17 4l-2.5 16M4.5 9h15M3.5 15h15" />
    </svg>
  );
}

/** Random team generator: group of people. */
export function PeopleGroupIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8.5" r="2.6" />
      <path d="M3.8 19c.6-2.9 2.6-4.4 5.2-4.4s4.6 1.5 5.2 4.4" />
      <circle cx="17" cy="9" r="2.1" opacity=".75" />
      <path d="M15.2 14.9c1.8.2 3.4 1.6 3.9 4.1" opacity=".75" />
    </svg>
  );
}

/** Random word generator: word chip with a spark. */
export function WordBubbleIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="6.5" width="17" height="10" rx="3" />
      <path d="M7.5 20.5 9.5 16.5" />
      <path d="M7.5 11.5h3M13 11.5h3.5" opacity=".8" />
    </svg>
  );
}

/** UUID generator: fingerprint-style concentric arcs. */
export function FingerprintIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5c0 2.5-.4 4.4-1 6" />
      <path d="M12 3.5a8.5 8.5 0 0 0-8.5 8.5c0 1.8.2 3.2.6 4.5" />
      <path d="M7.5 19a13 13 0 0 0 1.3-5.5A3.2 3.2 0 0 1 12 10.3a3.2 3.2 0 0 1 3.2 3.2c0 2-.3 3.8-.9 5.4" opacity=".85" />
      <path d="M9.8 20.5c.6-1.7 1-3.4 1-5" opacity=".7" />
    </svg>
  );
}

/** Wheel spinner: roulette wheel with pointer. */
export function RouletteIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 13 5.7 9.8M12 13l6.3-3.2M12 13v-7.5M12 13l3.6 6.4M12 13l-3.6 6.4" opacity=".7" />
      <path d="M12 2.5 10 5.5h4L12 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Company name generator: office building. */
export function BuildingIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="3.5" width="10" height="17" rx="1" />
      <path d="M15 9.5h4v11h-4" />
      <path d="M8 7.5h1M11.5 7.5h1M8 11h1M11.5 11h1M8 14.5h1M11.5 14.5h1" opacity=".8" />
    </svg>
  );
}

/** Domain name generator: globe with connecting link. */
export function GlobeIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="12" r="7.5" />
      <path d="M3.5 12h15M11 4.5c-2.2 2-3.3 4.8-3.3 7.5s1.1 5.5 3.3 7.5c2.2-2 3.3-4.8 3.3-7.5S13.2 6.5 11 4.5z" opacity=".8" />
      <path d="M17.5 17.5 21 21" />
    </svg>
  );
}

/** Case converter: Aa toggle. */
export function CaseToggleIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 15.5 7 6.5l3.5 9M4.4 13h5.2" />
      <path d="M14.5 11.2a2.6 2.6 0 1 1 0 4.6 2.6 2.6 0 0 1 0-4.6zM19.7 10.9v5" opacity=".85" />
    </svg>
  );
}

/** Character counter: cursor with tally marks. */
export function HashCounterIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M7.5 9v6M10.5 9v6M13.5 9.5 15 15" opacity=".85" />
      <path d="M17 9v6" opacity=".85" />
    </svg>
  );
}

/** Word counter: stacked lines with a counter badge. */
export function ListCounterIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 6.5h12M8 12h12M8 17.5h12" />
      <circle cx="4.3" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="4.3" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="4.3" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** QR code generator: scannable grid. */
export function QrCodeIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1" />
      <path d="M14 14h2.7v2.7H14zM19 14h1.5v1.5H19M16.7 16.7H19v1.8M14 19h1.7v1.5" opacity=".85" />
    </svg>
  );
}

/** Remove duplicate lines: stacked lines with one crossed out. */
export function LineMinusIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 6h14M5 12h14" />
      <path d="M5 18h14" opacity=".5" />
      <path d="M4 18h16" stroke="currentColor" opacity=".9" transform="rotate(-8 12 18)" />
    </svg>
  );
}

/** Sort lines: lines of decreasing length with a sort arrow. */
export function SortArrowsIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6h16M4 12h11M4 18h6" />
      <path d="M18 9.5V21M18 21l-2.6-2.6M18 21l2.6-2.6" opacity=".85" />
    </svg>
  );
}

/** Unit converter: two-way swap between measurement scales. */
export function SwapRulerIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="4.5" width="8" height="6" rx="1.2" />
      <path d="M5.5 7.5h1.2M8 7.5h1.2" opacity=".8" />
      <rect x="12.5" y="13.5" width="8" height="6" rx="1.2" />
      <path d="M14.5 16.5h1.2M17 16.5h1.2" opacity=".8" />
      <path d="M12 7.5h4.5M16.5 7.5l-2-2M16.5 7.5l-2 2" />
      <path d="M12 16.5H7.5M7.5 16.5l2-2M7.5 16.5l2 2" />
    </svg>
  );
}

/** Age calculator: calendar with a candle/birthday mark. */
export function CakeCalendarIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16" />
      <path d="M12 3.5v3" opacity=".8" />
      <path d="M8 15.5c.7-1 1.6-1 2.3 0s1.6 1 2.3 0 1.6-1 2.3 0" opacity=".85" />
    </svg>
  );
}

/** BMI calculator: bathroom scale. */
export function ScaleBodyIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <circle cx="12" cy="15" r="2.4" />
      <path d="M12 15 14 12.6" />
      <path d="M9 6.5c1-1.6 5-1.6 6 0" opacity=".8" />
    </svg>
  );
}

/** Date difference calculator: two dates linked by a bracket. */
export function CalendarRangeIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="6" width="7.5" height="7.5" rx="1.3" />
      <rect x="14" y="10.5" width="7.5" height="7.5" rx="1.3" />
      <path d="M10.5 9.5h1.5c1 0 1.5.5 1.5 1.5v1" opacity=".85" />
    </svg>
  );
}

/** Discount calculator: price tag with a percent mark. */
export function TagPercentIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12.5 3.5H19a1 1 0 0 1 1 1v6.5a1 1 0 0 1-.3.7l-8 8a1 1 0 0 1-1.4 0l-7-7a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 .7-.3z" />
      <circle cx="16.2" cy="7.8" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9.5 15.5l6-6" opacity=".85" />
    </svg>
  );
}

/** Percentage calculator: percent glyph. */
export function PercentIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 18 18 6" />
      <circle cx="7.5" cy="7.5" r="2.3" />
      <circle cx="16.5" cy="16.5" r="2.3" />
    </svg>
  );
}

/** Tip calculator: receipt with coin. */
export function ReceiptCoinIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3.5h9v16l-2-1.3-2 1.3-2-1.3-2 1.3-1-1.3z" />
      <path d="M8.5 8h4M8.5 11h4" opacity=".8" />
      <circle cx="18" cy="16" r="3" />
      <path d="M18 14.6v2.8M17 16h2" opacity=".85" />
    </svg>
  );
}

/** Conversation starter: two speech bubbles. */
export function ChatBubblesIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5h11v6.5H9l-3 2.6v-2.6H4z" />
      <path d="M12.5 14.5h6.3l2.2 2v-5h1v-6.5h-6" opacity=".7" transform="translate(-2 1)" />
    </svg>
  );
}

/** Daily idea: lightbulb. */
export function LightbulbIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 17h6M10 20h4" />
      <path d="M12 3.5a6 6 0 0 0-3.4 10.9c.6.4.9 1 .9 1.6h5c0-.6.3-1.2.9-1.6A6 6 0 0 0 12 3.5z" />
      <path d="M12 3.5v0" opacity="0" />
    </svg>
  );
}

/** Decision maker: forking path. */
export function ForkPathIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 20V13c0-2.5 1.5-4 4-4" />
      <path d="M9 9c0-2.5 1.5-4 4-4" />
      <path d="M9 9c0-2.5-1.5-4-4-4" opacity=".7" />
      <circle cx="13" cy="5" r="1.6" />
      <circle cx="5" cy="5" r="1.6" opacity=".7" />
      <circle cx="5" cy="20" r="1.6" />
    </svg>
  );
}

/** Would you rather: two balanced paths / scale. */
export function TwoPathsIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v16" opacity=".6" />
      <path d="M4 8h6M4 8l-1.8 4.4a3 3 0 0 0 5.6 0zM14 8h6M14 8l-1.8 4.4a3 3 0 0 0 5.6 0z" />
    </svg>
  );
}

/** Movie night picker: film clapperboard. */
export function ClapperIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10.5 5 6.8l13.4 3.4-1 3.7z" />
      <rect x="4" y="10.5" width="16" height="8.5" rx="1.3" />
      <path d="M8 6.5 6.5 10M12.5 7.5 11 11M17 8.5l-1.5 3.5" opacity=".8" />
    </svg>
  );
}

/** Never have I ever: raised hand. */
export function HandRaisedIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 12.5V5.2a1.3 1.3 0 0 1 2.6 0v5.3M11.6 10.3V4a1.3 1.3 0 1 1 2.6 0v6.5M14.2 10.3V5.4a1.3 1.3 0 1 1 2.6 0v8.3" />
      <path d="M9 12.5 7.3 11a1.5 1.5 0 0 0-2.2 2l3.6 4.4c1 1.2 2.4 1.9 4 1.9h1.7c2.4 0 4.2-1.8 4.2-4.2v-4.4" />
    </svg>
  );
}

/** Random challenge: flag/trophy. */
export function TrophyIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 4.5h8v5a4 4 0 0 1-8 0v-5z" />
      <path d="M8 6H5.5A2.5 2.5 0 0 0 8 10.5M16 6h2.5A2.5 2.5 0 0 1 16 10.5" opacity=".8" />
      <path d="M12 13.5V17M9 20h6M9.5 17h5" />
    </svg>
  );
}

/** Random question: question mark in a bubble. */
export function QuestionBubbleIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5h16v10.5H10l-4 3.5v-3.5H4z" />
      <path d="M9.8 9.3a2.2 2.2 0 1 1 3 2c-.7.4-1 .8-1 1.6" opacity=".85" />
      <circle cx="11.8" cy="14.6" r=".3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** This or that: split versus panel. */
export function VersusIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4.5h7v15H4zM13 4.5h7v15h-7z" />
      <path d="M10 8.5 14 15.5" opacity=".7" />
    </svg>
  );
}

/** Truth or dare: dual mask. */
export function MaskIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 5.5c2.6-1.3 5-1.3 7.5 0 2.5-1.3 4.9-1.3 7.5 0-.3 5-2.4 9-7.5 13-5.1-4-7.2-8-7.5-13z" />
      <path d="M8.5 10c.6-.5 1.3-.5 1.8 0M13.7 10c.6-.5 1.3-.5 1.8 0" opacity=".85" />
    </svg>
  );
}

/** What should I eat: fork and knife. */
export function ForkKnifeIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 3.5v7.5c0 1.1-.6 1.8-1.6 2V21M5.4 3.5v6M7 3.5v6M8.6 3.5v6" />
      <path d="M15.5 3.5c-1.6.4-2.5 1.9-2.5 4.4 0 2 .9 3.2 2 3.6V21" />
    </svg>
  );
}

/** What to do / compass for activity ideas: compass with pin. */
export function CompassPinIcon(props: ToolIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="10.5" r="7" />
      <path d="M14.5 7.8 13 12l-4.3 1.6L10 9.5z" />
      <path d="M12 17.5v3.5" opacity=".7" />
    </svg>
  );
}

export const TOOL_ICON_MAP = {
  // Fortune / Gadaniya (existing)
  "yes-or-no": SparkleIcon,
  "da-net": SparkleIcon,
  "magic-ball": CrystalBallIcon,
  "shar-sudby": CrystalBallIcon,
  "tarot-card": TarotIcon,
  "karta-dnya": TarotIcon,
  "coin-flip": CoinIcon,
  "monetka": CoinIcon,
  "life-path-number": PathNumberIcon,
  "chislo-sudby": PathNumberIcon,
  "wish-oracle": SparkleIcon,
  "zhelanie": SparkleIcon,
  "daily-reading": SunburstIcon,
  "chto-zhdet-tebya-segodnya": SunburstIcon,
  "compatibility": HeartLinkIcon,
  "sovmestimost": HeartLinkIcon,

  // Generators (EN) + Instrumenty (RU) equivalents
  "random-number": HashNumberIcon,
  "sluchaynoe-chislo": HashNumberIcon,
  "password": LockIcon,
  "generator-paroley": LockIcon,
  "username": NameBadgeIcon,
  "generator-nikov": NameBadgeIcon,
  "uuid-generator": FingerprintIcon,
  "generator-uuid": FingerprintIcon,
  "lorem-ipsum": TextDocumentIcon,
  "random-picker": ShuffleIcon,
  "sluchaynyy-vybor": ShuffleIcon,
  "wheel-spinner": RouletteIcon,
  "sluchaynyy-pobeditel": RouletteIcon,
  "dice-roller": DiceIcon,
  "random-teams": PeopleGroupIcon,
  "sluchaynye-komandy": PeopleGroupIcon,
  "random-color": PaletteIcon,
  "random-date": CalendarDiceIcon,
  "random-emoji": SmileyIcon,
  "random-letter": LetterTileIcon,
  "random-name": PersonIcon,
  "random-word": WordBubbleIcon,
  "company-name": BuildingIcon,
  "domain-name": GlobeIcon,

  // Text / utility tools (EN) + Instrumenty (RU) equivalents
  "case-converter": CaseToggleIcon,
  "registr-teksta": CaseToggleIcon,
  "character-counter": HashCounterIcon,
  "word-counter": ListCounterIcon,
  "schetchik-slov": ListCounterIcon,
  "qr-code-generator": QrCodeIcon,
  "generator-qr-koda": QrCodeIcon,
  "remove-duplicate-lines": LineMinusIcon,
  "udalit-dublikaty-strok": LineMinusIcon,
  "sort-lines": SortArrowsIcon,
  "sortirovka-strok": SortArrowsIcon,
  "unit-converter": SwapRulerIcon,
  "konverter-edinic": SwapRulerIcon,

  // Calculators (EN) + Instrumenty (RU) equivalents
  "age-calculator": CakeCalendarIcon,
  "kalkulyator-vozrasta": CakeCalendarIcon,
  "bmi-calculator": ScaleBodyIcon,
  "kalkulyator-imt": ScaleBodyIcon,
  "date-difference": CalendarRangeIcon,
  "raznitsa-mezhdu-datami": CalendarRangeIcon,
  "discount-calculator": TagPercentIcon,
  "kalkulyator-skidki": TagPercentIcon,
  "percentage-calculator": PercentIcon,
  "kalkulyator-protsentov": PercentIcon,
  "tip-calculator": ReceiptCoinIcon,
  "kalkulyator-chaevyh": ReceiptCoinIcon,

  // Fun & Random (EN) + Развлечения (RU) equivalents
  "conversation-starter": ChatBubblesIcon,
  "tema-dlya-razgovora": ChatBubblesIcon,
  "daily-idea": LightbulbIcon,
  "ideya-dnya": LightbulbIcon,
  "decision-maker": ForkPathIcon,
  "prinyat-reshenie": ForkPathIcon,
  "movie-night-picker": ClapperIcon,
  "chto-posmotret": ClapperIcon,
  "never-have-i-ever": HandRaisedIcon,
  "ya-nikogda-ne": HandRaisedIcon,
  "random-challenge": TrophyIcon,
  "sluchaynoe-zadanie": TrophyIcon,
  "random-question": QuestionBubbleIcon,
  "sluchaynyy-vopros": QuestionBubbleIcon,
  "this-or-that": VersusIcon,
  "to-ili-eto": VersusIcon,
  "truth-or-dare": MaskIcon,
  "pravda-ili-deystvie": MaskIcon,
  "what-should-i-eat": ForkKnifeIcon,
  "chto-poest": ForkKnifeIcon,
  "what-to-do": CompassPinIcon,
  "chem-zanyatsya": CompassPinIcon,
  "would-you-rather": TwoPathsIcon,
  "chto-by-ty-vybral": TwoPathsIcon,

  // IQ test
  "iq-test": BrainIcon,
  "test-na-iq": BrainIcon,

  // AI name/text generators (EN + RU share the same ids)
  "ai-username": SparkleIcon,
  "ai-business-name": SparkleIcon,
  "ai-domain-name": GlobeIcon,
  "ai-fantasy-name": CrystalBallIcon,
  "ai-character-name": MaskIcon,
  "ai-pet-name": SmileyIcon,
  "ai-team-name": TrophyIcon,
  "ai-slogan": WordBubbleIcon,
  "ai-instagram-caption": SparkleIcon,
  "ai-random-question": QuestionBubbleIcon,
} satisfies Record<string, (props: ToolIconProps) => React.ReactElement>;
