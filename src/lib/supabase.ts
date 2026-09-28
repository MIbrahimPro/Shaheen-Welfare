import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publishable = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const secret = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!;

/**
 * Browser client (publishable key). Per Supabase docs the publishable key
 * replaces the legacy anon key and is safe to expose in the browser.
 */
export function supabaseBrowser(): SupabaseClient {
  return createClient(url, publishable, { auth: { persistSession: true, autoRefreshToken: true } });
}

/**
 * Server client (secret key). Per Supabase docs the secret key replaces the
 * legacy service_role key and bypasses RLS — server use only.
 */
export function supabaseAdmin(): SupabaseClient {
  return createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
