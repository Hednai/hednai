// ============================================
// data/navLinks.ts
// Liens de navigation externalises
// Chaque lien pointe vers une section de la page (ancre #)
// icon : nom de l'icone Lucide a afficher a cote du texte
// ============================================
import type { NavLink } from "../types";

export const NAV_LINKS: NavLink[] = [
  { key: "home", href: "#accueil", labelKey: "nav.home", icon: "Home" },
  { key: "why", href: "#pourquoi", labelKey: "nav.why", icon: "Target" },
  { key: "about", href: "#apropos", labelKey: "nav.about", icon: "User" },
  { key: "services", href: "#services", labelKey: "nav.services", icon: "LayoutGrid" },
  { key: "portfolio", href: "#portfolio", labelKey: "nav.portfolio", icon: "Briefcase" },
  { key: "contact", href: "#contact", labelKey: "nav.contact", icon: "Mail" },
];