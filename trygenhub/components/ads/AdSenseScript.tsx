import Script from "next/script";
import { env } from "@/lib/env";

/**
 * Loads the global Google AdSense script — only when:
 * 1. a valid NEXT_PUBLIC_ADSENSE_CLIENT_ID is configured (defaults to
 *    the site's real publisher ID, see lib/env.ts), and
 * 2. the app is running in production.
 *
 * Uses the `beforeInteractive` strategy so Next.js injects the script
 * tag into the <head> of the server-rendered HTML on every page —
 * required for Google's AdSense site verification/review, which reads
 * the raw page source rather than only the post-hydration DOM.
 *
 * Renders nothing when AdSense is not configured or not in
 * production, with no console errors and no impact on the
 * production build.
 */
export function AdSenseScript() {
  if (!env.isProduction || !env.adsenseClientId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.adsenseClientId}`}
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}

AdSenseScript.displayName = "AdSenseScript";
