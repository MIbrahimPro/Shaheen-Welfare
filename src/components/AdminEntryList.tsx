'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE } from '@/lib/site';

export interface AdminEntry {
  id: string;
  status: string;
  created_at: string;
  payload: Record<string, unknown>;
}

const LABELS: Record<string, string> = {
  contact: 'Messages',
  volunteer: 'Volunteers',
  donation: 'Pledges',
};

const FIELDS: Record<string, string[]> = {
  contact: ['name', 'email', 'phone', 'subject', 'message'],
  volunteer: ['name', 'email', 'phone', 'city', 'interest', 'availability', 'message'],
  donation: ['name', 'email', 'phone', 'amount', 'type', 'cause', 'message'],
};

const LABEL: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  city: 'City',
  subject: 'Subject',
  message: 'Message',
  interest: 'Interest',
  availability: 'Availability',
  amount: 'Amount',
  type: 'Gift type',
  cause: 'Designation',
};

const STATUSES = ['new', 'in_progress', 'done', 'archived'];

export default function AdminEntryList({ type, entries }: { type: string; entries: AdminEntry[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function setStatus(id: string, status: string) {
    setBusyId(id);
    setError('');
    const res = await fetch(`${BASE}/api/admin/entries/${type}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || 'Update failed.');
    } else {
      router.refresh();
    }
    setBusyId(null);
  }

  return (
    <div>
      {error && (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      )}
      <h2 style={{ marginBottom: 16 }}>{LABELS[type] ?? type}</h2>
      {entries.length === 0 ? (
        <p className="form-note">Nothing here yet. Submissions from the website forms will appear in this list.</p>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th scope="col">Received</th>
                <th scope="col">Details</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {new Date(e.created_at).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>
                    <dl style={{ margin: 0 }}>
                      {FIELDS[type]?.map((k) => {
                        const v = e.payload[k];
                        if (v == null || String(v).trim() === '') return null;
                        return (
                          <div key={k} style={{ marginBottom: 4 }}>
                            <dt style={{ display: 'inline', fontWeight: 700, fontSize: '0.85rem' }}>{LABEL[k] ?? k}:{' '}</dt>
                            <dd style={{ display: 'inline', margin: 0 }}>{String(v)}</dd>
                          </div>
                        );
                      })}
                    </dl>
                  </td>
                  <td>
                    <span className="tag" style={e.status !== 'new' ? { background: 'var(--paper-dim)', color: 'var(--ink-soft)', borderColor: 'var(--line)' } : undefined}>
                      {e.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {STATUSES.filter((s) => s !== e.status).map((s) => (
                        <button
                          key={s}
                          className="btn btn--sm btn--ghost"
                          disabled={busyId === e.id}
                          onClick={() => setStatus(e.id, s)}
                        >
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
