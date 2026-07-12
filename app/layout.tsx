import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { absoluteUrl, isLocalSiteUrl, siteConfig } from "@/lib/site";
import { env } from "@/lib/env";

const DEFAULT_TITLE = "GenHub — Free Online Generators";
const DEFAULT_DESCRIPTION =
  "Free, fast, browser-based online generators and utility tools. Generate random numbers, passwords, usernames, colors, dates, emojis, business names, and domain ideas.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | GenHub",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: [...siteConfig.keywords],
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <GoogleAnalytics />
        <AdSenseScript />
      </body>
    </html>
  );
}
