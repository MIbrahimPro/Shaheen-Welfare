import { signOutCookie } from '@/lib/auth';

export async function POST() {
  signOutCookie();
  return Response.json({ ok: true });
}
