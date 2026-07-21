import type { Metadata } from "next";
import { QuestionBubbleIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { AiRandomQuestionGeneratorRu } from "@/components/generators/AiRandomQuestionGeneratorRu";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createWebApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/ru/ai-random-question-generator";
const NAME = "Генератор случайных вопросов ИИ";
const SHORT_DESCRIPTION =
  "Создавайте интересные вопросы для весёлых и глубоких разговоров, отношений, друзей, знакомства и личных размышлений.";
const SEO_TITLE = "Генератор случайных вопросов ИИ – бесплатный инструмент";
const SEO_DESCRIPTION =
  "Создавайте интересные вопросы с помощью ИИ: весёлые, глубокие, для отношений, друзей, знакомства, 'что бы ты выбрал' и личные размышления.";

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
      en: "/ai-random-question-generator",
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

export default function AiRandomQuestionGeneratorRuPage() {
  return (
    <InstrumentyShell
      icon={<QuestionBubbleIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
    >
      <JsonLd data={schemas} />
      <AiRandomQuestionGeneratorRu />

      <div className="mt-12 border-t border-[var(--border)] pt-10">
        <OtherInstrumenty currentId="ai-random-question" limit={6} />
      </div>
    </InstrumentyShell>
  );
}
