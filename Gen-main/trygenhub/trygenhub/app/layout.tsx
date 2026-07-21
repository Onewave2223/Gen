import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguagePreferenceBanner } from "@/components/layout/LanguagePreferenceBanner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import Script from "next/script";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { absoluteUrl, isLocalSiteUrl, siteConfig } from "@/lib/site";
import { env } from "@/lib/env";

const DEFAULT_TITLE = "Free Online Generators & Random Tools | TryGenHub";
const DEFAULT_DESCRIPTION =
  "Free online generators and random tools. Generate random numbers, secure passwords, usernames, colors, dates, emojis, company names, domain names and more.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | TryGenHub",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: [...siteConfig.keywords],
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "TryGenHub — Free Online Generators & Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl("/og-image.png")],
  },
  robots: {
    // Avoid signaling search engines to index a local/dev deployment.
    // Production crawl behavior is primarily controlled by robots.txt.
    index: !isLocalSiteUrl,
    follow: !isLocalSiteUrl,
  },
  // Only added when a real Google Search Console verification token
  // is configured. Never a fabricated placeholder value.
  ...(env.googleSiteVerification
    ? { verification: { google: env.googleSiteVerification } }
    : {}),
  // Google AdSense account verification meta tag. Next.js injects
  // entries from `other` as <meta name="..." content="..."> tags into
  // the server-rendered <head> of every page (not just the client
  // DOM), which is what AdSense's site-verification crawler requires.
  other: {
    "google-adsense-account": "ca-pub-8094929435378990",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <div className="flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="sr-only z-50 rounded-[var(--radius)] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        {/* GoogleAnalytics is consent-aware: only loads GA after the
            user explicitly accepts analytics cookies. This is the
            "how many people accepted tracking" number. */}
        <GoogleAnalytics />
        {/* Vercel Web Analytics: cookieless, no personal data, counts
            EVERY visitor regardless of cookie-consent choice. This is
            the "real total traffic" number — GDPR doesn't require a
            consent banner for this because it doesn't use cookies or
            fingerprinting. View it in the Vercel dashboard → Analytics. */}
        <VercelAnalytics />
        {/* Cloudflare Web Analytics: cookieless, counts every visitor.
            Manual snippet — the domain is DNS-only in Cloudflare (not
            proxied/orange-clouded), so Cloudflare's automatic
            injection doesn't apply and this has to be added directly
            in code. View data in Cloudflare dash → Web Analytics. */}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "771976ee431a41dbb4dedec8ecb834c2"}'
          strategy="afterInteractive"
        />
        {/* AdSenseScript only loads when NEXT_PUBLIC_ADSENSE_CLIENT_ID
            is configured with a real publisher ID. */}
        <AdSenseScript />
        {/* Cookie consent banner — shown on first visit or when the
            user requests to review their choice via "Cookie settings". */}
        <CookieConsent />
        <LanguagePreferenceBanner />
      </body>
    </html>
  );
}
