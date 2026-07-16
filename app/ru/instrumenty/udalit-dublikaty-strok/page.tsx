import type { Metadata } from "next";
import { LineMinusIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { RemoveDuplicatesRu } from "@/components/instrumenty/RemoveDuplicatesRu";
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

const PATH = "/ru/instrumenty/udalit-dublikaty-strok";
const NAME = "Удаление дублей строк";
const SHORT_DESCRIPTION =
  "Вставьте текст, и инструмент уберёт повторяющиеся строки — с учётом или без учёта регистра.";

const faqItems: FaqItem[] = [
  {
    question: "Что считается дублем строки?",
    answer:
      "Две строки считаются дублями, если они полностью совпадают. При включённом параметре «Учитывать регистр» строки «Привет» и «привет» не считаются дублями.",
  },
  {
    question: "Сохраняется ли порядок строк?",
    answer:
      "Да, инструмент сохраняет порядок первого появления каждой строки, удаляя только повторные вхождения.",
  },
  {
    question: "Что делает опция «Удалить пустые строки»?",
    answer:
      "Эта опция дополнительно убирает все строки, которые пусты или содержат только пробелы.",
  },
  {
    question: "Мои данные куда-то отправляются?",
    answer:
      "Нет, всё обрабатывается локально в браузере.",
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
    "Удалить дубликаты строк онлайн бесплатно. Вставьте текст — инструмент уберёт повторяющиеся строки с учётом или без учёта регистра.",
  alternates: {
    canonical: PATH,
    languages: { en: "/tools/remove-duplicate-lines", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Уберите повторяющиеся строки из текста в один клик.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function UdalitDublikatyStrokPage() {
  return (
    <InstrumentyShell icon={<LineMinusIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="✂️">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <RemoveDuplicatesRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как удалить дубликаты строк
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Вставьте текст в поле ввода — каждый элемент на своей строке.</li>
            <li>2. Настройте параметры: учёт регистра и удаление пустых строк.</li>
            <li>3. Результат обновляется автоматически.</li>
            <li>4. Нажмите «Копировать», чтобы скопировать очищенный текст.</li>
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

        <OtherInstrumenty currentId="udalit-dublikaty-strok" />
      </div>
    </InstrumentyShell>
  );
}
