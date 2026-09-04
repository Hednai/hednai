// ============================================
// context/ViewModeContext.tsx
// Contexte global qui gere le mode d'affichage du site
// "client" = startup (nous, solutions, maritime)
// "recruiter" = portfolio (je, competences, CV)
// Le toggle est dans la Navbar
// ============================================
import { createContext, useState, useCallback, useEffect, useMemo } from "react";
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

// Cle de stockage — declaree une seule fois (pas de chaine en dur repetee)
const CLE_STOCKAGE = "hednai-mode";

// Provider qui enveloppe l'application
export function ViewModeProvider({ children }: { children: ReactNode }) {
  // Mode par defaut : client (startup).
  // On relit le choix precedent : la politique de confidentialite annonce que
  // le mode d'affichage est conserve en localStorage, ce qui n'etait pas le cas.
  const [mode, setModeState] = useState<ViewMode>(() => {
    try {
      return localStorage.getItem(CLE_STOCKAGE) === "recruiter" ? "recruiter" : "client";
    } catch {
      return "client";
    }
  });

  // Callback optionnel pour reagir au changement de mode (ex: scroll to top)
  const [onModeChange, setOnModeChange] = useState<((newMode: ViewMode) => void) | null>(null);

  // Sauvegarde du mode a chaque changement (effet, jamais pendant le rendu)
  useEffect(() => {
    try {
      localStorage.setItem(CLE_STOCKAGE, mode);
    } catch {
      // Navigation privee Safari : le stockage peut lever une exception
    }
  }, [mode]);

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

  // useMemo : sans lui, un nouvel objet etait cree a chaque rendu du provider,
  // ce qui forcait le re-rendu de tous les composants consommateurs
  const valeur = useMemo(
    () => ({ mode, toggleMode, setMode, isRecruiter, onModeChange, setOnModeChange }),
    [mode, toggleMode, setMode, isRecruiter, onModeChange],
  );

  return (
    <ViewModeContext.Provider value={valeur}>
      {children}
    </ViewModeContext.Provider>
  );
}