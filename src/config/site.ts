export const SITE = {
  name: 'fintech.contact',
  host: 'fintech.contact',
  url: 'https://fintech.contact',
  title: 'fintech.contact | Premium Financial Technologies Domain for Sale',
  description:
    'fintech.contact for sale — the exact-match premium domain for financial technologies. Ideal for fintech platforms, payments, neobanks & B2B finance. $10,000 USD via escrow.',
  email: 'sales@desertrich.com',
  askingPrice: 10000,
  askingPriceLabel: '$10,000',
  locale: 'en_US',
  publishedDate: '2026-08-01',
  modifiedDate: '2026-09-23',
  googleSiteVerification: 'SvXvkz88HmD57NSp8Opd6rZU_tqnjuIWrWJEf16yw0E',
} as const;

export const HERO_IMAGE = '/hero.jpg';
export const OG_IMAGE = `${SITE.url}/hero.jpg`;

export const ACQUISITION_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(
  'fintech.contact Domain Acquisition Inquiry',
)}&body=${encodeURIComponent(
  'Hello,\n\nI am interested in acquiring fintech.contact.\n\nIntended use:\nBudget range:\nTimeline:\n\nThank you.',
)}`;
