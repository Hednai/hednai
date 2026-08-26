// ============================================
// components/sections/Portfolio.tsx
// Section portfolio : grille de cartes + overlay expandable au clic
// Presentation en grille conservee, effet expandable au clic
// ============================================
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X, Trophy, Wrench } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, CATEGORIES } from "../../data/projects";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import { useViewMode } from "../../context/useViewMode";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import type { Project } from "../../types";
import "./Portfolio.css";

// Table de correspondance slug vers cles i18n pour role/duree (mode recruteur)
const PROJECT_META: Record<string, { roleKey: string; durationKey: string }> = {
  "profmatchai": { roleKey: "projects.profmatch.role", durationKey: "projects.profmatch.duration" },
  "hednai": { roleKey: "projects.hednai.role", durationKey: "projects.hednai.duration" },
  "karibou-market": { roleKey: "projects.karibou.role", durationKey: "projects.karibou.duration" },
  "modenova": { roleKey: "projects.modenova.role", durationKey: "projects.modenova.duration" },
  "fleetlog": { roleKey: "projects.fleet.role", durationKey: "projects.fleet.duration" },
  "maritime-radio-trainer": { roleKey: "projects.radio.role", durationKey: "projects.radio.duration" },
  "datalab-ia": { roleKey: "projects.datalab.role", durationKey: "projects.datalab.duration" },
  "bibliokowazo": { roleKey: "projects.biblio.role", durationKey: "projects.biblio.duration" },
  "geospot": { roleKey: "projects.geospot.role", durationKey: "projects.geospot.duration" },
  "refugeanimo": { roleKey: "projects.refuge.role", durationKey: "projects.refuge.duration" },
  "autovitrine": { roleKey: "projects.auto.role", durationKey: "projects.auto.duration" },
  "foreur-maritime": { roleKey: "projects.foreur.role", durationKey: "projects.foreur.duration" },
};

// Icone SVG du badge selon le type de projet
// Wrench = en conception, Trophy = prix/distinction
const WIP_SLUGS = ["fleetlog", "maritime-radio-trainer"];
function BadgeIcon({ slug, size }: { slug: string; size: number }) {
  if (WIP_SLUGS.includes(slug)) return <Wrench size={size} />;
  return <Trophy size={size} />;
}

export function Portfolio() {
  const { t } = useLanguage();
  const { isRecruiter } = useViewMode();
  const [active, setActive] = useState<Project | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Filtre actuellement selectionne (cle i18n de la categorie)
  const [activeFilter, setActiveFilter] = useState(CATEGORIES[0]);

  // Selection = projets vedettes, Tous = les 12 projets
  const isSelection = activeFilter === "portfolio.filter.selection";
  const isAll = activeFilter === "portfolio.filter.all";

  const filtered = isSelection
    ? projects.filter((p) => p.featured)
    : isAll
      ? projects
      : projects.filter((p) => p.categoryKey === activeFilter);

  // Fermer l'overlay avec Escape + bloquer le scroll
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Fermer au clic en dehors de la carte expandee
  useOutsideClick(ref, () => setActive(null));

  return (
    <SectionWrapper
      id="portfolio"
      title={t("portfolio.title")}
      subtitle={isRecruiter ? t("portfolio.subtitle.recruiter") : t("portfolio.subtitle")}
    >
      {/* Boutons de filtre par categorie */}
      <div className="portfolio-filters">
        {CATEGORIES.map((catKey) => (
          <button
            key={catKey}
            className={`filter-btn ${activeFilter === catKey ? "filter-btn--active" : ""}`}
            onClick={() => setActiveFilter(catKey)}
          >
            {t(catKey)}
          </button>
        ))}
      </div>

      {/* Overlay sombre quand une carte est ouverte */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="portfolio-overlay"
          />
        )}
      </AnimatePresence>

      {/* Carte expandee (overlay modal) */}
      <AnimatePresence>
        {active && (
          <div className="portfolio-overlay__container">
            <motion.div
              ref={ref}
              className="portfolio-expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {/* Image expandee */}
              <img
                src={active.image}
                alt={t(active.titleKey)}
                className="portfolio-expanded__img"
                width={600} height={400}
              />

              {/* En-tete : titre + badge + description + bouton fermer */}
              <div className="portfolio-expanded__header">
                <div className="portfolio-expanded__info">
                  <div className="portfolio-expanded__title-row">
                    <h3>{t(active.titleKey)}</h3>
                    {active.badgeKey && (
                      <span className="portfolio-expanded__badge">
                        {WIP_SLUGS.includes(active.slug) ? <Wrench size={14} /> : <Trophy size={14} />}
                        {t(active.badgeKey)}
                      </span>
                    )}
                  </div>
                  <p>{t(active.descriptionKey)}</p>
                </div>
                <button className="portfolio-expanded__close" onClick={() => setActive(null)} aria-label="Fermer">
                  <X size={18} />
                </button>
              </div>

              {/* Corps : meta recruteur + description longue + tech + liens */}
              <div className="portfolio-expanded__body">
                {isRecruiter && PROJECT_META[active.slug] && (
                  <div className="proj__meta">
                    <span className="proj__meta-item">
                      {t("portfolio.role")}: {t(PROJECT_META[active.slug].roleKey)}
                    </span>
                    <span className="proj__meta-item">
                      {t("portfolio.duration")}: {t(PROJECT_META[active.slug].durationKey)}
                    </span>
                  </div>
                )}
                {active.longDescriptionKey && (
                  <p className="portfolio-expanded__long">{t(active.longDescriptionKey)}</p>
                )}
                <div className="proj__techs">
                  {active.technologies.map((tech) => (
                    <span className="tech-tag" key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="proj__links">
                  {active.liveUrl !== "#" && (
                    <a href={active.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} /> {t("portfolio.view")}
                    </a>
                  )}
                  {active.githubUrl !== "#" && (
                    <a href={active.githubUrl} target="_blank" rel="noopener noreferrer">
                      <FaGithub size={16} /> {t("portfolio.code")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grille des projets filtres */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="portfolio-grid"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {filtered.map((p, index) => (
            <FadeIn key={p.id} delay={index * 0.08}>
              <div onClick={() => setActive(p)} onDoubleClick={() => setActive(p)} style={{ cursor: "pointer" }}>
                <Card>
                  <div className="proj__img">
                    <img src={p.image} alt={t(p.titleKey)} width={600} height={400} loading="lazy" />
                    <span className="proj__badge">{t(p.categoryKey)}</span>
                    {p.badgeKey && (
                      <span className="proj__badge-special">
                        <BadgeIcon slug={p.slug} size={12} />
                        {t(p.badgeKey)}
                      </span>
                    )}
                  </div>
                  <div className="proj__body">
                    <h3>{t(p.titleKey)}</h3>
                    <p>{t(p.descriptionKey)}</p>

                    {isRecruiter && PROJECT_META[p.slug] && (
                      <div className="proj__meta">
                        <span className="proj__meta-item">
                          {t("portfolio.role")}: {t(PROJECT_META[p.slug].roleKey)}
                        </span>
                        <span className="proj__meta-item">
                          {t("portfolio.duration")}: {t(PROJECT_META[p.slug].durationKey)}
                        </span>
                      </div>
                    )}

                    <div className="proj__techs">
                      {p.technologies.map((tech) => (
                        <span className="tech-tag" key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="proj__links">
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={16} /> {t("portfolio.view")}
                      </a>
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <FaGithub size={16} /> {t("portfolio.code")}
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </FadeIn>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}