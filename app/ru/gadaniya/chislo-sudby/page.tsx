import type { Metadata } from "next";
import { PathNumberIcon } from "@/components/icons/ToolIcons";
import { GadaniyaShell } from "@/components/gadaniya/GadaniyaShell";
import { ChisloSudby } from "@/components/gadaniya/ChisloSudby";
import { OtherGadaniya } from "@/components/gadaniya/OtherGadaniya";
import { GadaniyaDisclaimer } from "@/components/gadaniya/GadaniyaDisclaimer";
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

const PATH = "/ru/gadaniya/chislo-sudby";
const NAME = "Число судьбы";
const SHORT_DESCRIPTION =
  "Узнай своё число судьбы по дате рождения: значение, сильные стороны и особенности характера.";

const faqItems: FaqItem[] = [
  {
    question: "Как рассчитывается число судьбы?",
    answer:
      "Все цифры даты рождения складываются вместе и последовательно сводятся к одной цифре — это простая и распространённая нумерологическая система.",
  },
  {
    question: "Что такое мастер-числа 11 и 22?",
    answer:
      "Это особые числа, которые в некоторых системах нумерологии не сводятся к одной цифре и считаются более сильными по значению.",
  },
  {
    question: "Нужно ли где-то регистрироваться, чтобы узнать число судьбы?",
    answer:
      "Нет, достаточно ввести дату рождения — расчёт происходит мгновенно и полностью локально в браузере.",
  },
  {
    question: "Насколько точен этот расчёт?",
    answer:
      "Это упрощённая нумерологическая система для развлечения и самопознания, а не научный или профессиональный инструмент.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "LifestyleApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Гадания", path: "/ru/gadaniya" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Число судьбы по дате рождения онлайн",
  description:
    "Рассчитай число судьбы по дате рождения бесплатно. Узнай значение числа, сильные стороны и особенности характера. Без регистрации.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Число судьбы по дате рождения онлайн",
    description:
      "Рассчитай число судьбы по дате рождения бесплатно. Узнай значение числа, сильные стороны и особенности характера.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Число судьбы по дате рождения онлайн",
    description: "Рассчитай своё число судьбы бесплатно.",
  },
};

export default function ChisloSudbyPage() {
  return (
    <GadaniyaShell icon={<PathNumberIcon className="h-7 w-7" />} title={NAME} description={SHORT_DESCRIPTION} emoji="✨">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <ChisloSudby />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как узнать число судьбы
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите дату своего рождения.</li>
            <li>2. Нажмите «Рассчитать число судьбы».</li>
            <li>3. Изучите число, его значение, сильные стороны и особенности.</li>
            <li>4. При желании скопируйте результат себе.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Что такое число судьбы
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Число судьбы (его также называют числом жизненного пути) —
            один из базовых показателей в нумерологии. Оно
            рассчитывается из даты рождения и, по мнению сторонников
            нумерологии, отражает общие черты характера и жизненные
            темы человека.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как использовать результат
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Число судьбы стоит воспринимать как один из способов
            взглянуть на себя со стороны, а не как строгую
            характеристику. Сильные стороны и особенности,
            перечисленные в описании, — это общие тенденции, которые
            вы можете либо узнать в себе, либо нет.
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

        <GadaniyaDisclaimer />

        <OtherGadaniya currentId="chislo-sudby" />
      </div>
    </GadaniyaShell>
  );
}
