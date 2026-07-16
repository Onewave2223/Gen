import type { Metadata } from "next";
import { SortArrowsIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { SortLines } from "@/components/tools/SortLines";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/tools/sort-lines";
const NAME = "Sort Lines";
const SHORT_DESCRIPTION =
  "Sort lines of text A–Z, Z–A, by shortest, by longest, or randomly. Copy the sorted result with one click.";

const faqItems: FaqItem[] = [
  {
    question: "Does sorting change the content of lines?",
    answer:
      "No. Only the order of lines changes. The content of each individual line is preserved exactly.",
  },
  {
    question: "Is the sort case-sensitive?",
    answer:
      "The A–Z and Z–A sorts use locale-aware comparison, which is generally case-insensitive for standard alphabetical order but may vary slightly by language.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All sorting is performed locally in your browser. Your text never leaves your device.",
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
  title: "Sort Lines – Free Online Text Line Sorter",
  description:
    "Sort text lines alphabetically, by length, or randomly. Free online tool — paste, sort, copy. Works entirely in your browser.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/sortirovka-strok" },
  },
  openGraph: {
    title: "Sort Lines – Free Online Text Line Sorter",
    description: "Sort text lines A–Z, Z–A, by shortest, longest, or random shuffle. Free and private.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Remove Duplicate Lines", href: "/tools/remove-duplicate-lines", description: "Remove repeated lines from text." },
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words and characters." },
  { name: "Case Converter", href: "/tools/case-converter", description: "Convert text to any case." },
  { name: "Character Counter", href: "/tools/character-counter", description: "Count characters in real time." },
];

export default function SortLinesPage() {
  return (
    <ToolShell icon={<SortArrowsIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Tools", href: "/tools" }]}
    >
      <JsonLd data={schemas} />
      <SortLines />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to sort lines of text</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Paste or type your lines into the input box.</li>
            <li>2. Click the sort order you want: A → Z, Z → A, Shortest first, Longest first, or Random shuffle.</li>
            <li>3. Copy the sorted result with the Copy button.</li>
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
