// ============================================
// components/Breadcrumb.tsx
// Fil d'Ariane — affiché sur les pages intérieures (/blog, /solutions, /recruiter)
// Aide le visiteur à se repérer et à revenir en arrière
// ============================================
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "../i18n/useLanguage";
import "./Breadcrumb.css";

// Table de correspondance entre les segments d'URL et les clés i18n
const SEGMENT_LABELS: Record<string, string> = {
  blog: "nav.blog",
  solutions: "breadcrumb.solutions",
  recruiter: "breadcrumb.recruiter",
};

export function Breadcrumb() {
  const { t } = useLanguage();
  const location = useLocation();

  // Decouper l'URL en segments (ex: /blog/mon-article → ["blog", "mon-article"])
  const segments = location.pathname.split("/").filter(Boolean);

  // Ne pas afficher sur la page d'accueil
  if (segments.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Fil d'Ariane">
      {/* Lien vers l'accueil */}
      <Link to="/" className="breadcrumb__link">
        <Home size={14} />
        <span>{t("nav.home")}</span>
      </Link>

      {/* Chaque segment de l'URL */}
      {segments.map((segment, index) => {
        // Construire le chemin cumulatif (ex: /blog, /blog/mon-article)
        const path = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        // Chercher un label i18n, sinon utiliser le segment tel quel
        const labelKey = SEGMENT_LABELS[segment];
        const label = labelKey ? t(labelKey) : decodeURIComponent(segment);

        return (
          <span key={path} className="breadcrumb__item">
            <ChevronRight size={14} className="breadcrumb__sep" />
            {isLast ? (
              <span className="breadcrumb__current" aria-current="page">{label}</span>
            ) : (
              <Link to={path} className="breadcrumb__link">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}