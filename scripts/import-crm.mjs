/**
 * Imports storage-backed CRM entries (JSONL in the "crm" bucket) into the
 * crm_* Postgres tables, after supabase/schema.sql has been applied.
 *
 * Env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_SECRET_KEY
 * Usage: node scripts/import-crm.mjs
 */
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;
if (!url || !secret) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_SECRET_KEY.');
  process.exit(1);
}

const sb = createClient(url, secret, { auth: { persistSession: false } });
const BUCKET = 'crm';

async function importType(type) {
  const { data: files, error } = await sb.storage.from(BUCKET).list(type, { limit: 100 });
  if (error) {
    console.error(`${type}: ${error.message}`);
    return 0;
  }
  let count = 0;
  for (const f of (files ?? []).filter((x) => x.name.endsWith('.jsonl'))) {
    const { data } = await sb.storage.from(BUCKET).download(`${type}/${f.name}`);
    if (!data) continue;
    for (const line of (await data.text()).split('\n')) {
      if (!line.trim()) continue;
      let entry;
      try {
        entry = JSON.parse(line);
      } catch {
        continue;
      }
      const { error: insErr } = await sb.from(`crm_${type}`).upsert({
        id: entry.id,
        status: entry.status ?? 'new',
        payload: entry.payload ?? {},
        created_at: entry.created_at ?? new Date().toISOString(),
      }, { onConflict: 'id' });
      if (insErr) {
        console.error(`  row ${entry.id}: ${insErr.message}`);
      } else {
        count += 1;
      }
    }
  }
  return count;
}

const contact = await importType('contact');
const volunteer = await importType('volunteer');
const donation = await importType('donation');
console.log(`Imported contact=${contact} volunteer=${volunteer} donation=${donation}`);
