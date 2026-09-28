import { cookies } from 'next/headers';
import { supabaseBrowser } from '@/lib/supabase';
import { updateStatus, type EntryType } from '@/lib/crm';

const TYPES: EntryType[] = ['contact', 'volunteer', 'donation'];
const STATUSES = ['new', 'in_progress', 'done', 'archived'];

async function requireAdmin(): Promise<boolean> {
  const token = cookies().get('sws_admin')?.value;
  if (!token) return false;
  const { data, error } = await supabaseBrowser().auth.getUser(token);
  return !error && !!data?.user;
}

export async function PATCH(req: Request, { params }: { params: { type: string; id: string } }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const { type, id } = params;
  if (!TYPES.includes(type as EntryType)) {
    return Response.json({ error: 'Unknown entry type.' }, { status: 404 });
  }
  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }
  if (!body.status || !STATUSES.includes(body.status)) {
    return Response.json({ error: 'Invalid status.' }, { status: 400 });
  }
  try {
    await updateStatus(type as EntryType, id, body.status);
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : 'Update failed.' }, { status: 500 });
  }
  return Response.json({ ok: true });
}
