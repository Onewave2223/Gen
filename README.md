# GenHub

Free, fast, and easy-to-use online generators and random tools. GenHub provides simple browser-based tools for generating numbers, passwords, usernames, colors, dates, and more.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)

## Requirements

- Node.js 18.18 or later
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Environment Variables

Copy the example environment file and adjust values as needed:

```bash
cp .env.example .env.local
```

| Variable                | Description                              |
| ------------------------ | ----------------------------------------- |
| `NEXT_PUBLIC_SITE_NAME`  | Public site name                          |
| `NEXT_PUBLIC_SITE_URL`   | Public base URL of the site. Used centrally for metadata, canonical URLs, sitemap.xml, and robots.txt. Defaults to `http://localhost:3000` locally; set to your real HTTPS domain in production. |
| `NODE_ENV`                | Environment mode (development/production) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional. Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). Only loads in production when set and valid. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional. Google Search Console HTML tag verification token. Only added to page metadata when set. |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Optional. Google AdSense publisher/client ID (`ca-pub-XXXXXXXXXXXXXXXX`). Only loads in production when set and valid. Also used to generate `/ads.txt`. |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOME` | Optional. AdSense ad unit slot ID for the homepage placement. |
| `NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR` | Optional. AdSense ad unit slot ID for generator page placements. |

See [DEPLOYMENT.md](./DEPLOYMENT.md) for a full production deployment walkthrough, including how to obtain and configure each of these.

## Project Structure

```
.
├── app/
│   ├── layout.tsx      # Root layout, global metadata, Header/Footer
│   ├── globals.css     # Global styles and design tokens
│   ├── page.tsx        # Homepage (WebSite + Organization structured data)
│   ├── robots.ts       # robots.txt (Next.js Metadata API)
│   ├── sitemap.ts      # sitemap.xml, generated from data/generators.ts
│   ├── not-found.tsx   # Custom 404 page
│   ├── about/
│   │   └── page.tsx    # About page
│   ├── privacy/
│   │   └── page.tsx    # Privacy Policy
│   ├── terms/
│   │   └── page.tsx    # Terms of Use
│   ├── contact/
│   │   └── page.tsx    # Contact page
│   ├── error.tsx        # Route-level error boundary
│   ├── ads.txt/
│   │   └── route.ts     # Dynamic /ads.txt (only populated with a real configured publisher ID)
│   └── generators/
│       ├── random-number/
│       │   └── page.tsx   # Random Number Generator page
│       ├── password/
│       │   └── page.tsx   # Password Generator page
│       ├── dice-roller/
│       │   └── page.tsx   # Dice Roller page
│       ├── coin-flip/
│       │   └── page.tsx   # Coin Flip page
│       ├── random-color/
│       │   └── page.tsx   # Random Color Generator page
│       ├── random-date/
│       │   └── page.tsx   # Random Date Generator page
│       ├── random-emoji/
│       │   └── page.tsx   # Random Emoji Generator page
│       ├── username/
│       │   └── page.tsx   # Username Generator page
│       ├── company-name/
│       │   └── page.tsx   # Company Name Generator page
│       └── domain-name/
│           └── page.tsx   # Domain Name Generator page
├── components/
│   ├── ui/               # Core UI primitives (Button, Input, Checkbox, Select)
│   ├── layout/            # Header, MobileMenu, Footer
│   ├── seo/                # JsonLd component for structured data
│   ├── analytics/         # GoogleAnalytics — optional, production-only GA4 loader
│   ├── ads/                # AdSenseScript, AdSlot, GeneratorAd — optional, production-only ad components
│   ├── generators/        # Shared generator components + RandomNumberGenerator, PasswordGenerator,
│   │                       # DiceRoller, CoinFlip, RandomColorGenerator, RandomDateGenerator,
│   │                       # RandomEmojiGenerator, UsernameGenerator, CompanyNameGenerator,
│   │                       # DomainNameGenerator, RelatedGenerators
│   └── home/              # Homepage sections (Hero, search, categories, etc.)
├── data/
│   └── generators.ts    # Centralized generator catalog + related-generators helper
├── lib/
│   ├── site.ts          # Site configuration, absoluteUrl() helper
│   ├── env.ts            # Centralized, validated env config for optional integrations
│   ├── analytics.ts      # Privacy-safe trackEvent() helper (no-op unless GA is configured)
│   ├── utils.ts          # Shared utility functions
│   ├── seo/
│   │   └── schema.ts    # JSON-LD schema builders (WebSite, Organization, WebApplication, BreadcrumbList, FAQPage)
│   └── generators/
│       ├── random-number.ts   # Random number generation logic
│       ├── password.ts        # Secure password generation logic
│       ├── dice-roller.ts     # Dice roll generation logic
│       ├── coin-flip.ts       # Coin flip generation logic
│       ├── random-color.ts    # Random color + HEX/RGB/HSL conversion logic
│       ├── random-date.ts     # Timezone-safe random date generation logic
│       ├── random-emoji.ts    # Curated emoji dataset + random emoji logic
│       ├── username.ts        # Curated word datasets + username generation logic
│       ├── company-name.ts    # Curated word datasets + company name generation logic
│       └── domain-name.ts     # Curated word datasets + domain name generation logic
├── next.config.ts        # Security headers (X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy, production-only HSTS)
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── DEPLOYMENT.md          # Production deployment guide (Vercel, GA4, Search Console, AdSense)
└── package.json
```

## Development Status

This project is in **active development**.

### Completed

- **Foundation** — project setup, tooling, base configuration
- **Design System** — core UI components (Button, Input, Checkbox, Select), responsive Header, mobile navigation, Footer, shared generator components (GeneratorCard, GeneratorShell, ResultBox, CopyButton)
- **Homepage** — responsive global layout, centralized generator catalog, homepage Hero, popular tools section, live generator search, category filtering, category overview
- **Random Number Generator** — the first fully working tool, available at `/generators/random-number`, with:
  - custom minimum and maximum values
  - multiple results in a single generation (up to 1000)
  - unique (no duplicate) results
  - sorting (none, ascending, descending)
  - input validation with clear error messages
  - one-click copy of results
  - responsive UI
  - informational content and FAQ
- **Password Generator** — the second fully working tool, available at `/generators/password`, with:
  - secure browser-based random generation using the Web Crypto API
  - password length from 4 to 128 characters
  - uppercase letters, lowercase letters, numbers, and symbols
  - exclude similar characters option (0, O, o, 1, l, I)
  - password strength indicator
  - one-click copy of the generated password
  - input validation with clear error messages
  - responsive UI
  - informational content and FAQ
- **Additional Random Tools** — five more fully working tools:
  - **Dice Roller** (`/generators/dice-roller`) — custom dice count and sides, standard presets (d4–d100), per-roll results, total, and dice notation
  - **Coin Flip** (`/generators/coin-flip`) — single or up to 1,000 flips, heads/tails counts and percentages
  - **Random Color Generator** (`/generators/random-color`) — HEX, RGB, and HSL output with individual copy buttons and a readable color preview
  - **Random Date Generator** (`/generators/random-date`) — timezone-safe date range selection, unique results, sorting, leap-year-aware validation
  - **Random Emoji Generator** (`/generators/random-emoji`) — curated categories (smileys, animals, food, activities, travel, objects, symbols), unique results

All seven tools above share input validation with clear error messages, one-click copy, responsive UI, and informational content with FAQs.

- **Name Tools** — three more fully working tools, all using local, curated word datasets with no AI, no external APIs, and no network requests:
  - **Username Generator** (`/generators/username`) — optional keyword, five styles (random, clean, gaming, cute, professional), optional numbers and separators, up to 100 unique ideas per batch
  - **Company Name Generator** (`/generators/company-name`) — optional keyword, eight industries, four naming styles (modern, professional, creative, minimal), up to 100 unique ideas per batch
  - **Domain Name Generator** (`/generators/domain-name`) — required keyword, six extensions (.com, .net, .org, .io, .co, .ai), four naming styles (brandable, keyword-focused, short, creative), optional hyphens, up to 100 unique ideas per batch

All 10 tools above share input validation with clear error messages, one-click copy, responsive UI, and informational content with FAQs. The name tools generate ideas only: none of them check real-world availability of usernames, company names, trademarks, or domains, and this is stated clearly on each page.

**All 10 initial generator tools are now implemented**, and the full catalog is available with no "coming soon" tools remaining.

- **SEO, Trust & Site Infrastructure** — production-ready technical SEO and trust foundation:
  - centralized site URL configuration (`lib/site.ts`) with an `absoluteUrl()` helper used everywhere instead of hardcoded domains
  - full metadata architecture (title template, description, canonical URLs, Open Graph, Twitter, robots metadata) with a unique title and description per generator page
  - `app/robots.ts` and `app/sitemap.ts`, generated from the centralized site URL and the `data/generators.ts` catalog
  - structured data: `WebSite` and `Organization` on the homepage, and `WebApplication`, `BreadcrumbList`, and `FAQPage` (matching each page's visible FAQ) on every generator page, via reusable helpers in `lib/seo/schema.ts` and a safe `JsonLd` component
  - trust pages: About, Privacy Policy, Terms of Use, and Contact
  - a custom 404 page
  - a `RelatedGenerators` section on every generator page, sourced from the catalog
  - Footer updated with About, Contact, Privacy, and Terms links plus a few more product links

No fake company details, analytics, advertising, or contact information were added at this stage — see the Privacy Policy and Terms of Use pages for what is and is not currently in place.

- **Analytics, AdSense Readiness & Production Deployment** — production deployment infrastructure, ready for configuration:
  - centralized, validated environment configuration (`lib/env.ts`) for all optional integrations; invalid or missing values simply disable the related integration instead of crashing the build
  - optional Google Analytics 4 integration (`components/analytics/GoogleAnalytics.tsx`) — loads only in production and only with a valid Measurement ID; never loads in local development
  - optional Google Search Console verification via the Next.js Metadata API — only added when a real verification token is configured
  - optional Google AdSense global script (`components/ads/AdSenseScript.tsx`) and a reusable, typed `AdSlot` / `GeneratorAd` ad placement system — production-only, safely no-ops without a configured client ID or slot, and shows a neutral, non-clickable "Advertisement" placeholder in development for layout review only
  - one prepared ad placement on the homepage and one reusable placement on every generator page, positioned to avoid interfering with generator controls or navigation
  - a dynamic `/ads.txt` route that returns a correct entry only when a real AdSense publisher ID is configured, and a 404 otherwise — no fabricated publisher ID
  - a privacy-safe custom analytics event helper (`lib/analytics.ts`) that never transmits generated results or user input
  - Privacy Policy and Terms of Use updated to accurately and conditionally describe the optional analytics/advertising integrations, without claiming they are active when they are not
  - production-safe security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, and production-only HSTS) in `next.config.ts`
  - a route-level error boundary (`app/error.tsx`)
  - a full production deployment guide (`DEPLOYMENT.md`) covering Vercel, environment variables, Google Search Console, Google Analytics, and Google AdSense setup

**Google Analytics, Google Search Console, and Google AdSense are all ready for configuration but not active** — no real Measurement ID, verification token, publisher ID, or production domain has been added at this stage. Each integration turns on only once the site operator sets the corresponding environment variable in a real production deployment.

- **Final QA, Testing & Launch Candidate** — a static source, configuration, SEO, security, and content audit across the full project (see `QA_REPORT.md` for detailed findings and `LAUNCH_CHECKLIST.md` for the pre/post-deployment checklist). No large new features were added at this stage. This audit did not include an actual `npm install` / `npm run build` / `npm run start` run (no network access was available in the environment it was produced in) — run these commands yourself before deploying; see `QA_REPORT.md` for exactly what was and was not verified.

## Version

**GenHub v1.0 Launch Candidate**

This is a release candidate, not a confirmed-working production build. `QA_REPORT.md` documents exactly which checks were performed via source review versus which still require you to run `npm ci`, `npm run lint`, `npm run build`, and `npm run start` locally or in CI before deploying. Google Analytics, Google AdSense, and Google Search Console are implemented and ready but **not active** — none of them are configured with real IDs, and no production domain has been set.
