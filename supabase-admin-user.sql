-- SliceUp Breakfast admin kullanıcısı
-- Supabase SQL Editor içinde çalıştırın.
-- ÇALIŞTIRMADAN ÖNCE TEMP_PASSWORD_HERE değerini güçlü bir şifreyle değiştirin.

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
values (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'sliceupbreakfast@gmail.com',
  crypt('TEMP_PASSWORD_HERE', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"name":"SliceUp Breakfast Admin"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
)
on conflict (email) do update set
  encrypted_password = excluded.encrypted_password,
  email_confirmed_at = now(),
  raw_app_meta_data = excluded.raw_app_meta_data,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = now();

insert into auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
select
  id,
  id,
  jsonb_build_object(
    'sub', id::text,
    'email', email,
    'email_verified', true,
    'phone_verified', false
  ),
  'email',
  email,
  now(),
  now(),
  now()
from auth.users
where email = 'sliceupbreakfast@gmail.com'
on conflict (provider, provider_id) do update set
  user_id = excluded.user_id,
  identity_data = excluded.identity_data,
  updated_at = now();
