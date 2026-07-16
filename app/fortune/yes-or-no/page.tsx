import type { Metadata } from "next";
import { SparkleIcon } from "@/components/icons/ToolIcons";
import { FortuneShell } from "@/components/fortune/FortuneShell";
import { YesOrNo } from "@/components/fortune/YesOrNo";
import { OtherFortune } from "@/components/fortune/OtherFortune";
import { FortuneDisclaimer } from "@/components/fortune/FortuneDisclaimer";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";
import Link from "next/link";

const PATH = "/fortune/yes-or-no";
const NAME = "Yes or No Oracle";
const SHORT_DESCRIPTION =
  "Ask any question and get a quick answer — yes, no, or something in between.";

const faqItems: FaqItem[] = [
  {
    question: "How does the Yes or No Oracle work?",
    answer:
      "Type your question and tap the button — the tool randomly selects one answer from an extended set: from a clear 'yes' to 'not clear yet'.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No, the tool is completely free and works without registration — all logic runs locally in your browser.",
  },
  {
    question: "Can I ask the same question multiple times?",
    answer:
      "Yes, you can tap 'Ask again' as many times as you like — each answer is selected fresh each time.",
  },
  {
    question: "Will the answer always be strictly yes or no?",
    answer:
      "Not always. Alongside direct answers the set includes in-between options like 'most likely yes' or 'the time hasn't come yet', so the oracle feels more nuanced.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "LifestyleApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fortune & Fun", path: "/fortune" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Yes or No Oracle — Free Online Fortune Tool",
  description:
    "Free Yes or No Oracle. Ask any question and instantly get an answer: yes, no, or something in between. No sign-up required.",
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya/da-net",
    },
  },
  openGraph: {
    title: "Yes or No Oracle — Free Online Fortune Tool",
    description:
      "Ask any question and instantly get an answer: yes, no, or something in between. Free, no sign-up.",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yes or No Oracle — Free Online Fortune Tool",
    description: "Ask a question and get an instant yes or no answer.",
  },
};

export default function YesOrNoPage() {
  return (
    <FortuneShell icon={<SparkleIcon className="h-7 w-7" />} title={NAME} description={SHORT_DESCRIPTION} emoji="🔮">
      <JsonLd data={schemas} />
      <YesOrNo />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the Yes or No Oracle
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Think of a question you want answered.</li>
            <li>2. Type it in the field (optional) and tap &quot;Get an answer&quot;.</li>
            <li>3. Wait for the short animation and read the result.</li>
            <li>4. Copy the result or ask again if you like.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What people use Yes or No for
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This is the simplest fortune format: it needs no birth date or
            complex input, and immediately gives a short pointer. Many people
            use it to look at a question from a fresh angle, release some
            tension before a decision, or simply satisfy a moment of curiosity.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to phrase your question
          </h2>
          <p className="text-sm text-[var(--muted)]">
            The oracle works best with clear questions that can in principle be
            answered with yes or no — for example, &quot;Is now a good time to take
            this step?&quot;. Remember that the answer is best treated as a prompt
            for reflection rather than a ready-made decision.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Also available in Russian
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool has a Russian-language version:{" "}
            <Link href="/ru/gadaniya/da-net" className="font-medium text-[var(--primary)] hover:underline">
              Гадание Да или Нет →
            </Link>
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently Asked Questions
          </h2>

          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </section>

        <FortuneDisclaimer />

        <OtherFortune currentId="yes-or-no" />
      </div>
    </FortuneShell>
  );
}
