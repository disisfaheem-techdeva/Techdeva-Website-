/**
 * Checks every internal href/src in the built site resolves to a file in dist/.
 * Usage: npm run build && npm run check:links
 * External links are listed (not fetched) so they can be reviewed by hand.
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
const htmlFiles = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
};
walk(dist);

const resolves = (url) => {
  const clean = decodeURI(url.split(/[?#]/)[0]);
  const target = path.join(dist, clean);
  if (clean.endsWith('/')) return fs.existsSync(path.join(target, 'index.html'));
  return fs.existsSync(target) || fs.existsSync(`${target}.html`) || fs.existsSync(path.join(target, 'index.html'));
};

const broken = [];
const external = new Set();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(mailto:|tel:|#|data:)/.test(url)) continue;
    if (/^https?:\/\//.test(url)) {
      external.add(url.split('?')[0]);
      continue;
    }
    if (url.startsWith('/') && !resolves(url)) broken.push(`${path.relative(dist, file)} -> ${url}`);
  }
}

console.log(`Checked ${htmlFiles.length} pages.`);
console.log(`External destinations (${external.size}):\n  ${[...external].sort().join('\n  ')}`);
if (broken.length) {
  console.error(`\nBroken internal links (${broken.length}):\n  ${broken.join('\n  ')}`);
  process.exit(1);
}
console.log('\nNo broken internal links.');
