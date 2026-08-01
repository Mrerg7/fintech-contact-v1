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
} as const;

/** Cloudflare Images CDN — update heroImageId after uploading a hero asset. */
export const CF_IMAGES = {
  accountHash: '-sPAUAWeA405NiWJ0SNIQA',
  /** Abstract financial markets / digital finance atmosphere */
  heroImageId: '2f99ac34-1204-4dfa-68be-825064298500',
} as const;

export function cfImageUrl(imageId: string, variant = 'public'): string {
  return `https://imagedelivery.net/${CF_IMAGES.accountHash}/${imageId}/${variant}`;
}

export const HERO_IMAGE = cfImageUrl(CF_IMAGES.heroImageId);
export const OG_IMAGE = HERO_IMAGE;

export const ACQUISITION_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(
  'fintech.contact Domain Acquisition Inquiry',
)}&body=${encodeURIComponent(
  'Hello,\n\nI am interested in acquiring fintech.contact.\n\nIntended use:\nBudget range:\nTimeline:\n\nThank you.',
)}`;
