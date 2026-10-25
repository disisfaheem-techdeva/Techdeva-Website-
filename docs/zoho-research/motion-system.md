# Motion system (GSAP + CSS 3D) — 2026-10-25

## Sources used

| Source | What was taken | What was not |
|---|---|---|
| **ui-ux-pro-max** skill (`nextlevelbuilder/ui-ux-pro-max-skill` @ `d14efff`), local search tool run with `--design-system --motion 9 --variance 6 --density 3` and `--domain gsap` / `--domain ux` | Pattern "Product Demo + Features"; GSAP presets: decorative-only parallax (5–15% deltas), scrub 0.5–1.5, **≤1–2 pinned sections per page**, `quickTo` magnetic pull clamped to ×0.3 on ≤1–2 elements, `ScrollTrigger.batch` reveals, stagger ≤8; UX rules: transform/opacity only, reduced motion, 1–2 key animated elements per view | Its generated palette (purple `#7C3AED`) — conflicts with TechDeva's established green→cyan brand, which the brief says to keep |
| **apple-design** skill (`dickwu/apple-design-skill` @ `914b6a3`), `references/hig/motion.md`, `liquid-glass.md`, `design-principles.md` | Motion must be purposeful and optional; let people cancel motion; Reduce Transparency → opaque fallback; Increase Contrast → stronger borders; glass only on the functional layer (header, sub-nav, mobile bar, floating chips), never on content; large display type | Native-only guidance (SF Symbols, haptics, iPhone Duo) |
| zoho.com (earlier research) | Rich product storytelling sections | — |

Both skills are installed in `~/.claude/skills/` (`ui-ux-pro-max`, `apple-design`). Note: ui-ux-pro-max's
SKILL.md calls its tool via `${CLAUDE_PLUGIN_ROOT}/.claude/skills/...`; installed as a user skill the script is at
`~/.claude/skills/ui-ux-pro-max/scripts/search.py`.

## Architecture

```
src/js/motion/index.js    loader: reduced motion → stop; else dynamic-import gsap, ScrollTrigger, SplitText
src/js/motion/scenes.js   heroIntro, heroStage (3D product stage), story (pinned), orbits (3D ring)
src/js/motion/effects.js  progressBar, splitHeadings, reveals, tilt, counters, parallaxVisuals, magnetic, priceFlip
src/styles/motion.css     every scene as a finished static 3D composition + a11y media queries
```

- GSAP **3.15.0** (standard no-charge licence; SplitText included). Loaded **lazily** as separate chunks
  (~52 kB gzip total) **only when motion is allowed** — reduced-motion visitors never download it.
- Everything runs inside `gsap.matchMedia`; toggling the OS setting mid-visit reverts all tweens, triggers,
  listeners and DOM changes via returned cleanups.
- Progressive enhancement: without JS (or before it loads) every scene is a complete static layout. An inline
  head script hides only the hero intro elements while GSAP loads and un-hides them after **2s** no matter what.

## Inventory

| Effect | Where | Behaviour | Desktop / mobile |
|---|---|---|---|
| 3D product stage | Home hero | Dashboard, chat and 3 status chips at different Z depths (−40 → 150px); enters with rotateX; follows pointer ±7°; turns to face the viewer and lifts as you scroll | Pointer + scroll ≥1024; static flat stack <768 |
| Hero light field | Every hero | 3 blurred orbs drift (decorative), perspective grid floor drifts | All (CSS anim disabled under reduced motion) |
| Split headlines | Every h1 + section h2 | SplitText lines rise from a mask with rotateX; `autoSplit` re-splits on resize; aria-label keeps the full text | All |
| **Pinned story** (1 per site) | Home "How a lead moves" | Story block pins; scroll selects the active step; phone shows the conversation up to that step and turns in 3D | ≥1024 only (no pinning on phones) |
| Business Brain orbit | Features hero, AI assistant | Capability nodes orbit a core on a tilted ring (one CSS variable `--spin` tweened); tilt opens on scroll; slows on hover; paused off-screen | All; labels hidden <768 |
| 3D flip-up reveals | All `.reveal` cards | Batches rise with rotateX −22° → 0 | All |
| Card tilt + glare | Feature, industry, integration, plan, resource, limit, terms cards | ±4.5° pointer tilt, moving highlight | Fine pointers only |
| Counters | Proof stats | Count up to the **real published value**; screen readers get the final value only | All |
| Visual parallax | Product page rows | Mockups turn toward the reader (rotateY ±22° → ∓6°) | ≥1024 |
| Magnetic CTA | Hero primary button only | Clamped pull (×0.25/0.35), elastic return | Fine pointers |
| Price flip | Pricing toggle | Amounts flip on rotateX when PKR↔USD changes | All |
| Scroll progress | Every page | 2px gradient bar | All |

## Rules kept

1. Only `transform`/`opacity` (and two CSS variables driving transforms) are animated.
2. One pinned section on the whole site.
3. Parallax/3D movement on decorative layers and mockups only — never body copy or controls.
4. No number is animated to anything but its published value.
5. Reduced motion: no GSAP, no CSS loops. Reduced transparency: opaque surfaces. Increase contrast: stronger lines, no orbs.
