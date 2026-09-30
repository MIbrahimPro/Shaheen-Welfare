export const SITE = {
  name: 'Shaheen Welfare Society',
  fullName: 'Shaheen Welfare Society, Sargodha',
  tagline: 'Community-driven welfare in District Sargodha since 2001',
  registration:
    'Registered under The Voluntary Social Welfare Agencies (Registration and Control) Ordinance, 1961',
  address: 'Head Office: Chak No. 15/SB, District Bhalwal, Sargodha, Punjab, Pakistan',
  phone: '+92 300 000 0000',
  email: 'mail@shaheen.nyronic.com',
  bank: {
    name: 'National Bank of Pakistan',
    title: 'Shaheen Welfare Society',
    iban: 'PK31 NBPA 0875 0040 5943 7873',
  },
  founded: 2001,
} as const;

/** Base path when the app is served under a sub-path (e.g. /shaheen-welfare). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Origin of the deployed site, used for canonical URLs, sitemap and JSON-LD. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://projects.nyronic.com';

/** Absolute URL for a path, including the base path. */
export const absoluteUrl = (path = '/') => `${SITE_URL}${BASE}${path}`;

/** Shared per-page metadata: canonical URL plus matching Open Graph fields. */
export function pageMetadata(title: string, description: string, path: string) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl('/og.jpg'), width: 1200, height: 630 }],
    },
  };
}

export const NAV = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
] as const;
