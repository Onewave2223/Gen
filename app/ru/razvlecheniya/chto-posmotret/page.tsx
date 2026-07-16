import type { Metadata } from "next";
import { ClapperIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { MovieNightPicker } from "@/components/fun/MovieNightPicker";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { funToolsRu } from "@/data/fun-ru";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";

const PATH = "/ru/razvlecheniya/chto-posmotret";
const TITLE = "Что посмотреть? — случайный выбор фильма по настроению";
const DESCRIPTION =
  "Не знаешь, что посмотреть? Выбери настроение и с кем смотришь — получи случайный жанр и эпоху. Без API. Бесплатно.";

const faqItems = [
  { question: "Инструмент рекомендует конкретные фильмы?", answer: "Нет. Он предлагает жанр и эпоху — чтобы сузить выбор без использования баз данных фильмов." },
  { question: "Используется ли внешний API?", answer: "Нет. Всё работает локально." },
  { question: "Как это работает?", answer: "Выбираешь настроение и аудиторию. Инструмент случайно выбирает подходящий жанр и эпоху." },
  { question: "Инструмент бесплатен?", answer: "Да, полностью бесплатно." },
];

const schemas = [
  createWebApplicationSchema({ name: "Что посмотреть", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Развлечения", path: "/ru/razvlecheniya" },
    { name: "Что посмотреть", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: "/fun/movie-night-picker", ru: PATH },
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

const genres = ["Боевик", "Комедия", "Драма", "Ужасы", "Триллер", "Фантастика", "Мелодрама", "Анимация", "Документальный", "Фэнтези", "Приключения", "Детектив"];
const eras = ["Классика (до 1980-х)", "80-е и 90-е", "2000-е", "Новинки (2010–2020-е)"];

const moods = [
  { key: "fun", label: "Весёлое", genres: ["Комедия", "Анимация", "Приключения", "Фэнтези"] },
  { key: "relaxing", label: "Спокойное", genres: ["Мелодрама", "Драма", "Документальный"] },
  { key: "exciting", label: "Захватывающее", genres: ["Боевик", "Триллер", "Фантастика", "Детектив"] },
  { key: "emotional", label: "Трогательное", genres: ["Драма", "Мелодрама", "Документальный"] },
  { key: "any", label: "Любое", genres },
];

const audiences = [
  { key: "solo", label: "В одиночку" },
  { key: "couple", label: "Вдвоём" },
  { key: "friends", label: "С друзьями" },
  { key: "family", label: "Всей семьёй" },
];

const RELATED = funToolsRu.filter((t) => ["chto-poest", "chem-zanyatsya", "prinyat-reshenie", "ideya-dnya"].includes(t.id));

export default function ChtoPosmotretPage() {
  return (
    <>
      <RuLangSetter />
      <FunShell icon={<ClapperIcon className="h-6 w-6" />}
        title="Что посмотреть?"
        description="Выбери настроение и с кем смотришь — получи случайный жанр и эпоху для вечернего просмотра."
        breadcrumbs={[
          { label: "Главная (EN)", href: "/" },
          { label: "Русский раздел", href: "/ru" },
          { label: "Развлечения", href: "/ru/razvlecheniya" },
          { label: "Что посмотреть?" },
        ]}
      >
        <JsonLd data={schemas} />
        <MovieNightPicker
          genres={genres}
          eras={eras}
          moods={moods}
          audiences={audiences}
          labels={{
            pick: "Что посмотреть?",
            pickAnother: "Ещё вариант",
            genre: "Жанр",
            era: "Эпоха",
            mood: "Настроение",
            audience: "Смотрю с",
            result: "Предложение на вечер",
          }}
        />

        <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Как использовать</h2>
            <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <li>1. Выбери настроение.</li>
              <li>2. Выбери, с кем смотришь.</li>
              <li>3. Нажми «Что посмотреть?» для получения жанра и эпохи.</li>
              <li>4. Найди подходящий фильм на своей стриминговой платформе.</li>
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
