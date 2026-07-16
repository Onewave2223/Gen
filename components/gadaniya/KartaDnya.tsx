"use client";

import { TarotExperience } from "@/components/tarot/TarotExperience";

/**
 * Russian "Карта дня" tool. Upgraded to the shared 78-card Tarot
 * experience (shuffle → fan → flip → interpret), keeping this
 * component's name/export and the page's URL unchanged. Also exposes
 * the Yes/No and 3-card modes on the same page since it doesn't
 * require a new route.
 */
export function KartaDnya() {
  return <TarotExperience locale="ru" modes={["day", "yesno", "three"]} />;
}

KartaDnya.displayName = "KartaDnya";
