import type { Metadata } from "next";
import { TextDocumentIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { LoremIpsumGenerator } from "@/components/generators/LoremIpsumGenerator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/lorem-ipsum";
const NAME = "Lorem Ipsum Generator";
const SHORT_DESCRIPTION =
  "Generate placeholder Lorem Ipsum text by paragraphs, sentences, or words. Copy with one click.";

const faqItems: FaqItem[] = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is placeholder text derived from a work of Latin literature by Cicero. It has been the standard dummy text for typesetting and design since the 1500s.",
  },
  {
    question: "Is this text the classic Lorem Ipsum?",
    answer:
      "The generator uses Lorem Ipsum-style vocabulary. Each generation produces slightly different text, which is useful for testing how layouts handle varying content lengths.",
  },
  {
    question: "Can I use the generated text in my projects?",
    answer:
      "Yes. Lorem Ipsum is public domain placeholder text. It is universally understood as dummy content and suitable for mockups, prototypes, and development work.",
  },
];

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SHORT_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Generators", path: "/generators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator – Free Placeholder Text Tool",
  description:
    "Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words. Copy instantly. Free, no sign-up.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/lorem-ipsum" },
  },
  openGraph: {
    title: "Lorem Ipsum Generator – Free Placeholder Text Tool",
    description: "Generate Lorem Ipsum by paragraphs, sentences, or words. Copy instantly.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words, characters, and sentences." },
  { name: "Random Word Generator", href: "/generators/random-word", description: "Get random English words." },
  { name: "Case Converter", href: "/tools/case-converter", description: "Convert text to any case." },
  { name: "Character Counter", href: "/tools/character-counter", description: "Count characters in real time." },
];

export default function LoremIpsumPage() {
  return (
    <GeneratorShell icon={<TextDocumentIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <LoremIpsumGenerator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the Lorem Ipsum generator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose the output type: Paragraphs, Sentences, or Words.</li>
            <li>2. Select how many to generate.</li>
            <li>3. Click Generate and copy the result.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Why use Lorem Ipsum?</h2>
          <p className="text-sm text-[var(--muted)]">
            Designers and developers use Lorem Ipsum to fill space during the design phase, so that
            the focus stays on layout and typography rather than real content. It prevents readers
            from being distracted by the actual meaning of the text.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">FAQ</h2>
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.question}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <RelatedToolLinks tools={RELATED} />
      </div>
    </GeneratorShell>
  );
}
