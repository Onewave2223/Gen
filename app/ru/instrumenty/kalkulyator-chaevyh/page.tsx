import type { Metadata } from "next";
import { ReceiptCoinIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { TipCalculatorRu } from "@/components/instrumenty/TipCalculatorRu";
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

const PATH = "/ru/instrumenty/kalkulyator-chaevyh";
const NAME = "Калькулятор чаевых";
const SHORT_DESCRIPTION =
  "Введите сумму счёта, выберите процент чаевых и количество человек — получите точную сумму на каждого.";

const faqItems: FaqItem[] = [
  {
    question: "Сколько принято оставлять чаевых?",
    answer:
      "В России стандарт — 10–15% от суммы счёта в ресторане. В кафе и при заказе на вынос размер чаевых остаётся на усмотрение гостя.",
  },
  {
    question: "Можно ли ввести свой процент чаевых?",
    answer:
      "Да, нажмите кнопку «Другой» и введите любой процент в появившееся поле ввода.",
  },
  {
    question: "Как разделить счёт на несколько человек?",
    answer:
      "Введите количество человек в соответствующем поле — калькулятор автоматически покажет сумму на каждого, включая чаевые.",
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
    "Калькулятор чаевых онлайн: быстро рассчитайте сумму чаевых и итоговый счёт на несколько человек. Бесплатно, без регистрации.",
  alternates: {
    canonical: PATH,
    languages: { en: "/calculators/tip-calculator", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Рассчитайте чаевые и разделите счёт на несколько человек.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function KalkulyatorChaevyhPage() {
  return (
    <InstrumentyShell icon={<ReceiptCoinIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="💰">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <TipCalculatorRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как пользоваться калькулятором чаевых
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите итоговую сумму счёта.</li>
            <li>2. Выберите процент чаевых или введите свой.</li>
            <li>3. Укажите, на сколько человек нужно разделить счёт.</li>
            <li>4. Все суммы пересчитываются автоматически в режиме реального времени.</li>
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

        <OtherInstrumenty currentId="kalkulyator-chaevyh" />
      </div>
    </InstrumentyShell>
  );
}
