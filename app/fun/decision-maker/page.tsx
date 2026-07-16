import type { Metadata } from "next";
import { ForkPathIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { DecisionMaker } from "@/components/fun/DecisionMaker";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/decision-maker";
const TITLE = "Decision Maker – Random Choice Generator from Your Options";
const DESCRIPTION =
  "Can't decide? Enter your options and let the tool randomly pick one. Exclude results and repick. Session history only, nothing saved. Free.";

const faqItems = [
  { question: "Is my data saved anywhere?", answer: "No. Your options and results only exist in your browser session memory. Nothing is sent to any server." },
  { question: "How many options can I add?", answer: "As many as you want. The more options, the better." },
  { question: "Can I exclude a result and pick again?", answer: "Yes! After a choice is made, use the Exclude button to remove it and pick from the remaining options." },
  { question: "Is there an animation?", answer: "Yes — a short animation plays while the decision is being made." },
];

const schemas = [
  createWebApplicationSchema({ name: "Decision Maker", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Decision Maker", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/prinyat-reshenie" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const RELATED = funTools.filter((t) => ["random-challenge", "what-to-do", "movie-night-picker", "daily-idea"].includes(t.id));

export default function DecisionMakerPage() {
  return (
    <FunShell icon={<ForkPathIcon className="h-6 w-6" />}
      title="Decision Maker"
      description="Can't make a choice? Type in your options and let the tool randomly decide for you. No data saved."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Decision Maker" },
      ]}
    >
      <JsonLd data={schemas} />
      <DecisionMaker
        labels={{
          placeholder: "Type an option and press Enter",
          add: "Add",
          decide: "Decide for Me",
          again: "Pick Again",
          exclude: "Exclude & Repick",
          result: "The decision is...",
          history: "Previous results",
          enterOptions: "Enter at least 2 options to get started",
          needMore: "Add one more option to get started",
        }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to use</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Type each option and press Enter or click Add.</li>
            <li>2. Add at least 2 options.</li>
            <li>3. Click Decide for Me to get a random pick.</li>
            <li>4. Not happy with the result? Click Pick Again or use Exclude to remove the current result and repick.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">FAQ</h2>
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.question}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Other fun tools</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {RELATED.map((tool) => (
              <Link key={tool.id} href={tool.href} className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]">
                <span>{tool.emoji}</span>
                <span className="font-medium text-[var(--foreground)]">{tool.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </FunShell>
  );
}
