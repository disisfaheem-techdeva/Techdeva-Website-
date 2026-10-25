/**
 * Product pages: /features, /ai-assistant, /business-management, /automation,
 * /integrations. They share the category-landing template — hero, in-page
 * section nav, alternating feature rows, CTA — the pattern observed on Zoho's
 * product pages, filled with TechDeva's own capabilities.
 */
import { html } from '../templates/html.js';
import { icon } from '../templates/icons.js';
import {
  hero, section, featureGrid, featureRows, workflow, steps, limitsList, integrationCards, checklist,
  chatMock, dashboardMock, approvalMock, pipelineMock, assistantMock, faqList, faqSchema, brainOrbit,
} from '../templates/components.js';
import { statusBadge } from '../templates/layout.js';
import { features, featureGroups, featureById, limits, STATUS } from '../data/features.js';
import { integrations, notYetSupported, faqs } from '../data/content.js';
import { site } from '../config/site.js';

const subnav = (items) =>
  html`<nav class="subnav" aria-label="On this page"><div class="container subnav__inner">${items.map(
    ([href, label]) => html`<a class="subnav__link" href="${href}">${label}</a>`,
  )}</div></nav>`;

const legend = () =>
  html`<p class="status-legend">${Object.entries(STATUS).map(([k]) => statusBadge(k))}<span>Every capability is labelled with its real status.</span></p>`;

/* ------------------------------------------------------------- /features */
const featuresPage = {
  id: 'features',
  path: '/features/',
  title: 'Features — everything TechDeva does',
  description: 'WhatsApp AI sales agent, CRM, appointments, invoices, stock, team logins, approvals and reporting — every TechDeva capability with its real status.',
  breadcrumbs: [{ name: 'Features', href: '/features/' }],
  body: html`
  ${hero({
    breadcrumbs: [{ name: 'Features', href: '/features/' }],
    eyebrow: 'Platform',
    title: 'Every feature, with its real status',
    lead: `${features.length} capabilities in ${featureGroups.length} areas. Live means a business runs on it today; early access means it works and is being proven; in development means it is being built and is not sold as available.`,
    actions: [{ label: `Start ${site.trialDays}-day free trial`, href: '/free-trial/' }, { label: 'Compare packages', href: '/pricing/', variant: 'secondary' }],
    visual: brainOrbit(['whatsapp-agent', 'crm', 'appointments', 'invoices', 'stock', 'team', 'approvals', 'reporting'].map((id) => ({ icon: featureById[id].icon, label: featureById[id].title.split(/[,&]| —/)[0].trim() }))),
  })}
  ${subnav(featureGroups.map((g) => [`#${g.id}`, g.title]))}
  <div class="container">${legend()}</div>
  ${featureGroups.map((g, i) =>
    section({
      id: g.id,
      tone: i % 2 ? 'alt' : 'base',
      eyebrow: g.title,
      title: g.blurb,
      body: html`<div class="detail-list">${features
        .filter((f) => f.group === g.id)
        .map(
          (f) => html`<article class="card detail-card reveal" id="f-${f.id}">
            <div class="feature-card__top"><span class="icon-tile">${icon(f.icon)}</span>${statusBadge(f.status)}</div>
            <h3 class="card__title">${f.title}</h3>
            <p class="card__text">${f.body}</p>
            ${checklist(f.points)}
          </article>`,
        )}</div>`,
    }),
  )}
  `,
};

/* --------------------------------------------------------- /ai-assistant */
const aiPage = {
  id: 'ai-assistant',
  path: '/ai-assistant/',
  title: 'AI assistant — Hermes on WhatsApp and Jarvis for owners',
  description: 'Hermes answers every WhatsApp enquiry in English, Urdu and Roman Urdu, quoting only your real prices. Jarvis lets owners ask about their figures in plain language.',
  breadcrumbs: [{ name: 'AI assistant', href: '/ai-assistant/' }],
  body: html`
  ${hero({
    breadcrumbs: [{ name: 'AI assistant', href: '/ai-assistant/' }],
    eyebrow: 'AI assistant',
    title: html`Two assistants. <span class="grad-text">One for customers, one for you.</span>`,
    lead: 'Hermes is the AI sales employee your customers talk to on WhatsApp. Jarvis is the console you talk to about your own business. Both work from the same Business Brain — your services, prices, hours and policies — so neither can invent a price or a policy.',
    actions: [{ label: `Start ${site.trialDays}-day free trial`, href: '/free-trial/' }, { label: 'See it answer live', href: '/book-a-demo/', variant: 'secondary' }],
    visual: chatMock(),
  })}
  ${subnav([['#hermes', 'Hermes'], ['#jarvis', 'Jarvis'], ['#brain', 'Business Brain'], ['#limits', 'Limits']])}
  ${section({
    id: 'hermes',
    eyebrow: 'Hermes · AI sales employee',
    title: 'Answers every WhatsApp enquiry within seconds, day or night',
    body: featureRows([
      {
        title: 'Qualifies, quotes and books',
        status: featureById['whatsapp-agent'].status,
        text: featureById['whatsapp-agent'].body,
        points: ['English, Urdu and Roman Urdu', 'Separate numbers keep clinic, salon and academy apart', 'A polite holding message if anything behind it fails — and you are alerted'],
        visual: chatMock(),
      },
      {
        title: 'Hands over the moment you step in',
        text: 'When a person replies in a conversation, Hermes stands down. Control events jump the queue and a run-time check confirms the conversation is human-owned, so it never sends a duplicate once you have taken over.',
        points: ['Take any thread at any point', 'No duplicate replies after takeover'],
        visual: approvalMock(),
      },
    ]),
  })}
  ${section({
    id: 'jarvis',
    tone: 'alt',
    eyebrow: 'Jarvis · AI console',
    title: 'Ask about your business in plain language',
    body: featureRows([
      {
        title: 'Your figures, answered — and gaps named',
        status: featureById.assistant.status,
        text: featureById.assistant.body,
        points: featureById.assistant.points,
        visual: assistantMock(),
      },
    ]),
  })}
  ${section({
    id: 'brain',
    eyebrow: 'Business Brain',
    title: 'Everything the AI knows comes from you, once',
    lead: 'Your services, prices, durations, opening hours, staff and policies go in a single time. Every AI employee answers from that same record.',
    body: html`<div class="split split--center">
      ${brainOrbit([
        { icon: 'whatsapp', label: 'Hermes' },
        { icon: 'spark', label: 'Jarvis' },
        { icon: 'users', label: 'CRM' },
        { icon: 'calendar', label: 'Bookings' },
        { icon: 'receipt', label: 'Invoices' },
        { icon: 'chart', label: 'Reports' },
      ])}
      <div class="grid grid--2">${[
        ['Services, prices and durations', 'receipt'],
        ['Opening hours and holidays', 'clock'],
        ['Staff and who does what', 'users'],
        ['Deposit, cancellation and refund policy', 'shield'],
      ].map(([t, i]) => html`<div class="card mini-card reveal"><span class="icon-tile">${icon(i)}</span><p>${t}</p></div>`)}</div>
    </div>`,
  })}
  ${section({
    id: 'limits',
    tone: 'alt',
    eyebrow: 'Limits',
    title: 'What no assistant is allowed to do',
    lead: 'The limits matter as much as the capabilities, so they are stated plainly.',
    body: limitsList(limits),
  })}
  `,
};

/* -------------------------------------------------- /business-management */
const bmIds = ['crm', 'appointments', 'invoices', 'stock', 'team'];
const bmPage = {
  id: 'business-management',
  path: '/business-management/',
  title: 'Business management — CRM, bookings, invoices, stock and team',
  description: 'One dashboard for customers, appointments, invoices, payments, daily closing, stock alerts and staff PIN logins.',
  breadcrumbs: [{ name: 'Business management', href: '/business-management/' }],
  body: html`
  ${hero({
    breadcrumbs: [{ name: 'Business management', href: '/business-management/' }],
    eyebrow: 'Business management',
    title: 'Run the whole business from one screen',
    lead: 'Customers, appointments, bills, stock and staff in one place — and every lead Hermes captures lands here automatically, with the full conversation attached.',
    actions: [{ label: `Start ${site.trialDays}-day free trial`, href: '/free-trial/' }, { label: 'Book a demo', href: '/book-a-demo/', variant: 'secondary' }],
    visual: dashboardMock(),
  })}
  ${subnav(bmIds.map((id) => [`#${id}`, featureById[id].title.split(' ')[0].replace(',', '')]))}
  ${section({
    id: 'modules',
    eyebrow: 'Modules',
    title: 'Built in the order people actually use it',
    lead: 'Today → Leads → Appointments → Customers → Money → Stock → Team. Operators see their assigned work; owners see everything.',
    body: featureRows(
      bmIds.map((id, i) => {
        const f = featureById[id];
        return { id, title: f.title, status: f.status, text: f.body, points: f.points, visual: [pipelineMock, dashboardMock, approvalMock, pipelineMock, dashboardMock][i]() };
      }),
    ),
  })}
  ${section({
    id: 'money-rules',
    tone: 'alt',
    eyebrow: 'Money you can audit',
    title: 'Financial records that never quietly change',
    body: html`<div class="grid grid--3">${[
      ['Stored as issued', 'An invoice total is computed once and stored. Prices change; history doesn’t.'],
      ['Void, never delete', 'A wrong bill is voided with a reason, so the trail stays intact.'],
      ['Locked when billed', 'Once an appointment is billed it is locked; a correction is a new document.'],
    ].map(([t, d]) => html`<div class="card reveal"><h3 class="card__title">${t}</h3><p class="card__text">${d}</p></div>`)}</div>`,
  })}
  `,
};

/* ------------------------------------------------------------ /automation */
const autoPage = {
  id: 'automation',
  path: '/automation/',
  title: 'Automation — the work that runs itself',
  description: 'How TechDeva’s orchestrator turns an enquiry into a qualified lead, a booking, a CRM update and a report — with humans in charge of anything irreversible.',
  breadcrumbs: [{ name: 'Automation', href: '/automation/' }],
  body: html`
  ${hero({
    layout: 'centered',
    breadcrumbs: [{ name: 'Automation', href: '/automation/' }],
    eyebrow: 'Automation',
    title: 'Create one lead. Watch the system run itself.',
    lead: 'A coordinator reads every event and hands work to the right AI employee. Each rule replaces one thing someone used to do by hand — and anything that spends money or goes public stops at your approval.',
    actions: [{ label: `Start ${site.trialDays}-day free trial`, href: '/free-trial/' }, { label: 'Book a demo', href: '/book-a-demo/', variant: 'secondary' }],
  })}
  ${section({
    id: 'pipeline',
    eyebrow: 'The core pipeline',
    title: 'New enquiry → lead → booking → updated records',
    body: workflow(
      [
        { title: 'lead.created', text: 'Enquiry captured from WhatsApp', icon: 'whatsapp', by: 'ai' },
        { title: 'Qualify', text: 'Hermes asks the right questions', icon: 'spark', by: 'ai' },
        { title: 'Hot-lead alert', text: 'Owner notified on qualified leads', icon: 'bolt', by: 'ai' },
        { title: 'Book', text: 'Appointment offered and booked', icon: 'calendar', by: 'ai' },
        { title: 'Update', text: 'Lead moved, CRM and reports refreshed', icon: 'chart', by: 'ai' },
      ],
      { label: 'Core automation pipeline' },
    ),
  })}
  ${section({
    id: 'rules',
    tone: 'alt',
    eyebrow: 'Rules',
    title: 'Rules that already replace manual coordination',
    body: html`<div class="grid grid--3">${[
      ['When an enquiry arrives', 'Hermes qualifies it.', 'spark'],
      ['When a lead is qualified', 'It is booked, and you get a hot-lead alert.', 'bolt'],
      ['When you take over a chat', 'Hermes halts immediately — human authority wins.', 'users'],
      ['When an appointment is booked', 'The lead moves to booked; CRM and reporting update.', 'calendar'],
      ['When revenue is recorded', 'The lead is marked sold and reports refresh.', 'receipt'],
      ['When a follow-up is due', 'The scheduler fires it — nobody needs a reminder.', 'clock'],
    ].map(([t, d, i]) => html`<article class="card reveal"><span class="icon-tile">${icon(i)}</span><h3 class="card__title">${t}</h3><p class="card__text">${d}</p></article>`)}</div>`,
  })}
  ${section({
    id: 'reliability',
    eyebrow: 'Reliability',
    title: 'Built so work is never silently lost',
    body: html`<div class="grid grid--3">${[
      ['Retries, then a named failure', 'A failing task is retried, then quarantined for a person — never dropped.'],
      ['Runs once, even with many workers', 'Tasks are claimed atomically, so nothing runs twice.'],
      ['Waits for what it depends on', 'A task that depends on another is held until that one is done.'],
    ].map(([t, d]) => html`<div class="card reveal"><h3 class="card__title">${t}</h3><p class="card__text">${d}</p></div>`)}</div>`,
  })}
  ${section({
    id: 'go-live',
    tone: 'alt',
    eyebrow: 'Going live',
    title: 'Ten steps from signup to your number answering',
    lead: 'No long build. Until step eight, no customer has spoken to it.',
    body: steps([
      { title: 'Start', text: 'Sign up and tell us where your business lives online — your site, your pages, your competitors.' },
      { title: 'Configure', text: 'Services, prices, durations, hours, staff and policies go in once.' },
      { title: 'Business Brain', text: 'That becomes one shared record every AI employee answers from.' },
      { title: 'Choose your workforce', text: 'Most businesses start with Hermes on WhatsApp — that is where enquiries are lost.' },
      { title: 'Test', text: 'The agent is run against real scenarios: a priced quote, a service you don’t offer, an out-of-hours enquiry, a price objection.' },
      { title: 'Review', text: 'You read exactly what it said in each case. Nothing is hidden behind a score.' },
      { title: 'Approve', text: 'Nothing goes live until you approve it.' },
      { title: 'Deploy', text: 'Your number is paired and the AI starts answering.' },
      { title: 'Operate', text: 'Enquiries answered, leads captured and appointments booked around the clock, with anything unusual escalated.' },
      { title: 'Measure', text: 'Cost per lead, bookings, show-up rate, and which campaign produced which booking.' },
    ]),
  })}
  `,
};

/* ---------------------------------------------------------- /integrations */
const intPage = {
  id: 'integrations',
  path: '/integrations/',
  title: 'Integrations — what TechDeva connects to, and its real status',
  description: 'WhatsApp, Meta and Google ad results, Facebook and Instagram posting — each TechDeva integration labelled live, early access or in development.',
  breadcrumbs: [{ name: 'Integrations', href: '/integrations/' }],
  schema: [faqSchema(faqs.pricing.slice(0, 2))],
  body: html`
  ${hero({
    layout: 'centered',
    breadcrumbs: [{ name: 'Integrations', href: '/integrations/' }],
    eyebrow: 'Integrations',
    title: 'Connected where your customers already are',
    lead: 'You connect Meta, Google and WhatsApp through their own login screens and approve the access there — TechDeva never sees or stores your password. Every connection below shows its real status.',
    actions: [{ label: `Start ${site.trialDays}-day free trial`, href: '/free-trial/' }, { label: 'Ask about an integration', href: '/contact/', variant: 'secondary' }],
  })}
  <div class="container">${legend()}</div>
  ${section({ id: 'list', title: 'Integrations', eyebrow: 'Available and coming', body: integrationCards(integrations) })}
  ${section({
    id: 'not-yet',
    tone: 'alt',
    eyebrow: 'Not available today',
    title: 'Asked for, not built',
    lead: 'These come up often. None of them is connected today — if one matters to your business, tell us and it informs what gets built next.',
    body: html`<ul class="tag-list">${notYetSupported.map((n) => html`<li>${n}</li>`)}</ul>`,
  })}
  ${section({ id: 'faq', narrow: true, eyebrow: 'FAQ', title: 'Connection questions', body: faqList(faqs.pricing.slice(0, 2), 'int-faq') })}
  `,
};

export default [featuresPage, aiPage, bmPage, autoPage, intPage];
