import { buildAbsoluteUrl, normalizeSiteUrl } from "./utils";

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly url: string;
  readonly locale: string;
  readonly language: string;
  readonly creator: string;
  readonly keywords: readonly string[];
}

const DEFAULT_LOCAL_URL = "https://trygenhub.com";

export const siteConfig: SiteConfig = {
  name: "GenHub",
  shortName: "GenHub",
  description:
    "Free, fast, and easy-to-use online generators and random tools.",
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_LOCAL_URL,
  ),
  locale: "en_US",
  language: "en",
  creator: "GenHub",
  keywords: [
    "online generators",
    "free generators",
    "random generator",
    "random tools",
    "password generator",
    "username generator",
    "random number generator",
  ],
};

/**
 * Whether the current site URL points at a local development server.
 * Used to avoid accidentally telling search engines to index a
 * localhost deployment.
 */
export const isLocalSiteUrl = /^https?:\/\/localhost(:\d+)?$/.test(
  siteConfig.url,
);

/**
 * Builds an absolute URL for the given path using the centralized
 * site URL. Prefer this over hardcoding the domain anywhere in the
 * app (metadata, sitemap, robots, structured data, etc).
 *
 * absoluteUrl("/generators/password") -> "{siteConfig.url}/generators/password"
 */
export function absoluteUrl(path = "/"): string {
  return buildAbsoluteUrl(siteConfig.url, path);
}
