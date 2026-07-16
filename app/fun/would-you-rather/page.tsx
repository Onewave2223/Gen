import type { Metadata } from "next";
import { TwoPathsIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { WouldYouRather } from "@/components/fun/WouldYouRather";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { wouldYouRatherQuestions } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/would-you-rather";
const TITLE = "Would You Rather Generator – 100+ Fun Questions";
const DESCRIPTION =
  "Play Would You Rather online! 100+ fun, safe, and creative questions. Choose between two options and share with friends. No sign-up required.";

const faqItems = [
  { question: "How many questions are in the generator?", answer: "There are over 100 Would You Rather questions covering a wide range of fun, creative, and thought-provoking scenarios." },
  { question: "Is the generator free to use?", answer: "Yes, completely free. No registration, no limits." },
  { question: "Can I share a specific question?", answer: "Use the Share button to share the current page link. The Share button uses the Web Share API if supported, or copies the link to clipboard." },
  { question: "Are the questions appropriate for all ages?", answer: "Yes. All questions are safe and suitable for a wide general audience." },
];

const schemas = [
  createWebApplicationSchema({ name: "Would You Rather Generator", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Would You Rather", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/chto-by-ty-vybral" },
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

const labels = {
  optionA: "A",
  optionB: "B",
  next: "Next Question",
  share: "Share",
  copied: "Link Copied!",
  copyLink: "Copy Link",
  question: "Would you rather…",
};

const RELATED = funTools.filter((t) => ["never-have-i-ever", "truth-or-dare", "this-or-that", "random-question"].includes(t.id));

export default function WouldYouRatherPage() {
  return (
    <FunShell icon={<TwoPathsIcon className="h-6 w-6" />}
      title="Would You Rather"
      description="Choose between two options — no right or wrong answers. Just fun dilemmas."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Would You Rather" },
      ]}
    >
      <JsonLd data={schemas} />
      <WouldYouRather questions={wouldYouRatherQuestions} labels={labels} />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to play</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Read the Would You Rather question.</li>
            <li>2. Pick option A or option B.</li>
            <li>3. Click Next Question for a new dilemma.</li>
            <li>4. Share your favorite question with friends using the Share button.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">When to use this</h2>
          <p className="text-sm text-[var(--muted)]">
            Would You Rather is perfect for road trips, parties, icebreakers at work or school, or any time you want a fun conversation starter with friends or family. All questions are safe for general audiences.
          </p>
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
