# Research methodology

## Tools actually used

| Tool | Status | Used for |
|---|---|---|
| **REA** (`github.com/morluto/rea`, v6.7.0, commit `9140dea`) | Cloned and docs read. **CLI not run.** | Method: REA's browser-observation contract (passive CDP capture of DOM structure, accessibility nodes, scripts, screenshots) shaped what was recorded below. |
| Claude desktop built-in browser (Chromium) | Used | Navigation, screenshots, DOM/computed-style extraction via in-page JS, interaction testing. |
| `fetch` + `DOMParser` inside techdeva.net | Used | Reading the text of 15 techdeva.net pages same-origin. |

### Why REA wasn't run

1. **Node version.** REA `package.json` → `engines.node: "^22.23.4 || ^24.22.1 || >=26.12.1"`. This machine has
   **Node v24.19.0**, below the 24.x minimum.
2. **Setup was declined.** The attempt to run `npx rea-agents@6.7.0 --version` was rejected by the user in this
   session, so `npx rea-agents setup` (which edits agent/MCP configuration) was not run either.
3. **Prerequisite.** REA's website tools (`inspect_web_page`, `capture_web_screenshot`, `observe_web_session`)
   attach to a user-owned Chrome started with an explicit `--remote-debugging-port`; none was configured.

To enable REA later: upgrade Node to ≥ 24.22.1, start Chrome with `--remote-debugging-port=9222`, run
`npx rea-agents setup`, review its proposed changes, restart the agent, then call `list_browser_targets`.

## Procedure

1. Read the live techdeva.net first (brand, real copy, prices, proof) so the reference informs structure only.
2. Visit zoho.com pages at 1024px and 390px; record computed styles and section inventories with in-page JS;
   take screenshots; exercise menus with real clicks and Escape.
3. Record each observation with URL, date, viewport, confidence. Separate facts from recommendations.

## Limitations

- Screenshots were viewed in-session and saved in the Claude session's tool-results folder, not in this repo.
  The paths are not reproduced as evidence because they live outside the project.
- zoho.com's CSS initially failed to load (`zohowebstatic.com` returned status 0) until that host was visited
  directly once; observations were taken after styles loaded.
- Zoho's **mobile drawer could not be opened** in viewport emulation (tap on the hamburger produced no visible
  change). Its contents are recorded as **not observed**.
- No authenticated, paywalled or private areas were accessed. No private APIs were probed.
- Observations are of 2026-10-25; Zoho changes its site often.
