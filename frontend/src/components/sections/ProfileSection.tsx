// ============================================
// components/sections/ProfileSection.tsx
// Section profil recruteur — photo pro + timeline parcours
// Visible uniquement en mode recruteur (remplace About+Roadmap visuellement)
// Raconte l'histoire : Marine → Dev → Full Stack → IA → HEDNAI
// ============================================
import { useState } from "react";
import { Anchor, GraduationCap, Code, Brain, Rocket, FileText, ArrowUp } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FadeIn } from "../FadeIn";
import { CvInline } from "./CvInline";
import { useLanguage } from "../../i18n/useLanguage";
import "./ProfileSection.css";

// Etapes du parcours — chaque etape a une icone, une periode et un texte i18n
const TIMELINE_STEPS = [
  { icon: Anchor, periodKey: "profile.step1.period", titleKey: "profile.step1.title", descKey: "profile.step1.desc" },
  { icon: GraduationCap, periodKey: "profile.step2.period", titleKey: "profile.step2.title", descKey: "profile.step2.desc" },
  { icon: Code, periodKey: "profile.step3.period", titleKey: "profile.step3.title", descKey: "profile.step3.desc" },
  { icon: Brain, periodKey: "profile.step4.period", titleKey: "profile.step4.title", descKey: "profile.step4.desc" },
  { icon: Rocket, periodKey: "profile.step5.period", titleKey: "profile.step5.title", descKey: "profile.step5.desc" },
];

export function ProfileSection() {
  const { t } = useLanguage();
  const [showCv, setShowCv] = useState(false);

  // Fermer le CV et remonter vers la section profil
  const closeCv = () => {
    setShowCv(false);
    setTimeout(() => {
      const el = document.getElementById("profil");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <SectionWrapper id="profil" title={t("profile.title")} subtitle={t("profile.subtitle")}>
      <div className="profile">
        {/* Photo professionnelle */}
        <FadeIn>
          <div className="profile__photo-wrapper">
            <img
              src="/photo-daren.jpg"
              alt={t("profile.photo.alt")}
              className="profile__photo"
              loading="lazy"
            />
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

      {/* Bouton pour afficher/masquer le CV complet */}
      <div className="profile__cv-toggle">
        {!showCv ? (
          <FadeIn>
            <button className="btn btn--secondary profile__cv-btn" onClick={() => setShowCv(true)}>
              <FileText size={18} />
              {t("profile.showCv")}
            </button>
          </FadeIn>
        ) : (
          <>
            {/* CV inline deploye */}
            <CvInline />

            {/* Bouton retour pour fermer le CV */}
            <button className="btn btn--secondary profile__cv-btn profile__cv-btn--close" onClick={closeCv}>
              <ArrowUp size={18} />
              {t("profile.hideCv")}
            </button>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}