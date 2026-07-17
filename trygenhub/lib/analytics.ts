import { env } from "./env";

/**
 * Generic, privacy-safe custom event names. Never add an event name
 * or parameter that could carry generated results or user-entered
 * input (passwords, keywords, usernames, company names, domains,
 * etc.) — see trackEvent() below.
 */
export type AnalyticsEventName =
  | "generator_used"
  | "copy_result"
  | "reset_generator"
  | "iq_test_started"
  | "iq_test_completed"
  | "iq_test_abandoned"
  | "iq_test_retaken"
  | "iq_test_shared";

export interface AnalyticsEventParams {
  /** Generic tool identifier, e.g. "password" or "random-number". */
  generator?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a generic, non-identifying custom event to Google Analytics,
 * if and only if analytics is actually configured and loaded.
 *
 * Safe to call unconditionally from client components:
 * - No-ops on the server.
 * - No-ops when GA is not configured or not in production.
 * - No-ops (without throwing) if gtag has not loaded yet, e.g.
 *   because of an ad blocker.
 *
 * Never pass generated results or raw user input as a parameter.
 * Only generic identifiers (like a generator's slug) belong here.
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  params?: AnalyticsEventParams,
): void {
  if (typeof window === "undefined") return;
  if (!env.isProduction || !env.gaMeasurementId) return;
  if (typeof window.gtag !== "function") return;

  try {
    window.gtag("event", eventName, params);
  } catch {
    // Analytics must never break the app. Silently ignore failures.
  }
}
