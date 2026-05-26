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
  story text not null default '',
  price numeric(10,2) not null default 0,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
  price numeric(10,2) not null default 0,
  allergen_id text references public.allergens(id) on delete set null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

insert into public.allergens (id, name, icon, description, badge_class, sort_order) values
  ('egg', 'Yumurta', '🥚', 'Yumurta ve yumurta ürünleri içerir.', 'allergen-egg', 1),
  ('dairy', 'İnek Sütü', '🥛', 'İnek sütü, peynir, kaymak, tereyağı veya diğer süt ürünlerini içerir.', 'allergen-dairy', 2),
  ('gluten', 'Gluten', '🌾', 'Buğday, çavdar, yulaf veya diğer gluten içeren tahıllar barındırır.', 'allergen-gluten', 3),
  ('nuts', 'Kuru yemiş', '🥜', 'Ceviz, badem, fındık veya diğer sert kabuklu meyveler içerir.', 'allergen-nuts', 4),
  ('sesame', 'Susam', '◌', 'Susam ve susam ürünleri içerir.', 'allergen-sesame', 5)
on conflict (id) do update set
  name = excluded.name,
  icon = excluded.icon,
  description = excluded.description,
  badge_class = excluded.badge_class,
  sort_order = excluded.sort_order;

insert into public.menu_items (id, category, name, ingredients, story, price, image_url, sort_order, is_active) values
  ('00000000-0000-0000-0000-000000000101', 'salty', 'Ata Mirası', 'İpeksi humus tabanı, çemensiz pastırma dilimleri, kavrulmuş file badem', 'Babamın Kayseri seyahatlerinden getirdiği o mis kokulu çemensiz pastırma, annemin elleriyle yaptığı ipeksi humus yatağında can bulurdu. Üzerine serptiğimiz çıtır bademlerle, her lokmada çocukluğumuzun bayram sabahlarına döneriz.', 450, null, 1, true),
  ('00000000-0000-0000-0000-000000000102', 'salty', 'Edremit Esintisi', 'Zeytin ezmesi, tarla domatesi, salatalık, tam yağlı beyaz peynir, taze kekik', 'Halamızın Edremit zeytinliğinden süzülen zeytinyağı ve ezme, bahçemizden gün ağarırken kopardığımız sulu domateslerle buluşurdu. Annem taze kekiği ovalarken, mutfağı çocukluğumuzun o tatlı telaşı kaplardı.', 450, null, 2, true),
  ('00000000-0000-0000-0000-000000000103', 'salty', 'Pazar Avlusu', 'Avokado sos, hindi füme, çırpılmış yumurta, krem peynir', 'Kardeşimizin mutfakta ilk kez şefliğe soyunduğu o unutulmaz Pazar sabahı... Geleneksel sofraya modern bir dokunuş katıp avokado sosu çırpılmış yumurta ve hindi füme ile birleştirmişti. O günden beri neşemiz oldu.', 450, null, 3, true),
  ('00000000-0000-0000-0000-000000000104', 'salty', 'Anne Eli Patlıcanlı', 'Ev yapımı patlıcanlı kahvaltılık sos, Erzurum çeçil peyniri, ince kıyılmış maydanoz', 'Annemin her sonbahar kışa hazırlık için odun ateşinde közlediği o efsanevi patlıcan sosu... Erzurum''dan gelen tel tel çeçil peyniri ve taze maydanozla birleştiğinde çocukluğumuzun sıcak soba başı kahvaltıları canlanır.', 450, null, 4, true),
  ('00000000-0000-0000-0000-000000000105', 'salty', 'Bodrum Güneşi', 'Avokado sos, zeytinyağda bekletilmiş kuru domates, Bodrum tulumu, çörek otu', 'Yaz tatillerinde Bodrum''un dar sokaklarındaki o kahvaltıcıdan aldığımız tulum peynirinin lezzeti... Annemin zeytinyağı ve çörek otuyla dinlendirdiği kuru domateslerle birleştiğinde adeta yaz hiç bitmesin isterdik.', 450, null, 5, true),
  ('00000000-0000-0000-0000-000000000106', 'salty', 'Trakya Esintisi', 'Yeşil biberli lor kavurması, çeri domates, iri ceviz parçaları', 'Anneannem Trakya''nın köy biberlerini tereyağında hafifçe çevirir, içine taze lor peynirini bırakırdı. Sobanın üzerinde çıtırdayan ekmeklerin üzerine sürdüğümüz o sıcak lor kavurması, çocukluğumuzun en büyük mutluluğuydu.', 450, null, 6, true),
  ('00000000-0000-0000-0000-000000000107', 'salty', 'Balkon Bahçesi', 'Ev yapımı fesleğenli pesto sos, çeri domates, bebek roka, taze mozerella', 'Evimizin küçük balkonundaki saksılardan ellerimizle topladığımız o mis kokulu fesleğenleri tahta havanda ezerek yaptığımız pesto sos... Taze mozzarella ve çıtır rokalarla tabakta adeta bir bahçe şöleni sunardı.', 450, null, 7, true),
  ('00000000-0000-0000-0000-000000000201', 'sweet', 'Yayla Esintisi', 'Kaymak, süzme çiçek balı, iri ceviz parçaları', 'Dedemin Artvin yaylalarından binbir emekle getirdiği o hakiki süzme çiçek balı... Taze süt kaymağı ve cevizle buluştuğunda, çocukken kaşık kaşık yediğimiz en tatlı, en saf ödülümüzdü.', 450, null, 1, true),
  ('00000000-0000-0000-0000-000000000202', 'sweet', 'Çocukluk Düşü', 'Kaymak, Nutella, taze muz veya çilek dilimleri', 'Hafta sonu karnemizi getirdiğimizde ya da uslu durduğumuzda annemin bizi ödüllendirdiği o şımartan dilim... Çikolata ve kaymağın uyumu, taze çilek ve muzun kokusuyla birleştiğinde en saf çocukluk rüyamız olurdu.', 450, null, 2, true),
  ('00000000-0000-0000-0000-000000000203', 'sweet', 'Kazan Dibi Reçeli', 'French toast (tereyağında mühürlenmiş brioche ekmeği), ev yapımı mevsim reçelleri', 'Büyükannemin bahçeden topladığı vişneleri, incirleri bakır kazanlarda kaynatarak yaptığı o parlak reçeller... Tereyağında mühürlenmiş yumuşacık brioche ekmeğiyle birleştiğinde pazar sabahı ritüelimiz tamamlanırdı.', 450, null, 3, true)
on conflict (id) do update set
  category = excluded.category,
  name = excluded.name,
  ingredients = excluded.ingredients,
  story = excluded.story,
  price = excluded.price,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.menu_item_allergens (menu_item_id, allergen_id) values
  ('00000000-0000-0000-0000-000000000101', 'gluten'),
  ('00000000-0000-0000-0000-000000000101', 'nuts'),
  ('00000000-0000-0000-0000-000000000102', 'dairy'),
  ('00000000-0000-0000-0000-000000000103', 'egg'),
  ('00000000-0000-0000-0000-000000000103', 'dairy'),
  ('00000000-0000-0000-0000-000000000104', 'dairy'),
  ('00000000-0000-0000-0000-000000000105', 'dairy'),
  ('00000000-0000-0000-0000-000000000106', 'dairy'),
  ('00000000-0000-0000-0000-000000000106', 'nuts'),
  ('00000000-0000-0000-0000-000000000107', 'dairy'),
  ('00000000-0000-0000-0000-000000000107', 'nuts'),
  ('00000000-0000-0000-0000-000000000201', 'dairy'),
  ('00000000-0000-0000-0000-000000000201', 'nuts'),
  ('00000000-0000-0000-0000-000000000202', 'dairy'),
  ('00000000-0000-0000-0000-000000000202', 'nuts'),
  ('00000000-0000-0000-0000-000000000203', 'egg'),
  ('00000000-0000-0000-0000-000000000203', 'dairy'),
  ('00000000-0000-0000-0000-000000000203', 'gluten')
on conflict do nothing;

insert into public.extras (id, name, price, allergen_id, sort_order, is_active) values
  ('00000000-0000-0000-0000-000000000301', 'Çırpılmış yumurta', 450, 'egg', 1, true),
  ('00000000-0000-0000-0000-000000000302', 'Bacon (domuz pastırması)', 450, null, 2, true)
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  allergen_id = excluded.allergen_id,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.drinks (id, category, name, price, sort_order, is_active) values
  ('00000000-0000-0000-0000-000000000501', 'hot', 'Türk Kahvesi', 0, 1, true),
  ('00000000-0000-0000-0000-000000000502', 'hot', 'Çay', 0, 2, true),
  ('00000000-0000-0000-0000-000000000601', 'cold', 'Ev Yapımı Limonata', 0, 1, true),
  ('00000000-0000-0000-0000-000000000602', 'cold', 'Soğuk Kahve', 0, 2, true)
on conflict (id) do update set
  category = excluded.category,
  name = excluded.name,
  price = excluded.price,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.bread_panel (id, title, slogan, description_1, description_2, is_active) values
  (
    true,
    'Ekmeğimiz',
    'Ateşin ve Sabrın Çıtır Eseri: Her Dilimde Yaşayan Gerçek Ekşi Maya Kokusu',
    'Taş değirmende öğütülen unlarla, uzun fermantasyon süreciyle ve geleneksel yöntemlerle hazırlanır. Dışı çıtır, içi yoğun aromalı ve doğal dokusuyla gerçek köy ekmeği lezzetini sunar.',
    'Katkı maddesi içermez. Sindirim dostu yapısı ve güçlü aromasıyla kahvaltılardan ana yemeklere kadar her sofraya yakışır.',
    true
  )
on conflict (id) do update set
  title = excluded.title,
  slogan = excluded.slogan,
  description_1 = excluded.description_1,
  description_2 = excluded.description_2,
  is_active = excluded.is_active;

insert into public.bread_panel_items (id, icon, text, sort_order, is_active) values
  ('00000000-0000-0000-0000-000000000401', '🔥', 'Günlük taze çıkar.', 1, true),
  ('00000000-0000-0000-0000-000000000402', '🍞', 'Doğal ekşi maya ile fermente edilir.', 2, true),
  ('00000000-0000-0000-0000-000000000403', '🌾', 'Geleneksel köy usulü üretim.', 3, true)
on conflict (id) do update set
  icon = excluded.icon,
  text = excluded.text,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do update set public = excluded.public;

alter table public.allergens enable row level security;
alter table public.menu_items enable row level security;
alter table public.menu_item_allergens enable row level security;
alter table public.extras enable row level security;
alter table public.drinks enable row level security;
alter table public.bread_panel enable row level security;
alter table public.bread_panel_items enable row level security;

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

drop policy if exists "Public read menu images" on storage.objects;
create policy "Public read menu images" on storage.objects for select using (bucket_id = 'menu-images');

drop policy if exists "Authenticated upload menu images" on storage.objects;
create policy "Authenticated upload menu images" on storage.objects for insert to authenticated with check (bucket_id = 'menu-images');

drop policy if exists "Authenticated update menu images" on storage.objects;
create policy "Authenticated update menu images" on storage.objects for update to authenticated using (bucket_id = 'menu-images') with check (bucket_id = 'menu-images');

drop policy if exists "Authenticated delete menu images" on storage.objects;
create policy "Authenticated delete menu images" on storage.objects for delete to authenticated using (bucket_id = 'menu-images');
