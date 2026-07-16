import type { Metadata } from "next";
import { SparkleIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { YesOrNoGenerator } from "@/components/generators/YesOrNoGenerator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/yes-or-no";
const NAME = "Yes or No Generator";
const SHORT_DESCRIPTION =
  "Can't decide? Type your question and get a random yes or no answer. No API, no bias, just chance.";

const faqItems: FaqItem[] = [
  {
    question: "Is the answer 50/50 yes and no?",
    answer:
      "Not exactly — the generator uses weighted probabilities to produce varied phrasing like 'Definitely yes' or 'Very doubtful', but overall it leans toward roughly equal yes/no outcomes.",
  },
  {
    question: "Does the question I type affect the answer?",
    answer:
      "No. Your question text is only used for display purposes. The answer is always chosen at random.",
  },
  {
    question: "Can I use this for important decisions?",
    answer:
      "This is a fun, random tool meant for light-hearted use. For important decisions, always weigh your options carefully.",
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
  title: "Yes or No Generator – Get a Random Answer Instantly",
  description:
    "Type your question and get a random yes or no answer. Fun decision-making tool, no sign-up required.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Yes or No Generator – Get a Random Answer Instantly",
    description: "Type your question and get a random yes or no. Free and instant.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Random Picker", href: "/generators/random-picker", description: "Pick a random item from a list." },
  { name: "Wheel Spinner", href: "/generators/wheel-spinner", description: "Spin a wheel to pick a winner." },
  { name: "Coin Flip", href: "/generators/coin-flip", description: "Flip a virtual coin for heads or tails." },
  { name: "Dice Roller", href: "/generators/dice-roller", description: "Roll virtual dice online." },
];

export default function YesOrNoPage() {
  return (
    <GeneratorShell icon={<SparkleIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <YesOrNoGenerator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Optionally type your question in the input field.</li>
            <li>2. Click Get Answer.</li>
            <li>3. See your random yes or no response.</li>
            <li>4. Click again for a new answer.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">When might you want a random yes or no?</h2>
          <p className="text-sm text-[var(--muted)]">
            Sometimes you just need a nudge. A yes or no generator is useful for breaking decision
            paralysis, settling small disagreements, adding randomness to games, or giving yourself
            permission to go with your gut.
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
