import type { Metadata } from "next";
import Link from "next/link";
import { funToolsRu } from "@/data/fun-ru";
import { TOOL_ICON_MAP, SparkleIcon } from "@/components/icons/ToolIcons";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya";
const TITLE = "Развлечения онлайн — игры, вопросы и случайные идеи | TryGenHub";
const DESCRIPTION =
  "Бесплатные онлайн-развлечения: Правда или действие, Что бы ты выбрал, случайные вопросы, идеи, выбор еды и другие интерактивные инструменты.";

const schemas = [
  createWebApplicationSchema({ name: "Развлечения онлайн", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun", ru: PATH },
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
  { label: "Игры для компании", ids: ["chto-by-ty-vybral", "ya-nikogda-ne", "pravda-ili-deystvie", "to-ili-eto"] },
  { label: "Вопросы и разговоры", ids: ["sluchaynyy-vopros", "tema-dlya-razgovora"] },
  { label: "Решения и идеи", ids: ["chto-posmotret", "chto-poest", "chem-zanyatsya", "prinyat-reshenie", "ideya-dnya"] },
  { label: "Задания", ids: ["sluchaynoe-zadanie"] },
];

const faqItems = [
  { q: "Нужна ли регистрация?", a: "Нет. Все инструменты полностью бесплатны и работают без регистрации." },
  { q: "Сохраняются ли мои ответы?", a: "Нет. Всё работает прямо в браузере. Ничего не отправляется на сервер." },
  { q: "Можно ли использовать в компании?", a: "Конечно! Что бы ты выбрал, Правда или действие и Я никогда не — отличные игры для компании." },
  { q: "Есть ли английская версия?", a: "Да! Перейди в /fun для англоязычной версии всех инструментов." },
];

export default function RazvlecheniyaPage() {
  return (
    <>
      <RuLangSetter />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <JsonLd data={schemas} />

        <nav aria-label="Хлебные крошки" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li><Link href="/" className="hover:text-[var(--foreground)]">Главная (EN)</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/ru" className="hover:text-[var(--foreground)]">Русский раздел</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">Развлечения</li>
          </ol>
        </nav>

        <div className="mb-12 flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Развлечения онлайн
          </h1>
          <p className="max-w-2xl text-base text-[var(--muted)]">
            Бесплатные интерактивные игры и генераторы — Правда или действие, Что бы ты выбрал, случайные вопросы, идеи, принятие решений и многое другое. Без регистрации. Без рекламы. Работает мгновенно.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/ru/razvlecheniya/chto-by-ty-vybral" className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]">
              Что бы ты выбрал?
            </Link>
            <Link href="/fun" className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]">
              English version →
            </Link>
          </div>
        </div>

        {categories.map((cat) => {
          const tools = funToolsRu.filter((t) => cat.ids.includes(t.id));
          return (
            <section key={cat.label} className="mb-12 flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{cat.label}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => {
                  const Icon = TOOL_ICON_MAP[tool.id as keyof typeof TOOL_ICON_MAP] ?? SparkleIcon;
                  return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group flex items-start gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
                  >
                    <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-sm)] bg-[var(--background)] text-[var(--primary)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-[var(--foreground)]">{tool.name}</span>
                      <span className="text-xs text-[var(--muted)]">{tool.description}</span>
                      <span className="mt-1 text-xs font-medium text-[var(--primary)]">Попробовать →</span>
                    </span>
                  </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="mb-12 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Часто задаваемые вопросы</h2>
          {faqItems.map((item) => (
            <details key={item.q} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.q}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
            </details>
          ))}
        </section>

        <section className="flex flex-col gap-3 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Другие разделы</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/ru/instrumenty" className="text-sm text-[var(--primary)] hover:underline">Инструменты →</Link>
            <Link href="/ru/gadaniya" className="text-sm text-[var(--primary)] hover:underline">Гадания →</Link>
            <Link href="/fun" className="text-sm text-[var(--primary)] hover:underline">Fun & Random (EN) →</Link>
          </div>
        </section>
      </div>
    </>
  );
}
