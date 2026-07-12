import Script from "next/script";
import { env } from "@/lib/env";

/**
 * Loads the global Google AdSense script — only when:
 * 1. a valid NEXT_PUBLIC_ADSENSE_CLIENT_ID is configured, and
 * 2. the app is running in production.
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
      strategy="afterInteractive"
    />
  );
}

AdSenseScript.displayName = "AdSenseScript";
