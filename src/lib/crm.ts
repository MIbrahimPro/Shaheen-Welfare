import { supabaseAdmin } from './supabase';

export type EntryType = 'contact' | 'volunteer' | 'donation';

export interface CrmEntry {
  id: string;
  type: EntryType;
  status: string;
  payload: Record<string, unknown>;
  created_at: string;
}

export type NewEntry = Omit<CrmEntry, 'id' | 'created_at'>;

/**
 * Storage-backed CRM store.
 *
 * The Supabase project was provisioned without a database password or access
 * token, so schema migrations cannot be run from here. Entries are persisted
 * as JSON-line documents in a private storage bucket, managed with the secret
 * key. `supabase/schema.sql` contains the SQL to create real tables plus a
 * `import_storage_crm_to_tables()` function that ingests these documents —
 * run it once DB access is available and flip `CRM_MODE` to 'tables'.
 */
const BUCKET = 'crm';
const CRM_MODE = (process.env.CRM_MODE || 'storage') as 'storage' | 'tables';
const TABLE = (type: EntryType) => `crm_${type}`;

function client() {
  return supabaseAdmin();
}

function pathFor(type: EntryType) {
  const d = new Date();
  const month = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
  return `${type}/${month}.jsonl`;
}

export async function createEntry(type: EntryType, payload: Record<string, unknown>) {
  const entry: CrmEntry = {
    id: crypto.randomUUID(),
    type,
    status: 'new',
    payload,
    created_at: new Date().toISOString(),
  };

  if (CRM_MODE === 'tables') {
    const { error } = await client().from(TABLE(type)).insert({
      id: entry.id,
      status: entry.status,
      payload,
    });
    if (error) throw new Error(error.message);
    return entry;
  }

  const sb = client();
  const path = pathFor(type);
  const { data: existing } = await sb.storage.from(BUCKET).download(path);
  const lines: string[] = existing ? (await existing.text()).split('\n').filter(Boolean) : [];
  lines.push(JSON.stringify(entry));
  const { error } = await sb.storage.from(BUCKET).upload(path, lines.join('\n') + '\n', {
    contentType: 'application/jsonl',
    upsert: true,
  });
  if (error) throw new Error(error.message);
  return entry;
}

export async function listEntries(
  type: EntryType,
  opts: { status?: string; limit?: number } = {},
): Promise<CrmEntry[]> {
  if (CRM_MODE === 'tables') {
    let q = client().from(TABLE(type)).select('*').order('created_at', { ascending: false });
    if (opts.status) q = q.eq('status', opts.status);
    const { data, error } = await q.limit(opts.limit ?? 200);
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: any) => ({
      id: r.id,
      type,
      status: r.status,
      payload: r.payload ?? {},
      created_at: r.created_at,
    }));
  }

  const sb = client();
  const { data: folders } = await sb.storage.from(BUCKET).list(type, { limit: 100, sortBy: { column: 'name', ascending: false } });
  const files = (folders ?? []).filter((f) => f.name.endsWith('.jsonl'));
  const out: CrmEntry[] = [];
  for (const f of files) {
    const { data } = await sb.storage.from(BUCKET).download(`${type}/${f.name}`);
    if (!data) continue;
    for (const line of (await data.text()).split('\n')) {
      if (!line.trim()) continue;
      try {
        out.push(JSON.parse(line) as CrmEntry);
      } catch {
        /* skip malformed line */
      }
    }
  }
  out.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return out.slice(0, opts.limit ?? 200);
}

export async function updateStatus(type: EntryType, id: string, status: string) {
  if (CRM_MODE === 'tables') {
    const { error } = await client().from(TABLE(type)).update({ status }).eq('id', id);
    if (error) throw new Error(error.message);
    return;
  }

  const sb = client();
  const { data: folders } = await sb.storage.from(BUCKET).list(type, { limit: 100 });
  for (const f of (folders ?? []).filter((x) => x.name.endsWith('.jsonl'))) {
    const path = `${type}/${f.name}`;
    const { data } = await sb.storage.from(BUCKET).download(path);
    if (!data) continue;
    const lines = (await data.text()).split('\n').filter(Boolean);
    let changed = false;
    const next = lines.map((l) => {
      try {
        const e = JSON.parse(l) as CrmEntry;
        if (e.id === id) {
          changed = true;
          return JSON.stringify({ ...e, status });
        }
        return l;
      } catch {
        return l;
      }
    });
    if (changed) {
      await sb.storage.from(BUCKET).upload(path, next.join('\n') + '\n', {
        contentType: 'application/jsonl',
        upsert: true,
      });
      return;
    }
  }
  throw new Error(`Entry ${id} not found`);
}

export async function entryCounts(): Promise<Record<EntryType, number>> {
  const [contact, volunteer, donation] = await Promise.all([
    listEntries('contact', { limit: 1000 }),
    listEntries('volunteer', { limit: 1000 }),
    listEntries('donation', { limit: 1000 }),
  ]);
  return {
    contact: contact.length,
    volunteer: volunteer.length,
    donation: donation.length,
  };
}

export function getPayloadString(entry: CrmEntry, key: string): string {
  const v = entry.payload[key];
  return v == null ? '' : String(v);
}
