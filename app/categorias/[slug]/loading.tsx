import styles from "../../destinos/destinos.module.css";

export default function CategoryLoading() {
  return (
    <main className={styles.shell} aria-busy="true" aria-live="polite">
      <p className={styles.eyebrow}>Cargando</p>
      <h1 className={styles.title}>Buscando destinos…</h1>
    </main>
  );
}
