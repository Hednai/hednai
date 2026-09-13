// ============================================
// config/site.ts
// Configuration centralisee du site
// Toutes les infos de contact, liens sociaux, meta SEO
// Un seul endroit a modifier si quelque chose change
// ============================================

export const SITE_CONFIG = {
  // Informations de contact
  contact: {
    email: "contact@hednai.com",
    phone: "+225 01 02 91 90 65",
    location: "Canada",
    // Numero WhatsApp Business, sans le "+" (format attendu par wa.me)
    whatsappNumber: "2250102919065",
  },

  // Liens reseaux sociaux
  socials: {
    github: "https://github.com/Hednai",
    linkedin: "https://www.linkedin.com/in/hednai",
  },

  // Depot public du site et licence du code source.
  // Un seul endroit a modifier si le depot change de nom ou d'organisation.
  repository: {
    url: "https://github.com/Hednai/hednai",
    licenseName: "MIT",
    licenseUrl: "https://github.com/Hednai/hednai/blob/main/LICENSE",
  },

  // API backend
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
    // Plafond de duree d'un appel API, en millisecondes
    timeoutMs: 15000,
  },

  // Regles de validation du formulaire de contact.
  // Ces bornes doivent rester alignees sur le schema Zod du backend
  // (backend/src/features/contact/contact.validation.ts).
  formulaire: {
    nomMin: 2,
    nomMax: 100,
    sujetMin: 2,
    sujetMax: 200,
    messageMin: 10,
    messageMax: 2000,
    // Delai avant l'ouverture de WhatsApp apres un envoi reussi (ms)
    delaiWhatsappMs: 800,
  },

  // Calendrier de prise de rendez-vous (Cal.com)
  calendar: {
    url: "https://cal.com/hednai-gekyal/15min",
  },

  // Devise pour le calculateur de devis
  currency: {
    symbol: "$",
    code: "CAD",
  },

  // Meta SEO
  meta: {
    title: "Hednai | Maritime Software & AI",
    description:
      "Developpeur freelance specialise en applications maritimes, web et IA.",
    url: "https://hednai.com",
    image: "https://hednai.com/og-image.png",
  },
} as const;