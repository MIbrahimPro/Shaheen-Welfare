import { createEntry, type EntryType } from './crm';
import { notifyNewEntry, sendAutoReply } from './mail';

const MAX_LEN = 2000;

interface FieldSpec {
  name: string;
  required?: boolean;
  email?: boolean;
  max?: number;
}

function clean(value: unknown, max = MAX_LEN): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/**
 * Shared form-submission handler: validates, stores in the CRM store and
 * fires notification + auto-reply emails. Returns JSON-ready results.
 */
export async function handleFormSubmission(
  type: EntryType,
  req: Request,
  spec: FieldSpec[],
): Promise<{ ok: boolean; status: number; body: Record<string, unknown> }> {
  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return { ok: false, status: 400, body: { error: 'Invalid request body.' } };
  }

  const data: Record<string, string> = {};
  for (const f of spec) {
    const v = clean(raw[f.name], f.max ?? 500);
    if (f.required && !v) {
      return { ok: false, status: 400, body: { error: `Missing required field: ${f.name}` } };
    }
    if (f.email && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      return { ok: false, status: 400, body: { error: `Invalid email address.` } };
    }
    data[f.name] = v;
  }

  try {
    await createEntry(type, data);
  } catch (err) {
    console.error(`[${type}] CRM store failure:`, err);
    return { ok: false, status: 500, body: { error: 'Could not save your submission. Please try again later.' } };
  }

  // Emails must never fail the request; log and continue.
  try {
    await notifyNewEntry(type, data);
  } catch (err) {
    console.error(`[${type}] notification email failed:`, err);
  }
  if (data.email) {
    try {
      await sendAutoReply(type, data.email, data.name ?? '');
    } catch (err) {
      console.error(`[${type}] auto-reply failed:`, err);
    }
  }

  return { ok: true, status: 200, body: { ok: true } };
}
