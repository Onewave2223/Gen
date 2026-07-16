import { siteConfig, absoluteUrl } from "@/lib/site";

/**
 * A minimal JSON-compatible value type. Used instead of `any` for
 * structured data objects, since JSON-LD payloads are always plain
 * serializable data built from trusted, internal sources.
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Builds WebSite structured data for the homepage.
 *
 * Intentionally does not include a SearchAction: TryGenHub's current
 * homepage search is a client-side filter over a local catalog, not
 * a crawlable search results URL, so a SearchAction would misrepresent
 * the site to search engines.
 */
export function createWebSiteSchema(): JsonValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
  };
}

/**
 * Builds a minimal Organization schema using only confirmed data
 * (name and URL). Deliberately omits logo, address, phone, social
 * profiles, or founder information, since none of that is currently
 * available for TryGenHub.
 */
export function createOrganizationSchema(): JsonValue {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
  };
}

export interface WebApplicationSchemaInput {
  name: string;
  description: string;
  path: string;
  category?: string;
}

/**
 * Builds a WebApplication schema for a single generator page. Only
 * includes an "offers" block reflecting the tool being free, since
 * that is true for every current generator. Does not include
 * aggregateRating, review, downloadUrl, or softwareVersion, since
 * none of that data exists.
 */
export function createWebApplicationSchema({
  name,
  description,
  path,
  category = "UtilitiesApplication",
}: WebApplicationSchemaInput): JsonValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: category,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/**
 * Builds a BreadcrumbList schema from an ordered list of breadcrumb
 * items. Each item's path is resolved to an absolute, crawlable URL
 * (or homepage URL + fragment, matching the visible breadcrumb UI).
 */
export function createBreadcrumbListSchema(
  items: readonly BreadcrumbItem[],
): JsonValue {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Builds FAQPage schema from the same question/answer data rendered
 * visibly on the page, so structured data never diverges from what a
 * visitor actually sees.
 */
export function createFaqPageSchema(items: readonly FaqItem[]): JsonValue {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
