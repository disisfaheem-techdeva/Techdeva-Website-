import { html } from '../templates/html.js';
import { icon } from '../templates/icons.js';
import {
  hero, section, featureGrid, tabs, featureRows, storyPin, heroStage, statsBand, logoStrip, industryCards,
  integrationCards, faqList, faqSchema, approvalMock, checklist, pricingCards, currencyToggle,
} from '../templates/components.js';
import { features, featureGroups } from '../data/features.js';
import { industries } from '../data/industries.js';
import { integrations, proof, trackRecord, faqs } from '../data/content.js';
import { site } from '../config/site.js';

const homeFaqs = [...faqs.general.slice(0, 4), faqs.trial[0], faqs.pricing[2]];

const body = html`
${hero({
  eyebrow: 'AI Business Operating System',
  title: html`AI employees that run your <span class="grad-text">sales, CRM and bookings</span>`,
  lead: 'TechDeva answers every WhatsApp enquiry in seconds, captures every lead, books the appointment and keeps the numbers — for clinics, salons, gyms and academies. Nothing that touches money or goes public happens without your approval.',
  actions: [
    { label: `Start ${site.trialDays}-day free trial`, href: '/free-trial/' },
    { label: 'Book a demo', href: '/book-a-demo/', variant: 'secondary' },
  ],
  note: 'No card · No setup fee · WhatsApp setup included',
  visual: heroStage(),
})}

<section class="section section--tight" aria-label="Proof">
  <div class="container">${statsBand(proof)}</div>
</section>

${section({
  id: 'what',
  eyebrow: 'What TechDeva is',
  title: 'An operating system for the business — not another tool',
  lead: 'Most service businesses don’t have a software problem. They have a staffing problem: leads message at 11pm and nobody replies, and the CRM is a WhatsApp thread someone forgot to write down. TechDeva is the layer the business runs on — specialised AI employees, one coordinator, one shared memory of your business.',
  body: tabs({
    id: 'groups',
    label: 'Platform areas',
    items: featureGroups.map((g) => ({
      id: g.id,
      label: g.title,
      content: html`<p class="tabs__blurb">${g.blurb}</p>${featureGrid(features.filter((f) => f.group === g.id), { cols: 3 })}`,
    })),
  }),
})}

${section({
  id: 'workforce',
  tone: 'alt',
  eyebrow: 'How a lead moves',
  title: 'From a midnight message to a booked appointment',
  lead: 'This is the pipeline the platform runs on its own today. You are pulled in only where a person should decide.',
  body: html`${storyPin([
    { title: 'Enquiry arrives', text: 'A WhatsApp message at 11pm. Hermes replies within seconds, in the customer’s language.', by: 'ai',
      messages: [['in', 'Assalam o alaikum, laser hair removal ka rate kya hai?']] },
    { title: 'Qualified', text: 'It asks what a good receptionist would: which area, which day suits them.', by: 'ai',
      messages: [['out', 'Walaikum assalam! Which area would you like treated, and which day suits you?'], ['in', 'Full arms. Saturday shaam?']] },
    { title: 'Quoted from your list', text: 'The price comes from your rate list. No rate configured? It says so and hands over.', by: 'ai',
      messages: [['out', 'Full arms is on your list at the clinic’s set rate per session. Saturday 5:00 PM is free.']] },
    { title: 'Appointment booked', text: 'Written to the calendar against the right service and staff member.', by: 'ai',
      messages: [['in', 'Done, book kar dein.'], ['out', 'Booked for Saturday 5:00 PM. You’ll get a reminder that morning.']] },
    { title: 'CRM & reports updated', text: 'The lead moves to booked with the full conversation and the number it came in on.', by: 'ai',
      messages: [['event', ' Lead → Booked · CRM updated · Owner notified']] },
    { title: 'You step in anytime', text: 'Reply yourself and Hermes stands down at once — no duplicate messages.', by: 'human',
      messages: [['out', 'Owner: Welcome! I’ll see you myself on Saturday.'], ['event', ' Owner took over · Hermes stood down']] },
  ])}
  <p class="center"><a class="text-link" href="/automation/">See every automation ${icon('arrow', 16)}</a></p>`,
})}

${section({
  id: 'control',
  eyebrow: 'Control & trust',
  title: 'AI recommends. You approve.',
  body: featureRows([
    {
      title: 'One inbox of decisions waiting for you',
      text: 'Approving a reply and sending it are two different actions. Anything that spends money, publishes publicly or falls outside your price list is parked for a person — never answered badly.',
      points: ['It quotes from your price list, nothing else', 'It steps back the moment you reply', 'Gaps are shown, not filled with a guess'],
      visual: approvalMock(),
      link: { label: 'What the AI is never allowed to do', href: '/ai-assistant/#limits' },
    },
  ]),
})}

${section({
  id: 'industries',
  tone: 'alt',
  eyebrow: 'Industries',
  title: 'One platform, configured to your business',
  lead: 'A clinic, a salon and an academy run on the same system with their own prices, staff and policies. Industry is configuration — not a separate product.',
  body: html`${industryCards(industries)}<p class="center"><a class="text-link" href="/industries/">All industries ${icon('arrow', 16)}</a></p>`,
})}

${section({
  id: 'proof',
  eyebrow: 'Proof',
  title: 'Running a real business right now',
  lead: `${proof.business} in ${proof.place}: ${proof.summary} Every enquiry answered instantly, every conversation captured, prices quoted without staff on call.`,
  body: html`<div class="split">
      <div class="card quote-card reveal">
        <p class="card__kicker">Case study</p>
        <h3 class="card__title">A doctor-led clinic in Gulberg stopped losing leads overnight</h3>
        ${checklist(['Hermes on WhatsApp in Roman Urdu and English', 'A CRM that captures every lead by source number', 'A polite holding message if anything breaks — and the owner alerted'])}
        <a class="btn btn--secondary btn--md" href="/resources/beauty-aesthetic-lounge/">Read the case study</a>
      </div>
      ${logoStrip(trackRecord)}
    </div>`,
})}

${section({
  id: 'integrations',
  tone: 'alt',
  eyebrow: 'Integrations',
  title: 'Connected where your customers already are',
  lead: 'WhatsApp first, because that is where enquiries arrive and where they are lost. Each connection is labelled with its real status.',
  body: html`${integrationCards(integrations.slice(0, 3))}<p class="center"><a class="text-link" href="/integrations/">All integrations and their status ${icon('arrow', 16)}</a></p>`,
})}

${section({
  id: 'pricing',
  eyebrow: 'Pricing',
  title: 'Priced like an employee, not an enterprise contract',
  lead: `Every package starts with a ${site.trialDays}-day free trial. Month to month, no setup fee.`,
  align: 'center',
  body: html`<div class="center">${currencyToggle()}</div>${pricingCards()}<p class="center"><a class="text-link" href="/pricing/">Compare packages in detail ${icon('arrow', 16)}</a></p>`,
})}

${section({
  id: 'faq',
  tone: 'alt',
  eyebrow: 'FAQ',
  title: 'Straight answers',
  narrow: true,
  body: html`${faqList(homeFaqs, 'home-faq')}<p class="center"><a class="text-link" href="/pricing/#faq">More questions ${icon('arrow', 16)}</a></p>`,
})}
`;

export default {
  id: 'home',
  path: '/',
  title: 'TechDeva — AI business operating system for clinics, salons, gyms and academies',
  description: site.description + ` ${site.trialDays}-day free trial.`,
  schema: [faqSchema(homeFaqs)],
  body,
};
