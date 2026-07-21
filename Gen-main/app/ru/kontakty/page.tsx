import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { createBreadcrumbListSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/kontakty";
const TITLE = "Контакты — TryGenHub";
const DESCRIPTION =
  "Свяжитесь с TryGenHub по вопросам ошибок, предложений, конфиденциальности или делового сотрудничества.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      ru: PATH,
      en: "/contact",
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
    { name: "Контакты", path: PATH },
  ]),
];

/**
 * OWNER ACTION REQUIRED:
 * Замените заполнитель ниже реальным контактным email-адресом
 * перед публичным запуском. Не публикуйте выдуманный адрес.
 */
const HAS_REAL_CONTACT_EMAIL = false;

const CONTACT_CATEGORIES = [
  {
    title: "Сообщить об ошибке",
    description: "Что-то не работает так, как ожидается.",
  },
  {
    title: "Предложить инструмент",
    description: "Идея для нового генератора или полезного сервиса.",
  },
  {
    title: "Сообщить о неточности",
    description: "Что-то на сайте выглядит неверным или устаревшим.",
  },
  {
    title: "Вопрос о конфиденциальности",
    description: "Вопрос о политике конфиденциальности или о том, как работает инструмент.",
  },
  {
    title: "Деловое сотрудничество",
    description: "Партнёрство, пресса или другие деловые вопросы.",
  },
];

export default function KontaktyPage() {
  return (
    <>
      <RuLangSetter />
      <JsonLd data={schemas} />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Хлебные крошки">
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
              Контакты
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Контакты
          </h1>
          {HAS_REAL_CONTACT_EMAIL ? (
            <p className="max-w-xl text-base text-[var(--muted)]">
              Вы можете связаться с TryGenHub по электронной почте. Мы
              читаем все сообщения и стараемся отвечать как можно быстрее.
            </p>
          ) : (
            <p className="max-w-xl text-base text-[var(--muted)]">
              Прямой канал связи готовится и будет добавлен в ближайшее
              время. Ниже перечислено, по каким вопросам вы сможете с нами
              написать.
            </p>
          )}
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            По каким вопросам можно написать
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACT_CATEGORIES.map((category) => (
              <li
                key={category.title}
                className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {category.title}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {category.description}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm text-[var(--muted)]">
            Вы также можете ознакомиться со страницей{" "}
            <Link
              href="/ru/o-proekte"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              О проекте
            </Link>
            ,{" "}
            <Link
              href="/ru/konfidencialnost"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Политикой конфиденциальности
            </Link>{" "}
            и{" "}
            <Link
              href="/ru/usloviya"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Условиями использования
            </Link>
            .
          </p>
        </section>

        <section className="flex flex-col gap-2 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--muted)]">
            Контактная страница на английском:{" "}
            <Link
              href="/contact"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              Contact (English) →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
