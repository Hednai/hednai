// ============================================
// hooks/useEscapeKey.ts
// Ferme un element (modal, overlay) quand l'utilisateur appuie sur Escape
// Reutilisable dans toutes les modales du projet
// Source : WCAG 2.1.2 — aucun piege au clavier
// ============================================
import { useEffect } from "react";

export function useEscapeKey(callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}