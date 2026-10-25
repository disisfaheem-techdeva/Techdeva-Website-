# Implementation status — 2026-10-25

## Done and verified

- 19 prerendered pages (sitemap.md), one shared layout, 30+ reusable components (component-inventory.md).
- Mega menu, dropdowns, mobile drawer, mobile action bar, sticky header, sub-nav scroll-spy, tabs, FAQ,
  currency toggle, resource filter, reveal, back-to-top.
- Free-trial wizard calling `POST {VITE_API_BASE}/signup` with the API's exact field names and rules; all
  response branches (200/409/422/429/5xx/network) handled; success shown only on 2xx with a `tenant_id`.
- Contact and demo forms: validated, hand off to WhatsApp or email; never claim delivery.
- SEO: unique title/description, canonical (not on 404), Open Graph, Organization + BreadcrumbList + FAQPage +
  SoftwareApplication/Offer + Article JSON-LD, generated `sitemap.xml`, `robots.txt`, one `<h1>` per page.
- Accessibility: skip link, landmarks, ARIA menus/tabs/dialog, focus management, visible focus, labelled
  fields with linked errors, AA contrast, reduced motion.

## Integrations — what actually works

| Integration | Works? | Notes |
|---|---|---|
| `POST /signup` | **Client works against a local test double.** Not tested against the real API. | Off by default (`VITE_API_BASE` empty → form refuses and links to the hosted signup). Needs CORS on the API. |
| Contact / demo | Works as a **hand-off** (wa.me / mailto). | No backend endpoint exists. Nothing is stored. |
| Sign in | Link to `https://portal.techdeva.net/` | Existing portal; untouched. |

## Not done / honest gaps

1. **Official logo** not used — the site shows an original placeholder mark. Drop the real file in `public/`
   and swap `logoMark()` in `src/templates/icons.js`.
2. **No share image** (`site.ogImage = null`, so `twitter:card` is `summary`).
3. **No real product screenshots**; mockups are labelled sample data.
4. **No testimonials, customer logos as images, certifications or user counts** — none were verifiable.
5. **Blog and Academy** are not rebuilt; resource cards link to the live blog.
6. **No analytics / tracking** (none authorised) and therefore no cookie banner.
7. **Redirects and deployment** not done (no production change was authorised).
8. **REA not run** (Node 24.19 < 24.22.1 requirement; setup declined in-session).
9. Zoho's mobile drawer contents were not observed.
10. Real-device touch testing not done (viewport emulation only).
11. `prefers-reduced-motion` path verified by code review, not by emulation (tool couldn't emulate it).
12. Lighthouse / performance scores **not measured**. Bundle sizes are known (below).

## Decisions waiting on the founder

1. ~~Trial length~~ — **decided 2026-10-25: 7 days.** Site already says 7; backend change (`interval '14 days'`
   → `'7 days'` in `provision_tenant_from_signup`) is with the founder.
2. Feature statuses — current labels: Live = WhatsApp agent, CRM, appointments, invoices, stock, team, approvals,
   isolation · Early access = Jarvis, reporting/ad results · In development = growth advisor, FB/IG posting, ad autopilot.
3. Whether and when to connect the public form to `/signup` (server security gate).

## Motion layer (added 2026-10-25)

GSAP 3D animation across the site — see motion-system.md. Built and tested, including reduced motion.
Not done: frame-rate profiling on real low-end phones.

## Build output (vite 7.3.7, last build)

- CSS 48.6 kB (10.2 kB gzip); app JS 17.7 kB (6.8 kB gzip); GSAP chunks loaded lazily only when motion is
  allowed: core 27.7 + ScrollTrigger 18.1 + SplitText 3.4 + scenes/effects 3.1 kB gzip. No images.
