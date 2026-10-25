/**
 * Original 24px line icons, drawn for this site (no third-party icon set).
 * Decorative by default: aria-hidden, the adjacent text carries the meaning.
 */
import { raw } from './html.js';

const paths = {
  whatsapp: '<path d="M4 20l1.3-3.8A8 8 0 1 1 8 19z"/><path d="M9.2 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.2.6-.6.8-1.6.8-6.6-2.4-7.4-6.4z"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.3c1.8.6 3.1 2.2 3.5 4.7"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h3M8 17h6"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
  id: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c.5-1.6 1.7-2.4 3.2-2.4s2.7.8 3.2 2.4M15 10h3M15 13h3"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12.2l2.2 2.2 4.3-4.6"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7M12 14.5v2.5"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5z"/>',
  clinic: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>',
  scissors: '<circle cx="6.5" cy="7" r="2.5"/><circle cx="6.5" cy="17" r="2.5"/><path d="M8.6 8.4L20 17M8.6 15.6L20 7"/>',
  grad: '<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2V11M21.5 9v5"/>',
  dumbbell: '<path d="M6 7v10M3.5 9.5v5M18 7v10M20.5 9.5v5M6 12h12"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
  check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  minus: '<path d="M6 12h12"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  phone: '<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.4 20 4 13.6 3.5 5.6A1.5 1.5 0 0 1 5 4z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
  brain: '<path d="M9 4.5a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3.2 3.2 0 0 0 7.5 18 2.5 2.5 0 0 0 12 19.5V5.5A2.4 2.4 0 0 0 9 4.5zM15 4.5a3 3 0 0 1 3 3 3 3 0 0 1 2 5.2 3.2 3.2 0 0 1-3.5 5.3 2.5 2.5 0 0 1-4.5 1.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
};

export const icon = (name, size = 24, cls = '') =>
  raw(
    `<svg class="icon${cls ? ` ${cls}` : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.spark}</svg>`,
  );

/**
 * Original TechDeva mark: a rounded tile with a "T" whose stem is a signal path.
 * The logo appears several times per page (header, drawer, footer), so each
 * copy gets its own gradient id — duplicate ids are invalid and can make
 * browsers paint the wrong gradient.
 */
let logoCount = 0;
export const logoMark = (size = 34) => {
  const id = `td-g${(logoCount += 1)}`;
  return raw(`<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34D399"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs>
  <rect x="1" y="1" width="38" height="38" rx="11" fill="#0B1117" stroke="url(#${id})" stroke-width="2"/>
  <path d="M11 13h18" stroke="url(#${id})" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M20 13v8.5c0 3 1.8 4.5 4.5 4.5" fill="none" stroke="url(#${id})" stroke-width="3.4" stroke-linecap="round"/>
  <circle cx="27.5" cy="26" r="2.4" fill="#34D399"/>
</svg>`);
};
