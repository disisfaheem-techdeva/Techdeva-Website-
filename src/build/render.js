/**
 * Collects every page module and renders it to a full HTML document.
 * Used by the Vite plugin at dev and build time; no browser code lives here.
 */
import { document } from '../templates/layout.js';
import home from '../pages/home.js';
import product from '../pages/product.js';
import industries from '../pages/industries.js';
import pricing from '../pages/pricing.js';
import company from '../pages/company.js';
import freeTrial from '../pages/free-trial.js';

export const pages = [home, ...product, ...industries, pricing, ...company, freeTrial];

/** "/features/" -> "features/index.html"; pages may set `file` explicitly. */
export const fileFor = (page) => page.file || (page.path === '/' ? 'index.html' : `${page.path.replace(/^\/|\/$/g, '')}/index.html`);

export function renderAll() {
  const seen = new Set();
  return pages.map((page) => {
    if (seen.has(page.path)) throw new Error(`Duplicate page path: ${page.path}`);
    seen.add(page.path);
    return { page, file: fileFor(page), html: document(page) };
  });
}
