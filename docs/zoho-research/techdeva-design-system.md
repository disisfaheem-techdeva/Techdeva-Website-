# TechDeva design system

Source of truth: `src/styles/tokens.css`. Brand values were taken from the live techdeva.net (2026-10-25);
structure and rhythm were informed by zoho.com. **No Zoho colours, fonts (Zoho Puvi), logos or assets are used.**

## Colour

| Token | Value | Use | Contrast on `--bg` |
|---|---|---|---|
| `--bg` | `#0b0d10` | Page (live site: `#0e0e0e`) | — |
| `--bg-alt` | `#0f1216` | Alternating sections (Zoho alternates `#f8f9fb`/white the same way) | — |
| `--surface` / `-2` / `-3` | `#13171c` / `#181d24` / `#1f2630` | Cards, raised, selected | — |
| `--line` / `--line-strong` | `#242b35` / `#323b48` | Borders | — |
| `--text` | `#f3f6fa` | Headings | 17.95:1 |
| `--text-2` | `#c2cad5` | Body | 11.77:1 |
| `--muted` | `#8f9aaa` | Secondary text | 6.83:1 (5.35:1 on surface-3) |
| `--green` → `--cyan` | `#34d399` → `#22d3ee` | Brand gradient (`--grad`), links, icons | 10.1 / 10.8:1 |
| `--on-accent` | `#04140f` | Text on gradient buttons | 9.8:1 on green |
| `--gold` | `#d4af5f` | "Note" callouts, human-owned steps | 9.35:1 |
| `--live` / `--early` / `--dev` | green / cyan / `#f0a83c` | Status badges | ≥ 9.6:1 |
| `--danger` | `#f2777a` | Errors, "never allowed" icons | 7.13:1 |

All text pairs meet WCAG 2.2 AA (4.5:1); ratios computed in this session. Placeholder text was raised from
4.2:1 to 5.3:1 during testing.

## Typography

- Display: **Space Grotesk** 500/600/700 (live site H1). Body: **Inter** 400–700. Loaded from Google Fonts with
  `display=swap` and preconnect; system fallbacks defined.
- Scale (fluid with `clamp`): xs 12 · sm 14 · base 16 · md 18 · lg 20 · xl 24–30 · 2xl 30–42 · 3xl 36–60px.
- Line height: tight 1.1 (hero), snug 1.3 (headings), body 1.65. Headings use `text-wrap: balance`.
- Letter-spacing: −0.035em hero, −0.02em headings, +0.14em uppercase eyebrows.

## Space, layout, grid

- 4px base: `--s-1`…`--s-9` = 4, 8, 12, 16, 24, 32, 48, 64, 96px. Sections: `--section-y` 56–104px fluid.
- Content width 1200px (`--container`), narrow 820px for FAQ/prose; gutter 16–32px fluid.
- Grids: `.grid--2/3/4`; 4→2 cols ≤1100px, 3→2 ≤1023px, all →1 ≤767px.
- Breakpoints: **1180** (header secondary CTA hides), **1023** (desktop nav → drawer, split heroes stack),
  **767** (mobile bar, single column), **600** (short announcement).

## Shape, depth, motion

- Radii: 8 / 12 / 16 / 22 / pill. Cards 16, plans 22, buttons 12.
- Shadows: `--shadow-1/2/3` and `--glow` (cyan, primary buttons and featured plan only).
- Motion: 140 / 220 / 480ms, `cubic-bezier(.2,.7,.2,1)`. Used for menu entry, hover lift (−1/−2px), reveal.
  `prefers-reduced-motion: reduce` sets all durations to 0 and the reveal script never hides content.

## Controls

- Buttons: primary (gradient, dark text), secondary (surface + strong border), ghost; heights 38/44/52px —
  all ≥ 44px touch targets except `--sm` in the desktop header.
- Inputs: 48px min height, 12px radius, cyan focus ring + `aria-invalid` red border; errors below the field.
- Focus: `--focus` two-ring outline (bg + cyan) on every interactive element.

## Icons

Original 24px line set (`src/templates/icons.js`), 1.7 stroke, round caps, `currentColor`, `aria-hidden`.
The logo is an original placeholder mark (gradient "T" tile) until the official asset is added — see
implementation-status.md.

## Rules

1. Every capability shown carries a status badge from `STATUS` (live / early access / in development).
2. Every number shown carries a source line. No source → no number.
3. Product visuals are original mockups captioned "Illustrative interface · sample data".
4. One primary CTA per view region; "Start free trial" (primary) + "Book a demo" (secondary).
