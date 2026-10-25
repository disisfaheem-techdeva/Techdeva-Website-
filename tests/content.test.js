/**
 * Guards for the "never fabricate" rule and for internal consistency.
 * These test the data and the rendered HTML, so they need no browser.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { features, featureById, STATUS } from '../src/data/features.js';
import { plans, comparisonRows } from '../src/data/pricing.js';
import { integrations, proof } from '../src/data/content.js';
import { renderAll } from '../src/build/render.js';
import { site } from '../src/config/site.js';

const rendered = renderAll();
const paths = new Set(rendered.map((r) => r.page.path));

test('every feature and integration uses a known status', () => {
  for (const f of [...features, ...integrations]) assert.ok(STATUS[f.status], `${f.id} has unknown status ${f.status}`);
});

test('pricing matches the published techdeva.net packages', () => {
  assert.deepEqual(
    plans.map((p) => [p.name, p.price.PKR, p.price.USD, p.numbers, p.chats]),
    [
      ['Starter', 19999, 99, 1, 300],
      ['Growth', 49999, 199, 2, 1500],
      ['Pro', 64999, 299, 5, 4000],
    ],
  );
});

test('packages only reference real features, and each tier includes the one below', () => {
  for (const p of plans) for (const id of p.includes) assert.ok(featureById[id], `${p.id} references missing feature ${id}`);
  for (const id of comparisonRows) assert.ok(featureById[id]);
  for (let i = 1; i < plans.length; i++) for (const id of plans[i - 1].includes) assert.ok(plans[i].includes.includes(id), `${plans[i].id} drops ${id}`);
});

test('every proof figure has a stated source', () => {
  assert.ok(proof.source.length > 20);
  assert.ok(proof.stats.every((s) => s.value && s.label));
});

test('each page has one h1, a title and a description', () => {
  for (const { page, html } of rendered) {
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${page.path} h1 count`);
    assert.match(html, /<title>[^<]{10,}<\/title>/, `${page.path} title`);
    assert.ok(page.description && page.description.length > 50, `${page.path} description`);
  }
});

test('every internal link points to a page that exists', () => {
  const broken = [];
  for (const { page, html } of rendered) {
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (href.startsWith('/src/') || href === '/favicon.svg' || href === '/sitemap.xml') continue;
      if (!paths.has(href)) broken.push(`${page.path} -> ${href}`);
    }
  }
  assert.deepEqual(broken, []);
});

test('the trial length shown is the configured one, everywhere', () => {
  for (const { page, html } of rendered) {
    const other = [...html.matchAll(/(\d+)-day/g)].map((m) => Number(m[1])).filter((n) => n !== site.trialDays);
    assert.deepEqual(other, [], `${page.path} mentions another trial length`);
  }
});

test('no development-stage feature is described as live anywhere', () => {
  for (const f of features.filter((x) => x.status === 'development')) {
    for (const { page, html } of rendered) {
      const idx = html.indexOf(`>${f.title}`);
      if (idx === -1) continue;
      const near = html.slice(idx, idx + 400);
      assert.ok(!/badge--live/.test(near.split('</li>')[0]), `${f.id} near a Live badge on ${page.path}`);
    }
  }
});
