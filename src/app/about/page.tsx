import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { CORE_VALUES, OBJECTIVES, PARTNERS } from '@/lib/content';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'About',
  'Vision, mission, core values, objectives and history of Shaheen Welfare Society, Sargodha: a registered voluntary social welfare agency working since 2001.',
  '/about',
);

export default function AboutPage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Breadcrumbs current="About" />
          <h1>About the Society</h1>
          <p>
            Registered under The Voluntary Social Welfare Agencies (Registration and Control)
            Ordinance, 1961 · Serving District Sargodha since 2001.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2>Who we are</h2>
            <p style={{ marginTop: 14 }}>
              Shaheen Welfare Society is a community-driven, non-profit, non-political organization
              based in Chak No. 15/SB, District Bhalwal, Sargodha. We exist for the community, not
              for ourselves. Our staff of 20, our 5 volunteers and our 2 consultants work across
              governance, health, education and environment with a strong focus on human rights and
              local governance.
            </p>
            <p style={{ marginTop: 14 }}>
              Over two decades we have collaborated with national and international organizations
              including CIDA, UNDP, TVO and Aurat Foundation, using that expertise to strengthen the
              social sector for greater equity and inclusion.
            </p>
            <h2 style={{ marginTop: 32 }}>Vision</h2>
            <p style={{ marginTop: 10 }}>
              To support marginalized communities and specialized groups by providing technical
              expertise, fostering sustainable linkages, and promoting institutional autonomy. Our
              Research and Training Center enhances knowledge, innovation and community empowerment.
            </p>
            <h2 style={{ marginTop: 32 }}>Mission</h2>
            <p style={{ marginTop: 10 }}>
              To develop society through participatory, integrated and sustainable development
              approaches that ensure the transfer of power to communities.
            </p>
          </div>
          <aside>
            <div className="sticky-note">
              <h3>Core values</h3>
              <ul className="impact-list" style={{ marginTop: 4 }}>
                {CORE_VALUES.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ marginTop: 20 }}>
              <h3>Team</h3>
              <p>
                20 staff members · 5 volunteers · 2 consultants, backed by community elders,
                councilors, elected representatives, academia and media.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap">
          <div className="section-head">
            <h2>Core objectives</h2>
          </div>
          <div className="grid grid--2">
            {OBJECTIVES.map((o, i) => (
              <div className="card" key={i}>
                <p style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Our approach</h2>
            <p>Knowledge-based collective effort for an equitable society.</p>
          </div>
          <div className="grid grid--3">
            {[
              ['Community mobilization and organization', 'We organize first, build second.'],
              ['Capacity building and training', 'Skills that outlast any single project.'],
              ['Rights-based advocacy and awareness', 'Evidence in hand, citizens in front.'],
              ['Research and evidence-based programming', 'Socially relevant, publicly accessible research.'],
              ['Collaborative partnerships', 'Local, national and international institutions.'],
              ['Focus areas', 'Women’s empowerment, decentralized governance, partnership for social equity.'],
            ].map(([t, d]) => (
              <div className="card" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap">
          <div className="section-head">
            <h2>Partners &amp; collaborators</h2>
          </div>
          <div className="grid grid--3">
            {PARTNERS.map((p) => (
              <div className="card card--plain" key={p}>
                <p style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{p}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32 }}>
            <Link className="btn" href="/contact">
              Work with us
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
