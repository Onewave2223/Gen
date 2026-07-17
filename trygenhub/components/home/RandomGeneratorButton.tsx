"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { pickRandomHref } from "@/components/engagement/QuickActions";
import { catalog, catalogRu } from "@/lib/engagement/catalog";
import { cn } from "@/lib/utils";

type Locale = "en" | "ru";

const DEFAULT_LABEL: Record<Locale, string> = {
  en: "🎲 Surprise Me",
  ru: "🎲 Случайный генератор",
};

// How long the dice-spin plays before navigating, so the click always
// reads as "choosing something" rather than an instant, jarring jump.
const SPIN_DURATION_MS = 420;

export interface RandomGeneratorButtonProps {
  className?: string;
  label?: string;
  locale?: Locale;
}

/**
 * Premium "Surprise Me" button — animated gradient background, a
 * shaking dice on hover, and a short spin-then-navigate transition on
 * click so jumping to a random generator feels intentional rather than
 * an abrupt page swap.
 */
export function RandomGeneratorButton({
  className,
  label,
  locale = "en",
}: RandomGeneratorButtonProps) {
  const router = useRouter();
  const items = locale === "ru" ? catalogRu : catalog;
  const resolvedLabel = label ?? DEFAULT_LABEL[locale];
  const [isSpinning, setIsSpinning] = React.useState(false);

  const handleClick = () => {
    if (isSpinning) return;
    const destination = pickRandomHref(items);
    setIsSpinning(true);
    window.setTimeout(() => {
      router.push(destination);
      // Reset after navigation kicks off so the button is ready again
      // if the person lands back here (e.g. via browser back).
      setIsSpinning(false);
    }, SPIN_DURATION_MS);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-busy={isSpinning}
      className={cn(
        "surprise-me-btn motion-press motion-ripple inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius)] px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-70",
        className,
      )}
      data-rippling={isSpinning ? "true" : "false"}
    >
      <span
        aria-hidden="true"
        className="surprise-me-icon inline-block"
        data-spinning={isSpinning ? "true" : "false"}
      >
        🎲
      </span>
      {resolvedLabel}
    </button>
  );
}

RandomGeneratorButton.displayName = "RandomGeneratorButton";
