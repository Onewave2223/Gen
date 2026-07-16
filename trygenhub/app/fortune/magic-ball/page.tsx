import type { Metadata } from "next";
import { FortuneShell } from "@/components/fortune/FortuneShell";
import { MagicBall } from "@/components/fortune/MagicBall";
import { CrystalBallIcon } from "@/components/icons/ToolIcons";
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

const PATH = "/fortune/magic-ball";
const NAME = "Magic Ball";
const SHORT_DESCRIPTION =
  "Ask the mystical magic ball a question and receive a short prediction.";

const faqItems: FaqItem[] = [
  {
    question: "How is the Magic Ball different from the Yes or No Oracle?",
    answer:
      "The Magic Ball uses a more atmospheric, oracle-like set of answers and is well suited for questions where the mood of the prediction matters, not just the direct answer.",
  },
  {
    question: "How many times can I ask the Magic Ball?",
    answer:
      "As many times as you like — there are no limits. Each time the ball picks a new answer.",
  },
  {
    question: "Do I need to type my question?",
    answer:
      "No, the question field is optional — you can simply hold the question in your mind and tap the button.",
  },
  {
    question: "Is a paid API used for the predictions?",
    answer:
      "No, all answers are selected randomly from a local set right in your browser, without any external paid API.",
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
  title: "Magic Ball Online — Free Fortune Prediction",
  description:
    "Online Magic Ball. Ask a question and receive a mystical prediction for free, no sign-up required.",
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya/shar-sudby",
    },
  },
  openGraph: {
    title: "Magic Ball Online — Free Fortune Prediction",
    description:
      "Ask a question and receive a mystical prediction for free. No sign-up.",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Magic Ball Online — Free Fortune Prediction",
    description: "Ask a question and receive a mystical prediction.",
  },
};

export default function MagicBallPage() {
  return (
    <FortuneShell title={NAME} description={SHORT_DESCRIPTION} icon={<CrystalBallIcon className="h-7 w-7" />}>
      <JsonLd data={schemas} />
      <MagicBall />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the Magic Ball
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Think of or write down your question.</li>
            <li>2. Tap &quot;Ask the ball&quot; and wait for the animation.</li>
            <li>3. Read the prediction the ball reveals.</li>
            <li>4. Ask again or copy the answer if you like.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Where do the predictions come from?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            The Magic Ball picks its answer from a carefully written set of
            phrases that are more evocative and atmospheric than a plain yes or
            no. This makes the tool interesting for questions about the mood of
            a moment, not just for clear-cut decisions.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to take the answer
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Think of the ball&apos;s prediction as a way to look at your situation
            from a new angle, or simply as a pleasant ritual. The final
            decision always remains yours.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Also available in Russian
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool has a Russian-language version:{" "}
            <Link href="/ru/gadaniya/shar-sudby" className="font-medium text-[var(--primary)] hover:underline">
              Шар судьбы →
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

        <OtherFortune currentId="magic-ball" />
      </div>
    </FortuneShell>
  );
}
