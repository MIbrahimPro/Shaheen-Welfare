import { SITE, SITE_URL, absoluteUrl } from '@/lib/site';

/** schema.org NGO graph: organization, address and donation page. */
export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: SITE.name,
    alternateName: 'Shaheen Welfare Society, Sargodha',
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo.jpeg'),
    image: absoluteUrl('/og.jpg'),
    foundingDate: String(SITE.founded),
    description:
      'Registered voluntary social welfare agency serving District Sargodha, Punjab since 2001 through education, healthcare, disability support, governance and women’s empowerment programs.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chak No. 15/SB, District Bhalwal',
      addressLocality: 'Sargodha',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    email: SITE.email,
    telephone: SITE.phone,
    nonprofitStatus: 'NonprofitType',
    sameAs: [],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: SITE.email,
        telephone: SITE.phone,
        availableLanguage: ['ur', 'en'],
      },
    ],
    potentialAction: {
      '@type': 'DonateAction',
      target: absoluteUrl('/donate'),
      name: 'Donate to Shaheen Welfare Society',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
