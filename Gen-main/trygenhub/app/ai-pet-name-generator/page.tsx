import type { Metadata } from "next";
import { SmileyIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RelatedGenerators } from "@/components/generators/RelatedGenerators";
import { AiPetNameGenerator } from "@/components/generators/AiPetNameGenerator";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ai-pet-name-generator";
const NAME = "AI Pet Name Generator";
const SHORT_DESCRIPTION =
  "Generate AI-style pet name ideas for dogs, cats, birds, rabbits, or any pet.";
const SEO_TITLE = "AI Pet Name Generator – Free Online Tool";
const SEO_DESCRIPTION =
  "Generate AI-style pet name ideas for dogs, cats, birds, rabbits, or any pet with an optional keyword. Free and instant.";

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
      ru: "/ru/ai-pet-name-generator",
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

export default function AiPetNameGeneratorPage() {
  return (
    <GeneratorShell
      icon={<SmileyIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiPetNameGenerator />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <RelatedGenerators currentId="ai-pet-name" limit={6} />
      </div>
    </GeneratorShell>
  );
}
