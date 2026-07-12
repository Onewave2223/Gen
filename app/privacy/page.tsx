import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const PATH = "/privacy";
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "Read the TryGenHub Privacy Policy and learn how information may be handled when you use the website and its online tools.";

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

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--muted)]">
          This policy explains, in plain terms, how TryGenHub currently
          handles information. It is not legal advice, and it does not
          guarantee compliance with any specific law or regulation.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          1. Introduction
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub (&quot;TryGenHub&quot;, &quot;we&quot;, &quot;us&quot;)
          provides free online generators and utility tools. This policy
          describes what happens to information in connection with your
          use of the website in its current form.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          2. Information you provide
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Most TryGenHub tools do not require you to create an account or
          submit personal information to use them. Some tools accept
          optional input, such as a keyword for a naming tool, which you
          choose to enter yourself.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          3. Tool-generated content
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Most current generators perform generation directly in your
          browser rather than on a TryGenHub server. For example, the
          Password Generator performs password generation in your
          browser using the Web Crypto API and does not send the
          generated password to a TryGenHub backend for generation or
          storage. Behavior can differ between tools, so refer to the
          individual tool page for details specific to that tool.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          4. Technical information
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Like most websites, TryGenHub may receive standard technical
          information as part of normal web traffic, such as the type of
          request made to load a page. This policy will be updated if
          TryGenHub begins actively collecting or storing this information
          beyond what is inherent to serving web pages.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          5. Cookies and similar technologies
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub does not set its own tracking or advertising cookies.
          TryGenHub&apos;s codebase includes optional support for Google
          Analytics and Google AdSense, but each is only active on a
          given deployment when the site operator has configured it;
          otherwise it stays off and sets no cookies. When active,
          these third-party services may set cookies or use similar
          technologies in your browser, as described in their own
          privacy documentation. If TryGenHub&apos;s use of cookies changes
          beyond what is described here, this policy will be updated.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          6. Analytics and advertising
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub may use Google Analytics to understand aggregate site
          usage, and Google AdSense to display advertising, on
          deployments where the site operator has configured them.
          Neither is guaranteed to be active at any given time. When
          active, TryGenHub does not send generator input or generated
          results, such as passwords, usernames, company names, or
          domain ideas, to Google Analytics or Google AdSense. Only
          generic, non-identifying usage information, such as which
          generator page was viewed, may be sent.
        </p>
        <p className="text-sm text-[var(--muted)]">
          When active, Google Analytics and Google AdSense operate
          according to their own privacy policies and may use cookies,
          device identifiers, or similar technologies to measure usage
          or personalize advertising. TryGenHub does not control how these
          third parties process information once it reaches them.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          7. Third-party services and your choices
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Beyond the optional Google Analytics and Google AdSense
          integrations described above, TryGenHub does not currently use
          other third-party analytics or advertising services. TryGenHub
          may add other third-party services in the future; if so, this
          policy will be updated as appropriate before, or at the same
          time as, they go live.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Where a third-party analytics or advertising service is
          active, you can typically manage your ad personalization and
          data preferences through that provider directly, for example
          via Google&apos;s Ads Settings, or through your browser&apos;s
          cookie and tracking controls.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          8. Data retention
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Since most tools generate results locally in your browser,
          TryGenHub does not typically retain the specific results you
          generate. Any technical information inherent to serving web
          pages is retained only as long as reasonably necessary for
          operating the website.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          9. Security
        </h2>
        <p className="text-sm text-[var(--muted)]">
          We take reasonable care in how TryGenHub is built and operated,
          but no website or online service can guarantee complete
          security. You are responsible for how you store and use any
          sensitive information a tool generates for you, such as a
          password.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          10. Children&apos;s privacy
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub is intended for general audiences and is not directed at
          children. TryGenHub does not knowingly collect personal
          information from children.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          11. International use
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub is accessible from many locations. If you access TryGenHub
          from outside the country in which it is hosted, you do so on
          your own initiative and are responsible for compliance with
          any applicable local laws.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          12. Changes to this policy
        </h2>
        <p className="text-sm text-[var(--muted)]">
          This policy may be updated from time to time as TryGenHub changes,
          for example if new features, tools, or third-party services are
          introduced. Continued use of TryGenHub after an update means you
          accept the revised policy.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          13. Contact
        </h2>
        <p className="text-sm text-[var(--muted)]">
          To contact TryGenHub about privacy questions, use the{" "}
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
