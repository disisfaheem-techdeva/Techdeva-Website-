/**
 * Navigation model. The header mega menu, the mobile drawer and the footer all
 * render from this, so a page added here appears everywhere at once.
 *
 * Pattern adapted from zoho.com's Products menu: a left rail of categories
 * (tabs) with a card grid on the right, plus simple dropdowns for the rest.
 */
import { features, featureGroups } from './features.js';
import { industries } from './industries.js';

export const productMenu = {
  label: 'Platform',
  rail: featureGroups.map((g) => ({
    id: g.id,
    title: g.title,
    blurb: g.blurb,
    items: features
      .filter((f) => f.group === g.id)
      .map((f) => ({ title: f.title, text: f.short, href: f.page, icon: f.icon, status: f.status })),
  })),
  footer: [
    { label: 'Explore every feature', href: '/features/' },
    { label: 'How automation works', href: '/automation/' },
  ],
};

export const primaryNav = [
  { type: 'mega', id: 'platform', ...productMenu },
  {
    type: 'dropdown',
    id: 'solutions',
    label: 'Solutions',
    columns: [
      {
        title: 'By industry',
        links: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}/` })),
      },
      {
        title: 'By need',
        links: [
          { label: 'AI assistant', href: '/ai-assistant/' },
          { label: 'Business management', href: '/business-management/' },
          { label: 'Automation', href: '/automation/' },
          { label: 'Integrations', href: '/integrations/' },
        ],
      },
    ],
  },
  { type: 'link', id: 'pricing', label: 'Pricing', href: '/pricing/' },
  {
    type: 'dropdown',
    id: 'resources',
    label: 'Resources',
    columns: [
      {
        title: 'Learn',
        links: [
          { label: 'Resource library', href: '/resources/' },
          { label: 'Clinic case study', href: '/resources/beauty-aesthetic-lounge/' },
          { label: 'Blog', href: 'https://techdeva.net/blog/', external: true },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About TechDeva', href: '/about/' },
          { label: 'Contact', href: '/contact/' },
          { label: 'Book a demo', href: '/book-a-demo/' },
        ],
      },
    ],
  },
];

export const footerNav = [
  {
    title: 'Platform',
    links: [
      { label: 'All features', href: '/features/' },
      { label: 'AI assistant', href: '/ai-assistant/' },
      { label: 'Business management', href: '/business-management/' },
      { label: 'Automation', href: '/automation/' },
      { label: 'Integrations', href: '/integrations/' },
      { label: 'Pricing', href: '/pricing/' },
    ],
  },
  {
    title: 'Industries',
    links: [{ label: 'All industries', href: '/industries/' }, ...industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}/` }))],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resource library', href: '/resources/' },
      { label: 'Clinic case study', href: '/resources/beauty-aesthetic-lounge/' },
      { label: 'Blog', href: 'https://techdeva.net/blog/', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Book a demo', href: '/book-a-demo/' },
      { label: 'Start free trial', href: '/free-trial/' },
    ],
  },
];
