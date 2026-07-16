import type { Metadata } from "next";
import { TextDocumentIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { LoremIpsumRu } from "@/components/instrumenty/LoremIpsumRu";
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

const PATH = "/ru/instrumenty/lorem-ipsum";
const NAME = "Генератор Lorem Ipsum";
const SHORT_DESCRIPTION =
  "Создайте текст-заглушку Lorem Ipsum: абзацы, предложения или слова. Копируйте результат одной кнопкой.";

const faqItems: FaqItem[] = [
  {
    question: "Что такое Lorem Ipsum?",
    answer:
      "Lorem Ipsum — стандартный текст-заглушка, используемый в полиграфии и дизайне с XVI века. Он позволяет оценить макет без отвлечения на смысл текста.",
  },
  {
    question: "Чем отличаются режимы «Абзацы», «Предложения» и «Слова»?",
    answer:
      "Режим «Абзацы» создаёт блоки из нескольких предложений, «Предложения» — отдельные предложения, «Слова» — произвольный набор слов заданного количества.",
  },
  {
    question: "Можно ли использовать текст в коммерческих проектах?",
    answer:
      "Да, Lorem Ipsum является текстом общественного достояния и может использоваться свободно в любых целях.",
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
    "Генератор Lorem Ipsum онлайн: создайте текст-заглушку — абзацы, предложения или слова. Бесплатно, без регистрации.",
  alternates: {
    canonical: PATH,
    languages: { en: "/generators/lorem-ipsum", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Создайте текст Lorem Ipsum для макетов и прототипов за секунду.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function LoremIpsumPage() {
  return (
    <InstrumentyShell icon={<TextDocumentIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="📄">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <LoremIpsumRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как сгенерировать Lorem Ipsum
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите тип текста: абзацы, предложения или слова.</li>
            <li>2. Укажите нужное количество.</li>
            <li>3. Нажмите «Сгенерировать».</li>
            <li>4. Скопируйте результат кнопкой «Копировать».</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Где используется Lorem Ipsum
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Текст-заглушку Lorem Ipsum используют дизайнеры при вёрстке макетов,
            разработчики при создании прототипов и тестировании, а редакторы —
            для оценки объёма и внешнего вида материала ещё до написания
            окончательного текста.
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

        <OtherInstrumenty currentId="lorem-ipsum" />
      </div>
    </InstrumentyShell>
  );
}
