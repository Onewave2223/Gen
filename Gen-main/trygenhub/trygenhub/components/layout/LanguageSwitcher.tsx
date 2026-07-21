"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getLanguageSwitchTarget, isRuPath } from "@/lib/i18n/route-map";

const LANGUAGE_PREFERENCE_KEY = "trygenhub_lang_pref";
const IQ_TEST_STORAGE_KEY = "trygenhub_iq_test_v3";

function isIqTestInProgress(): boolean {
  try {
    const raw = window.localStorage.getItem(IQ_TEST_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { status?: string };
    return parsed?.status === "in_progress";
  } catch {
    return false;
  }
}

/** Small, original CSS/SVG globe — no emoji, no images, no 3D libraries. */
function LanguageOrb({ pulsing }: { pulsing: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "lang-orb relative flex h-5 w-5 flex-shrink-0 items-center justify-center",
        pulsing && "lang-orb-pulse",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        className="lang-orb-meridians"
      >
        <ellipse cx="12" cy="12" rx="5.5" ry="10.5" stroke="white" strokeOpacity="0.85" strokeWidth="1.1" />
        <ellipse cx="12" cy="12" rx="10.5" ry="5.5" stroke="white" strokeOpacity="0.6" strokeWidth="1" />
        <line x1="1.5" y1="12" x2="22.5" y2="12" stroke="white" strokeOpacity="0.6" strokeWidth="1" />
      </svg>
    </span>
  );
}

interface LanguageOption {
  code: "en" | "ru";
  nativeName: string;
  tag: string;
  href: string;
  isCurrent: boolean;
}

interface LanguageSwitcherProps {
  /** Compact orb pill for the header (desktop + mobile). "full" renders an
   * always-open inline card, used inside the mobile slide-down menu. */
  variant?: "compact" | "full";
  className?: string;
}

export function LanguageSwitcher({ variant = "compact", className }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const ru = isRuPath(pathname);
  const target = getLanguageSwitchTarget(pathname);

  const [open, setOpen] = React.useState(false);
  const [pulsing, setPulsing] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const triggerId = React.useId();
  const panelId = React.useId();

  const options: LanguageOption[] = [
    {
      code: "en",
      nativeName: "English",
      tag: "EN",
      href: ru ? target.href : pathname,
      isCurrent: !ru,
    },
    {
      code: "ru",
      nativeName: "Русский",
      tag: "RU",
      href: ru ? pathname : target.href,
      isCurrent: ru,
    },
  ];

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (option: LanguageOption) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (option.isCurrent) {
      event.preventDefault();
      setOpen(false);
      return;
    }

    try {
      window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, option.code);
    } catch {
      // localStorage unavailable — preference just won't persist
    }

    setPulsing(true);
    window.setTimeout(() => setPulsing(false), 220);

    const iqTestPage = pathname === "/iq-test" || pathname === "/ru/test-na-iq";
    if (iqTestPage && isIqTestInProgress()) {
      event.preventDefault();
      const message = ru
        ? "При переключении откроется английская версия. Текущий прогресс сохранён локально и не потеряется."
        : "Switching language will open the Russian version. Your current progress is saved locally and won't be lost.";
      if (window.confirm(message)) {
        setOpen(false);
        router.push(option.href);
      }
      return;
    }

    setOpen(false);
  };

  const currentLabel = ru ? "Русский" : "English";
  const triggerAriaLabel = ru
    ? `Изменить язык, текущий язык — Русский`
    : `Change language, current language English`;

  const chooseLanguageLabel = ru ? "Выберите язык" : "Choose language";

  const panel = (
    <div
      id={panelId}
      role="menu"
      aria-label={chooseLanguageLabel}
      className={cn(
        variant === "compact" &&
          "lang-panel-pop-in absolute right-0 top-[calc(100%+8px)] z-50 w-56",
        "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-2 shadow-[var(--shadow-lg)]",
      )}
    >
      <p className="px-2.5 pb-1.5 pt-1 text-xs font-medium text-[var(--muted)]">
        {chooseLanguageLabel}
      </p>
      <ul className="flex flex-col gap-0.5">
        {options.map((option) => (
          <li key={option.code} role="none">
            <Link
              href={option.href}
              role="menuitem"
              aria-current={option.isCurrent ? "true" : undefined}
              onClick={handleSelect(option)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-[var(--radius)] px-2.5 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                option.isCurrent
                  ? "bg-[var(--primary-soft)] font-medium text-[var(--primary)]"
                  : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
              )}
            >
              <span className="flex items-center gap-2">
                <span>{option.nativeName}</span>
                <span className="text-xs text-[var(--muted)]">{option.tag}</span>
              </span>
              {option.isCurrent && (
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  if (variant === "full") {
    // Always-open inline card — used inside the mobile slide-down menu,
    // where the panel doesn't need its own toggle.
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <div className="flex items-center gap-2 px-1 pb-1">
          <LanguageOrb pulsing={pulsing} />
          <span className="text-sm font-medium text-[var(--foreground)]">{currentLabel}</span>
        </div>
        {panel}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        id={triggerId}
        type="button"
        data-open={open}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={triggerAriaLabel}
        onClick={() => setOpen((prev) => !prev)}
        className="lang-orb-trigger motion-press flex h-9 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] pl-1.5 pr-2.5 text-sm font-medium text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      >
        <LanguageOrb pulsing={pulsing} />
        <span>{ru ? "RU" : "EN"}</span>
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lang-orb-chevron text-[var(--muted)]"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && panel}
    </div>
  );
}

LanguageSwitcher.displayName = "LanguageSwitcher";
