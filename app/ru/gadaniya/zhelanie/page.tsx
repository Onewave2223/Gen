import type { Metadata } from "next";
import { SparkleIcon } from "@/components/icons/ToolIcons";
import { GadaniyaShell } from "@/components/gadaniya/GadaniyaShell";
import { Zhelanie } from "@/components/gadaniya/Zhelanie";
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

const PATH = "/ru/gadaniya/zhelanie";
const NAME = "Сбудется ли желание?";
const SHORT_DESCRIPTION =
  "Загадай желание и узнай, насколько велики шансы на то, что оно сбудется.";

const faqItems: FaqItem[] = [
  {
    question: "Обязательно ли писать желание текстом?",
    answer:
      "Нет, поле для желания необязательное — можно просто загадать его мысленно и нажать кнопку.",
  },
  {
    question: "Что означают разные варианты ответа?",
    answer:
      "Ответы варьируются от обнадёживающих («да, вероятность высокая») до более осторожных («сейчас есть препятствия»), чтобы прогноз звучал разнообразно и не был предсказуемым.",
  },
  {
    question: "Можно ли гадать на одно и то же желание повторно?",
    answer:
      "Да, но для более честного результата стоит возвращаться к вопросу не слишком часто — например, раз в день.",
  },
  {
    question: "Гарантирует ли сайт исполнение желания?",
    answer:
      "Нет, это развлекательный инструмент, а не гарантия будущих событий или профессиональная консультация.",
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
  title: "Сбудется ли желание? Гадание онлайн",
  description:
    "Гадание на желание онлайн бесплатно. Узнай, сбудется ли задуманное, и оцени свои шансы. Без регистрации.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Сбудется ли желание? Гадание онлайн",
    description:
      "Гадание на желание онлайн бесплатно. Узнай, сбудется ли задуманное, и оцени свои шансы.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Сбудется ли желание? Гадание онлайн",
    description: "Узнай, сбудется ли твоё желание.",
  },
};

export default function ZhelaniePage() {
  return (
    <GadaniyaShell icon={<SparkleIcon className="h-7 w-7" />} title={NAME} description={SHORT_DESCRIPTION} emoji="⭐">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <Zhelanie />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как погадать на желание
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Загадайте желание мысленно или впишите его в поле.</li>
            <li>2. Нажмите «Узнать шансы».</li>
            <li>3. Дождитесь короткой анимации и прочитайте прогноз.</li>
            <li>4. При желании спросите ещё раз или скопируйте ответ.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Зачем гадать на желание
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Этот инструмент помогает превратить абстрактное желание в
            небольшой ритуал: сформулировать его чётче и получить
            символический ориентир — стоит ли действовать активнее
            или немного подождать.
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

        <OtherGadaniya currentId="zhelanie" />
      </div>
    </GadaniyaShell>
  );
}
