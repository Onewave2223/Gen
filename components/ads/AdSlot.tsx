"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export type AdSlotFormat = "auto" | "rectangle" | "horizontal" | "fluid";

export interface AdSlotProps {
  /** Real AdSense ad unit slot ID. Leave unset to keep this slot inactive. */
  slot?: string;
  format?: AdSlotFormat;
  className?: string;
  /** Visible label shown above the ad. Never use a misleading label. */
  label?: string;
  /**
   * Required for in-feed native ad units (format="fluid"). This is the
   * `data-ad-layout-key` Google generates for a specific in-feed ad
   * layout — it controls the native ad's internal proportions so it
   * blends into the surrounding card grid.
   */
  layoutKey?: string;
}

/**
 * A reusable, safe ad placement.
 *
 * - Only renders a real AdSense unit when a valid AdSense client ID
 *   AND a slot ID are both present AND the app is running in
 *   production.
 * - In development (or whenever unconfigured), renders a neutral,
 *   non-clickable "Advertisement" placeholder so layout and reserved
 *   space can be reviewed — never a fake ad or fake CTA.
 * - In production without a configured slot, renders nothing at all
 *   rather than showing an empty placeholder to real visitors.
 */
export function AdSlot({
  slot,
  format = "auto",
  className,
  label = "Advertisement",
  layoutKey,
}: AdSlotProps) {
  const pushedRef = useRef(false);
  // Fluid (in-feed) units require a layout key to render correctly, so
  // treat a fluid slot missing its layout key as unconfigured.
  const isConfigured =
    env.isProduction &&
    Boolean(env.adsenseClientId) &&
    Boolean(slot) &&
    (format !== "fluid" || Boolean(layoutKey));

  useEffect(() => {
    if (!isConfigured || pushedRef.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // An ad blocker, a script that hasn't loaded yet, or any other
      // AdSense initialization failure should never break the page.
    }
  }, [isConfigured]);

  if (isConfigured) {
    return (
      <div className={className}>
        <span className="mb-2 block text-center text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          {label}
        </span>
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={env.adsenseClientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-ad-layout-key={format === "fluid" ? layoutKey : undefined}
          data-full-width-responsive={format === "fluid" ? undefined : "true"}
          aria-label="Advertisement"
        />
      </div>
    );
  }

  if (env.isProduction) {
    // Real visitors in production should never see a placeholder box
    // for an unconfigured ad — just reserve no space at all.
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[var(--surface)] text-center",
        className,
      )}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        Advertisement
      </span>
    </div>
  );
}

AdSlot.displayName = "AdSlot";
