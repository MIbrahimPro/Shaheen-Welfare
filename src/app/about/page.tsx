import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  AREAS_OF_EXPERTISE,
  CONCLUSION,
  CORE_VALUES,
  DEVELOPMENT_INTERVENTIONS,
  FOCUS_AREAS,
  OBJECTIVES,
  PARTNERS,
} from '@/lib/content';
import { BASE, SITE, pageMetadata } from '@/lib/site';

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
            The opening of our organization profile: who we are, what we believe and how we work.
          </p>
          <p style={{ marginTop: 20 }}>
            <a className="btn btn--sm btn--light" href={`${BASE}/Shaheen Welfare Society.pdf`} target="_blank" rel="noreferrer">
              Download full profile (PDF)
            </a>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Organization profile</h2>
            <p>
              Shaheen Welfare Society exists for the community, not for itself. This profile summary
              keeps the society’s vision, mission and values at the beginning, before the detailed
              program and project records.
            </p>
          </div>

          <div className="two-col">
            <div>
              <h3>Organizational details</h3>
              <dl className="profile-details">
                <div><dt>Name</dt><dd>{SITE.fullName}</dd></div>
                <div><dt>Head office</dt><dd>{SITE.address.replace('Head Office: ', '')}</dd></div>
                <div><dt>Registration</dt><dd>{SITE.registration}</dd></div>
                <div><dt>Working since</dt><dd>{SITE.founded}</dd></div>
                <div><dt>Bank</dt><dd>{SITE.bank.name}</dd></div>
                <div><dt>Account Title</dt><dd>{SITE.bank.title}</dd></div>
                <div><dt>IBAN</dt><dd><code className="mono">{SITE.bank.iban}</code></dd></div>
              </dl>

              <h2 style={{ marginTop: 36 }}>Vision</h2>
              <p style={{ marginTop: 10 }}>
                Shaheen Welfare Society aims to support marginalized communities and specialized groups
                by providing technical expertise, fostering sustainable linkages and promoting
                institutional autonomy. Its Research and Training Center enhances knowledge,
                innovation and community empowerment.
              </p>
              <p style={{ marginTop: 14 }}>
                The society has collaborated with national and international organizations including
                CIDA, UNDP, TVO and Aurat Foundation to strengthen the social sector for greater
                equity and inclusion.
              </p>

              <h2 style={{ marginTop: 36 }}>Mission</h2>
              <p style={{ marginTop: 10 }}>
                To develop society through <strong>participatory, integrated and sustainable</strong>{' '}
                development approaches that ensure the transfer of power to communities.
              </p>
              <p style={{ marginTop: 14 }}>
                We bring together skilled professionals, institutional connections and commitment to
                research, development, capacity building, advocacy and networking. We work with local
                communities, councilors, elected and non-elected representatives, academia and media
                across governance, health, education and environmental sectors.
              </p>
            </div>

            <aside>
              <div className="sticky-note">
                <h3>Core values</h3>
                <ul className="impact-list" style={{ marginTop: 4 }}>
                  {CORE_VALUES.map((value) => <li key={value}>{value}</li>)}
                </ul>
              </div>
              <div className="card" style={{ marginTop: 20 }}>
                <h3>Our team</h3>
                <p>
                  20 staff members · 5 volunteers · 2 consultants, backed by community elders,
                  councilors, elected representatives, academia and media.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap">
          <div className="section-head">
            <h2>Core objectives</h2>
            <p>What the society works to change with communities and partners.</p>
          </div>
          <ol className="steps">
            {OBJECTIVES.map((objective, index) => (
              <li key={index} style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>{objective}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Focus areas</h2>
            <p>Three connected areas guide the society’s long-term work.</p>
          </div>
          <div className="grid grid--3">
            {FOCUS_AREAS.map((area) => (
              <div className="card" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap">
          <div className="section-head">
            <h2>Our approach &amp; expertise</h2>
            <p>Knowledge-based collective effort for an equitable society.</p>
          </div>
          <div className="grid grid--3">
            {AREAS_OF_EXPERTISE.map((area) => (
              <div className="card" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            ))}
            <div className="card">
              <h3>How we work</h3>
              <ul className="impact-list" style={{ marginTop: 4 }}>
                <li>Community mobilization and organization</li>
                <li>Capacity building and training</li>
                <li>Rights-based advocacy and awareness</li>
                <li>Evidence-based programming and partnerships</li>
              </ul>
            </div>
          </div>
          <div className="card profile-interventions" style={{ marginTop: 24 }}>
            <h3>Development interventions</h3>
            <ul className="partner-index" style={{ marginTop: 8 }}>
              {DEVELOPMENT_INTERVENTIONS.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Partners &amp; collaborators</h2>
            <p>Partnerships strengthen local capacity while community priorities stay at the center.</p>
          </div>
          <ul className="partner-index">
            {PARTNERS.map((partner) => <li key={partner}>{partner}</li>)}
          </ul>

          <div className="card" style={{ marginTop: 36, borderLeft: '4px solid var(--green)' }}>
            <h3>Looking Ahead</h3>
            <p style={{ marginTop: 8, fontSize: '1.02rem', lineHeight: 1.6 }}>{CONCLUSION}</p>
          </div>

          <p style={{ marginTop: 32 }}>
            <Link className="btn" href="/contact">Work with us</Link>
          </p>
        </div>
      </section>
    </>
  );
}
