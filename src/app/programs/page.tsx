import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { PROGRAMS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Education, healthcare, disability support, social welfare, governance and economic empowerment programs of Shaheen Welfare Society.',
};

export default function ProgramsPage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Breadcrumbs current="Programs" />
          <h1>Programs</h1>
          <p>Six long-term program areas through which all of our projects are delivered.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {PROGRAMS.map((p, idx) => (
            <div key={p.slug} id={p.slug} style={{ marginBottom: 56 }}>
              <div className={`grid grid--2${idx % 2 === 1 ? '' : ''}`} style={{ alignItems: 'start' }}>
                <div>
                  <span className="tag">Program {idx + 1}</span>
                  <h2 style={{ marginTop: 12 }}>{p.title}</h2>
                  <p style={{ marginTop: 10 }}>{p.intro}</p>
                  <p style={{ marginTop: 18 }}>
                    <Link href="/volunteer" className="btn btn--sm">
                      Volunteer for this program
                    </Link>
                  </p>
                </div>
                <div className="card">
                  <h3>What this includes</h3>
                  <ul className="impact-list">
                    {p.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
