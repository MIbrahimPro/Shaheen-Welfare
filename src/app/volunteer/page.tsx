import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import FormBlock from '@/components/FormBlock';
import { PROGRAMS } from '@/lib/content';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'Volunteer',
  'Volunteer with Shaheen Welfare Society: teachers, medical teams, trainers and community organizers welcome.',
  '/volunteer',
);

const INTERESTS = [...PROGRAMS.map((p) => p.title), 'General support / wherever needed'];

export default function VolunteerPage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Breadcrumbs current="Volunteer" />
          <h1>Volunteer with us</h1>
          <p>
            Our five volunteers are the backbone of every distribution day, medical camp and literacy
            class. Join them.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2>Volunteer registration</h2>
            <p className="form-note" style={{ margin: '8px 0 24px' }}>
              Fields marked with an asterisk are required.
            </p>
            <FormBlock
              endpoint="/api/volunteer"
              submitLabel="Register as volunteer"
              successTitle="Registration received."
              successMessage="Thank you for stepping forward. Our volunteer coordinator will contact you to match you with a program."
              fields={[
                { name: 'name', label: 'Full name *', type: 'text', required: true, autoComplete: 'name' },
                { name: 'email', label: 'Email *', type: 'email', required: true, autoComplete: 'email' },
                { name: 'phone', label: 'Phone / WhatsApp *', type: 'tel', required: true, autoComplete: 'tel' },
                { name: 'city', label: 'City / village', type: 'text', autoComplete: 'address-level2' },
                { name: 'interest', label: 'Where can you help?', type: 'select', options: INTERESTS },
                {
                  name: 'availability',
                  label: 'Availability',
                  type: 'select',
                  options: ['Weekends', 'Weekdays', 'Evenings', 'Full time', 'Occasionally / events'],
                },
                { name: 'message', label: 'Anything we should know?', type: 'textarea', rows: 4 },
              ]}
            />
          </div>
          <aside>
            <div className="card">
              <h3>How volunteering works</h3>
              <ul className="impact-list">
                <li>You register here and tell us where you can help.</li>
                <li>Our coordinator calls you within a week.</li>
                <li>You join a real activity: a camp, a class, a distribution.</li>
                <li>You decide how often to continue. No pressure.</li>
              </ul>
            </div>
            <div className="sticky-note" style={{ marginTop: 20 }}>
              <h3>Who we need most</h3>
              <p style={{ marginTop: 6 }}>
                Teachers for non-formal classes, doctors and paramedics for medical camps, tailoring
                instructors for the vocational center, and young volunteers for voter-awareness walks.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
