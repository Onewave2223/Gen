import type { Metadata } from "next";
import { ShuffleIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomPicker } from "@/components/generators/RandomPicker";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/random-picker";
const NAME = "Random Picker";
const SHORT_DESCRIPTION =
  "Enter a list of options and pick one at random. Optionally exclude already-chosen items for sequential picking.";

const faqItems: FaqItem[] = [
  {
    question: "Can I pick without repeating the same option?",
    answer:
      "Yes. Enable 'Exclude already picked options' to remove each result from the pool after it is chosen, ensuring every option is picked at most once.",
  },
  {
    question: "How many options can I enter?",
    answer:
      "There is no hard limit. You can enter as many options as you need, one per line.",
  },
  {
    question: "Is the pick truly random?",
    answer:
      "The picker uses JavaScript's Math.random(), which provides pseudorandom results that are fair and unbiased for general use.",
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
  title: "Random Picker – Pick a Random Item from a List",
  description:
    "Enter your options and let the random picker choose one for you. Exclude picked items to avoid repeats. Free, instant, no sign-up.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/sluchaynyy-vybor" },
  },
  openGraph: {
    title: "Random Picker – Pick a Random Item from a List",
    description: "Enter options and pick one at random. Exclude chosen items. Free and instant.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Wheel Spinner", href: "/generators/wheel-spinner", description: "Spin a wheel to choose a winner." },
  { name: "Yes or No Generator", href: "/generators/yes-or-no", description: "Get a random yes or no answer." },
  { name: "Random Team Generator", href: "/generators/random-teams", description: "Split people into random teams." },
  { name: "Dice Roller", href: "/generators/dice-roller", description: "Roll virtual dice online." },
];

export default function RandomPickerPage() {
  return (
    <GeneratorShell icon={<ShuffleIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomPicker />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the random picker</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter your options in the text box, one per line.</li>
            <li>2. Toggle &quot;Exclude already picked options&quot; if you want sequential picks without repeats.</li>
            <li>3. Click Pick Random to select an item.</li>
            <li>4. Click Reset to start over with the full list.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">What can you use a random picker for?</h2>
          <p className="text-sm text-[var(--muted)]">
            A random picker is handy for choosing what to eat, selecting a winner from a list,
            assigning tasks fairly, picking a movie to watch, or making any decision where you want
            a neutral, random choice.
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
