// ============================================
// context/ViewModeContext.tsx
// Contexte global qui gere le mode d'affichage du site
// "client" = ton startup (nous, solutions, maritime)
// "recruiter" = ton portfolio (je, competences, CV)
// Le toggle est dans la Navbar
// ============================================
import { createContext, useState } from "react";
import type { ReactNode } from "react";

// Les deux modes possibles
type ViewMode = "client" | "recruiter";

// Ce que le contexte fournit a toute l'application
interface ViewModeContextType {
  mode: ViewMode;
  toggleMode: () => void;
  isRecruiter: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

// Provider qui enveloppe l'application
export function ViewModeProvider({ children }: { children: ReactNode }) {
  // Mode par defaut : client (startup)
  const [mode, setMode] = useState<ViewMode>("client");

  // Basculer entre les deux modes
  const toggleMode = () => {
    setMode((prev) => (prev === "client" ? "recruiter" : "client"));
  };

  // Raccourci pour savoir si on est en mode recruteur
  const isRecruiter = mode === "recruiter";

  return (
    <ViewModeContext.Provider value={{ mode, toggleMode, isRecruiter }}>
      {children}
    </ViewModeContext.Provider>
  );
}