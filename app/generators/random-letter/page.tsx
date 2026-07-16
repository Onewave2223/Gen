import type { Metadata } from "next";
import { LetterTileIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomLetterGenerator } from "@/components/generators/RandomLetterGenerator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/random-letter";
const NAME = "Random Letter Generator";
const SHORT_DESCRIPTION =
  "Generate random letters from A to Z. Choose uppercase, lowercase, or mixed, and allow or block repeats.";

const faqItems: FaqItem[] = [
  {
    question: "Can I generate letters without repeating?",
    answer:
      "Yes. Uncheck 'Allow repeated letters' to get unique letters only. Note that you can generate at most 26 unique letters (or 52 for mixed case).",
  },
  {
    question: "What is the maximum number of letters?",
    answer:
      "You can select up to 26 letters per generation (the full alphabet). With repeats allowed, you can effectively generate any number by using the tool multiple times.",
  },
  {
    question: "What can random letters be used for?",
    answer:
      "Random letters are useful for word games like Scrabble or Boggle practice, creating abbreviations, generating initials, educational games, and teaching the alphabet.",
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
  title: "Random Letter Generator – Free A–Z Letter Picker",
  description:
    "Generate random letters from A to Z. Choose uppercase, lowercase, or mixed. Allow or block repeats. Free and instant.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Random Letter Generator – Free A–Z Letter Picker",
    description: "Pick random letters from A to Z. Choose case and repeat settings. Free and instant.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Random Word Generator", href: "/generators/random-word", description: "Generate random English words." },
  { name: "Random Number Generator", href: "/generators/random-number", description: "Pick random numbers in any range." },
  { name: "Random Picker", href: "/generators/random-picker", description: "Pick a random item from a list." },
  { name: "Lorem Ipsum Generator", href: "/generators/lorem-ipsum", description: "Generate placeholder text." },
];

export default function RandomLetterPage() {
  return (
    <GeneratorShell icon={<LetterTileIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomLetterGenerator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the random letter generator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose the letter case: Uppercase, Lowercase, or Mixed.</li>
            <li>2. Select how many letters to generate.</li>
            <li>3. Toggle whether repeated letters are allowed.</li>
            <li>4. Click Generate and copy your result.</li>
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
