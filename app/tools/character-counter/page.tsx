import type { Metadata } from "next";
import { HashCounterIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { CharacterCounter } from "@/components/tools/CharacterCounter";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/tools/character-counter";
const NAME = "Character Counter";
const SHORT_DESCRIPTION =
  "Count characters, letters, digits, spaces, and lines in real time. Your text stays in your browser.";

const faqItems: FaqItem[] = [
  {
    question: "What is the difference between characters and characters without spaces?",
    answer:
      "Total characters counts every character including spaces and line breaks. Characters without spaces excludes all whitespace, giving you the count of visible non-space content only.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All counting is done locally in your browser. Nothing is transmitted anywhere.",
  },
  {
    question: "What counts as a letter?",
    answer:
      "Letters are A–Z and a–z. Numbers, punctuation, spaces, and special characters are counted separately.",
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
  title: "Character Counter – Count Letters, Digits & Spaces Online",
  description:
    "Count characters, letters, digits, spaces, and lines in real time. Free online character counter — your text stays private.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Character Counter – Count Letters, Digits & Spaces Online",
    description: "Real-time character counter. Count letters, digits, spaces, and lines. Free and private.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words, sentences, and reading time." },
  { name: "Case Converter", href: "/tools/case-converter", description: "Convert text to any case." },
  { name: "Remove Duplicate Lines", href: "/tools/remove-duplicate-lines", description: "Remove repeated lines." },
  { name: "Sort Lines", href: "/tools/sort-lines", description: "Sort lines alphabetically or by length." },
];

export default function CharacterCounterPage() {
  return (
    <ToolShell icon={<HashCounterIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Tools", href: "/tools" }]}
    >
      <JsonLd data={schemas} />
      <CharacterCounter />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the character counter</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Paste or type your text into the input area.</li>
            <li>2. All character statistics update instantly.</li>
            <li>3. Clear the field to reset all counts.</li>
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
    </ToolShell>
  );
}
