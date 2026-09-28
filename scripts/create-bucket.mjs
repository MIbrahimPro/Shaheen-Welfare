/**
 * Creates the private "crm" storage bucket used by the storage-backed CRM.
 * Idempotent: skips creation if the bucket already exists.
 *
 * Env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_SECRET_KEY
 * Usage: node scripts/create-bucket.mjs
 */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { createClient } = require('@supabase/supabase-js');

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

const { data: buckets } = await sb.storage.listBuckets();
if ((buckets ?? []).some((b) => b.name === 'crm')) {
  console.log('Bucket "crm" already exists.');
} else {
  const { error } = await sb.storage.createBucket('crm', { public: false, fileSizeLimit: '10MB' });
  if (error) {
    console.error('Failed to create bucket:', error.message);
    process.exit(1);
  }
  console.log('Bucket "crm" created.');
}
