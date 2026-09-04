// ============================================
// components/sections/About.tsx
// Section A propos avec cartes expandables en overlay
// Deux cartes : Mon parcours + Feuille de route
// Animation framer-motion (layoutId + AnimatePresence)
// Mode client uniquement (masque en mode recruteur via Home.tsx)
// ============================================
import { useCallback, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Anchor, GraduationCap, Rocket, Check, Loader, Clock, Compass, X } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useLanguage } from "../../i18n/useLanguage";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useEscapeKey } from "../../hooks/useEscapeKey";
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

// Donnees de la roadmap — 5 etapes, year vide = affiche t("roadmap.planned")
const MILESTONES: Milestone[] = [
  { year: "2025", titleKey: "roadmap.m1.title", descKey: "roadmap.m1.desc", status: "done" },
  { year: "2025 – 2026", titleKey: "roadmap.m2.title", descKey: "roadmap.m2.desc", status: "done" },
  { year: "SEPT. 2026", titleKey: "roadmap.m3.title", descKey: "roadmap.m3.desc", status: "current" },
  { year: "", titleKey: "roadmap.m4.title", descKey: "roadmap.m4.desc", status: "planned" },
  { year: "", titleKey: "roadmap.m5.title", descKey: "roadmap.m5.desc", status: "planned" },
];

// Icone selon le statut de la roadmap
const STATUS_ICON: Record<MilestoneStatus, React.ReactNode> = {
  done: <Check size={16} />,
  current: <Loader size={16} />,
  planned: <Clock size={16} />,
};

// Definition des deux cartes expandables
interface AboutCard {
  id: string;
  titleKey: string;
  descKey: string;
  icon: React.ElementType;
}

const ABOUT_CARDS: AboutCard[] = [
  {
    id: "parcours",
    titleKey: "about.tab.parcours",
    descKey: "about.subtitle",
    icon: Anchor,
  },
  {
    id: "roadmap",
    titleKey: "about.tab.roadmap",
    descKey: "roadmap.subtitle",
    icon: Compass,
  },
];

export function About() {
  const { t } = useLanguage();
  const [activeCard, setActiveCard] = useState<AboutCard | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Fermeture avec Escape (hook partage)
  useEscapeKey(useCallback(() => setActiveCard(null), []));

  // Blocage du scroll pendant l'ouverture (hook partage a compteur)
  useBodyScrollLock(activeCard !== null);

  // Fermeture au clic exterieur
  useOutsideClick(overlayRef, () => setActiveCard(null));

  return (
    <SectionWrapper
      id="apropos"
      title={t("about.title")}
      subtitle={t("about.subtitle")}
      gray
    >
      {/* Introduction personnelle */}
      <p className="about__intro">{t("about.intro")}</p>

      {/* Overlay sombre derriere la carte expandee */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            className="about-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Carte expandee en overlay */}
      <AnimatePresence>
        {activeCard && (
          <div className="about-overlay__container">
            <motion.div
              layoutId={`about-card-${activeCard.id}-${id}`}
              ref={overlayRef}
              className="about-expanded"
            >
              {/* En-tete de la carte expandee */}
              <div className="about-expanded__header">
                <div className="about-expanded__header-text">
                  <motion.h3 layoutId={`about-card-title-${activeCard.id}-${id}`}>
                    {t(activeCard.titleKey)}
                  </motion.h3>
                  <motion.p layoutId={`about-card-desc-${activeCard.id}-${id}`}>
                    {t(activeCard.descKey)}
                  </motion.p>
                </div>
                {/* Bouton fermer */}
                <button
                  className="about-expanded__close"
                  onClick={() => setActiveCard(null)}
                  aria-label={t("aria.close")}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Contenu de la carte : timeline parcours ou roadmap */}
              <motion.div
                className="about-expanded__body"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeCard.id === "parcours" && (
                  <div className="about-timeline">
                    {TIMELINE_STEPS.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div className="timeline-step" key={step.titleKey}>
                          <div className="timeline-step__marker">
                            <div className="timeline-step__icon">
                              <Icon size={24} strokeWidth={1.5} />
                            </div>
                            {index < TIMELINE_STEPS.length - 1 && (
                              <div className="timeline-step__line" />
                            )}
                          </div>
                          <div className="timeline-step__content">
                            <span className="timeline-step__period">
                              {t(step.periodKey)}
                            </span>
                            <h3>{t(step.titleKey)}</h3>
                            <p>{t(step.descKey)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeCard.id === "roadmap" && (
                  <div className="roadmap">
                    {MILESTONES.map((milestone, index) => (
                      <div
                        className={`roadmap__item roadmap__item--${milestone.status}`}
                        key={milestone.titleKey}
                      >
                        <div className="roadmap__marker">
                          <div className="roadmap__icon">
                            {STATUS_ICON[milestone.status]}
                          </div>
                          {index < MILESTONES.length - 1 && (
                            <div className="roadmap__line" />
                          )}
                        </div>
                        <div className="roadmap__content">
                          <span className="roadmap__year">{milestone.year}</span>
                          <h3>{t(milestone.titleKey)}</h3>
                          <p>{t(milestone.descKey)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Les deux cartes compactes cliquables */}
      <div className="about-cards">
        {ABOUT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              layoutId={`about-card-${card.id}-${id}`}
              key={card.id}
              className="about-card"
              onClick={() => setActiveCard(card)}
            >
              <div className="about-card__icon">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div className="about-card__text">
                <motion.h3 layoutId={`about-card-title-${card.id}-${id}`}>
                  {t(card.titleKey)}
                </motion.h3>
                <motion.p layoutId={`about-card-desc-${card.id}-${id}`}>
                  {t(card.descKey)}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}