/**
 * Page shell: <head> with SEO metadata, the global header (desktop mega menu +
 * mobile drawer), the footer and the mobile action bar.
 */
import { html, raw, attr, isExternal } from './html.js';
import { icon, logoMark } from './icons.js';
import { site, whatsappLink } from '../config/site.js';
import { primaryNav, footerNav } from '../data/nav.js';
import { STATUS } from '../data/features.js';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap';

export const statusBadge = (status) => {
  const s = STATUS[status];
  return s ? html`<span class="badge badge--${s.tone}">${s.label}</span>` : '';
};

export const link = ({ label, href, external }, cls = '') => {
  const ext = external || isExternal(href);
  return html`<a${attr('class', cls || null)} href="${href}"${ext ? raw(' target="_blank" rel="noopener"') : ''}>${label}${ext ? html`<span class="visually-hidden"> (opens in a new tab)</span>` : ''}</a>`;
};

const isCurrent = (href, path) => href === path;
const sectionActive = (item, path) => {
  if (item.href) return isCurrent(item.href, path);
  if (item.rail) return item.rail.some((g) => g.items.some((i) => i.href.split('#')[0] === path)) || path === '/features/';
  return item.columns.some((c) => c.links.some((l) => l.href === path || (l.href !== '/' && path.startsWith(l.href))));
};

function megaMenu(item) {
  return html`<div class="mega" id="menu-${item.id}" data-menu-panel hidden>
    <div class="container mega__inner">
      <div class="mega__rail" role="tablist" aria-orientation="vertical" aria-label="${item.label} categories" data-tabs>
        ${item.rail.map(
          (g, i) => html`<button class="mega__tab" role="tab" id="mt-${g.id}" aria-controls="mp-${g.id}" aria-selected="${i === 0 ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}">
            <span>${g.title}</span>${icon('chevron', 16, 'mega__tab-icon')}
          </button>`,
        )}
        <div class="mega__rail-foot">
          ${item.footer.map((f) => html`<a class="mega__foot-link" href="${f.href}">${f.label} ${icon('arrow', 16)}</a>`)}
        </div>
      </div>
      ${item.rail.map(
        (g, i) => html`<div class="mega__panel" role="tabpanel" id="mp-${g.id}" aria-labelledby="mt-${g.id}"${i === 0 ? '' : raw(' hidden')}>
          <p class="mega__blurb">${g.blurb}</p>
          <ul class="mega__grid">
            ${g.items.map(
              (it) => html`<li><a class="mega__card" href="${it.href}">
                <span class="mega__icon">${icon(it.icon, 22)}</span>
                <span class="mega__text"><span class="mega__title">${it.title} ${statusBadge(it.status)}</span><span class="mega__desc">${it.text}</span></span>
              </a></li>`,
            )}
          </ul>
        </div>`,
      )}
    </div>
  </div>`;
}

function dropdown(item) {
  return html`<div class="dropdown" id="menu-${item.id}" data-menu-panel hidden>
    ${item.columns.map(
      (c) => html`<div class="dropdown__col"><p class="dropdown__title">${c.title}</p><ul>${c.links.map((l) => html`<li>${link(l, 'dropdown__link')}</li>`)}</ul></div>`,
    )}
  </div>`;
}

function header(path) {
  return html`<header class="site-header" data-header>
    <div class="container header__inner">
      <a class="brand" href="/" aria-label="TechDeva home">${logoMark(34)}<span class="brand__word">Tech<b>Deva</b></span></a>
      <nav class="primary-nav" aria-label="Main">
        <ul class="nav-list">
          ${primaryNav.map((item) => {
            const active = sectionActive(item, path);
            if (item.type === 'link')
              return html`<li class="nav-item"><a class="nav-link${active ? ' is-active' : ''}" href="${item.href}"${active ? raw(' aria-current="page"') : ''}>${item.label}</a></li>`;
            return html`<li class="nav-item nav-item--${item.type}" data-menu>
              <button class="nav-link nav-trigger${active ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="menu-${item.id}">${item.label}${icon('chevron', 16, 'nav-chevron')}</button>
              ${item.type === 'mega' ? megaMenu(item) : dropdown(item)}
            </li>`;
          })}
        </ul>
      </nav>
      <div class="header__actions">
        <a class="nav-link nav-link--quiet" href="${site.links.signIn}">Sign in</a>
        <a class="btn btn--secondary btn--sm" href="/book-a-demo/">Book a demo</a>
        <a class="btn btn--primary btn--sm" href="/free-trial/">Start free trial</a>
      </div>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-drawer" data-drawer-open>
        ${icon('menu', 22)}<span class="visually-hidden">Open menu</span>
      </button>
    </div>
  </header>`;
}

function drawer(path) {
  return html`<div class="drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu" hidden data-drawer>
    <div class="drawer__head">
      <a class="brand" href="/">${logoMark(30)}<span class="brand__word">Tech<b>Deva</b></span></a>
      <button class="icon-btn" type="button" data-drawer-close>${icon('x', 22)}<span class="visually-hidden">Close menu</span></button>
    </div>
    <nav class="drawer__body" aria-label="Mobile">
      ${primaryNav.map((item) => {
        if (item.type === 'link') return html`<a class="drawer__link${item.href === path ? ' is-active' : ''}" href="${item.href}">${item.label}</a>`;
        const groups = item.rail
          ? item.rail.map((g) => ({ title: g.title, links: g.items.map((i) => ({ label: i.title, href: i.href })) }))
          : item.columns;
        return html`<details class="drawer__group"${sectionActive(item, path) ? raw(' open') : ''}>
          <summary>${item.label}${icon('chevron', 18)}</summary>
          ${groups.map((g) => html`<p class="drawer__title">${g.title}</p><ul>${g.links.map((l) => html`<li>${link(l, 'drawer__sublink')}</li>`)}</ul>`)}
          ${item.footer ? item.footer.map((f) => html`<a class="drawer__more" href="${f.href}">${f.label} ${icon('arrow', 16)}</a>`) : ''}
        </details>`;
      })}
      <a class="drawer__link" href="${site.links.signIn}">Sign in</a>
    </nav>
    <div class="drawer__foot">
      <a class="btn btn--secondary" href="/book-a-demo/">Book a demo</a>
      <a class="btn btn--primary" href="/free-trial/">Start ${site.trialDays}-day free trial</a>
    </div>
  </div>`;
}

export function ctaBand({ title, text, primary, secondary } = {}) {
  return html`<section class="cta-band" aria-labelledby="cta-title">
    <div class="container cta-band__inner reveal">
      <div>
        <h2 id="cta-title" class="cta-band__title">${title || 'Try TechDeva on your own business'}</h2>
        <p class="cta-band__text">${text || `${site.trialDays}-day free trial, no card and no setup fee. Onboarding and WhatsApp setup included.`}</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--primary btn--lg" href="${primary?.href || '/free-trial/'}">${primary?.label || `Start ${site.trialDays}-day free trial`}</a>
        <a class="btn btn--secondary btn--lg" href="${secondary?.href || '/book-a-demo/'}">${secondary?.label || 'Book a demo'}</a>
      </div>
    </div>
  </section>`;
}

function footer(page) {
  return html`${page.hideFooterCta ? '' : ctaBand(page.cta)}
  <footer class="site-footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <a class="brand" href="/">${logoMark(32)}<span class="brand__word">Tech<b>Deva</b></span></a>
        <p>${site.tagline}. A workforce of AI employees that runs your sales, CRM and reporting — with your approval on everything that matters.</p>
        <ul class="footer__contact">
          <li>${icon('phone', 18)}<a href="tel:${site.contact.phoneIntl}">${site.contact.phoneDisplay}</a></li>
          <li>${icon('mail', 18)}<a href="mailto:${site.contact.email}">${site.contact.email}</a></li>
          <li>${icon('pin', 18)}<span>${site.contact.address}</span></li>
        </ul>
      </div>
      ${footerNav.map(
        (col) => html`<div class="footer__col"><p class="footer__title">${col.title}</p><ul>${col.links.map((l) => html`<li>${link(l)}</li>`)}</ul></div>`,
      )}
    </div>
    <div class="container footer__legal">
      <p>© ${new Date().getFullYear()} ${site.legalName}. All rights reserved.</p>
      <ul>
        <li><a href="${site.links.privacy}">Privacy</a></li>
        <li><a href="${site.links.terms}">Terms</a></li>
        <li><a href="${site.links.dataDeletion}">Delete your data</a></li>
        <li><a href="/sitemap.xml">Sitemap</a></li>
      </ul>
    </div>
  </footer>`;
}

function mobileBar() {
  return html`<div class="mobile-bar" data-mobile-bar>
    <button class="mobile-bar__menu" type="button" aria-controls="mobile-drawer" aria-expanded="false" data-drawer-open>${icon('menu', 22)}<span>Menu</span></button>
    <a class="mobile-bar__wa" href="${whatsappLink('Hi TechDeva, I would like to know more.')}" target="_blank" rel="noopener">${icon('whatsapp', 20)}<span class="visually-hidden">Message TechDeva on WhatsApp (opens in a new tab)</span></a>
    <a class="mobile-bar__cta" href="/free-trial/">Start free trial</a>
  </div>`;
}

function jsonLd(page) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: `${site.url}/`,
    email: site.contact.email,
    telephone: site.contact.phoneIntl,
    address: { '@type': 'PostalAddress', streetAddress: site.contact.address, addressLocality: site.contact.city, addressCountry: site.contact.country },
  };
  const blocks = [org, ...(page.schema || [])];
  if (page.breadcrumbs?.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', href: '/' }, ...page.breadcrumbs].map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: `${site.url}${b.href}`,
      })),
    });
  }
  // "<" is escaped so a string in the data can never close the script element.
  return blocks.map((b) => raw(`<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`));
}

export function breadcrumbs(items) {
  return html`<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>
    <li><a href="/">Home</a></li>
    ${items.map((b, i) => (i === items.length - 1 ? html`<li><span aria-current="page">${b.name}</span></li>` : html`<li><a href="${b.href}">${b.name}</a></li>`))}
  </ol></nav>`;
}

export function document(page) {
  const title = page.path === '/' ? page.title : `${page.title} | ${site.name}`;
  const canonical = `${site.url}${page.path}`;
  return `<!doctype html>
<!-- Generated from src/pages by src/build/plugin.js. Edit the source, not this file. -->
${html`<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${page.description}">
${page.noindex ? '' : html`<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#0B0D10">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${page.description}">
<meta property="og:url" content="${canonical}">
${site.ogImage ? html`<meta property="og:image" content="${site.url}${site.ogImage}">` : ''}
<meta name="twitter:card" content="${site.ogImage ? 'summary_large_image' : 'summary'}">
${page.noindex ? raw('<meta name="robots" content="noindex">') : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
${raw(`<script>/* Hide hero intro elements until the motion script animates them in. Skipped under reduced motion; removed after 2s regardless, so a slow or failed script never leaves content hidden. */(function(d){if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},2000)}})(document.documentElement)</script>`)}
<script type="module" src="/src/js/main.js"></script>
${jsonLd(page)}
</head>
<body class="page-${page.id}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="announce"><div class="container announce__inner"><span class="announce__dot" aria-hidden="true"></span><span class="announce__long">Running live in production on a Lahore clinic, salon and academy.</span><span class="announce__short">Live on a Lahore clinic.</span> <a href="/resources/beauty-aesthetic-lounge/">Read the case study ${icon('arrow', 14)}</a></div></div>
${header(page.path)}
${drawer(page.path)}
<main id="main" tabindex="-1">
${page.body}
</main>
${footer(page)}
${mobileBar()}
<button class="to-top" type="button" data-to-top hidden>${icon('up', 20)}<span class="visually-hidden">Back to top</span></button>
</body>
</html>`}`;
}
