"use client";

import type { Locale } from "@/lib/iq-test/types";
import { getDictionary } from "@/lib/iq-test/i18n";

interface Props {
  iqScore: number;
  locale: Locale;
}

const COLORS = ["#94a3b8", "#60a5fa", "#34d399", "#a78bfa", "#f59e0b"];

const SCALE_MIN = 70;
const SCALE_MAX = 145;
const SCALE_RANGE = SCALE_MAX - SCALE_MIN;

export function ScoreScale({ iqScore, locale }: Props) {
  const dict = getDictionary(locale);
  const bands = dict.scaleBandLabels.map((b, i) => ({ ...b, color: COLORS[i % COLORS.length] }));
  const clampedScore = Math.min(SCALE_MAX, Math.max(SCALE_MIN, iqScore));
  const markerPct = ((clampedScore - SCALE_MIN) / SCALE_RANGE) * 100;

  return (
    <div className="flex flex-col gap-4" role="img" aria-label={`${dict.scaleTitle}: ${iqScore}`}>
      <h3 className="text-sm font-semibold text-[var(--foreground)]">
        {dict.scaleTitle}
      </h3>

      <div className="relative">
        <div className="flex h-6 overflow-hidden rounded-full">
          {bands.map((band) => {
            const width = ((band.max - band.min + 1) / SCALE_RANGE) * 100;
            return (
              <div
                key={band.label}
                style={{ width: `${width}%`, backgroundColor: band.color }}
                className="opacity-70"
                title={`${band.label}: ${band.min}–${band.max}`}
              />
            );
          })}
        </div>

        <div
          className="absolute top-0 -mt-1.5 flex flex-col items-center"
          style={{ left: `${markerPct}%`, transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          <div className="h-9 w-0.5 bg-[var(--foreground)]" />
        </div>

        <div
          className="absolute top-10 -translate-x-1/2 rounded-full border-2 border-[var(--foreground)] bg-[var(--background)] px-2 py-0.5 text-xs font-bold text-[var(--foreground)] whitespace-nowrap"
          style={{ left: `clamp(20px, ${markerPct}%, calc(100% - 20px))` }}
          aria-hidden="true"
        >
          {iqScore}
        </div>
      </div>

      <div className="mt-8 flex justify-between text-xs text-[var(--muted)]">
        <span>70</span>
        <span>85</span>
        <span>100</span>
        <span>115</span>
        <span>130</span>
        <span>145</span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {bands.map((band) => (
          <div key={band.label} className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: band.color, opacity: 0.85 }}
              aria-hidden="true"
            />
            {band.label} ({band.min}–{band.max})
          </div>
        ))}
      </div>

      <p className="text-xs text-[var(--muted)] italic">
        {dict.scaleFootnote}
      </p>
    </div>
  );
}

ScoreScale.displayName = "ScoreScale";
