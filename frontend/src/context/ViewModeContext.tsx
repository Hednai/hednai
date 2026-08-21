// ============================================
// context/ViewModeContext.tsx
// Contexte global qui gere le mode d'affichage du site
// "client" = startup (nous, solutions, maritime)
// "recruiter" = portfolio (je, competences, CV)
// Le toggle est dans la Navbar
// ============================================
import { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

// Les deux modes possibles
type ViewMode = "client" | "recruiter";

// Ce que le contexte fournit a toute l'application
interface ViewModeContextType {
  mode: ViewMode;
  toggleMode: () => void;
  setMode: (mode: ViewMode) => void;
  isRecruiter: boolean;
  // Callback optionnel execute apres chaque changement de mode
  onModeChange: ((newMode: ViewMode) => void) | null;
  setOnModeChange: (cb: ((newMode: ViewMode) => void) | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

// Provider qui enveloppe l'application
export function ViewModeProvider({ children }: { children: ReactNode }) {
  // Mode par defaut : client (startup)
  const [mode, setModeState] = useState<ViewMode>("client");
  // Callback optionnel pour reagir au changement de mode (ex: scroll to top)
  const [onModeChange, setOnModeChange] = useState<((newMode: ViewMode) => void) | null>(null);

  // Definir un mode specifique (utile pour le CTA recruteur)
  const setMode = useCallback((newMode: ViewMode) => {
    setModeState(newMode);
    onModeChange?.(newMode);
  }, [onModeChange]);

  // Basculer entre les deux modes
  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next = prev === "client" ? "recruiter" : "client";
      onModeChange?.(next);
      return next;
    });
  }, [onModeChange]);

  // Raccourci pour savoir si on est en mode recruteur
  const isRecruiter = mode === "recruiter";

  return (
    <ViewModeContext.Provider value={{ mode, toggleMode, setMode, isRecruiter, onModeChange, setOnModeChange }}>
      {children}
    </ViewModeContext.Provider>
  );
}