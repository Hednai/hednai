// ============================================
// components/sections/About.tsx
// Section À propos avec onglets : Mon parcours + Feuille de route
// Fusionne About et Roadmap en une seule section a onglets
// Mode client uniquement (masque en mode recruteur via Home.tsx)
// ============================================
import { useState } from "react";
import { Anchor, GraduationCap, Rocket, Check, Loader, Clock } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import "./About.css";
import "./Roadmap.css";

// Etapes de la timeline parcours
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

// Types de statut pour chaque etape de la roadmap
type MilestoneStatus = "done" | "current" | "planned";

// Structure d'une etape de la roadmap
interface Milestone {
  year: string;
  titleKey: string;
  descKey: string;
  status: MilestoneStatus;
}

// Donnees de la roadmap
const MILESTONES: Milestone[] = [
  { year: "2025", titleKey: "roadmap.m1.title", descKey: "roadmap.m1.desc", status: "done" },
  { year: "2025", titleKey: "roadmap.m2.title", descKey: "roadmap.m2.desc", status: "done" },
  { year: "2025 – 2026", titleKey: "roadmap.m3.title", descKey: "roadmap.m3.desc", status: "current" },
  { year: "Sept. 2026", titleKey: "roadmap.m4.title", descKey: "roadmap.m4.desc", status: "planned" },
  { year: "2027+", titleKey: "roadmap.m5.title", descKey: "roadmap.m5.desc", status: "planned" },
  { year: "À venir", titleKey: "roadmap.m6.title", descKey: "roadmap.m6.desc", status: "planned" },
];

// Icone selon le statut de la roadmap
const STATUS_ICON: Record<MilestoneStatus, React.ReactNode> = {
  done: <Check size={16} />,
  current: <Loader size={16} />,
  planned: <Clock size={16} />,
};

// Identifiants des onglets
type TabId = "parcours" | "roadmap";

export function About() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>("parcours");

  return (
    <SectionWrapper
      id="apropos"
      title={t("about.title")}
      subtitle={t("about.subtitle")}
      gray
    >
      {/* Introduction personnelle */}
      <p className="about__intro">{t("about.intro")}</p>

      {/* Onglets Mon parcours / Feuille de route */}
      <div className="about-tabs">
        <button
          className={`about-tabs__btn ${activeTab === "parcours" ? "about-tabs__btn--active" : ""}`}
          onClick={() => setActiveTab("parcours")}
          type="button"
        >
          {t("about.tab.parcours")}
        </button>
        <button
          className={`about-tabs__btn ${activeTab === "roadmap" ? "about-tabs__btn--active" : ""}`}
          onClick={() => setActiveTab("roadmap")}
          type="button"
        >
          {t("about.tab.roadmap")}
        </button>
      </div>

      {/* Contenu de l'onglet Mon parcours */}
      {activeTab === "parcours" && (
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
      )}

      {/* Contenu de l'onglet Feuille de route */}
      {activeTab === "roadmap" && (
        <div className="roadmap">
          {MILESTONES.map((milestone, index) => (
            <FadeIn key={milestone.titleKey} delay={index * 0.1}>
              <div className={`roadmap__item roadmap__item--${milestone.status}`}>
                {/* Marqueur de statut */}
                <div className="roadmap__marker">
                  <div className="roadmap__icon">
                    {STATUS_ICON[milestone.status]}
                  </div>
                  {index < MILESTONES.length - 1 && (
                    <div className="roadmap__line" />
                  )}
                </div>
                {/* Contenu */}
                <div className="roadmap__content">
                  <span className="roadmap__year">{milestone.year}</span>
                  <h3>{t(milestone.titleKey)}</h3>
                  <p>{t(milestone.descKey)}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}