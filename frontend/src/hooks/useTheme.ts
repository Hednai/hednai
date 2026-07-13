// ============================================
// hooks/useTheme.ts
// Gestion du mode sombre avec localStorage
// ============================================
import { useState, useEffect } from "react";

export function useTheme() {
  // Au chargement : lire le theme sauvegarde, sinon utiliser la preference systeme
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("hednai-theme");

    if (saved) {
      return saved === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // A chaque changement de isDark : appliquer le theme sur la page et le sauvegarder
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );

    localStorage.setItem("hednai-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Fonction pour basculer entre les deux themes
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleTheme };
}