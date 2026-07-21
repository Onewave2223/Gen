import type { Metadata } from "next";
import { CaseToggleIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { CaseConverter } from "@/components/tools/CaseConverter";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/tools/case-converter";
const NAME = "Case Converter";
const SHORT_DESCRIPTION =
  "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, or alternating case. One click to copy.";

const faqItems: FaqItem[] = [
  {
    question: "What is Title Case?",
    answer:
      "Title Case capitalizes the first letter of every word. It is commonly used for headings, titles, and proper nouns.",
  },
  {
    question: "What is Sentence case?",
    answer:
      "Sentence case capitalizes the first letter of each sentence and lowercases everything else. It is the standard capitalization for body text.",
  },
  {
    question: "What is alternating case?",
    answer:
      "Alternating case switches between lowercase and uppercase for each character, producing a distinctive stylized effect (e.g., hElLo WoRlD).",
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
  title: "Case Converter – UPPERCASE, lowercase, Title Case Online",
  description:
    "Convert text to uppercase, lowercase, title case, sentence case, or alternating case. Free online case converter — paste, convert, copy.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/registr-teksta" },
  },
  openGraph: {
    title: "Case Converter – UPPERCASE, lowercase, Title Case Online",
    description: "Convert text to any case instantly. Free, in-browser, no sign-up.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words, characters, and sentences." },
  { name: "Character Counter", href: "/tools/character-counter", description: "Count characters, letters, and digits." },
  { name: "Remove Duplicate Lines", href: "/tools/remove-duplicate-lines", description: "Remove repeated lines." },
  { name: "Sort Lines", href: "/tools/sort-lines", description: "Sort lines alphabetically or by length." },
];

export default function CaseConverterPage() {
  return (
    <ToolShell icon={<CaseToggleIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Tools", href: "/tools" }]}
    >
      <JsonLd data={schemas} />
      <CaseConverter />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the case converter</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Paste or type your text into the input field.</li>
            <li>2. Click the case style you want to apply.</li>
            <li>3. Copy the converted result with the Copy button.</li>
            <li>4. Click Clear to start over.</li>
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
