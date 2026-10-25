# Testing report — 2026-10-25

Environment: Windows 11, Node v24.19.0, Vite 7.3.7, Claude desktop built-in browser (Chromium).
Everything below was **executed**; anything not executed is listed at the end.

## 1. Build and static checks

| Check | Command | Result |
|---|---|---|
| Production build | `npm run build` | ✅ Pass — 19 HTML pages, 1 CSS, 1 JS, sitemap.xml |
| Unit + content tests | `npm test` | ✅ 13/13 pass |
| Internal link check on `dist/` | `npm run check:links` | ✅ 19 pages, 0 broken internal links; 28 external destinations listed |
| Lint | — | ⚠ Not run: no linter is configured in this project |

Content tests assert: prices equal the published techdeva.net packages; every tier includes the one below;
every status is known; every proof figure has a source; one `<h1>`, title and description per page; no
internal link to a missing page; only the configured trial length appears; no in-development feature sits
next to a Live badge. Validator tests assert the client rules equal the API's (`EMAIL_RE`, URL rule,
password length/diversity/weak list, angle brackets).

## 2. Responsive sweep (browser, sized iframes)

19 pages × widths **360, 390, 768, 1024, 1440, 1920** = 114 renders. Horizontal overflow: **0**.
(The comparison table scrolls inside its own labelled region at 390px, by design.)

Visual checks by screenshot: 1440 homepage, 390 pricing. Found and fixed: breadcrumb list numbers showing
("1. Home 2."), announcement wrapping to 3 lines on phones, stats values misaligned, hero chat mock covering
the dashboard mock.

## 3. Interaction tests (scripted in the browser)

| Area | Checks | Result |
|---|---|---|
| Mega menu | click opens; ArrowDown/End/wrap in rail; Escape closes and returns focus; reopen; outside click closes; only one menu open | ✅ 10/10 after fix |
| **Bug fixed** | hover opened the menu and the following click closed it | Fixed in `nav.js` (click within 600ms of hover-open keeps it open) |
| Mobile drawer (390px) | opens from bottom bar; body scroll lock; `aria-expanded`; focus inside; Tab and Shift+Tab wrap; Escape closes, unlocks, returns focus; current section expanded | ✅ all |
| Mobile bar / header | bar visible ≤767, desktop nav hidden | ✅ |
| Pricing | PKR→USD swaps all prices (USD 99/199/299); stored; FAQ exclusive open; table scrolls in wrapper, no page overflow | ✅ |
| Resources filter | case-study only; `aria-pressed`; back to all 6; empty state hidden | ✅ |
| Homepage tabs | click selects panel; ArrowRight moves focus | ✅ |
| Trial wizard (no API) | 24 checks: required/angle/url/email/password/consent errors, `aria-invalid` + `aria-describedby`, focus first error, conditional "other" field, competitor add/remove, step gating, back, refusal message, success not shown, URL clean | ✅ all |
| Trial wizard (local test double `scripts/mock-signup.mjs`) | 409 → email field error; 429 → message; 500 → message; 422 → mapped to Business name and jumps to step 1; 200 → success panel with tenant id, form hidden, focus moved; button busy during each request | ✅ all |
| **Bug fixed (security)** | Submitting before the script loaded did a native **GET**, putting email and password in the URL | Fixed: `method="post"`, submit buttons disabled until JS arms them, `<noscript>` notice |
| Contact form | 5 errors on empty submit; phone rule; topic preselected from `?topic=sales`; WhatsApp URL `wa.me/923354693665` contains the message; blocked-popup path reports honestly; nothing claims delivery | ✅ all (window.open stubbed — no message was sent) |

## 4. Accessibility

| Check | Result |
|---|---|
| Accessible names on all links/buttons (17 pages) | ✅ |
| Labels on all fields | ✅ (currency radios use wrapping labels) |
| Heading order | Found 2 skips (pricing, resources) → fixed, re-verified |
| Duplicate IDs | Found logo gradient `td-g` ×3 per page → fixed (unique ids), re-verified |
| `aria-controls` / `aria-labelledby` targets exist | ✅ |
| Contrast (computed) | All text tokens ≥ 5.35:1; placeholder raised from 4.23 → ~5.3:1 |
| Console errors | None observed on pages loaded |

## 5. Motion / 3D pass (GSAP 3.15) — executed 2026-10-25

| Check | Result |
|---|---|
| Build, 13 tests, link check after adding GSAP | ✅ / ✅ 13/13 / ✅ 0 broken |
| Motion initialises with no console errors (home) | ✅ 18 split lines, story pinned, 23 tilt cards, counters armed, progress bar |
| Hero 3D stage, gradient headline survives line split | ✅ screenshot 1440px |
| Pinned story: active step + messages follow scroll | ✅ step 3 active, 4/9 messages shown at mid-scroll |
| **Bug fixed:** pinned section taller than a 900px viewport | Pin the story block only; device height capped to viewport → block spans 93–648px |
| **Bug fixed:** orbit core drew over nodes passing in front | Core moved into the ring's 3D context (depth-sorted) |
| **Bug fixed:** 8–11px horizontal overflow at 360/390 on `/ai-assistant/` from the orbit's 3D projection | `.section { overflow-x: clip }` → 0 |
| Overflow sweep with motion running: 13 pages × 6 widths | ✅ 0 after fix (78 renders + 6 re-checks) |
| Crowding at exactly 1024px | Type scale tuned, left chip pulled in |
| Regression: mega menu, trial form armed + validates, contact armed, USD toggle (prices visible after flip) | ✅ |
| **Reduced motion** (matchMedia shimmed before any script) | ✅ 0 GSAP requests, nothing hidden, no split, story static with all messages, menu works |
| Mobile 390 hero | ✅ screenshot |

Note: in this test environment the app window was often hidden, which pauses `requestAnimationFrame`, so
some screenshots caught intros at frame 0. Live measurements (opacity 1, 31 fps) confirmed they complete.

## 6. Not executed

- Real `/signup` on the TechDeva API (deliberately — no production accounts; no local Postgres/Redis stack started).
- Real touch devices; Safari/Firefox.
- Keyboard-only walkthrough by a person (scripted keyboard events only).
- `prefers-reduced-motion` via real OS setting (tested with a `matchMedia` shim instead — see §5).
- Frame-rate profiling of the 3D scenes on a mid-range phone.
- Lighthouse, Core Web Vitals, real-network performance.
- External link fetching (listed by `check:links`, not requested).
- Browser back/forward: standard multi-page navigation (no client router), not separately scripted.
