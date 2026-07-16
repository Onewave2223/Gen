import type { Metadata } from "next";
import { WordBubbleIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomWordGenerator } from "@/components/generators/RandomWordGenerator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/random-word";
const NAME = "Random Word Generator";
const SHORT_DESCRIPTION =
  "Generate random English words from a built-in word list. Useful for word games, brainstorming, and creative prompts.";

const faqItems: FaqItem[] = [
  {
    question: "Where do the words come from?",
    answer:
      "Words are drawn from a local dataset of common English vocabulary. No external API is called and no data is sent to any server.",
  },
  {
    question: "Can I get duplicate words?",
    answer:
      "Each generation picks unique words from the pool, so within one batch you will not see repeats. Multiple generations may overlap.",
  },
  {
    question: "What are random words useful for?",
    answer:
      "Random words are great for word association games, creative writing prompts, generating vocabulary lists, testing apps with realistic text, and brainstorming ideas.",
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
  title: "Random Word Generator – Free English Word Picker",
  description:
    "Generate random English words instantly from a local word list. Great for word games, writing prompts, and brainstorming. Free, no API needed.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Random Word Generator – Free English Word Picker",
    description: "Get random English words instantly. Local word list, no API. Free and instant.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Random Letter Generator", href: "/generators/random-letter", description: "Generate random A-Z letters." },
  { name: "Lorem Ipsum Generator", href: "/generators/lorem-ipsum", description: "Generate placeholder paragraph text." },
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words, characters, and sentences." },
  { name: "Case Converter", href: "/tools/case-converter", description: "Convert text to different cases." },
];

export default function RandomWordPage() {
  return (
    <GeneratorShell icon={<WordBubbleIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomWordGenerator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the random word generator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose how many words to generate (1–20).</li>
            <li>2. Click Generate Words.</li>
            <li>3. Copy the results or click again to generate a fresh set.</li>
          </ol>
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
