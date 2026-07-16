import type { Metadata } from "next";
import { ListCounterIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { WordCounter } from "@/components/instrumenty/WordCounter";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/instrumenty/schetchik-slov";
const NAME = "Счётчик слов и символов";
const SHORT_DESCRIPTION =
  "Вставьте текст и мгновенно узнайте количество слов, символов и время чтения.";

const faqItems: FaqItem[] = [
  {
    question: "Мой текст отправляется на сервер?",
    answer:
      "Нет, весь подсчёт выполняется локально в браузере, текст никуда не отправляется и не сохраняется.",
  },
  {
    question: "Как считается время чтения?",
    answer:
      "Время чтения оценивается из расчёта примерно 200 слов в минуту и округляется до целой минуты в большую сторону.",
  },
  {
    question: "Как определяются предложения и абзацы?",
    answer:
      "Предложения определяются по знакам . ! ? и …, а абзацы — по пустым строкам между блоками текста.",
  },
  {
    question: "Подходит ли счётчик для русского текста?",
    answer:
      "Да, счётчик одинаково хорошо работает как с русским, так и с текстом на других языках.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "UtilitiesApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Инструменты", path: "/ru/instrumenty" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: `${NAME} онлайн`,
  description:
    "Счётчик слов и символов онлайн бесплатно. Считайте символы, слова, предложения, абзацы и время чтения в реальном времени.",
  alternates: {
    canonical: PATH,
    languages: { en: "/tools/word-counter", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Считайте слова и символы в тексте в реальном времени.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${NAME} онлайн`,
    description: "Считайте слова и символы в тексте.",
  },
};

export default function SchetchikSlovPage() {
  return (
    <InstrumentyShell icon={<ListCounterIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="📝">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <WordCounter />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как посчитать слова и символы
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Вставьте или введите текст в поле выше.</li>
            <li>
              2. Статистика — символы, слова, предложения, абзацы и время
              чтения — обновляется автоматически.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Кому пригодится счётчик слов
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Счётчик слов удобен при написании постов для соцсетей с
            ограничением по символам, подготовке SEO-текстов и
            статей, работе с эссе и учебными работами или при
            оценке объёма перевода и времени чтения материала.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Частые вопросы
          </h2>

          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
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

        <OtherInstrumenty currentId="schetchik-slov" />
      </div>
    </InstrumentyShell>
  );
}
