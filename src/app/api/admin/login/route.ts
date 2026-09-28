import { signIn } from '@/lib/auth';

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }
  const email = (body.email ?? '').trim();
  const password = body.password ?? '';
  if (!email || !password) return Response.json({ error: 'Email and password are required.' }, { status: 400 });

  const result = await signIn(email, password);
  if (!result.ok) return Response.json({ error: result.error }, { status: 401 });
  return Response.json({ ok: true });
}
