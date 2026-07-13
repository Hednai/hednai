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
    phone: "+33 1 23 45 67 89",
    location: "France",
  },

  // Liens reseaux sociaux
  socials: {
    github: "https://github.com/Darenmcs",
    linkedin: "https://linkedin.com/in/tonprofil",
  },

  // API backend
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  },

  // Meta SEO
  meta: {
    title: "Hednai — Solutions Digitales Maritime & IA",
    description:
      "Developpeur freelance specialise en applications maritimes, web et IA.",
    url: "https://hednai.com",
    image: "https://hednai.com/og-image.png",
  },
} as const;