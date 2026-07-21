"use client";

import { useFavorites } from "@/lib/engagement/hooks";
import { cn } from "@/lib/utils";

type Locale = "en" | "ru";

const COPY: Record<Locale, { defaultLabel: string; add: (label: string) => string; remove: (label: string) => string }> = {
  en: {
    defaultLabel: "Favorite",
    add: (label) => `Add to favorites: ${label}`,
    remove: (label) => `Remove from favorites: ${label}`,
  },
  ru: {
    defaultLabel: "Избранное",
    add: (label) => `Добавить в избранное: ${label}`,
    remove: (label) => `Убрать из избранного: ${label}`,
  },
};

export interface FavoriteButtonProps {
  /** Catalog id, e.g. "generator:password" or "instrument:generator-paroley" */
  id: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
  locale?: Locale;
}

export function FavoriteButton({
  id,
  label,
  className,
  size = "sm",
  locale = "en",
}: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites(locale);
  const active = isFavorite(id);
  const copy = COPY[locale];
  const resolvedLabel = label ?? copy.defaultLabel;
  const dimension = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? 16 : 18;

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? copy.remove(resolvedLabel) : copy.add(resolvedLabel)}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(id);
      }}
      className={cn(
        "motion-press flex shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--muted)] transition-colors duration-150 hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        active && "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)]",
        dimension,
        className,
      )}
    >
      <svg
        aria-hidden="true"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}

FavoriteButton.displayName = "FavoriteButton";
