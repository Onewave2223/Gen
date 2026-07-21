import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const PATH = "/terms";
const TITLE = "Terms of Use";
const DESCRIPTION =
  "Read the terms that apply when using TryGenHub and its free online generators, tools, calculators, and entertainment features.";

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
          Last updated: July 2026
        </p>
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
          TryGenHub provides free, browser-based online generators, utility
          tools, calculators, and entertainment features — including random
          tools, password generator, naming tools, text utilities, health
          calculators, and divination / fortune-telling features for
          entertainment purposes.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Most tools run entirely in your browser. No registration is
          required to use any tool on TryGenHub.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          3. Acceptable use
        </h2>
        <p className="text-sm text-[var(--muted)]">
          You agree to use TryGenHub only for lawful purposes and in a way
          that does not infringe the rights of, or restrict or inhibit
          the use and enjoyment of, the website by anyone else. You agree
          not to attempt to interfere with the operation of the website,
          circumvent any security measures, or use the website in a
          manner that could damage or overburden the service.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          4. Generated results
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Results produced by TryGenHub&apos;s generators — such as numbers,
          passwords, colors, dates, emoji, usernames, company names, or
          domain ideas — are provided for your own evaluation and use. You
          are responsible for reviewing and deciding whether any generated
          result is suitable for your purposes.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          5. No guarantee of availability or suitability
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub does not guarantee that the website or any tool will be
          available at all times, free of errors, or suitable for any
          particular purpose. For example, generated domain names and
          usernames are ideas only — TryGenHub does not check their actual
          availability for registration or use.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          6. Password Generator and security-sensitive use
        </h2>
        <p className="text-sm text-[var(--muted)]">
          The Password Generator is intended to help you create strong,
          random passwords using the Web Crypto API directly in your
          browser. You remain solely responsible for how you store and
          use any generated password. TryGenHub does not store generated
          passwords and cannot recover them. Evaluate all generated
          passwords against your own security requirements before use.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          7. Health calculators — not medical advice
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Calculators such as the BMI Calculator, Age Calculator, and
          similar health-related tools on TryGenHub provide general
          informational results only. These results are not medical advice,
          medical diagnoses, or a substitute for consultation with a
          qualified healthcare professional. Always consult a doctor or
          other qualified health provider before making any decision based
          on information from these tools.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          8. Fortune-telling and divination features — entertainment only
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Features such as daily card draws, fortune-telling, &quot;yes or
          no&quot; readings, and similar divination-themed tools are provided
          entirely for entertainment and self-reflection purposes. Their
          results are randomly generated and have no predictive, spiritual,
          or factual basis. They should not be used as the basis for
          important personal, financial, medical, or legal decisions.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          9. Intellectual property
        </h2>
        <p className="text-sm text-[var(--muted)]">
          The TryGenHub name, branding, and original website content are
          the property of TryGenHub. Tool outputs — such as generated
          passwords, numbers, or names — are generated randomly and carry
          no intellectual property claim from TryGenHub.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          10. Third-party services
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub uses third-party services including Vercel (hosting) and,
          optionally, Google Analytics (analytics, only with your consent).
          Your use of TryGenHub is also subject to those services&apos; terms
          where applicable. TryGenHub is not responsible for the practices
          of third-party services.
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
          These Terms of Use may be updated from time to time. The
          &quot;Last updated&quot; date at the top reflects when the terms
          were last revised. Continued use of TryGenHub after an update
          means you accept the revised terms.
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
