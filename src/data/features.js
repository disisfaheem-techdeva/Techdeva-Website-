/**
 * The platform's capabilities and their honest status.
 *
 * Status vocabulary — the only three the site may use:
 *   live         running for a paying business today
 *   early        works, offered to a few businesses, numbers still being proven
 *   development  being built; must never be shown as available
 *
 * Where techdeva.net contradicts itself the more conservative status wins:
 * /platform/ lists posting, ad results and ad autopilot as package features,
 * while /ai-workforce/ marks Reporting "Early access" and Ads/Content
 * "In development". The workforce page is used here. Confirm with the founder
 * before promoting anything (docs/zoho-research/implementation-status.md).
 */
export const STATUS = {
  live: { label: 'Live', tone: 'live' },
  early: { label: 'Early access', tone: 'early' },
  development: { label: 'In development', tone: 'dev' },
};

export const featureGroups = [
  { id: 'sell', title: 'Answer & sell', blurb: 'Every enquiry answered and qualified, day or night.' },
  { id: 'run', title: 'Run the business', blurb: 'Bookings, customers, money, stock and team in one place.' },
  { id: 'grow', title: 'Grow & report', blurb: 'Know what worked, and let AI help with what comes next.' },
  { id: 'control', title: 'Control & trust', blurb: 'You approve what matters. Your data stays yours.' },
];

export const features = [
  {
    id: 'whatsapp-agent',
    group: 'sell',
    icon: 'whatsapp',
    title: 'WhatsApp AI sales agent, 24/7',
    short: 'Hermes answers every enquiry in seconds, qualifies it and books the appointment.',
    body: 'Answers on your own WhatsApp number in your customer’s language — English, Urdu or Roman Urdu. It quotes from your real price list, asks the qualifying questions, offers a time, and hands the chat to you the moment a person should answer. Bigger packages cover several numbers.',
    points: ['Replies within seconds, around the clock', 'Quotes only from your rate list', 'Steps back the moment you reply yourself'],
    status: 'live',
    page: '/ai-assistant/',
  },
  {
    id: 'crm',
    group: 'run',
    icon: 'users',
    title: 'Customer CRM & history',
    short: 'Every enquiry captured with name, number, service and source — nothing left in a notebook.',
    body: 'Each lead is written into the CRM automatically with the full conversation and the number it arrived on. Status moves from new to booked. Every visit, payment, package and note sits in one customer record.',
    points: ['Leads split by the number they came in on', 'Status from new to booked', 'Full conversation stored'],
    status: 'live',
    page: '/business-management/',
  },
  {
    id: 'appointments',
    group: 'run',
    icon: 'calendar',
    title: 'Appointments & calendar',
    short: 'Book by service and staff member, take part payments, see every balance.',
    body: 'Bookings by service and staff member, with part payments and balances taken from the real bill — not a separate spreadsheet.',
    points: ['Book by service and staff', 'Part payments and balances', 'Reschedules in the same record'],
    status: 'live',
    page: '/business-management/',
  },
  {
    id: 'invoices',
    group: 'run',
    icon: 'receipt',
    title: 'Invoices & money',
    short: 'Printable bills, payments, expenses, daily closing and profit & loss.',
    body: 'Bills you can print, payments against them, expenses, the day’s closing and a profit and loss view. Historical invoices are stored as issued and never silently recalculated.',
    points: ['Printable invoices', 'Daily closing', 'Profit and loss'],
    status: 'live',
    page: '/business-management/',
  },
  {
    id: 'stock',
    group: 'run',
    icon: 'box',
    title: 'Stock & low-stock alerts',
    short: 'Every product movement recorded, with an alert before you run out.',
    body: 'Product sales and stock movements are recorded as they happen, with an alert before an item that sells runs out.',
    points: ['Movement history', 'Low-stock alerts'],
    status: 'live',
    page: '/business-management/',
  },
  {
    id: 'team',
    group: 'run',
    icon: 'id',
    title: 'Team, PIN logins & HR',
    short: 'Each person logs in with their own PIN and sees only their part.',
    body: 'Staff records, attendance and HR. Operators log in with a personal PIN and see only their assigned work; prices, deletions and financial totals stay with the owner.',
    points: ['Personal PIN logins', 'Attendance and HR', 'Owner-only prices and deletions'],
    status: 'live',
    page: '/business-management/',
  },
  {
    id: 'approvals',
    group: 'control',
    icon: 'shield',
    title: 'Human approval gate',
    short: 'Anything that spends money or goes public waits for you.',
    body: 'Approving a message and sending it are two separate actions. Anything that spends money, publishes publicly or changes pricing waits in one approval inbox for a real, logged-in person.',
    points: ['One inbox of decisions', 'Approve and send are separate', 'Unsure? It stops and flags a person'],
    status: 'live',
    page: '/automation/',
  },
  {
    id: 'isolation',
    group: 'control',
    icon: 'lock',
    title: 'Your data stays yours',
    short: 'Every business is a separate tenant, isolated in the database itself.',
    body: 'Each business is a separate tenant and the isolation is enforced by row-level security in the database, not only in application code. You connect Meta, Google and WhatsApp through their own login screens — TechDeva never sees your password.',
    points: ['Database-level isolation', 'No shared passwords', 'Delete-your-data request page'],
    status: 'live',
    page: '/about/',
  },
  {
    id: 'assistant',
    group: 'grow',
    icon: 'spark',
    title: 'Jarvis, your AI business assistant',
    short: 'Ask about your figures, or tell it what to change — just by typing.',
    body: 'The owner types a sentence and the platform answers or changes something. Changes to your own dashboard apply immediately; teaching the WhatsApp agent is owner-only, written down as an audited lesson and read back so a mistake can be removed in one click.',
    points: ['Questions about your own figures', 'Owner-only teaching, audited', 'Exact wording read back'],
    status: 'early',
    page: '/ai-assistant/',
  },
  {
    id: 'reporting',
    group: 'grow',
    icon: 'chart',
    title: 'Reporting & live ad results',
    short: 'Cost per lead, bookings, show-up rate — and which ad produced which booking.',
    body: 'Spend, leads, WhatsApp chats and cost per result from your Meta and Google ads, next to the bookings they produced. A metric with nothing to divide by shows as “no data”, never as zero.',
    points: ['Cost per lead and per booking', 'Show-up and conversion rates', 'Ad results next to bookings'],
    status: 'early',
    page: '/features/#grow',
  },
  {
    id: 'growth-advisor',
    group: 'grow',
    icon: 'compass',
    title: 'Growth advisor',
    short: 'Reads your own numbers each week and says what to fix next.',
    body: 'Every week it reads your own figures — unpaid bills, no-shows, costly ads — and recommends what to fix and what to do next. It recommends; you decide.',
    points: ['Weekly read of your numbers', 'Recommendations, not actions'],
    status: 'development',
    page: '/features/#grow',
  },
  {
    id: 'social-posting',
    group: 'grow',
    icon: 'send',
    title: 'Facebook & Instagram posting',
    short: 'Write or dictate a post, add your photo, publish or schedule it.',
    body: 'A content plan written in your voice, with posts you can publish or schedule. Nothing goes public without your approval.',
    points: ['Written in your voice', 'Approval before publishing'],
    status: 'development',
    page: '/integrations/',
  },
  {
    id: 'ad-autopilot',
    group: 'grow',
    icon: 'target',
    title: 'Ad autopilot',
    short: 'Pauses campaigns over your cost limit and drafts new ones inside your budget.',
    body: 'Proper Click-to-WhatsApp campaigns rather than boosted posts. Spending is behind an approval gate and a kill switch that is off by default.',
    points: ['Click-to-WhatsApp campaigns', 'Never spends beyond your limit'],
    status: 'development',
    page: '/integrations/',
  },
];

export const featureById = Object.fromEntries(features.map((f) => [f.id, f]));

/** What no agent is allowed to do — stated as plainly as the capabilities. */
export const limits = [
  ['Invent a price', 'Quotes come from the rate list you set. If there is no rate for what was asked, the agent says so and hands over.'],
  ['Give clinical or medical advice', 'Any question of that kind goes to a person, every time.'],
  ['Approve its own work', 'Approving a message and sending it are two separate actions, and the second one is yours.'],
  ['Promise what it cannot verify', 'Availability it has not checked is reported as unknown, not promised.'],
  ['Fill a gap with a guess', 'Anything it could not reach or confirm is shown to you as a gap.'],
];
