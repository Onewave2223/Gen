import type { Metadata } from "next";
import { CaseToggleIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { CaseConverterRu } from "@/components/instrumenty/CaseConverterRu";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/instrumenty/registr-teksta";
const NAME = "Конвертер регистра текста";
const SHORT_DESCRIPTION =
  "Пять режимов: ВЕРХНИЙ, нижний, Каждое Слово, Предложение и чЕРЕДУЮЩИЙСЯ регистр. Текст не покидает браузер.";

const faqItems: FaqItem[] = [
  {
    question: "Поддерживается ли кириллица?",
    answer:
      "Да, конвертер регистра корректно работает с русскими и украинскими буквами, а также с латиницей.",
  },
  {
    question: "Что такое режим «Каждое слово»?",
    answer:
      "В этом режиме первая буква каждого слова становится заглавной, остальные — строчными. Удобно для заголовков.",
  },
  {
    question: "Мой текст сохраняется?",
    answer:
      "Нет, преобразование выполняется локально в браузере — никакие данные не отправляются и не сохраняются.",
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
  title: `${NAME} онлайн`,
  description:
    "Конвертер регистра текста онлайн: ВЕРХНИЙ, нижний, Каждое Слово, предложение и чередующийся регистр. Поддержка кириллицы. Бесплатно.",
  alternates: {
    canonical: PATH,
    languages: { en: "/tools/case-converter", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Меняйте регистр текста в один клик. Поддержка кириллицы.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function RegistrTekstaPage() {
  return (
    <InstrumentyShell icon={<CaseToggleIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🔡">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <CaseConverterRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как изменить регистр текста
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите или вставьте текст в верхнее поле.</li>
            <li>2. Выберите нужный режим кнопками над полем.</li>
            <li>3. Результат появится в нижнем поле автоматически.</li>
            <li>4. Нажмите «Копировать» или «Очистить» по необходимости.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Частые вопросы</h2>
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <OtherInstrumenty currentId="registr-teksta" />
      </div>
    </InstrumentyShell>
  );
}
