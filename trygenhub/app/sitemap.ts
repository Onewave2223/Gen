import type { MetadataRoute } from "next";
import { generators } from "@/data/generators";
import { tools } from "@/data/tools";
import { calculators } from "@/data/calculators";
import { gadaniyaTools } from "@/data/gadaniya";
import { fortuneTools } from "@/data/fortune";
import { instrumentyTools } from "@/data/instrumenty";
import { funTools } from "@/data/fun-en";
import { funToolsRu } from "@/data/fun-ru";
import { FULL_DECK } from "@/lib/tarot/deck";
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
    {
      url: absoluteUrl("/iq-test"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/how-it-works"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categoryEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/generators"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/tools"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/fun"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/fortune"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const generatorEntries: MetadataRoute.Sitemap = generators
    .filter((generator) => generator.status === "available")
    .map((generator) => ({
      url: absoluteUrl(generator.href),
      changeFrequency: "monthly",
      priority: generator.featured ? 0.9 : 0.8,
    }));

  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: absoluteUrl(tool.href),
    changeFrequency: "monthly" as const,
    priority: tool.featured ? 0.9 : 0.8,
  }));

  const calculatorEntries: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: absoluteUrl(calc.href),
    changeFrequency: "monthly" as const,
    priority: calc.featured ? 0.9 : 0.8,
  }));

  const gadaniyaEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/ru/gadaniya"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...gadaniyaTools.map((tool) => ({
      url: absoluteUrl(tool.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const fortuneEntries: MetadataRoute.Sitemap = [
    ...fortuneTools.map((tool) => ({
      url: absoluteUrl(tool.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const tarotCardEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/tarot/cards"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/ru/tarot/cards"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...FULL_DECK.map((card) => ({
      url: absoluteUrl(`/tarot/cards/${card.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...FULL_DECK.map((card) => ({
      url: absoluteUrl(`/ru/tarot/cards/${card.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const ruMainEntry: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/ru"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/ru/test-na-iq"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
  ];

  // Russian informational pages
  const ruInfoEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/ru/o-proekte"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/ru/kontakty"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/ru/konfidencialnost"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/ru/usloviya"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/ru/kak-eto-rabotaet"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const instrumentyEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/ru/instrumenty"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...instrumentyTools.map((tool) => ({
      url: absoluteUrl(tool.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const funEnEntries: MetadataRoute.Sitemap = funTools.map((tool) => ({
    url: absoluteUrl(tool.href),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const razvlecheniyaEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/ru/razvlecheniya"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...funToolsRu.map((tool) => ({
      url: absoluteUrl(tool.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    ...staticEntries,
    ...categoryEntries,
    ...generatorEntries,
    ...toolEntries,
    ...calculatorEntries,
    ...fortuneEntries,
    ...tarotCardEntries,
    ...gadaniyaEntries,
    ...ruMainEntry,
    ...ruInfoEntries,
    ...instrumentyEntries,
    ...funEnEntries,
    ...razvlecheniyaEntries,
  ];
}
