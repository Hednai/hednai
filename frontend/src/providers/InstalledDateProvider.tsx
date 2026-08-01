// ============================================
// providers/InstalledDateProvider.tsx
// Gere la date de fermeture de la banniere d'installation PWA
// Stocke dans localStorage pour ne pas re-afficher trop vite
// Ce fichier ne contient QUE le composant Provider
// Le contexte et le hook sont dans useInstalledDate.ts
// ============================================
import { useState } from "react";
import { InstalledDateContext } from "./useInstalledDate";

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