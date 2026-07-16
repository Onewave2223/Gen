import type { Metadata } from "next";
import { MaskIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { TruthOrDare } from "@/components/fun/TruthOrDare";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { truthOrDare } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/truth-or-dare";
const TITLE = "Truth or Dare Generator – Fun Questions & Safe Dares";
const DESCRIPTION =
  "Play Truth or Dare online with 100+ fun questions and dares. General, Funny, and Friends categories. All content is safe and appropriate for general audiences.";

const faqItems = [
  { question: "How many truths and dares are included?", answer: "Over 100 combined questions and dares across General, Funny, and Friends categories." },
  { question: "Is the content appropriate for general audiences?", answer: "Yes. All content is fun and safe. No inappropriate, dangerous, or harmful content." },
  { question: "Can I play this in a mixed-age group?", answer: "The content is designed to be appropriate for teenagers and adults." },
  { question: "Does this use any external API or data?", answer: "No. All content is stored locally — no external requests." },
];

const schemas = [
  createWebApplicationSchema({ name: "Truth or Dare Generator", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Truth or Dare", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/pravda-ili-deystvie" },
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

const categories = [
  { key: "general", label: "General" },
  { key: "funny", label: "Funny" },
  { key: "friends", label: "Friends" },
];

const RELATED = funTools.filter((t) => ["would-you-rather", "never-have-i-ever", "this-or-that", "random-question"].includes(t.id));

export default function TruthOrDarePage() {
  return (
    <FunShell icon={<MaskIcon className="h-6 w-6" />}
      title="Truth or Dare"
      description="Pick Truth for a question or Dare for a challenge. Fun, safe content for all occasions."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Truth or Dare" },
      ]}
    >
      <JsonLd data={schemas} />
      <TruthOrDare
        data={truthOrDare}
        categories={categories}
        labels={{ truth: "Truth", dare: "Dare", next: "Next", tapToReveal: "Choose Truth or Dare" }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to play</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Select a category.</li>
            <li>2. Click Truth to get a question, or Dare to get a challenge.</li>
            <li>3. Complete the challenge or answer the question.</li>
            <li>4. Click Next for a new one.</li>
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
