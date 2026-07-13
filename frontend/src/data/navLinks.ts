// ============================================
// data/navLinks.ts
// Liens de navigation externalises
// Chaque lien pointe vers une section de la page (ancre #)
// ============================================
import type { NavLink } from "../types";

export const NAV_LINKS: NavLink[] = [
  { key: "home", href: "#accueil", labelKey: "nav.home" },
  { key: "services", href: "#services", labelKey: "nav.services" },
  { key: "portfolio", href: "#portfolio", labelKey: "nav.portfolio" },
  { key: "contact", href: "#contact", labelKey: "nav.contact" },
];