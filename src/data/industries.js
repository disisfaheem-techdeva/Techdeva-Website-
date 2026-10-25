/**
 * One template, many industries. Industry is configuration, not a separate
 * product: every entry runs on the same platform with its own prices, staff
 * and policies. Copy follows the live /solutions-* pages (2026-10-25).
 *
 * `proof` is only set where a real business runs on it today.
 */
export const industries = [
  {
    slug: 'aesthetic-clinics',
    name: 'Aesthetic clinics',
    short: 'Clinics',
    icon: 'clinic',
    headline: 'Every enquiry answered. Every treatment booked.',
    intro: 'Aesthetic clinics live on WhatsApp enquiries. TechDeva answers them in seconds, quotes your real prices and books the appointment — day or night.',
    problem: 'Price questions all day. Enquiries at midnight. Staff with their hands full during treatments. Ads running with no idea which one produced the booking.',
    does: [
      'Answers price questions instantly from your actual price list',
      'Handles separate men’s and women’s pricing correctly',
      'Books consultations and treatments',
      'Keeps clinic, salon and academy enquiries on different numbers',
      'Shows which ad produced which booking',
    ],
    human: [
      ['Anything clinical', 'The AI does not give medical advice, assess suitability or comment on outcomes.'],
      ['Discounts and refunds', 'Always a person’s decision.'],
      ['Prices not on your list', 'If a treatment has no rate configured, it says so instead of guessing.'],
      ['Availability it cannot verify', 'It will not promise a slot it has not checked.'],
    ],
    workflow: ['Price enquiry at 11pm', 'Quote from rate list', 'Consultation offered', 'Booked in calendar', 'Owner sees it at 9am'],
    proof: true,
  },
  {
    slug: 'salons',
    name: 'Salons',
    short: 'Salons',
    icon: 'scissors',
    headline: 'Your DMs answered while you’re with a client.',
    intro: 'Bridal bookings, package questions, appointment changes — answered in seconds, even when every chair is full.',
    problem: 'Your phone buzzes while your hands are busy. By the time you reply, they’ve booked at the salon down the road. And it’s rarely the first message that’s lost — it’s the follow-up nobody had time to send.',
    does: [
      'Answers package and pricing questions instantly',
      'Books appointments without interrupting your work',
      'Handles bridal enquiries — dates, party size and trials',
      'Captures every enquiry with a name and number',
      'Follows up on enquiries that went quiet',
    ],
    human: [
      ['Discounts and package negotiation', 'Stay with you.'],
      ['Refunds and complaints', 'Always routed to a person.'],
      ['Prices not on your list', 'The AI says so rather than guessing.'],
      ['When you reply yourself', 'It steps back and the conversation is yours.'],
    ],
    workflow: ['Bridal enquiry', 'Date & party size captured', 'Trial appointment offered', 'Booked', 'Follow-up if it goes quiet'],
    proof: true,
  },
  {
    slug: 'training-academies',
    name: 'Training academies',
    short: 'Academies',
    icon: 'grad',
    headline: 'Fill your next batch without chasing enquiries.',
    intro: 'Course fees, dates, certification questions — answered instantly. Every interested student captured and followed up.',
    problem: 'Enquiries arrive in a burst when you advertise a batch, then go cold while you’re teaching. A course enquiry is a decision that takes weeks, and nobody has the hours to keep chasing it.',
    does: [
      'Answers fee, duration and certification questions',
      'Captures every prospective student with contact details',
      'Follows up on undecided enquiries',
      'Tracks which ad or post filled which batch',
      'Keeps course enquiries separate from your other business',
    ],
    human: [
      ['Fee negotiation and instalments', 'Stay with you.'],
      ['Exceptions to entry requirements', 'A person decides.'],
      ['Certification questions it cannot verify', 'Checked against your published outline, or handed over.'],
    ],
    workflow: ['Batch advertised', 'Fee & dates answered', 'Student captured', 'Follow-up over weeks', 'Enrolled'],
    proof: true,
  },
  {
    slug: 'gyms',
    name: 'Gyms & fitness studios',
    short: 'Gyms',
    icon: 'dumbbell',
    headline: 'Turn evening WhatsApp enquiries into paid members.',
    intro: 'Members, payments, staff and stock from one dashboard, with a WhatsApp AI agent that answers enquiries and books trial sessions 24/7.',
    problem: 'Most gym enquiries arrive on WhatsApp in the evening, after an ad or a friend’s story. If nobody answers within minutes, that person joins the gym that did.',
    does: [
      'Explains your plans and timings, in English or Roman Urdu',
      'Books trial sessions into your calendar',
      'Keeps visits, payments, package and chats in one member record',
      'Trainer and front-desk PIN logins with attendance',
      'Supplement sales and stock alerts',
    ],
    human: [
      ['Membership discounts', 'Stay with the owner.'],
      ['Health or injury questions', 'Always a person.'],
      ['Prices and deletions', 'Owner-only, by permission.'],
    ],
    workflow: ['Evening enquiry', 'Plans explained', 'Trial session booked', 'Member record created', 'Renewal tracked'],
    proof: false,
  },
];

export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
