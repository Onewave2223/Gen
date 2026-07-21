import type { Metadata } from "next";
import { PeopleGroupIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomTeamGenerator } from "@/components/generators/RandomTeamGenerator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/random-teams";
const NAME = "Random Team Generator";
const SHORT_DESCRIPTION =
  "Split a list of participants into random, balanced teams. Enter names, choose how to divide, and shuffle instantly.";

const faqItems: FaqItem[] = [
  {
    question: "How does the team split work?",
    answer:
      "You can split by the number of teams or by the number of people per team. Participants are shuffled randomly and distributed as evenly as possible.",
  },
  {
    question: "What happens when participants can't be divided evenly?",
    answer:
      "Extra participants are distributed one per team starting from Team 1, so some teams may have one more member than others.",
  },
  {
    question: "Can I shuffle again without re-entering names?",
    answer:
      "Yes. Click Shuffle Again after the first generation to get a different random split without clearing your participant list.",
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
  title: "Random Team Generator – Split Groups Fairly Online",
  description:
    "Enter a list of names and instantly split them into random, balanced teams. Choose by number of teams or people per team. Free, no sign-up.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/sluchaynye-komandy" },
  },
  openGraph: {
    title: "Random Team Generator – Split Groups Fairly Online",
    description: "Enter names and split them into random teams instantly. Free and no sign-up required.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Random Picker", href: "/generators/random-picker", description: "Pick one random item from a list." },
  { name: "Wheel Spinner", href: "/generators/wheel-spinner", description: "Spin a wheel to pick a winner." },
  { name: "Random Name Generator", href: "/generators/random-name", description: "Generate random full names." },
  { name: "Yes or No Generator", href: "/generators/yes-or-no", description: "Get a random yes or no answer." },
];

export default function RandomTeamsPage() {
  return (
    <GeneratorShell icon={<PeopleGroupIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomTeamGenerator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the random team generator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter participant names, one per line.</li>
            <li>2. Choose to split by number of teams or number of people per team.</li>
            <li>3. Enter the number.</li>
            <li>4. Click Generate Teams. Use Shuffle Again to re-randomize.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">When is a random team generator useful?</h2>
          <p className="text-sm text-[var(--muted)]">
            Random team generation is useful for classroom activities, sports events, hackathons,
            board game nights, escape rooms, and any group activity where you want fair, unbiased teams
            without the awkward picking process.
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
