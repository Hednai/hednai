// ============================================
// components/sections/WhyHednai.tsx
// Section identite startup — Mission, Vision, Valeurs, Avantage
// Positionnee entre le Hero et la section A propos
// Repond aux questions : pourquoi Hednai existe, pourquoi maintenant
// ============================================
import { Target, Eye, Heart, Zap } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/LanguageContext";
import "./WhyHednai.css";

// Donnees des piliers (mission, vision, valeurs, avantage)
// Chaque pilier a une icone, un titre et une description via i18n
const PILLARS = [
  { icon: Target, titleKey: "why.mission.title", descKey: "why.mission.desc" },
  { icon: Eye, titleKey: "why.vision.title", descKey: "why.vision.desc" },
  { icon: Heart, titleKey: "why.values.title", descKey: "why.values.desc" },
  { icon: Zap, titleKey: "why.edge.title", descKey: "why.edge.desc" },
];

export function WhyHednai() {
  const { t } = useLanguage();

  return (
    <SectionWrapper
      id="pourquoi"
      title={t("why.title")}
      subtitle={t("why.subtitle")}
    >
      <div className="why-grid">
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;

          return (
            <FadeIn key={pillar.titleKey} delay={index * 0.1}>
              <Card>
                <div className="why-pillar">
                  <div className="why-pillar__icon">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3>{t(pillar.titleKey)}</h3>
                  <p>{t(pillar.descKey)}</p>
                </div>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}