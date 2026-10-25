/**
 * Resources, case study, about, contact, book-a-demo and 404.
 */
import { html } from '../templates/html.js';
import { icon } from '../templates/icons.js';
import { hero, section, resourceCards, statsBand, checklist, logoStrip, faqList } from '../templates/components.js';
import { resources, resourceTypes, proof, trackRecord, faqs } from '../data/content.js';
import { site, whatsappLink } from '../config/site.js';

/* ------------------------------------------------------------ /resources */
const resourcesPage = {
  id: 'resources',
  path: '/resources/',
  title: 'Resources — case studies, articles and guides',
  description: 'TechDeva case studies, articles and guides on answering every enquiry, automating follow-ups and keeping a human in charge.',
  breadcrumbs: [{ name: 'Resources', href: '/resources/' }],
  body: html`
  ${hero({
    layout: 'centered',
    breadcrumbs: [{ name: 'Resources', href: '/resources/' }],
    eyebrow: 'Resources',
    title: 'Learn how a service business stops losing leads',
    lead: 'Case studies with numbers we can show the source of, practical articles, and guides to how the platform behaves.',
  })}
  ${section({ id: 'library', eyebrow: 'Library', title: 'Browse by type', body: resourceCards(resources, { filter: true, types: resourceTypes }) })}
  `,
};

/* --------------------------------------------------------- /case study */
const caseCrumbs = [{ name: 'Resources', href: '/resources/' }, { name: proof.business, href: '/resources/beauty-aesthetic-lounge/' }];
const casePage = {
  id: 'case-study',
  path: '/resources/beauty-aesthetic-lounge/',
  title: `Case study — ${proof.business}, Lahore`,
  description: 'How a doctor-led aesthetic clinic, salon and academy in Gulberg, Lahore answers every WhatsApp enquiry in seconds with TechDeva — PKR 507,005 invoiced in six weeks.',
  breadcrumbs: caseCrumbs,
  schema: [{ '@context': 'https://schema.org', '@type': 'Article', headline: 'A doctor-led clinic in Gulberg stopped losing leads overnight', author: { '@type': 'Organization', name: site.legalName } }],
  body: html`
  ${hero({
    layout: 'centered',
    breadcrumbs: caseCrumbs,
    eyebrow: `Case study · ${proof.place}`,
    title: 'A doctor-led clinic in Gulberg stopped losing leads overnight',
    lead: `${proof.business} · Aesthetic clinic, salon and training academy`,
  })}
  <section class="section section--tight" aria-label="Results"><div class="container">${statsBand(proof)}</div></section>
  <article class="section"><div class="container container--narrow prose">
    <h2>The situation</h2>
    <p>The clinic runs Meta ads and gets most enquiries on WhatsApp. Prices are asked constantly — hair PRP, laser, HydraFacial, courses. The questions are repetitive; the timing is not. A serious enquiry arrives at 11pm as easily as 2pm. Staff answered when they could; between clients, they couldn’t. Leads sat unanswered until morning and some of them booked elsewhere.</p>
    <h2>What was actually broken</h2>
    ${checklist(['Enquiries arriving outside working hours went cold', 'Nobody could say which ad produced which booking', 'Lead details lived in a phone, not a system', 'Two additional department numbers made it worse, not better'], 'checklist--warn')}
    <h2>What was built</h2>
    <h3>Hermes on WhatsApp</h3>
    <p>Answers in seconds, in Roman Urdu and English, using the clinic’s real price list. Qualifies the enquiry and offers a slot.</p>
    <h3>A CRM that captures everything</h3>
    <p>Name, number, service, source and the full conversation — with leads split by which number they arrived on.</p>
    <h3>Reliability customers never see</h3>
    <p>If anything breaks behind the scenes, the customer gets a polite holding message instead of a technical error, and the owner gets alerted.</p>
    <h2>Three businesses, one platform</h2>
    <p>The clinic, the salon and the academy each run on their own WhatsApp number with their own AI employee — separate memory, separate pipeline. The separation is enforced in the database, not just in the application.</p>
    <p class="fine">${proof.source}</p>
  </div></article>
  `,
  cta: { title: 'See it running on your business', text: 'A short demo on your actual services and prices — not a generic slideshow.' },
};

/* ---------------------------------------------------------------- /about */
const aboutPage = {
  id: 'about',
  path: '/about/',
  title: 'About — built for our own business first',
  description: 'TechDeva was built in Lahore by operators who kept losing midnight leads, proved on a real clinic, then turned into a platform.',
  breadcrumbs: [{ name: 'About', href: '/about/' }],
  body: html`
  ${hero({
    layout: 'centered',
    breadcrumbs: [{ name: 'About', href: '/about/' }],
    eyebrow: 'About TechDeva',
    title: 'We built this for our own business first',
    lead: 'TechDeva was not designed in a boardroom. We ran the businesses — an international e-commerce brand, a packaging company and a doctor-led aesthetic clinic in Lahore — and kept hitting the same wall: leads arriving at midnight with nobody to answer them. So we built an AI workforce to solve it, proved it on a real clinic, and turned it into a platform.',
  })}
  ${section({
    id: 'mission',
    body: html`<div class="grid grid--2">
      <article class="card reveal"><p class="card__kicker">Mission</p><h2 class="card__title card__title--lg">Run customer operations without hiring for them</h2><p class="card__text">Every enquiry answered, every lead captured, every appointment booked — while the owner keeps approval over anything that spends money or goes public.</p></article>
      <article class="card reveal"><p class="card__kicker">Vision</p><h2 class="card__title card__title--lg">One platform, many businesses</h2><p class="card__text">A clinic, a salon and a training academy should each get an AI workforce configured to their own prices, staff and policies — not a bespoke build every time.</p></article>
    </div>`,
  })}
  ${section({
    id: 'beliefs',
    tone: 'alt',
    eyebrow: 'What we believe',
    title: 'The principles built into the architecture',
    body: html`<div class="grid grid--3">${[
      ['AI recommends. Humans approve.', 'Anything that spends money, publishes publicly or changes pricing waits for a person.', 'shield'],
      ['Never fabricate.', 'No invented price, metric or availability. No data means a named gap — not a guess.', 'eye'],
      ['Isolation is structural.', 'Each business is separated in the database itself, not by a filter someone can forget.', 'lock'],
    ].map(([t, d, i]) => html`<article class="card reveal"><span class="icon-tile">${icon(i)}</span><h3 class="card__title">${t}</h3><p class="card__text">${d}</p></article>`)}</div>`,
  })}
  ${section({
    id: 'team',
    eyebrow: 'Founder',
    title: site.founder,
    lead: 'We take on a small number of businesses at a time so each one is configured properly rather than simply switched on.',
    body: logoStrip(trackRecord),
  })}
  `,
};

/* ------------------------------------------------------ /contact + demo */
const contactForm = (mode) => html`<form class="form card" method="post" novalidate data-contact-form data-mode="${mode}">
  <div class="form__grid">
    <div class="field"><label for="c-name">Your name <span aria-hidden="true">*</span></label><input id="c-name" name="name" autocomplete="name" required minlength="2" maxlength="120" data-label="Your name"><p class="field__error" id="c-name-err" hidden></p></div>
    <div class="field"><label for="c-business">Business name <span aria-hidden="true">*</span></label><input id="c-business" name="business" autocomplete="organization" required minlength="2" maxlength="120" data-label="Business name"><p class="field__error" id="c-business-err" hidden></p></div>
    <div class="field"><label for="c-phone">WhatsApp number <span aria-hidden="true">*</span></label><input id="c-phone" name="phone" type="tel" autocomplete="tel" required inputmode="tel" data-rule="phone" placeholder="+92 3xx xxxxxxx" data-label="WhatsApp number"><p class="field__error" id="c-phone-err" hidden></p></div>
    <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" data-rule="email" data-label="Email"><p class="field__error" id="c-email-err" hidden></p></div>
    <div class="field"><label for="c-type">Type of business <span aria-hidden="true">*</span></label>
      <select id="c-type" name="type" required data-label="Type of business"><option value="">Choose one</option><option>Aesthetic clinic</option><option>Salon</option><option>Training academy</option><option>Gym or fitness studio</option><option>Other service business</option></select>
      <p class="field__error" id="c-type-err" hidden></p></div>
    <div class="field"><label for="c-topic">Topic</label>
      <select id="c-topic" name="topic" data-topic-select><option value="demo"${mode === 'demo' ? ' selected' : ''}>Book a demo</option><option value="sales">Pricing & packages</option><option value="support">Existing account</option><option value="other">Something else</option></select></div>
    <div class="field field--full"><label for="c-msg">${mode === 'demo' ? 'What do you most want to fix?' : 'How can we help?'} <span aria-hidden="true">*</span></label><textarea id="c-msg" name="message" rows="4" required minlength="10" maxlength="1500" data-label="Message"></textarea><p class="field__error" id="c-msg-err" hidden></p></div>
  </div>
  <p class="form__note">${icon('whatsapp', 16)} This form does not store anything on our servers. Sending opens WhatsApp with your message filled in — nothing is sent until you press send there.</p>
  <div class="form__actions">
    <button class="btn btn--primary btn--lg" type="submit" disabled>Continue in WhatsApp ${icon('arrow', 18)}</button>
    <button class="btn btn--ghost btn--lg" type="button" data-send-email disabled>Send by email instead</button>
  </div>
  <div class="form__status" role="status" aria-live="polite" data-form-status></div>
</form>`;

const contactAside = () => html`<aside class="contact-aside">
  <div class="card reveal"><h2 class="card__title">Get in touch</h2>
    <ul class="contact-list">
      <li>${icon('whatsapp', 20)}<div><b>WhatsApp</b><a href="${whatsappLink()}" target="_blank" rel="noopener">${site.contact.phoneDisplay}</a></div></li>
      <li>${icon('phone', 20)}<div><b>Call</b><a href="tel:${site.contact.phoneIntl}">${site.contact.phoneDisplay}</a></div></li>
      <li>${icon('mail', 20)}<div><b>Email</b><a href="mailto:${site.contact.email}">${site.contact.email}</a></div></li>
      <li>${icon('pin', 20)}<div><b>Office</b><span>${site.contact.address}</span></div></li>
      <li>${icon('clock', 20)}<div><b>Business hours</b>${site.contact.hours.map(([d, h]) => html`<span>${d}: ${h}</span>`)}</div></li>
    </ul>
  </div>
</aside>`;

const contactPage = (mode) => {
  const isDemo = mode === 'demo';
  const path = isDemo ? '/book-a-demo/' : '/contact/';
  const name = isDemo ? 'Book a demo' : 'Contact';
  return {
    id: isDemo ? 'demo' : 'contact',
    path,
    title: isDemo ? 'Book a demo — see it answer a real message' : 'Contact TechDeva — Lahore, Pakistan',
    description: isDemo
      ? 'A short demo with the AI replying live on WhatsApp while you watch, and the dashboard walked through with your business in mind.'
      : `Talk to TechDeva on WhatsApp, by phone or email. ${site.contact.address}.`,
    breadcrumbs: [{ name, href: path }],
    hideFooterCta: true,
    body: html`
    ${hero({
      layout: 'centered',
      breadcrumbs: [{ name, href: path }],
      eyebrow: name,
      title: isDemo ? 'See it answer a real message' : 'Want to work with us? Let’s talk.',
      lead: isDemo
        ? 'We’ll show you the AI replying live on WhatsApp while you watch, and walk through the dashboard with your business in mind. No slides, no obligation.'
        : 'Tell us about your business. Prefer WhatsApp? Message us — you’ll get a reply in seconds, which is rather the point.',
    })}
    <section class="section section--tight"><div class="container contact-layout">${contactForm(mode)}${contactAside()}</div></section>
    ${section({ id: 'faq', tone: 'alt', narrow: true, eyebrow: 'FAQ', title: 'Before you get in touch', body: faqList([...faqs.trial.slice(1), faqs.general[0]], `${mode}-faq`) })}
    `,
  };
};

/* ------------------------------------------------------------------- 404 */
const notFound = {
  id: 'not-found',
  path: '/404.html',
  file: '404.html',
  noindex: true,
  title: 'Page not found',
  description: 'The page you were looking for is not on techdeva.net.',
  hideFooterCta: true,
  body: html`${hero({
    layout: 'centered',
    eyebrow: '404',
    title: 'This page isn’t here',
    lead: 'It may have moved when the site was rebuilt. These are the places most people are looking for:',
    actions: [{ label: 'Go to the homepage', href: '/' }, { label: 'See pricing', href: '/pricing/', variant: 'secondary' }],
  })}`,
};

export default [resourcesPage, casePage, aboutPage, contactPage('contact'), contactPage('demo'), notFound];
