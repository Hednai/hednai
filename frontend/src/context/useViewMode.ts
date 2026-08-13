// ============================================
// context/useViewMode.ts
// Hook pour acceder au mode depuis n'importe quel composant
// ============================================
import { useContext } from "react";
import { ViewModeContext } from "./ViewModeContext";

export function useViewMode() {
  const context = useContext(ViewModeContext);

  if (!context) {
    throw new Error("useViewMode doit etre utilise dans un ViewModeProvider");
  }

  return context;
}