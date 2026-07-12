import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomEmojiGenerator } from "@/components/generators/RandomEmojiGenerator";
import { RelatedGenerators } from "@/components/generators/RelatedGenerators";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/random-emoji";
const NAME = "Random Emoji Generator";
const SHORT_DESCRIPTION =
  "Generate random emojis from curated categories and copy them instantly.";

const faqItems: FaqItem[] = [
  {
    question: "Can I generate multiple emojis?",
    answer: "Yes. You can generate up to 100 emojis in a single generation.",
  },
  {
    question: "Can I choose an emoji category?",
    answer:
      "Yes. Pick from smileys, animals, food, activities, travel, objects, or symbols, or select All to combine every category.",
  },
  {
    question: "Can I prevent duplicates?",
    answer:
      "Yes. Enable Unique emojis, as long as the number you request does not exceed the number of available emojis in the selected category.",
  },
  {
    question: "Can I copy the generated emojis?",
    answer:
      "Yes. Use the copy button to copy the Unicode emoji characters directly to your clipboard.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Generators", path: "/#generators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Random Emoji Generator – Free Online Tool",
  description:
    "Generate random emojis by category. Choose smileys, animals, food, activities, travel, objects, symbols, or mix them all.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Random Emoji Generator – Free Online Tool",
    description:
      "Generate random emojis by category. Choose smileys, animals, food, activities, travel, objects, symbols, or mix them all.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function RandomEmojiPage() {
  return (
    <GeneratorShell title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomEmojiGenerator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the random emoji generator
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose a category, or leave it set to All.</li>
            <li>2. Choose how many emojis to generate.</li>
            <li>3. Enable unique results if you do not want duplicates.</li>
            <li>4. Generate and copy your emojis.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Available emoji categories
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Emojis are organized into curated categories: smileys,
            animals, food, activities, travel, objects, and symbols. You
            can generate from a single category or select All to pull
            from every category at once.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What can random emojis be used for?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Random emojis are a fun way to discover new emojis for
            messages and posts, add variety to social content, or simply
            get a bit of everyday inspiration.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I generate multiple emojis?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. You can generate up to 100 emojis in a single
              generation.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I choose an emoji category?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Pick from smileys, animals, food, activities, travel,
              objects, or symbols, or select All to combine every
              category.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I prevent duplicates?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Enable Unique emojis, as long as the number you
              request does not exceed the number of available emojis in
              the selected category.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I copy the generated emojis?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Use the copy button to copy the Unicode emoji
              characters directly to your clipboard.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="random-emoji" />
      </div>
    </GeneratorShell>
  );
}
