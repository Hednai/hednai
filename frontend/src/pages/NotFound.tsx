// ============================================
// pages/NotFound.tsx
// Page 404 — affichee quand l'URL ne correspond a aucune route
// Accessible via la route catch-all <Route path="*" />
// ============================================
import { Link } from "react-router-dom";
import { Anchor, ArrowLeft } from "lucide-react";
import { Seo } from "../components/Seo";
import { useLanguage } from "../i18n/useLanguage";
import "./NotFound.css";

export function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="not-found">
      {/* Page d'erreur : exclue de l'index Google */}
      <Seo title={`404 | Hednai`} description={t("notFound.message")} noIndex />

      <div className="not-found__inner">
        {/* Icone ancre maritime pour rester dans le theme */}
        <Anchor size={64} strokeWidth={1} className="not-found__icon" />

        {/* Code d'erreur */}
        <h1 className="not-found__code">404</h1>

        {/* Message d'explication */}
        <p className="not-found__text">{t("notFound.message")}</p>

        {/* Bouton pour retourner a l'accueil */}
        <Link to="/" className="btn btn--primary not-found__btn">
          <ArrowLeft size={18} />
          {t("notFound.back")}
        </Link>
      </div>
    </div>
  );
}