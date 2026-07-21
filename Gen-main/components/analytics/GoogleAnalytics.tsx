"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { env } from "@/lib/env";
import { getConsentChoice, CONSENT_CHANGE_EVENT } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Builds the "path?query" string gtag expects for page_path/page_view. */
function buildPagePath(
  pathname: string,
  searchParams: ReturnType<typeof useSearchParams>,
): string {
  const query = searchParams?.toString();
  return query ? `${pathname}?${query}` : pathname;
}

/**
 * Consent-aware Google Analytics 4 loader and route-change tracker.
 *
 * Loads gtag.js ONLY when:
 *   1. a valid NEXT_PUBLIC_GA_MEASUREMENT_ID is configured (defaults
 *      to the site's real GA4 property, see lib/env.ts),
 *   2. the app is running in production, AND
 *   3. the user has explicitly accepted analytics cookies.
 *
 * If the user has not yet made a choice, or has declined, GA is
 * never loaded — no data is sent, no cookies are set.
 *
 * When the user later accepts (via the CookieConsent banner), this
 * component listens for the consent change event and loads GA
 * dynamically without requiring a page reload.
 *
 * Route-change tracking: gtag.js's automatic page_view (sent by the
 * `config` call below) only covers the page that was active at load
 * time. The Next.js App Router navigates client-side without a full
 * page reload, so subsequent navigations are tracked explicitly here
 * via a `page_view` event on every pathname/search-params change.
 * `lastTrackedPathRef` guards against ever sending the *same* page
 * twice — whether from the initial `config` call or from React
 * effects re-running — so no page_view is double-counted.
 */
function GoogleAnalyticsInner() {
  const gaLoadedRef = useRef(false);
  const lastTrackedPathRef = useRef<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Load gtag.js once consent is granted (or immediately on mount if
  // consent was already granted on a previous visit).
  useEffect(() => {
    if (!env.isProduction || !env.gaMeasurementId) return;

    const measurementId = env.gaMeasurementId;

    function initGA() {
      if (gaLoadedRef.current) return;
      gaLoadedRef.current = true;

      // Inject the gtag script tag
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer ?? [];
      const push = window.dataLayer.push.bind(window.dataLayer);
      function gtag(...args: unknown[]) {
        push(args);
      }
      window.gtag = gtag;

      // Google Consent Mode v2: Google requires an EXPLICIT signal,
      // not just the absence of tracking. Without this, EEA traffic
      // gets silently dropped even though gtag.js loaded and fired.
      // We only ever reach initGA() after the user accepted, so we
      // set the baseline to denied and immediately update analytics
      // to granted in the same tick — this is the explicit signal
      // Google's consent enforcement checks for.
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });

      window.gtag("js", new Date());
      // This `config` call sends GA4's automatic initial page_view
      // for whichever page is active right now. Record it so the
      // route-change tracker effect below never re-sends it.
      window.gtag("config", measurementId);
      lastTrackedPathRef.current = buildPagePath(pathname, searchParams);
    }

    // Check current consent on mount — if already accepted, load GA
    // immediately so returning visitors get tracking without waiting.
    const currentChoice = getConsentChoice();
    if (currentChoice === "accepted") {
      initGA();
      return;
    }

    // Listen for future consent changes during this page visit.
    function handleConsentChange(event: Event) {
      const choice = (event as CustomEvent<string>).detail;
      if (choice === "accepted") {
        initGA();
      }
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    };
    // Only re-run if the measurement ID identity changes; pathname/
    // searchParams are intentionally excluded here — the initial
    // page_view is handled by the `config` call, and later
    // navigations are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env.gaMeasurementId, env.isProduction]);

  // Track client-side (SPA) route changes as their own page_view
  // events, so navigating between generators, the IQ test, fortune
  // pages, /ru/* pages, etc. is captured without a full page reload.
  useEffect(() => {
    if (!gaLoadedRef.current || typeof window.gtag !== "function") return;

    const pagePath = buildPagePath(pathname, searchParams);

    // Already tracked (either by the initial `config` call, or by a
    // previous run of this same effect) — skip to avoid a duplicate
    // page_view.
    if (pagePath === lastTrackedPathRef.current) return;
    lastTrackedPathRef.current = pagePath;

    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  // This component renders nothing — it only manages script injection
  // and route-change tracking.
  return null;
}

export function GoogleAnalytics() {
  // useSearchParams() requires a Suspense boundary per Next.js App
  // Router rules; this keeps the rest of the tree (including the
  // static parts of the root layout) unaffected.
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}

GoogleAnalytics.displayName = "GoogleAnalytics";
