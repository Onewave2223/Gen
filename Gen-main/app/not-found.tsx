import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

const POPULAR_SECTIONS = [
  { href: "/generators", label: "Generators" },
  { href: "/tools", label: "Text Tools" },
  { href: "/calculators", label: "Calculators" },
  { href: "/fun", label: "Fun & Random" },
  { href: "/ru", label: "Русский раздел" },
];

export default function NotFound() {
  return (
    <div className="relative mx-auto flex max-w-xl flex-col items-start gap-6 overflow-hidden px-4 py-20 sm:px-6">
      <div
        aria-hidden="true"
        className="brand-orb pointer-events-none -left-16 -top-20 h-64 w-64"
      />
      <p className="brand-gradient-text text-6xl font-extrabold tracking-tight">
        404
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
        Page not found
      </h1>

      <p className="text-base text-[var(--muted)]">
        The page you&apos;re looking for doesn&apos;t exist, may have been
        moved, or the link may be incorrect.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          Go to homepage
        </Link>
        <Link
          href="/generators"
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          Browse generators
        </Link>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <p className="text-sm font-medium text-[var(--foreground)]">
          Popular sections
        </p>
        <ul className="flex flex-wrap gap-2">
          {POPULAR_SECTIONS.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="inline-block rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
