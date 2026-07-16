import type { Metadata } from "next";
import { PersonIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomNameGenerator } from "@/components/generators/RandomNameGenerator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/random-name";
const NAME = "Random Name Generator";
const SHORT_DESCRIPTION =
  "Generate random male, female, or mixed full names from a built-in dataset. No API, no sign-up.";

const faqItems: FaqItem[] = [
  {
    question: "Where do the names come from?",
    answer:
      "Names are drawn from a local dataset of common English first names and last names. No external API is called.",
  },
  {
    question: "Can I generate names for fiction writing?",
    answer:
      "Absolutely. Random name generators are popular for creating character names in novels, games, scripts, and other creative projects.",
  },
  {
    question: "Are duplicates possible?",
    answer:
      "Yes, since names are chosen independently at random, you may occasionally get the same combination twice when generating large batches.",
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
  title: "Random Name Generator – Free Online Tool",
  description:
    "Generate random full names for characters, testing, or creative projects. Choose male, female, or any gender. Free and instant.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Random Name Generator – Free Online Tool",
    description:
      "Generate random full names for characters, testing, or creative projects. Choose male, female, or any gender.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const RELATED = [
  { name: "Username Generator", href: "/generators/username", description: "Generate unique username ideas." },
  { name: "Company Name Generator", href: "/generators/company-name", description: "Get business name ideas." },
  { name: "Random Team Generator", href: "/generators/random-teams", description: "Split people into random teams." },
  { name: "Random Picker", href: "/generators/random-picker", description: "Pick a random item from a list." },
];

export default function RandomNamePage() {
  return (
    <GeneratorShell icon={<PersonIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomNameGenerator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the random name generator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose a gender filter: Male, Female, or Any.</li>
            <li>2. Select how many names to generate (1–20).</li>
            <li>3. Click Generate Names.</li>
            <li>4. Copy the results with the Copy button.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">What can random names be used for?</h2>
          <p className="text-sm text-[var(--muted)]">
            Random names are useful for fiction writing, game character creation, software testing
            with realistic dummy data, placeholder content, and educational exercises.
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
