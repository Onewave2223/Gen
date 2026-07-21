import type { Metadata } from "next";
import { TrophyIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { AiTeamNameGeneratorRu } from "@/components/generators/AiTeamNameGeneratorRu";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ru/ai-team-name-generator";
const NAME = "Генератор названий команд ИИ";
const SHORT_DESCRIPTION =
  "Создавайте названия команд для игр, киберспорта, бизнеса и спорта.";
const SEO_TITLE = "Генератор названий команд ИИ – бесплатный инструмент";
const SEO_DESCRIPTION =
  "Создавайте названия команд для игр, киберспорта, бизнеса и спорта с помощью ИИ. Бесплатно и мгновенно.";

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
      en: "/ai-team-name-generator",
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

export default function AiTeamNameGeneratorRuPage() {
  return (
    <InstrumentyShell
      icon={<TrophyIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiTeamNameGeneratorRu />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <OtherInstrumenty currentId="ai-team-name" limit={6} />
      </div>
    </InstrumentyShell>
  );
}
