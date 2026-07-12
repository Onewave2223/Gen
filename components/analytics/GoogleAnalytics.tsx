import Script from "next/script";
import { env } from "@/lib/env";

/**
 * Loads Google Analytics 4 (gtag.js) — only when:
 * 1. a valid NEXT_PUBLIC_GA_MEASUREMENT_ID is configured, and
 * 2. the app is running in production.
 *
 * Renders nothing in local development so local page views never
 * pollute real analytics data, and renders nothing at all when GA
 * is not configured, with no console errors and no impact on the
 * production build.
 */
export function GoogleAnalytics() {
  if (!env.isProduction || !env.gaMeasurementId) {
    return null;
  }

  const measurementId = env.gaMeasurementId;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}

GoogleAnalytics.displayName = "GoogleAnalytics";
