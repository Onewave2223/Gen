import Link from "next/link";
import type { ReactNode } from "react";
import { QuickActions } from "@/components/engagement/QuickActions";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface ToolShellProps {
  title: string;
  description: string;
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  icon?: ReactNode;
}

export function ToolShell({
  title,
  description,
  children,
  breadcrumbs = [],
  icon,
}: ToolShellProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <li>
            <Link
              href="/"
              className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Home
            </Link>
          </li>
          {breadcrumbs.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <Link
                href={crumb.href}
                className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                {crumb.label}
              </Link>
            </li>
          ))}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-[var(--foreground)]">
            {title}
          </li>
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
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {title}
          </h1>
        </div>
        <p className="max-w-xl text-base text-[var(--muted)]">
          {description}
        </p>
      </div>

      <QuickActions />

      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-lg)] sm:p-7">
        {children}
      </div>
    </div>
  );
}

ToolShell.displayName = "ToolShell";
