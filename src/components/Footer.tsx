import Link from 'next/link';
import { NAV, SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>Shaheen Welfare Society</h4>
            <p>
              A registered voluntary social welfare agency working since 2001 for a just, inclusive and
              equitable society in District Sargodha, Punjab, Pakistan.
            </p>
            <p style={{ marginTop: 12 }}>{SITE.registration}.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/volunteer">Volunteer</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Programs</h4>
            <ul>
              <li>Education &amp; Literacy</li>
              <li>Healthcare</li>
              <li>Persons with Disabilities</li>
              <li>Social Welfare &amp; Relief</li>
              <li>Governance &amp; Advocacy</li>
              <li>Economic Empowerment</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>{SITE.address}</p>
            <p style={{ marginTop: 8 }}>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <br />
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Shaheen Welfare Society, Sargodha. All rights reserved.</span>
          <span>Bank: National Bank of Pakistan · IBAN {SITE.bank.iban}</span>
        </div>
      </div>
    </footer>
  );
}
