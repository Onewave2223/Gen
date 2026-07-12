import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const PATH = "/terms";
const TITLE = "Terms of Use";
const DESCRIPTION =
  "Read the terms that apply when using TryGenHub and its free online generators and utility tools.";

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

export default function TermsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Terms of Use
        </h1>
        <p className="text-sm text-[var(--muted)]">
          These terms apply when you use TryGenHub. They are written in
          plain language and are not a substitute for individual legal
          advice.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          1. Acceptance of terms
        </h2>
        <p className="text-sm text-[var(--muted)]">
          By using TryGenHub, you agree to these Terms of Use. If you do not
          agree with them, please do not use the website.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          2. Description of the service
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub provides free, browser-based online generators and
          utility tools, including random tools, a password generator,
          and naming tools for usernames, company names, and domain
          ideas.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          3. Acceptable use
        </h2>
        <p className="text-sm text-[var(--muted)]">
          You agree to use TryGenHub only for lawful purposes and in a way
          that does not infringe the rights of, or restrict or inhibit
          the use and enjoyment of, the website by anyone else.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          4. Generated results
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Results produced by TryGenHub&apos;s generators, such as numbers,
          passwords, colors, dates, emoji, usernames, company names, or
          domain ideas, are provided for your own evaluation and use. You
          are responsible for reviewing and deciding whether any
          generated result is suitable for your purposes.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          5. No guarantee of availability or suitability
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub does not guarantee that the website or any tool will be
          available at all times, free of errors, or suitable for any
          particular purpose.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          6. Password Generator and security-sensitive use
        </h2>
        <p className="text-sm text-[var(--muted)]">
          The Password Generator is intended to help you create strong,
          random passwords. You remain solely responsible for how you
          store, share, and use any password you generate, including
          using a reputable password manager and enabling multi-factor
          authentication where available.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          7. Username, company name, and domain ideas
        </h2>
        <p className="text-sm text-[var(--muted)]">
          The Username Generator, Company Name Generator, and Domain Name
          Generator produce ideas only. None of these tools check
          real-world availability: the Username Generator does not check
          platform availability, the Company Name Generator does not
          check trademarks or company registration, and the Domain Name
          Generator does not check domain availability, registrar
          inventory, or trademark conflicts. Always verify availability
          directly with the relevant platform, registry, or professional
          before making a decision.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          8. Intellectual property
        </h2>
        <p className="text-sm text-[var(--muted)]">
          The TryGenHub name, design, and website code are the property of
          TryGenHub or its licensors, except where noted otherwise. Results
          you generate using TryGenHub&apos;s tools are yours to use.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          9. Third-party services
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub&apos;s codebase includes optional support for Google
          Analytics and Google AdSense. On a given deployment, each is
          only active if the site operator has configured it; otherwise
          it stays off. See the Privacy Policy for details on what
          information may be involved when these services are active.
        </p>
        <p className="text-sm text-[var(--muted)]">
          When advertising is displayed through Google AdSense,
          advertisements are provided by third parties. TryGenHub does not
          endorse, and is not responsible for, the content, products, or
          services of any advertiser, and an advertiser&apos;s
          participation does not mean that advertiser endorses TryGenHub.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          10. Service changes
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub may add, change, or remove tools and features over time
          as the website continues to develop.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          11. Disclaimer
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub and its tools are provided on an &quot;as is&quot; and
          &quot;as available&quot; basis, without warranties of any kind,
          to the extent permitted by applicable law.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          12. Limitation of liability
        </h2>
        <p className="text-sm text-[var(--muted)]">
          To the extent permitted by applicable law, TryGenHub is not liable
          for any indirect, incidental, or consequential damages arising
          from your use of the website or its tools.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          13. Changes to the terms
        </h2>
        <p className="text-sm text-[var(--muted)]">
          These Terms of Use may be updated from time to time. Continued
          use of TryGenHub after an update means you accept the revised
          terms.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          14. Contact
        </h2>
        <p className="text-sm text-[var(--muted)]">
          To contact TryGenHub about these terms, use the{" "}
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
