# TechDeva website

Marketing site for TechDeva, the AI business operating system for clinics, salons, gyms and academies.
Vite + vanilla JavaScript, prerendered to static HTML. No runtime dependencies.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve dist/ on http://localhost:4173
npm test           # data, content and validator tests
npm run check:links  # after a build: every internal link resolves
```

Requires Node 20.19+.

### Connecting the free-trial form

The trial form posts to the platform's `POST /signup`. It's **off by default**: with no API configured it
validates and then says it isn't connected, so local work can't create real tenants.

```bash
cp .env.example .env.local
# set VITE_API_BASE=https://portal.techdeva.net   (and add the site origin to the API's ALLOWED_ORIGINS)
```

To exercise every response branch locally without the real API:

```bash
node scripts/mock-signup.mjs                      # test double on :8787 — never deploy
VITE_API_BASE=http://localhost:8787 npm run dev
```

## Where things live

```
src/config/site.js     business facts: trial length, contact details, links
src/data/              features (with live/early/development status), pricing, industries, content, nav
src/templates/         html.js (escaping), icons, layout (head, header, footer), components
src/pages/             one module per page or page family — the route list
src/build/             prerender plugin + renderer
src/js/                browser behaviour (menus, tabs, forms…)
src/styles/            tokens → base → layout → components
docs/zoho-research/    research, design system, status and testing report
```

To add an industry, add an entry to `src/data/industries.js`; its page, nav links, footer link and sitemap
entry are generated. Prices and statuses are facts — change them only with founder approval; tests check them.

The `*/index.html` files in the project root are generated on every dev/build run and are git-ignored.
