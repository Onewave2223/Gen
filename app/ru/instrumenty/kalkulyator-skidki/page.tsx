import type { Metadata } from "next";
import { TagPercentIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { DiscountCalculatorRu } from "@/components/instrumenty/DiscountCalculatorRu";
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

const PATH = "/ru/instrumenty/kalkulyator-skidki";
const NAME = "Калькулятор скидки";
const SHORT_DESCRIPTION =
  "Введите исходную цену и процент скидки, чтобы узнать цену со скидкой, сумму экономии и итог с учётом налога.";

const faqItems: FaqItem[] = [
  {
    question: "Как рассчитывается скидка?",
    answer:
      "Сумма скидки — это исходная цена, умноженная на процент скидки и делённая на 100. Цена со скидкой получается вычитанием этой суммы из исходной цены.",
  },
  {
    question: "Налог применяется до или после скидки?",
    answer:
      "Налог рассчитывается от цены после применения скидки — это соответствует тому, как обычно считают налог на распродажах.",
  },
  {
    question: "Можно ли посчитать несколько скидок подряд?",
    answer:
      "Калькулятор рассчитывает одну скидку за раз. Для нескольких скидок подряд посчитайте первую, а затем используйте полученную цену как новую исходную для второй скидки.",
  },
  {
    question: "Сохраняются ли введённые данные?",
    answer:
      "Нет, все расчёты происходят локально в браузере — данные никуда не отправляются и не сохраняются.",
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
  title: `${NAME} онлайн — рассчитать цену со скидкой`,
  description:
    "Калькулятор скидки онлайн бесплатно. Узнайте цену со скидкой, сумму экономии и итоговую цену с учётом налога.",
  alternates: {
    canonical: PATH,
    languages: { en: "/calculators/discount-calculator", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Рассчитайте цену со скидкой и сумму экономии за секунды.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${NAME} онлайн`,
    description: "Рассчитайте цену со скидкой.",
  },
};

export default function KalkulyatorSkidkiPage() {
  return (
    <InstrumentyShell icon={<TagPercentIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🏷️">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <DiscountCalculatorRu />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как рассчитать скидку онлайн
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите исходную цену товара.</li>
            <li>2. Введите процент скидки.</li>
            <li>3. При необходимости укажите процент налога.</li>
            <li>4. Нажмите «Рассчитать» — получите цену со скидкой, экономию и итог.</li>
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

        <OtherInstrumenty currentId="kalkulyator-skidki" />
      </div>
    </InstrumentyShell>
  );
}
