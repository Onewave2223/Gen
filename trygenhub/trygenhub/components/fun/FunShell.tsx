import Link from "next/link";
import type { ReactNode } from "react";

export interface FunShellProps {
  title: string;
  description: string;
  children: ReactNode;
  breadcrumbs: { label: string; href?: string }[];
  lang?: "en" | "ru";
  icon?: ReactNode;
}

export function FunShell({ title, description, children, breadcrumbs, icon }: FunShellProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          {breadcrumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-[var(--foreground)]">
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <span
              aria-hidden="true"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-[var(--radius)] bg-[var(--surface-elevated)] text-[var(--primary)] shadow-[var(--shadow)]"
            >
              {icon}
            </span>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
        </div>
        <p className="max-w-xl text-base text-[var(--muted)]">{description}</p>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-lg)] sm:p-7">
        {children}
      </div>
    </div>
  );
}

FunShell.displayName = "FunShell";
