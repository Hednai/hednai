// ============================================
// components/sections/CtaBanner.tsx
// Bandeau double CTA — cote client maritime + cote recruteur
// Positionne juste avant le Footer dans Home.tsx
// Repond au probleme : le visiteur doit savoir quoi faire ensuite
// ============================================
import { Ship, FileUser } from "lucide-react";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import "./CtaBanner.css";

export function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-banner__grid">
          {/* Cote client maritime */}
          <FadeIn delay={0}>
            <div className="cta-banner__card cta-banner__card--client">
              <Ship size={32} strokeWidth={1.5} />
              <h3>{t("cta.client.title")}</h3>
              <p>{t("cta.client.desc")}</p>
              <a href="#contact" className="btn btn--primary">
                {t("cta.client.btn")}
              </a>
            </div>
          </FadeIn>

          {/* Cote recruteur */}
          <FadeIn delay={0.15}>
            <div className="cta-banner__card cta-banner__card--recruiter">
              <FileUser size={32} strokeWidth={1.5} />
              <h3>{t("cta.recruiter.title")}</h3>
              <p>{t("cta.recruiter.desc")}</p>
              <a href="#contact" className="btn btn--secondary">
                {t("cta.recruiter.btn")}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}