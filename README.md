# Shaheen Welfare Society Website

Official website + CRM for **Shaheen Welfare Society, Sargodha** — a registered voluntary social
welfare agency (Voluntary Social Welfare Agencies Ordinance, 1961) based in Chak No. 15/SB,
District Bhalwal, Sargodha, Punjab, Pakistan, working since 2001.

Live: https://projects.nyronic.com/shaheen-welfare

## Stack

- **Next.js 14** (App Router, standalone output) + TypeScript
- **Supabase** — Auth (admin sign-in), Storage (CRM entry store; tables ready via `supabase/schema.sql`)
- **Resend** — form notifications + donor/volunteer auto-replies
- **Cloudinary** — optional image CDN (script provided; current API key is read-only so images are self-hosted)

## Environment variables

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser client (new-style publishable key) |
| `NEXT_PUBLIC_SUPABASE_SECRET_KEY` | Server client: CRM store, admin user checks |
| `RESEND_KEY` | Sending mail |
| `RESEND_DOMAIN` / `RESEND_EMAIL` | From-address resolution (parent domain must be verified in Resend) |
| `ADMIN_EMAIL` | Where form notifications are sent (default: org inbox) |
| `CLOUDINARY_APP_NAME/KEY/SECRET` | Only for `scripts/cloudinary-upload.mjs` |
| `NEXT_PUBLIC_BASE_PATH` | Set to `/shaheen-welfare` for sub-path deploys |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for metadata |

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
```

## Admin / CRM

- Dashboard: `/admin` (redirects to `/admin/login`)
- Sign-in is Supabase Auth (email + password). An admin user is provisioned on the Supabase
  project; store its credentials in your password manager — they are **not** in this repository.
- All form submissions land in the private `crm` storage bucket as monthly JSONL documents
  (`contact/2026-09.jsonl`, …) and appear in the dashboard with status workflow
  (`new → in_progress → done / archived`).

### If database access is later granted

1. Run `supabase/schema.sql` in the Supabase SQL editor (creates `crm_contact`, `crm_volunteer`,
   `crm_donation` with RLS).
2. `node scripts/import-crm.mjs` migrates storage JSONL entries into the tables.
3. Set `CRM_MODE=tables` in the environment and redeploy.

## Gallery

`/gallery` is the public field-work record. It groups the supplied photographs and video records by
disability support, education, women’s empowerment, health, relief, environment and rights work.
Optimized media lives under `public/gallery/fieldwork`, with its captions and grouping in
`src/lib/fieldwork.ts`. The page also keeps the 110 photographs extracted from the organization
profile PDF as a separate archive.

`public/gallery` holds the 110 profile photographs extracted from the organization profile PDF.
Rebuild with `GALLERY_SRC=<folder> node scripts/build-local-gallery.mjs` (writes
`public/gallery.json`). To mirror to Cloudinary once the key has upload rights:
`node scripts/cloudinary-upload.mjs` and point `src/lib/content.ts` URLs at the CDN.

## Deploy (Contabo, sub-path)

The production deploy runs under `https://projects.nyronic.com/shaheen-welfare`:

```bash
NEXT_PUBLIC_BASE_PATH=/shaheen-welfare npm run build
npm start              # serves with basePath baked in
```

The reverse proxy on the server routes `/shaheen-welfare` to this app. See `DEPLOYMENT.md`.
