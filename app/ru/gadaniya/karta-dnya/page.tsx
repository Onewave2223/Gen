import type { Metadata } from "next";
import Link from "next/link";
import { GadaniyaShell } from "@/components/gadaniya/GadaniyaShell";
import { KartaDnya } from "@/components/gadaniya/KartaDnya";
import { TarotIcon } from "@/components/icons/ToolIcons";
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

const PATH = "/ru/gadaniya/karta-dnya";
const NAME = "Карта дня";
const SHORT_DESCRIPTION =
  "Вытяни одну карту Таро и узнай её значение и послание на сегодняшний день.";

const faqItems: FaqItem[] = [
  {
    question: "Сколько карт используется в гадании?",
    answer:
      "Используется полная колода из 78 карт — 22 старших аркана и 56 младших арканов (Жезлы, Кубки, Мечи, Пентакли), каждая со своим прямым и перевёрнутым значением.",
  },
  {
    question: "Какие ещё режимы гадания доступны?",
    answer:
      "Кроме карты дня, на этой же странице можно выбрать гадание Да/Нет или расклад из трёх карт: Прошлое / Настоящее / Будущее.",
  },
  {
    question: "Можно ли вытянуть карту несколько раз за день?",
    answer:
      "Да, ограничений нет, но для ежедневного ритуала многие предпочитают вытягивать одну карту в начале дня.",
  },
  {
    question: "Что означает карта дня?",
    answer:
      "Каждая карта показывает общее значение и краткое послание, которое можно использовать как настрой или тему для размышления на сегодня.",
  },
  {
    question: "Используется ли платный сервис для гадания?",
    answer:
      "Нет, карта выбирается случайным образом (с помощью криптографически надёжного генератора браузера) из локального набора данных, без платных API.",
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
  title: "Карта дня Таро онлайн бесплатно",
  description:
    "Бесплатное гадание Карта дня. Вытяни одну карту Таро онлайн и узнай значение и послание на сегодня. Без регистрации.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Карта дня Таро онлайн бесплатно",
    description:
      "Бесплатное гадание Карта дня. Вытяни одну карту Таро онлайн и узнай значение и послание на сегодня.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Карта дня Таро онлайн бесплатно",
    description: "Вытяни одну карту Таро онлайн и узнай послание на сегодня.",
  },
};

export default function KartaDnyaPage() {
  return (
    <GadaniyaShell title={NAME} description={SHORT_DESCRIPTION} icon={<TarotIcon className="h-7 w-7" />}>
      <RuLangSetter />
      <JsonLd data={schemas} />
      <KartaDnya />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как пользоваться картой дня
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Нажмите «Вытянуть карту».</li>
            <li>2. Дождитесь короткой анимации переворота карты.</li>
            <li>3. Прочитайте название, значение и послание карты.</li>
            <li>4. При желании вытяните другую карту или скопируйте результат.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Что такое карта дня в Таро
          </h2>
          <p className="text-sm text-[var(--muted)]">
            «Карта дня» — популярный формат гадания на Таро, в котором
            вытягивается одна карта, задающая тему или настрой на
            ближайшие сутки. Такой ритуал не требует специальных
            знаний Таро и подходит как новичкам, так и тем, кто
            гадает регулярно.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как читать значение карты
          </h2>
          <p className="text-sm text-[var(--muted)]">
            У каждой карты есть общее значение и более короткое
            послание на сегодня. Постарайтесь соотнести их с текущей
            ситуацией в вашей жизни — часто карта помогает заметить
            то, на что вы уже подсознательно обращали внимание.
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

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Значения всех 78 карт Таро
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Хочешь заранее узнать, что означает каждая карта? Посмотри{" "}
            <Link href="/ru/tarot/cards" className="font-medium text-[var(--primary)] hover:underline">
              полный каталог значений карт Таро
            </Link>{" "}
            — прямое и перевёрнутое толкование, а также значение для любви, карьеры, денег и духовного роста.
          </p>
        </section>

        <GadaniyaDisclaimer />

        <OtherGadaniya currentId="karta-dnya" />
      </div>
    </GadaniyaShell>
  );
}
