// ============================================
// components/sections/Hero.tsx
// Section d'introduction en haut de la page
// ============================================
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { RadarAnimation } from "../RadarAnimation";
import { AvailabilityBadge } from "../AvailabilityBadge";
import { useLanguage } from "../../i18n/useLanguage";
import { useViewMode } from "../../context/useViewMode";
import "./Hero.css";

export function Hero() {
  const { t } = useLanguage();
  const { isRecruiter } = useViewMode();

  return (
    <section className="hero" id="accueil">
      {/* Conteneur en 2 colonnes : texte a gauche, radar a droite */}
      <div className="hero__inner">
        <div className="hero__content">
          <AvailabilityBadge />

          {/* Signature de marque — toujours visible, independante du mode */}
          {/* Tagline retiree du Hero — deja presente sous le logo */}

          <h1>{isRecruiter ? t("hero.title.recruiter") : t("hero.title")}</h1>

          {/* Accroche courte selon le mode — juste sous le titre */}
          <p className="hero__punchline">
            {isRecruiter ? t("hero.punchline.recruiter") : t("hero.punchline.client")}
          </p>

          <p>{isRecruiter ? t("hero.subtitle.recruiter") : t("hero.subtitle")}</p>

          <div className="hero__buttons">
            {isRecruiter ? (
              <>
                <Button href="/recruiter">
                  {t("hero.cta1.recruiter")} <ArrowRight size={18} />
                </Button>
                <Button href="#portfolio" variant="secondary">
                  {t("hero.cta2.recruiter")}
                </Button>
              </>
            ) : (
              <>
                <Button href="#contact">
                  {t("hero.cta1")} <ArrowRight size={18} />
                </Button>
                <Button href="#services" variant="secondary">
                  {t("hero.cta2")}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Le radar sonar affiche a droite du texte */}
        <div className="hero__radar">
          <RadarAnimation />
        </div>
      </div>
    </section>
  );
}