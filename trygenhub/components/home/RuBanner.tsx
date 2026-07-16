"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function RuBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("ru-banner-dismissed");
    if (dismissed) return;
    const lang = navigator.language || "";
    if (lang.startsWith("ru") || lang.startsWith("uk") || lang.startsWith("be")) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="banner"
      className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm sm:px-6"
    >
      <span className="text-[var(--foreground)]">
        🇷🇺 TryGenHub доступен на русском языке —{" "}
        <Link
          href="/ru"
          className="font-medium text-[var(--primary)] underline underline-offset-2 hover:text-[var(--primary-hover)]"
        >
          открыть русскую версию
        </Link>
      </span>
      <button
        type="button"
        aria-label="Закрыть"
        onClick={() => {
          sessionStorage.setItem("ru-banner-dismissed", "1");
          setVisible(false);
        }}
        className="flex-shrink-0 rounded text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

RuBanner.displayName = "RuBanner";
