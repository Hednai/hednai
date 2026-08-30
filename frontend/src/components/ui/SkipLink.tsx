// ============================================
// components/ui/SkipLink.tsx
// Lien "Aller au contenu principal" pour l'accessibilite clavier
// Source : WCAG 2.4.1 — Bypass Blocks (Level A)
// ============================================
import "./SkipLink.css";

export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Aller au contenu principal
    </a>
  );
}