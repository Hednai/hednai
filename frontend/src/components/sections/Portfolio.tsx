// ============================================
// components/sections/Portfolio.tsx
// Section portfolio : filtres par categorie + grille de projets
// ============================================
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { projects, CATEGORIES } from "../../data/projects";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import { useViewMode } from "../../context/useViewMode";
import "./Portfolio.css";

// Table de correspondance slug → cles i18n pour role/duree (mode recruteur)
const PROJECT_META: Record<string, { roleKey: string; durationKey: string }> = {
  "fleetmanager-pro": { roleKey: "projects.fleet.role", durationKey: "projects.fleet.duration" },
  "routeoptimizer-ai": { roleKey: "projects.route.role", durationKey: "projects.route.duration" },
  "portalweb-maritime": { roleKey: "projects.portal.role", durationKey: "projects.portal.duration" },
};

export function Portfolio() {
  const { t } = useLanguage();
  const { isRecruiter } = useViewMode();

  // Filtre actuellement selectionne (cle i18n de la categorie)
  const [activeFilter, setActiveFilter] = useState(CATEGORIES[0]);

  // Si le filtre est "Tous" (premiere categorie), on affiche tout
  // Sinon on ne garde que les projets de la categorie choisie
  const filtered =
    activeFilter === CATEGORIES[0]
      ? projects
      : projects.filter((p) => p.categoryKey === activeFilter);

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
              <Card>
                <div className="proj__img">
                  <img src={p.image} alt={t(p.titleKey)} width={600} height={400} loading="lazy" />
                  <span className="proj__badge">{t(p.categoryKey)}</span>
                </div>
                <div className="proj__body">
                  <h3>
                    {/* Lien vers la page detail du projet (/project/slug) */}
                    <Link to={`/project/${p.slug}`}>{t(p.titleKey)}</Link>
                  </h3>
                  <p>{t(p.descriptionKey)}</p>

                  {/* Mode recruteur : afficher role et duree du projet */}
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
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} /> {t("portfolio.view")}
                    </a>
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                      <FaGithub size={16} /> {t("portfolio.code")}
                    </a>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper> 
  );
}