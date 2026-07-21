import type { Metadata } from "next";
import { SmileyIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { AiPetNameGeneratorRu } from "@/components/generators/AiPetNameGeneratorRu";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ru/ai-pet-name-generator";
const NAME = "Генератор кличек питомцев ИИ";
const SHORT_DESCRIPTION =
  "Создавайте клички для собак, кошек, птиц, кроликов и других питомцев.";
const SEO_TITLE = "Генератор кличек питомцев ИИ – бесплатный инструмент";
const SEO_DESCRIPTION =
  "Создавайте клички для собак, кошек, птиц, кроликов и других питомцев с помощью ИИ. Бесплатно и мгновенно.";

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SEO_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Инструменты", path: "/ru/instrumenty" },
    { name: NAME, path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: "/ai-pet-name-generator",
      ru: PATH,
    },
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "ru_RU",
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

export default function AiPetNameGeneratorRuPage() {
  return (
    <InstrumentyShell
      icon={<SmileyIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiPetNameGeneratorRu />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <OtherInstrumenty currentId="ai-pet-name" limit={6} />
      </div>
    </InstrumentyShell>
  );
}
