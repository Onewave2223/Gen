import type { Metadata } from "next";
import { SparkleIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { AiInstagramCaptionGeneratorRu } from "@/components/generators/AiInstagramCaptionGeneratorRu";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ru/ai-instagram-caption-generator";
const NAME = "Генератор подписей для Instagram ИИ";
const SHORT_DESCRIPTION =
  "Создавайте подписи для Instagram под любое настроение — селфи, путешествия, еда, фитнес, мода, любовь, бизнес, мотивация и юмор.";
const SEO_TITLE = "Генератор подписей для Instagram ИИ – бесплатный инструмент";
const SEO_DESCRIPTION =
  "Создавайте подписи для Instagram с помощью ИИ: селфи, путешествия, еда, фитнес, мода, любовь, бизнес, мотивация и юмор, с эмодзи и хэштегами.";

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
      en: "/ai-instagram-caption-generator",
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

export default function AiInstagramCaptionGeneratorRuPage() {
  return (
    <InstrumentyShell
      icon={<SparkleIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiInstagramCaptionGeneratorRu />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <OtherInstrumenty currentId="ai-instagram-caption" limit={6} />
      </div>
    </InstrumentyShell>
  );
}
