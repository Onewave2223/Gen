import type { Metadata } from "next";
import { CrystalBallIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RelatedGenerators } from "@/components/generators/RelatedGenerators";
import { AiFantasyNameGenerator } from "@/components/generators/AiFantasyNameGenerator";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ai-fantasy-name-generator";
const NAME = "AI Fantasy Name Generator";
const SHORT_DESCRIPTION =
  "Generate AI-style fantasy character names by race, with optional epithets and a custom keyword.";
const SEO_TITLE = "AI Fantasy Name Generator – Free Online Tool";
const SEO_DESCRIPTION =
  "Generate AI-style fantasy names for elves, dwarves, orcs, humans, and dark characters with optional epithets. Free and instant.";

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SEO_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Generators", path: "/generators" },
    { name: NAME, path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/ai-fantasy-name-generator",
    },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function AiFantasyNameGeneratorPage() {
  return (
    <GeneratorShell
      icon={<CrystalBallIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiFantasyNameGenerator />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <RelatedGenerators currentId="ai-fantasy-name" limit={6} />
      </div>
    </GeneratorShell>
  );
}
