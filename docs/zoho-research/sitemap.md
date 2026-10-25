# Sitemap

## Reference: zoho.com (sections inspected 2026-10-25)

| URL | Inspected | What was recorded |
|---|---|---|
| https://www.zoho.com/ | Yes (1024, 390) | Header, Products mega menu, Solutions & Resources dropdowns, 10 homepage sections, mobile bottom bar |
| https://www.zoho.com/crm/ | Yes (1024) | Two-tier header, product sub-nav (25 feature links), split hero with inline signup form, 10 sections incl. FAQ |
| https://www.zoho.com/crm/zohocrm-pricing.html | Yes (1024) | Product tabs, annual/monthly toggle with "Save up to 34%", 4 plan cards, "Everything in X +" inheritance, "Most Popular" badge, floating chat |
| https://www.zoho.com/customers.html | Yes (1024) | Industry filter list (~15+), global footer (4 groups, 44 links) |
| Industry, partner, careers, blog, developer pages | **Not inspected** | Out of scope for a 19-page site |

## Reference: techdeva.net (live WordPress site, inspected 2026-10-25)

`/`, `/platform/`, `/how-it-works/`, `/ai-workforce/`, `/solutions-aesthetic-clinics/`, `/solutions-salons/`,
`/solutions-training-academies/`, `/solutions-gyms/`, `/pricing/`, `/faq/`, `/blog/`,
`/case-study-beauty-aesthetic-lounge/`, `/about-us/`, `/contact/`, `/book-a-demo/`, `/academy/` — all returned 200.

## Implemented TechDeva site (19 pages)

```
/                                   Homepage
/features/                          All capabilities, grouped, with status
/ai-assistant/                      Hermes (WhatsApp) + Jarvis (owner console) + limits
/business-management/               CRM, appointments, invoices, stock, team
/automation/                        Orchestrator pipeline, rules, reliability, 10-step go-live
/integrations/                      Integrations with live / early / in-development labels
/industries/                        Industry index (template-driven)
  /industries/aesthetic-clinics/
  /industries/salons/
  /industries/training-academies/
  /industries/gyms/
/pricing/                           Starter / Growth / Pro, PKR↔USD, comparison, terms, FAQ
/resources/                         Filterable library
  /resources/beauty-aesthetic-lounge/   Case study
/about/
/contact/                           Validated form → WhatsApp / email hand-off
/book-a-demo/                       Same template, demo mode
/free-trial/                        3-step signup → POST /signup
/404.html                           noindex
```

`sitemap.xml` is generated at build time from the same page list (18 URLs; 404 excluded). `robots.txt` points to it.

### Redirects needed when this replaces WordPress (not implemented — hosting config)

| Old | New |
|---|---|
| /platform/ | /features/ |
| /how-it-works/ | /automation/#go-live |
| /ai-workforce/ | /ai-assistant/ |
| /solutions-aesthetic-clinics/ | /industries/aesthetic-clinics/ |
| /solutions-salons/ | /industries/salons/ |
| /solutions-training-academies/ | /industries/training-academies/ |
| /solutions-gyms/ | /industries/gyms/ |
| /case-study-beauty-aesthetic-lounge/ | /resources/beauty-aesthetic-lounge/ |
| /about-us/ | /about/ |
| /faq/ | /pricing/#faq |
| /blog/, /academy/ | Keep on WordPress or migrate — not rebuilt here |
