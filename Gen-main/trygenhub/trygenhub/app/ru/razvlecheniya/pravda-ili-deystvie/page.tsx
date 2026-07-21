import type { Metadata } from "next";
import { MaskIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { TruthOrDare } from "@/components/fun/TruthOrDare";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { truthOrDareRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/pravda-ili-deystvie";
const TITLE = "Правда или действие — вопросы и задания онлайн";
const DESCRIPTION =
  "Играй в Правду или действие онлайн! 100+ вопросов и заданий. Категории: Общие, Смешные, Для друзей. Безопасный контент для широкой аудитории.";

const faqItems = [
  { question: "Сколько вопросов и заданий в игре?", answer: "Более 100 вопросов и заданий в трёх категориях." },
  { question: "Контент безопасен?", answer: "Да. Ничего опасного, унизительного или неуместного. Всё подходит для широкой аудитории." },
  { question: "Используются ли внешние API?", answer: "Нет. Весь контент хранится локально." },
  { question: "Игра бесплатна?", answer: "Да, полностью бесплатно." },
];

const schemas = [
  createWebApplicationSchema({ name: "Правда или действие", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Правда или действие", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/truth-or-dare", ru: PATH },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
};

const categories = [
  { key: "general", label: "Общие" },
  { key: "funny", label: "Смешные" },
  { key: "friends", label: "Для друзей" },
];

const RELATED = funToolsRu.filter((t) => ["chto-by-ty-vybral", "ya-nikogda-ne", "to-ili-eto", "sluchaynyy-vopros"].includes(t.id));

export default function PravdaIliDeystviyePage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<MaskIcon className="h-6 w-6" />}
        title="Правда или действие"
        description="Выбирай Правду для вопроса или Действие для задания. Весёлый, безопасный контент для любой компании."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Правда или действие" },
        ]}
      >
        <JsonLd data={schemas} />
        <TruthOrDare
          data={truthOrDareRU}
          categories={categories}
          labels={{ truth: "Правда", dare: "Действие", next: "Следующее", tapToReveal: "Выбери Правда или Действие" }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как играть</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Выбери категорию.</li>
              <li>2. Нажми «Правда» для вопроса или «Действие» для задания.</li>
              <li>3. Выполни задание или ответь на вопрос.</li>
              <li>4. Нажми «Следующее» для нового раунда.</li>
            </ol>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Часто задаваемые вопросы</h2>
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
                <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.question}</summary>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
              </details>
            ))}
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Другие развлечения</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {RELATED.map((tool) => (
                <Link key={tool.id} href={tool.href} className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]">
                  <span>{tool.emoji}</span>
                  <span className="font-medium text-[var(--foreground)]">{tool.name}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </FunShell>
    </>
  );
}
