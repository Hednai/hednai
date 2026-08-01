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