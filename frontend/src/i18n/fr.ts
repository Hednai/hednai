// ============================================
// i18n/fr.ts — Assemblage des traductions francaises
// Chaque module correspond a une section ou une page du site
// Pour ajouter des traductions, modifier le fichier du module concerne dans fr/
// ============================================
import { nav } from "./fr/Nav.ts";
import { hero } from "./fr/hero";
import { services } from "./fr/services";
import { portfolio, portfolioRecruiter } from "./fr/portfolio";
import { contact } from "./fr/contact";
import { common } from "./fr/common";
import { whyHednai } from "./fr/whyHednai";
import { about } from "./fr/About.ts";
import { roadmap } from "./fr/roadmap";
import { testimonials } from "./fr/testimonials";
import { cta, ctaRecruiter } from "./fr/cta";
import { blog } from "./fr/blog";
import { solutions } from "./fr/solutions";
import { recruiter, profile, whyRecruiter, profileCv } from "./fr/recruiter";
import { dashboard } from "./fr/dashboard";
import { cv } from "./fr/Cv";

export const fr: Record<string, string> = {
  ...nav,
  ...hero,
  ...services,
  ...portfolio,
  ...contact,
  ...common,
  ...whyHednai,
  ...about,
  ...roadmap,
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
};

// Type derive automatiquement des cles du fichier francais
// Utilise dans LanguageContext.tsx pour empecher les fautes de frappe
// Si tu ajoutes une cle ici, elle sera automatiquement disponible partout
export type TranslationKey = keyof typeof fr;