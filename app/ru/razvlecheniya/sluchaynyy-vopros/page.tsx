import type { Metadata } from "next";
import { QuestionBubbleIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { RandomQuestion } from "@/components/fun/RandomQuestion";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { randomQuestionsRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/sluchaynyy-vopros";
const TITLE = "Случайный вопрос — генератор вопросов для разговора";
const DESCRIPTION =
  "Получай случайные вопросы для разговора. Категории: Знакомство, Для друзей, Глубокие, Смешные. Копируй и делись. Без регистрации.";

const faqItems = [
  { question: "Какие категории доступны?", answer: "Знакомство, Для друзей, Глубокие и Смешные — с 25+ вопросами в каждой." },
  { question: "Можно ли скопировать вопрос?", answer: "Да. Нажми кнопку «Копировать» чтобы скопировать вопрос в буфер обмена." },
  { question: "Подходит ли для командных мероприятий?", answer: "Отлично! Вопросы для знакомства идеальны для встреч и тимбилдинга." },
  { question: "Игра бесплатна?", answer: "Да, полностью бесплатно." },
];

const schemas = [
  createWebApplicationSchema({ name: "Случайный вопрос", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Случайный вопрос", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/random-question", ru: PATH },
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
  { key: "icebreakers", label: "Знакомство" },
  { key: "friends", label: "Для друзей" },
  { key: "deep", label: "Глубокие" },
  { key: "funny", label: "Смешные" },
];

const RELATED = funToolsRu.filter((t) => ["tema-dlya-razgovora", "chto-by-ty-vybral", "to-ili-eto", "pravda-ili-deystvie"].includes(t.id));

export default function SluchaynyVoprosPage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<QuestionBubbleIcon className="h-6 w-6" />}
        title="Случайный вопрос"
        description="Вопросы для разговора на любой случай — знакомство, глубокие темы, смешные или для друзей."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Случайный вопрос" },
        ]}
      >
        <JsonLd data={schemas} />
        <RandomQuestion
          questions={randomQuestionsRU}
          categories={categories}
          labels={{ next: "Следующий вопрос", copy: "Копировать", copied: "Скопировано!" }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как использовать</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Выбери категорию: Знакомство, Для друзей, Глубокие или Смешные.</li>
              <li>2. Прочитай вопрос и используй его для начала разговора.</li>
              <li>3. Нажми «Следующий вопрос» для нового.</li>
              <li>4. Скопируй вопрос кнопкой «Копировать».</li>
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
