import type { Metadata } from "next";
import { TrophyIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { RandomChallenge } from "@/components/fun/RandomChallenge";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { randomChallengesRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/sluchaynoe-zadanie";
const TITLE = "Случайное задание — генератор заданий онлайн";
const DESCRIPTION =
  "Получи случайное задание прямо сейчас. Категории: Весёлые, Творческие, Продуктивные, Социальные. Более 80 безопасных заданий. Без регистрации.";

const faqItems = [
  { question: "Задания безопасны?", answer: "Да. Все задания безопасны, творческие, весёлые или направлены на продуктивность." },
  { question: "Сколько заданий доступно?", answer: "Более 80 заданий в четырёх категориях." },
  { question: "Можно использовать каждый день?", answer: "Конечно! Генерируй новое задание каждый день для мотивации." },
  { question: "Используются ли внешние сервисы?", answer: "Нет. Всё хранится локально." },
];

const schemas = [
  createWebApplicationSchema({ name: "Случайное задание", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Случайное задание", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/random-challenge", ru: PATH },
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
  { key: "fun", label: "Весёлые" },
  { key: "creative", label: "Творческие" },
  { key: "productivity", label: "Продуктивные" },
  { key: "social", label: "Социальные" },
];

const RELATED = funToolsRu.filter((t) => ["ideya-dnya", "chem-zanyatsya", "sluchaynyy-vopros", "prinyat-reshenie"].includes(t.id));

export default function SluchaynoeZadaniyePage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<TrophyIcon className="h-6 w-6" />}
        title="Случайное задание"
        description="Получи весёлое, творческое или продуктивное задание прямо сейчас. Без регистрации."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Случайное задание" },
        ]}
      >
        <JsonLd data={schemas} />
        <RandomChallenge
          challenges={randomChallengesRU}
          categories={categories}
          labels={{ generate: "Получить задание", category: "Категория" }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как использовать</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Выбери категорию: Весёлые, Творческие, Продуктивные или Социальные.</li>
              <li>2. Нажми «Получить задание».</li>
              <li>3. Выполни задание и возвращайся за новым.</li>
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
