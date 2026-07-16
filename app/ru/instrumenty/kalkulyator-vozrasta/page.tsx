import type { Metadata } from "next";
import { CakeCalendarIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { AgeCalculator } from "@/components/instrumenty/AgeCalculator";
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

const PATH = "/ru/instrumenty/kalkulyator-vozrasta";
const NAME = "Калькулятор возраста";
const SHORT_DESCRIPTION =
  "Введите дату рождения и узнайте точный возраст в годах, месяцах и днях.";

const faqItems: FaqItem[] = [
  {
    question: "Как рассчитывается возраст?",
    answer:
      "Калькулятор сравнивает дату рождения с текущей датой и вычисляет полные годы и месяцы, а также общее количество дней жизни.",
  },
  {
    question: "Учитываются ли високосные годы?",
    answer:
      "Да, расчёт использует реальные календарные даты, поэтому високосные годы учитываются автоматически.",
  },
  {
    question: "Куда отправляется моя дата рождения?",
    answer:
      "Никуда. Вся вычисления происходят локально в вашем браузере, дата рождения не передаётся на сервер.",
  },
  {
    question: "Можно ли узнать день недели своего рождения?",
    answer:
      "Да, результат включает день недели, на который пришлась указанная дата рождения.",
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
  title: `${NAME} онлайн — сколько мне лет`,
  description:
    "Калькулятор возраста онлайн бесплатно. Узнайте точный возраст в годах, месяцах и днях, дни до дня рождения и день недели рождения.",
  alternates: {
    canonical: PATH,
    languages: { en: "/calculators/age-calculator", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн — сколько мне лет`,
    description:
      "Узнайте точный возраст в годах, месяцах и днях по дате рождения.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${NAME} онлайн`,
    description: "Узнайте точный возраст по дате рождения.",
  },
};

export default function KalkulyatorVozrastaPage() {
  return (
    <InstrumentyShell icon={<CakeCalendarIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🎂">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <AgeCalculator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как рассчитать возраст онлайн
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите дату рождения в поле выше.</li>
            <li>2. Нажмите «Рассчитать возраст».</li>
            <li>
              3. Посмотрите точный возраст в годах и месяцах, количество
              дней жизни и дни до следующего дня рождения.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Зачем нужен калькулятор возраста
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Калькулятор возраста удобен, когда нужно точно узнать
            текущий возраст человека, посчитать количество дней
            жизни, спланировать праздник ко дню рождения или просто
            быстро узнать, на какой день недели вы родились.
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

        <OtherInstrumenty currentId="kalkulyator-vozrasta" />
      </div>
    </InstrumentyShell>
  );
}
