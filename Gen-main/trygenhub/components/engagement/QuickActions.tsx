"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { catalog, catalogRu, getCatalogItemByHref, type CatalogItem } from "@/lib/engagement/catalog";
import { recordRecentlyUsed } from "@/lib/engagement/hooks";
import { FavoriteButton } from "@/components/engagement/FavoriteButton";
import { copyToClipboard } from "@/lib/utils";

type Locale = "en" | "ru";

const COPY: Record<
  Locale,
  {
    random: string;
    home: string;
    homeHref: string;
    copyLink: string;
    copied: string;
    regenerate: string;
    share: string;
    shared: string;
  }
> = {
  en: {
    random: "Random Generator",
    home: "Back to Home",
    homeHref: "/",
    copyLink: "Copy Link",
    copied: "Link copied!",
    regenerate: "Generate Again",
    share: "Share",
    shared: "Ready to share!",
  },
  ru: {
    random: "Случайный инструмент",
    home: "На главную",
    homeHref: "/ru",
    copyLink: "Копировать ссылку",
    copied: "Ссылка скопирована!",
    regenerate: "Сгенерировать снова",
    share: "Поделиться",
    shared: "Готово к отправке!",
  },
};

function pickRandomHref(items: readonly CatalogItem[], excludeHref?: string): string {
  const pool = items.filter((item) => item.href !== excludeHref);
  const source = pool.length > 0 ? pool : items;
  const index = Math.floor(Math.random() * source.length);
  return source[index]?.href ?? "/";
}

/** Small, self-clearing status message shown next to Copy/Share after
 * a successful action. Announced via aria-live for screen readers. */
function useActionFeedback() {
  const [message, setMessage] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<number | undefined>(undefined);

  const announce = React.useCallback((text: string) => {
    setMessage(text);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setMessage(null), 2200);
  }, []);

  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  return { message, announce };
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
  const { message, announce } = useActionFeedback();

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

  const handleRegenerate = () => {
    // Every generator/tool computes its initial random output on
    // mount, so a full reload is a universal, always-correct way to
    // regenerate — no per-tool wiring needed.
    window.location.reload();
  };

  const handleCopyLink = async () => {
    const ok = await copyToClipboard(window.location.href);
    announce(ok ? copy.copied : copy.copyLink);
  };

  const handleShare = async () => {
    const shareData = {
      title: current?.name ?? document.title,
      text: current?.description,
      url: window.location.href,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        announce(copy.shared);
      } catch {
        // User canceled the share sheet — not an error, stay silent.
      }
      return;
    }
    const ok = await copyToClipboard(window.location.href);
    announce(ok ? copy.copied : copy.share);
  };

  if (!current) return null;

  const actionButtonClass =
    "motion-press inline-flex h-10 items-center gap-1.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] px-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

  return (
    <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <FavoriteButton id={current.id} label={current.name} size="md" locale={locale} />
        <button type="button" onClick={handleCopyLink} className={actionButtonClass}>
          <span aria-hidden="true">📋</span>
          {copy.copyLink}
        </button>
        <button type="button" onClick={handleRegenerate} className={actionButtonClass}>
          <span aria-hidden="true">🔄</span>
          {copy.regenerate}
        </button>
        <button type="button" onClick={handleShare} className={actionButtonClass}>
          <span aria-hidden="true">📤</span>
          {copy.share}
        </button>
        <button type="button" onClick={handleRandom} className={actionButtonClass}>
          <span aria-hidden="true">🎲</span>
          {copy.random}
        </button>
        <Link href={copy.homeHref} className={actionButtonClass}>
          <span aria-hidden="true">🏠</span>
          {copy.home}
        </Link>
      </div>
      <p aria-live="polite" className="min-h-[1.25rem] text-sm text-[var(--accent-2)]">
        {message && <span className="motion-toast-in inline-block">{message}</span>}
      </p>
    </div>
  );
}

QuickActions.displayName = "QuickActions";

export { pickRandomHref };
