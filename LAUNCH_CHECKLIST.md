# TryGenHub v1.0 — Launch Checklist

See `QA_REPORT.md` for full detail and the reasoning behind each checkbox
below. Nothing here is marked done unless it was actually completed in the
environment this checklist was produced in — that environment had **no
network access**, so several PRE-DEPLOYMENT items could not be executed and
are left unchecked on purpose.

## PRE-DEPLOYMENT

- [ ] `npm ci` successful — **not run in this session** (no network
      access in this environment); a valid `package-lock.json` (lockfile
      v3) is already committed in the archive, so `npm ci` should work
      as-is once you have registry access
- [ ] `npm run lint` successful — **not run this session** (no
      `node_modules`, no network access)
- [ ] `npm run verify`, if available — no `verify` script exists in this
      project; not added in this pass (see `QA_REPORT.md` §11)
- [ ] `npm run build` successful — **not run** (no `node_modules`)
- [ ] production start tested — **not run**
- [ ] all routes checked — reviewed by source only, not HTTP-tested; see
      `QA_REPORT.md` §5
- [ ] mobile layout reviewed — reviewed by reading Tailwind classes only,
      not in an actual browser; see `QA_REPORT.md` §11
- [x] no secrets included — confirmed: no `.env`, keys, or credentials
      found in the archive

## DEPLOYMENT

- [ ] Push final source to GitHub
- [ ] Import project into Vercel
- [ ] Deploy
- [ ] Connect real domain
- [ ] Set `NEXT_PUBLIC_SITE_URL`
- [ ] Redeploy

## POST-DEPLOYMENT

- [ ] Test homepage
- [ ] Test all 10 generators
- [ ] Test mobile
- [ ] Check HTTPS
- [ ] Check `robots.txt`
- [ ] Check `sitemap.xml`
- [ ] Check canonical URLs
- [ ] Add site to Google Search Console
- [ ] Submit sitemap
- [ ] Configure GA4 if desired
- [ ] Apply for AdSense when site is ready
- [ ] Review Privacy Policy after activating third-party services
- [ ] Check Core Web Vitals

## What was actually verified in this pass (local, source-only)

- [x] Full source audit: no broken imports, no missing files, no duplicate
      routes/components, no undeclared dependencies, no Server/Client
      boundary violations, no `any`/`@ts-ignore`/`@ts-nocheck`, no `eval`,
      no unsafe `dangerouslySetInnerHTML`, no hardcoded secrets
- [x] All 10 generator routes exist and are catalogued as `available`
      (none left as "coming soon")
- [x] No duplicate generator `href`s in `data/generators.ts`
- [x] Password generator uses Web Crypto (`crypto.getRandomValues`) with
      rejection sampling, not `Math.random`
- [x] No generated results (passwords, usernames, company/domain names)
      are ever sent to analytics or embedded in JSON-LD
- [x] Unique-result generators (username, company name, domain name,
      random number) are all bounded — no infinite-loop risk found
- [x] GA/AdSense both fully disabled without valid configured IDs, and
      disabled outside production; no fake IDs anywhere in source
- [x] Trust pages (`about`, `privacy`, `terms`, `contact`) contain no fake
      address/phone/email/company info and no fake working contact form
- [x] Security headers present in `next.config.ts`
- [x] Fixed: `public/favicon.ico` was missing even though `app/layout.tsx`
      referenced it — created a generated placeholder icon so it resolves
