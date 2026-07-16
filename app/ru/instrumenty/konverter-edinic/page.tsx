import type { Metadata } from "next";
import { SwapRulerIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { UnitConverterRu } from "@/components/instrumenty/UnitConverterRu";
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

const PATH = "/ru/instrumenty/konverter-edinic";
const NAME = "Конвертер единиц измерения";
const SHORT_DESCRIPTION =
  "Переводите длину, вес, температуру и объём между разными единицами измерения мгновенно, прямо в браузере.";

const faqItems: FaqItem[] = [
  {
    question: "Какие категории единиц поддерживаются?",
    answer:
      "Длина (мм, см, м, км, дюймы, футы, ярды, мили), вес (мг, г, кг, унции, фунты, стоуны), температура (°C, °F, K) и объём (мл, л, галлоны, кварты, пинты, чашки, унции США).",
  },
  {
    question: "Насколько точны расчёты?",
    answer:
      "Конвертер использует стандартные международные коэффициенты перевода и показывает результат с точностью до 6 знаков после запятой.",
  },
  {
    question: "Почему температура переводится иначе, чем остальные категории?",
    answer:
      "Длина, вес и объём переводятся простым умножением, а у шкал температуры разные нулевые точки, поэтому Цельсий, Фаренгейт и Кельвин используют собственные формулы.",
  },
  {
    question: "Отправляются ли данные на сервер?",
    answer:
      "Нет, все расчёты выполняются локально в браузере с помощью JavaScript — данные никуда не передаются.",
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
  title: `${NAME} онлайн — длина, вес, температура, объём`,
  description:
    "Конвертер единиц измерения онлайн бесплатно. Переводите длину, вес, температуру и объём между метрическими и английскими единицами.",
  alternates: {
    canonical: PATH,
    languages: { en: "/tools/unit-converter", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Переводите единицы измерения мгновенно в браузере.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${NAME} онлайн`,
    description: "Переводите единицы измерения мгновенно.",
  },
};

export default function KonverterEdinicPage() {
  return (
    <InstrumentyShell icon={<SwapRulerIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="📐">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <UnitConverterRu />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как использовать конвертер единиц
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите категорию: длина, вес, температура или объём.</li>
            <li>2. Выберите исходную единицу и введите значение.</li>
            <li>3. Выберите единицу, в которую нужно перевести — результат обновится мгновенно.</li>
            <li>4. Используйте кнопку ⇄, чтобы быстро поменять направление перевода.</li>
          </ol>
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
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <OtherInstrumenty currentId="konverter-edinic" />
      </div>
    </InstrumentyShell>
  );
}
