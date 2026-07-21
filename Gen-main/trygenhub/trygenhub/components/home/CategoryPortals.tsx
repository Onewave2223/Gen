import type { ReactNode } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

export type PortalTheme =
  | "fortune"
  | "generators"
  | "iq"
  | "fun"
  | "text"
  | "calculators";

export interface CategoryPortalQuickLink {
  label: string;
  href: string;
}

export interface CategoryPortalItem {
  id: string;
  href: string;
  name: string;
  description: string;
  count?: number;
  countLabel?: string;
  ctaLabel: string;
  size: "large" | "medium";
  theme: PortalTheme;
  /** 2–3 popular deep links shown as chips. Only rendered on "large" cards. */
  quickLinks?: readonly CategoryPortalQuickLink[];
}

export interface CategoryPortalsProps {
  items: readonly CategoryPortalItem[];
  /**
   * Optional visible eyebrow/title/description above the grid. Omit these
   * (the default) so the cards themselves are the first thing a person
   * sees below the hero — a screen-reader-only heading is still rendered
   * for document structure and SEO.
   */
  eyebrow?: string;
  title: string;
  description?: string;
}

const THEME_ICON: Record<PortalTheme, ReactNode> = {
  fortune: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="8" />
      <path d="M12 18v4M8 22h8" />
    </svg>
  ),
  generators: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="16" cy="16" r="1.2" fill="currentColor" />
      <circle cx="16" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="16" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  iq: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  fun: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </svg>
  ),
  text: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  calculators: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  ),
};

const THEME_CLASSES: Record<
  PortalTheme,
  { card: string; icon: string; chip: string; decor: ReactNode }
> = {
  fortune: {
    card: "mystic-scope mystic-bg border-[var(--border)]",
    icon: "bg-[var(--primary-soft)] text-[var(--primary)]",
    chip: "border-[var(--border)] bg-[var(--surface)]/70 text-[var(--primary)] hover:bg-[var(--surface-hover)]",
    decor: (
      <>
        <span aria-hidden="true" className="mystic-twinkle pointer-events-none absolute right-8 top-6 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
        <span aria-hidden="true" className="mystic-twinkle pointer-events-none absolute right-16 top-14 h-1 w-1 rounded-full bg-[var(--primary)]" style={{ animationDelay: "-1s" }} />
        <span aria-hidden="true" className="mystic-twinkle pointer-events-none absolute right-24 top-9 h-1 w-1 rounded-full bg-[var(--primary)]" style={{ animationDelay: "-2s" }} />
        <span aria-hidden="true" className="mystic-twinkle pointer-events-none absolute right-12 top-24 h-1 w-1 rounded-full bg-[var(--primary)]" style={{ animationDelay: "-1.6s" }} />
      </>
    ),
  },
  generators: {
    card: "border-[var(--border)]",
    icon: "bg-[var(--accent-2-soft)] text-[var(--accent-2)]",
    chip: "border-[var(--border)] bg-[var(--surface)]/70 text-[var(--accent-2)] hover:bg-[var(--surface-hover)]",
    decor: (
      <>
        <div aria-hidden="true" className="brand-grid pointer-events-none absolute inset-0 opacity-70" />
        <div aria-hidden="true" className="brand-orb brand-orb-accent brand-float pointer-events-none -right-10 -top-10 h-40 w-40" />
      </>
    ),
  },
  iq: {
    card: "border-[var(--border)]",
    icon: "bg-[var(--primary-soft)] text-[var(--primary)]",
    chip: "border-[var(--border)] bg-[var(--surface)]/70 text-[var(--primary)] hover:bg-[var(--surface-hover)]",
    decor: (
      <div aria-hidden="true" className="brand-orb brand-float -right-8 -top-8 h-32 w-32" />
    ),
  },
  fun: {
    card: "border-[var(--border)]",
    icon: "bg-[#fffbeb] text-[#f59e0b] dark:bg-[#2a1f0a]",
    chip: "border-[var(--border)] bg-[var(--surface)]/70 text-[#b45309] hover:bg-[var(--surface-hover)] dark:text-[#f59e0b]",
    decor: (
      <div aria-hidden="true" className="brand-orb brand-orb-accent brand-float -right-8 -top-8 h-32 w-32" style={{ animationDelay: "-1.5s" }} />
    ),
  },
  text: {
    card: "border-[var(--border)]",
    icon: "bg-[var(--surface)] text-[var(--muted)]",
    chip: "border-[var(--border)] bg-[var(--surface)]/70 text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
    decor: null,
  },
  calculators: {
    card: "border-[var(--border)]",
    icon: "bg-[var(--success-soft)] text-[var(--success)]",
    chip: "border-[var(--border)] bg-[var(--surface)]/70 text-[var(--success)] hover:bg-[var(--surface-hover)]",
    decor: (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 bottom-4 top-auto h-16 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--success) 0, var(--success) 1px, transparent 1px, transparent 10px)",
        }}
      />
    ),
  },
};

function CardChips({
  quickLinks,
  chipClass,
}: {
  quickLinks: readonly CategoryPortalQuickLink[];
  chipClass: string;
}) {
  return (
    <div className="relative z-10 mt-1 flex flex-wrap gap-1.5">
      {quickLinks.map((link, i) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "relative z-10 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
            chipClass,
            // Keep mobile chip rows short — third quick link only shows from sm+.
            i >= 2 && "hidden sm:inline-flex",
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function CategoryPortals({ eyebrow, title, description, items }: CategoryPortalsProps) {
  const hasVisibleHeader = Boolean(eyebrow || description);

  return (
    <section id="categories" className="mx-auto max-w-6xl px-4 pb-10 pt-4 sm:px-6 sm:pb-14 sm:pt-6">
      {hasVisibleHeader ? (
        <div className="flex flex-col gap-1.5 pb-6 text-center sm:pb-8">
          {eyebrow ? (
            <span className="text-sm font-medium text-[var(--primary)]">{eyebrow}</span>
          ) : null}
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto max-w-xl text-sm text-[var(--muted)] sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      ) : (
        <h2 className="sr-only">{title}</h2>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, index) => {
          const theme = THEME_CLASSES[item.theme];
          const isLarge = item.size === "large";
          const showChips = isLarge && item.quickLinks && item.quickLinks.length > 0;

          const cardClassName = cn(
            "group relative flex h-full flex-col gap-2 overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--surface-elevated)] shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)]",
            theme.card,
            isLarge
              ? "min-h-[168px] p-4 sm:min-h-[220px] sm:p-7"
              : "min-h-[150px] p-3.5 sm:min-h-[180px] sm:p-5",
          );

          const iconEl = (
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none relative flex h-10 w-10 items-center justify-center rounded-[var(--radius)] transition-transform duration-200 group-hover:scale-110 sm:h-11 sm:w-11",
                theme.icon,
              )}
            >
              {THEME_ICON[item.theme]}
            </span>
          );

          const nameEl = (
            <span
              className={cn(
                "pointer-events-none relative font-semibold text-[var(--foreground)]",
                isLarge ? "text-lg sm:text-xl" : "text-sm sm:text-base",
              )}
            >
              {item.name}
            </span>
          );

          const descriptionEl = (
            <span
              className={cn(
                "pointer-events-none relative text-[var(--muted)]",
                isLarge ? "text-sm" : "text-xs sm:text-sm",
                showChips ? "line-clamp-1 sm:line-clamp-2" : "flex-1",
              )}
            >
              {item.description}
            </span>
          );

          const ctaEl = (
            <span
              className={cn(
                "pointer-events-none relative mt-auto flex items-center gap-1.5 font-medium text-[var(--primary)]",
                isLarge ? "text-sm" : "text-xs sm:text-sm",
              )}
            >
              {item.count != null ? `${item.ctaLabel} ${item.count} ${item.countLabel ?? ""}`.trim() : item.ctaLabel}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          );

          return (
            <ScrollReveal key={item.id} index={index} className={cn(isLarge && "col-span-2")}>
              {showChips ? (
                // "Stretched link" pattern: the whole card is clickable via an
                // absolutely-positioned overlay link, while the quick-link
                // chips below stay real, independently-clickable <Link>s
                // (nested <a> inside <a> isn't valid HTML).
                <div className={cardClassName}>
                  <Link
                    href={item.href}
                    className="absolute inset-0 z-0 rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    aria-label={item.name}
                  />
                  {theme.decor}
                  {iconEl}
                  {nameEl}
                  {descriptionEl}
                  <CardChips quickLinks={item.quickLinks!} chipClass={theme.chip} />
                  {ctaEl}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    cardClassName,
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                  )}
                >
                  {theme.decor}
                  {iconEl}
                  {nameEl}
                  {descriptionEl}
                  {ctaEl}
                </Link>
              )}
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

CategoryPortals.displayName = "CategoryPortals";
