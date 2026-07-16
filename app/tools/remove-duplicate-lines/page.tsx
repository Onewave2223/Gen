import type { Metadata } from "next";
import { LineMinusIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { RemoveDuplicateLines } from "@/components/tools/RemoveDuplicateLines";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/tools/remove-duplicate-lines";
const NAME = "Remove Duplicate Lines";
const SHORT_DESCRIPTION =
  "Paste a list and instantly remove all repeated lines. Choose case sensitivity and whether to strip empty lines.";

const faqItems: FaqItem[] = [
  {
    question: "Does the order of lines change?",
    answer:
      "No. The original order of lines is preserved. Only the duplicate entries (second and subsequent occurrences) are removed.",
  },
  {
    question: "What does case-sensitive comparison mean?",
    answer:
      "With case-sensitive on, 'Apple' and 'apple' are treated as different values and both kept. With case-sensitive off, they are treated as the same and only the first occurrence is kept.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All processing is done entirely in your browser. Your data never leaves your device.",
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
  title: "Remove Duplicate Lines – Free Online Deduplication Tool",
  description:
    "Paste your list and remove duplicate lines instantly. Choose case sensitivity. Works in your browser — no data sent to any server.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/udalit-dublikaty-strok" },
  },
  openGraph: {
    title: "Remove Duplicate Lines – Free Online Deduplication Tool",
    description: "Remove duplicate lines from any list instantly. Free, private, browser-based.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Sort Lines", href: "/tools/sort-lines", description: "Sort lines alphabetically or by length." },
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words, characters, and more." },
  { name: "Case Converter", href: "/tools/case-converter", description: "Convert text to any case." },
  { name: "Character Counter", href: "/tools/character-counter", description: "Count characters in real time." },
];

export default function RemoveDuplicateLinesPage() {
  return (
    <ToolShell icon={<LineMinusIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Tools", href: "/tools" }]}
    >
      <JsonLd data={schemas} />
      <RemoveDuplicateLines />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to remove duplicate lines</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Paste your text into the input box.</li>
            <li>2. Choose whether comparison is case-sensitive.</li>
            <li>3. Optionally remove empty lines.</li>
            <li>4. Click Remove Duplicates and copy the result.</li>
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
