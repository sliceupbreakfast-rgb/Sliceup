-- SliceUp Breakfast Supabase kurulumu
-- Supabase SQL Editor içinde tek seferde çalıştırın.

create extension if not exists pgcrypto;

create table if not exists public.allergens (
  id text primary key,
  name text not null,
  icon text not null,
  description text not null,
  badge_class text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('salty', 'sweet', 'jar')),
  name text not null,
  ingredients text not null default '',
  indegridients text not null default '',
  ingredients_english text not null default '',
  story text not null default '',
  story_english text not null default '',
  price numeric(10,2) not null default 0,
  calories integer,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.menu_items
  add column if not exists indegridients text not null default '';

alter table public.menu_items
  add column if not exists ingredients_english text not null default '',
  add column if not exists story_english text not null default '';

alter table public.menu_items
  add column if not exists calories integer;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'menu_items_calories_nonnegative_check'
      and conrelid = 'public.menu_items'::regclass
  ) then
    alter table public.menu_items
      add constraint menu_items_calories_nonnegative_check check (calories is null or calories >= 0);
  end if;
end;
$$;

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'menu_items_category_check'
      and conrelid = 'public.menu_items'::regclass
  ) then
    alter table public.menu_items drop constraint menu_items_category_check;
  end if;

  alter table public.menu_items
    add constraint menu_items_category_check check (category in ('salty', 'sweet', 'jar'));
end;
$$;

create table if not exists public.menu_item_allergens (
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  allergen_id text not null references public.allergens(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (menu_item_id, allergen_id)
);

create table if not exists public.extras (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  extra_name text not null default '',
  price numeric(10,2) not null default 0,
  allergen_id text references public.allergens(id) on delete set null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.extras
  add column if not exists extra_name text not null default '';

create table if not exists public.drinks (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('hot', 'cold')),
  name text not null,
  price numeric(10,2) not null default 0,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bread_panel (
  id boolean primary key default true,
  title text not null default 'Ekmeğimiz',
  slogan text not null default '',
  description_1 text not null default '',
  description_2 text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bread_panel_single_row check (id = true)
);

create table if not exists public.bread_panel_items (
  id uuid primary key default gen_random_uuid(),
  icon text not null default '',
  text text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_header (
  id boolean primary key default true,
  image_url text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint menu_header_single_row check (id = true)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists allergens_set_updated_at on public.allergens;
create trigger allergens_set_updated_at
before update on public.allergens
for each row execute function public.set_updated_at();

drop trigger if exists menu_items_set_updated_at on public.menu_items;
create trigger menu_items_set_updated_at
before update on public.menu_items
for each row execute function public.set_updated_at();

drop trigger if exists extras_set_updated_at on public.extras;
create trigger extras_set_updated_at
before update on public.extras
for each row execute function public.set_updated_at();

drop trigger if exists drinks_set_updated_at on public.drinks;
create trigger drinks_set_updated_at
before update on public.drinks
for each row execute function public.set_updated_at();

drop trigger if exists bread_panel_set_updated_at on public.bread_panel;
create trigger bread_panel_set_updated_at
before update on public.bread_panel
for each row execute function public.set_updated_at();

drop trigger if exists bread_panel_items_set_updated_at on public.bread_panel_items;
create trigger bread_panel_items_set_updated_at
before update on public.bread_panel_items
for each row execute function public.set_updated_at();

drop trigger if exists menu_header_set_updated_at on public.menu_header;
create trigger menu_header_set_updated_at
before update on public.menu_header
for each row execute function public.set_updated_at();

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do update set public = excluded.public;

insert into storage.buckets (id, name, public)
values ('menu-header-images', 'menu-header-images', true)
on conflict (id) do update set public = excluded.public;

alter table public.allergens enable row level security;
alter table public.menu_items enable row level security;
alter table public.menu_item_allergens enable row level security;
alter table public.extras enable row level security;
alter table public.drinks enable row level security;
alter table public.bread_panel enable row level security;
alter table public.bread_panel_items enable row level security;
alter table public.menu_header enable row level security;

drop policy if exists "Public read allergens" on public.allergens;
create policy "Public read allergens" on public.allergens for select using (true);

drop policy if exists "Authenticated manage allergens" on public.allergens;
create policy "Authenticated manage allergens" on public.allergens for all to authenticated using (true) with check (true);

drop policy if exists "Public read active menu items" on public.menu_items;
create policy "Public read active menu items" on public.menu_items for select using (is_active = true);

drop policy if exists "Authenticated manage menu items" on public.menu_items;
create policy "Authenticated manage menu items" on public.menu_items for all to authenticated using (true) with check (true);

drop policy if exists "Public read menu item allergens" on public.menu_item_allergens;
create policy "Public read menu item allergens" on public.menu_item_allergens for select using (true);

drop policy if exists "Authenticated manage menu item allergens" on public.menu_item_allergens;
create policy "Authenticated manage menu item allergens" on public.menu_item_allergens for all to authenticated using (true) with check (true);

drop policy if exists "Public read active extras" on public.extras;
create policy "Public read active extras" on public.extras for select using (is_active = true);

drop policy if exists "Authenticated manage extras" on public.extras;
create policy "Authenticated manage extras" on public.extras for all to authenticated using (true) with check (true);

drop policy if exists "Public read active drinks" on public.drinks;
create policy "Public read active drinks" on public.drinks for select using (is_active = true);

drop policy if exists "Authenticated manage drinks" on public.drinks;
create policy "Authenticated manage drinks" on public.drinks for all to authenticated using (true) with check (true);

drop policy if exists "Public read active bread panel" on public.bread_panel;
create policy "Public read active bread panel" on public.bread_panel for select using (is_active = true);

drop policy if exists "Authenticated manage bread panel" on public.bread_panel;
create policy "Authenticated manage bread panel" on public.bread_panel for all to authenticated using (true) with check (true);

drop policy if exists "Public read active bread panel items" on public.bread_panel_items;
create policy "Public read active bread panel items" on public.bread_panel_items for select using (is_active = true);

drop policy if exists "Authenticated manage bread panel items" on public.bread_panel_items;
create policy "Authenticated manage bread panel items" on public.bread_panel_items for all to authenticated using (true) with check (true);

drop policy if exists "Public read active menu header" on public.menu_header;
create policy "Public read active menu header" on public.menu_header for select using (is_active = true);

drop policy if exists "Authenticated manage menu header" on public.menu_header;
create policy "Authenticated manage menu header" on public.menu_header for all to authenticated using (true) with check (true);

drop policy if exists "Public read menu images" on storage.objects;
create policy "Public read menu images" on storage.objects for select using (bucket_id = 'menu-images');

drop policy if exists "Authenticated upload menu images" on storage.objects;
create policy "Authenticated upload menu images" on storage.objects for insert to authenticated with check (bucket_id = 'menu-images');

drop policy if exists "Authenticated update menu images" on storage.objects;
create policy "Authenticated update menu images" on storage.objects for update to authenticated using (bucket_id = 'menu-images') with check (bucket_id = 'menu-images');

drop policy if exists "Authenticated delete menu images" on storage.objects;
create policy "Authenticated delete menu images" on storage.objects for delete to authenticated using (bucket_id = 'menu-images');

drop policy if exists "Public read menu header images" on storage.objects;
create policy "Public read menu header images" on storage.objects for select using (bucket_id = 'menu-header-images');

drop policy if exists "Authenticated upload menu header images" on storage.objects;
create policy "Authenticated upload menu header images" on storage.objects for insert to authenticated with check (bucket_id = 'menu-header-images');

drop policy if exists "Authenticated update menu header images" on storage.objects;
create policy "Authenticated update menu header images" on storage.objects for update to authenticated using (bucket_id = 'menu-header-images') with check (bucket_id = 'menu-header-images');

drop policy if exists "Authenticated delete menu header images" on storage.objects;
create policy "Authenticated delete menu header images" on storage.objects for delete to authenticated using (bucket_id = 'menu-header-images');
