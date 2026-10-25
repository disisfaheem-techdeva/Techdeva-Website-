/**
 * Reusable page sections. Every page is assembled from these; none of them
 * hardcode business facts — those come in as arguments from src/data.
 */
import { html, raw, attr } from './html.js';
import { icon } from './icons.js';
import { statusBadge, breadcrumbs as crumbs, link } from './layout.js';
import { featureById, STATUS } from '../data/features.js';
import { plans, currencies, comparisonRows, formatPrice } from '../data/pricing.js';
import { site } from '../config/site.js';

/* ------------------------------------------------------------------ heroes */

/* `data-intro` elements are animated in by js/motion; `data-split` headings
   are split into masked lines. Both render normally without JS. */
export function hero({ eyebrow, title, lead, actions = [], visual, layout = 'split', breadcrumbs, note, id = 'hero' }) {
  return html`<section class="hero hero--${layout}" aria-labelledby="${id}-title" data-hero>
    <div class="hero__fx" aria-hidden="true"><span class="orb orb--a"></span><span class="orb orb--b"></span><span class="orb orb--c"></span><span class="grid-floor"></span></div>
    <div class="container hero__inner">
      <div class="hero__copy">
        ${breadcrumbs ? crumbs(breadcrumbs) : ''}
        ${eyebrow ? html`<p class="eyebrow" data-intro>${eyebrow}</p>` : ''}
        <h1 id="${id}-title" class="hero__title" data-split="hero">${title}</h1>
        ${lead ? html`<p class="hero__lead" data-intro>${lead}</p>` : ''}
        ${actions.length ? html`<div class="hero__actions" data-intro>${actions.map((a, i) => button({ ...a, magnetic: i === 0 }))}</div>` : ''}
        ${note ? html`<p class="hero__note" data-intro>${note}</p>` : ''}
      </div>
      ${visual ? html`<div class="hero__visual" data-intro-visual>${visual}</div>` : ''}
    </div>
  </section>`;
}

export const button = ({ label, href, variant = 'primary', size = 'lg', iconName, magnetic }) =>
  html`<a class="btn btn--${variant} btn--${size}" href="${href}"${magnetic ? raw(' data-magnetic') : ''}>${label}${iconName ? icon(iconName, 18) : ''}</a>`;

/* ------------------------------------------------------------- 3D scenes
 * All three render as a finished static composition without JS; the motion
 * layer only adds depth movement on top.
 */

/** Hero product stage: interface layers at different depths in one 3D scene. */
export const heroStage = () => html`<div class="stage" data-stage>
  <div class="stage__scene" data-stage-scene>
    <div class="stage__layer stage__layer--dash" data-depth="-40">${dashboardMock()}</div>
    <div class="stage__layer stage__layer--chat" data-depth="70">${chatMock({ caption: false })}</div>
    <div class="stage__chip stage__chip--a" data-depth="130">${icon('check', 16)} Lead captured</div>
    <div class="stage__chip stage__chip--b" data-depth="110">${icon('calendar', 16)} Appointment booked</div>
    <div class="stage__chip stage__chip--c" data-depth="150">${icon('shield', 16)} Discount → waiting on you</div>
  </div>
</div>`;

/**
 * Pinned scroll story: steps on the left, a device on the right whose
 * conversation advances with the active step. Without motion it is a plain
 * list beside a finished conversation.
 */
export function storyPin(steps) {
  return html`<div class="story" data-story>
    <ol class="story__steps">${steps.map(
      (s, i) => html`<li class="story__step${i === 0 ? ' is-active' : ''}" data-story-step>
        <span class="story__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div><h3 class="story__title">${s.title} <span class="flow__by flow__by--${s.by}">${s.by === 'human' ? 'You' : 'AI'}</span></h3><p>${s.text}</p></div>
      </li>`,
    )}</ol>
    <div class="story__stage">
      <figure class="device" data-story-device>
        <div class="device__notch" aria-hidden="true"></div>
        <div class="device__screen chat">${steps.map((s, i) =>
          s.messages.map(
            ([kind, text]) => html`<p class="${kind === 'event' ? 'chat__event' : `chat__msg chat__msg--${kind}`}" data-story-msg="${i}">${kind === 'event' ? icon('check', 14) : ''}${text}</p>`,
          ),
        )}</div>
        <figcaption class="mock__caption">Illustrative conversation · sample data</figcaption>
      </figure>
    </div>
  </div>`;
}

/** The Business Brain at the centre, capabilities orbiting it on a tilted ring. */
export function brainOrbit(nodes) {
  const n = nodes.length;
  return html`<figure class="orbit" data-orbit aria-label="${`The Business Brain connects ${nodes.map((x) => x.label).join(', ')}`}">
    <div class="orbit__core"><span class="orbit__pulse" aria-hidden="true"></span>${icon('brain', 34)}<span>Business Brain</span></div>
    <div class="orbit__ring" data-orbit-ring aria-hidden="true">
      ${nodes.map(
        (node, i) => html`<div class="orbit__slot" style="--a:${((360 / n) * i).toFixed(2)}deg"><div class="orbit__node" data-orbit-node>${icon(node.icon, 20)}<span>${node.label}</span></div></div>`,
      )}
    </div>
  </figure>`;
}

/* ----------------------------------------------------------------- section */

export function section({ id, tone = 'base', eyebrow, title, lead, body, align = 'left', narrow = false }) {
  return html`<section class="section section--${tone}"${attr('id', id)}${title ? raw(` aria-labelledby="${id || 's'}-h"`) : ''}>
    <div class="container${narrow ? ' container--narrow' : ''}">
      ${title
        ? html`<header class="section__head section__head--${align} reveal">
            ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
            <h2 id="${id || 's'}-h" class="section__title" data-split>${title}</h2>
            ${lead ? html`<p class="section__lead">${lead}</p>` : ''}
          </header>`
        : ''}
      ${body}
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- features */

export const checklist = (items, cls = '') =>
  html`<ul class="checklist ${cls}">${items.map((t) => html`<li>${icon('check', 18)}<span>${t}</span></li>`)}</ul>`;

export function featureCard(f, { showLink = true } = {}) {
  return html`<article class="card feature-card reveal">
    <div class="feature-card__top"><span class="icon-tile">${icon(f.icon)}</span>${statusBadge(f.status)}</div>
    <h3 class="card__title">${f.title}</h3>
    <p class="card__text">${f.short}</p>
    ${showLink && f.page ? html`<a class="text-link" href="${f.page}">Learn more ${icon('arrow', 16)}<span class="visually-hidden"> about ${f.title}</span></a>` : ''}
  </article>`;
}

export const featureGrid = (items, { cols = 3, showLink = true } = {}) =>
  html`<div class="grid grid--${cols}">${items.map((f) => featureCard(f, { showLink }))}</div>`;

/** Accessible tabs; the first tab is selected. Panels are plain content. */
export function tabs({ id, label, items }) {
  return html`<div class="tabs" data-tabs-root>
    <div class="tabs__list" role="tablist" aria-label="${label}" data-tabs>
      ${items.map(
        (t, i) => html`<button class="tabs__tab" role="tab" type="button" id="${id}-t-${t.id}" aria-controls="${id}-p-${t.id}" aria-selected="${i === 0 ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}">${t.label}</button>`,
      )}
    </div>
    ${items.map(
      (t, i) => html`<div class="tabs__panel" role="tabpanel" id="${id}-p-${t.id}" aria-labelledby="${id}-t-${t.id}" tabindex="0"${i === 0 ? '' : raw(' hidden')}>${t.content}</div>`,
    )}
  </div>`;
}

/** Alternating text/visual rows — the product-detail pattern. */
export function featureRows(rows) {
  return html`<div class="rows">${rows.map(
    (r, i) => html`<article class="row${i % 2 ? ' row--flip' : ''} reveal"${attr('id', r.id)}>
      <div class="row__copy">
        ${r.eyebrow ? html`<p class="eyebrow">${r.eyebrow}</p>` : ''}
        <h3 class="row__title">${r.title} ${r.status ? statusBadge(r.status) : ''}</h3>
        <p class="row__text">${r.text}</p>
        ${r.points ? checklist(r.points) : ''}
        ${r.link ? html`<a class="text-link" href="${r.link.href}">${r.link.label} ${icon('arrow', 16)}</a>` : ''}
      </div>
      <div class="row__visual">${r.visual}</div>
    </article>`,
  )}</div>`;
}

export function workflow(steps, { label = 'Workflow', compact = false } = {}) {
  return html`<ol class="flow${compact ? ' flow--compact' : ''}" aria-label="${label}">
    ${steps.map((s, i) => {
      const step = typeof s === 'string' ? { title: s } : s;
      return html`<li class="flow__step reveal">
        <span class="flow__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        ${step.icon ? html`<span class="flow__icon">${icon(step.icon, 20)}</span>` : ''}
        <span class="flow__title">${step.title}</span>
        ${step.text ? html`<span class="flow__text">${step.text}</span>` : ''}
        ${step.by ? html`<span class="flow__by flow__by--${step.by}">${step.by === 'human' ? 'You' : 'AI'}</span>` : ''}
      </li>`;
    })}
  </ol>`;
}

export function steps(list) {
  return html`<ol class="steps">${list.map(
    (s, i) => html`<li class="steps__item reveal"><span class="steps__num">${i + 1}</span><div><h3 class="steps__title">${s.title}</h3><p>${s.text}</p></div></li>`,
  )}</ol>`;
}

/* ------------------------------------------------------------------- proof */

export function statsBand(proof) {
  return html`<div class="stats reveal">
    <dl class="stats__list">${proof.stats.map((s) => html`<div class="stats__item"><dt>${s.label}</dt><dd>${s.value}</dd></div>`)}</dl>
    <p class="stats__source">${icon('eye', 16)} ${proof.source}</p>
  </div>`;
}

export const logoStrip = ({ note, brands }) =>
  html`<div class="logo-strip reveal"><p class="logo-strip__note">${note}</p><ul class="logo-strip__list">${brands.map((b) => html`<li>${b}</li>`)}</ul></div>`;

/* --------------------------------------------------------------- listings */

export function industryCards(list) {
  return html`<div class="grid grid--4">${list.map(
    (i) => html`<a class="card industry-card reveal" href="/industries/${i.slug}/">
      <span class="icon-tile">${icon(i.icon)}</span>
      <h3 class="card__title">${i.name}</h3>
      <p class="card__text">${i.intro}</p>
      <span class="text-link">${i.proof ? 'See it running' : 'See how it works'} ${icon('arrow', 16)}</span>
    </a>`,
  )}</div>`;
}

export function integrationCards(list) {
  return html`<div class="grid grid--3">${list.map(
    (it) => html`<article class="card integration-card reveal" id="${it.id}">
      <div class="feature-card__top"><span class="icon-tile">${icon(it.icon)}</span>${statusBadge(it.status)}</div>
      <p class="card__kicker">${it.category}</p>
      <h3 class="card__title">${it.name}</h3>
      <p class="card__text">${it.body}</p>
    </article>`,
  )}</div>`;
}

export function resourceCards(list, { filter = false, types = [] } = {}) {
  return html`<div class="resources"${filter ? raw(' data-filter-root') : ''}>
    ${filter
      ? html`<div class="chips" role="group" aria-label="Filter resources">${types.map(
          ([id, label], i) => html`<button class="chip" type="button" data-filter="${id}" aria-pressed="${i === 0 ? 'true' : 'false'}">${label}</button>`,
        )}</div>`
      : ''}
    <ul class="grid grid--3 resources__list" data-filter-list>${list.map(
      (r) => html`<li class="resource-item" data-type="${r.type}"><article class="card resource-card">
        <p class="card__kicker">${r.meta}</p>
        <h3 class="card__title">${link({ label: r.title, href: r.href, external: r.external }, 'resource-card__link')}</h3>
        <p class="card__text">${r.summary}</p>
        <span class="text-link" aria-hidden="true">${r.external ? 'Read on the blog' : 'Read'} ${icon(r.external ? 'external' : 'arrow', 16)}</span>
      </article></li>`,
    )}</ul>
    ${filter ? html`<p class="empty-state" data-filter-empty hidden>Nothing in this category yet.</p>` : ''}
  </div>`;
}

export function limitsList(limits) {
  return html`<ul class="limits">${limits.map(
    ([title, text]) => html`<li class="limits__item reveal"><span class="limits__icon">${icon('x', 18)}</span><div><h3 class="limits__title">${title}</h3><p>${text}</p></div></li>`,
  )}</ul>`;
}

export function faqList(items, name = 'faq') {
  return html`<div class="faq">${items.map(
    ([q, a]) => html`<details class="faq__item" name="${name}"><summary class="faq__q"><span>${q}</span>${icon('chevron', 20)}</summary><div class="faq__a"><p>${a}</p></div></details>`,
  )}</div>`;
}

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const termsGrid = (terms) =>
  html`<dl class="terms">${terms.map(([t, d]) => html`<div class="terms__item reveal"><dt>${t}</dt><dd>${d}</dd></div>`)}</dl>`;

/* ----------------------------------------------------------------- pricing */

export function currencyToggle() {
  return html`<fieldset class="segmented" data-currency-toggle>
    <legend class="visually-hidden">Show prices in</legend>
    ${currencies.map(
      (c, i) => html`<label class="segmented__opt"><input type="radio" name="currency" value="${c.id}"${i === 0 ? raw(' checked') : ''}><span>${c.label} <small>${c.note}</small></span></label>`,
    )}
  </fieldset>`;
}

export function pricingCards() {
  return html`<div class="plans">${plans.map((p, idx) => {
    const prev = plans[idx - 1];
    const extra = prev ? p.includes.filter((id) => !prev.includes.includes(id)) : p.includes;
    return html`<article class="plan${p.recommended ? ' plan--featured' : ''} reveal" aria-labelledby="plan-${p.id}">
      ${p.recommended ? html`<p class="plan__flag">Most popular</p>` : ''}
      <h3 class="plan__name" id="plan-${p.id}">${p.name}</h3>
      <p class="plan__pitch">${p.pitch}</p>
      <p class="plan__price">${currencies.map(
        (c, i) => html`<span class="plan__amount" data-currency="${c.id}"${i === 0 ? '' : raw(' hidden')}>${formatPrice(p.price[c.id], c.id)}</span>`,
      )}<span class="plan__period">/ ${p.period}</span></p>
      <ul class="plan__limits"><li><b>${p.numbers}</b> WhatsApp number${p.numbers > 1 ? 's' : ''}</li><li><b>${p.chats.toLocaleString('en-US')}</b> AI chats / month</li></ul>
      <a class="btn ${p.recommended ? 'btn--primary' : 'btn--secondary'} btn--block" href="/free-trial/">Start ${site.trialDays}-day free trial<span class="visually-hidden"> on ${p.name}</span></a>
      <p class="plan__inherit">${prev ? `Everything in ${prev.name}, plus:` : 'Includes:'}</p>
      <ul class="plan__features">${extra.map((id) => {
        const f = featureById[id];
        return html`<li>${icon('check', 18)}<span>${f.title}${f.status !== 'live' ? html` <span class="plan__status">(${STATUS[f.status].label.toLowerCase()})</span>` : ''}</span></li>`;
      })}</ul>
    </article>`;
  })}</div>`;
}

export function comparisonTable() {
  return html`<div class="table-wrap reveal" tabindex="0" role="region" aria-label="Package comparison, scrolls horizontally">
    <table class="compare">
      <caption class="visually-hidden">What each package includes</caption>
      <thead><tr><th scope="col">Feature</th>${plans.map((p) => html`<th scope="col"${p.recommended ? raw(' class="is-featured"') : ''}>${p.name}</th>`)}</tr></thead>
      <tbody>
        <tr><th scope="row">WhatsApp numbers</th>${plans.map((p) => html`<td>${p.numbers}</td>`)}</tr>
        <tr><th scope="row">AI chats / month</th>${plans.map((p) => html`<td>${p.chats.toLocaleString('en-US')}</td>`)}</tr>
        ${comparisonRows.map((id) => {
          const f = featureById[id];
          return html`<tr><th scope="row">${f.title} ${f.status !== 'live' ? statusBadge(f.status) : ''}</th>${plans.map((p) =>
            p.includes.includes(id)
              ? html`<td>${icon('check', 20, 'yes')}<span class="visually-hidden">Included</span></td>`
              : html`<td>${icon('minus', 20, 'no')}<span class="visually-hidden">Not included</span></td>`,
          )}</tr>`;
        })}
      </tbody>
    </table>
  </div>`;
}

/* ---------------------------------------------------------------- mockups
 * Original interface illustrations built in HTML/CSS. They use invented
 * sample rows and are labelled as such on screen, because presenting sample
 * data as a real customer's dashboard would be exactly the kind of claim the
 * product refuses to make.
 */

const mockFrame = (title, inner, cls = '', caption = true) =>
  html`<figure class="mock ${cls}">
    <div class="mock__bar"><span></span><span></span><span></span><p>${title}</p></div>
    <div class="mock__body">${inner}</div>
    ${caption ? html`<figcaption class="mock__caption">Illustrative interface · sample data</figcaption>` : ''}
  </figure>`;

export const chatMock = ({ caption = true } = {}) =>
  mockFrame(
    'WhatsApp · Hermes',
    html`<div class="chat">
      <p class="chat__msg chat__msg--in">Assalam o alaikum, HydraFacial ka rate kya hai? <time>11:04 PM</time></p>
      <p class="chat__msg chat__msg--out">Walaikum assalam! HydraFacial is listed at your clinic’s rate. Would you like a consultation slot tomorrow? <time>11:04 PM</time></p>
      <p class="chat__msg chat__msg--in">Haan, shaam 5 baje? <time>11:05 PM</time></p>
      <p class="chat__msg chat__msg--out">Booked for 5:00 PM tomorrow. You’ll get a reminder in the morning. <time>11:05 PM</time></p>
      <p class="chat__event">${icon('check', 14)} Lead captured · Appointment created · Owner notified</p>
    </div>`,
    'mock--chat',
    caption,
  );

export const dashboardMock = () =>
  mockFrame(
    'TechDeva · Today',
    html`<div class="dash">
      <div class="dash__kpis">
        <div><span>New enquiries</span><b>12</b></div>
        <div><span>Booked</span><b>7</b></div>
        <div><span>Unpaid</span><b>3</b></div>
        <div><span>Awaiting you</span><b>2</b></div>
      </div>
      <div class="dash__table" role="presentation">
        <div class="dash__row dash__row--head"><span>Customer</span><span>Service</span><span>Status</span></div>
        <div class="dash__row"><span>Ayesha K.</span><span>Consultation</span><span class="pill pill--live">Booked</span></div>
        <div class="dash__row"><span>Bilal R.</span><span>Laser · 3 sessions</span><span class="pill pill--early">Quoted</span></div>
        <div class="dash__row"><span>Sana M.</span><span>Bridal trial</span><span class="pill">New</span></div>
        <div class="dash__row"><span>Usman T.</span><span>Course enquiry</span><span class="pill pill--warn">Follow up</span></div>
      </div>
    </div>`,
    'mock--dash',
  );

export const approvalMock = () =>
  mockFrame(
    'Approvals · waiting on you',
    html`<ul class="approvals">
      <li><div><b>Reply mentions a discount</b><span>Hermes stopped: discounts are yours to decide.</span></div><span class="approvals__actions"><span class="mini-btn">Review</span></span></li>
      <li><div><b>Instagram post draft</b><span>Nothing publishes until you approve.</span></div><span class="approvals__actions"><span class="mini-btn mini-btn--ok">Approve</span></span></li>
      <li><div><b>Price not on rate list</b><span>“Bridal package + trial” has no rate configured.</span></div><span class="approvals__actions"><span class="mini-btn">Add rate</span></span></li>
    </ul>`,
    'mock--approvals',
  );

export const pipelineMock = () =>
  mockFrame(
    'Pipeline',
    html`<div class="pipe">${[
      ['New', 5],
      ['Qualified', 4],
      ['Booked', 3],
      ['Showed', 2],
    ].map(
      ([label, n]) => html`<div class="pipe__col"><p>${label}</p>${Array.from({ length: n }, (_, i) => html`<span class="pipe__card" style="--d:${i}"></span>`)}</div>`,
    )}</div>`,
    'mock--pipe',
  );

export const assistantMock = () =>
  mockFrame(
    'Jarvis · AI console',
    html`<div class="console">
      <p class="console__q">How many bookings came from last week’s ad?</p>
      <p class="console__a">I can only count bookings that have an ad source recorded. For last week: 4 bookings attributed to the Laser campaign; 2 bookings have no source, shown as a gap.</p>
      <p class="console__q">Tell Hermes we’re closed on 14 August.</p>
      <p class="console__a console__a--lesson">${icon('shield', 14)} Saved as an owner lesson: “Closed on 14 August.” <span class="mini-btn">Undo</span></p>
    </div>`,
    'mock--console',
  );
