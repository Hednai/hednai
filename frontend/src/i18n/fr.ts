// ============================================
// i18n/fr.ts — Assemblage des traductions francaises
// Chaque module correspond a une section ou une page du site
// Pour ajouter des traductions, modifier le fichier du module concerne dans fr/
// ============================================
// Les chemins respectent EXACTEMENT la casse des fichiers sur disque.
// Windows est insensible a la casse, Linux non : Vercel et GitHub Actions
// compilent sur Linux, ou "./fr/nav" ne resout pas "Nav.ts".
// Noter "Whyhednai" avec un h minuscule au milieu : c'est le nom reel du fichier.
import { nav } from "./fr/Nav";
import { hero } from "./fr/Hero";
import { services } from "./fr/Services";
import { portfolio, portfolioRecruiter } from "./fr/Portfolio";
import { contact } from "./fr/Contact";
import { common } from "./fr/Common";
import { whyHednai } from "./fr/Whyhednai";
import { about } from "./fr/About";
import { testimonials } from "./fr/Testimonials";
import { cta, ctaRecruiter } from "./fr/Cta";
import { blog } from "./fr/Blog";
import { solutions } from "./fr/Solutions";
import { recruiter, profile, whyRecruiter, profileCv } from "./fr/Recruiter";
import { dashboard } from "./fr/Dashboard";
import { cv } from "./fr/Cv";
import { legal } from "./fr/Legal";

export const fr: Record<string, string> = {
  ...nav,
  ...hero,
  ...services,
  ...portfolio,
  ...contact,
  ...common,
  ...whyHednai,
  ...about,
  ...testimonials,
  ...cta,
  ...blog,
  ...solutions,
  ...recruiter,
  ...profile,
  ...whyRecruiter,
  ...profileCv,
  ...dashboard,
  ...cv,
  ...portfolioRecruiter,
  ...ctaRecruiter,
  ...legal,
};

// Type derive automatiquement des cles du fichier francais
// Utilise dans LanguageContext.tsx pour empecher les fautes de frappe
// Si tu ajoutes une cle ici, elle sera automatiquement disponible partout
export type TranslationKey = keyof typeof fr;