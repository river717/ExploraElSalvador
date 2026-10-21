-- Agrega destinos turísticos de ejemplo sin duplicar los que ya existen.
-- Ejecutar en Supabase Dashboard > SQL Editor.

insert into public.destinations
  (slug, name, department, category, description)
values
  ('lago-coatepeque', 'Lago de Coatepeque', 'Santa Ana', 'Naturaleza',
   'Lago de origen volcánico rodeado de montañas, con paisajes para disfrutar junto al agua.'),
  ('joya-de-ceren', 'Joya de Cerén', 'La Libertad', 'Cultura',
   'Sitio arqueológico conocido por conservar vestigios de una antigua comunidad maya.'),
  ('tazumal', 'Sitio Arqueológico Tazumal', 'Santa Ana', 'Cultura',
   'Complejo arqueológico de Chalchuapa con estructuras prehispánicas y un museo de sitio.'),
  ('el-boqueron', 'Parque Nacional El Boquerón', 'San Salvador', 'Naturaleza',
   'Área natural en el volcán de San Salvador con senderos y vistas hacia el cráter.'),
  ('playa-el-zonte', 'Playa El Zonte', 'La Libertad', 'Playa',
   'Destino costero de ambiente relajado, conocido por sus olas y atardeceres.'),
  ('costa-del-sol', 'Costa del Sol', 'La Paz', 'Playa',
   'Extensa zona costera ideal para disfrutar de la playa, el estero y la gastronomía local.'),
  ('bahia-de-jiquilisco', 'Bahía de Jiquilisco', 'Usulután', 'Naturaleza',
   'Área costera de manglares, islas y canales en el oriente de El Salvador.'),
  ('volcan-de-conchagua', 'Volcán de Conchagua', 'La Unión', 'Aventura',
   'Ruta de montaña que ofrece panoramas del golfo y las islas del oriente salvadoreño.'),
  ('perquin', 'Perquin', 'Morazan', 'Cultura',
   'Pueblo de montaña con historia, clima fresco y acceso a atractivos naturales de Morazan.'),
  ('alegria', 'Alegría', 'Usulután', 'Pueblos',
   'Pueblo de altura rodeado de montañas, flores y paisajes del volcán Tecapa.'),
  ('la-palma', 'La Palma', 'Chalatenango', 'Pueblos',
   'Pueblo reconocido por sus artesanías coloridas y su ambiente de montaña.'),
  ('ilobasco', 'Ilobasco', 'Cabañas', 'Cultura',
   'Ciudad conocida por sus artesanías de barro y tradiciones de alfarería.'),
  ('parque-deininger', 'Parque Walter Thilo Deininger', 'La Libertad', 'Aventura',
   'Área natural protegida con senderos, bosque y espacios para explorar al aire libre.'),
  ('laguna-verde-apaneca', 'Laguna Verde de Apaneca', 'Ahuachapán', 'Naturaleza',
   'Laguna de montaña rodeada de vegetación, cerca de la zona cafetalera de Apaneca.'),
  ('cascadas-de-tamanique', 'Cascadas de Tamanique', 'La Libertad', 'Aventura',
   'Conjunto de cascadas accesibles mediante una caminata por el entorno natural de Tamanique.')
on conflict (slug) do update set
  name = excluded.name,
  department = excluded.department,
  category = excluded.category,
  description = excluded.description;
