import { Suspense } from "react";
import SiteHeader from "../../components/site-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "../../destinos/destinos.module.css";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const categories: Record<string, string> = {
  aventura: "Aventura",
  cultura: "Cultura",
  naturaleza: "Naturaleza",
  playa: "Playa",
  pueblos: "Pueblos",
};

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className={styles.shell} aria-busy="true" aria-live="polite">
          <p className={styles.eyebrow}>Explora El Salvador</p>
          <h1 className={styles.title}>Buscando destinos…</h1>
          </main>
        }
      >
        <CategoryContent params={params} />
      </Suspense>
    </>
  );
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories[slug];
  if (!category) notFound();

  const supabase = createSupabaseServerClient();
  const { data: destinations, error } = await supabase
    .from("destinations")
    .select("slug, name, department, category, description")
    .eq("category", category)
    .order("name");

  if (error) {
    return (
      <main className={styles.shell}>
        <p className={styles.message} role="alert">
          No se pudieron cargar los destinos de esta categoría. Intenta de nuevo más tarde.
        </p>
      </main>
    );
  }

  return (
    <main className={styles.shell}>
      <Link className={styles.back} href="/destinos">
        ← Todos los destinos
      </Link>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Categoría</p>
        <h1 className={styles.title}>{category}</h1>
        <p className={styles.intro}>
          Lugares de El Salvador para quienes quieren explorar {category.toLowerCase()}.
        </p>
      </header>

      {destinations.length === 0 ? (
        <p className={styles.message}>Todavía no hay destinos en esta categoría.</p>
      ) : (
        <section className={styles.grid} aria-label={`Destinos de ${category}`}>
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
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
