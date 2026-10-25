# Component inventory

Every component is a function in `src/templates/` that takes data and returns escaped HTML. No component
hardcodes a business fact; those live in `src/data/` and `src/config/site.js`.

Status: **Done** = built and rendered on at least one page and exercised in testing. **—** = intentionally not built.

## 1. Global

| Component | Purpose | Reference observation | TechDeva version / config | Responsive | States | Accessibility | Status |
|---|---|---|---|---|---|---|---|
| Announcement bar | Proof up front | zoho.com top strip (`ztopstrip`) | `layout.js` — live-in-production note + case-study link | Short copy ≤600px | — | Plain text + link | Done |
| Header | Brand, nav, CTAs | Sticky, 75px (N1) | `header(path)` — logo, nav, Sign in, Book a demo, Start free trial | Nav hidden ≤1023px; Book-a-demo hidden ≤1180px | `is-scrolled`, `has-open-menu`, `is-active` | `<nav aria-label>` | Done |
| Mega menu | Product discovery | N3 | `megaMenu(item)` from `data/nav.js` (rail of groups → cards with status badges) | Desktop only | open/closed, selected tab | ARIA tabs, Escape, focus return | Done |
| Dropdown | Secondary nav | N5/N6 | `dropdown(item)` with titled columns | Desktop only | open/closed | `aria-expanded/controls` | Done |
| Mobile drawer | Mobile nav | N8 (contents N9 not observed) | `drawer(path)` | ≤1023px | open/closed, current section expanded | `role="dialog" aria-modal`, focus trap | Done |
| Mobile action bar | Thumb-reach CTA | N8 | `mobileBar()` Menu · WhatsApp · Start free trial | ≤767px | — | Labelled buttons | Done |
| Primary / secondary / ghost button | CTAs | Red filled vs outlined | `.btn--primary` (gradient), `--secondary`, `--ghost`; sizes sm/md/lg/block | Full-width on mobile in forms/heroes | hover, focus, disabled, busy (spinner) | Visible focus ring | Done |
| Footer + CTA band | Wayfinding, conversion | N10 + "Ready to do your best work?" band | `footer(page)`, `ctaBand(cfg)`; per-page `cta` override or `hideFooterCta` | 5 → 2 columns | — | Landmarks | Done |
| Breadcrumbs | Location | Product pages | `breadcrumbs(items)` + BreadcrumbList JSON-LD | Wraps | current page | `aria-current="page"` | Done |
| Back to top | Long pages | — | `.to-top` | Above mobile bar | hidden/visible | Labelled; focuses main | Done |
| Floating contact | — | Zoho chat bubble (I12) | WhatsApp in mobile bar instead | — | — | — | Adapted |
| Cookie consent | — | — | **Not built**: the site sets no tracking cookies (only an optional localStorage currency preference). Add one if analytics are added. | — | — | — | — |
| Search | — | Zoho global search | Not built (19 pages) | — | — | — | — |

## 2. Heroes — `hero({ layout, eyebrow, title, lead, actions, visual, breadcrumbs, note })`

| Variant | Used on | Status |
|---|---|---|
| Split + product visual (`layout: 'split'`) | Home, AI assistant, Business management, industry pages | Done |
| Centered (`layout: 'centered'`) | Features, Automation, Integrations, Industries, Pricing, Resources, Case study, About, Contact, Demo, 404 | Done |
| Trial hero (intro + form) | `/free-trial/` (`.trial__layout`) | Done |
| Video / animation hero | — (no real product video available) | — |

## 3. Features

| Component | Function | Status |
|---|---|---|
| Feature grid + card (icon, status badge, link) | `featureGrid(items, {cols})`, `featureCard()` | Done |
| Alternating rows (text ↔ visual) | `featureRows(rows)` | Done |
| Tabs | `tabs({id, label, items})` | Done |
| Workflow (numbered, AI/You owner chip) | `workflow(steps, {compact})` | Done |
| Numbered steps | `steps(list)` | Done |
| Integration grid | `integrationCards(list)` | Done |
| Industry cards | `industryCards(list)` | Done |
| Limits list ("never allowed to") | `limitsList(pairs)` | Done |
| Product mockups | `dashboardMock`, `chatMock`, `approvalMock`, `pipelineMock`, `assistantMock` — original HTML/CSS, captioned "Illustrative interface · sample data" | Done |
| Statistics | `statsBand(proof)` — always prints its source line | Done |
| Status badge | `statusBadge('live'|'early'|'development')` | Done |

## 4. Conversion

| Component | Function | Status |
|---|---|---|
| Pricing cards (inheritance "Everything in X, plus") | `pricingCards()` | Done |
| Currency toggle | `currencyToggle()` + `pricing.js` | Done |
| Comparison table (generated from plan `includes`) | `comparisonTable()` | Done |
| FAQ accordion + FAQPage JSON-LD | `faqList(items, name)`, `faqSchema(items)` | Done |
| Terms grid | `termsGrid(pairs)` | Done |
| Final CTA band | `ctaBand()` | Done |
| Trial wizard | `pages/free-trial.js` + `trial.js` | Done |
| Contact / demo form | `contactForm(mode)` + `contact.js` | Done |
| Newsletter form | — no list or endpoint exists | — |
| Testimonial | — no authentic quote available; would be fabricated | — |

## 5. Supporting

| Component | Status |
|---|---|
| Resource card + filter chips + empty state | Done |
| Logo strip (track-record brands as text, no logos) | Done |
| Banner (enterprise / multi-branch) | Done |
| Tag list ("asked for, not built") | Done |
| Notice (warning), note card (gold), form status (error/info), success panel | Done |
| Loading state (button spinner + `aria-busy`) | Done |
| Pagination, search results | — (6 resources) |
