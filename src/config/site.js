/**
 * Business facts the whole site reads from. Every value here was observed on the
 * live techdeva.net (2026-10-25) or in the platform code — see
 * docs/zoho-research/page-mapping.md for the source of each one.
 *
 * Change a fact here, not in a page template, so the site cannot disagree with itself.
 */
export const site = {
  name: 'TechDeva',
  legalName: 'TechDeva AI Solutions',
  url: 'https://techdeva.net',
  tagline: 'The AI Business Operating System',
  positioning: 'AI-Powered Business Management and Automation System',
  description:
    'TechDeva runs clinics, salons, gyms and academies from one dashboard — bookings, bills, stock and team — with a WhatsApp AI agent that answers and books customers 24/7.',

  // Trial length: 7 days — founder decision, 2026-10-25. The platform's
  // provision_tenant_from_signup() still sets now() + 14 days at the time of
  // writing; the founder is changing the backend to match. If you change this
  // value, change the backend interval too.
  trialDays: 7,

  contact: {
    phoneDisplay: '0335 469 3665',
    phoneIntl: '+923354693665',
    whatsapp: '923354693665',
    email: 'admin@techdeva.net',
    address: 'Orange Square Plaza, near Baghbanpura Metro Station, GT Road, Lahore',
    city: 'Lahore',
    country: 'PK',
    hours: [
      ['Mon – Sat', '11 AM – 7 PM'],
      ['Sunday', 'Closed'],
    ],
  },

  links: {
    signIn: 'https://portal.techdeva.net/',
    privacy: 'https://portal.techdeva.net/privacy',
    terms: 'https://portal.techdeva.net/terms',
    dataDeletion: 'https://portal.techdeva.net/data-deletion',
    // The signup page the platform already serves; used as the fallback when
    // this build is not connected to the API.
    hostedSignup: 'https://portal.techdeva.net/',
    liveBlog: 'https://techdeva.net/blog/',
  },

  founder: 'Syed Faheem Abbas Zaidi',

  // Share image for link previews (1200×630, placed in /public). None exists
  // yet; set e.g. '/og-image.png' once a real one is designed.
  ogImage: null,
};

/** Read at build time by Vite; empty means "not connected" (see .env.example). */
export const apiBase = (import.meta.env?.VITE_API_BASE || '').replace(/\/$/, '');

export const whatsappLink = (text = '') =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
