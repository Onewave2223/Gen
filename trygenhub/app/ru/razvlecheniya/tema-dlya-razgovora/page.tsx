import type { Metadata } from "next";
import { ChatBubblesIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { ConversationStarter } from "@/components/fun/ConversationStarter";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { conversationStartersRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/tema-dlya-razgovora";
const TITLE = "Тема для разговора — случайные вопросы для беседы";
const DESCRIPTION =
  "Получи случайную тему или вопрос для разговора. Категории: Общие, Смешные, Творческие, Глубокие. Копируй и делись. Без регистрации.";

const faqItems = [
  { question: "Какие категории доступны?", answer: "Общие, Смешные, Творческие и Глубокие — с 20+ темами в каждой." },
  { question: "Можно ли поделиться темой?", answer: "Да. Используй кнопку «Поделиться» или «Копировать»." },
  { question: "Чем отличается от Случайного вопроса?", answer: "Тема для разговора — более широкие открытые вопросы для беседы. Случайный вопрос больше ориентирован на игры." },
  { question: "Инструмент бесплатен?", answer: "Да, полностью бесплатно." },
];

const schemas = [
  createWebApplicationSchema({ name: "Тема для разговора", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Тема для разговора", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/conversation-starter", ru: PATH },
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
  { key: "creative", label: "Творческие" },
  { key: "deep", label: "Глубокие" },
];

const RELATED = funToolsRu.filter((t) => ["sluchaynyy-vopros", "chto-by-ty-vybral", "to-ili-eto", "pravda-ili-deystvie"].includes(t.id));

export default function TemaDlyaRazgovoraPage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<ChatBubblesIcon className="h-6 w-6" />}
        title="Тема для разговора"
        description="Случайная тема или вопрос для начала разговора. Подходит для свиданий, встреч и знакомств."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Тема для разговора" },
        ]}
      >
        <JsonLd data={schemas} />
        <ConversationStarter
          starters={conversationStartersRU}
          categories={categories}
          labels={{
            next: "Следующая тема",
            copy: "Копировать",
            copied: "Скопировано!",
            share: "Поделиться",
            shareSuccess: "Ссылка скопирована!",
          }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как использовать</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Выбери подходящую категорию.</li>
              <li>2. Прочитай тему вслух или отправь собеседнику.</li>
              <li>3. Нажми «Следующая тема» для другого варианта.</li>
              <li>4. Скопируй тему кнопкой «Копировать».</li>
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
