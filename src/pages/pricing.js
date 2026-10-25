import { html } from '../templates/html.js';
import { icon } from '../templates/icons.js';
import { hero, section, pricingCards, currencyToggle, comparisonTable, termsGrid, faqList, faqSchema } from '../templates/components.js';
import { plans, pricingTerms, formatPrice } from '../data/pricing.js';
import { faqs } from '../data/content.js';
import { site } from '../config/site.js';

const pricingFaqs = [...faqs.pricing, faqs.trial[0]];

export default {
  id: 'pricing',
  path: '/pricing/',
  title: 'Pricing — Starter, Growth and Pro',
  description: `TechDeva packages from ${formatPrice(plans[0].price.PKR, 'PKR')} (${formatPrice(plans[0].price.USD, 'USD')}) a month. ${site.trialDays}-day free trial, no card, no setup fee, WhatsApp setup included.`,
  breadcrumbs: [{ name: 'Pricing', href: '/pricing/' }],
  schema: [
    faqSchema(pricingFaqs),
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'TechDeva',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: plans.map((p) => ({ '@type': 'Offer', name: p.name, price: String(p.price.PKR), priceCurrency: 'PKR' })),
    },
  ],
  body: html`
  ${hero({
    layout: 'centered',
    breadcrumbs: [{ name: 'Pricing', href: '/pricing/' }],
    eyebrow: 'Pricing',
    title: 'Pick your package. Drop your other tools.',
    lead: `Each package replaces tools a clinic, salon or academy pays for separately. The bigger the package, the more of your marketing runs on its own. Every package starts with a ${site.trialDays}-day free trial.`,
    note: 'No card · No setup fee · Month to month',
  })}
  <section class="section section--tight" aria-labelledby="packages-h">
    <div class="container">
      <h2 id="packages-h" class="visually-hidden">Packages</h2>
      <div class="center">${currencyToggle()}</div>
      ${pricingCards()}
      <p class="fine center">Prices are per month. WhatsApp message fees (charged by Meta) and ad spend are separate. Features marked early access or in development are labelled — they are not sold as finished.</p>
    </div>
  </section>
  ${section({ id: 'compare', tone: 'alt', eyebrow: 'Compare', title: 'Everything side by side', body: comparisonTable() })}
  ${section({ id: 'terms', eyebrow: 'What else you should know', title: 'No surprises on the invoice', body: termsGrid(pricingTerms) })}
  ${section({
    id: 'enterprise',
    tone: 'alt',
    body: html`<div class="banner reveal"><div><h2 class="banner__title">Several branches or a group of businesses?</h2><p>We take on a small number of businesses at a time so each is configured properly. Talk to us about multiple numbers, departments or locations.</p></div><a class="btn btn--secondary btn--lg" href="/contact/?topic=sales">Talk to sales ${icon('arrow', 18)}</a></div>`,
  })}
  ${section({ id: 'faq', narrow: true, eyebrow: 'FAQ', title: 'Pricing questions', body: faqList(pricingFaqs, 'pricing-faq') })}
  `,
};
