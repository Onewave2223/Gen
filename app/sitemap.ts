import type { MetadataRoute } from "next";
import { generators } from "@/data/generators";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/privacy"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const generatorEntries: MetadataRoute.Sitemap = generators
    .filter((generator) => generator.status === "available")
    .map((generator) => ({
      url: absoluteUrl(generator.href),
      changeFrequency: "monthly",
      priority: generator.featured ? 0.9 : 0.8,
    }));

  return [...staticEntries, ...generatorEntries];
}
