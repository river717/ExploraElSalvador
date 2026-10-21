"use client";

import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("explora-theme");
    const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("explora-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      className={[styles.button, className].filter(Boolean).join(" ")}
      type="button"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
      aria-pressed={theme === "dark"}
      title={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
