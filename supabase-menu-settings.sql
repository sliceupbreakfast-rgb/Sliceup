-- Supabase SQL Editor icinde bir kez calistirin.

create table if not exists public.menu_settings (
  id boolean primary key default true,
  show_jar_desserts boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint menu_settings_single_row check (id = true)
);

insert into public.menu_settings (id, show_jar_desserts)
values (true, true)
on conflict (id) do nothing;

drop trigger if exists menu_settings_set_updated_at on public.menu_settings;
create trigger menu_settings_set_updated_at
before update on public.menu_settings
for each row execute function public.set_updated_at();

alter table public.menu_settings enable row level security;

drop policy if exists "Public read menu settings" on public.menu_settings;
create policy "Public read menu settings"
on public.menu_settings for select
using (true);

drop policy if exists "Authenticated manage menu settings" on public.menu_settings;
create policy "Authenticated manage menu settings"
on public.menu_settings for all to authenticated
using (true)
with check (true);
