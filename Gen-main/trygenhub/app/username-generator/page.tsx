import type { Metadata } from "next";
import { SparkleIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RelatedGenerators } from "@/components/generators/RelatedGenerators";
import { AiUsernameGenerator } from "@/components/generators/AiUsernameGenerator";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/username-generator";
const NAME = "AI Username Generator";
const SHORT_DESCRIPTION =
  "Generate unique, AI-style username ideas with optional keywords, multiple vibes, numbers, and underscores.";
const SEO_TITLE = "AI Username Generator – Free Online Tool";
const SEO_DESCRIPTION =
  "Generate unique, AI-style username ideas for social media, gaming, and online accounts. Choose a vibe, add keywords, numbers, and underscores. Free and instant.";

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
      ru: "/ru/username-generator",
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

export default function AiUsernameGeneratorPage() {
  return (
    <GeneratorShell
      icon={<SparkleIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiUsernameGenerator />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <RelatedGenerators currentId="ai-username" limit={6} />
      </div>
    </GeneratorShell>
  );
}
