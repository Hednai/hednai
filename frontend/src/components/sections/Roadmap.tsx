// ============================================
// components/sections/Roadmap.tsx
// Roadmap publique — montre ou va Hednai
// Les visiteurs et investisseurs adorent voir une vision
// Chaque etape a un statut (fait, en cours, prevu)
// ============================================
import { Check, Loader, Clock } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import "./Roadmap.css";

// Types de statut pour chaque etape
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
  { year: "2025", titleKey: "roadmap.m3.title", descKey: "roadmap.m3.desc", status: "current" },
  { year: "2026", titleKey: "roadmap.m4.title", descKey: "roadmap.m4.desc", status: "planned" },
  { year: "2026", titleKey: "roadmap.m5.title", descKey: "roadmap.m5.desc", status: "planned" },
  { year: "2027", titleKey: "roadmap.m6.title", descKey: "roadmap.m6.desc", status: "planned" },
];

// Icone selon le statut
const STATUS_ICON: Record<MilestoneStatus, React.ReactNode> = {
  done: <Check size={16} />,
  current: <Loader size={16} />,
  planned: <Clock size={16} />,
};

export function Roadmap() {
  const { t } = useLanguage();

  return (
    <SectionWrapper
      id="roadmap"
      title={t("roadmap.title")}
      subtitle={t("roadmap.subtitle")}
    >
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
    </SectionWrapper>
  );
}