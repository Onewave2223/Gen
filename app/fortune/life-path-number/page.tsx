import type { Metadata } from "next";
import { PathNumberIcon } from "@/components/icons/ToolIcons";
import { FortuneShell } from "@/components/fortune/FortuneShell";
import { LifePathNumber } from "@/components/fortune/LifePathNumber";
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

const PATH = "/fortune/life-path-number";
const NAME = "Life Path Number";
const SHORT_DESCRIPTION =
  "Discover your life path number from your date of birth: meaning, strengths, and character tendencies.";

const faqItems: FaqItem[] = [
  {
    question: "How is the life path number calculated?",
    answer:
      "All digits of your birth date are added together and repeatedly reduced to a single digit — this is a simple and widely used numerological system.",
  },
  {
    question: "What are master numbers 11 and 22?",
    answer:
      "These are special numbers that, in some numerology systems, are not reduced to a single digit and are considered to carry greater significance.",
  },
  {
    question: "Do I need to register to find out my life path number?",
    answer:
      "No, just enter your date of birth — the calculation happens instantly and entirely within your browser.",
  },
  {
    question: "How accurate is this?",
    answer:
      "This is a simplified numerology system intended for entertainment and self-reflection, not a scientific or professional tool.",
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
  title: "Life Path Number Calculator — Free Numerology Tool",
  description:
    "Calculate your life path number from your date of birth for free. Discover your number's meaning, strengths, and tendencies. No sign-up required.",
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/gadaniya/chislo-sudby",
    },
  },
  openGraph: {
    title: "Life Path Number Calculator — Free Numerology Tool",
    description:
      "Calculate your life path number and discover its meaning, strengths, and tendencies. Free, no sign-up.",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Life Path Number Calculator — Free Numerology Tool",
    description: "Find your life path number from your date of birth — free.",
  },
};

export default function LifePathNumberPage() {
  return (
    <FortuneShell icon={<PathNumberIcon className="h-7 w-7" />} title={NAME} description={SHORT_DESCRIPTION} emoji="✨">
      <JsonLd data={schemas} />
      <LifePathNumber />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to find your life path number
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter your date of birth.</li>
            <li>2. Tap &quot;Calculate my life path number&quot;.</li>
            <li>3. Read your number, its meaning, strengths, and tendencies.</li>
            <li>4. Copy the result if you like.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What is a life path number?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            The life path number (also called the destiny number) is one of the
            core figures in numerology. It is derived from your birth date and,
            according to numerological traditions, reflects general personality
            traits and life themes.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use your result
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Think of your life path number as one way to look at yourself from
            the outside, rather than a strict character assessment. The
            strengths and tendencies listed are general patterns — you may
            recognise some in yourself, or not.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Also available in Russian
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This tool has a Russian-language version:{" "}
            <Link href="/ru/gadaniya/chislo-sudby" className="font-medium text-[var(--primary)] hover:underline">
              Число судьбы →
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

        <OtherFortune currentId="life-path-number" />
      </div>
    </FortuneShell>
  );
}
