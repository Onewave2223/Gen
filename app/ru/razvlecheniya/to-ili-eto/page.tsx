import type { Metadata } from "next";
import { VersusIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { ThisOrThat } from "@/components/fun/ThisOrThat";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { thisOrThatPairsRU } from "@/data/fun-ru";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/to-ili-eto";
const TITLE = "То или это — игра «Что ты выбираешь?» онлайн";
const DESCRIPTION =
  "Играй в «То или это» онлайн! Выбирай между двумя вещами и узнавай свои предпочтения. 100+ пар. Без регистрации.";

const faqItems = [
  { question: "Сколько пар в игре?", answer: "Более 100 уникальных пар для выбора." },
  { question: "Сохраняются ли мои выборы?", answer: "Нет. Только счётчик сессии хранится в памяти браузера. Ничего не сохраняется на сервере." },
  { question: "Можно играть одному или с друзьями?", answer: "Обоими способами! Играй в одиночку или сравнивай ответы с друзьями." },
  { question: "Игра бесплатна?", answer: "Да, полностью бесплатно." },
];

const schemas = [
  createWebApplicationSchema({ name: "То или это", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "То или это", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/this-or-that", ru: PATH },
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

const RELATED = funToolsRu.filter((t) => ["chto-by-ty-vybral", "ya-nikogda-ne", "pravda-ili-deystvie", "sluchaynyy-vopros"].includes(t.id));

export default function ToIliEtoPage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<VersusIcon className="h-6 w-6" />}
        title="То или это"
        description="Выбирай предпочтение из двух вариантов. 100+ пар — узнай, что тебе нравится больше."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "То или это" },
        ]}
      >
        <JsonLd data={schemas} />
        <ThisOrThat
          pairs={thisOrThatPairsRU}
          labels={{ next: "Следующая пара", choices: "выборов", thisRound: "То или это?" }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как играть</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. На экране появляются два варианта.</li>
              <li>2. Нажми на тот, который предпочитаешь.</li>
              <li>3. Нажми «Следующая пара» для нового раунда.</li>
              <li>4. Счётчик показывает количество сделанных выборов.</li>
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
