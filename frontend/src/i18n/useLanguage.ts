// ============================================
// i18n/useLanguage.ts
// Le contexte et le hook de traduction, separes du Provider
// pour respecter la regle "un fichier .tsx = seulement des composants"
// ============================================
import { createContext, useContext } from "react";
import { fr } from "./fr";
import { en } from "./en";

// Type du contexte : ce qu'on peut utiliser depuis n'importe quel composant
export interface LanguageContextType {
  lang: "fr" | "en";
  t: (key: string) => string;
  toggleLang: () => void;
}

// Creer le contexte (au depart vide, rempli par le Provider dans LanguageContext.tsx)
export const LanguageContext = createContext<LanguageContextType | null>(null);

// Regrouper les deux fichiers de traduction dans un seul objet
export const translations: Record<string, Record<string, string>> = { fr, en };

// Hook personnalise pour utiliser facilement le contexte dans un composant
// Exemple : const { t } = useLanguage();
export function useLanguage() {
  const context = useContext(LanguageContext);

  // Securite : empeche d'utiliser ce hook en dehors du Provider
  if (!context) {
    throw new Error("useLanguage doit etre utilise dans un LanguageProvider");
  }

  return context;
}