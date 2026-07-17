import { siteConfig } from "./site";

/**
 * Centralized, validated access to environment configuration for
 * optional third-party integrations (Google Analytics, Google
 * AdSense, Google Search Console verification).
 *
 * Design goals:
 * - Never crash the production build because an optional integration
 *   is not configured.
 * - Never fall back to a fake/placeholder ID for anything. The one
 *   exception is the AdSense client ID: it defaults to the site
 *   owner's real, public publisher ID (see `DEFAULT_ADSENSE_CLIENT_ID`
 *   below) so AdSense is connected without extra environment
 *   configuration. `NEXT_PUBLIC_ADSENSE_CLIENT_ID` still overrides it.
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
  /**
   * Salt used to hash submitter IP addresses before they are stored
   * (e.g. for Community Ideas spam/rate-limit protection). Raw IPs
   * are never persisted. This is not a high-value secret — worst
   * case of it leaking is that stored hashes become correlatable —
   * but setting `COMMUNITY_IDEAS_IP_SALT` in production is still
   * recommended over relying on the built-in default.
   */
  readonly communityIdeasIpSalt: string;
}

/** GA4 Measurement IDs look like "G-XXXXXXXXXX". Google's exact length
 * has changed before, so this intentionally does not pin an exact
 * character count. */
const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,}$/i;

/** AdSense client (publisher) IDs look like "ca-pub-1234567890123456". */
const ADSENSE_CLIENT_ID_PATTERN = /^ca-pub-\d{6,}$/;

/**
 * The site's real GA4 Measurement ID. Like `DEFAULT_ADSENSE_CLIENT_ID`
 * below and `DEFAULT_LOCAL_URL` in lib/site.ts, this is not a secret —
 * GA4 Measurement IDs are public identifiers that appear directly in
 * the rendered page source — so it is safe to commit as a default.
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` can still override it (e.g. to point
 * a preview deployment at a different GA4 property, or to disable
 * Analytics by setting the env var to an empty/invalid value).
 */
const DEFAULT_GA_MEASUREMENT_ID = "G-7R07R4465S";

/**
 * The site's real Google AdSense publisher ID. This is not a secret —
 * it is a public identifier that appears in the rendered page source,
 * in ads.txt, and in Search Console — so, like `DEFAULT_LOCAL_URL` in
 * lib/site.ts, it is safe to commit as a default. `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
 * can still override it (e.g. to disable AdSense in a preview
 * deployment by setting the env var to an empty/invalid value).
 */
const DEFAULT_ADSENSE_CLIENT_ID = "ca-pub-8094929435378990";

function toCleanString(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function warnInDevelopment(message: string): void {
  if (process.env.NODE_ENV !== "production") {
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
    toCleanString(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) ??
      DEFAULT_GA_MEASUREMENT_ID,
  ),
  googleSiteVerification: toCleanString(
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  ),
  adsenseClientId: validateAdsenseClientId(
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? DEFAULT_ADSENSE_CLIENT_ID,
  ),
  adsenseSlotHome: toCleanString(process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME),
  adsenseSlotGenerator: toCleanString(
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR,
  ),
  isProduction: process.env.NODE_ENV === "production",
  communityIdeasIpSalt:
    toCleanString(process.env.COMMUNITY_IDEAS_IP_SALT) ??
    "trygenhub-community-ideas-default-salt",
};

if (env.isProduction && !toCleanString(process.env.COMMUNITY_IDEAS_IP_SALT)) {
  // Deliberately not using warnInDevelopment: this warning matters
  // most in production, where that helper stays silent.
  console.warn(
    "[env] COMMUNITY_IDEAS_IP_SALT is not set in production; falling back to the built-in default salt for hashing submitter IPs.",
  );
}
