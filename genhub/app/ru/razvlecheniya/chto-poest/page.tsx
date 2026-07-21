import type { Metadata } from "next";
import { ForkKnifeIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { FoodPicker } from "@/components/fun/FoodPicker";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { foodIdeasRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/chto-poest";
const TITLE = "Что поесть? — случайный генератор идей для еды";
const DESCRIPTION =
  "Не знаешь, что приготовить или заказать? Получи случайную идею по категории. Быстро, полезно, вкусно или вегетарианское. Без регистрации.";

const faqItems = [
  { question: "Это диетическая рекомендация?", answer: "Нет. Это развлекательный генератор. Не медицинский и не диетологический совет." },
  { question: "Сколько идей доступно?", answer: "Более 80 идей в пяти категориях." },
  { question: "Используются ли внешние API?", answer: "Нет. Все идеи хранятся локально." },
  { question: "Инструмент бесплатен?", answer: "Да, полностью бесплатно." },
];

const schemas = [
  createWebApplicationSchema({ name: "Что поесть", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Что поесть", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/what-should-i-eat", ru: PATH },
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
  { key: "quick", label: "Быстро" },
  { key: "healthy", label: "Полезно" },
  { key: "comfort", label: "Для души" },
  { key: "vegetarian", label: "Вегетарианское" },
  { key: "any", label: "Что угодно" },
];

const RELATED = funToolsRu.filter((t) => ["chto-posmotret", "chem-zanyatsya", "prinyat-reshenie", "ideya-dnya"].includes(t.id));

export default function ChtoPoestPage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<ForkKnifeIcon className="h-6 w-6" />}
        title="Что поесть?"
        description="Не знаешь, что приготовить? Выбери категорию и получи случайную идею. Это не медицинский совет — просто весёлое вдохновение."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Что поесть?" },
        ]}
      >
        <JsonLd data={schemas} />
        <FoodPicker
          ideas={foodIdeasRU}
          categories={categories}
          labels={{
            pick: "Что поесть?",
            pickAnother: "Ещё вариант",
            result: "Как насчёт...",
            disclaimer: "Развлекательный генератор. Не является медицинской или диетологической рекомендацией.",
          }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как использовать</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Выбери категорию — в зависимости от настроения или времени.</li>
              <li>2. Нажми «Что поесть?».</li>
              <li>3. Не нравится вариант? Нажми «Ещё вариант».</li>
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
