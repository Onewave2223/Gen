import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { createFaqPageSchema } from "@/lib/seo/schema";
import { siteFaqEn, siteFaqRu } from "@/data/faq";

const COPY = {
  en: {
    heading: "Frequently asked questions",
    subheading: "Answers to common questions about TryGenHub's tools.",
    items: siteFaqEn,
  },
  ru: {
    heading: "Часто задаваемые вопросы",
    subheading: "Ответы на частые вопросы об инструментах TryGenHub.",
    items: siteFaqRu,
  },
} as const;

export interface FaqSectionProps {
  locale?: "en" | "ru";
}

export function FaqSection({ locale = "en" }: FaqSectionProps = {}) {
  const { heading, subheading, items } = COPY[locale];

  const schema = createFaqPageSchema(
    items.map((item) => ({ question: item.question, answer: item.answer })),
  );

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
    >
      <JsonLd data={schema} />
      <div className="flex flex-col gap-2 text-center">
        <h2
          id="faq-heading"
          className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          {heading}
        </h2>
        <p className="text-sm text-[var(--muted)]">{subheading}</p>
      </div>

      <Accordion className="mt-8" items={items} />
    </section>
  );
}

FaqSection.displayName = "FaqSection";
