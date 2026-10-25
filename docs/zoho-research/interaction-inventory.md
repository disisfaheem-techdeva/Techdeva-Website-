# Interaction inventory

Reference observations are from zoho.com on 2026-10-25 unless noted. "Implemented" means built **and**
exercised in the browser (see testing-report.md).

| # | Interaction | Initial state | User action | Result | Layout change | Mobile | TechDeva implementation | Status |
|---|---|---|---|---|---|---|---|---|
| I1 | Mega menu (Products) | Closed, chevron down | Click trigger | Full-width panel under header; trigger highlighted, chevron up | Panel overlays page; header stays sticky | Not shown (drawer instead) | `nav.js` + `megaMenu()`; click + hover-intent; ARIA `aria-expanded` | Implemented |
| I2 | Mega menu close | Open | Escape | Closes; focus on trigger | — | — | Same + outside click + focus-out | Implemented |
| I3 | Category rail | First category selected | Hover/click a category | Right grid switches | Grid content swaps | — | ARIA vertical tabs; hover previews, arrows/Home/End | Implemented |
| I4 | Small dropdown (Solutions/Resources) | Closed | Click | 1–2 column link list under trigger | Overlay | — | `dropdown()`; one menu open at a time | Implemented |
| I5 | Sticky header | Transparent at top | Scroll | Remains at top | Border + shadow after 4px scroll (TechDeva addition) | Yes | `initStickyShadow()` | Implemented |
| I6 | Mobile bottom bar | Visible ≤767px | Tap menu / CTA | Drawer / signup | Fixed at bottom, body padded | Yes | `mobileBar()`; adds a WhatsApp button | Implemented |
| I7 | Mobile drawer | Hidden | Tap Menu | Zoho: **not observed** | — | — | Full-screen dialog, focus trap, scroll lock, Escape, accordion sections (`<details>`) | Implemented |
| I8 | Pricing period toggle | Annually selected, "Save up to 34%" | Click Monthly | Prices change | In place | — | TechDeva has **no annual price**, so the toggle switches **currency (PKR ↔ USD)** — both published on techdeva.net; choice remembered in localStorage | Implemented |
| I9 | Recommended plan | — | — | "Most Popular" badge, darker border, filled red CTA vs outlined | — | Stacks | Gradient border, "Most popular" flag, primary vs secondary CTA | Implemented |
| I10 | FAQ accordion | Collapsed | Click question | Expands | Pushes content | Yes | Native `<details name>` — one open per group, keyboard-native | Implemented |
| I11 | Inline signup in hero | Form visible | Type, submit | (not submitted — no account created on Zoho) | — | — | Not copied: TechDeva's signup needs 3 steps of business data; hero links to `/free-trial/` instead | Not adopted |
| I12 | Floating chat ("We're Online!") | Bottom-right | Click | (not clicked) | — | — | WhatsApp button in mobile bar; no third-party chat widget | Adapted |
| I13 | Product sub-nav | Below hero | Click section | Jumps to section | Sticky under header | Scrolls horizontally | `subnav()` + scroll-spy (`scroll.js`) | Implemented |
| I14 | Filter list (customers) | All | Pick industry | (filter not exercised) | — | — | Resource type chips with `aria-pressed`, empty state | Implemented |
| I15 | Feature tabs | First tab | Click/arrow | Panel switches | — | Tab list scrolls | `tabs()` + `tabs.js` (homepage "What TechDeva is") | Implemented |
| I16 | Scroll reveal | — | Scroll | Sections fade in | — | — | IntersectionObserver; skipped under `prefers-reduced-motion`; content never hidden without JS | Implemented (reduced-motion path code-reviewed only) |
| I17 | Back to top | Hidden | Scroll > 1.2 viewports | Button appears; click scrolls and focuses `<main>` | — | Sits above mobile bar | `initToTop()` | Implemented |
| I18 | Trial wizard | Step 1 | Continue / Back / Enter | Per-step validation; progress `aria-current="step"` | Fieldset swap | Full-width buttons | `trial.js` | Implemented |
| I19 | Form validation | — | Blur / submit | Inline errors, `aria-invalid`, `aria-describedby`, focus first error | — | — | `validate.js` | Implemented |
