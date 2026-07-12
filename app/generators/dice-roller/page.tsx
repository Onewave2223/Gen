import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { DiceRoller } from "@/components/generators/DiceRoller";
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

const PATH = "/generators/dice-roller";
const NAME = "Dice Roller";
const SHORT_DESCRIPTION =
  "Roll one or more virtual dice with custom sides, standard dice presets, and instant totals.";

const faqItems: FaqItem[] = [
  {
    question: "Can I roll multiple dice at once?",
    answer:
      "Yes. You can roll up to 100 dice at the same time and see each individual roll along with the total.",
  },
  {
    question: "What dice sizes are supported?",
    answer:
      "You can choose any number of sides from 2 to 1000, or use the presets for common dice like d4, d6, d8, d10, d12, d20, and d100.",
  },
  {
    question: "What does d20 mean?",
    answer:
      "d20 refers to a single twenty-sided die, commonly used in tabletop role-playing games such as Dungeons & Dragons.",
  },
  {
    question: "Is this dice roller suitable for tabletop games?",
    answer:
      "Yes, it works well as a convenient substitute for physical dice during casual games. Each roll is generated independently using pseudorandom number generation.",
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
  title: "Dice Roller – Free Online Tool",
  description:
    "Roll virtual dice online instantly. Roll one or many dice with custom sides or standard d4 to d100 presets and see every roll and total.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Dice Roller – Free Online Tool",
    description:
      "Roll virtual dice online instantly. Roll one or many dice with custom sides or standard d4 to d100 presets and see every roll and total.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function DiceRollerPage() {
  return (
    <GeneratorShell title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <DiceRoller />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the dice roller
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter the number of dice you want to roll.</li>
            <li>2. Enter the number of sides per die, or pick a preset.</li>
            <li>3. Roll the dice.</li>
            <li>4. Review each individual roll and the total.</li>
            <li>5. Copy your results if needed.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What does dice notation mean?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Dice notation describes how many dice to roll and how many
            sides each die has. For example, 3d6 means rolling three
            six-sided dice, while 1d20 means rolling a single
            twenty-sided die. The number before the &quot;d&quot; is the
            dice count, and the number after it is the number of sides.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Common dice types
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Tabletop games commonly use a handful of standard dice: d4,
            d6, d8, d10, d12, d20, and d100. The presets above let you
            quickly switch between these common side counts, though you
            can also enter any custom number of sides from 2 to 1000.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What can a virtual dice roller be used for?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            A virtual dice roller is handy for tabletop role-playing
            games, board games, classroom activities, and any situation
            where you need a quick, fair way to generate random numbers
            within a fixed range.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I roll multiple dice at once?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. You can roll up to 100 dice at the same time and see
              each individual roll along with the total.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              What dice sizes are supported?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              You can choose any number of sides from 2 to 1000, or use
              the presets for common dice like d4, d6, d8, d10, d12,
              d20, and d100.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              What does d20 mean?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              d20 refers to a single twenty-sided die, commonly used in
              tabletop role-playing games such as Dungeons &amp; Dragons.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Is this dice roller suitable for tabletop games?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes, it works well as a convenient substitute for physical
              dice during casual games. Each roll is generated
              independently using pseudorandom number generation.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="dice-roller" />
      </div>
    </GeneratorShell>
  );
}
