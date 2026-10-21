import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DestinosPage() {
  const supabase = createSupabaseServerClient();

  const { data: destinations, error } = await supabase
    .from("destinations")
    .select("slug, name, department, category, description")
    .order("name");

  if (error) {
    return (
      <main>
        <h1>Destinos de El Salvador</h1>
        <p role="alert">No se pudieron cargar los destinos: {error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Destinos de El Salvador</h1>
      {destinations.length === 0 ? (
        <p>Aún no hay destinos registrados.</p>
      ) : (
        <ul>
          {destinations.map((destination) => (
            <li key={destination.slug}>
              <h2>{destination.name}</h2>
              <p>
                {destination.department} · {destination.category}
              </p>
              <p>{destination.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
