import type { Metadata } from "next";
import { CoinIcon } from "@/components/icons/ToolIcons";
import { GadaniyaShell } from "@/components/gadaniya/GadaniyaShell";
import { Monetka } from "@/components/gadaniya/Monetka";
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

const PATH = "/ru/gadaniya/monetka";
const NAME = "Орёл или решка";
const SHORT_DESCRIPTION =
  "Подбрось виртуальную монету судьбы онлайн и узнай, что выпадет — орёл или решка.";

const faqItems: FaqItem[] = [
  {
    question: "Насколько честный бросок монеты?",
    answer:
      "Каждый бросок случаен и не зависит от предыдущих результатов — вероятность орла и решки одинакова.",
  },
  {
    question: "Можно ли бросать монету несколько раз?",
    answer: "Да, можно подбрасывать монету сколько угодно раз подряд.",
  },
  {
    question: "Для чего используют подбрасывание монеты?",
    answer:
      "Это простой способ принять быстрое решение между двумя вариантами, определить очерёдность в игре или просто ради развлечения.",
  },
  {
    question: "Нужно ли скачивать приложение?",
    answer:
      "Нет, монета работает прямо в браузере на любом устройстве — компьютере, планшете или телефоне.",
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
  title: "Орёл или решка онлайн — подбросить монету",
  description:
    "Подбросить монету онлайн бесплатно. Узнай, что выпадет — орёл или решка, с красивой анимацией. Без регистрации.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Орёл или решка онлайн — подбросить монету",
    description:
      "Подбросить монету онлайн бесплатно. Узнай, что выпадет — орёл или решка, с красивой анимацией.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Орёл или решка онлайн — подбросить монету",
    description: "Узнай, что выпадет — орёл или решка.",
  },
};

export default function MonetkaPage() {
  return (
    <GadaniyaShell icon={<CoinIcon className="h-7 w-7" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🪙">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <Monetka />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как подбросить монету онлайн
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Нажмите «Подбросить монету».</li>
            <li>2. Дождитесь анимации броска.</li>
            <li>3. Посмотрите результат — орёл или решка.</li>
            <li>4. При необходимости бросьте монету ещё раз.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Зачем нужна виртуальная монета
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Виртуальная монета — быстрый способ сделать случайный
            выбор между двумя вариантами, когда под рукой нет
            настоящей монеты или хочется избежать споров о честности
            броска. Каждый результат генерируется независимо и с
            равной вероятностью.
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

        <OtherGadaniya currentId="monetka" />
      </div>
    </GadaniyaShell>
  );
}
