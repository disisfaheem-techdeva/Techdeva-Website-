/**
 * Tiny tagged-template renderer. Interpolated values are escaped unless they
 * were produced by `html` itself (or wrapped in `raw`), so data files can never
 * inject markup into a page.
 */
const SAFE = Symbol('safe');

const escapeText = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const toSafe = (v) => {
  if (v == null || v === false) return '';
  if (Array.isArray(v)) return v.map(toSafe).join('');
  if (typeof v === 'object' && v[SAFE]) return v.value;
  return escapeText(v);
};

export const raw = (value) => ({ [SAFE]: true, value: String(value), toString: () => String(value) });

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((v, i) => {
    out += toSafe(v) + strings[i + 1];
  });
  return raw(out);
}

export const attr = (name, value) => (value == null || value === false ? '' : raw(` ${name}="${escapeText(value)}"`));

export const isExternal = (href) => /^https?:\/\//.test(href) && !href.startsWith('https://techdeva.net/#');
