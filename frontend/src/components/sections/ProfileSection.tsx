// ============================================
// components/sections/ProfileSection.tsx
// Section profil recruteur - photo pro + timeline parcours
// Visible uniquement en mode recruteur (remplace About+Roadmap visuellement)
// Raconte l'histoire : Marine > Dev > Full Stack > IA > HEDNAI
// ============================================
import { Link } from "react-router-dom";
import { Anchor, GraduationCap, Code, Brain, Rocket, Briefcase } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import "./ProfileSection.css";

// Etapes du parcours - ordre antechronologique (plus recent en haut)
const TIMELINE_STEPS = [
  { icon: Brain, periodKey: "profile.step4.period", titleKey: "profile.step4.title", descKey: "profile.step4.desc" },
  { icon: Rocket, periodKey: "profile.step5.period", titleKey: "profile.step5.title", descKey: "profile.step5.desc" },
  { icon: Code, periodKey: "profile.step3.period", titleKey: "profile.step3.title", descKey: "profile.step3.desc" },
  { icon: GraduationCap, periodKey: "profile.step2.period", titleKey: "profile.step2.title", descKey: "profile.step2.desc" },
  { icon: Anchor, periodKey: "profile.step1.period", titleKey: "profile.step1.title", descKey: "profile.step1.desc" },
];

export function ProfileSection() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="apropos" title={t("profile.title")} subtitle={t("profile.subtitle")}>
      <div className="profile">
        {/* Photo professionnelle */}
        <FadeIn>
          <div className="profile__photo-wrapper">
            <div className="profile__photo-inner">
              <img
                src="/photo-daren.webp"
                alt={t("profile.photo.alt")}
                className="profile__photo"
                loading="lazy"
              />
            </div>
            <p className="profile__photo-caption">{t("profile.photo.caption")}</p>
          </div>
        </FadeIn>

        {/* Timeline du parcours */}
        <div className="profile__timeline">
          {TIMELINE_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <FadeIn key={step.titleKey} delay={index * 0.1}>
                <div className="profile__step">
                  {/* Ligne verticale + icone */}
                  <div className="profile__step-marker">
                    <div className="profile__step-icon">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    {index < TIMELINE_STEPS.length - 1 && (
                      <div className="profile__step-line" />
                    )}
                  </div>

                  {/* Contenu de l'etape */}
                  <div className="profile__step-content">
                    <span className="profile__step-period">{t(step.periodKey)}</span>
                    <h3 className="profile__step-title">{t(step.titleKey)}</h3>
                    <p className="profile__step-desc">{t(step.descKey)}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Transition vers le CV */}
      <div className="profile__cv-toggle">
        <FadeIn>
          <div className="profile__next">
            <h3 className="profile__next-title">{t("profile.next.title")}</h3>
            <p className="profile__next-text">{t("profile.next.text")}</p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="profile__cv-buttons">
            <Link to="/cv" className="btn btn--primary profile__cv-btn">
              <Briefcase size={18} />
              {t("cv.tab.fullstack")}
            </Link>
            <Link to="/cv?tab=captain" className="btn btn--secondary profile__cv-btn">
              <Anchor size={18} />
              {t("cv.tab.captain")}
            </Link>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}