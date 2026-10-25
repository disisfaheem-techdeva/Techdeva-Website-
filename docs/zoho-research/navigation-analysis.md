# Navigation analysis

All observations 2026-10-25. Confidence: **H** = observed directly, **M** = inferred from DOM, **—** = not observed.

## zoho.com — observed

| # | Observation | URL | Viewport | Conf. |
|---|---|---|---|---|
| N1 | Header is `position: sticky; top: 0`, 75px tall, transparent background, z-index 100. | zoho.com | 1024 | H |
| N2 | Top level: logo · Products · Solutions · Customers · Partners · Resources · search icon · language · **Sign In** (red text link). | zoho.com | 1024 | H |
| N3 | **Products** opens on **click** into a full-width mega panel: a top tab row (Apps · Suites · Zoho One · Marketplace · AI), a **left category rail** with a search input ("I'm looking for…") and ~13 categories, a right **card grid** (icon, product name, one-line description, "Try now"), a close ✕ and a bottom "Explore all products" CTA. The trigger turns blue with an up-chevron while open. | zoho.com | 1024 | H |
| N4 | **Escape** closes the mega panel and leaves focus (visible ring) on the Products trigger. | zoho.com | 1024 | H |
| N5 | **Solutions** is a small single-column dropdown (4 industry links). | zoho.com | 1024 | H |
| N6 | **Resources** is a two-column dropdown with headings **LEARN** and **SUPPORT**. | zoho.com | 1024 | H |
| N7 | Product pages use a **two-tier header**: a suite bar (other products + "All Products") above a product bar (Features · Pricing · Platform · Customers · Resources · Free Tools · Ask Zia). | zoho.com/crm | 1024 | H |
| N8 | Mobile (390px): centered logo only at top; a **fixed bottom bar** with a hamburger on the left and a full-width **SIGN UP** CTA. | zoho.com | 390 | H |
| N9 | Mobile drawer contents. | zoho.com | 390 | — |
| N10 | Global footer groups: Apps and Extensions · Learn · Community · Company, ~44 links, then a legal row (Terms, Privacy, Cookie, GDPR…). | zoho.com/customers.html | 1024 | H |

## Patterns adopted for TechDeva (recommendations → implemented)

| Zoho pattern | TechDeva version | Where |
|---|---|---|
| N3 mega menu with category rail + cards | **Platform** mega menu: rail = 4 capability groups (Answer & sell, Run the business, Grow & report, Control & trust) as ARIA tabs; cards = features with **status badges**. No search box (13 items don't need one). | `src/templates/layout.js` `megaMenu()`, `src/js/modules/nav.js`, `tabs.js` |
| N5/N6 dropdowns | **Solutions** (By industry / By need) and **Resources** (Learn / Company). | `src/data/nav.js` |
| N4 Escape returns focus | Same, plus outside-click close, focus-out close, one menu at a time, ArrowDown into panel. | `nav.js` |
| Click-to-open | Click **and** hover-intent (fine pointers only, 180ms close delay). A click right after a hover-open keeps the menu open (bug found and fixed in testing). | `nav.js` |
| N8 bottom action bar | ≤767px: fixed bar with **Menu**, **WhatsApp** and **Start free trial**. | `layout.js` `mobileBar()` |
| N7 product sub-nav | Sticky **"On this page"** sub-nav on product pages with scroll-spy active state. | `product.js` `subnav()`, `scroll.js` |
| N10 footer | Footer columns Platform · Industries · Resources · Company, contact block, legal row. | `layout.js` `footer()` |

Not adopted: language selector (single-language site), global search (19 pages), suite bar (one product).
