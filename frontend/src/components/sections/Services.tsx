// ============================================
// components/sections/Services.tsx
// Section services : grille avec cartes expandables en overlay
// Au clic, la carte s'agrandit et revele le contenu (features)
// Animation framer-motion (layoutId + AnimatePresence)
// ============================================
import { useState, useId, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Ship, Anchor, Brain, ClipboardCheck, Building, Code, X } from "lucide-react";
import { services } from "../../data/services";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import { useViewMode } from "../../context/useViewMode";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import "./Services.css";

// Table de correspondance entre le nom d'icone (string) et le vrai composant icone
const icons: Record<string, React.ElementType> = {
  Ship, Anchor, Brain, ClipboardCheck, Building, Code,
};

export function Services() {
  const { t } = useLanguage();
  const { isRecruiter } = useViewMode();
  const [activeId, setActiveId] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Fermeture avec Escape (hook partage)
  useEscapeKey(useCallback(() => setActiveId(null), []));

  // Blocage du scroll pendant l'ouverture (hook partage a compteur)
  useBodyScrollLock(activeId !== null);

  // Fermeture au clic exterieur
  useOutsideClick(overlayRef, () => setActiveId(null));

  // Carte active pour l'overlay
  const activeService = activeId !== null
    ? services.find((s) => s.id === activeId)
    : null;

  return (
    <SectionWrapper
      id="services"
      title={isRecruiter ? t("services.title.recruiter") : t("services.title")}
      subtitle={isRecruiter ? t("services.subtitle.recruiter") : t("services.subtitle")}
    >
      {/* Overlay sombre derriere la carte expandee */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            className="svc-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Carte expandee en overlay */}
      <AnimatePresence>
        {activeService && (
          <div className="svc-overlay__container">
            <motion.div
              layoutId={`svc-card-${activeService.id}-${id}`}
              ref={overlayRef}
              className="svc-expanded"
            >
              {/* En-tete */}
              <div className="svc-expanded__header">
                <div className="svc-expanded__icon">
                  {(() => {
                    const Icon = icons[activeService.icon];
                    return <Icon size={24} strokeWidth={1.5} />;
                  })()}
                </div>
                <div className="svc-expanded__header-text">
                  <motion.h3 layoutId={`svc-title-${activeService.id}-${id}`}>
                    {t(activeService.titleKey)}
                  </motion.h3>
                  <motion.p layoutId={`svc-desc-${activeService.id}-${id}`}>
                    {t(activeService.descriptionKey)}
                  </motion.p>
                </div>
                <button
                  className="svc-expanded__close"
                  onClick={() => setActiveId(null)}
                  aria-label={t("aria.close")}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Features revelees */}
              <motion.ul
                className="svc-expanded__features"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeService.featureKeys.map((fk) => (
                  <li key={fk}>{t(fk)}</li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grille des cartes compactes */}
      <div className="services-grid">
        {services.map((s, index) => {
          const Icon = icons[s.icon];
          return (
            <FadeIn key={s.id} delay={index * 0.1}>
              <motion.div
                layoutId={`svc-card-${s.id}-${id}`}
                className="svc-card"
                onClick={() => setActiveId(s.id)}
              >
                <div className="svc-card__icon">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <motion.h3 layoutId={`svc-title-${s.id}-${id}`}>
                  {t(s.titleKey)}
                </motion.h3>
                <motion.p layoutId={`svc-desc-${s.id}-${id}`}>
                  {t(s.descriptionKey)}
                </motion.p>
              </motion.div>
            </FadeIn>
          );
        })}
      </div>

      {isRecruiter && (
        <div className="services__recruiter-link">
          <p className="services__recruiter-question">{t("services.recruiterQuestion")}</p>
          <Link to="/recruiter">{t("services.recruiterLink")}</Link>
        </div>
      )}
    </SectionWrapper>
  );
}