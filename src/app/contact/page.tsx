import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import FormBlock from '@/components/FormBlock';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Shaheen Welfare Society: head office in Chak No. 15/SB, District Bhalwal, Sargodha.',
};

export default function ContactPage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Breadcrumbs current="Contact" />
          <h1>Contact us</h1>
          <p>Write to us, visit the office, or call: we answer every message.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2>Send a message</h2>
            <p className="form-note" style={{ margin: '8px 0 24px' }}>
              Fields marked with an asterisk are required.
            </p>
            <FormBlock
              endpoint="/api/contact"
              submitLabel="Send message"
              successTitle="Message received."
              successMessage="Thank you for writing to us. Our team will respond shortly, InshaAllah. A confirmation email is on its way to you."
              fields={[
                { name: 'name', label: 'Full name *', type: 'text', required: true, autoComplete: 'name' },
                { name: 'email', label: 'Email *', type: 'email', required: true, autoComplete: 'email' },
                { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
                { name: 'subject', label: 'Subject', type: 'text' },
                { name: 'message', label: 'Message *', type: 'textarea', required: true, rows: 6 },
              ]}
            />
          </div>
          <aside>
            <div className="card">
              <h3>Head office</h3>
              <p>{SITE.address}</p>
              <p style={{ marginTop: 12 }}>
                <strong>Phone:</strong> <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
                <br />
                <strong>Email:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
              <p style={{ marginTop: 12, fontSize: '0.9rem' }}>{SITE.registration}.</p>
            </div>
            <div className="sticky-note" style={{ marginTop: 20 }}>
              <h3>Office hours</h3>
              <p style={{ marginTop: 6 }}>
                Monday – Saturday, 9:00 AM – 5:00 PM. Field visits by appointment; much of our work
                happens in the villages, not the office.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
