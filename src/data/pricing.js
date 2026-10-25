/**
 * Packages exactly as published on https://techdeva.net/pricing/ (observed 2026-10-25).
 * Changing a price is a founder decision — edit it here only with approval.
 *
 * Feature rows reference ids in data/features.js; a package includes a feature
 * when its id appears in `includes`. The comparison table is generated from
 * this, so the cards and the table can never disagree.
 */
export const currencies = [
  { id: 'PKR', label: 'PKR', note: 'Pakistan' },
  { id: 'USD', label: 'USD', note: 'Outside Pakistan' },
];

export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    pitch: 'Run the business and let AI answer WhatsApp',
    price: { PKR: 19999, USD: 99 },
    period: 'month',
    numbers: 1,
    chats: 300,
    includes: ['whatsapp-agent', 'crm', 'appointments', 'invoices', 'stock', 'team', 'approvals', 'isolation'],
  },
  {
    id: 'growth',
    name: 'Growth',
    pitch: 'AI sells, posts, tracks your ads, and Jarvis',
    price: { PKR: 49999, USD: 199 },
    period: 'month',
    numbers: 2,
    chats: 1500,
    recommended: true,
    includes: ['whatsapp-agent', 'crm', 'appointments', 'invoices', 'stock', 'team', 'approvals', 'isolation', 'social-posting', 'reporting', 'assistant'],
  },
  {
    id: 'pro',
    name: 'Pro',
    pitch: 'A full AI team: growth advisor and ads on autopilot',
    price: { PKR: 64999, USD: 299 },
    period: 'month',
    numbers: 5,
    chats: 4000,
    includes: ['whatsapp-agent', 'crm', 'appointments', 'invoices', 'stock', 'team', 'approvals', 'isolation', 'social-posting', 'reporting', 'assistant', 'growth-advisor', 'ad-autopilot'],
  },
];

/** Rows shown in the comparison table, in order. */
export const comparisonRows = [
  'whatsapp-agent', 'crm', 'appointments', 'invoices', 'stock', 'team', 'approvals',
  'social-posting', 'reporting', 'assistant', 'growth-advisor', 'ad-autopilot',
];

export const pricingTerms = [
  ['Ad spend is separate', 'You pay the ad platforms directly. TechDeva never marks up your media spend — you always see the real number.'],
  ['No setup fee', 'We connect everything and configure your business details as part of onboarding, including WhatsApp setup.'],
  ['Month to month', 'Cancel anytime. If it isn’t producing leads, you shouldn’t be paying for it.'],
  ['How to pay', 'Bank transfer to our JS Bank account, or JazzCash / Easypaisa to the same account. Payments are verified within 2 hours.'],
];

export const formatPrice = (amount, currency) =>
  `${currency} ${Number(amount).toLocaleString('en-US')}`;
