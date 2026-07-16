import type { Metadata } from "next";
import { CalendarRangeIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { DateDifferenceCalculator } from "@/components/instrumenty/DateDifferenceCalculator";
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

const PATH = "/ru/instrumenty/raznitsa-mezhdu-datami";
const NAME = "Разница между датами";
const SHORT_DESCRIPTION =
  "Выберите две даты и узнайте точную разницу в днях, неделях и месяцах.";

const faqItems: FaqItem[] = [
  {
    question: "Как считается разница между датами?",
    answer:
      "Калькулятор вычисляет точное количество дней между двумя выбранными датами, а затем переводит его в недели и приблизительные месяцы.",
  },
  {
    question: "Можно ли выбрать дату из прошлого и дату из будущего?",
    answer:
      "Да, можно указать любые две даты в любом порядке — результат покажет, какая из них наступает раньше.",
  },
  {
    question: "Почему количество месяцев приблизительное?",
    answer:
      "Месяцы имеют разную длину, поэтому точный перевод дней в месяцы не всегда возможен — результат в месяцах округлён для удобства.",
  },
  {
    question: "Нужна ли регистрация для использования калькулятора?",
    answer: "Нет, инструмент полностью бесплатный и не требует регистрации.",
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
  title: `Калькулятор дней между датами`,
  description:
    "Калькулятор разницы между датами онлайн бесплатно. Узнайте количество дней, недель и месяцев между двумя датами.",
  alternates: {
    canonical: PATH,
    languages: { en: "/calculators/date-difference", ru: PATH },
  },
  openGraph: {
    title: "Калькулятор дней между датами",
    description:
      "Узнайте количество дней, недель и месяцев между двумя датами.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Калькулятор дней между датами",
    description: "Узнайте разницу между двумя датами.",
  },
};

export default function RaznitsaMezhduDatamiPage() {
  return (
    <InstrumentyShell icon={<CalendarRangeIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="📅">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <DateDifferenceCalculator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как посчитать дни между датами
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите первую дату.</li>
            <li>2. Выберите вторую дату.</li>
            <li>3. Нажмите «Рассчитать».</li>
            <li>
              4. Посмотрите разницу в днях, неделях и приблизительных
              месяцах.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Когда полезен этот калькулятор
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Калькулятор разницы между датами пригодится для расчёта
            сроков проекта, отпуска, беременности, годовщины или
            любого другого события, когда важно точно знать, сколько
            дней или недель отделяет одну дату от другой.
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

        <OtherInstrumenty currentId="raznitsa-mezhdu-datami" />
      </div>
    </InstrumentyShell>
  );
}
