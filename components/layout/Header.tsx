"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HeaderScrollState } from "./HeaderScrollState";
import { SearchOverlay } from "@/components/home/SearchOverlay";
import { isRuPath } from "@/lib/i18n/route-map";
import { getHeaderCopy, getNavLinks } from "@/lib/i18n/nav";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const ru = isRuPath(pathname);
  const navLinks = getNavLinks(ru);
  const copy = getHeaderCopy(ru);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur transition-shadow duration-200 supports-[backdrop-filter]:bg-[var(--background)]/60">
      <HeaderScrollState />
      <div className="brand-hairline" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={copy.homeHref}
          className="flex items-center gap-2.5 rounded-[var(--radius)] text-lg font-bold tracking-tight text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent-2)] text-xs font-extrabold text-white shadow-[var(--shadow-sm)]"
          >
            T
          </span>
          TryGenHub
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-6 sm:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[var(--radius)] text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              {link.label}
            </Link>
          ))}
          {/* 🔍 Search */}
          <SearchOverlay variant="icon" className="text-[var(--muted)]" />
          {/* ⭐ Favorites */}
          <Link
            href={copy.favoritesHref}
            aria-label={copy.favoritesLabel}
            title={copy.favoritesLabel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            <StarIcon />
          </Link>
          {/* 🌐 Language selector */}
          <LanguageSwitcher variant="compact" />
        </nav>

        <div className="hidden sm:block">
          <Link
            href={copy.browseToolsHref}
            className="motion-press inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {copy.browseTools}
          </Link>
        </div>

        {/* Mobile icons: ☰ Menu → 🔍 Search → ⭐ Favorites → 🌐 Language */}
        <div className="flex items-center gap-1 sm:hidden">
          {/* ☰ Menu */}
          <MobileMenu />
          {/* 🔍 Search */}
          <SearchOverlay variant="icon" className="text-[var(--muted)]" />
          {/* ⭐ Favorites */}
          <Link
            href={copy.favoritesHref}
            aria-label={copy.favoritesLabel}
            title={copy.favoritesLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            <StarIcon />
          </Link>
          {/* 🌐 Language selector */}
          <LanguageSwitcher variant="compact" />
        </div>
      </div>
    </header>
  );
}

Header.displayName = "Header";
