create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  gender text default 'female',
  coins integer default 85000,
  gems integer default 2500
);
create table if not exists recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  cuisine text default 'ایرانی',
  is_custom boolean default false
);
create table if not exists party_scores (
  id uuid primary key default gen_random_uuid(),
  night integer not null,
  food_score int,
  decor_score int,
  hosting_score int,
  style_score int
);