"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { catalog, catalogRu, getCatalogItemByHref, type CatalogItem } from "@/lib/engagement/catalog";
import { recordRecentlyUsed } from "@/lib/engagement/hooks";
import { FavoriteButton } from "@/components/engagement/FavoriteButton";

type Locale = "en" | "ru";

const COPY: Record<Locale, { random: string; home: string; homeHref: string }> = {
  en: { random: "Random Generator", home: "Back to Home", homeHref: "/" },
  ru: { random: "Случайный инструмент", home: "На главную", homeHref: "/ru" },
};

function pickRandomHref(items: readonly CatalogItem[], excludeHref?: string): string {
  const pool = items.filter((item) => item.href !== excludeHref);
  const source = pool.length > 0 ? pool : items;
  const index = Math.floor(Math.random() * source.length);
  return source[index]?.href ?? "/";
}

export function QuickActions() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const locale: Locale = pathname.startsWith("/ru") ? "ru" : "en";
  const items = locale === "ru" ? catalogRu : catalog;
  const copy = COPY[locale];
  const current = React.useMemo(
    () => getCatalogItemByHref(pathname, locale),
    [pathname, locale],
  );

  React.useEffect(() => {
    if (current) {
      recordRecentlyUsed(current.id, locale);
    }
    // Only re-run when the resolved catalog item changes (i.e. on navigation).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id, locale]);

  const handleRandom = () => {
    router.push(pickRandomHref(items, pathname));
  };

  if (!current) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
      <FavoriteButton id={current.id} label={current.name} size="md" locale={locale} />
      <button
        type="button"
        onClick={handleRandom}
        className="motion-press inline-flex h-10 items-center gap-1.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] px-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      >
        <span aria-hidden="true">🎲</span>
        {copy.random}
      </button>
      <Link
        href={copy.homeHref}
        className="motion-press inline-flex h-10 items-center gap-1.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] px-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      >
        <span aria-hidden="true">🏠</span>
        {copy.home}
      </Link>
    </div>
  );
}

QuickActions.displayName = "QuickActions";

export { pickRandomHref };
