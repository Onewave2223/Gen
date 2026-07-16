"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { isRuPath } from "@/lib/i18n/route-map";
import { getHeaderCopy, getNavLinks } from "@/lib/i18n/nav";

export function MobileMenu() {
  const pathname = usePathname() ?? "/";
  const ru = isRuPath(pathname);
  const copy = getHeaderCopy(ru);
  const navLinks = React.useMemo(
    () => [
      { href: copy.homeHref, label: copy.home },
      ...getNavLinks(ru),
      { href: ru ? "/ru/o-proekte" : "/about", label: copy.about },
    ],
    [ru, copy],
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const panelId = React.useId();

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? copy.closeMenu : copy.openMenu}
        className={cn(
          "motion-press inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] text-[var(--foreground)] transition-colors duration-150",
          "hover:bg-[var(--surface-hover)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        )}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      <div
        id={panelId}
        className={cn(
          "fixed inset-x-0 top-16 z-40 origin-top border-b border-[var(--border)] bg-[var(--background)] shadow-[var(--shadow)] transition-all duration-150",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={cn(
                "rounded-[var(--radius)] px-3 py-3 text-base font-medium text-[var(--foreground)]",
                "hover:bg-[var(--surface-hover)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div onClick={closeMenu}>
            <LanguageSwitcher variant="full" className="w-full" />
          </div>
          <Link
            href={copy.browseToolsHref}
            onClick={closeMenu}
            className={cn(
              "motion-press mt-2 inline-flex h-11 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-base font-medium text-[var(--primary-foreground)]",
              "hover:bg-[var(--primary-hover)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
            )}
          >
            {copy.browseTools}
          </Link>
        </nav>
      </div>
    </div>
  );
}

MobileMenu.displayName = "MobileMenu";
