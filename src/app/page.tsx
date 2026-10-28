import Link from 'next/link';
import { PROGRAMS, PARTNERS, CORE_VALUES } from '@/lib/content';
import { BASE } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div>
              <h1>Twenty-five years of standing with the marginalized.</h1>
              <p className="lede">
                Shaheen Welfare Society is a registered voluntary social welfare agency in District
                Sargodha, Punjab. Since 2001 we have worked village by village, in education,
                healthcare, disability support, local governance and women’s empowerment. The
                community leads; we serve.
              </p>
              <div className="hero-actions">
                <Link href="/donate" className="btn btn--light">
                  Donate
                </Link>
                <Link href="/volunteer" className="btn">
                  Volunteer with us
                </Link>
                <Link href="/about" className="btn btn--ghost" style={{ color: 'var(--white)', borderColor: 'var(--white)' }}>
                  Our story
                </Link>
              </div>
            </div>
            <figure className="hero-figure" data-parallax="-0.05">
              <img
                src={`${BASE}/gallery/fieldwork/education-001.jpg`}
                alt="Shaheen Welfare Society team and dignitaries distributing school uniforms and books to students"
                width={1600}
                height={720}
              />
              <figcaption>Annual school uniform and books distribution for deserving students, Shaheen Welfare Society.</figcaption>
            </figure>
          </div>
          <p className="hero-line">
            40+ projects · 25 years · 60 non-formal schools (2005) · every rupee accounted for.
          </p>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap">
          <div className="section-head">
            <h2>Vision &amp; Mission</h2>
            <p>
              The foundational principles behind twenty-five years of community empowerment in District Sargodha.
            </p>
          </div>
          <div className="two-col" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <p className="fieldwork-eyebrow" style={{ marginBottom: 6 }}>Our Vision</p>
              <h3 style={{ fontSize: '1.35rem', marginBottom: 12 }}>Empowerment &amp; Sustainable Linkages</h3>
              <p style={{ color: 'var(--ink)', flexGrow: 1 }}>
                Shaheen Welfare Society aims to support marginalized communities and specialized groups by
                providing technical expertise, fostering sustainable linkages, and promoting institutional
                autonomy. The organization has established a Research and Training Center to enhance
                knowledge, innovation, and community empowerment.
              </p>
              <p style={{ marginTop: 14, fontSize: '0.92rem', color: 'var(--ink-soft)' }}>
                Collaborating with partners including CIDA, UNDP, TVO, and Aurat Foundation to strengthen the social sector for greater equity and inclusion.
              </p>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <p className="fieldwork-eyebrow" style={{ marginBottom: 6 }}>Our Mission</p>
              <h3 style={{ fontSize: '1.35rem', marginBottom: 12 }}>Transfer of Power to Communities</h3>
              <p style={{ color: 'var(--ink)', flexGrow: 1 }}>
                Our mission is to develop society through participatory, integrated, and sustainable
                development approaches that ensure the transfer of power to communities.
              </p>
              <p style={{ marginTop: 14, fontSize: '0.92rem', color: 'var(--ink-soft)' }}>
                We bring together skilled professionals, strong institutional connections, and proven commitment
                in research, development, capacity building, advocacy, and networking across governance, health,
                education, and environmental sectors.
              </p>
            </div>
          </div>
          <div className="card" style={{ marginTop: 24 }}>
            <h3>Core Values</h3>
            <ul className="impact-list" style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px 24px' }}>
              {CORE_VALUES.map((val) => (
                <li key={val}>{val}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>What we do</h2>
            <p>
              Six program areas, one method: participatory, integrated and sustainable development that
              transfers power to communities.
            </p>
          </div>
          <div className="grid grid--3">
            {PROGRAMS.map((p) => (
              <article className="card" key={p.slug}>
                <h3>{p.title}</h3>
                <p>{p.intro}</p>
                <p style={{ marginTop: 14 }}>
                  <Link href={`/programs#${p.slug}`}>Program details →</Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap two-col">
          <div>
            <h2>Work that reached real people</h2>
            <ul className="impact-list">
              <li>60 non-formal basic education schools established with the Literacy Department (2005)</li>
              <li>School admissions, uniforms, bags and books for orphaned and deserving girls</li>
              <li>Disability-card support, wheelchairs, tricycles and vocational help for persons with disabilities</li>
              <li>Computer, flower making, beauty care, sewing, embroidery and craft skills for women</li>
              <li>Free medical and eye camps with the Bin Mutlib Foundation</li>
              <li>Relief for flood-affected families and support during natural disasters</li>
              <li>Plantation drives and awareness about pollution, smog, water and a clean environment</li>
              <li>Women’s-rights awareness, legal aid and community advocacy through “Mushkil Daso Hal Dasay”</li>
            </ul>
            <p style={{ marginTop: 20 }}>
              <Link className="btn" href="/projects">
                See all 40 projects
              </Link>
              <Link className="btn btn--ghost" href="/gallery#fieldwork-disability" style={{ marginLeft: 10 }}>
                See field work
              </Link>
            </p>
          </div>
          <figure className="figure" data-parallax="0.06">
              <img
                src={`${BASE}/gallery/pg-009-079.jpg`}
                alt="A speaker addresses the gathering from the Shaheen Welfare Society podium"
                width={643}
                height={836}
              />
              <figcaption>Addressing a community seminar: evidence in hand, citizens in front.</figcaption>
            </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Trusted by institutions</h2>
            <p>
              Our work has been carried out alongside national and international partners, but every
              rupee and every decision stays accountable to the communities we serve.
            </p>
          </div>
          <ul className="partner-index">
            {PARTNERS.slice(0, 8).map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap" style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 620 }}>
            <h2>Every rupee stays in the village.</h2>
            <p style={{ marginTop: 10 }}>
              Your donation funds school uniforms, wheelchairs, medical camps and Ramadan packages,
              audited, documented and delivered by our own staff and volunteers.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/donate" className="btn">
              Donate now
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              Contact the office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
