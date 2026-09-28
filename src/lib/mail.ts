import { Resend } from 'resend';
import { SITE } from './site';

const resend = new Resend(process.env.RESEND_KEY);

/**
 * The verified sending domain on the Resend account is the parent domain
 * (RESEND_DOMAIN may point at a subdomain that is not separately verified),
 * so mail is sent from the verified parent domain with a reply-to of the
 * organization's published address.
 */
function fromAddress(): string {
  const domain = (process.env.RESEND_DOMAIN || 'nyronic.com').trim().replace(/^https?:\/\//, '');
  const parent = domain.split('.').slice(-2).join('.');
  return `Shaheen Welfare Society <mail@${parent}>`;
}

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f0eee8;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#16181a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #d4d1c8;border-top:4px solid #14532d">
      <tr><td style="padding:24px 28px;border-bottom:1px solid #d4d1c8">
        <div style="font-family:Georgia,serif;font-size:20px;font-weight:bold">Shaheen Welfare Society</div>
        <div style="font-size:12px;color:#3c4043">Sargodha, Punjab, Pakistan</div>
      </td></tr>
      <tr><td style="padding:28px">
        <h2 style="font-family:Georgia,serif;margin:0 0 16px;font-size:18px">${title}</h2>
        ${bodyHtml}
      </td></tr>
      <tr><td style="padding:18px 28px;border-top:1px solid #d4d1c8;font-size:12px;color:#3c4043">
        ${SITE.address}<br>${SITE.registration}
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

function rows(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:7px 12px;border:1px solid #e0ddd4;background:#fbfaf7;font-weight:bold;width:160px;vertical-align:top">${k}</td>` +
        `<td style="padding:7px 12px;border:1px solid #e0ddd4">${String(v).replace(/</g, '&lt;')}</td></tr>`,
    )
    .join('');
}

export async function notifyNewEntry(type: string, data: Record<string, unknown>) {
  const to = process.env.ADMIN_EMAIL || 'mail@shaheen.nyronic.com';
  const title = `New ${type} submission`;
  const html = layout(
    title,
    `<p style="margin:0 0 16px">A new ${type} request was submitted on the website.</p>
     <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${rows(data)}</table>`,
  );
  return resend.emails.send({
    from: fromAddress(),
    to,
    subject: `[Website] ${title}`,
    html,
    reply_to: typeof data.email === 'string' ? data.email : undefined,
  });
}

export async function sendAutoReply(type: string, to: string, name: string, message?: string) {
  const html = layout(
    'Thank you for reaching out',
    `<p style="margin:0 0 14px">Dear ${name.replace(/</g, '&lt;') || 'Friend'},</p>
     <p style="margin:0 0 14px">${message ?? 'We have received your message. A member of our team will respond shortly, InshaAllah.'}</p>
     <p style="margin:0">With respect,<br><strong>Shaheen Welfare Society, Sargodha</strong></p>`,
  );
  return resend.emails.send({
    from: fromAddress(),
    to,
    subject: 'Thank you for contacting Shaheen Welfare Society',
    html,
  });
}
