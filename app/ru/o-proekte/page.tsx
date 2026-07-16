import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { createBreadcrumbListSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { gadaniyaTools } from "@/data/gadaniya";
import { instrumentyTools } from "@/data/instrumenty";
import { funToolsRu } from "@/data/fun-ru";

const PATH = "/ru/o-proekte";
const TITLE = "О проекте TryGenHub";
const DESCRIPTION =
  "TryGenHub — бесплатные онлайн-инструменты, генераторы, калькуляторы и развлекательные функции. Работают в браузере, без регистрации.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      ru: PATH,
      en: "/about",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
};

const schemas = [
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "О проекте", path: PATH },
  ]),
];

const CATEGORIES = [
  {
    name: "Онлайн-инструменты",
    href: "/ru/instrumenty",
    count: instrumentyTools.length,
    description:
      "Калькуляторы, генераторы, текстовые инструменты — для практических повседневных задач.",
  },
  {
    name: "Гадания",
    href: "/ru/gadaniya",
    count: gadaniyaTools.length,
    description:
      "Развлекательные гадания: да или нет, карта дня, шар судьбы и другие.",
  },
  {
    name: "Развлечения",
    href: "/ru/razvlecheniya",
    count: funToolsRu.length,
    description:
      "Игры и активности для компании: правда или действие, случайные вопросы и многое другое.",
  },
];

export default function OProektePage() {
  return (
    <>
      <RuLangSetter />
      <JsonLd data={schemas} />
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--foreground)]">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/ru" className="hover:text-[var(--foreground)]">
                Русский раздел
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              О проекте
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            О проекте TryGenHub
          </h1>
          <p className="max-w-xl text-base text-[var(--muted)]">
            TryGenHub — это бесплатный сервис онлайн-инструментов, генераторов,
            калькуляторов и развлекательных функций. Всё работает прямо в
            браузере, без установки программ и без регистрации.
          </p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Что такое TryGenHub
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub — это коллекция простых и удобных инструментов для
            разных задач: от генерации случайных чисел и паролей до
            калькулятора возраста и гаданий для развлечения.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Сайт постоянно пополняется новыми инструментами. Большинство из
            них работают локально в вашем браузере — это значит, что введённые
            данные не отправляются на сторонние серверы.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Разделы русского раздела
          </h2>
          <ul className="flex flex-col gap-3">
            {CATEGORIES.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {cat.name}{" "}
                    <span className="text-[var(--muted)]">
                      ({cat.count} инструментов)
                    </span>
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    {cat.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Наш подход
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Без регистрации
              </span>{" "}
              — все инструменты доступны без создания аккаунта.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Локальная обработка
              </span>{" "}
              — большинство инструментов работают прямо в вашем браузере.
              Введённые данные не передаются на сервер.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Честность
              </span>{" "}
              — если у инструмента есть ограничения, они прямо указаны на его
              странице. Например, генератор никнеймов не проверяет их
              доступность на конкретных платформах.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Конфиденциальность
              </span>{" "}
              — аналитика (Google Analytics) загружается только с вашего явного
              согласия через баннер при первом посещении.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Развитие
              </span>{" "}
              — сайт регулярно получает новые инструменты и улучшения.
            </li>
          </ul>
        </section>

        <section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm text-[var(--muted)]">
            Нашли ошибку или хотите предложить новый инструмент? Перейдите на
            страницу{" "}
            <Link
              href="/ru/kontakty"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Контакты
            </Link>
            .
          </p>
        </section>

        <section className="flex flex-col gap-2 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--muted)]">
            Предпочитаете английский интерфейс?{" "}
            <Link
              href="/about"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              About TryGenHub (English) →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
