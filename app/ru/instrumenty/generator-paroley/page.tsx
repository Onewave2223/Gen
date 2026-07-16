import type { Metadata } from "next";
import { LockIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { PasswordGeneratorRu } from "@/components/instrumenty/PasswordGeneratorRu";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/instrumenty/generator-paroley";
const NAME = "Генератор паролей";
const SHORT_DESCRIPTION =
  "Создайте надёжный случайный пароль с настраиваемой длиной и набором символов.";

const faqItems: FaqItem[] = [
  {
    question: "Пароли отправляются на сервер?",
    answer:
      "Нет, пароль генерируется полностью локально в вашем браузере с помощью встроенного безопасного генератора случайных чисел и никуда не передаётся.",
  },
  {
    question: "Как выбрать длину пароля?",
    answer:
      "Используйте ползунок или поле ввода длины. Для большинства сервисов рекомендуется длина не менее 12–16 символов.",
  },
  {
    question: "Что означает индикатор сложности?",
    answer:
      "Индикатор — это приблизительная оценка сложности на основе длины пароля и количества использованных типов символов, а не гарантия защиты от конкретных атак.",
  },
  {
    question: "Зачем исключать похожие символы?",
    answer:
      "Опция «Исключить похожие символы» убирает из пароля символы, которые легко спутать при чтении или вводе вручную, например 0, O, o, 1, l и I.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "UtilitiesApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Инструменты", path: "/ru/instrumenty" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: `${NAME} онлайн — надёжные пароли`,
  description:
    "Генератор надёжных паролей онлайн бесплатно. Настройте длину и типы символов, создайте пароль локально в браузере и скопируйте его.",
  alternates: {
    canonical: PATH,
    languages: { en: "/generators/password", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн — надёжные пароли`,
    description: "Создайте надёжный случайный пароль прямо в браузере.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${NAME} онлайн`,
    description: "Создайте надёжный случайный пароль.",
  },
};

export default function GeneratorParoleyPage() {
  return (
    <InstrumentyShell icon={<LockIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🔐">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <PasswordGeneratorRu />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как создать надёжный пароль
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите длину пароля.</li>
            <li>
              2. Отметьте нужные типы символов: заглавные, строчные буквы,
              цифры, специальные символы.
            </li>
            <li>3. Нажмите «Сгенерировать».</li>
            <li>4. Скопируйте пароль кнопкой «Скопировать».</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Почему важен надёжный пароль
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Длинный случайный пароль с разными типами символов сложнее
            подобрать или взломать, чем короткое слово или простую
            комбинацию цифр. Используйте разные пароли для разных
            сервисов и храните их в надёжном менеджере паролей.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Частые вопросы
          </h2>

          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </section>

        <OtherInstrumenty currentId="generator-paroley" />
      </div>
    </InstrumentyShell>
  );
}
