# Project audit

Date: 2026-10-25 · Author: Claude (Opus 5.5) for TechDeva

## 1. What existed before this work

| Location | What it is | Relevant finding |
|---|---|---|
| `C:\Users\user\Desktop\RE` | Working directory | **Empty.** Not a git repo. This is where the new site was built. |
| `Desktop\contonment board` (newest copy, files dated to 2026-10-22) | TechDeva AIBOS platform: FastAPI (`app/main.py`), Postgres RLS schema (`db/`), Redis worker, orchestrator, static pages in `web/` | Not a git repo. Contains the **backend contract the website must call**. |
| `Desktop\contonment board\techdeva-web` | Next.js 16 + React 19 + Tailwind 4 app: marketing stubs, client portal, founder console | Its `/pricing` page says "Talk to us". Uses `#8b5cf6` violet — not the live brand. |
| `Desktop\techdeva\techdeva-platform-master` | Older copy of the same platform | Superseded by the folder above. |
| `Desktop\Techdeva content\images` | 23 marketing posters (1254×1254 PNG) + WhatsApp photos/videos | AI-generated social posters with invented figures ("+42%", "120 leads"). **Not used as product screenshots** — see §5. |
| https://techdeva.net | Live public site | **WordPress 7.1.3** (meta generator). Its source is not on this machine (confirmed by the founder, 2026-10-25). |

The brief assumed an existing Vite + vanilla-JS marketing repo. **No such repo exists locally**; the founder
confirmed the live site's source isn't on the laptop and asked for a full rebuild. The rebuild therefore
follows the brief's stated stack (Vite, vanilla JS, no React) as a new project in `RE/`, and does not modify
any existing project.

## 2. Backend contract (verified by reading `contonment board/app/main.py`)

| Endpoint | Auth | Used by the site | Notes |
|---|---|---|---|
| `POST /signup` | none (public, rate-limited 3/IP/hour, 1/email) | `/free-trial/` | Body `SignupIn`: `business_name` (2–120, no `<>`), `industry`, `website_url` (https:// prefixed), `social_links{}`, `competitors[]`, `contact_email`, `contact_phone`, `contact_name`, `password` (≥10 chars, ≥5 distinct, not in a weak list). Returns `tenant_id`, `login_created`. 409 if email exists, 429 on rate limit, 422 on validation. |
| `POST /leads` | tenant header / session | — | Not public; cannot back a contact form. |
| any contact/demo endpoint | — | — | **Does not exist.** |

CORS: `ALLOWED_ORIGINS` env, default `*` (dev only, with credentials disabled). For the site to call
`/signup` cross-origin, the API must list `https://techdeva.net` in `ALLOWED_ORIGINS`.

## 3. Brand (observed on techdeva.net, 2026-10-25, 1024px)

- Body background `rgb(14,14,14)`, body text `rgb(181,181,181)`, body font **Inter**.
- H1: **Space Grotesk** 700, 70px, white.
- Accent: green→cyan gradient (`#34D399 → #22D3EE` in the platform's `signup.html`), gold `#D4AF5F` for notes.
- Logo: `wp-content/uploads/2025/08/Untitled-design-12.png` (50px). Not downloaded — see limitations.

## 4. Conflicts found (need a founder decision)

1. **Trial length.** Live site, FAQ and brief: **7 days**. Platform `provision_tenant_from_signup()`:
   `trial_ends_at = now() + interval '14 days'` (its docstring says 7). **Resolved 2026-10-25: the founder
   chose 7 days.** The site shows 7 (`src/config/site.js`); the founder is changing the backend interval to 7.
2. **Feature status.** `/platform/` sells posting, live ad results, ad autopilot and Jarvis as package
   features; `/ai-workforce/` labels Reporting "Early access" and Ads/Content "In development". The
   rebuild uses the more conservative labels (`src/data/features.js`).
3. **Customer count.** Case study page: 71 customers; the `service-business-crm` skill: 82. The rebuild
   publishes neither — only the five figures shown with a source on the live site.
4. **Contact page FAQ** on the live site describes SEO/web-design agency services, which contradicts the
   product positioning. Not carried over.
5. **`/signup` exposure.** The `techdeva-operating-instructions` skill states the security gate is not
   closed on the server and `/signup` "cannot go public until it is". The trial form is built to call it,
   but only when `VITE_API_BASE` is set — deciding to set it in production is the founder's call.

## 5. Risks and constraints applied

- No secrets, `.env` files or deployment configs were read into or written by this project.
- No production deployment, no production signup was submitted.
- The marketing posters contain fabricated dashboard numbers; using them as "screenshots" would violate the
  never-fabricate invariant. Original HTML/CSS mockups labelled "Illustrative interface · sample data" are used instead.
- Pricing is copied exactly from techdeva.net/pricing and covered by a test; changing it is a founder decision.
