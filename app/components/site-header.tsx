import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import styles from "./site-header.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Explora El Salvador, inicio">
        <span className={styles.brandMark}>E</span>
        <span>
          explora<span className={styles.brandLight}>SV</span>
        </span>
      </Link>
      <nav className={styles.nav} aria-label="Navegación principal">
        <Link href="/destinos">Destinos</Link>
        <Link href="/#categorias">Experiencias</Link>
        <Link className={styles.navCta} href="/destinos">
          Empezar a explorar <span aria-hidden="true">↗</span>
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
