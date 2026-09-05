// ============================================
// config/constants.ts
// Constantes partagees du backend : limites de debit, pagination,
// taille des requetes et delais des services externes.
// Source unique de verite, aucune de ces valeurs n'est ecrite ailleurs.
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

// ---- Services externes optionnels (mail, Discord) ----
export const NOTIFICATION = {
  // Delai au-dela duquel un appel sortant est abandonne (millisecondes).
  // Ces notifications sont accessoires : elles ne doivent jamais retarder
  // la reponse envoyee au visiteur.
  TIMEOUT_MS: 5000,
} as const;

// ---- Arret du serveur ----
export const ARRET = {
  // Delai laisse aux requetes en cours avant l'arret force (millisecondes)
  DELAI_MAX_MS: 10000,
} as const;
