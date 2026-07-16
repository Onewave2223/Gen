import type { Metadata } from "next";
import { QrCodeIcon } from "@/components/icons/ToolIcons";
import { InstrumentyShell } from "@/components/instrumenty/InstrumentyShell";
import { QrCodeGeneratorRu } from "@/components/instrumenty/QrCodeGeneratorRu";
import { OtherInstrumenty } from "@/components/instrumenty/OtherInstrumenty";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/ru/instrumenty/generator-qr-koda";
const NAME = "Генератор QR-кода";
const SHORT_DESCRIPTION =
  "Создайте QR-код из текста или ссылки и скачайте PNG — всё прямо в браузере, данные никуда не отправляются.";

const faqItems: FaqItem[] = [
  {
    question: "Какой текст можно закодировать в QR?",
    answer:
      "Любой текст: URL-адрес, номер телефона, электронный адрес, обычный текст или любую другую строку.",
  },
  {
    question: "Данные отправляются на сторонние серверы?",
    answer:
      "Нет, QR-код генерируется полностью в браузере с помощью локальной библиотеки. Ваши данные остаются только у вас.",
  },
  {
    question: "В каком формате можно скачать QR-код?",
    answer:
      "QR-код доступен для скачивания в формате PNG с прозрачным фоном, подходящем для печати и размещения в интернете.",
  },
  {
    question: "Какой максимальный размер данных для QR-кода?",
    answer:
      "Стандартный QR-код v40 вмещает до 4296 символов буквенно-цифровых данных. Для коротких URL и телефонов этого более чем достаточно.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "UtilitiesApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Инструменты", path: "/ru/instrumenty" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: `${NAME} онлайн бесплатно`,
  description:
    "Генератор QR-кода онлайн: создайте QR из ссылки или текста и скачайте PNG. Данные не отправляются на сервер. Бесплатно.",
  alternates: {
    canonical: PATH,
    languages: { en: "/tools/qr-code-generator", ru: PATH },
  },
  openGraph: {
    title: `${NAME} онлайн`,
    description: "Создайте QR-код из любого текста или URL и скачайте PNG бесплатно.",
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary", title: `${NAME} онлайн`, description: SHORT_DESCRIPTION },
};

export default function GeneratorQrKodaPage() {
  return (
    <InstrumentyShell icon={<QrCodeIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION} emoji="📱">
      <RuLangSetter />
      <JsonLd data={schemas} />
      <QrCodeGeneratorRu />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Как создать QR-код
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Введите текст или вставьте ссылку в поле ввода.</li>
            <li>2. Нажмите «Создать QR-код».</li>
            <li>3. QR-код появится ниже — его можно отсканировать сразу.</li>
            <li>4. Нажмите «Скачать PNG», чтобы сохранить изображение.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Где использовать QR-коды
          </h2>
          <p className="text-sm text-[var(--muted)]">
            QR-коды удобны для быстрого перехода на сайт, передачи ссылок
            без набора, размещения на визитках и рекламных материалах,
            а также для Wi-Fi паролей и контактных данных.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Частые вопросы</h2>
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <OtherInstrumenty currentId="generator-qr-koda" />
      </div>
    </InstrumentyShell>
  );
}
