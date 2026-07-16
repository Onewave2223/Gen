/**
 * Shared atmospheric crystal-ball visual for the Magic Ball / Шар судьбы
 * tools — a glass sphere with a swirling inner fog and a stand, built
 * entirely from inline SVG + CSS transform animations (no images, no
 * animation library). `shaking` drives a brief shake before the answer
 * appears; the fog keeps swirling gently at rest for atmosphere.
 */
export function CrystalBallScene({ shaking }: { shaking: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto flex h-40 w-40 items-center justify-center ${shaking ? "crystal-ball-shake" : ""}`}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-2xl">
        <defs>
          <radialGradient id="ball-glass" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#7c3aed" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2e1065" stopOpacity="0.9" />
          </radialGradient>
          <radialGradient id="ball-fog-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5d0fe" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f5d0fe" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ball-fog-b" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0" />
          </radialGradient>
          <clipPath id="ball-clip">
            <circle cx="100" cy="90" r="62" />
          </clipPath>
        </defs>

        {/* stand */}
        <path d="M60 172h80l-10 14H70z" fill="#3b0764" opacity="0.9" />
        <ellipse cx="100" cy="186" rx="46" ry="7" fill="#1e1b4b" opacity="0.6" />

        {/* sphere */}
        <circle cx="100" cy="90" r="64" fill="url(#ball-glass)" />

        <g clipPath="url(#ball-clip)">
          <ellipse
            className="crystal-fog-swirl"
            cx="90"
            cy="95"
            rx="46"
            ry="30"
            fill="url(#ball-fog-a)"
            style={{ transformOrigin: "100px 90px" }}
          />
          <ellipse
            className="crystal-fog-swirl-reverse"
            cx="110"
            cy="85"
            rx="40"
            ry="26"
            fill="url(#ball-fog-b)"
            style={{ transformOrigin: "100px 90px" }}
          />
        </g>

        <circle cx="100" cy="90" r="64" fill="none" stroke="#e9d5ff" strokeOpacity="0.6" strokeWidth="2" />
        <ellipse cx="78" cy="65" rx="14" ry="8" fill="#ffffff" opacity="0.35" />
      </svg>
    </div>
  );
}

CrystalBallScene.displayName = "CrystalBallScene";
