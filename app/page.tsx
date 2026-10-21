import { Suspense } from "react";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import styles from "./home.module.css";
import SiteHeader from "./components/site-header";

const categories = [
  { label: "Playas", slug: "playa", icon: "☀", description: "Sol, olas y atardeceres" },
  { label: "Naturaleza", slug: "naturaleza", icon: "⌁", description: "Volcanes, lagos y senderos" },
  { label: "Cultura", slug: "cultura", icon: "✳", description: "Pueblos llenos de historia" },
  { label: "Aventura", slug: "aventura", icon: "↗", description: "Nuevos caminos por descubrir" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}><span /> Un destino, mil maneras de vivirlo</p>
          <h1>El Salvador<br />te queda <em>por descubrir.</em></h1>
          <p className={styles.heroText}>
            Desde la primera ola hasta el último café del día: encuentra ese lugar que hará especial tu próxima aventura.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/destinos">Explorar destinos <span aria-hidden="true">→</span></Link>
            <a className={styles.textButton} href="#categorias">Conoce el país <span aria-hidden="true">↓</span></a>
          </div>
          <p className={styles.heroNote}>Pequeño en territorio. Inmenso en experiencias.</p>
        </div>
        <div className={styles.landscape} aria-label="Ilustración de montañas y costa salvadoreña" role="img">
          <span className={styles.sun} />
          <span className={styles.mountainBack} />
          <span className={styles.mountainFront} />
          <span className={styles.water} />
          <span className={styles.landscapeLabel}>13.7° N · 89.2° O</span>
          <div className={styles.stamp}><strong>SV</strong><span>un país<br />para sentir</span></div>
        </div>
      </section>

      <section className={styles.categories} id="categorias">
        <div className={styles.sectionHeading}>
          <div><p className={styles.sectionKicker}>¿Qué te inspira?</p><h2>Elige tu próxima historia</h2></div>
          <Link href="/destinos">Ver todos los destinos <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link className={styles.categoryCard} href={`/categorias/${category.slug}`} key={category.slug}>
              <span className={styles.categoryIcon} aria-hidden="true">{category.icon}</span>
              <span className={styles.categoryLabel}>{category.label}</span>
              <span className={styles.categoryDescription}>{category.description}</span>
              <span className={styles.categoryArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.sectionKicker}>Favoritos para empezar</p><h2>Lugares que se quedan contigo</h2></div>
          <Link href="/destinos">Descubrir más <span aria-hidden="true">↗</span></Link>
        </div>
        <Suspense fallback={<FeaturedFallback />}>
          <FeaturedDestinations />
        </Suspense>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark}>E</span>
          <span>explora<span className={styles.brandLight}>SV</span></span>
        </Link>
        <p>Hecho para descubrir El Salvador, lugar por lugar.</p>
        <Link href="/destinos">Ver destinos <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  );
}

async function FeaturedDestinations() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("slug, name, department, category, description")
    .eq("featured", true)
    .order("name")
    .limit(3);

  if (error) {
    return <p className={styles.emptyState}>No pudimos cargar los destacados. <Link href="/destinos">Explora todos los destinos.</Link></p>;
  }

  if (data.length === 0) {
    return <p className={styles.emptyState}>Pronto agregaremos nuevos lugares para descubrir. <Link href="/destinos">Mientras tanto, mira todos los destinos.</Link></p>;
  }

  return (
    <div className={styles.featuredGrid}>
      {data.map((destination, index) => (
        <article className={styles.featuredCard} key={destination.slug}>
          <div className={`${styles.featuredArt} ${styles[`art${index + 1}`]}`} aria-hidden="true">
            <span>{destination.category}</span><span className={styles.artNumber}>0{index + 1}</span>
          </div>
          <div className={styles.featuredInfo}>
            <p>{destination.department}</p>
            <h3><Link href={`/destinos/${destination.slug}`}>{destination.name}</Link></h3>
            <p className={styles.featuredDescription}>{destination.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function FeaturedFallback() {
  return (
    <div className={styles.featuredGrid} aria-busy="true" aria-live="polite">
      {[1, 2, 3].map((item) => <div className={styles.skeleton} key={item} />)}
    </div>
  );
}
