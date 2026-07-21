import type { Metadata } from "next";
import Link from "next/link";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { Hero } from "@/components/home/Hero";
import { CategoryPortals, type CategoryPortalItem } from "@/components/home/CategoryPortals";
import { FeaturedExperiences, type FeaturedExperienceItem } from "@/components/home/FeaturedExperiences";
import { PopularTools } from "@/components/home/PopularTools";
import { WhyGenHub } from "@/components/home/WhyGenHub";
import { TrustSection } from "@/components/home/TrustSection";
import { FaqSection } from "@/components/home/FaqSection";
import { GeneratorOfTheDay } from "@/components/home/GeneratorOfTheDay";
import { RecentlyUsedSection } from "@/components/home/RecentlyUsedSection";
import { SiteStatistics } from "@/components/home/SiteStatistics";
import { RandomGeneratorButton } from "@/components/home/RandomGeneratorButton";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  type JsonValue,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { instrumentyTools } from "@/data/instrumenty";
import { gadaniyaTools } from "@/data/gadaniya";
import { funToolsRu } from "@/data/fun-ru";
import { TOTAL_TEST_QUESTIONS } from "@/lib/iq-test/questions";

const PATH = "/ru";
const TITLE = "TryGenHub на русском — бесплатные онлайн-инструменты, генераторы и гадания";
const DESCRIPTION =
  "Бесплатные онлайн-инструменты на русском языке: генераторы, калькуляторы, случайный выбор, работа с текстом, гадания и другие полезные сервисы. Без регистрации.";

// Order + size drives the bento layout in CategoryPortals:
// [        Гадания и Таро (large)        ]
// [ Инструменты (med) ] [ Развлечения (med) ]
// [        Тест на IQ (large)            ]
const CATEGORY_ITEMS: readonly CategoryPortalItem[] = [
  {
    id: "gadaniya",
    href: "/ru/gadaniya",
    name: "Гадания и Таро",
    description:
      "Да или нет, карта дня, шар судьбы, число судьбы и совместимость.",
    count: gadaniyaTools.length,
    countLabel: "гаданий",
    ctaLabel: "Открыть",
    size: "large",
    theme: "fortune",
    quickLinks: [
      { label: "Карта дня", href: "/ru/gadaniya/karta-dnya" },
      { label: "Да или нет", href: "/ru/gadaniya/da-net" },
      { label: "Совместимость", href: "/ru/gadaniya/sovmestimost" },
    ],
  },
  {
    id: "instrumenty",
    href: "/ru/instrumenty",
    name: "Онлайн-инструменты",
    description:
      "Калькуляторы, генераторы паролей и чисел, работа с текстом и QR-коды.",
    count: instrumentyTools.length,
    countLabel: "инструментов",
    ctaLabel: "Открыть",
    size: "medium",
    theme: "generators",
  },
  {
    id: "razvlecheniya",
    href: "/ru/razvlecheniya",
    name: "Развлечения",
    description: "Правда или действие, «Я никогда не», случайные вопросы и идеи.",
    count: funToolsRu.length,
    countLabel: "игр",
    ctaLabel: "Открыть",
    size: "medium",
    theme: "fun",
  },
  {
    id: "test-na-iq",
    href: "/ru/test-na-iq",
    name: "Тест на IQ",
    description: `${TOTAL_TEST_QUESTIONS} вопросов на логику, паттерны и пространственное мышление.`,
    count: TOTAL_TEST_QUESTIONS,
    countLabel: "вопросов",
    ctaLabel: "Пройти тест",
    size: "large",
    theme: "iq",
  },
];

const FEATURED_EXPERIENCES: readonly FeaturedExperienceItem[] = [
  {
    id: "karta-dnya",
    href: "/ru/gadaniya/karta-dnya",
    name: "Карта дня",
    description: "Карта Таро на сегодня.",
    emoji: "🃏",
  },
  {
    id: "tarot",
    href: "/ru/tarot/cards",
    name: "Таро",
    description: "78 карт и их значения.",
    emoji: "✨",
  },
  {
    id: "sovmestimost",
    href: "/ru/gadaniya/sovmestimost",
    name: "Совместимость",
    description: "Узнайте, насколько вы совместимы.",
    emoji: "💞",
  },
  {
    id: "shar-sudby",
    href: "/ru/gadaniya/shar-sudby",
    name: "Шар судьбы",
    description: "Задайте вопрос и загляните в шар.",
    emoji: "🔮",
  },
];

const websiteSchema: JsonValue = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  description: DESCRIPTION,
  url: absoluteUrl(PATH),
  inLanguage: "ru",
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
  },
};

const schemas = [
  websiteSchema,
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: "/",
      ru: "/ru",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RuMainPage() {
  return (
    <>
      <RuLangSetter />
      <JsonLd data={schemas} />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <nav aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link
                href="/"
                className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                Главная (EN)
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              Русский раздел
            </li>
          </ol>
        </nav>
      </div>

      <Hero
        badge="Бесплатные инструменты — без регистрации"
        titleBefore="Инструменты, генераторы и"
        titleAccent="гадания"
        titleAfter="— всё в одном месте"
        subtitle="Калькуляторы, генераторы, работа с текстом, случайный выбор и гадания — прямо в браузере, без регистрации и передачи данных."
      />

      <CategoryPortals title="Разделы" items={CATEGORY_ITEMS} />

      <div className="mx-auto flex max-w-6xl justify-center px-4 sm:px-6">
        <RandomGeneratorButton locale="ru" />
      </div>

      {/* 1. Recently Used — moved to top */}
      <RecentlyUsedSection locale="ru" />

      {/* 2. Popular Tools */}
      <PopularTools locale="ru" />

      {/* 3. New Tools (Featured Experiences) */}
      <FeaturedExperiences
        eyebrow="Попробуй прямо сейчас"
        title="Популярные гадания"
        items={FEATURED_EXPERIENCES}
      />

      {/* 4. Generator of the Day */}
      <GeneratorOfTheDay locale="ru" />

      {/* 5. Statistics */}
      <SiteStatistics locale="ru" />

      <WhyGenHub locale="ru" />
      <TrustSection locale="ru" />
      <FaqSection locale="ru" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--muted)]">
          Хотите попробовать инструменты на английском языке?{" "}
          <Link href="/" className="font-medium text-[var(--primary)] hover:underline">
            Перейти на главную страницу TryGenHub →
          </Link>
        </p>
      </section>
    </>
  );
}
