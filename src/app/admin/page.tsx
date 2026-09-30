import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { entryCounts, listEntries, getPayloadString, type EntryType } from '@/lib/crm';
import AdminEntryList from '@/components/AdminEntryList';
import SignOutButton from '@/components/SignOutButton';

export const metadata: Metadata = {
  title: 'CRM Dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const TABS: { type: EntryType; label: string }[] = [
  { type: 'contact', label: 'Contact messages' },
  { type: 'volunteer', label: 'Volunteers' },
  { type: 'donation', label: 'Donation pledges' },
];

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  if (!(await isAdmin())) redirect('/admin/login?next=/admin');

  const tab: EntryType = TABS.some((t) => t.type === searchParams.tab)
    ? (searchParams.tab as EntryType)
    : 'contact';

  const [counts, entries] = await Promise.all([entryCounts(), listEntries(tab, { limit: 300 })]);

  return (
    <div className="section">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1>CRM dashboard</h1>
            <p className="form-note">Submissions from the website, newest first.</p>
          </div>
          <SignOutButton />
        </div>

        <div className="grid grid--3" style={{ margin: '32px 0' }}>
          {TABS.map((t) => (
            <a
              key={t.type}
              href={`/admin?tab=${t.type}`}
              className="card"
              style={{
                textDecoration: 'none',
                borderColor: tab === t.type ? 'var(--green)' : undefined,
                boxShadow: tab === t.type ? 'inset 0 0 0 1px var(--green)' : undefined,
              }}
            >
              <p style={{ color: 'var(--ink-soft)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t.label}
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '2.4rem', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                {counts[t.type]}
              </p>
            </a>
          ))}
        </div>

        <AdminEntryList
          type={tab}
          entries={entries.map((e) => ({
            id: e.id,
            status: e.status,
            created_at: e.created_at,
            payload: e.payload,
          }))}
        />
      </div>
    </div>
  );
}
