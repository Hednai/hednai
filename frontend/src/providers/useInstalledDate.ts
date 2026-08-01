// ============================================
// providers/useInstalledDate.ts
// Le contexte et le hook, separes du Provider
// pour respecter la regle "un fichier .tsx = seulement des composants"
// ============================================
import { createContext, useContext } from "react";

// Le contexte stocke un tuple : [dateEpoch, fonctionDeMiseAJour]
export type InstalledDateContextValue = [number, (date: number) => void];

export const InstalledDateContext = createContext<InstalledDateContextValue | null>(null);

// Hook personnalise : acces unique pour lire/ecrire la date
export function useInstalledDate() {
  const context = useContext(InstalledDateContext);
  if (!context) {
    throw new Error("useInstalledDate doit etre utilise dans InstalledDateProvider");
  }
  return context;
}