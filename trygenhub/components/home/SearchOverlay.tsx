"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { searchIndexEn, searchIndexRu, searchItems } from "@/lib/search/searchIndex";
import { cn } from "@/lib/utils";

type Locale = "en" | "ru";

const COPY: Record<
  Locale,
  {
    openLabel: string;
    placeholder: string;
    noResultsText: string;
    browseAllLabel: string;
    browseAllHref: string;
    resultsLabel: (count: number) => string;
    hint: string;
  }
> = {
  en: {
    openLabel: "Search",
    placeholder: "Find a tool...",
    noResultsText: "No tools found.",
    browseAllLabel: "Browse all categories",
    browseAllHref: "/#categories",
    resultsLabel: (count) => `${count} ${count === 1 ? "result" : "results"}`,
    hint: "to close",
  },
  ru: {
    openLabel: "Поиск",
    placeholder: "Найти инструмент...",
    noResultsText: "Ничего не найдено.",
    browseAllLabel: "Посмотреть все категории",
    browseAllHref: "/ru#categories",
    resultsLabel: (count) => `${count} ${count === 1 ? "результат" : "результатов"}`,
    hint: "чтобы закрыть",
  },
};

export interface SearchOverlayProps {
  /** "icon" renders an icon-only button (mobile header). "full" adds a label (desktop header). */
  variant?: "icon" | "full";
  className?: string;
}

/**
 * Self-contained search: a compact trigger button plus a command-palette
 * style overlay. Locale (EN/RU index + copy) is inferred from the current
 * pathname, so this same component drops into the header regardless of
 * which locale section the person is browsing.
 *
 * Replaces the old full-width inline "Search" section that used to sit
 * directly under the hero on both homepages.
 */
export function SearchOverlay({ variant = "full", className }: SearchOverlayProps) {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname.startsWith("/ru") ? "ru" : "en";
  const index = locale === "ru" ? searchIndexRu : searchIndexEn;
  const copy = COPY[locale];

  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listId = React.useId();

  const results = React.useMemo(() => searchItems(index, query).slice(0, 8), [index, query]);
  const hasQuery = query.trim().length > 0;

  const close = React.useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }, []);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  // Cmd/Ctrl+K opens search from anywhere; Escape closes it.
  React.useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const id = window.setTimeout(() => inputRef.current?.focus(), 10);
      return () => {
        document.body.style.overflow = "";
        window.clearTimeout(id);
      };
    }
    return undefined;
  }, [isOpen]);

  React.useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (!hasQuery || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      window.location.href = results[activeIndex].href;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={copy.openLabel}
        className={cn(
          "motion-press inline-flex items-center justify-center gap-2 rounded-[var(--radius)] text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
          variant === "icon" ? "h-10 w-10" : "h-10 px-3 text-sm font-medium text-[var(--muted)]",
          className,
        )}
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        {variant === "full" ? <span>{copy.openLabel}</span> : null}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--foreground)]/30 backdrop-blur-sm"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={copy.openLabel}
            className="motion-result-reveal relative w-full max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-lg)]"
          >
            <div className="relative flex items-center border-b border-[var(--border)] px-4">
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-[var(--muted)]"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={hasQuery}
                aria-controls={listId}
                aria-autocomplete="list"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={copy.placeholder}
                className="h-14 w-full bg-transparent px-3 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="motion-press flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--muted)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div id={listId} role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
              {hasQuery ? (
                <>
                  <p className="px-2 pb-1 pt-1 text-xs text-[var(--muted)]">
                    {copy.resultsLabel(results.length)}
                  </p>
                  {results.length > 0 ? (
                    <ul className="flex flex-col gap-0.5">
                      {results.map((item, i) => (
                        <li key={item.id} role="option" aria-selected={activeIndex === i}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className={cn(
                              "flex flex-col gap-0.5 rounded-[var(--radius)] px-3 py-2 transition-colors",
                              activeIndex === i ? "bg-[var(--surface-hover)]" : "hover:bg-[var(--surface-hover)]",
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-medium text-[var(--foreground)]">
                                {item.name}
                              </span>
                              <span className="rounded-full bg-[var(--primary-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--primary)]">
                                {item.category}
                              </span>
                            </span>
                            <span className="text-xs text-[var(--muted)]">{item.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
                      <p className="text-sm text-[var(--foreground)]">{copy.noResultsText}</p>
                      <Link
                        href={copy.browseAllHref}
                        onClick={close}
                        className="text-sm font-medium text-[var(--primary)] hover:underline"
                      >
                        {copy.browseAllLabel}
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
                  <p className="text-sm text-[var(--muted)]">{copy.browseAllLabel}</p>
                  <Link
                    href={copy.browseAllHref}
                    onClick={close}
                    className="text-sm font-medium text-[var(--primary)] hover:underline"
                  >
                    {copy.browseAllLabel} →
                  </Link>
                </div>
              )}
            </div>

            <div className="hidden items-center gap-1.5 border-t border-[var(--border)] px-4 py-2 text-xs text-[var(--muted)] sm:flex">
              <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-sans text-[10px]">
                Esc
              </kbd>
              <span>{copy.hint}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

SearchOverlay.displayName = "SearchOverlay";
