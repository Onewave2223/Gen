import type { Metadata } from "next";
import { SortArrowsIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { SortLinesRu } from "@/components/instrumenty/SortLinesRu";
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

const PATH = "/ru/instrumenty/sortirovka-strok";
const NAME = "Сортировка строк";
const SHORT_DESCRIPTION =
  "А–Я, Я–А, по длине или случайно. Кириллица обрабатывается корректно.";

const faqItems: FaqItem[] = [
  {
    question: "Кириллица сортируется правильно?",
    answer:
      "Да, для сортировки по алфавиту используется русская локаль, что обеспечивает корректный порядок кириллических символов.",
  },
  {
    question: "Сколько строк можно отсортировать?",
    answer:
      "Практически неограниченное количество — введите столько строк, сколько нужно. Сортировка выполняется мгновенно в браузере.",
  },
  {
    question: "Что происходит при нажатии «Случайно» повторно?",
    answer:
      "Строки перемешиваются заново каждый раз при нажатии на эту кнопку.",
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
    "Сортировка строк онлайн: А–Я, Я–А, от коротких к длинным, от длинных к коротким или случайно. Поддержка кириллицы. Бесплатно.",
  alternates: {
    canonical: PATH,
    languages: { en: "/tools/sort-lines", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Сортируйте строки по алфавиту, длине или случайно. Кириллица поддерживается.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function SortirovkaStrokPage() {
  return (
    <InstrumentyShell icon={<SortArrowsIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🔤">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <SortLinesRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как отсортировать строки
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите способ сортировки кнопками вверху.</li>
            <li>2. Введите или вставьте строки в поле ввода — каждая с новой строки.</li>
            <li>3. Результат обновляется автоматически при изменении типа сортировки.</li>
            <li>4. Нажмите «Копировать», чтобы забрать результат.</li>
          </ol>
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

        <OtherInstrumenty currentId="sortirovka-strok" />
      </div>
    </InstrumentyShell>
  );
}
