# Explora El Salvador

Landing page para descubrir destinos turísticos de El Salvador. El proyecto permite explorar lugares por categoría, consultar la información de cada destino y muestra destinos destacados desde Supabase.

## Enlaces

- **Sitio en producción:** https://explora-el-salvador-one.vercel.app/
- **Repositorio:** https://github.com/river717/ExploraElSalvador

## Tecnologías

- Next.js 16 con App Router y Server Components.
- TypeScript y CSS Modules, con diseño adaptable a pantallas móviles.
- Supabase como base de datos serverless.
- Vercel para el despliegue.

## Funcionalidades y rutas

- `/`: landing con categorías y destinos destacados consultados desde Supabase.
- `/destinos`: listado de destinos.
- `/destinos/[slug]`: detalle dinámico de un destino, por ejemplo `/destinos/el-tunco`.
- `/categorias/[slug]`: destinos filtrados por categoría, por ejemplo `/categorias/playa`.
- Estados de carga con `Suspense` y mensajes de error para las consultas.

## Requisitos

- Node.js 22 o posterior.
- Una cuenta y un proyecto de Supabase.

## Configuración local

1. Clona el repositorio y entra a la carpeta:

   ```bash
   git clone https://github.com/river717/ExploraElSalvador.git
   cd ExploraElSalvador
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. En Supabase, abre **SQL Editor** y ejecuta el contenido de [`supabase/schema.sql`](supabase/schema.sql). El script crea la tabla `destinations`, activa RLS, habilita la lectura pública y agrega cinco destinos de ejemplo.

4. En el directorio raíz del proyecto, crea `.env.local` con los valores de **Connect** o **Settings → API Keys** de tu proyecto Supabase:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_tu_clave
   ```

   Sustituye los ejemplos por tus valores. No subas `.env.local` al repositorio. La aplicación solo necesita la URL del proyecto y la clave **publishable**; no uses una clave `secret` o `service_role`.

5. Inicia el servidor local:

   ```bash
   npm run dev
   ```

6. Abre [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

Importa el repositorio en Vercel y agrega las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` para los entornos que usarás. Después, inicia el despliegue. Los cambios enviados a la rama `main` se pueden publicar desde la integración de Git.

## Seguridad de datos

La tabla `destinations` tiene habilitado Row Level Security (RLS). La política incluida permite que los roles `anon` y `authenticated` lean los destinos; no otorga permisos de escritura desde la aplicación.
