import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { CookieSettingsLink } from "@/components/consent/CookieSettingsLink";

const PATH = "/privacy";
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "Read the TryGenHub Privacy Policy and learn how information may be handled when you use the website and its online tools.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      ru: "/ru/konfidencialnost",
    },
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
          Last updated: July 14, 2026
        </p>
        <p className="text-sm text-[var(--muted)]">
          This policy explains, in plain terms, how TryGenHub currently
          handles information. It is not legal advice, and it does not
          guarantee compliance with any specific law or regulation.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          1. About TryGenHub
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub (&quot;TryGenHub&quot;, &quot;we&quot;, &quot;us&quot;),
          available at{" "}
          <a
            href="https://trygenhub.com"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            trygenhub.com
          </a>
          , provides free online generators, utility tools, calculators,
          IQ tests, and entertainment features. This policy describes what
          happens to information in connection with your use of the
          website.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          2. What information may be processed
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Most TryGenHub tools do not require you to create an account or
          submit personal information to use them. Some tools accept
          optional input, such as a keyword for a naming tool, a date of
          birth for an age calculator, or items for a random picker —
          which you choose to enter yourself. TryGenHub does not collect,
          store, or transmit that input to any TryGenHub-controlled
          server; processing happens locally in your browser.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Separately, depending on which features and third-party
          services are active during your visit, technical information
          may be processed automatically — by TryGenHub, by our hosting
          and infrastructure providers, or by third-party services such
          as Google. This can include:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
          <li>IP address</li>
          <li>device type</li>
          <li>operating system and browser</li>
          <li>language settings</li>
          <li>
            approximate location at country/region level, where
            determined by technical means
          </li>
          <li>pages visited and time of visit</li>
          <li>referring page / traffic source</li>
          <li>interactions with the site</li>
          <li>cookies and similar identifiers</li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub does not necessarily store all of this information
          itself — much of it is processed by the third-party providers
          described below, according to their own privacy policies.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          3. Tool-generated content
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Most current generators perform generation directly in your
          browser rather than on a TryGenHub server. For example, the
          Password Generator uses the Web Crypto API locally and does not
          send the generated password to any backend. Behavior can differ
          between tools, so refer to the individual tool page for
          details.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          4. Google AdSense and Advertising
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub uses Google AdSense to display advertisements. Google
          and its advertising partners may use cookies, local storage,
          advertising identifiers, IP addresses, device/browser
          information, and similar technologies or technical information
          — where permitted and subject to applicable consent
          requirements — for purposes including:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
          <li>displaying advertisements</li>
          <li>
            delivering personalized or non-personalized ads, depending on
            applicable law, your region, your choices, and consent status
          </li>
          <li>measuring advertising performance</li>
          <li>limiting how often advertisements are shown</li>
          <li>preventing fraud and abuse</li>
          <li>improving and maintaining advertising services</li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          Not every visitor is shown personalized advertising — the type
          of ads served can depend on your region, applicable law, your
          consent choices, and Google&apos;s own advertising settings.
          Google and its partners process information according to their
          own privacy policies and applicable data protection
          requirements. You can review and adjust how Google personalizes
          ads for you at{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Google Ad Settings
          </a>
          , and learn more in{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            how Google uses information from sites that use its services
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          5. Consent and Privacy Choices
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub uses a consent banner to provide privacy choices to
          visitors in regions where consent is required, including the
          European Economic Area (EEA), the United Kingdom, Switzerland,
          and other applicable regions. This banner is shown on your
          first visit and governs Google Analytics on this site. Through
          it, you can:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
          <li>accept the use of analytics cookies</li>
          <li>decline analytics cookies</li>
          <li>change your consent choice at any time</li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          You can change your consent choice at any time using the{" "}
          <CookieSettingsLink
            label="Cookie settings"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)] focus-visible:outline-none"
          />{" "}
          link in the site footer. Separately, for advertising served by
          Google AdSense, you can manage ad personalization directly
          through{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Google Ad Settings
          </a>
          , which is controlled by Google rather than by this site&apos;s
          consent banner.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          6. Google Analytics
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub uses Google Analytics 4 (GA4) to understand how
          visitors use the site — for example,
          which tools are popular and how users navigate between pages.
          Google Analytics may collect data such as pages visited, time
          on page, approximate geographic location (country/region),
          browser type, and device type.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Google Analytics is only loaded <strong>after</strong> you
          explicitly accept analytics cookies via the consent banner
          shown on your first visit. If you decline, Google Analytics is
          not loaded and no analytics data is sent. You can change your
          choice at any time using the{" "}
          <CookieSettingsLink
            label="Cookie settings"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)] focus-visible:outline-none"
          />{" "}
          link in the site footer.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Google Analytics data is processed by Google LLC. For more
          information, see{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          7. Cloudflare
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub uses Cloudflare for content delivery, security, and
          performance. Cloudflare may process technical request data as
          part of:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
          <li>delivering and protecting the site</li>
          <li>improving performance</li>
          <li>security and abuse prevention</li>
          <li>
            aggregated or technical traffic statistics (Cloudflare Web
            Analytics)
          </li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          Cloudflare Web Analytics is cookieless and does not use
          advertising cookies. For more information, see{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Cloudflare&apos;s Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          8. Hosting and infrastructure
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub is hosted on Vercel. Vercel may process standard web
          server request data (such as IP addresses and request
          timestamps), including aggregated, cookieless visit analytics,
          as part of normal hosting operations. For more information, see{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Vercel&apos;s Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          9. Cookies and similar technologies
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Cookies are small pieces of data stored on your device that
          help a website remember information about your visit. Similar
          technologies include local storage and advertising identifiers.
          Depending on which services are active and your consent
          choices, TryGenHub and its third-party providers may use:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Necessary
            </span>{" "}
            — TryGenHub uses <strong>localStorage</strong> (not a cookie)
            to remember your analytics consent choice. This stays on your
            device and is not transmitted to any server.
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Analytics
            </span>{" "}
            — if you accept analytics, Google Analytics may set its own
            cookies (such as <code>_ga</code>).
          </li>
          <li>
            <span className="font-medium text-[var(--foreground)]">
              Advertising
            </span>{" "}
            — Google AdSense may set cookies or use identifiers as
            described in Section 4.
          </li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub does not set advertising or tracking cookies of its
          own outside of the third-party services described in this
          policy.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          10. Third-party services
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Third-party providers, including Google and Cloudflare, may
          process data according to their own privacy policies:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Google Privacy Policy
          </a>
          ,{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Cloudflare Privacy Policy
          </a>
          , and{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Vercel Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          11. Your rights
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Depending on applicable law, if you are located in the EEA,
          the UK, or another jurisdiction with similar protections, you
          may have the right to:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
          <li>access data held about you</li>
          <li>request correction of inaccurate data</li>
          <li>request deletion of your data</li>
          <li>restrict or object to certain processing</li>
          <li>request data portability</li>
          <li>withdraw previously given consent, at any time</li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          These rights may not apply in every jurisdiction and, where a
          right applies, it is subject to applicable law. To exercise a
          request related to third-party services such as Google, you
          may also need to contact that provider directly.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          12. Children&apos;s privacy
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub is intended for general audiences. TryGenHub does not
          knowingly collect personal data from children in a manner
          prohibited by applicable law.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          13. International use
        </h2>
        <p className="text-sm text-[var(--muted)]">
          TryGenHub is accessible from many locations. If you access
          TryGenHub from outside the country in which it is hosted, you
          do so on your own initiative and are responsible for
          compliance with any applicable local laws.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          14. Changes to this policy
        </h2>
        <p className="text-sm text-[var(--muted)]">
          This Privacy Policy may be updated from time to time, for
          example if new features, tools, or third-party services are
          introduced. The current version is always published on this
          page, and the &quot;Last updated&quot; date at the top reflects
          the most recent revision.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          15. Contact
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

      <section className="flex flex-col gap-2 border-t border-[var(--border)] pt-6">
        <p className="text-sm text-[var(--muted)]">
          Русская версия:{" "}
          <Link
            href="/ru/konfidencialnost"
            className="font-medium text-[var(--primary)] hover:underline"
          >
            Политика конфиденциальности (Русский) →
          </Link>
        </p>
      </section>
    </div>
  );
}
