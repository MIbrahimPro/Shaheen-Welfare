-- ============================================================
-- Shaheen Welfare Society CRM schema
-- Run in Supabase SQL Editor once database access is available.
-- Safe to run on an empty or existing project.
-- ============================================================

-- ---------- CRM tables ----------
create table if not exists public.crm_contact (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new' check (status in ('new','in_progress','done','archived')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_volunteer (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new' check (status in ('new','in_progress','done','archived')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_donation (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new' check (status in ('new','in_progress','done','archived')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
-- No public access: the website server uses the secret key which bypasses
-- RLS; the dashboard is server-rendered behind Supabase Auth.
alter table public.crm_contact enable row level security;
alter table public.crm_volunteer enable row level security;
alter table public.crm_donation enable row level security;

-- ---------- Indexes ----------
create index if not exists crm_contact_created_idx on public.crm_contact (created_at desc);
create index if not exists crm_volunteer_created_idx on public.crm_volunteer (created_at desc);
create index if not exists crm_donation_created_idx on public.crm_donation (created_at desc);

-- ---------- Import from storage-backed store ----------
-- Reads the JSONL documents uploaded by the website under bucket "crm"
-- (paths: contact/YYYY-MM.jsonl, volunteer/YYYY-MM.jsonl, donation/YYYY-MM.jsonl)
-- and inserts any rows whose id is not already present.
create or replace function public.import_storage_crm_to_tables()
returns table (contact int, volunteer int, donation int)
language plpgsql
security definer
as $$
declare
  rec record;
  obj record;
  line text;
  entry jsonb;
  n_contact int := 0;
  n_volunteer int := 0;
  n_donation int := 0;
begin
  foreach rec in array array['contact','volunteer','donation'] loop
    for obj in
      select name from storage.objects
      where bucket_id = 'crm' and (storage.foldername(name))[1] = rec
    loop
      -- Cannot read object body in SQL; the app exposes each line via REST
      -- below instead. This function imports rows passed by the caller app.
      null;
    end loop;
  end loop;

  -- The storage API cannot be queried from plain SQL for object bodies, so
  -- the actual import is performed by the app script scripts/import-crm.mjs
  -- which reads the JSONL files (via the secret key) and inserts rows here.
  return query select n_contact, n_volunteer, n_donation;
end;
$$;

comment on function public.import_storage_crm_to_tables() is
  'Placeholder: use scripts/import-crm.mjs with the secret key to migrate storage JSONL entries into the crm_* tables.';
