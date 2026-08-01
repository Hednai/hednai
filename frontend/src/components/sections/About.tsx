// ============================================
// components/sections/About.tsx
// Section A propos — Timeline du parcours personnel
// Marine → Formation dev → Startup IA
// Sert le double objectif : recruteur (parcours) + client (credibilite)
// ============================================
import { Anchor, GraduationCap, Rocket } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/LanguageContext";
import "./About.css";

// Etapes de la timeline — chaque etape a une icone, une periode et un texte
const TIMELINE_STEPS = [
  {
    icon: Anchor,
    periodKey: "about.step1.period",
    titleKey: "about.step1.title",
    descKey: "about.step1.desc",
  },
  {
    icon: GraduationCap,
    periodKey: "about.step2.period",
    titleKey: "about.step2.title",
    descKey: "about.step2.desc",
  },
  {
    icon: Rocket,
    periodKey: "about.step3.period",
    titleKey: "about.step3.title",
    descKey: "about.step3.desc",
  },
];

export function About() {
  const { t } = useLanguage();

  return (
    <SectionWrapper
      id="apropos"
      title={t("about.title")}
      subtitle={t("about.subtitle")}
      gray
    >
      {/* Introduction personnelle */}
      <p className="about__intro">{t("about.intro")}</p>

      {/* Timeline en 3 etapes */}
      <div className="about-timeline">
        {TIMELINE_STEPS.map((step, index) => {
          const Icon = step.icon;

          return (
            <FadeIn key={step.titleKey} delay={index * 0.15}>
              <div className="timeline-step">
                {/* Marqueur : icone + ligne de connexion */}
                <div className="timeline-step__marker">
                  <div className="timeline-step__icon">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  {/* Ligne entre les etapes (sauf la derniere) */}
                  {index < TIMELINE_STEPS.length - 1 && (
                    <div className="timeline-step__line" />
                  )}
                </div>

                {/* Contenu texte */}
                <div className="timeline-step__content">
                  <span className="timeline-step__period">
                    {t(step.periodKey)}
                  </span>
                  <h3>{t(step.titleKey)}</h3>
                  <p>{t(step.descKey)}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}