import type { Metadata } from "next";
import { ForkPathIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { DecisionMaker } from "@/components/fun/DecisionMaker";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/prinyat-reshenie";
const TITLE = "Принять решение — случайный выбор из вариантов";
const DESCRIPTION =
  "Не можешь выбрать? Введи варианты — инструмент случайно выберет один. Исключи результат и выбери снова. Данные не сохраняются. Бесплатно.";

const faqItems = [
  { question: "Сохраняются ли мои данные?", answer: "Нет. Все варианты и результаты хранятся только в памяти браузера. На сервер ничего не отправляется." },
  { question: "Сколько вариантов можно добавить?", answer: "Сколько угодно. Чем больше вариантов, тем лучше." },
  { question: "Можно исключить результат и выбрать снова?", answer: "Да! После выбора используй кнопку «Исключить» чтобы убрать текущий результат и выбрать из оставшихся." },
  { question: "Есть ли анимация?", answer: "Да — небольшая анимация воспроизводится во время принятия решения." },
];

const schemas = [
  createWebApplicationSchema({ name: "Принять решение", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Принять решение", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/decision-maker", ru: PATH },
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

const RELATED = funToolsRu.filter((t) => ["sluchaynoe-zadanie", "chem-zanyatsya", "chto-posmotret", "ideya-dnya"].includes(t.id));

export default function PrinyatResheniyePage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<ForkPathIcon className="h-6 w-6" />}
        title="Принять решение"
        description="Не можешь выбрать? Введи варианты и пусть инструмент решит за тебя. Данные нигде не сохраняются."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Принять решение" },
        ]}
      >
        <JsonLd data={schemas} />
        <DecisionMaker
          labels={{
            placeholder: "Введи вариант и нажми Enter",
            add: "Добавить",
            decide: "Решить за меня",
            again: "Выбрать снова",
            exclude: "Исключить и выбрать снова",
            result: "Решение принято...",
            history: "Предыдущие результаты",
            enterOptions: "Введи хотя бы 2 варианта",
            needMore: "Добавь ещё один вариант",
          }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как использовать</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Введи каждый вариант и нажми Enter или «Добавить».</li>
              <li>2. Добавь минимум 2 варианта.</li>
              <li>3. Нажми «Решить за меня» для случайного выбора.</li>
              <li>4. Нажми «Выбрать снова» или «Исключить», чтобы изменить результат.</li>
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
