create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  department text not null,
  category text not null,
  description text not null,
  image_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.destinations enable row level security;

grant select on public.destinations to anon, authenticated;

drop policy if exists "Cualquiera puede leer destinos"
  on public.destinations;

create policy "Cualquiera puede leer destinos"
  on public.destinations
  for select
  to anon, authenticated
  using (true);

insert into public.destinations
  (slug, name, department, category, description, featured)
values
  ('el-tunco', 'Playa El Tunco', 'La Libertad', 'Playa',
   'Playa popular por el surf, sus atardeceres y restaurantes junto al mar.', true),
  ('cerro-verde', 'Parque Nacional Cerro Verde', 'Santa Ana', 'Naturaleza',
   'Bosques de altura y miradores hacia los volcanes de la zona occidental.', true),
  ('volcan-santa-ana', 'Volcán de Santa Ana', 'Santa Ana', 'Aventura',
   'Ruta de senderismo hacia el cráter del volcán más alto de El Salvador.', true),
  ('suchitoto', 'Suchitoto', 'Cuscatlán', 'Cultura',
   'Ciudad colonial conocida por sus calles empedradas, galerías y vistas al lago.', false),
  ('ruta-de-las-flores', 'Ruta de las Flores', 'Ahuachapán y Sonsonate', 'Pueblos',
   'Recorrido por pueblos de montaña, mercados, cafés y paisajes verdes.', false)
on conflict (slug) do update set
  name = excluded.name,
  department = excluded.department,
  category = excluded.category,
  description = excluded.description,
  featured = excluded.featured;
