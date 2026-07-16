import type { Metadata } from "next";
import Link from "next/link";
import { IQTestApp } from "@/components/iq-test/IQTestApp";
import { BrainIcon } from "@/components/icons/ToolIcons";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createWebApplicationSchema,
  createBreadcrumbListSchema,
  createFaqPageSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";

const PATH = "/iq-test";
const TITLE = "Free IQ Test – 35 Questions with Instant Results";
const DESCRIPTION =
  "Take a free 35-question IQ test covering pattern, matrix, numerical, logical, spatial, verbal, and classification reasoning across 7 categories. Get an instant estimated score — no sign-up required.";

const faqItems: FaqItem[] = [
  {
    question: "Is this IQ test free?",
    answer:
      "Yes, completely free. No sign-up, payment, or subscription is required.",
  },
  {
    question: "How long does the test take?",
    answer:
      "Most people complete it in 15–20 minutes. There is no hard time limit — take as long as you need.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can take the full test and view your results without registering.",
  },
  {
    question: "Is this an official IQ test?",
    answer:
      "No. This is an online reasoning test that estimates your pattern, numerical, logical, spatial, and verbal thinking skills. It is not a clinically standardised or professionally administered psychometric assessment.",
  },
  {
    question: "Will I get the same questions every time?",
    answer:
      "No. Each attempt draws a balanced set of 35 questions from a larger bank of 90+ original questions, so retaking the test gives you a different but comparably difficult set.",
  },
  {
    question: "Can I take the test on my phone?",
    answer:
      "Yes. The test is fully responsive and works on any modern mobile device or tablet.",
  },
  {
    question: "Can I retake the test?",
    answer:
      "Yes. After completing the test, you can retake it with a fresh set of answers.",
  },
  {
    question: "What is an average IQ score?",
    answer:
      "On standardised professional IQ tests, 100 is the population average. On this online test, scoring in the 95–114 range is considered typical based on the difficulty of these questions.",
  },
  {
    question: "How accurate are online IQ tests?",
    answer:
      "Online IQ tests provide a reasonable estimate of reasoning ability but are less precise than professionally administered standardised tests. Results can vary based on concentration, fatigue, and familiarity with puzzle types.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: "Free IQ Test – 35 Questions",
    description: DESCRIPTION,
    path: PATH,
    category: "EducationalApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "IQ Test", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: `${TITLE} | TryGenHub`,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/test-na-iq",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "TryGenHub Free IQ Test – 35 Questions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function IQTestPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      {/* JSON-LD structured data */}
      <JsonLd data={schemas} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <li>
            <Link
              href="/"
              className="rounded-[var(--radius)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-[var(--foreground)]">
            IQ Test
          </li>
        </ol>
      </nav>

      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 flex-none items-center justify-center rounded-[var(--radius)] bg-[var(--surface-elevated)] text-[var(--primary)] shadow-[var(--shadow)]"
        >
          <BrainIcon className="h-6 w-6" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Free IQ Test</h1>
      </div>

      {/* Main client component — handles all test state */}
      <IQTestApp locale="en" />
    </div>
  );
}
