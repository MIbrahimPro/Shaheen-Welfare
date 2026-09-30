import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PROJECTS } from '@/lib/content';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'Projects',
  'All 40 projects implemented by Shaheen Welfare Society since 2001, with funding partners and durations.',
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
          <h1>Projects implemented</h1>
          <p>
            Forty projects since 2001, from schools and clinics to election observation and flood
            relief. Ongoing projects continue to serve the community today.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
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
            profile document.
          </p>
        </div>
      </section>
    </>
  );
}
