import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Shaheen Welfare Society, Sargodha',
    template: '%s · Shaheen Welfare Society',
  },
  description:
    'Shaheen Welfare Society is a registered voluntary social welfare agency in District Sargodha, Pakistan, working since 2001 in education, healthcare, disability support, governance and women’s empowerment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
