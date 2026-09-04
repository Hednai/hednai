// ============================================
// config/constants.ts
// Constantes partagees du backend.
//
// Pourquoi ce fichier : app.ts contenait des valeurs magiques en dur
// ("10kb", 15 * 60 * 1000 ecrit deux fois, 10, 30) et dashboard.controller.ts
// une limite de pagination non bornee. Une valeur ecrite a deux endroits
// finit toujours par diverger.
// Meme pattern que src/config/constants.js de Karibou Market.
// ============================================

// ---- Limitation du debit (rate limiting) ----
export const RATE_LIMIT = {
  // Fenetre glissante commune a toutes les limites : 15 minutes
  FENETRE_MS: 15 * 60 * 1000,

  // Formulaire de contact public : 10 envois par fenetre et par IP
  CONTACT_MAX: 10,

  // Routes admin du dashboard : 30 requetes par fenetre et par IP
  ADMIN_MAX: 30,
} as const;

// ---- Pagination ----
export const PAGINATION = {
  // Nombre d'elements par page quand le client n'en demande pas
  LIMITE_DEFAUT: 10,

  // Plafond dur : sans lui, ?limit=999999 chargeait toute la table en memoire
  // (OWASP API4:2023 — Unrestricted Resource Consumption)
  LIMITE_MAX: 100,
} as const;

// ---- Requetes HTTP entrantes ----
export const REQUETE = {
  // Taille maximale d'un corps JSON accepte par Express
  TAILLE_MAX_JSON: "10kb",
} as const;