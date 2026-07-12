import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/#generators", label: "Generators" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-[var(--radius)] text-lg font-bold tracking-tight text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--primary)]"
          />
          TryGenHub
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-6 sm:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[var(--radius)] text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <Link
            href="/#generators"
            className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Browse tools
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}

Header.displayName = "Header";
