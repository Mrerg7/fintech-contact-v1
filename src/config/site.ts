export const SITE = {
  name: 'fintech.contact',
  host: 'fintech.contact',
  url: 'https://fintech.contact',
  title:
    'fintech.contact | The Definitive Domain for Financial Technologies',
  description:
    'fintech.contact is the definitive premium domain for financial technologies — a category-defining .contact asset for fintech platforms, payments, neobanks, and B2B financial software. Available for acquisition.',
  email: 'sales@desertrich.com',
  locale: 'en_US',
  publishedDate: '2026-08-01',
  googleSiteVerification: 'SvXvkz88HmD57NSp8Opd6rZU_tqnjuIWrWJEf16yw0E',
} as const;

export const HERO_IMAGE = '/hero.jpg';
export const OG_IMAGE = `${SITE.url}/hero.jpg`;

export const ACQUISITION_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(
  'fintech.contact Domain Acquisition Inquiry',
)}&body=${encodeURIComponent(
  'Hello,\n\nI am interested in acquiring fintech.contact.\n\nIntended use:\nBudget range:\nTimeline:\n\nThank you.',
)}`;
