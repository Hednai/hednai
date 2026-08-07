// ============================================
// pages/Solutions.tsx
// Page dediee aux solutions Hednai
// Chaque solution : probleme → solution → benefices → public
// Accessible via /solutions
// ============================================
import { Link } from "react-router-dom";
import { ArrowRight, Ship, Anchor, ClipboardCheck, Brain } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Card } from "../components/ui/Card";
import { FadeIn } from "../components/FadeIn";
import { useLanguage } from "../i18n/useLanguage";
import { solutions } from "../data/solutions";
import "./Solutions.css";

// Table des icones pour le rendu dynamique
const iconMap: Record<string, React.ElementType> = {
  Ship, Anchor, ClipboardCheck, Brain,
};

export function Solutions() {
  const { t } = useLanguage();

  return (
    <div className="solutions-page">
      <Helmet>
        <title>{t("solutions.seo.title")}</title>
        <meta name="description" content={t("solutions.seo.desc")} />
      </Helmet>

      <div className="container">
        {/* En-tete */}
        <div className="solutions-page__header">
          <h1>{t("solutions.page.title")}</h1>
          <p>{t("solutions.page.subtitle")}</p>
        </div>

        {/* Liste des solutions */}
        <div className="solutions-page__list">
          {solutions.map((sol, index) => {
            const Icon = iconMap[sol.iconName] || Ship;

            return (
              <FadeIn key={sol.id} delay={index * 0.1}>
                <Card>
                  <div className="solution-detail">
                    {/* En-tete de la solution */}
                    <div className="solution-detail__header">
                      <div className="solution-detail__icon">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h2>{t(sol.titleKey)}</h2>
                        {/* Badge de statut */}
                        <span className={`solution-detail__status solution-detail__status--${sol.status}`}>
                          {t(`solutions.status.${sol.status}`)}
                        </span>
                      </div>
                    </div>

                    {/* Probleme */}
                    <div className="solution-detail__section">
                      <h4>{t("solutions.label.problem")}</h4>
                      <p>{t(sol.problemKey)}</p>
                    </div>

                    {/* Solution */}
                    <div className="solution-detail__section">
                      <h4>{t("solutions.label.solution")}</h4>
                      <p>{t(sol.solutionKey)}</p>
                    </div>

                    {/* Benefices */}
                    <div className="solution-detail__section">
                      <h4>{t("solutions.label.benefits")}</h4>
                      <ul>
                        {sol.benefitsKeys.map((bKey) => (
                          <li key={bKey}>{t(bKey)}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Public cible */}
                    <div className="solution-detail__section">
                      <h4>{t("solutions.label.audience")}</h4>
                      <p>{t(sol.audienceKey)}</p>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA en bas */}
        <div className="solutions-page__cta">
          <Link to="/#contact" className="btn btn--primary">
            {t("solutions.cta")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}