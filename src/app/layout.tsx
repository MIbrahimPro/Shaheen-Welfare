import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteExperience from '@/components/SiteExperience';
import JsonLd from '@/components/JsonLd';
import { BASE, SITE, SITE_URL, absoluteUrl } from '@/lib/site';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}${BASE}`),
  title: {
    default: `${SITE.name}, Sargodha | Registered welfare agency since 2001`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Shaheen Welfare Society is a registered voluntary social welfare agency in District Sargodha, Pakistan, working since 2001 in education, healthcare, disability support, governance and women’s empowerment.',
  applicationName: SITE.name,
  keywords: [
    'Shaheen Welfare Society',
    'Sargodha',
    'Bhalwal',
    'NGO Pakistan',
    'social welfare agency',
    'charity Sargodha',
    'nonprofit Punjab',
    'volunteer Pakistan',
    'donate Pakistan',
  ],
  authors: [{ name: SITE.name, url: absoluteUrl('/') }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: true, email: true },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: absoluteUrl('/'),
    siteName: SITE.name,
    title: `${SITE.name}, Sargodha | Registered welfare agency since 2001`,
    description:
      'Twenty-five years of grassroots work in District Sargodha: schools, medical camps, disability support, flood relief and women’s empowerment.',
    images: [
      {
        url: absoluteUrl('/og.jpg'),
        width: 1200,
        height: 630,
        alt: 'Shaheen Welfare Society volunteers distribute Ramadan rations in a village courtyard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name}, Sargodha`,
    description:
      'Registered voluntary social welfare agency serving District Sargodha, Punjab since 2001.',
    images: [absoluteUrl('/og.jpg')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: `${BASE}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${BASE}/logo.jpeg`, type: 'image/jpeg' },
    ],
    apple: [{ url: `${BASE}/icon-192.png` }],
  },
  manifest: `${BASE}/manifest.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: '#16181a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
        <SiteExperience />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
