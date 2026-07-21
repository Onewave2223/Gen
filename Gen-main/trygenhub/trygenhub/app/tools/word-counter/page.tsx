import type { Metadata } from "next";
import { ListCounterIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { WordCounter } from "@/components/tools/WordCounter";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/tools/word-counter";
const NAME = "Word Counter";
const SHORT_DESCRIPTION =
  "Count words, characters, sentences, paragraphs, and estimated reading time. Updates instantly as you type.";

const faqItems: FaqItem[] = [
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All counting is done locally in your browser. Your text is never transmitted anywhere.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated at 200 words per minute, which is a commonly used average for silent reading. The actual time will vary by individual.",
  },
  {
    question: "How are sentences counted?",
    answer:
      "Sentences are counted by detecting ending punctuation (periods, exclamation marks, question marks). Abbreviations and other uses of periods may slightly affect the count.",
  },
];

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SHORT_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Word Counter – Count Words, Characters & Reading Time",
  description:
    "Free online word counter. Count words, characters, sentences, paragraphs, and reading time in real time. Your text stays in your browser.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/schetchik-slov" },
  },
  openGraph: {
    title: "Word Counter – Count Words, Characters & Reading Time",
    description: "Count words, characters, sentences, and paragraphs in real time. Free and private.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Character Counter", href: "/tools/character-counter", description: "Count characters, letters, digits, and spaces." },
  { name: "Case Converter", href: "/tools/case-converter", description: "Convert text to different cases." },
  { name: "Remove Duplicate Lines", href: "/tools/remove-duplicate-lines", description: "Remove repeated lines from text." },
  { name: "Sort Lines", href: "/tools/sort-lines", description: "Sort lines alphabetically or by length." },
];

export default function WordCounterPage() {
  return (
    <ToolShell icon={<ListCounterIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Tools", href: "/tools" }]}
    >
      <JsonLd data={schemas} />
      <WordCounter />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the word counter</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Paste or type your text into the input area.</li>
            <li>2. All statistics update automatically as you type.</li>
            <li>3. Clear the text to reset all counts to zero.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">What the word counter measures</h2>
          <p className="text-sm text-[var(--muted)]">
            The tool counts total words, total characters, characters without spaces, sentence count,
            paragraph count, and an estimated reading time. All calculations run instantly in your browser.
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
    </ToolShell>
  );
}
