import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { FavoriteButton } from "@/components/engagement/FavoriteButton";

export interface GeneratorCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
  /** Shows the Free / Instant / EN-RU trust badges row. Defaults to true. */
  showTrustBadges?: boolean;
  /** Catalog id (e.g. "generator:password") — shows a favorite star when set. */
  favoriteId?: string;
}

export function GeneratorCard({
  title,
  description,
  href,
  icon,
  badge,
  showTrustBadges = true,
  favoriteId,
}: GeneratorCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[var(--shadow-glow)] focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)]">
      {/* Stretched link: makes the whole card clickable/keyboard-focusable
          while staying a sibling of the favorite button below, since a
          <button> cannot be nested inside an <a> (invalid HTML). */}
      <Link
        href={href}
        aria-label={title}
        className="absolute inset-0 z-0 rounded-[var(--radius)] focus:outline-none"
      />

      {(badge || favoriteId) && (
        <span className="absolute right-4 top-4 z-10 flex items-center gap-2">
          {badge && (
            <span
              aria-hidden="true"
              className="rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs font-medium text-[var(--primary-foreground)]"
            >
              {badge}
            </span>
          )}
          {favoriteId && (
            <FavoriteButton
              id={favoriteId}
              label={title}
              className="pointer-events-auto"
            />
          )}
        </span>
      )}

      {icon && (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--primary-soft)] text-[var(--primary)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)]"
        >
          {icon}
        </span>
      )}

      <span className="flex flex-col gap-1 pr-8">
        <span className="text-base font-semibold text-[var(--foreground)]">
          {title}
        </span>
        <span className="text-sm text-[var(--muted)] break-words">
          {description}
        </span>
      </span>

      {showTrustBadges && (
        <span className="flex flex-wrap items-center gap-1.5 pr-8">
          <Badge variant="neutral" className="text-[11px]">
            ✓ Free
          </Badge>
          <Badge variant="neutral" className="text-[11px]">
            ⚡ Instant
          </Badge>
          <Badge variant="neutral" className="text-[11px]">
            🌍 EN/RU
          </Badge>
        </span>
      )}
    </div>
  );
}

GeneratorCard.displayName = "GeneratorCard";
