import type { Metadata } from "next";
import { LightbulbIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { DailyIdea } from "@/components/fun/DailyIdea";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { dailyIdeasRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/ideya-dnya";
const TITLE = "Идея дня — одна свежая идея каждый день";
const DESCRIPTION =
  "Получай одну свежую идею каждый день. Идея меняется каждый календарный день. Плюс кнопка для случайной дополнительной идеи. Без API, без регистрации.";

const faqItems = [
  { question: "Идея действительно меняется каждый день?", answer: "Да. Идея определяется текущей датой в твоём браузере — без сервера. Одна и та же для всех в один день." },
  { question: "Можно получить другую идею помимо дневной?", answer: "Да! Используй кнопку «Ещё идея» для случайной дополнительной идеи." },
  { question: "Сохраняются ли данные?", answer: "Нет. Дата берётся из браузера. Ничего никуда не отправляется." },
  { question: "Сколько идей в базе?", answer: "Более 100 идей — достаточно для разнообразия на весь год." },
];

const schemas = [
  createWebApplicationSchema({ name: "Идея дня", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Идея дня", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/daily-idea", ru: PATH },
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

const RELATED = funToolsRu.filter((t) => ["sluchaynoe-zadanie", "chem-zanyatsya", "tema-dlya-razgovora", "prinyat-reshenie"].includes(t.id));

export default function IdeaDnyaPage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<LightbulbIcon className="h-6 w-6" />}
        title="Идея дня"
        description="Одна свежая идея на сегодня. Завтра будет новая. Плюс дополнительная случайная идея в любой момент."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Идея дня" },
        ]}
      >
        <JsonLd data={schemas} />
        <DailyIdea
          ideas={dailyIdeasRU}
          labels={{
            todayIdea: "Идея дня",
            randomIdea: "Дополнительная идея",
            getAnother: "Ещё идея",
            refreshed: "Вот ещё одна",
          }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как это работает</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Открой страницу — идея дня одинакова для всех в один календарный день.</li>
              <li>2. Возвращайся завтра за новой идеей.</li>
              <li>3. Нажми «Ещё идея» для дополнительной случайной идеи в любое время.</li>
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
