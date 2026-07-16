"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/iq-test/types";
import { getDictionary } from "@/lib/iq-test/i18n";

interface Props {
  iqScore: number;
  interpretation: string;
  locale: Locale;
}

export function ShareControls({ iqScore, interpretation, locale }: Props) {
  const dict = getDictionary(locale);
  const [copied, setCopied] = useState(false);

  const shareText = dict.shareTemplate(iqScore, interpretation);
  const shareUrl = locale === "ru" ? "https://trygenhub.com/ru/test-na-iq" : "https://trygenhub.com/iq-test";

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: dict.resultHeroLabel,
          text: shareText,
          url: shareUrl,
        });
        trackEvent("iq_test_shared");
        return;
      } catch {
        // Fallthrough to copy
      }
    }
    const ok = await copyToClipboard(shareText);
    if (ok) {
      setCopied(true);
      trackEvent("iq_test_shared");
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {copied ? dict.shareCopied : dict.shareButton}
      </button>
      <button
        type="button"
        onClick={async () => {
          const ok = await copyToClipboard(shareText);
          if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          }
        }}
        className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        {copied ? dict.shareCopied : dict.copyButton}
      </button>
    </div>
  );
}

ShareControls.displayName = "ShareControls";
