import type { Metadata } from "next";
import { PercentIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { PercentageCalculatorRu } from "@/components/instrumenty/PercentageCalculatorRu";
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

const PATH = "/ru/instrumenty/kalkulyator-protsentov";
const NAME = "Калькулятор процентов";
const SHORT_DESCRIPTION =
  "Три режима: X% от числа, X — это сколько % от Y, и процентное изменение. Все расчёты в браузере.";

const faqItems: FaqItem[] = [
  {
    question: "Как посчитать процент от числа?",
    answer:
      "Выберите режим «X% от числа», введите процент в первое поле и число во второе — результат появится после нажатия «Рассчитать».",
  },
  {
    question: "Как узнать, сколько процентов составляет X от Y?",
    answer:
      "Выберите режим «X — это сколько % от Y», введите X и Y, нажмите «Рассчитать» — получите ответ в процентах.",
  },
  {
    question: "Как посчитать процентное изменение?",
    answer:
      "Выберите режим «Процентное изменение», введите начальное и конечное значение — калькулятор покажет изменение в процентах со знаком + или −.",
  },
  {
    question: "Данные отправляются куда-то?",
    answer:
      "Нет, все расчёты выполняются локально в браузере без обращения к внешним серверам.",
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
  title: `${NAME} онлайн бесплатно`,
  description:
    "Калькулятор процентов онлайн: посчитайте X% от числа, узнайте долю в процентах или рассчитайте процентное изменение. Бесплатно, без регистрации.",
  alternates: {
    canonical: PATH,
    languages: { en: "/calculators/percentage-calculator", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Считайте проценты в три режима: % от числа, доля в % и изменение.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function KalkulyatorProtsentovPage() {
  return (
    <InstrumentyShell icon={<PercentIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="📊">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <PercentageCalculatorRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как пользоваться калькулятором процентов
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Выберите нужный режим с помощью кнопок вверху.</li>
            <li>2. Введите два числа в поля ввода.</li>
            <li>3. Нажмите «Рассчитать» — результат появится сразу.</li>
            <li>4. Нажмите «Сбросить», чтобы начать новый расчёт.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Когда пригодится калькулятор процентов
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Инструмент удобен при расчёте скидки в магазине, вычислении НДС,
            определении доли прибыли или убытка, подсчёте процентов по кредиту
            и любых других повседневных задачах, связанных с процентами.
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

        <OtherInstrumenty currentId="kalkulyator-protsentov" />
      </div>
    </InstrumentyShell>
  );
}
