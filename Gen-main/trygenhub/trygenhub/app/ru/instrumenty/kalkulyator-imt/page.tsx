import type { Metadata } from "next";
import { ScaleBodyIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { BmiCalculatorRu } from "@/components/instrumenty/BmiCalculatorRu";
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

const PATH = "/ru/instrumenty/kalkulyator-imt";
const NAME = "Калькулятор ИМТ";
const SHORT_DESCRIPTION =
  "Рассчитайте индекс массы тела по росту и весу. Метрическая и английская системы. Только для информации.";

const faqItems: FaqItem[] = [
  {
    question: "Что такое ИМТ?",
    answer:
      "ИМТ (индекс массы тела) — это число, которое рассчитывается по формуле: вес (кг) делить на рост (м) в квадрате. Используется как ориентировочный показатель соотношения веса и роста.",
  },
  {
    question: "Что означают категории ИМТ?",
    answer:
      "ВОЗ выделяет следующие диапазоны: дефицит массы тела — до 18,5; норма — 18,5–24,9; избыточный вес — 25–29,9; ожирение I степени — 30–34,9; II — 35–39,9; III — от 40.",
  },
  {
    question: "Насколько точен результат?",
    answer:
      "ИМТ — ориентировочный показатель, который не учитывает мышечную массу, возраст, пол и другие факторы. Для точной оценки здоровья обратитесь к врачу.",
  },
  {
    question: "Данные отправляются на сервер?",
    answer:
      "Нет, расчёт ИМТ выполняется полностью в браузере без передачи данных на сервер.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "HealthApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Инструменты", path: "/ru/instrumenty" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: `${NAME} онлайн — индекс массы тела`,
  description:
    "Калькулятор ИМТ онлайн: рассчитайте индекс массы тела по росту и весу в метрической или английской системе. Только для информационных целей.",
  alternates: {
    canonical: PATH,
    languages: { en: "/calculators/bmi-calculator", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Рассчитайте индекс массы тела бесплатно и быстро.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function KalkulyatorImtPage() {
  return (
    <InstrumentyShell icon={<ScaleBodyIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="⚖️">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <BmiCalculatorRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как рассчитать ИМТ
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите систему единиц: метрическую (кг/см) или английскую (фунты/футы).</li>
            <li>2. Введите свой рост и вес.</li>
            <li>3. Нажмите «Рассчитать ИМТ» — результат с категорией появится сразу.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Формула расчёта ИМТ
          </h2>
          <p className="text-sm text-[var(--muted)]">
            ИМТ = вес (кг) ÷ рост² (м). Например, при весе 70 кг и росте
            175 см: ИМТ = 70 ÷ (1,75 × 1,75) = 22,86 — норма.
          </p>
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

        <OtherInstrumenty currentId="kalkulyator-imt" />
      </div>
    </InstrumentyShell>
  );
}
