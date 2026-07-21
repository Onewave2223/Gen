"use client";

import * as React from "react";
import { getTrendingItems } from "@/lib/engagement/highlights";
import { GeneratorCard } from "@/components/generators/GeneratorCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { CatalogItem, CatalogLocale } from "@/lib/engagement/catalog";

type Locale = CatalogLocale;

const COPY: Record<
  Locale,
  { eyebrow: string; title: string; subtitle: string }
> = {
  en: {
    eyebrow: "🔥 Trending This Week",
    title: "What everyone's using right now",
    subtitle: "A fresh mix of the most popular tools, updated every week.",
  },
  ru: {
    eyebrow: "🔥 Популярно на этой неделе",
    title: "Чем сейчас пользуются чаще всего",
    subtitle: "Свежая подборка самых популярных инструментов, обновляется каждую неделю.",
  },
};

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)]"
    >
      <div className="h-10 w-10 rounded-[var(--radius-sm)] bg-[var(--surface-hover)]" />
      <div className="h-4 w-2/3 rounded bg-[var(--surface-hover)]" />
      <div className="h-3 w-full rounded bg-[var(--surface-hover)]" />
      <div className="h-3 w-4/5 rounded bg-[var(--surface-hover)]" />
    </div>
  );
}

export interface TrendingSectionProps {
  locale?: Locale;
}

/**
 * Weekly-rotating "trending" grid. The set depends on the current
 * ISO week, so — like GeneratorOfTheDay — it's computed client-side
 * on mount rather than baked into a statically-generated homepage.
 * Skeleton placeholders reserve the final grid's dimensions so
 * mounting doesn't shift surrounding content (no CLS).
 */
export function TrendingSection({ locale = "en" }: TrendingSectionProps = {}) {
  const [items, setItems] = React.useState<CatalogItem[] | null>(null);
  const copy = COPY[locale];

  React.useEffect(() => {
    setItems(getTrendingItems(locale));
  }, [locale]);

  return (
    <section
      aria-labelledby="trending-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <div className="flex flex-col gap-2 text-center">
        <span className="motion-float-soft text-sm font-medium text-[var(--primary)]">
          {copy.eyebrow}
        </span>
        <h2
          id="trending-heading"
          className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          {copy.title}
        </h2>
        <p className="mx-auto max-w-xl text-base text-[var(--muted)]">
          {copy.subtitle}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items === null
          ? Array.from({ length: 6 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          : items.map((item, index) => (
              <ScrollReveal key={item.id} index={index}>
                <GeneratorCard
                  title={item.name}
                  description={item.description}
                  href={item.href}
                  badge={index === 0 ? "#1" : undefined}
                  favoriteId={item.id}
                />
              </ScrollReveal>
            ))}
      </div>
    </section>
  );
}

TrendingSection.displayName = "TrendingSection";
