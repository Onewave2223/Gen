import type { Metadata } from "next";
import { FingerprintIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { UuidGeneratorRu } from "@/components/instrumenty/UuidGeneratorRu";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/instrumenty/generator-uuid";
const NAME = "Генератор UUID";
const SHORT_DESCRIPTION =
  "Создайте один или несколько UUID v4 прямо в браузере с помощью crypto.randomUUID(). Без отправки данных.";

const faqItems: FaqItem[] = [
  {
    question: "Что такое UUID?",
    answer:
      "UUID (Universally Unique Identifier) — 128-битный идентификатор, стандартизированный по RFC 4122. Используется для уникальной идентификации объектов в системах без центрального координатора.",
  },
  {
    question: "Чем отличается UUID v4?",
    answer:
      "UUID v4 генерируется на основе случайных чисел. Это наиболее распространённый тип, подходящий для большинства задач.",
  },
  {
    question: "Насколько уникальны сгенерированные UUID?",
    answer:
      "Вероятность коллизии при UUID v4 ничтожно мала — порядка 1 из 5,3 × 10³⁶. На практике UUID считаются уникальными.",
  },
  {
    question: "Данные отправляются на сервер?",
    answer:
      "Нет, UUID генерируются исключительно в браузере с помощью встроенного Web Crypto API.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "DeveloperApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Инструменты", path: "/ru/instrumenty" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: `${NAME} v4 онлайн`,
  description:
    "Генератор UUID v4 онлайн: создайте один или несколько UUID прямо в браузере. Используется crypto.randomUUID(). Бесплатно, без регистрации.",
  alternates: {
    canonical: PATH,
    languages: { en: "/generators/uuid-generator", ru: PATH },
  },
  openGraph: {
    title: `${NAME} v4 онлайн`,
    description: "Создавайте UUID v4 в браузере — быстро и без отправки данных.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} v4 онлайн`, description: SHORT_DESCRIPTION },
};

export default function GeneratorUuidPage() {
  return (
    <InstrumentyShell icon={<FingerprintIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🔑">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <UuidGeneratorRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как сгенерировать UUID
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите нужное количество UUID (от 1 до 20).</li>
            <li>2. Нажмите «Сгенерировать».</li>
            <li>3. Скопируйте один UUID кнопкой рядом или все сразу кнопкой «Копировать все».</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Где используются UUID
          </h2>
          <p className="text-sm text-[var(--muted)]">
            UUID применяются в базах данных в качестве первичных ключей,
            при создании идентификаторов сессий, токенов, транзакций и
            любых других объектов, которые должны быть уникальными
            без зависимости от центрального сервера.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Частые вопросы</h2>
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <OtherInstrumenty currentId="generator-uuid" />
      </div>
    </InstrumentyShell>
  );
}
