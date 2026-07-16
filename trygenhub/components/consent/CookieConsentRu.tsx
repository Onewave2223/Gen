"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getConsentChoice,
  saveConsentChoice,
  CONSENT_CHANGE_EVENT,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Русскоязычная версия баннера cookie consent для страниц /ru/*.
 * Логика идентична английской версии CookieConsent.tsx.
 */
export function CookieConsentRu() {
  const [choice, setChoice] = useState<ConsentChoice>("unknown");
  const [mounted, setMounted] = useState(false);
  const [isReopen, setIsReopen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setChoice(getConsentChoice());

    const handleReopen = () => {
      setIsReopen(true);
      setChoice("unknown");
    };
    window.addEventListener("tgh:reopen_consent", handleReopen);
    return () => {
      window.removeEventListener("tgh:reopen_consent", handleReopen);
    };
  }, []);

  function handleAccept() {
    saveConsentChoice("accepted");
    setChoice("accepted");
    setIsReopen(false);
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, { detail: "accepted" }),
    );
  }

  function handleReject() {
    saveConsentChoice("rejected");
    setChoice("rejected");
    setIsReopen(false);
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, { detail: "rejected" }),
    );
  }

  if (!mounted) return null;
  if (choice !== "unknown" && !isReopen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Настройки cookies"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--background)] px-4 py-4 shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-[var(--foreground)]">
            Мы используем аналитические cookies
          </p>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub использует Google Analytics для понимания того, как
            посетители используют сайт. Вы можете принять или отклонить
            аналитику. Сайт полностью работает в любом случае. Подробнее —
            в нашей{" "}
            <Link
              href="/ru/konfidencialnost"
              className="underline underline-offset-2 hover:text-[var(--foreground)]"
            >
              Политике конфиденциальности
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={handleReject}
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Отклонить
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}

CookieConsentRu.displayName = "CookieConsentRu";
