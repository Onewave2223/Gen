import type { Metadata } from "next";
import { GadaniyaShell } from "@/components/gadaniya/GadaniyaShell";
import { ChtoZhdetSegodnya } from "@/components/gadaniya/ChtoZhdetSegodnya";
import { SunburstIcon } from "@/components/icons/ToolIcons";
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
import Link from "next/link";

const PATH = "/ru/gadaniya/chto-zhdet-tebya-segodnya";
const NAME = "Что ждёт тебя сегодня?";
const SHORT_DESCRIPTION =
  "Кинематографичное предсказание дня: энергия, символ, число, цвет, фокус и послание дня — одинаковые для всех сегодня и новые завтра.";

const faqItems: FaqItem[] = [
  {
    question: "Как формируется предсказание дня?",
    answer:
      "Оно рассчитывается детерминированно на основе сегодняшней календарной даты — все, кто открывает страницу сегодня, видят одно и то же предсказание, а завтра оно автоматически меняется. Личные данные не используются.",
  },
  {
    question: "Изменится ли предсказание, если обновить страницу?",
    answer:
      "Нет. Предсказание фиксировано на весь календарный день, поэтому обновление страницы или повторный визит сегодня покажет тот же результат. Загляни завтра за новым.",
  },
  {
    question: "Что такое счастливый момент?",
    answer:
      "Это дополнительное поле — примерный промежуток времени, когда стоит быть немного внимательнее или открытее. Его можно открыть отдельно после основного предсказания.",
  },
  {
    question: "Собираются ли какие-то данные обо мне?",
    answer:
      "Нет. Предсказание зависит только от сегодняшней даты и полностью рассчитывается в браузере. Ничего личного на сервер не отправляется.",
  },
  {
    question: "Это реальное предсказание будущего?",
    answer:
      "Нет — это повод для размышления в развлекательных целях, а не прогноз. Воспринимай его как настрой на день, а не гарантию событий.",
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
  title: "Что ждёт тебя сегодня — бесплатное предсказание дня",
  description:
    "Бесплатное предсказание дня: энергия, символ, число, цвет, фокус и послание дня. Одно на весь день, новое каждый день. Без регистрации.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Что ждёт тебя сегодня — бесплатное предсказание дня",
    description:
      "Кинематографичное предсказание дня: энергия, символ, число, цвет, фокус и послание дня.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Что ждёт тебя сегодня — бесплатное предсказание дня",
    description: "Энергия, символ, число, цвет, фокус и послание дня.",
  },
};

export default function ChtoZhdetSegodnyaPage() {
  return (
    <GadaniyaShell title={NAME} description={SHORT_DESCRIPTION} icon={<SunburstIcon className="h-7 w-7" />}>
      <RuLangSetter />
      <JsonLd data={schemas} />
      <ChtoZhdetSegodnya />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как пользоваться предсказанием дня
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Нажми «Узнать день».</li>
            <li>2. Дождись короткой анимации, пока раскрываются части предсказания.</li>
            <li>3. Прочитай энергию, символ, число, цвет, фокус и послание дня.</li>
            <li>4. При желании открой счастливый момент, затем скопируй или отправь результат.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Почему предсказание одинаково для всех сегодня
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Предсказание формируется на основе сегодняшней даты, а не на
            основе чего-то личного, поэтому весь день оно остаётся
            одинаковым и автоматически меняется в полночь — это общий
            настрой дня, а не персональный прогноз.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Доступно и на английском
          </h2>
          <p className="text-sm text-[var(--muted)]">
            У этого инструмента есть англоязычная версия:{" "}
            <Link href="/fortune/daily-reading" className="font-medium text-[var(--primary)] hover:underline">
              What Awaits You Today? →
            </Link>
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
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <GadaniyaDisclaimer />

        <OtherGadaniya currentId="chto-zhdet-tebya-segodnya" />
      </div>
    </GadaniyaShell>
  );
}
