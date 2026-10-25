/**
 * /industries and one page per industry, all from the same template and the
 * data in src/data/industries.js. Adding an industry = adding one data entry.
 */
import { html } from '../templates/html.js';
import { icon } from '../templates/icons.js';
import { hero, section, industryCards, checklist, workflow, statsBand, chatMock, featureGrid, limitsList, faqList } from '../templates/components.js';
import { industries } from '../data/industries.js';
import { featureById } from '../data/features.js';
import { proof, faqs } from '../data/content.js';
import { plans, formatPrice } from '../data/pricing.js';
import { site } from '../config/site.js';

const crumbsRoot = { name: 'Industries', href: '/industries/' };

const index = {
  id: 'industries',
  path: '/industries/',
  title: 'Industries — clinics, salons, academies and gyms',
  description: 'One AI business operating system configured to each industry’s own prices, staff and policies: aesthetic clinics, salons, training academies and gyms.',
  breadcrumbs: [crumbsRoot],
  body: html`
  ${hero({
    layout: 'centered',
    breadcrumbs: [crumbsRoot],
    eyebrow: 'Industries',
    title: 'Same platform. Your prices, your staff, your rules.',
    lead: 'A gym and a clinic run on the same tables and the same AI workforce — what changes is configuration: services, price list, departments, booking rules, hours and how the AI speaks.',
    actions: [{ label: `Start ${site.trialDays}-day free trial`, href: '/free-trial/' }, { label: 'Book a demo', href: '/book-a-demo/', variant: 'secondary' }],
  })}
  ${section({ id: 'list', eyebrow: 'Choose your business', title: 'Built around how each business loses leads', body: industryCards(industries) })}
  ${section({
    id: 'config',
    tone: 'alt',
    eyebrow: 'Configuration, not code',
    title: 'What gets configured for your business',
    body: html`<div class="grid grid--3">${[
      ['Services & price list', 'receipt'], ['Departments & numbers', 'whatsapp'], ['Booking rules', 'calendar'],
      ['Working hours & holidays', 'clock'], ['Staff & permissions', 'id'], ['Tone of voice', 'spark'],
    ].map(([t, i]) => html`<div class="card mini-card reveal"><span class="icon-tile">${icon(i)}</span><p>${t}</p></div>`)}</div>`,
  })}
  `,
};

const detail = (ind) => {
  const crumbs = [crumbsRoot, { name: ind.name, href: `/industries/${ind.slug}/` }];
  return {
    id: `industry-${ind.slug}`,
    path: `/industries/${ind.slug}/`,
    title: `${ind.name} — AI on WhatsApp, bookings and CRM`,
    description: `${ind.intro} ${site.trialDays}-day free trial.`,
    breadcrumbs: crumbs,
    body: html`
    ${hero({
      breadcrumbs: crumbs,
      eyebrow: `TechDeva for ${ind.name.toLowerCase()}`,
      title: ind.headline,
      lead: ind.intro,
      actions: [{ label: `Start ${site.trialDays}-day free trial`, href: '/free-trial/' }, { label: 'Book a demo', href: '/book-a-demo/', variant: 'secondary' }],
      visual: chatMock(),
    })}
    ${section({
      id: 'problem',
      eyebrow: 'The problem you’ll recognise',
      title: 'Where the leads actually go',
      lead: ind.problem,
      body: html`<div class="split">
        <div class="card reveal"><h3 class="card__title">What TechDeva does for you</h3>${checklist(ind.does)}</div>
        <div class="card reveal"><h3 class="card__title">A typical conversation</h3>${workflow(ind.workflow, { compact: true, label: `${ind.name} workflow` })}</div>
      </div>`,
    })}
    ${section({
      id: 'human',
      tone: 'alt',
      eyebrow: 'What stays with a human',
      title: 'The limits are fixed, not configurable',
      body: limitsList(ind.human),
    })}
    ${ind.proof
      ? section({
          id: 'proof',
          eyebrow: 'Proven on a real business',
          title: `Running in ${proof.place} today`,
          lead: `${proof.business}: ${proof.summary} Each runs on its own number with its own AI employee — separate memory, separate pipeline, enforced in the database.`,
          body: html`${statsBand(proof)}<p class="center"><a class="text-link" href="/resources/beauty-aesthetic-lounge/">Read the case study ${icon('arrow', 16)}</a></p>`,
        })
      : section({
          id: 'proof',
          eyebrow: 'Honest status',
          title: `No ${ind.short.toLowerCase()} case study yet`,
          lead: `TechDeva runs in production on a clinic, salon and academy. ${ind.name} use the same platform and modules; we will publish results only once a ${ind.short.toLowerCase().replace(/s$/, '')} has numbers we can show the source of.`,
          body: '',
        })}
    ${section({
      id: 'modules',
      tone: 'alt',
      eyebrow: 'Included',
      title: 'Modules you’ll use most',
      body: featureGrid(['whatsapp-agent', 'crm', 'appointments', 'invoices', 'team', 'stock'].map((id) => featureById[id]), { cols: 3 }),
    })}
    ${section({
      id: 'pricing',
      narrow: true,
      eyebrow: 'Pricing',
      title: `From ${formatPrice(plans[0].price.PKR, 'PKR')} a month`,
      lead: `${formatPrice(plans[0].price.USD, 'USD')} outside Pakistan. ${site.trialDays}-day free trial, no setup fee, WhatsApp setup included.`,
      align: 'center',
      body: html`<p class="center"><a class="btn btn--secondary btn--md" href="/pricing/">Compare Starter, Growth and Pro</a></p>${faqList(faqs.general.slice(3, 6), `${ind.slug}-faq`)}`,
    })}
    `,
  };
};

export default [index, ...industries.map(detail)];
