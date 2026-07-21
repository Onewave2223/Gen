/**
 * Thin wrapper around the existing `window.gtag` mechanism (see
 * components/analytics/GoogleAnalytics.tsx) for the small set of
 * anonymous divination events. Reuses the same script/consent gate —
 * `window.gtag` only exists once GA has been loaded, which itself only
 * happens in production after the user has explicitly accepted
 * analytics consent. No new script, no new consent surface.
 *
 * IMPORTANT: never pass the user's typed question, card meaning text,
 * or any other free-form/personal content as an event parameter —
 * only fixed, anonymous event names and small enum-like params.
 */

export type FortuneAnalyticsEvent =
  | "tarot_reading_started"
  | "tarot_card_drawn"
  | "tarot_reading_completed"
  | "magic_ball_used"
  | "fortune_tool_used"
  | "share_result_clicked"
  | "daily_reading_started"
  | "daily_reading_revealed"
  | "daily_reading_shared"
  | "compatibility_started"
  | "compatibility_revealed"
  | "compatibility_shared";

export interface FortuneAnalyticsParams {
  /** Short, fixed enum values only — e.g. mode id, tool id, locale. */
  [key: string]: string | number | boolean | undefined;
}

export function trackFortuneEvent(
  event: FortuneAnalyticsEvent,
  params?: FortuneAnalyticsParams,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
