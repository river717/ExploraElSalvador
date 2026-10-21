import styles from "../destinos.module.css";

export default function DestinationLoading() {
  return (
    <main className={styles.shell} aria-busy="true" aria-live="polite">
      <p className={styles.eyebrow}>Cargando</p>
      <h1 className={styles.title}>Preparando tu destino…</h1>
    </main>
  );
}
