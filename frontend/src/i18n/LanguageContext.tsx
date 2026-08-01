// ============================================
// i18n/LanguageContext.tsx
// Systeme bilingue FR/EN avec React Context
// Ce fichier ne contient QUE le composant Provider
// Le contexte et le hook sont dans useLanguage.ts (voir ce fichier)
// ============================================
import { useState } from "react";
import type { ReactNode } from "react";
import { LanguageContext, translations } from "./useLanguage";

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