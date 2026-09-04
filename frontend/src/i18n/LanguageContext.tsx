// ============================================
// i18n/LanguageContext.tsx
// Systeme bilingue FR/EN avec React Context
// Ce fichier ne contient QUE le composant Provider
// Le contexte et le hook sont dans useLanguage.ts (voir ce fichier)
// ============================================
import { useState, useEffect, useCallback, useMemo } from "react";
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
  // useCallback : sans lui, une nouvelle fonction t etait creee a chaque rendu,
  // ce qui invalidait la valeur du contexte et re-rendait TOUS les consommateurs
  const t = useCallback(
    (key: string): string => translations[lang][key] || key,
    [lang],
  );

  // Basculer la langue. La fonction de mise a jour d'etat reste PURE :
  // elle ne fait que calculer la valeur suivante. La sauvegarde et la mise a
  // jour du DOM sont faites dans l'effet ci-dessous.
  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"));
  }, []);

  // Synchroniser l'attribut lang du document et le localStorage.
  // Ce code etait auparavant execute PENDANT le rendu, ce qui est interdit :
  // React peut rendre un composant plusieurs fois ou abandonner un rendu.
  // L'attribut lang correct est indispensable aux lecteurs d'ecran et au SEO
  // (WCAG 3.1.1 — Langue de la page).
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("hednai-lang", lang);
    } catch (e) {
      console.warn("Impossible de sauvegarder la langue :", e);
    }
  }, [lang]);

  // useMemo : un objet recree a chaque rendu forcerait tous les consommateurs
  // du contexte a se re-rendre inutilement
  const valeur = useMemo(() => ({ lang, t, toggleLang }), [lang, t, toggleLang]);

  return (
    <LanguageContext.Provider value={valeur}>
      {children}
    </LanguageContext.Provider>
  );
}