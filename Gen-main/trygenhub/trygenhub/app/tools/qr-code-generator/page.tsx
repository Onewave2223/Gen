import type { Metadata } from "next";
import { QrCodeIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { QrCodeGenerator } from "@/components/tools/QrCodeGenerator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/tools/qr-code-generator";
const NAME = "QR Code Generator";
const SHORT_DESCRIPTION =
  "Generate a QR code for any URL or text. Download as PNG. Runs entirely in your browser — nothing is sent to any server.";

const faqItems: FaqItem[] = [
  {
    question: "Is my data sent to a server?",
    answer:
      "No. QR codes are generated locally in your browser using the open-source qrcode library. Your input never leaves your device.",
  },
  {
    question: "What can I encode in a QR code?",
    answer:
      "You can encode URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, or any short text string.",
  },
  {
    question: "What format can I download the QR code in?",
    answer:
      "The QR code can be downloaded as a PNG image, which is widely supported by printers, websites, and apps.",
  },
];

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SHORT_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "QR Code Generator – Free Online QR Code Maker",
  description:
    "Generate QR codes for any URL or text instantly. Download as PNG. Works in your browser — your data stays private.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/generator-qr-koda" },
  },
  openGraph: {
    title: "QR Code Generator – Free Online QR Code Maker",
    description: "Generate QR codes for any URL or text. Download as PNG. Fully private.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Password Generator", href: "/generators/password", description: "Generate strong random passwords." },
  { name: "UUID Generator", href: "/generators/uuid-generator", description: "Generate UUID v4 identifiers." },
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words and characters." },
  { name: "Case Converter", href: "/tools/case-converter", description: "Convert text to any case." },
];

export default function QrCodePage() {
  return (
    <ToolShell icon={<QrCodeIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Tools", href: "/tools" }]}
    >
      <JsonLd data={schemas} />
      <QrCodeGenerator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the QR code generator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter a URL or text in the input field.</li>
            <li>2. Click Generate QR Code.</li>
            <li>3. Click Download PNG to save the image.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Privacy and security</h2>
          <p className="text-sm text-[var(--muted)]">
            This tool runs entirely in your browser. No input text or QR code data is transmitted
            to any server. It is safe to use with sensitive URLs or personal information.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">FAQ</h2>
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.question}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <RelatedToolLinks tools={RELATED} />
      </div>
    </ToolShell>
  );
}
