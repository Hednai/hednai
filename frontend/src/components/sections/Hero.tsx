// ============================================
// components/sections/Hero.tsx
// Section d'introduction en haut de la page
// ============================================
import { Anchor, Code, Brain, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { RadarAnimation } from "../RadarAnimation";
import { useLanguage } from "../../i18n/LanguageContext";
import "./Hero.css";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="accueil">
      {/* Conteneur en 2 colonnes : texte a gauche, radar a droite */}
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__icons">
            <Anchor size={32} strokeWidth={1.5} />
            <Code size={32} strokeWidth={1.5} />
            <Brain size={32} strokeWidth={1.5} />
          </div>

          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>

          <div className="hero__buttons">
            <Button href="#contact">
              {t("hero.cta1")} <ArrowRight size={18} />
            </Button>
            <Button href="#services" variant="secondary">
              {t("hero.cta2")}
            </Button>
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