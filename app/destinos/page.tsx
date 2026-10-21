import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "./destinos.module.css";

export default async function DestinosPage() {
  const supabase = createSupabaseServerClient();

  const { data: destinations, error } = await supabase
    .from("destinations")
    .select("slug, name, department, category, description")
    .order("name");

  if (error) {
    return (
      <main className={styles.shell}>
        <p className={styles.eyebrow}>Explora El Salvador</p>
        <h1 className={styles.title}>Destinos para descubrir</h1>
        <p className={styles.message} role="alert">
          No se pudieron cargar los destinos. Intenta de nuevo más tarde.
        </p>
      </main>
    );
  }

  return (
    <main className={styles.shell}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Explora El Salvador</p>
        <h1 className={styles.title}>Un país pequeño, muchas historias</h1>
        <p className={styles.intro}>
          Playas, volcanes y pueblos esperan por ti. Elige un destino para
          conocer más o explora una categoría.
        </p>
      </header>

      {destinations.length === 0 ? (
        <p className={styles.message}>Aún no hay destinos registrados.</p>
      ) : (
        <section className={styles.grid} aria-label="Destinos disponibles">
          {destinations.map((destination) => (
            <article className={styles.card} key={destination.slug}>
              <Link
                className={styles.cardLink}
                href={`/destinos/${destination.slug}`}
              >
                {destination.name}
              </Link>
              <p className={styles.meta}>{destination.department}</p>
              <p className={styles.description}>{destination.description}</p>
              <Link
                className={styles.cardCategory}
                href={`/categorias/${destination.category.toLowerCase()}`}
              >
                {destination.category}
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
