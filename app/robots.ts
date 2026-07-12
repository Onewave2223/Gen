import type { MetadataRoute } from "next";
import { absoluteUrl, isLocalSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Avoid telling crawlers to index a local/dev deployment if this
  // ever gets built with the local fallback site URL.
  if (isLocalSiteUrl) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
