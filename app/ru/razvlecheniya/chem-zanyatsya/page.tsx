import type { Metadata } from "next";
import { CompassPinIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { ActivityGenerator } from "@/components/fun/ActivityGenerator";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { activitiesRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/chem-zanyatsya";
const TITLE = "Чем заняться? — генератор случайных занятий";
const DESCRIPTION =
  "Не знаешь, чем заняться? Выбери, с кем ты, место и бюджет — получи случайную идею. Без API. Бесплатно.";

const faqItems = [
  { question: "Сколько занятий доступно?", answer: "Более 38 занятий с разными фильтрами." },
  { question: "Что делать, если нет подходящего варианта?", answer: "Ослабь один из фильтров — например, выбери «Где угодно» вместо конкретного места." },
  { question: "Используются ли внешние сервисы?", answer: "Нет. Всё хранится локально." },
  { question: "Инструмент бесплатен?", answer: "Да, полностью бесплатно." },
];

const schemas = [
  createWebApplicationSchema({ name: "Чем заняться", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Чем заняться", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/what-to-do", ru: PATH },
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

const whoOptions = [
  { key: "alone", label: "В одиночку" },
  { key: "couple", label: "Вдвоём" },
  { key: "friends", label: "С друзьями" },
  { key: "family", label: "С семьёй" },
];

const whereOptions = [
  { key: "indoor", label: "Дома" },
  { key: "outdoor", label: "На улице" },
  { key: "anywhere", label: "Где угодно" },
];

const budgetOptions = [
  { key: "free", label: "Бесплатно" },
  { key: "low", label: "Недорого" },
  { key: "any", label: "Любой бюджет" },
];

const RELATED = funToolsRu.filter((t) => ["sluchaynoe-zadanie", "ideya-dnya", "chto-posmotret", "chto-poest"].includes(t.id));

export default function ChemZanyatsyaPage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<CompassPinIcon className="h-6 w-6" />}
        title="Чем заняться?"
        description="Найди занятие прямо сейчас. Выбери, с кем ты, где и какой у тебя бюджет."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Чем заняться?" },
        ]}
      >
        <JsonLd data={schemas} />
        <ActivityGenerator
          activities={activitiesRU}
          whoOptions={whoOptions}
          whereOptions={whereOptions}
          budgetOptions={budgetOptions}
          labels={{
            generate: "Найти занятие",
            generateAnother: "Ещё вариант",
            result: "Попробуй вот это",
            noMatch: "Подходящего варианта не нашлось. Ослабь один из фильтров.",
            who: "С кем?",
            where: "Дома или на улице?",
            budget: "Бюджет?",
          }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как использовать</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Выбери, с кем проводишь время.</li>
              <li>2. Выбери место: дома, на улице или где угодно.</li>
              <li>3. Выбери бюджет.</li>
              <li>4. Нажми «Найти занятие».</li>
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
