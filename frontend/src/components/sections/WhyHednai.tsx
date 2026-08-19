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
import { useLanguage } from "../../i18n/useLanguage";
import { useViewMode } from "../../context/useViewMode";
import "./WhyHednai.css";

// Donnees des piliers — mode client (mission, vision, valeurs, avantage)
const PILLARS_CLIENT = [
  { icon: Target, titleKey: "why.mission.title", descKey: "why.mission.desc" },
  { icon: Eye, titleKey: "why.vision.title", descKey: "why.vision.desc" },
  { icon: Heart, titleKey: "why.values.title", descKey: "why.values.desc" },
  { icon: Zap, titleKey: "why.edge.title", descKey: "why.edge.desc" },
];

// Donnees des piliers — mode recruteur (ce qui me differencie)
const PILLARS_RECRUITER = [
  { icon: Target, titleKey: "why.mission.title.recruiter", descKey: "why.mission.desc.recruiter" },
  { icon: Eye, titleKey: "why.vision.title.recruiter", descKey: "why.vision.desc.recruiter" },
  { icon: Heart, titleKey: "why.values.title.recruiter", descKey: "why.values.desc.recruiter" },
  { icon: Zap, titleKey: "why.edge.title.recruiter", descKey: "why.edge.desc.recruiter" },
];

export function WhyHednai() {
  const { t } = useLanguage();
  const { isRecruiter } = useViewMode();

  // Selectionner les piliers et les textes selon le mode
  const pillars = isRecruiter ? PILLARS_RECRUITER : PILLARS_CLIENT;

  return (
    <SectionWrapper
      id="pourquoi"
      title={isRecruiter ? t("why.title.recruiter") : t("why.title")}
      subtitle={isRecruiter ? t("why.subtitle.recruiter") : t("why.subtitle")}
    >
      <div className="why-grid">
        {pillars.map((pillar, index) => {
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