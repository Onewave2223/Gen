import type { Metadata } from "next";
import { RouletteIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { WheelSpinner } from "@/components/generators/WheelSpinner";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/wheel-spinner";
const NAME = "Wheel Spinner";
const SHORT_DESCRIPTION =
  "Enter your options, spin the wheel, and get a random winner. Remove winners and spin again for sequential draws.";

const faqItems: FaqItem[] = [
  {
    question: "How does the wheel determine the winner?",
    answer:
      "The wheel spins with an easing animation for visual effect. The winning segment is determined by a random calculation at the start of each spin.",
  },
  {
    question: "Can I add as many options as I want?",
    answer:
      "Yes, but wheels with many options will display shorter text labels. For best readability, use 2–15 options.",
  },
  {
    question: "Can I remove the winner and spin again?",
    answer:
      "Yes. After a winner is announced, click 'Remove & Spin Again' to eliminate that option from the wheel and continue with the remaining choices.",
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
  title: "Wheel Spinner – Free Online Spin the Wheel Tool",
  description:
    "Spin an interactive wheel to pick a random winner from your list. Free online wheel spinner with no ads or sign-up required.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/sluchaynyy-pobeditel" },
  },
  openGraph: {
    title: "Wheel Spinner – Free Online Spin the Wheel Tool",
    description: "Spin an interactive wheel to pick a random winner from your list. Free and instant.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Random Picker", href: "/generators/random-picker", description: "Pick a random item from a list." },
  { name: "Random Team Generator", href: "/generators/random-teams", description: "Split people into balanced teams." },
  { name: "Yes or No Generator", href: "/generators/yes-or-no", description: "Get a random yes or no answer." },
  { name: "Dice Roller", href: "/generators/dice-roller", description: "Roll virtual dice online." },
];

export default function WheelSpinnerPage() {
  return (
    <GeneratorShell icon={<RouletteIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <WheelSpinner />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the wheel spinner</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Edit the options in the text box (one per line).</li>
            <li>2. Click Apply to update the wheel.</li>
            <li>3. Click Spin and watch the wheel choose a winner.</li>
            <li>4. Optionally remove the winner and spin again.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">When is a wheel spinner useful?</h2>
          <p className="text-sm text-[var(--muted)]">
            A wheel spinner adds a fun visual element to random selection. It is great for classroom
            games, giveaways, deciding where to eat, selecting a team or player, or any situation
            where the spinning animation makes the decision feel more exciting.
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
