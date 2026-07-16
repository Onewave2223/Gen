import type { Metadata } from "next";
import Link from "next/link";
import { InstrumentyHubGrid } from "@/components/instrumenty/InstrumentyHubGrid";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  type FaqItem,
  type JsonValue,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { instrumentyTools } from "@/data/instrumenty";

const PATH = "/ru/instrumenty";
const TITLE = "Бесплатные онлайн-инструменты и калькуляторы";
const DESCRIPTION =
  "Бесплатные онлайн-инструменты на русском языке: калькуляторы процентов, ИМТ и чаевых, конвертер регистра, сортировка строк, генераторы UUID, QR-кодов, никнеймов, случайные команды и победитель. Без регистрации.";

const faqItems: FaqItem[] = [
  {
    question: "Инструменты действительно бесплатные?",
    answer:
      "Да, все инструменты полностью бесплатны, не требуют регистрации и работают прямо в браузере.",
  },
  {
    question: "Куда отправляются мои данные?",
    answer:
      "Никуда. Все расчёты, включая генерацию паролей и QR-кодов, выполняются локально в браузере и не отправляются на сервер.",
  },
  {
    question: "Инструменты работают на телефоне?",
    answer:
      "Да, все страницы адаптированы под мобильные устройства и одинаково хорошо работают на телефоне, планшете и компьютере.",
  },
  {
    question: "Нужно ли устанавливать приложение?",
    answer:
      "Нет, ничего скачивать не нужно — достаточно открыть страницу нужного инструмента в браузере.",
  },
];

const collectionSchema: JsonValue = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: absoluteUrl(PATH),
  inLanguage: "ru",
  hasPart: instrumentyTools.map((tool) => ({
    "@type": "WebApplication",
    name: tool.name,
    description: tool.shortDescription,
    url: absoluteUrl(tool.href),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  })),
};

const schemas = [
  collectionSchema,
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Инструменты", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
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

export default function InstrumentyHubPage() {
  return (
    <>
      <RuLangSetter />
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
        <JsonLd data={schemas} />

        <nav aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link
                href="/"
                className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/ru"
                className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Русский раздел
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              Инструменты
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Онлайн-инструменты и калькуляторы
          </h1>
          <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
            {instrumentyTools.length} бесплатных инструментов: калькуляторы возраста,
            процентов, ИМТ и чаевых; работа с текстом — конвертер регистра,
            удаление дублей и сортировка строк; генераторы UUID, QR-кодов,
            никнеймов и Lorem Ipsum; случайные команды, победитель и другие.
            Всё работает в браузере без отправки данных.
          </p>
        </div>

        <InstrumentyHubGrid />

        <section className="flex flex-col gap-3 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            О разделе «Инструменты»
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Этот раздел TryGenHub собрал практичные онлайн-инструменты
            для повседневных задач. Каждый инструмент работает прямо
            в браузере — не нужно ничего скачивать, регистрироваться
            или платить. Ваши данные никуда не отправляются.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Если вам больше по душе развлекательные онлайн-гадания,
            заглядуйте в раздел{" "}
            <Link
              href="/ru/gadaniya"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              «Гадания»
            </Link>
            .
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Частые вопросы
          </h2>

          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </section>
      </div>
    </>
  );
}
