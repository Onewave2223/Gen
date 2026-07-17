import type { Metadata } from "next";
import { SparkleIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RelatedGenerators } from "@/components/generators/RelatedGenerators";
import { AiInstagramCaptionGenerator } from "@/components/generators/AiInstagramCaptionGenerator";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ai-instagram-caption-generator";
const NAME = "AI Instagram Caption Generator";
const SHORT_DESCRIPTION =
  "Generate AI-style Instagram captions for any mood — selfies, travel, food, fitness, fashion, love, business, motivation, and funny posts.";
const SEO_TITLE = "AI Instagram Caption Generator – Free Online Tool";
const SEO_DESCRIPTION =
  "Generate AI-style Instagram captions for selfies, travel, food, fitness, fashion, love, business, motivation, and funny posts, with optional emoji and hashtags.";

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
      ru: "/ru/ai-instagram-caption-generator",
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

export default function AiInstagramCaptionGeneratorPage() {
  return (
    <GeneratorShell
      icon={<SparkleIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiInstagramCaptionGenerator />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <RelatedGenerators currentId="ai-instagram-caption" limit={6} />
      </div>
    </GeneratorShell>
  );
}
