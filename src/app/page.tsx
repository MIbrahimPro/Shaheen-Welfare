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
                src={`${BASE}/gallery/pg-023-600.jpg`}
                alt="Volunteers of Shaheen Welfare Society hand out Ramadan ration bags to village families"
                width={804}
                height={603}
              />
              <figcaption>Ramadan ration distribution in a village courtyard, District Sargodha.</figcaption>
            </figure>
          </div>
          <p className="hero-line">
            40+ projects · 25 years · 60 non-formal schools (2005) · every rupee accounted for.
          </p>
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
