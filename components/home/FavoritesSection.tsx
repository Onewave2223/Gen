"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/engagement/hooks";

type Locale = "en" | "ru";

const COPY: Record<
  Locale,
  { heading: string; emptyText: string; browseLabel: string; browseHref: string }
> = {
  en: {
    heading: "★ Your favorites",
    emptyText:
      "You haven't favorited anything yet. Tap the star on any generator or tool to save it here.",
    browseLabel: "Explore generators",
    browseHref: "/generators",
  },
  ru: {
    heading: "★ Избранное",
    emptyText:
      "Вы ещё ничего не добавили в избранное. Нажмите на звёздочку рядом с любым инструментом, чтобы сохранить его здесь.",
    browseLabel: "Все инструменты",
    browseHref: "/ru/instrumenty",
  },
};

export interface FavoritesSectionProps {
  locale?: Locale;
}

export function FavoritesSection({ locale = "en" }: FavoritesSectionProps = {}) {
  const { items } = useFavorites(locale);
  const copy = COPY[locale];

  return (
    <section
      aria-labelledby="favorites-heading"
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="favorites-heading"
          className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
        >
          {copy.heading}
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center">
          <span aria-hidden="true" className="text-3xl">
            ☆
          </span>
          <p className="text-sm text-[var(--muted)]">{copy.emptyText}</p>
          <Link
            href={copy.browseHref}
            className="mt-1 inline-flex h-9 items-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {copy.browseLabel}
          </Link>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {item.name}
                </span>
                <span className="line-clamp-2 text-xs text-[var(--muted)]">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

FavoritesSection.displayName = "FavoritesSection";
