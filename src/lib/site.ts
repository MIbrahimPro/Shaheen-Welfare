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

export const NAV = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
] as const;
