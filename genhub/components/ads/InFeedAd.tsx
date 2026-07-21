import { AdSlot } from "./AdSlot";
import { env } from "@/lib/env";

/**
 * A native, in-feed AdSense unit meant to sit as one cell inside a
 * card grid (e.g. the generators/tools/calculators listing pages),
 * blending in visually with the surrounding cards.
 *
 * Uses AdSense's "fluid" in-feed ad format, which requires both a
 * dedicated ad unit slot AND its matching `data-ad-layout-key` (see
 * `env.adsenseSlotInFeed` / `env.adsenseLayoutKeyInFeed` in
 * lib/env.ts). Per Google's placement requirements, the wrapping
 * element deliberately has no fixed height — only a `min-height` —
 * so the native ad can render at its natural size.
 */
export function InFeedAd() {
  return (
    <AdSlot
      slot={env.adsenseSlotInFeed}
      format="fluid"
      layoutKey={env.adsenseLayoutKeyInFeed}
      className="min-h-[120px] w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)]"
    />
  );
}

InFeedAd.displayName = "InFeedAd";
