# TryGenHub

A free, no-signup hub of online tools — random generators, calculators, an IQ test, fortune/tarot readings, and fun social games — served in English at `/` and in Russian at `/ru`.

## Run & Operate

- `npm run dev` — run the Next.js dev server (binds to `$PORT`, defaults to 5000)
- `npm run build` — production build (`next build`)
- `npm start` — run the production build
- `npm run lint` — ESLint
- `npm run validate:questions` — validates the IQ-test question bank (`scripts/validate-questions.ts`)
- No required env vars — every integration in `.env.example` (GA4, AdSense, site verification) has a working default or safely no-ops when unset.

## Stack

- Next.js 15 (App Router) + React 19, TypeScript 5.7
- Plain npm project at the repo root — **not** a pnpm workspace. Standalone `package.json`/`tsconfig.json` at root.
- Tailwind CSS 3
- No backend/database — all tools run client-side or via static generation.

## Where things live

- `app/` — routes. English tree at root (`app/page.tsx`, `app/generators/...`), Russian tree under `app/ru/...` with localized slugs (`gadaniya`, `instrumenty`, `razvlecheniya`, `test-na-iq`).
- `components/` — grouped by feature (`home/`, `generators/`, `iq-test/`, `fun/`, `calculators/`, `gadaniya/`, `fortune/`, `seo/`, `ads/`, `ui/`).
- `lib/` — feature logic mirrors `components/` (generators, iq-test, fortune, gadaniya, tarot, seo/schema.ts, site.ts, env.ts).
- `data/` — static content/config driving generator, tool, and category listings (both EN and RU variants, e.g. `fun-en.ts` / `fun-ru.ts`).
- `components/home/Hero.tsx` — shared hero used by both `app/page.tsx` (EN copy) and `app/ru/page.tsx` (RU copy); all props (`badge`, `titleBefore`, `titleAccent`, `subtitle`, optional `titleAfter`) are required by `HeroProps` and must be passed explicitly at every call site.

## Architecture decisions

- This repo was originally scaffolded as a pnpm multi-artifact monorepo template (`artifacts/`, shared `lib/*` packages) but that scaffolding was empty/unused. It was fully removed in favor of running TryGenHub directly at the repo root, because the real product is this single Next.js app, not a multi-artifact workspace.
- EN and RU are separate route trees (not `next-intl`/middleware-based i18n) — RU content lives under `/ru/*` with fully localized slugs, each page importing its own RU data module.

## Product

- Generators (passwords, random numbers/names/teams, UUIDs, wheel spinner, dice, etc.), calculators (age, BMI, tip, discount, percentage), an IQ test, fortune/tarot tools, and social "fun" games — in English at `/` and Russian at `/ru`.

## User preferences

- Deploy target: this app is the sole deployable project at the repo root (autoscale, `npm run build` / `npm start`).

## Gotchas

- Always run `npm run build` after touching shared components like `Hero` and check both an EN and RU call site — RU pages import the same components with localized copy, so a prop change breaks both trees if not updated together.
