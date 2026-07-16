import type { Metadata } from "next";
import { LightbulbIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { DailyIdea } from "@/components/fun/DailyIdea";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { dailyIdeasEN } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/daily-idea";
const TITLE = "Random Daily Idea – One Fresh Idea Every Day";
const DESCRIPTION =
  "Get one fresh idea for today that changes every calendar day. Plus a random bonus idea whenever you need one. No API, no data saved.";

const faqItems = [
  { question: "Does the daily idea really change every day?", answer: "Yes. The idea is determined by the current calendar date — no server is involved. It's the same for everyone on the same day." },
  { question: "Can I get a different idea than today's?", answer: "Yes! Use the Get Another Idea button to get a random bonus idea separately from today's daily idea." },
  { question: "Is any data stored?", answer: "No. The date is read from your browser clock. Nothing is sent anywhere." },
  { question: "How many ideas are in the pool?", answer: "Over 100 ideas, enough for variety across the year." },
];

const schemas = [
  createWebApplicationSchema({ name: "Daily Idea Generator", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Daily Idea", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/ideya-dnya" },
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

const RELATED = funTools.filter((t) => ["random-challenge", "what-to-do", "conversation-starter", "decision-maker"].includes(t.id));

export default function DailyIdeaPage() {
  return (
    <FunShell icon={<LightbulbIcon className="h-6 w-6" />}
      title="Random Daily Idea"
      description="One fresh idea for today. Comes back tomorrow with something new. Plus a bonus idea whenever you want one."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Daily Idea" },
      ]}
    >
      <JsonLd data={schemas} />
      <DailyIdea
        ideas={dailyIdeasEN}
        labels={{
          todayIdea: "Today's idea",
          randomIdea: "Bonus idea",
          getAnother: "Get Another Idea",
          refreshed: "Here's a fresh one",
        }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How it works</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Visit the page to see today&apos;s idea — it&apos;s the same for everyone on the same calendar day.</li>
            <li>2. Come back tomorrow for a new one.</li>
            <li>3. Click Get Another Idea for a random bonus idea any time.</li>
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
