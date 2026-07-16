import type { Metadata } from "next";
import { TwoPathsIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { WouldYouRather } from "@/components/fun/WouldYouRather";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { wouldYouRatherRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/chto-by-ty-vybral";
const TITLE = "Что бы ты выбрал? — 100+ вопросов онлайн";
const DESCRIPTION =
  "Играй в «Что бы ты выбрал» онлайн! 100+ интересных вопросов для любой компании. Выбирай и делись. Без регистрации.";

const faqItems = [
  { question: "Сколько вопросов в игре?", answer: "Более 100 уникальных вопросов для игры «Что бы ты выбрал»." },
  { question: "Игра бесплатна?", answer: "Да, полностью бесплатно. Регистрация не нужна." },
  { question: "Можно ли поделиться вопросом?", answer: "Используй кнопку «Поделиться» для отправки ссылки на страницу." },
  { question: "Подходит ли контент для разной аудитории?", answer: "Да. Все вопросы безопасны и подходят широкой аудитории." },
];

const schemas = [
  createWebApplicationSchema({ name: "Что бы ты выбрал", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Что бы ты выбрал", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/would-you-rather", ru: PATH },
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

const labels = {
  optionA: "А",
  optionB: "Б",
  next: "Следующий вопрос",
  share: "Поделиться",
  copied: "Ссылка скопирована!",
  copyLink: "Скопировать ссылку",
  question: "Что бы ты выбрал?",
};

const RELATED = funToolsRu.filter((t) => ["ya-nikogda-ne", "pravda-ili-deystvie", "to-ili-eto", "sluchaynyy-vopros"].includes(t.id));

export default function ChtoByTyVybralPage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<TwoPathsIcon className="h-6 w-6" />}
        title="Что бы ты выбрал?"
        description="Выбирай между двумя вариантами — нет правильных и неправильных ответов. Только интересные дилеммы."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Что бы ты выбрал?" },
        ]}
      >
        <JsonLd data={schemas} />
        <WouldYouRather questions={wouldYouRatherRU} labels={labels} />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как играть</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Прочитай вопрос «Что бы ты выбрал».</li>
              <li>2. Нажми на вариант А или Б.</li>
              <li>3. Нажми «Следующий вопрос» для новой дилеммы.</li>
              <li>4. Поделись любимым вопросом с друзьями.</li>
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
