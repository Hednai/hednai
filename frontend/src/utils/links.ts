// ============================================
// utils/links.ts
// Etat des liens externes d'un projet (site en ligne, depot de code)
// Un projet dont le lien n'existe pas encore porte le marqueur UNAVAILABLE_URL
// ============================================

// Marqueur utilise dans data/projects.ts pour un lien non encore publie
export const UNAVAILABLE_URL = "#";

// Un lien est exploitable seulement s'il est renseigne et different du marqueur
export function isLinkAvailable(url: string): boolean {
  const value = url.trim();
  return value !== "" && value !== UNAVAILABLE_URL;
}