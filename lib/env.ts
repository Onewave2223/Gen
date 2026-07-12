import { siteConfig } from "./site";

/**
 * Centralized, validated access to environment configuration for
 * optional third-party integrations (Google Analytics, Google
 * AdSense, Google Search Console verification).
 *
 * Design goals:
 * - Never crash the production build because an optional integration
 *   is not configured.
 * - Never fall back to a fake/placeholder ID. Missing or invalid
 *   values simply mean the related integration stays disabled.
 * - Provide a single source of truth so components don't read
 *   `process.env` directly.
 */

export interface Env {
  /** Centralized site URL (see lib/site.ts for normalization). */
  readonly siteUrl: string;
  /** Valid GA4 Measurement ID (e.g. "G-XXXXXXXXXX"), or undefined. */
  readonly gaMeasurementId: string | undefined;
  /** Google Search Console verification token, or undefined. */
  readonly googleSiteVerification: string | undefined;
  /** Valid AdSense client ID (e.g. "ca-pub-XXXXXXXXXXXXXXXX"), or undefined. */
  readonly adsenseClientId: string | undefined;
  /** Optional AdSense ad unit slot ID for the homepage placement. */
  readonly adsenseSlotHome: string | undefined;
  /** Optional AdSense ad unit slot ID for generator page placements. */
  readonly adsenseSlotGenerator: string | undefined;
  /** True only when running in a production build/runtime. */
  readonly isProduction: boolean;
}

/** GA4 Measurement IDs look like "G-XXXXXXXXXX". Google's exact length
 * has changed before, so this intentionally does not pin an exact
 * character count. */
const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,}$/i;

/** AdSense client (publisher) IDs look like "ca-pub-1234567890123456". */
const ADSENSE_CLIENT_ID_PATTERN = /^ca-pub-\d{6,}$/;

function toCleanString(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function warnInDevelopment(message: string): void {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(`[env] ${message}`);
  }
}

function validateGaMeasurementId(
  value: string | undefined,
): string | undefined {
  const cleaned = toCleanString(value);
  if (!cleaned) return undefined;

  if (!GA_MEASUREMENT_ID_PATTERN.test(cleaned)) {
    warnInDevelopment(
      `NEXT_PUBLIC_GA_MEASUREMENT_ID "${cleaned}" does not match the expected GA4 format (G-XXXXXXXXXX). Google Analytics will stay disabled.`,
    );
    return undefined;
  }

  return cleaned;
}

function validateAdsenseClientId(
  value: string | undefined,
): string | undefined {
  const cleaned = toCleanString(value);
  if (!cleaned) return undefined;

  if (!ADSENSE_CLIENT_ID_PATTERN.test(cleaned)) {
    warnInDevelopment(
      `NEXT_PUBLIC_ADSENSE_CLIENT_ID "${cleaned}" does not match the expected format (ca-pub-XXXXXXXXXXXXXXXX). AdSense will stay disabled.`,
    );
    return undefined;
  }

  return cleaned;
}

export const env: Env = {
  siteUrl: siteConfig.url,
  gaMeasurementId: validateGaMeasurementId(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  ),
  googleSiteVerification: toCleanString(
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  ),
  adsenseClientId: validateAdsenseClientId(
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  ),
  adsenseSlotHome: toCleanString(process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME),
  adsenseSlotGenerator: toCleanString(
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR,
  ),
  isProduction: process.env.NODE_ENV === "production",
};
