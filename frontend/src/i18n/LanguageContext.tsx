// ============================================
// i18n/LanguageContext.tsx
// Systeme bilingue FR/EN avec React Context
// v6 : toggle simple (pas de setLang direct)
// ============================================
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { fr } from "./fr";
import { en } from "./en";

// Type du contexte : ce qu'on peut utiliser depuis n'importe quel composant
interface LanguageContextType {
  lang: "fr" | "en";
  t: (key: string) => string;
  toggleLang: () => void;
}

// Creer le contexte (au depart vide, rempli par le Provider ci-dessous)
const LanguageContext = createContext<LanguageContextType | null>(null);

// Regrouper les deux fichiers de traduction dans un seul objet
const translations: Record<string, Record<string, string>> = { fr, en };

// Le Provider — il "enveloppe" toute l'application pour donner acces
// a la langue et a la fonction de traduction partout
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Langue par defaut au chargement du site : francais
  // Lire la langue sauvegardee (try/catch pour les tests et SSR)
  const [lang, setLang] = useState<"fr" | "en">(() => {
    try {
      const saved = localStorage.getItem("hednai-lang");
      return saved === "en" ? "en" : "fr";
    } catch {
      return "fr";
    }
  });

  // Fonction de traduction : on lui donne une cle, elle retourne le texte
  // Si la cle n'existe pas, on affiche la cle elle-meme (utile pour debugger)
  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  // Fonction pour basculer entre francais et anglais
  // Basculer la langue et sauvegarder dans localStorage
  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      try { localStorage.setItem("hednai-lang", next); } catch { /* tests */ }
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

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