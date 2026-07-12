import type { Metadata } from "next";
import Link from "next/link";
import { generators } from "@/data/generators";
import { siteConfig } from "@/lib/site";

const PATH = "/about";
const TITLE = "About";
const DESCRIPTION =
  "Learn about TryGenHub, a collection of free online generators designed to make everyday random, creative, and naming tasks faster and easier.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
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

const availableGenerators = generators.filter(
  (generator) => generator.status === "available",
);

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          About TryGenHub
        </h1>
        <p className="max-w-xl text-base text-[var(--muted)]">
          TryGenHub is a collection of free, browser-based online generators
          and utility tools, built around a few simple ideas: keep each
          tool focused, keep the interface clear, and make useful results
          available in a click.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          What you&apos;ll find here
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub currently groups its tools into a few categories: random
          tools for numbers, dice, coin flips, colors, dates, and emoji;
          a security-oriented tool for generating strong passwords; and
          creative naming tools for usernames, company names, and domain
          ideas.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Many of these tools run directly in your browser. Where a tool
          performs generation locally rather than on a server, that is
          noted on the tool&apos;s own page, since the exact behavior can
          vary between tools.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Our approach
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-[var(--muted)]">
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Focused tools
            </span>{" "}
            — each generator is built to do one job well, rather than
            bundling unrelated features together.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Clear interfaces
            </span>{" "}
            — options are labeled plainly, with input validation and
            straightforward error messages when something needs
            adjusting.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Transparent limitations
            </span>{" "}
            — where a tool has a real limitation, such as not checking
            domain or username availability, that is stated directly on
            the tool&apos;s page rather than left unsaid.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              No fake guarantees
            </span>{" "}
            — TryGenHub does not claim availability, accuracy, or suitability
            it cannot back up, and does not present generated ideas as
            professional, legal, or security advice.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Current tools
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {availableGenerators.map((generator) => (
            <li key={generator.id}>
              <Link
                href={generator.href}
                className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {generator.name}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {generator.shortDescription}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-sm text-[var(--muted)]">
          Have a question, found a bug, or want to suggest a new tool?
          Visit the{" "}
          <Link
            href="/contact"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
