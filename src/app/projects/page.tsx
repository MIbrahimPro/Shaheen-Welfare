import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PROJECTS, TRAININGS } from '@/lib/content';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'Projects & Trainings',
  'All 40 projects implemented and 30 institutional trainings attended by Shaheen Welfare Society since 2001.',
  '/projects',
);

// The project list is effectively static; serve statically with hourly refresh.
export const revalidate = 3600;

export default function ProjectsPage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Breadcrumbs current="Projects" />
          <h1>Projects &amp; Institutional Capacity</h1>
          <p>
            Forty projects implemented and thirty specialized trainings attended since 2001,
            building sustainable capacity across District Sargodha.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Projects implemented</h2>
            <p>From schools and healthcare to election observation and emergency flood relief.</p>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Project</th>
                  <th scope="col">Funding source / partner</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((p, i) => (
                  <tr key={p.title}>
                    <td>{i + 1}</td>
                    <td>{p.title}</td>
                    <td>{p.partner}</td>
                    <td>{p.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="form-note" style={{ marginTop: 16 }}>
            Source: Shaheen Welfare Society organization profile. Project numbering follows the
            official document.
          </p>
        </div>
      </section>

      <section className="section section--dim">
        <div className="wrap">
          <div className="section-head">
            <h2>Participation in Training</h2>
            <p>
              Capacity building, rights-based advocacy and professional training attended by the society&apos;s leadership and team.
            </p>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Training attended</th>
                  <th scope="col">Imparted by</th>
                </tr>
              </thead>
              <tbody>
                {TRAININGS.map((t, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{t.title}</td>
                    <td>{t.impartedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="form-note" style={{ marginTop: 16 }}>
            Source: Shaheen Welfare Society organization profile, Page 6.
          </p>
        </div>
      </section>
    </>
  );
}
