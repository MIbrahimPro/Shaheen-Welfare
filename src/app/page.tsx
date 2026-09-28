import Link from 'next/link';
import { PROGRAMS, PARTNERS } from '@/lib/content';
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
                Sargodha, Punjab. Since 2001 we have worked village by village — in education,
                healthcare, disability support, local governance and women’s empowerment — with one
                rule above all: the community leads, we serve.
              </p>
              <div className="hero-actions">
                <Link href="/donate" className="btn btn--light">
                  Donate
                </Link>
                <Link href="/volunteer" className="btn">
                  Volunteer with us
                </Link>
                <Link href="/about" className="btn btn--ghost" style={{ color: '#fff', borderColor: '#fff' }}>
                  Our story
                </Link>
              </div>
            </div>
            <figure className="hero-figure">
              <img
                src={`${BASE}/gallery/pg-016-348.jpg`}
                alt="A Shaheen Welfare Society seminar with invited guests"
                width={900}
                height={600}
              />
              <figcaption>Community seminar hosted by the society — guests, elders and office bearers.</figcaption>
            </figure>
          </div>
          <div className="hero-stats">
            <div>
              <strong>40+</strong>
              <span>Projects delivered</span>
            </div>
            <div>
              <strong>25 yrs</strong>
              <span>Of grassroots work</span>
            </div>
            <div>
              <strong>60</strong>
              <span>Non-formal schools (2005)</span>
            </div>
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
              <li>300 uniforms given to orphaned and needy students, plus a bicycle for a girl’s long walk to school</li>
              <li>Wheelchairs, tricycles and prosthetic forms distributed to persons with disabilities</li>
              <li>Free medical and eye camps with the Bin Mutlib Foundation</li>
              <li>Relief camp for flood victims during the 2010 floods</li>
              <li>Election observation and youth dialogues across Bhera and Bhalwal (2024)</li>
              <li>Legal aid for the poor through the “Mushkil Daso Hal Dasay” advocacy cell</li>
            </ul>
            <p style={{ marginTop: 20 }}>
              <Link className="btn" href="/projects">
                See all 40 projects
              </Link>
            </p>
          </div>
          <figure className="figure">
            <img
              src={`${BASE}/gallery/pg-009-075.jpg`}
              alt="Speaker at the Shaheen Welfare Society podium during a community seminar"
              width={900}
              height={600}
            />
            <figcaption>A society seminar — evidence in hand, citizens in front.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Trusted by institutions</h2>
            <p>
              Our work has been carried out alongside national and international partners — but every
              rupee and every decision stays accountable to the communities we serve.
            </p>
          </div>
          <div className="grid grid--4">
            {PARTNERS.slice(0, 8).map((p) => (
              <div className="card card--plain" key={p}>
                <p style={{ fontWeight: 600, color: 'var(--ink)' }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap" style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 620 }}>
            <h2>Every rupee stays in the village.</h2>
            <p style={{ marginTop: 10 }}>
              Your donation funds school uniforms, wheelchairs, medical camps and Ramadan packages —
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
