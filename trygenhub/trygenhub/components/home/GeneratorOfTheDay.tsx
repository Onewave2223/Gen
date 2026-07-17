"use client";

import * as React from "react";
import Link from "next/link";
import { catalog, catalogRu, type CatalogItem } from "@/lib/engagement/catalog";

const MS_PER_DAY = 86_400_000;

type Locale = "en" | "ru";

const COPY: Record<Locale, { badge: string; cta: string; ariaLabel: string }> = {
  en: {
    badge: "✨ Generator of the Day",
    cta: "Try it now →",
    ariaLabel: "Generator of the Day",
  },
  ru: {
    badge: "✨ Инструмент дня",
    cta: "Попробовать →",
    ariaLabel: "Инструмент дня",
  },
};

function getTodaysItem(items: readonly CatalogItem[]): CatalogItem | null {
  if (items.length === 0) return null;
  const dayIndex = Math.floor(Date.now() / MS_PER_DAY);
  return items[dayIndex % items.length];
}

export interface GeneratorOfTheDayProps {
  locale?: Locale;
}

export function GeneratorOfTheDay({ locale = "en" }: GeneratorOfTheDayProps = {}) {
  const items = locale === "ru" ? catalogRu : catalog;
  const copy = COPY[locale];

  // Computed on mount (client-only) so a statically-generated homepage
  // still rotates daily instead of freezing at build time.
  const [item, setItem] = React.useState<CatalogItem | null>(null);

  React.useEffect(() => {
    setItem(getTodaysItem(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  if (!item) return null;

  return (
    <section
      aria-label={copy.ariaLabel}
      className="mx-auto max-w-6xl px-4 py-6 sm:px-6"
    >
      <Link
        href={item.href}
        aria-label={`${copy.ariaLabel}: ${item.name} — ${item.description}`}
        className="group flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-gradient-to-br from-[var(--primary-soft)] to-[var(--surface-elevated)] p-6 shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="flex flex-col gap-1.5">
          <span
            aria-hidden="true"
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--primary)] px-2.5 py-0.5 text-xs font-medium text-[var(--primary-foreground)]"
          >
            {copy.badge}
          </span>
          <span className="text-lg font-semibold text-[var(--foreground)]">
            {item.name}
          </span>
          <span className="text-sm text-[var(--muted)]">
            {item.description}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="inline-flex h-10 shrink-0 items-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-opacity group-hover:opacity-90"
        >
          {copy.cta}
        </span>
      </Link>
    </section>
  );
}

GeneratorOfTheDay.displayName = "GeneratorOfTheDay";
