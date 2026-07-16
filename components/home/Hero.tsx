import type { ReactNode } from "react";

export interface HeroProps {
  badge: string;
  /** Text before the gradient-highlighted word/phrase. */
  titleBefore: string;
  /** The gradient-highlighted word/phrase. */
  titleAccent: string;
  /** Optional text after the gradient-highlighted word/phrase. */
  titleAfter?: string;
  subtitle: string;
}

/**
 * Compact hero — brand motif + H1 + one-line subtitle only.
 *
 * Intentionally has NO CTA buttons and NO long benefit list: on both
 * desktop and mobile the very next thing below this section is the
 * CategoryPortals grid, which does the "where do I click" job instead.
 * Keeping this section short is what lets category cards appear near
 * the first viewport on mobile.
 */
export function Hero({ badge, titleBefore, titleAccent, titleAfter, subtitle }: HeroProps): ReactNode {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      {/* Brand motif — CSS-only gradient orbs + dot grid, no images/video/WebGL. */}
      <div aria-hidden="true" className="absolute inset-0 brand-grid" />
      <div
        aria-hidden="true"
        className="brand-orb brand-float -left-16 -top-16 h-40 w-40 sm:h-64 sm:w-64"
      />
      <div
        aria-hidden="true"
        className="brand-orb brand-orb-accent -right-10 top-4 h-32 w-32 sm:h-56 sm:w-56"
        style={{ animationDelay: "-2.5s" }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-2.5 px-4 py-7 text-center sm:gap-3 sm:px-6 sm:py-10">
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-xs font-medium text-[var(--muted)] shadow-[var(--shadow-sm)]">
          {badge}
        </span>

        <h1 className="brand-fade-up text-2xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
          {titleBefore} <span className="brand-gradient-text">{titleAccent}</span>
          {titleAfter ? ` ${titleAfter}` : null}
        </h1>

        <p
          className="brand-fade-up max-w-md text-sm text-[var(--muted)] sm:text-lg"
          style={{ animationDelay: "60ms" }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}

Hero.displayName = "Hero";
