import Link from "next/link";
import type { ReactNode } from "react";

export interface GeneratorShellProps {
  title: string;
  description: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function GeneratorShell({
  title,
  description,
  children,
  icon,
}: GeneratorShellProps) {
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
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/#generators"
              className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Generators
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-[var(--foreground)]">
            {title}
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-3">
        {icon && (
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-[var(--surface)] text-[var(--primary)]"
          >
            {icon}
          </span>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          {title}
        </h1>
        <p className="max-w-xl text-base text-[var(--muted)]">
          {description}
        </p>
      </div>

      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] sm:p-6">
        {children}
      </div>
    </div>
  );
}

GeneratorShell.displayName = "GeneratorShell";
