"use client";

import Link from "next/link";
import { useRecentlyUsed } from "@/lib/engagement/hooks";

type Locale = "en" | "ru";

const COPY: Record<
  Locale,
  { heading: string; emptyText: string; browseLabel: string; browseHref: string }
> = {
  en: {
    heading: "Recently used",
    emptyText:
      "Tools you open will show up here so you can jump back in quickly.",
    browseLabel: "Browse tools",
    browseHref: "/tools",
  },
  ru: {
    heading: "Недавно использованные",
    emptyText:
      "Инструменты, которые вы открываете, будут появляться здесь, чтобы вы могли быстро вернуться к ним.",
    browseLabel: "Все инструменты",
    browseHref: "/ru/instrumenty",
  },
};

export interface RecentlyUsedSectionProps {
  locale?: Locale;
}

export function RecentlyUsedSection({ locale = "en" }: RecentlyUsedSectionProps = {}) {
  const { items } = useRecentlyUsed(locale);
  const copy = COPY[locale];

  return (
    <section
      aria-labelledby="recently-used-heading"
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6"
    >
      <h2
        id="recently-used-heading"
        className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
      >
        {copy.heading}
      </h2>

      {items.length === 0 ? (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center">
          <span aria-hidden="true" className="text-3xl">
            🕒
          </span>
          <p className="text-sm text-[var(--muted)]">{copy.emptyText}</p>
          <Link
            href={copy.browseHref}
            className="mt-1 inline-flex h-9 items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {copy.browseLabel}
          </Link>
        </div>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

RecentlyUsedSection.displayName = "RecentlyUsedSection";
