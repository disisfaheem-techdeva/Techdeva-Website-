# Page mapping — reference pattern → TechDeva page → content source

| TechDeva page | Zoho pattern borrowed (structure only) | Content source (all observed 2026-10-25) |
|---|---|---|
| `/` | Homepage: hero + featured-apps grid, brand trust band, values, stats band, footer CTA | techdeva.net `/` (positioning, workforce, control & trust, proof, how it works, pricing teaser) |
| `/features/` | All-products page grouped by category; product sub-nav | techdeva.net `/platform/` (12 capabilities) + `/ai-workforce/` (status labels) |
| `/ai-assistant/` | Product page (Zia AI section, alternating rows) | `/ai-workforce/` (Hermes, limits), `app/console.py` docstring (Jarvis behaviour), `/how-it-works/` (Business Brain) |
| `/business-management/` | Product page with 360° module list | `/platform/` (CRM, appointments, invoices, stock, team), `service-business-crm` skill §2 money rules |
| `/automation/` | Workflow-automation feature page | Platform `README.md` (orchestrator rules, retries, atomic claims, dependencies), `/how-it-works/` (10 steps) |
| `/integrations/` | Integrations grid | `/platform/` and `/ai-workforce/` statuses; `app/oauth.py` exists for Meta/Google |
| `/industries/*` | "Zoho for Retail/Healthcare…" solution pages | `/solutions-aesthetic-clinics/`, `/solutions-salons/`, `/solutions-training-academies/`, `/solutions-gyms/` |
| `/pricing/` | CRM pricing page: toggle, plan cards, inheritance, "Most Popular", comparison, FAQ, enterprise CTA | techdeva.net `/pricing/` — prices, numbers, chats, payment methods, terms |
| `/resources/` | Resources dropdown → library; customers page filter | `/blog/` (titles and dates only), case study |
| `/resources/beauty-aesthetic-lounge/` | Customer story | `/case-study-beauty-aesthetic-lounge/` + homepage figures |
| `/about/` | Company page | `/about-us/` (mission, vision, founder name, beliefs) |
| `/contact/`, `/book-a-demo/` | Contact page | `/contact/` (address, phone, email, hours), `/book-a-demo/` |
| `/free-trial/` | Signup form | Platform `web/signup.html` + `SignupIn` in `app/main.py` |

## Facts and their provenance

| Fact | Value | Where it came from |
|---|---|---|
| Trial | 7 days, no card, no setup fee | techdeva.net `/`, `/faq/`, `/pricing/` (backend says 14 — conflict) |
| Prices | Starter PKR 19,999 / USD 99 · Growth 49,999 / 199 · Pro 64,999 / 299 per month | `/pricing/` |
| Limits | 1 / 2 / 5 WhatsApp numbers · 300 / 1,500 / 4,000 AI chats | `/pricing/` |
| Proof | 39 leads, 36 booked, 9s first reply, PKR 507,005 invoiced, PKR 480,300 collected | `/` and case study page |
| Contact | 0335 469 3665 · admin@techdeva.net · Orange Square Plaza, GT Road, Lahore · Mon–Sat 11–7 | `/contact/` |
| Track record brands | Tacoma, CustomPack Packaging, Tech Nexus, I Get Solution | `/` image alt text ("client logo") |
| Founder | Syed Faheem Abbas Zaidi | `/about-us/` |

## Deliberately not carried over

- "Same tools bought separately … You save USD 114 (54% less)" comparison: it relies on third-party list prices
  and an exchange rate that go stale; re-add only with a dated source.
- "15+ Years Experiences" and agency-services FAQ on `/about-us/` and `/contact/`: unsupported / off-positioning.
- The Academy courses (`/academy/`) — a separate offer; link left to the live site.
