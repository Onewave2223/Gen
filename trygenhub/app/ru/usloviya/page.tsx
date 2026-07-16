import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { createBreadcrumbListSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/usloviya";
const TITLE = "Условия использования — TryGenHub";
const DESCRIPTION =
  "Условия использования TryGenHub. Правила использования бесплатных онлайн-инструментов, генераторов, калькуляторов и развлекательных функций.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      ru: PATH,
      en: "/terms",
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
    { name: "Условия использования", path: PATH },
  ]),
];

export default function UsloviyaPage() {
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
              Условия использования
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Условия использования
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Последнее обновление: июль 2026 г.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Эти условия применяются при использовании TryGenHub. Они написаны
            простым языком и не являются заменой индивидуальной юридической
            консультации.
          </p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            1. Принятие условий
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Используя TryGenHub, вы соглашаетесь с этими условиями. Если вы не
            согласны — пожалуйста, не используйте сайт.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            2. Описание сервиса
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub предоставляет бесплатные онлайн-инструменты, работающие
            в браузере: генераторы, текстовые утилиты, калькуляторы и
            развлекательные функции, включая развлекательные гадания. Для
            использования большинства инструментов регистрация не требуется.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            3. Допустимое использование
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Вы соглашаетесь использовать TryGenHub только в законных целях.
            Запрещено нарушать работу сайта, обходить меры безопасности или
            использовать его способами, которые могут нанести вред другим
            пользователям или самому сервису.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            4. Результаты генераторов
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Результаты, созданные инструментами TryGenHub — числа, пароли,
            цвета, даты, никнеймы, названия компаний и доменов — предоставляются
            для самостоятельной оценки. Вы несёте ответственность за то,
            подходит ли конкретный результат для ваших целей.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            5. Отсутствие гарантий доступности
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub не гарантирует бесперебойную работу сайта и отдельных
            инструментов. Например, сгенерированные доменные имена и никнеймы
            являются идеями — TryGenHub не проверяет их реальную доступность
            для регистрации.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            6. Генератор паролей и безопасность
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Генератор паролей предназначен для создания надёжных случайных
            паролей. Он работает в браузере с использованием Web Crypto API
            и не отправляет пароли на серверы. Вы несёте ответственность за
            хранение и использование сгенерированных паролей. TryGenHub не
            хранит и не может восстановить созданные пароли.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            7. Калькуляторы — не медицинская консультация
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Калькуляторы, такие как калькулятор ИМТ и калькулятор возраста,
            предоставляют только общую информацию. Результаты <strong>не
            являются медицинской консультацией</strong>, диагнозом или заменой
            обращения к квалифицированному врачу. Перед принятием решений на
            основе этих данных всегда консультируйтесь со специалистом.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            8. Гадания — только для развлечения
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Гадания, карточные расклады, шар судьбы и аналогичные функции
            предназначены <strong>исключительно для развлечения и
            саморефлексии</strong>. Их результаты генерируются случайно и не
            имеют предсказательной, духовной или фактической основы. Не
            принимайте важных личных, финансовых, медицинских или юридических
            решений на основе этих результатов.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            9. Интеллектуальная собственность
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Название TryGenHub, брендинг и оригинальный контент сайта
            принадлежат TryGenHub. Результаты инструментов — сгенерированные
            пароли, числа, имена — случайны и не являются объектами
            интеллектуальной собственности TryGenHub.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            10. Сторонние сервисы
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub использует сторонние сервисы: Vercel (хостинг) и,
            при наличии согласия, Google Analytics (аналитика). Использование
            TryGenHub регулируется также условиями этих сервисов.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            11. Отказ от гарантий
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub и его инструменты предоставляются &laquo;как есть&raquo;
            без каких-либо гарантий в той мере, в какой это допустимо
            применимым законодательством.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            12. Ограничение ответственности
          </h2>
          <p className="text-sm text-[var(--muted)]">
            В той мере, в которой это допускается применимым законодательством,
            TryGenHub не несёт ответственности за косвенный или случайный
            ущерб, возникший в результате использования сайта или его
            инструментов.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            13. Изменения условий
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Условия могут обновляться. Дата &laquo;Последнего обновления&raquo;
            в начале страницы отражает последнюю редакцию. Продолжение
            использования сайта означает принятие новых условий.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            14. Контакты
          </h2>
          <p className="text-sm text-[var(--muted)]">
            По вопросам, связанным с этими условиями, используйте{" "}
            <Link
              href="/ru/kontakty"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              страницу контактов
            </Link>
            .
          </p>
        </section>

        <section className="flex flex-col gap-2 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--muted)]">
            Условия на английском:{" "}
            <Link
              href="/terms"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              Terms of Use (English) →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
