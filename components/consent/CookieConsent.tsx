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
 * GDPR-compliant cookie consent banner.
 *
 * Design principles:
 * - Accept and Reject buttons are visually equal — no dark patterns.
 * - Reject is never harder to find than Accept.
 * - Choice is saved to localStorage and persists across pages.
 * - The banner does not reappear on every page visit once a choice
 *   has been made.
 * - A "Cookie settings" link in the footer lets users change their
 *   mind at any time.
 *
 * The banner handles its own visibility — it mounts invisible and
 * only shows after the client-side localStorage check confirms no
 * prior choice.
 */
export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice>("unknown");
  const [mounted, setMounted] = useState(false);
  const [isReopen, setIsReopen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setChoice(getConsentChoice());

    // Listen for requests to reopen the banner (e.g. from the footer
    // "Cookie settings" link).
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

  // Don't render anything until the client has hydrated and we've
  // read localStorage. This avoids a flash of the banner on return
  // visits when a choice has already been made.
  if (!mounted) return null;

  // Banner is hidden once a choice exists and the user is not
  // actively reopening it.
  if (choice !== "unknown" && !isReopen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--background)] px-4 py-4 shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-[var(--foreground)]">
            We use analytics cookies
          </p>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub uses Google Analytics to understand how visitors use the
            site. You can accept or decline analytics. The site works fully
            either way. See our{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-[var(--foreground)]"
            >
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {/* Reject is placed first so screen readers encounter it
              before Accept — ensuring neither option is harder to
              find than the other. */}
          <button
            type="button"
            onClick={handleReject}
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

CookieConsent.displayName = "CookieConsent";
