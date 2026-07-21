import { getRecentlyAddedItems } from "@/lib/engagement/highlights";
import { GeneratorCard } from "@/components/generators/GeneratorCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { CatalogLocale } from "@/lib/engagement/catalog";

type Locale = CatalogLocale;

const COPY: Record<
  Locale,
  { eyebrow: string; title: string; subtitle: string; badge: string }
> = {
  en: {
    eyebrow: "🆕 Recently Added",
    title: "Fresh off the workbench",
    subtitle: "The newest generators and tools, added to the site.",
    badge: "NEW",
  },
  ru: {
    eyebrow: "🆕 Новые генераторы",
    title: "Только что добавили",
    subtitle: "Самые новые генераторы и инструменты на сайте.",
    badge: "НОВОЕ",
  },
};

export interface RecentlyAddedSectionProps {
  locale?: Locale;
}

/**
 * Static, curated "what's new" grid. Unlike TrendingSection this
 * doesn't depend on the current date, so it renders fully on the
 * server — no mount delay, no CLS, fully indexable.
 */
export function RecentlyAddedSection({ locale = "en" }: RecentlyAddedSectionProps = {}) {
  const items = getRecentlyAddedItems(locale);
  const copy = COPY[locale];

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="recently-added-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <div className="flex flex-col gap-2 text-center">
        <span className="text-sm font-medium text-[var(--accent-2)]">
          {copy.eyebrow}
        </span>
        <h2
          id="recently-added-heading"
          className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          {copy.title}
        </h2>
        <p className="mx-auto max-w-xl text-base text-[var(--muted)]">
          {copy.subtitle}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <ScrollReveal key={item.id} index={index}>
            <GeneratorCard
              title={item.name}
              description={item.description}
              href={item.href}
              badge={copy.badge}
              favoriteId={item.id}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

RecentlyAddedSection.displayName = "RecentlyAddedSection";
