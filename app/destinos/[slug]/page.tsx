import { Suspense } from "react";
import SiteHeader from "../../components/site-header";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "../destinos.module.css";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export default function DestinationPage({ params }: DestinationPageProps) {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className={styles.shell} aria-busy="true" aria-live="polite">
          <p className={styles.eyebrow}>Explora El Salvador</p>
          <h1 className={styles.title}>Cargando destino…</h1>
          </main>
        }
      >
        <DestinationContent params={params} />
      </Suspense>
    </>
  );
}

async function DestinationContent({ params }: DestinationPageProps) {
  const { slug } = await params;
  const supabase = createSupabaseServerClient();
  const { data: destination, error } = await supabase
    .from("destinations")
    .select("slug, name, department, category, description")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return (
      <main className={styles.shell}>
        <p className={styles.message} role="alert">
          No se pudo cargar este destino. Intenta de nuevo más tarde.
        </p>
      </main>
    );
  }

  if (!destination) notFound();

  return (
    <main className={styles.shell}>
      <Link className={styles.back} href="/destinos">
        ← Todos los destinos
      </Link>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{destination.category}</p>
        <h1 className={styles.title}>{destination.name}</h1>
        <p className={styles.meta}>{destination.department}</p>
        <p className={styles.intro}>{destination.description}</p>
      </header>
      <Link
        className={styles.cardCategory}
        href={`/categorias/${destination.category.toLowerCase()}`}
      >
        Ver más de {destination.category}
      </Link>
    </main>
  );
}
