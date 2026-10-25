/**
 * Vite plugin that prerenders every page in src/pages to static HTML.
 *
 * Why prerender instead of a client-side router: every route ships real HTML,
 * so search engines, link previews and visitors without JS all get the full
 * content. JavaScript only adds interactions on top.
 *
 * - config():           renders all pages to <root>/<route>/index.html and
 *                       registers each as a Rollup input (multi-page build).
 * - configureServer():  re-renders through Vite's SSR loader when a template,
 *                       page or data file changes, then full-reloads.
 * - generateBundle():   emits sitemap.xml from the same page list.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const RENDER_ENTRY = '/src/build/render.js';
const WATCHED = /[\\/]src[\\/](pages|templates|data|config)[\\/]/;

function write(root, rendered) {
  for (const { file, html } of rendered) {
    const out = path.join(root, file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    // Skip unchanged files so Vite's watcher doesn't loop on our own writes.
    if (fs.existsSync(out) && fs.readFileSync(out, 'utf8') === html) continue;
    fs.writeFileSync(out, html);
  }
}

export function techdevaPages({ siteUrl }) {
  let root = process.cwd();
  let rendered = [];

  return {
    name: 'techdeva-pages',

    async config(userConfig) {
      root = path.resolve(userConfig.root || process.cwd());
      const mod = await import(`${pathToFileURL(path.join(root, 'src/build/render.js')).href}?t=${Date.now()}`);
      rendered = mod.renderAll();
      write(root, rendered);
      const input = Object.fromEntries(rendered.map(({ file }) => [file.replace(/\/?index\.html$|\.html$/, '') || 'home', path.join(root, file)]));
      return { build: { rollupOptions: { input } } };
    },

    configureServer(server) {
      const rerender = async (file) => {
        if (!WATCHED.test(file)) return;
        try {
          const mod = await server.ssrLoadModule(RENDER_ENTRY, { fixStacktrace: true });
          rendered = mod.renderAll();
          write(root, rendered);
          server.ws.send({ type: 'full-reload' });
        } catch (err) {
          server.config.logger.error(`[techdeva-pages] ${err.stack || err}`);
        }
      };
      server.watcher.on('change', rerender);
      server.watcher.on('add', rerender);
    },

    generateBundle() {
      const urls = rendered
        .filter(({ page }) => !page.noindex)
        .map(({ page }) => `  <url><loc>${siteUrl}${page.path}</loc></url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}
