"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLanguageSwitchTarget, isRuPath } from "@/lib/i18n/route-map";
import { getConsentChoice, CONSENT_CHANGE_EVENT } from "@/lib/consent";

const DISMISS_KEY = "trygenhub_lang_banner_dismissed";
const PREFERENCE_KEY = "trygenhub_lang_pref";

/**
 * Shows a small, non-blocking banner ONCE to visitors whose browser
 * language is Russian but who landed on an English page — offering to
 * switch to the equivalent Russian page. Never auto-redirects. Dismissed
 * permanently (via localStorage) after any interaction, and skipped
 * entirely if the user has already made an explicit language choice.
 */
export function LanguagePreferenceBanner() {
  const pathname = usePathname() ?? "/";
  const [visible, setVisible] = React.useState(false);

  const evaluate = React.useCallback(() => {
    if (isRuPath(pathname)) return;
    // Avoid stacking two fixed-bottom banners: wait until the cookie
    // consent choice has already been made (accepted or rejected).
    if (getConsentChoice() === "unknown") return;

    try {
      if (window.localStorage.getItem(DISMISS_KEY)) return;
      if (window.localStorage.getItem(PREFERENCE_KEY)) return;
    } catch {
      return;
    }

    const browserIsRussian = navigator.languages
      ? navigator.languages.some((lang) => lang.toLowerCase().startsWith("ru"))
      : navigator.language?.toLowerCase().startsWith("ru");

    if (browserIsRussian) setVisible(true);
  }, [pathname]);

  React.useEffect(() => {
    evaluate();
    window.addEventListener(CONSENT_CHANGE_EVENT, evaluate);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, evaluate);
  }, [evaluate]);

  const dismiss = (choseRussian: boolean) => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
      if (choseRussian) window.localStorage.setItem(PREFERENCE_KEY, "ru");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  const target = getLanguageSwitchTarget(pathname);

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow)] sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-[var(--radius)] sm:border"
    >
      <p className="text-sm text-[var(--foreground)]">Доступна русская версия сайта</p>
      <div className="mt-2 flex gap-2">
        <Link
          href={target.href}
          onClick={() => dismiss(true)}
          className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-3 text-sm font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]"
        >
          Перейти на русский
        </Link>
        <button
          type="button"
          onClick={() => dismiss(false)}
          className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] px-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          Stay on English
        </button>
      </div>
    </div>
  );
}

LanguagePreferenceBanner.displayName = "LanguagePreferenceBanner";
