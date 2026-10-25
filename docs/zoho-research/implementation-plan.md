# Implementation plan (as executed)

## Architecture decision

**Problem.** No existing frontend repo; the brief fixes Vite + vanilla JS. A marketing site needs real HTML per
route for SEO and link previews, but hand-writing 19 HTML files duplicates header/footer and invites drift.

**Decision.** Vite multi-page build with a small in-repo plugin (`src/build/plugin.js`) that **prerenders**
every page from JS template functions at dev/build time. Pages are data + components; JS in the browser only
adds interactions. Zero runtime dependencies; Vite is the only devDependency.

**Rejected.** (a) SPA with a client router — content invisible without JS, worse SEO. (b) React/Next — the brief
says not React, and the existing Next app is a separate product surface. (c) Hand-written HTML — duplication.

**Consequence.** Generated `*/index.html` files appear in the project root during dev/build; they are
git-ignored and marked "generated — edit src/". The page list is the single source for routes, the sitemap and tests.

## Steps

1. ✅ Audit machine, platform backend and live site (project-audit.md).
2. ✅ Read REA; record why it could not run (research-methodology.md).
3. ✅ Observe zoho.com navigation, product, pricing, customers pages.
4. ✅ Data layer: `src/config/site.js`, `src/data/*.js` with statuses and provenance comments.
5. ✅ Templates: `html.js` (escaping), `icons.js`, `layout.js`, `components.js`.
6. ✅ Pages: home, 5 product pages, industries (index + 4 from one template), pricing, resources + case study,
   about, contact + demo, free trial, 404.
7. ✅ Styles: tokens → base → layout → components.
8. ✅ Behaviour modules: nav, tabs, pricing, filter, reveal, scroll, validate, contact, trial.
9. ✅ Tests: node:test unit/content tests, link checker, browser interaction + layout sweeps.
10. ✅ Docs (this folder).

## Next (needs a decision or access)

| Item | Owner | Why it's blocked |
|---|---|---|
| Set `VITE_API_BASE` and add the site origin to the API's `ALLOWED_ORIGINS` | Founder | Exposing `/signup` publicly is gated on the server security review |
| Change backend trial interval from 14 to 7 days (decided 2026-10-25) | Founder | Backend change, outside this repo |
| Confirm feature statuses (Jarvis, ad results, posting, autopilot) | Founder | Live site contradicts itself |
| Official logo + 1200×630 share image in `/public`, set `site.ogImage` | Founder / design | Assets not on this machine |
| Public lead endpoint (e.g. `POST /public/enquiry` → `lead.created`) to replace the WhatsApp hand-off | Backend | No such endpoint; would need rate limiting like `/signup` |
| 301 redirects from WordPress URLs (sitemap.md) and deployment to Hostinger | Founder | Production change |
| Real product screenshots (from the portal, with demo data) | Founder | Posters contain invented figures |
