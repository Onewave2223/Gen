import type { Metadata } from "next";
import { HandRaisedIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { NeverHaveIEver } from "@/components/fun/NeverHaveIEver";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { neverHaveIEverRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/ya-nikogda-ne";
const TITLE = "Я никогда не... — 100+ утверждений для игры онлайн";
const DESCRIPTION =
  "Классическая игра «Я никогда не» онлайн с более чем 100 утверждениями. Категории: Общие, Смешные, Для друзей. Без регистрации.";

const faqItems = [
  { question: "Сколько утверждений в игре?", answer: "Более 100 утверждений в трёх категориях: Общие, Смешные, Для друзей." },
  { question: "Контент подходит для всех?", answer: "Да. Все утверждения безопасны и подходят для широкой аудитории." },
  { question: "Как играть в компании?", answer: "По очереди тяните карточки и признавайтесь, если это о вас. Отлично подходит для вечеринок." },
  { question: "Игра бесплатна?", answer: "Да, полностью бесплатно и без регистрации." },
];

const schemas = [
  createWebApplicationSchema({ name: "Я никогда не", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Я никогда не", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/never-have-i-ever", ru: PATH },
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

const RELATED = funToolsRu.filter((t) => ["chto-by-ty-vybral", "pravda-ili-deystvie", "to-ili-eto", "sluchaynyy-vopros"].includes(t.id));

export default function YaNikogdaNePage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<HandRaisedIcon className="h-6 w-6" />}
        title="Я никогда не..."
        description="Более 100 утверждений для классической игры. Выбирай категорию и тяни случайные карточки."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Я никогда не" },
        ]}
      >
        <JsonLd data={schemas} />
        <NeverHaveIEver statements={neverHaveIEverRU} categories={categories} labels={{ next: "Следующее утверждение", category: "Категория" }} />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как играть</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Выбери категорию: Общие, Смешные или Для друзей.</li>
              <li>2. Прочитай утверждение вслух компании.</li>
              <li>3. Кто это делал — признаётся.</li>
              <li>4. Нажми «Следующее утверждение» для продолжения.</li>
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
