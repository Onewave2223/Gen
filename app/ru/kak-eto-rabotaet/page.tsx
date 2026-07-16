import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { createBreadcrumbListSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/kak-eto-rabotaet";
const TITLE = "Как это работает — TryGenHub";
const DESCRIPTION =
  "Узнайте, как работают генераторы TryGenHub и тест на IQ, как защищена ваша конфиденциальность и почему регистрация не требуется.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      ru: PATH,
      en: "/how-it-works",
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
    { name: "Как это работает", path: PATH },
  ]),
];

export default function KakEtoRabotaetPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <RuLangSetter />
      <JsonLd data={schemas} />

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Как это работает
        </h1>
        <p className="max-w-xl text-base text-[var(--muted)]">
          TryGenHub построен на простой идее: открыть инструмент,
          воспользоваться им мгновенно и получить реальный результат —
          без аккаунтов, ожидания и лишних действий. Вот что происходит
          «под капотом».
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Как работают генераторы
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Каждый генератор — случайных чисел, паролей, имён, цветов, дат
          и других значений — выполняет логику прямо в вашем браузере на
          JavaScript. При нажатии «Сгенерировать» инструмент мгновенно
          вычисляет новый результат, используя стандартные методы
          случайного выбора, подходящие для повседневных задач: игр,
          выбора имён и принятия решений.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Поскольку генерация происходит в браузере, результат
          появляется сразу же, без необходимости что-либо загружать на
          сервер.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Как работает тест на IQ
        </h2>
        <p className="text-sm text-[var(--muted)]">
          <Link
            href="/ru/test-na-iq"
            className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]"
          >
            Тест на IQ
          </Link>{" "}
          предлагает серию вопросов на логику, паттерны и
          пространственное мышление. После ответа на последний вопрос
          результат рассчитывается мгновенно — без ожидания и без
          регистрации.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Тест создан для развлечения и самопроверки. Это не клинически
          валидированный психометрический инструмент, и его не следует
          считать официальной или диагностической оценкой IQ.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Конфиденциальность
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Многие инструменты полностью обрабатывают введённые данные на
          вашем устройстве и не отправляют их на сервер TryGenHub.
          Аналитика загружается только после вашего согласия в баннере
          cookie, и это решение можно изменить в любой момент через
          подвал сайта. Подробности — в{" "}
          <Link
            href="/ru/konfidencialnost"
            className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]"
          >
            Политике конфиденциальности
          </Link>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Регистрация не требуется
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Вам никогда не нужно создавать аккаунт, входить в систему или
          указывать email, чтобы пользоваться инструментами TryGenHub.
          Просто откройте страницу и начните пользоваться.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Мгновенный результат
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Поскольку большая часть вычислений происходит локально, между
          вами и результатом нет обращения к серверу — нажмите кнопку и
          сразу увидите результат.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Поддержка мобильных устройств
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub полностью адаптивен и удобно работает на телефонах,
          планшетах и в браузерах компьютеров — без установки приложений.
        </p>
      </section>
    </div>
  );
}
