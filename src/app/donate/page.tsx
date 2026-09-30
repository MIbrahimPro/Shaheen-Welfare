import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import FormBlock from '@/components/FormBlock';
import { SITE, pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'Donate',
  'Donate to Shaheen Welfare Society: direct bank transfer to National Bank of Pakistan, or make a pledge online.',
  '/donate',
);

const CAUSES = [
  'Education: uniforms, books, bicycles',
  'Healthcare: medical and eye camps',
  'Disability support: wheelchairs and aids',
  'Ramadan & Eid packages',
  'Vocational training for women',
  'Wherever the need is greatest',
];

export default function DonatePage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Breadcrumbs current="Donate" />
          <h1>Donate</h1>
          <p>
            No middlemen, no overseas accounts. Your donation moves directly from the bank to the
            field, and every rupee is documented.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2>Direct bank transfer</h2>
            <p style={{ marginTop: 8 }}>
              The fastest way to give. Transfer directly to the society’s account and email the
              receipt to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> for a receipt.
            </p>
            <div className="card" style={{ marginTop: 20 }}>
              <h3>Account details</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px 0', color: 'var(--ink-soft)', width: 150 }}>Bank</td>
                    <td style={{ padding: '8px 0', fontWeight: 700 }}>{SITE.bank.name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: 'var(--ink-soft)' }}>Account title</td>
                    <td style={{ padding: '8px 0', fontWeight: 700 }}>{SITE.bank.title}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: 'var(--ink-soft)', verticalAlign: 'top' }}>IBAN</td>
                    <td style={{ padding: '8px 0', fontWeight: 700 }} className="mono">
                      {SITE.bank.iban}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="sticky-note" style={{ marginTop: 20 }}>
              <h3>What your money does</h3>
              <ul className="impact-list" style={{ marginTop: 8 }}>
                <li>PKR 1,500: a school uniform and bag for an orphaned girl</li>
                <li>PKR 8,000: a sewing machine for a widow’s home business</li>
                <li>PKR 12,000: one free medical camp day in a village</li>
                <li>PKR 25,000: a wheelchair for a person with disability</li>
              </ul>
              <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                Indicative costs based on recent field activity; actual allocation follows need.
              </p>
            </div>
          </div>

          <div>
            <h2>Make a pledge</h2>
            <p className="form-note" style={{ margin: '8px 0 24px' }}>
              Pledging is not an online payment; we will contact you to complete your gift.
            </p>
            <FormBlock
              endpoint="/api/donate"
              submitLabel="Send pledge"
              successTitle="Pledge received."
              successMessage="Thank you for your generosity. Our team will contact you shortly with confirmation and receipt details."
              fields={[
                { name: 'name', label: 'Full name *', type: 'text', required: true, autoComplete: 'name' },
                { name: 'email', label: 'Email *', type: 'email', required: true, autoComplete: 'email' },
                { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel' },
                {
                  name: 'amount',
                  label: 'Amount (PKR) *',
                  type: 'text',
                  required: true,
                  hint: 'e.g. 5,000',
                  placeholder: '5,000',
                },
                { name: 'type', label: 'This gift is', type: 'select', options: ['One-time', 'Monthly', 'Zakat', 'Sadaqah', 'In-kind (goods)'] },
                { name: 'cause', label: 'Designation', type: 'select', options: CAUSES },
                { name: 'message', label: 'Message (optional)', type: 'textarea', rows: 3 },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
