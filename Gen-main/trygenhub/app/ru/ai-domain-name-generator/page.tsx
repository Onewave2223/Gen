import type { Metadata } from "next";
import { GlobeIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { AiDomainNameGeneratorRu } from "@/components/generators/AiDomainNameGeneratorRu";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ru/ai-domain-name-generator";
const NAME = "Генератор доменных имён ИИ";
const SHORT_DESCRIPTION =
  "Создавайте варианты доменных имён в стиле ИИ по ключевому слову, стилю и расширению.";
const SEO_TITLE = "Генератор доменных имён ИИ – бесплатный инструмент";
const SEO_DESCRIPTION =
  "Создавайте варианты доменных имён в стиле ИИ по ключевому слову, стилю названия и расширению домена. Бесплатно и мгновенно.";

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
      en: "/ai-domain-name-generator",
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

export default function AiDomainNameGeneratorRuPage() {
  return (
    <InstrumentyShell
      icon={<GlobeIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiDomainNameGeneratorRu />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <OtherInstrumenty currentId="ai-domain-name" limit={6} />
      </div>
    </InstrumentyShell>
  );
}
