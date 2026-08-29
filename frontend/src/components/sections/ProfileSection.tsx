// ============================================
// components/sections/Portfolio.tsx
// Section projets — grille avec filtres et modal overlay
// ============================================
import { useState, useRef } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import "./Portfolio.css";

// Categories de projets (clefs i18n)
const CATEGORIES = ["portfolio.all", "portfolio.web", "portfolio.mobile", "portfolio.ai"];

// Type pour un projet
interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  category: string;
  image: string;
  link?: string;
  github?: string;
}

// Donnees des projets
const PROJECTS: Project[] = [
  {
    id: "1",
    titleKey: "portfolio.project1.title",
    descKey: "portfolio.project1.desc",
    category: "portfolio.web",
    image: "/projects/project1.webp",
    link: "https://example.com",
    github: "https://github.com",
  },
  // ... autres projets
];

export function Portfolio() {
  const { t } = useLanguage();
  const [active, setActive] = useState<Project | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Ref vers les filtres pour scroller en haut a chaque changement de categorie
  // Source : MDN Element.scrollIntoView()
  const filtersRef = useRef<HTMLDivElement>(null);

  // Filtre actuellement selectionne (cle i18n de la categorie)
  const [activeFilter, setActiveFilter] = useState(CATEGORIES[0]);

  // Filtrer les projets selon la categorie selectionnee
  const filteredProjects =
    activeFilter === CATEGORIES[0]
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  // Fermer le modal au clic sur l'overlay ou Escape
  const handleClose = () => setActive(null);

  return (
    <SectionWrapper id="portfolio" title={t("portfolio.title")} subtitle={t("portfolio.subtitle")}>
      {/* Filtres */}
      <div className="portfolio-filters" ref={filtersRef}>
        {CATEGORIES.map((catKey) => (
          <button
            key={catKey}
            className={`filter-btn ${activeFilter === catKey ? "filter-btn--active" : ""}`}
            onClick={() => {
              setActiveFilter(catKey);
              filtersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {t(catKey)}
          </button>
        ))}
      </div>

      {/* Grille de projets */}
      <div className="portfolio-grid" ref={ref}>
        {filteredProjects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.05}>
            <div
              className="portfolio-card"
              onClick={() => setActive(project)}
            >
              <div className="portfolio-card__image">
                <img src={project.image} alt={t(project.titleKey)} loading="lazy" />
              </div>
              <div className="portfolio-card__content">
                <h3>{t(project.titleKey)}</h3>
                <p>{t(project.descKey)}</p>
                <span className="portfolio-card__category">{t(project.category)}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Modal overlay — affiche les details du projet */}
      {active && (
        <div className="portfolio-modal-overlay" onClick={handleClose}>
          <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
            <button className="portfolio-modal__close" onClick={handleClose}>
              <X size={24} />
            </button>
            <div className="portfolio-modal__image">
              <img src={active.image} alt={t(active.titleKey)} />
            </div>
            <div className="portfolio-modal__content">
              <h2>{t(active.titleKey)}</h2>
              <p>{t(active.descKey)}</p>
              <div className="portfolio-modal__links">
                {active.link && (
                  <a href={active.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} /> Voir le projet
                  </a>
                )}
                {active.github && (
                  <a href={active.github} target="_blank" rel="noopener noreferrer">
                    <Github size={18} /> Code source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}