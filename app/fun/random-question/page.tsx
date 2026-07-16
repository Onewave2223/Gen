import type { Metadata } from "next";
import { QuestionBubbleIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { RandomQuestion } from "@/components/fun/RandomQuestion";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { randomQuestions } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/random-question";
const TITLE = "Random Question Generator – Icebreakers, Deep & Funny Questions";
const DESCRIPTION =
  "Get random conversation questions for icebreakers, friends, deep discussions, or funny moments. 100+ questions per category. Copy and share easily.";

const faqItems = [
  { question: "What categories are available?", answer: "Icebreakers, Friends, Deep, and Funny — with 25+ questions each." },
  { question: "Can I copy a question to share?", answer: "Yes, use the Copy button to copy the current question to your clipboard." },
  { question: "Is this free?", answer: "Yes. No sign-up, no limits." },
  { question: "Can I use this for team building?", answer: "Absolutely! Icebreaker questions work great for team meetings, onboarding, and workshops." },
];

const schemas = [
  createWebApplicationSchema({ name: "Random Question Generator", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Random Question", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/sluchaynyy-vopros" },
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
  { key: "icebreakers", label: "Icebreakers" },
  { key: "friends", label: "Friends" },
  { key: "deep", label: "Deep" },
  { key: "funny", label: "Funny" },
];

const RELATED = funTools.filter((t) => ["conversation-starter", "would-you-rather", "this-or-that", "truth-or-dare"].includes(t.id));

export default function RandomQuestionPage() {
  return (
    <FunShell icon={<QuestionBubbleIcon className="h-6 w-6" />}
      title="Random Question Generator"
      description="Get conversation questions for any situation — icebreakers, deep talks, funny moments, or catching up with friends."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Random Question" },
      ]}
    >
      <JsonLd data={schemas} />
      <RandomQuestion
        questions={randomQuestions}
        categories={categories}
        labels={{ next: "Next Question", copy: "Copy", copied: "Copied!" }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to use</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose a category: Icebreakers, Friends, Deep, or Funny.</li>
            <li>2. Read the question and use it to start a conversation.</li>
            <li>3. Click Next Question for another.</li>
            <li>4. Use the Copy button to quickly copy the question.</li>
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
