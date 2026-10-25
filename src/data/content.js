/**
 * Integrations, proof, FAQs and resources.
 *
 * Proof figures are the Beauty Aesthetic & Lounge's own numbers as published on
 * techdeva.net (homepage and /case-study-beauty-aesthetic-lounge/, observed
 * 2026-10-25). Each carries its source. Do not add a figure without one.
 */

export const integrations = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'Messaging',
    icon: 'whatsapp',
    status: 'live',
    body: 'Hermes answers on your own WhatsApp number. Your number is paired only after you have reviewed and approved how the agent behaves.',
  },
  {
    id: 'website',
    name: 'Your website & pages',
    category: 'Setup',
    icon: 'globe',
    status: 'live',
    body: 'At signup you tell us where your business lives online. Your website, social pages and competitors’ live ads are read to prepare your starting report. Anything we can’t reach is shown as a gap.',
  },
  {
    id: 'meta-ads',
    name: 'Meta ads results',
    category: 'Advertising',
    icon: 'chart',
    status: 'early',
    body: 'Spend, leads and cost per result from Meta, next to the bookings they produced. Connected through Facebook’s own login screen — we never see your password.',
  },
  {
    id: 'google-ads',
    name: 'Google Ads results',
    category: 'Advertising',
    icon: 'chart',
    status: 'early',
    body: 'Google campaign results alongside your bookings, connected through Google’s own consent screen.',
  },
  {
    id: 'facebook-instagram',
    name: 'Facebook & Instagram posting',
    category: 'Content',
    icon: 'send',
    status: 'development',
    body: 'Write or dictate a post, add your photo, and publish or schedule it. Nothing will go public without your approval.',
  },
  {
    id: 'ctwa',
    name: 'Click-to-WhatsApp campaigns',
    category: 'Advertising',
    icon: 'target',
    status: 'development',
    body: 'Campaigns built and managed for you, behind an approval gate and a spending kill switch that is off by default.',
  },
];

/** Requested by businesses but not built. Listed so nobody assumes otherwise. */
export const notYetSupported = ['TikTok', 'YouTube', 'Google Business Profile', 'Instagram DMs', 'Email inbox'];

export const proof = {
  business: 'The Beauty Aesthetic & Lounge',
  place: 'Gulberg III, Lahore',
  summary: 'A doctor-led aesthetic clinic, a salon and a training academy — three businesses, three WhatsApp numbers, one platform.',
  stats: [
    { value: '39', label: 'leads captured and attributed' },
    { value: '36', label: 'appointments booked from them' },
    { value: '9s', label: 'average first reply' },
    { value: 'PKR 507,005', label: 'invoiced in six weeks' },
    { value: 'PKR 480,300', label: 'collected' },
  ],
  source: 'The clinic’s own numbers, published on techdeva.net with their permission.',
};

export const trackRecord = {
  note: 'Before TechDeva became a platform, the team grew these businesses itself. That operating experience is what the AI workforce is built on.',
  brands: ['Tacoma', 'CustomPack Packaging', 'Tech Nexus', 'I Get Solution'],
};

export const faqs = {
  general: [
    ['What does TechDeva actually do?', 'TechDeva gives your business a workforce of AI employees that answer customer enquiries, capture every lead into a CRM, book appointments and report the numbers. It runs in production today on a doctor-led aesthetic clinic in Lahore.'],
    ['Which channel does the AI answer on?', 'WhatsApp first, because that is where enquiries actually arrive and where they are most often missed. Other channels are added once that one is working.'],
    ['What languages does it handle?', 'English, Urdu and Roman Urdu.'],
    ['Can it invent a price?', 'No. Quotes come only from the rate list you configure. If there is no rate for what a customer asked, it says so and hands over rather than guessing a number.'],
    ['What happens when it cannot handle something?', 'It stops and flags a person. Anything clinical, any discount, any refund and any change to ad spend stays with a human by design.'],
    ['Can another business see my customers?', 'No. Each business is a separate tenant and the isolation is enforced in the database itself, not only in the application.'],
  ],
  trial: [
    ['What happens during the free trial?', 'The trial needs no card. It opens with a live read of your market — your website, your pages and the ads your competitors currently have running — and the plan we would follow. Gaps are shown as gaps; nothing is filled in with a guess.'],
    ['How long does setup take?', 'Configuration is one pass through your services, prices, hours, staff and policies. Your AI employee is tested against real scenarios and only goes live on your number after you have reviewed and approved it.'],
    ['Do I approve things before they go out?', 'Yes, for anything that spends money or goes public. Approving a reply and sending it are two separate actions.'],
  ],
  pricing: [
    ['Do I need to be technical?', 'No. You connect your accounts through the normal Facebook and Google login screens. We do the rest.'],
    ['Is ad spend included?', 'No. Ad spend is billed by the ad platforms directly, never marked up by us. WhatsApp message fees are also charged by Meta.'],
    ['Am I locked in?', 'No. Every package is month to month with no setup fee, and you can cancel anytime.'],
    ['What if I outgrow my package?', 'Move up a package at any time — Growth adds a second WhatsApp number, posting, ad results and Jarvis; Pro adds five numbers, the growth advisor and ad autopilot.'],
  ],
};

/**
 * Resources. Blog posts are listed by title and summary and link to the live
 * blog where the full article is published — the article bodies are not
 * reproduced here.
 */
export const resources = [
  {
    type: 'case-study',
    title: 'A doctor-led clinic in Gulberg stopped losing leads overnight',
    summary: 'How The Beauty Aesthetic & Lounge answers every WhatsApp enquiry in seconds across three businesses and three numbers.',
    href: '/resources/beauty-aesthetic-lounge/',
    meta: 'Case study · Aesthetic clinic',
  },
  {
    type: 'article',
    title: '5 things every business owner should automate first',
    summary: 'Most owners start with social media captions. That is the wrong end. Here is the order that actually returns money.',
    href: 'https://techdeva.net/blog/',
    external: true,
    meta: 'Article · 8 Aug 2026',
  },
  {
    type: 'article',
    title: 'Chatbot vs AI employee: what is actually the difference?',
    summary: 'Most owners have been pitched a chatbot and were unimpressed. The honest difference, and the one question to ask any vendor.',
    href: 'https://techdeva.net/blog/',
    external: true,
    meta: 'Article · 8 Aug 2026',
  },
  {
    type: 'article',
    title: 'Why your business loses customers after 8pm',
    summary: 'A large share of enquiries arrive outside working hours. What those unanswered messages cost, and how to measure your own leak this week.',
    href: 'https://techdeva.net/blog/',
    external: true,
    meta: 'Article · 8 Aug 2026',
  },
  {
    type: 'guide',
    title: 'How TechDeva goes live on your business',
    summary: 'The ten steps from signup to your number answering — including the testing and approval stages before any customer speaks to it.',
    href: '/automation/#go-live',
    meta: 'Guide · Onboarding',
  },
  {
    type: 'guide',
    title: 'What the AI is never allowed to do',
    summary: 'The fixed limits: no invented prices, no clinical advice, no approving its own work, no guessing.',
    href: '/ai-assistant/#limits',
    meta: 'Guide · Trust',
  },
];

export const resourceTypes = [
  ['all', 'All'],
  ['case-study', 'Case studies'],
  ['article', 'Articles'],
  ['guide', 'Guides'],
];
