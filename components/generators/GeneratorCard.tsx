import Link from "next/link";
import type { ReactNode } from "react";

export interface GeneratorCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
}

export function GeneratorCard({
  title,
  description,
  href,
  icon,
  badge,
}: GeneratorCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      {badge && (
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs font-medium text-[var(--primary-foreground)]"
        >
          {badge}
        </span>
      )}

      {icon && (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-[var(--background)] text-[var(--primary)]"
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
    </Link>
  );
}

GeneratorCard.displayName = "GeneratorCard";
