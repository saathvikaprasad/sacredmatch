create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'allowed_user_role') then
    create type allowed_user_role as enum ('view', 'edit');
  end if;
end $$;

create table if not exists public.allowed_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role allowed_user_role not null default 'view'
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  created_by text not null,
  full_name text not null,
  age integer not null check (age > 0),
  date_of_birth date not null,
  star text not null,
  father_name text not null,
  mother_name text,
  email text,
  mobile_country_code text,
  mobile_number text,
  gender text check (gender in ('male', 'female')),
  language text,
  additional_fields jsonb not null default '{}'::jsonb,
  image_url text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.candidates add column if not exists email text;
alter table public.candidates add column if not exists mobile_country_code text;
alter table public.candidates add column if not exists mobile_number text;

create or replace function public.current_user_email()
returns text
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', ''));
$$;

create or replace function public.current_user_role()
returns allowed_user_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.allowed_users
  where lower(email) = public.current_user_email();
$$;

alter table public.allowed_users enable row level security;
alter table public.candidates enable row level security;

drop policy if exists "service role manages allowed users" on public.allowed_users;
create policy "service role manages allowed users"
on public.allowed_users
for all
to service_role
using (true)
with check (true);

drop policy if exists "allowed users can read candidates" on public.candidates;
create policy "allowed users can read candidates"
on public.candidates
for select
to authenticated
using (public.current_user_role() in ('view', 'edit'));

drop policy if exists "edit users can insert candidates" on public.candidates;
create policy "edit users can insert candidates"
on public.candidates
for insert
to authenticated
with check (
  public.current_user_role() = 'edit'
  and lower(created_by) = public.current_user_email()
);

drop policy if exists "edit users can update own candidates" on public.candidates;
create policy "edit users can update own candidates"
on public.candidates
for update
to authenticated
using (
  public.current_user_role() = 'edit'
  and lower(created_by) = public.current_user_email()
)
with check (
  public.current_user_role() = 'edit'
  and lower(created_by) = public.current_user_email()
);

insert into storage.buckets (id, name, public)
values ('candidate-images', 'candidate-images', true)
on conflict (id) do nothing;

drop policy if exists "public read candidate images" on storage.objects;
create policy "public read candidate images"
on storage.objects
for select
to public
using (bucket_id = 'candidate-images');

drop policy if exists "authenticated upload candidate images" on storage.objects;
create policy "authenticated upload candidate images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'candidate-images');
