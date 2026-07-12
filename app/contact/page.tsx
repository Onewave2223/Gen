import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const PATH = "/contact";
const TITLE = "Contact";
const DESCRIPTION =
  "Contact TryGenHub with questions, feedback, bug reports, or suggestions about the website and its online tools.";

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

const CONTACT_CATEGORIES = [
  {
    title: "Report a bug",
    description:
      "Something not working the way you expect on a generator page.",
  },
  {
    title: "Suggest a tool",
    description: "An idea for a new generator or utility tool.",
  },
  {
    title: "Report incorrect information",
    description:
      "Something on the site, such as page content, that looks wrong.",
  },
  {
    title: "Privacy question",
    description: "A question about the Privacy Policy or how a tool works.",
  },
  {
    title: "Business inquiry",
    description: "A partnership, press, or other business-related question.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Contact TryGenHub
        </h1>
        <p className="max-w-xl text-base text-[var(--muted)]">
          A direct contact channel is being prepared and will be added
          before TryGenHub&apos;s public production launch. In the meantime,
          here are the kinds of things you&apos;ll be able to reach out
          about.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          What you can contact TryGenHub about
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CONTACT_CATEGORIES.map((category) => (
            <li
              key={category.title}
              className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <span className="text-sm font-medium text-[var(--foreground)]">
                {category.title}
              </span>
              <span className="text-sm text-[var(--muted)]">
                {category.description}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-sm text-[var(--muted)]">
          In the meantime, you can review the{" "}
          <Link
            href="/about"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            About page
          </Link>{" "}
          to learn more about TryGenHub, or the{" "}
          <Link
            href="/privacy"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Terms of Use
          </Link>{" "}
          for more detail on how TryGenHub currently operates.
        </p>
      </section>
    </div>
  );
}
