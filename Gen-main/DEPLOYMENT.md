# Deploying TryGenHub to Production

This guide walks through taking TryGenHub from local development to a
live production deployment on Vercel, and later connecting Google
Search Console, Google Analytics, and Google AdSense. It assumes no
prior DevOps experience.

Nothing in this guide requires you to have real Analytics, Search
Console, or AdSense IDs yet — the site works correctly, and those
integrations simply stay disabled, until you add them.

---

## 1. Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (you can sign up with GitHub)
- This project's files, either as this ZIP or a Git repository
- [Node.js](https://nodejs.org) 18.18 or later installed locally, for testing before you deploy

## 2. Test locally first

From the project root (`TryGenHub/`):

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and click through a few generators.

Then confirm a production build works:

```bash
npm run build
npm run start
```

`npm run start` runs the production server locally. Visit
`http://localhost:3000` again, confirm it loads, then stop the server
(Ctrl+C) — you don't need to keep it running.

## 3. Push the project to GitHub

1. Create a new, empty repository on GitHub.
2. From the `TryGenHub/` folder, initialize and push:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

3. Confirm `.env`, `.env.local`, `node_modules`, and `.next` were **not**
   pushed — `.gitignore` already excludes them. `.env.example` should
   be included; it contains no real secrets.

## 4. Import the project into Vercel

1. In the Vercel dashboard, choose **Add New → Project**.
2. Select the GitHub repository you just pushed.
3. Vercel will auto-detect Next.js. You shouldn't need to change the
   build command (`next build`) or output settings.

## 5. Set environment variables

In the Vercel project's **Settings → Environment Variables**, add:

**Required**

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your production URL, e.g. `https://your-real-domain.example`. If you don't have a custom domain yet, you can temporarily use the `*.vercel.app` URL Vercel assigns you, then update this later (see step 8). |

**Optional** — leave any of these blank for now; each related
integration simply stays off until you fill it in and redeploy:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense + `/ads.txt` |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOME` | AdSense homepage ad unit |
| `NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR` | AdSense generator-page ad unit |

## 6. First deployment

Trigger a deployment (Vercel does this automatically after import, and
on every push to `main`). Once it finishes, open the assigned URL and
click through the homepage and a couple of generators.

## 7. Connect a custom domain

In **Settings → Domains**, add your real domain and follow Vercel's
DNS instructions (usually adding an `A` or `CNAME` record with your
domain registrar).

## 8. Update `NEXT_PUBLIC_SITE_URL`

**This step matters.** Once your custom domain is live:

1. Update `NEXT_PUBLIC_SITE_URL` in Vercel's environment variables to
   your real domain, e.g. `https://your-real-domain.example`.
2. Redeploy (Vercel → Deployments → ⋯ → Redeploy, or push a new commit).

This value drives canonical URLs, Open Graph tags, `sitemap.xml`,
`robots.txt`, and JSON-LD structured data throughout the site, so it
should always match your real, live domain in production.

## 9. Verify the technical basics

After deploying with the real domain set, check:

- `https://your-real-domain.example/robots.txt`
- `https://your-real-domain.example/sitemap.xml`
- `https://your-real-domain.example/ads.txt` — returns 404 until a
  real `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is configured; that's expected.

## 10. Set up Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console) and add your domain as a property.
2. Choose the **HTML tag** verification method and copy the token
   Google gives you (just the token value, not the whole `<meta>` tag).
3. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel to that token
   and redeploy.
4. Click **Verify** in Search Console.
5. Submit your sitemap URL: `https://your-real-domain.example/sitemap.xml`.

## 11. Set up Google Analytics

1. Create a GA4 property in [Google Analytics](https://analytics.google.com).
2. Copy its Measurement ID (looks like `G-XXXXXXXXXX`).
3. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel and redeploy.
4. GA only loads in production, so you won't see local development
   traffic in your reports.

## 12. Set up Google AdSense

1. Apply for AdSense with your real, live production site — AdSense
   generally expects the site to already be reachable at its real
   domain with real content, which is why this comes after steps 7–8.
2. Approval is not guaranteed and can take time; there's nothing to
   configure in the codebase while you wait.
3. Once approved, copy your Publisher/client ID (`ca-pub-XXXXXXXXXXXXXXXX`).
4. Create ad units in AdSense if you want specific slot IDs for the
   homepage and generator placements.
5. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (and, optionally,
   `NEXT_PUBLIC_ADSENSE_SLOT_HOME` / `NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR`)
   in Vercel and redeploy.
6. Re-check `/ads.txt` — it should now return a single line referencing
   your real publisher ID.

## 13. Troubleshooting

- **Build fails on Vercel but works locally** — run `npm run build`
  locally with the same Node version Vercel uses (check
  **Settings → General → Node.js Version**) to reproduce the issue.
- **GA/AdSense scripts don't appear** — confirm you're viewing the
  *production* deployment (not `localhost`), and that the relevant
  environment variable is set correctly and you redeployed after
  setting it.
- **`/ads.txt` returns 404** — expected until `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
  is set to a real, valid `ca-pub-...` value.
- **Site not indexed by Google** — indexing can take days to weeks
  after submitting your sitemap; also confirm `robots.txt` isn't
  disallowing crawlers (it will disallow everything if
  `NEXT_PUBLIC_SITE_URL` is still pointing at `localhost`).

---

## Pre-launch checklist

- [ ] Choose a real domain
- [ ] Deploy to Vercel
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy
- [ ] Verify the production build works
- [ ] Test all 10 generators on the live site
- [ ] Verify `/robots.txt`
- [ ] Verify `/sitemap.xml`
- [ ] Add the site to Google Search Console
- [ ] Submit the sitemap
- [ ] Configure GA4, if desired
- [ ] Apply for AdSense once the site is ready
- [ ] Add real AdSense IDs only after receiving them
- [ ] Review the Privacy Policy after enabling any third-party service
- [ ] Test the mobile layout
- [ ] Test the 404 page
- [ ] Check Core Web Vitals after deployment
