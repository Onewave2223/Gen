import { AdSlot } from "./AdSlot";
import { env } from "@/lib/env";

/**
 * Reusable ad placement for generator pages. Renders after the
 * interactive generator tool and before the long-form SEO content,
 * using the shared NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR slot.
 */
export function GeneratorAd() {
  return (
    <AdSlot
      slot={env.adsenseSlotGenerator}
      format="auto"
      className="my-8 min-h-[100px] w-full p-4"
    />
  );
}

GeneratorAd.displayName = "GeneratorAd";
