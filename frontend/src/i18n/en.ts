// ============================================
// i18n/en.ts — English translations assembly
// Each module corresponds to a section or page of the site
// To add translations, edit the relevant module file in en/
// ============================================
import { nav } from "./en/nav";
import { hero } from "./en/hero";
import { services } from "./en/services";
import { portfolio, portfolioRecruiter } from "./en/portfolio";
import { contact } from "./en/contact";
import { common } from "./en/common";
import { whyHednai } from "./en/whyHednai";
import { about } from "./en/about";
import { testimonials } from "./en/testimonials";
import { cta, ctaRecruiter } from "./en/cta";
import { blog } from "./en/blog";
import { solutions } from "./en/solutions";
import { recruiter, profile, whyRecruiter, profileCv } from "./en/recruiter";
import { dashboard } from "./en/dashboard";
import { cv } from "./en/Cv";
import { legal } from "./en/Legal";

export const en: Record<string, string> = {
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