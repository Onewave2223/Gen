import type { Metadata } from "next";
import { MaskIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { AiCharacterNameGeneratorRu } from "@/components/generators/AiCharacterNameGeneratorRu";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ru/ai-character-name-generator";
const NAME = "Генератор имён персонажей ИИ";
const SHORT_DESCRIPTION =
  "Создавайте имена персонажей, выбрав стиль — фэнтези, sci-fi, средневековье, современность или случайно.";
const SEO_TITLE = "Генератор имён персонажей ИИ – бесплатный инструмент";
const SEO_DESCRIPTION =
  "Создавайте имена персонажей в стиле фэнтези, sci-fi, средневековье, современность или случайно — с помощью ИИ. Бесплатно и мгновенно.";

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
      en: "/ai-character-name-generator",
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

export default function AiCharacterNameGeneratorRuPage() {
  return (
    <InstrumentyShell
      icon={<MaskIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiCharacterNameGeneratorRu />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <OtherInstrumenty currentId="ai-character-name" limit={6} />
      </div>
    </InstrumentyShell>
  );
}
