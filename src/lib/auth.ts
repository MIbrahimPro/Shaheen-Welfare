import { cookies } from 'next/headers';
import { supabaseBrowser } from './supabase';

const COOKIE = 'sws_admin';

/** Sign in against Supabase Auth; sets a short session cookie used by middleware. */
export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const sb = supabaseBrowser();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error || !data.session) return { ok: false, error: error?.message ?? 'Sign-in failed' };
  try {
    cookies().set(COOKIE, data.session.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });
  } catch {
    /* cookies() unavailable outside request scope */
  }
  return { ok: true };
}

export function signOutCookie() {
  try {
    cookies().delete(COOKIE);
  } catch {
    /* noop */
  }
}

/** Verify the session cookie's token against Supabase Auth from the server. */
export async function isAdmin(): Promise<boolean> {
  let token: string | undefined;
  try {
    token = cookies().get(COOKIE)?.value;
  } catch {
    return false;
  }
  if (!token) return false;
  const { data, error } = await supabaseBrowser().auth.getUser(token);
  return !error && !!data?.user;
}

export const ADMIN_COOKIE = COOKIE;
