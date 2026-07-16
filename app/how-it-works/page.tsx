import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/how-it-works";
const TITLE = "How It Works";
const DESCRIPTION =
  "Learn how TryGenHub's generators and IQ Test work, how your privacy is protected, and why no registration is ever required.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/kak-eto-rabotaet" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const schemas = [
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "How It Works", path: PATH },
  ]),
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={schemas} />

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          How It Works
        </h1>
        <p className="max-w-xl text-base text-[var(--muted)]">
          TryGenHub is built around a simple idea: open a tool, use it
          instantly, and get a real result — no accounts, no waiting, no
          friction. Here&apos;s what happens behind the scenes.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          How the generators work
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Each generator — random numbers, passwords, names, colors,
          dates, and more — runs its logic directly in your browser using
          JavaScript. When you click Generate, the tool computes a new
          result on the spot using standard randomization suited to
          everyday tasks like naming, games, and decision-making.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Because generation happens in your browser, results appear
          instantly and nothing needs to be uploaded to see a result.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          How the IQ Test works
        </h2>
        <p className="text-sm text-[var(--muted)]">
          The{" "}
          <Link
            href="/iq-test"
            className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]"
          >
            IQ Test
          </Link>{" "}
          presents a series of pattern, logic, and spatial reasoning
          questions. Once you answer the final question, your responses
          are scored immediately to produce a result screen — there is no
          waiting period and no account required to see your score.
        </p>
        <p className="text-sm text-[var(--muted)]">
          The test is designed for entertainment and casual
          self-assessment. It is not a clinically validated psychometric
          instrument and should not be treated as an official or
          diagnostic IQ score.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Privacy
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Many tools process your input entirely on your device and never
          send it to a TryGenHub server. Analytics is only loaded after
          you give consent through the cookie banner, and you can change
          that choice at any time from the footer. See our{" "}
          <Link
            href="/privacy"
            className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]"
          >
            Privacy Policy
          </Link>{" "}
          for full details.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          No registration required
        </h2>
        <p className="text-sm text-[var(--muted)]">
          You never need to create an account, sign in, or provide an
          email address to use any tool on TryGenHub. Open a page and
          start using it right away.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Instant results
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Because most computation happens locally, there&apos;s no
          server round-trip standing between you and your result — click
          a button and see the outcome immediately.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Mobile support
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub is fully responsive and works smoothly on phones,
          tablets, and desktop browsers, with no app install required.
        </p>
      </section>
    </div>
  );
}
