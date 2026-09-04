// ============================================
// i18n/en.ts — English translations assembly
// Each module corresponds to a section or page of the site
// To add translations, edit the relevant module file in en/
// ============================================
// Meme regle que fr.ts : la casse doit correspondre au nom reel du fichier,
// sous peine d'echec du build sur Linux (Vercel, GitHub Actions).
import { nav } from "./en/Nav";
import { hero } from "./en/Hero";
import { services } from "./en/Services";
import { portfolio, portfolioRecruiter } from "./en/Portfolio";
import { contact } from "./en/Contact";
import { common } from "./en/Common";
import { whyHednai } from "./en/Whyhednai";
import { about } from "./en/About";
import { testimonials } from "./en/Testimonials";
import { cta, ctaRecruiter } from "./en/Cta";
import { blog } from "./en/Blog";
import { solutions } from "./en/Solutions";
import { recruiter, profile, whyRecruiter, profileCv } from "./en/Recruiter";
import { dashboard } from "./en/Dashboard";
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