import type { Metadata } from "next";
import { HashNumberIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { RandomNumberRu } from "@/components/instrumenty/RandomNumberRu";
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

const PATH = "/ru/instrumenty/sluchaynoe-chislo";
const NAME = "Генератор случайных чисел";
const SHORT_DESCRIPTION =
  "Задайте диапазон и получите одно или несколько случайных чисел.";

const faqItems: FaqItem[] = [
  {
    question: "Можно ли получить сразу несколько чисел?",
    answer:
      "Да, укажите нужное количество чисел — генератор выдаст сразу весь список.",
  },
  {
    question: "Что происходит, если включить «Без повторений»?",
    answer:
      "Генератор не допустит повторяющихся чисел в результате. Если запрошенное количество больше, чем доступно уникальных значений в диапазоне, появится понятное сообщение об ошибке.",
  },
  {
    question: "Можно ли отсортировать результат?",
    answer:
      "Да, результат можно отсортировать по возрастанию или по убыванию, либо оставить в порядке генерации.",
  },
  {
    question: "Как скопировать результат?",
    answer:
      "Нажмите кнопку «Скопировать» рядом с результатом — числа будут скопированы в буфер обмена.",
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
    "Генератор случайных чисел онлайн бесплатно. Задайте минимум, максимум и количество чисел, запретите повторения и скопируйте результат.",
  alternates: {
    canonical: PATH,
    languages: { en: "/generators/random-number", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Сгенерируйте одно или несколько случайных чисел в диапазоне.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${NAME} онлайн`,
    description: "Сгенерируйте случайные числа в заданном диапазоне.",
  },
};

export default function SluchaynoeChisloPage() {
  return (
    <InstrumentyShell icon={<HashNumberIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🎲">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <RandomNumberRu />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как сгенерировать случайное число
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Укажите минимальное и максимальное значение.</li>
            <li>2. Укажите, сколько чисел нужно получить.</li>
            <li>
              3. При необходимости включите «Без повторений» и выберите
              сортировку.
            </li>
            <li>4. Нажмите «Сгенерировать».</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Где применяют генератор случайных чисел
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Генератор случайных чисел удобен для розыгрышей и
            лотерей, выбора номера в игре, случайной выборки данных
            для тестирования или любой другой задачи, где нужно
            быстро и честно получить случайное значение.
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

        <OtherInstrumenty currentId="sluchaynoe-chislo" />
      </div>
    </InstrumentyShell>
  );
}
