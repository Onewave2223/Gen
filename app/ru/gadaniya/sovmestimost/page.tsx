import type { Metadata } from "next";
import { GadaniyaShell } from "@/components/gadaniya/GadaniyaShell";
import { Sovmestimost } from "@/components/gadaniya/Sovmestimost";
import { HeartLinkIcon } from "@/components/icons/ToolIcons";
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

const PATH = "/ru/gadaniya/sovmestimost";
const NAME = "Совместимость двух людей";
const SHORT_DESCRIPTION =
  "Введи два имени и тип отношений, чтобы получить игровой результат совместимости по шести показателям.";

const faqItems: FaqItem[] = [
  {
    question: "Важен ли порядок имён?",
    answer:
      "Нет. Ввод «Аня и Макс» или «Макс и Аня» всегда даёт одинаковый результат — расчёт не зависит от того, какое имя указано первым.",
  },
  {
    question: "Будет ли результат одинаковым при повторной проверке?",
    answer:
      "Да, для тех же двух имён и того же типа отношений. Изменение типа отношений (Любовь, Дружба, Общее) или любого из имён меняет результат.",
  },
  {
    question: "Отправляются ли имена на сервер или где-то сохраняются?",
    answer:
      "Нет. Всё рассчитывается локально в браузере. Имена никогда не отправляются на сервер, не попадают в адрес страницы, не сохраняются на устройстве и не используются в аналитике.",
  },
  {
    question: "Какие шесть показателей используются?",
    answer:
      "Эмоциональная связь, Общение, Доверие, Общие ценности, Химия (или Веселье вместе для дружбы) и Долгосрочный потенциал (или Прочность связи для дружбы).",
  },
  {
    question: "Это научное измерение совместимости?",
    answer:
      "Нет — это лёгкое развлечение для себя, друзей или партнёра, а не психологическая или научная оценка.",
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
  title: "Совместимость двух людей — бесплатный тест по именам",
  description:
    "Бесплатный тест совместимости по двум именам. Выбери Любовь, Дружбу или Общее и получи общий результат и разбор по шести показателям. Без регистрации.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Совместимость двух людей — бесплатный тест по именам",
    description:
      "Введи два имени и тип отношений, чтобы получить результат совместимости по шести показателям.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Совместимость двух людей — бесплатный тест по именам",
    description: "Общий результат совместимости и разбор по шести показателям.",
  },
};

export default function SovmestimostPage() {
  return (
    <GadaniyaShell title={NAME} description={SHORT_DESCRIPTION} icon={<HeartLinkIcon className="h-7 w-7" />}>
      <RuLangSetter />
      <JsonLd data={schemas} />
      <Sovmestimost />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как пользоваться тестом на совместимость
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введи оба имени и выбери тип отношений.</li>
            <li>2. Нажми «Проверить совместимость» и дождись короткой анимации анализа.</li>
            <li>3. Прочитай общий результат и разбор по шести показателям.</li>
            <li>4. Скопируй или отправь результат, либо проверь другую пару.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как устроена приватность
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Всё происходит локально: имена используются только для расчёта
            результата в браузере и никогда не отправляются на сервер, не
            попадают в адрес страницы, не сохраняются на устройстве и не
            используются в аналитике.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Доступно и на английском
          </h2>
          <p className="text-sm text-[var(--muted)]">
            У этого инструмента есть англоязычная версия:{" "}
            <Link href="/fortune/compatibility" className="font-medium text-[var(--primary)] hover:underline">
              Compatibility →
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

        <OtherGadaniya currentId="sovmestimost" />
      </div>
    </GadaniyaShell>
  );
}
