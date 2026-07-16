/**
 * Consent storage helpers for cookie/analytics consent management.
 *
 * Stores the user's choice in localStorage so it persists across
 * pages and sessions without requiring a backend.
 *
 * Design goals:
 * - Works in SSR environments (returns 'unknown' on the server)
 * - Never crashes — any localStorage errors are caught silently
 * - Single source of truth for the consent key name
 */

export type ConsentChoice = "accepted" | "rejected" | "unknown";

const CONSENT_KEY = "tgh_cookie_consent";

/**
 * Read the stored consent choice.
 * Returns "unknown" on the server or if no choice has been saved yet.
 */
export function getConsentChoice(): ConsentChoice {
  if (typeof window === "undefined") return "unknown";
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
    return "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * Persist the user's consent choice to localStorage.
 */
export function saveConsentChoice(choice: "accepted" | "rejected"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // localStorage may be blocked by a private-browsing mode or
    // a browser extension. Silently ignore — the banner will
    // re-appear next visit, which is the correct fallback.
  }
}

/**
 * Clear the saved consent choice so the banner reappears.
 */
export function clearConsentChoice(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Custom DOM event name dispatched when the user accepts or rejects
 * consent. Components that need to react to a consent change (e.g.
 * GoogleAnalytics) can listen for this event.
 */
export const CONSENT_CHANGE_EVENT = "tgh:consent_change";
