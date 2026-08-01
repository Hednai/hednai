// ============================================
// providers/InstalledDateProvider.tsx
// Gere la date de fermeture de la banniere d'installation PWA
// Stocke dans localStorage pour ne pas re-afficher trop vite
// Pattern identique a LanguageContext (Context + hook)
// ============================================
import { createContext, useContext, useState } from "react";

// Le contexte stocke un tuple : [dateEpoch, fonctionDeMiseAJour]
type InstalledDateContextValue = [number, (date: number) => void];

const InstalledDateContext = createContext<InstalledDateContextValue | null>(null);

const STORAGE_KEY = "hednai-install-dismissed";

export function InstalledDateProvider({ children }: { children: React.ReactNode }) {
  // Lire localStorage une seule fois au montage (try/catch pour les tests)
  const [installedDate, setInstalledDate] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Wrapper : synchronise React state ET localStorage
  const setDateWithStorage = (date: number) => {
    try { localStorage.setItem(STORAGE_KEY, String(date)); } catch { /* tests */ }
    setInstalledDate(date);
  };

  return (
    <InstalledDateContext.Provider value={[installedDate, setDateWithStorage]}>
      {children}
    </InstalledDateContext.Provider>
  );
}

// Hook personnalise : acces unique pour lire/ecrire la date
export function useInstalledDate() {
  const context = useContext(InstalledDateContext);
  if (!context) {
    throw new Error("useInstalledDate doit etre utilise dans InstalledDateProvider");
  }
  return context;
}