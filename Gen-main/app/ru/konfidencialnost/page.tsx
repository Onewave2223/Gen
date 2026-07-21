import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { RuLangSetter } from "@/components/gadaniya/RuLangSetter";
import { createBreadcrumbListSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { CookieSettingsLink } from "@/components/consent/CookieSettingsLink";

const PATH = "/ru/konfidencialnost";
const TITLE = "Политика конфиденциальности — TryGenHub";
const DESCRIPTION =
  "Политика конфиденциальности TryGenHub. Как сайт обрабатывает данные пользователей, Google Analytics, Google AdSense, Cloudflare, cookies и локальное хранилище.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      ru: PATH,
      en: "/privacy",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
};

const schemas = [
  createBreadcrumbListSchema([
    { name: "Главная", path: "/" },
    { name: "Русский раздел", path: "/ru" },
    { name: "Политика конфиденциальности", path: PATH },
  ]),
];

export default function KonfidencialnostPage() {
  return (
    <>
      <RuLangSetter />
      <JsonLd data={schemas} />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--foreground)]">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/ru" className="hover:text-[var(--foreground)]">
                Русский раздел
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--foreground)]">
              Политика конфиденциальности
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Политика конфиденциальности
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Последнее обновление: 14 июля 2026 г.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Эта политика простым языком объясняет, как TryGenHub обрабатывает
            информацию. Она не является юридической консультацией и не
            гарантирует соответствие какому-либо конкретному закону.
          </p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            1. О TryGenHub
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub (&laquo;TryGenHub&raquo;, &laquo;мы&raquo;), доступный по
            адресу{" "}
            <a
              href="https://trygenhub.com"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              trygenhub.com
            </a>
            , предоставляет бесплатные онлайн-инструменты, генераторы,
            калькуляторы, тесты на IQ и развлекательные функции. Эта политика
            описывает, что происходит с информацией в связи с использованием
            сайта.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            2. Какие данные могут обрабатываться
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Большинство инструментов TryGenHub не требуют регистрации и не
            собирают личные данные. Некоторые инструменты принимают
            необязательный ввод — например, дату рождения для калькулятора
            возраста, ключевое слово для генератора или список вариантов для
            случайного выбора — который вы вводите сами. TryGenHub{" "}
            <strong>не собирает, не хранит и не передаёт</strong> этот ввод на
            серверы TryGenHub — обработка происходит локально в вашем
            браузере.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Отдельно от этого, в зависимости от используемых функций и
            сторонних сервисов, автоматически может обрабатываться техническая
            информация — самим TryGenHub, поставщиками хостинга и
            инфраструктуры, либо сторонними сервисами, такими как Google. Это
            может включать:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
            <li>IP-адрес</li>
            <li>тип устройства</li>
            <li>операционную систему и браузер</li>
            <li>языковые настройки</li>
            <li>
              приблизительное местоположение на уровне страны/региона, если
              оно определяется техническими средствами
            </li>
            <li>посещённые страницы и время посещения</li>
            <li>источник перехода/referrer</li>
            <li>взаимодействия с сайтом</li>
            <li>cookies и аналогичные идентификаторы</li>
          </ul>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub не обязательно самостоятельно хранит всю эту информацию
            — значительная часть обрабатывается сторонними поставщиками услуг,
            описанными ниже, в соответствии с их собственными политиками
            конфиденциальности.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            3. Результаты инструментов
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Большинство генераторов работают непосредственно в вашем браузере,
            а не на сервере TryGenHub. Например, генератор паролей использует
            Web Crypto API локально и не отправляет сгенерированный пароль ни
            на какой сервер. Поведение может отличаться между инструментами —
            подробности смотрите на странице конкретного инструмента.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            4. Google AdSense и реклама
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub использует Google AdSense для показа рекламы. Google и
            его рекламные партнёры могут использовать cookies, локальное
            хранилище, рекламные идентификаторы, IP-адрес, информацию об
            устройстве/браузере и другие технологии или техническую
            информацию — там, где это разрешено и с учётом применимых
            требований к согласию, — для:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
            <li>показа рекламы</li>
            <li>
              показа персонализированной или неперсонализированной рекламы —
              в зависимости от применимого законодательства, вашего региона,
              выбора и статуса согласия
            </li>
            <li>измерения эффективности рекламы</li>
            <li>ограничения частоты показа рекламы</li>
            <li>предотвращения мошенничества и злоупотреблений</li>
            <li>улучшения и поддержки рекламных сервисов</li>
          </ul>
          <p className="text-sm text-[var(--muted)]">
            Не все посетители видят персонализированную рекламу — тип
            показываемой рекламы может зависеть от региона, применимого
            законодательства, вашего выбора согласия и собственных настроек
            рекламы Google. Google и его партнёры обрабатывают информацию
            согласно собственным политикам конфиденциальности и применимым
            требованиям защиты данных. Вы можете просмотреть и изменить
            настройки персонализации рекламы Google на странице{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Настройки рекламы Google
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            5. Согласие и настройки конфиденциальности
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub использует баннер согласия, чтобы предоставить
            посетителям из регионов, где это требуется — Европейская
            экономическая зона (EEA), Великобритания, Швейцария и другие
            применимые регионы — выбор в отношении конфиденциальности.
            Баннер показывается при первом посещении и управляет работой
            Google Analytics на этом сайте. Через него вы можете:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
            <li>принять использование аналитических cookies</li>
            <li>отклонить аналитические cookies</li>
            <li>изменить свой выбор в любое время</li>
          </ul>
          <p className="text-sm text-[var(--muted)]">
            Вы можете изменить свой выбор в любое время через ссылку{" "}
            <CookieSettingsLink
              label="Настройки cookies"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)] focus-visible:outline-none"
            />{" "}
            в подвале сайта. Отдельно, для рекламы Google AdSense вы можете
            управлять персонализацией напрямую через{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Настройки рекламы Google
            </a>
            — эти настройки управляются самим Google, а не баннером согласия
            этого сайта.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            6. Google Analytics
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub использует Google Analytics 4 (GA4) для понимания того,
            как посетители используют сайт: какие инструменты популярны и как
            пользователи перемещаются
            между страницами. Google Analytics может собирать данные:
            посещённые страницы, время на странице, приблизительное
            местоположение (страна/регион), тип браузера и устройства.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Google Analytics загружается <strong>только после</strong> вашего
            явного согласия через баннер при первом посещении сайта. Если вы
            отказываете — Google Analytics не загружается и аналитические
            данные не передаются. Вы можете изменить свой выбор в любое время
            через ссылку{" "}
            <CookieSettingsLink
              label="Настройки cookies"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)] focus-visible:outline-none"
            />{" "}
            в подвале сайта.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Данные Google Analytics обрабатываются компанией Google LLC.
            Подробнее:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Политика конфиденциальности Google
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            7. Cloudflare
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub использует Cloudflare для доставки контента,
            безопасности и повышения производительности. Cloudflare может
            обрабатывать техническую информацию о запросах в рамках:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
            <li>доставки и защиты сайта</li>
            <li>повышения производительности</li>
            <li>безопасности и предотвращения злоупотреблений</li>
            <li>
              агрегированной или технической статистики посещаемости
              (Cloudflare Web Analytics)
            </li>
          </ul>
          <p className="text-sm text-[var(--muted)]">
            Cloudflare Web Analytics не использует cookies и не использует
            рекламные cookies. Подробнее:{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Политика конфиденциальности Cloudflare
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            8. Хостинг и инфраструктура
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub размещён на платформе Vercel. Vercel может обрабатывать
            стандартные технические данные веб-запросов (например, IP-адрес,
            временные метки запросов), включая агрегированную аналитику
            посещений без cookies, в рамках работы хостинга. Подробнее:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Политика конфиденциальности Vercel
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            9. Cookies и аналогичные технологии
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Cookies — это небольшие фрагменты данных, которые сохраняются на
            вашем устройстве и помогают сайту запоминать информацию о вашем
            посещении. К аналогичным технологиям относятся локальное хранилище
            и рекламные идентификаторы. В зависимости от того, какие сервисы
            активны, и от вашего выбора согласия, TryGenHub и сторонние
            поставщики могут использовать:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Необходимые
              </span>{" "}
              — TryGenHub использует <strong>localStorage</strong> (не
              cookie) для сохранения вашего выбора относительно аналитики.
              Эти данные остаются на вашем устройстве и не передаются на
              серверы.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Аналитические
              </span>{" "}
              — если вы принимаете аналитику, Google Analytics может
              устанавливать собственные cookies (например, <code>_ga</code>).
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Рекламные
              </span>{" "}
              — Google AdSense может устанавливать cookies или использовать
              идентификаторы, как описано в разделе 4.
            </li>
          </ul>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub не устанавливает собственных рекламных или
            отслеживающих cookies вне сторонних сервисов, описанных в этой
            политике.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            10. Сторонние сервисы
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Сторонние поставщики, включая Google и Cloudflare, могут
            обрабатывать данные согласно собственным политикам
            конфиденциальности:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Политика конфиденциальности Google
            </a>
            ,{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Политика конфиденциальности Cloudflare
            </a>{" "}
            и{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              Политика конфиденциальности Vercel
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            11. Права пользователей
          </h2>
          <p className="text-sm text-[var(--muted)]">
            В зависимости от применимого законодательства, если вы находитесь
            в EEA, Великобритании или другой юрисдикции с аналогичной защитой,
            вы можете иметь право на:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-[var(--muted)]">
            <li>доступ к данным о вас</li>
            <li>исправление неточных данных</li>
            <li>удаление ваших данных</li>
            <li>ограничение обработки или возражение против неё</li>
            <li>перенос данных</li>
            <li>отзыв ранее данного согласия в любое время</li>
          </ul>
          <p className="text-sm text-[var(--muted)]">
            Эти права могут применяться не во всех юрисдикциях и, если право
            применяется, оно действует в рамках применимого законодательства.
            Для реализации запроса, связанного со сторонними сервисами, такими
            как Google, может также потребоваться обратиться напрямую к этому
            поставщику.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            12. Конфиденциальность детей
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub предназначен для широкой аудитории. Мы сознательно не
            собираем личные данные детей способом, запрещённым применимым
            законодательством.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            13. Международное использование
          </h2>
          <p className="text-sm text-[var(--muted)]">
            TryGenHub доступен из многих регионов. Если вы заходите на сайт
            из страны, отличной от страны его размещения, вы делаете это по
            собственной инициативе и несёте ответственность за соблюдение
            применимого местного законодательства.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            14. Изменения в политике
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Эта политика может периодически обновляться — например, при
            появлении новых функций, инструментов или сторонних сервисов.
            Актуальная версия всегда публикуется на этой странице, а дата
            &laquo;Последнего обновления&raquo; в начале страницы отражает
            последнюю редакцию.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            15. Контакты
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Вопросы по конфиденциальности можно задать через{" "}
            <Link
              href="/ru/kontakty"
              className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--primary)]"
            >
              страницу контактов
            </Link>
            .
          </p>
        </section>

        <section className="flex flex-col gap-2 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--muted)]">
            Политика на английском:{" "}
            <Link
              href="/privacy"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              Privacy Policy (English) →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
