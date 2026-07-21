/** Shared card-back design — the same pattern for every card, since the
 * back must never hint at the identity of the card underneath. */
export function TarotCardBack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 320" className={className} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="tarot-back-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a0d2e" />
          <stop offset="100%" stopColor="#2d1454" />
        </linearGradient>
        <pattern id="tarot-back-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.4" fill="#c084fc" opacity="0.35" />
        </pattern>
      </defs>
      <rect x="2" y="2" width="196" height="316" rx="14" fill="url(#tarot-back-bg)" />
      <rect x="2" y="2" width="196" height="316" rx="14" fill="url(#tarot-back-pattern)" />
      <rect
        x="14"
        y="14"
        width="172"
        height="292"
        rx="8"
        fill="none"
        stroke="#c084fc"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <g transform="translate(100 160)" stroke="#e9d5ff" strokeWidth="2" fill="none" opacity="0.85">
        <circle r="34" />
        <circle r="18" />
        <path d="M0 -34 V-52 M0 34 V52 M-34 0 H-52 M34 0 H52" />
      </g>
    </svg>
  );
}

TarotCardBack.displayName = "TarotCardBack";
