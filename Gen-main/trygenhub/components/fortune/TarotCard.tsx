"use client";

import { TarotExperience } from "@/components/tarot/TarotExperience";

/**
 * English "Tarot Card of the Day" tool. Upgraded to the shared 78-card
 * Tarot experience (shuffle → fan → flip → interpret), while keeping
 * this component's name/export and the page's URL unchanged. Also
 * exposes the Yes/No and 3-card modes on the same page since it
 * doesn't require a new route.
 */
export function TarotCard() {
  return <TarotExperience locale="en" modes={["day", "yesno", "three"]} />;
}

TarotCard.displayName = "TarotCard";
