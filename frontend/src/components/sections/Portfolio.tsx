// ============================================
// components/sections/Portfolio.tsx
// Section portfolio : grille de cartes + overlay expandable au clic
// Presentation en grille conservee, effet expandable au clic
// ============================================
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X, Trophy, Wrench } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, CATEGORIES } from "../../data/projects";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { ProjectLink } from "../ui/ProjectLink";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import { useViewMode } from "../../context/useViewMode";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useEscapeKey } from "../../hooks/useEscapeKey";
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

  // Ancre NON sticky placee juste avant la barre de filtres.
  // On ne mesure JAMAIS .portfolio-filters : cet element est en position sticky,
  // donc getBoundingClientRect() renvoie sa position "collee" (= --nav-height)
  // et non sa position reelle dans le document. C'etait la cause du scroll casse.
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  // Empeche le scroll automatique au tout premier rendu de la section
  const isFirstRender = useRef(true);

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

  // Fermer l'overlay avec Escape (hook partage, plus de listener local)
  useEscapeKey(useCallback(() => setActive(null), []));

  // Bloquer le scroll de la page pendant que la carte est ouverte.
  // Hook partage a compteur : l'ancien code remettait "auto" a la fermeture
  // alors que la valeur d'origine du body est "" , et deux surfaces ouvertes
  // en meme temps se deverrouillaient mutuellement.
  useBodyScrollLock(active !== null);

  // Fermer au clic en dehors de la carte expandee
  useOutsideClick(ref, () => setActive(null));

  // ---- Repositionnement apres changement de categorie ----
  // useLayoutEffect : s'execute APRES que React a commite la nouvelle grille
  // dans le DOM mais AVANT la peinture. La hauteur du document est donc deja
  // celle de la nouvelle categorie : le navigateur ne peut plus tronquer
  // (clamper) la cible de scroll comme le faisait l'ancien code.
  // L'offset sous la navbar + la barre de filtres est gere en CSS via
  // scroll-margin-top sur .portfolio-anchor : aucune valeur en dur ici.
  useLayoutEffect(() => {
    // Pas de saut au premier affichage de la page
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const anchor = scrollAnchorRef.current;
    if (!anchor) return;

    // Respect de prefers-reduced-motion (WCAG 2.3.3)
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    anchor.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [activeFilter]);

  return (
    <SectionWrapper
      id="portfolio"
      title={t("portfolio.title")}
      subtitle={isRecruiter ? t("portfolio.subtitle.recruiter") : t("portfolio.subtitle")}
    >
      {/* Ancre de scroll : hauteur nulle, NON sticky, juste avant les filtres.
          C'est elle qu'on cible au changement de categorie. */}
      <div className="portfolio-anchor" ref={scrollAnchorRef} aria-hidden="true" />

      {/* Boutons de filtre par categorie */}
      <div className="portfolio-filters" role="group" aria-label={t("portfolio.filters.label")}>
        {CATEGORIES.map((catKey) => (
          <button
            key={catKey}
            className={`filter-btn ${activeFilter === catKey ? "filter-btn--active" : ""}`}
            onClick={() => setActiveFilter(catKey)}
            aria-pressed={activeFilter === catKey}
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
                <button className="portfolio-expanded__close" onClick={() => setActive(null)} aria-label={t("aria.close")}>
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
                {/* Liens du projet : geles automatiquement si l'URL n'est pas publiee */}
                <div className="proj__links">
                  <ProjectLink
                    url={active.liveUrl}
                    icon={<ExternalLink size={16} />}
                    label={t("portfolio.view")}
                  />
                  <ProjectLink
                    url={active.githubUrl}
                    icon={<FaGithub size={16} />}
                    label={t("portfolio.code")}
                  />
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
                    <img src={p.image} alt={t(p.titleKey)} width={1600} height={900} loading="lazy" />
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
                    {/* Liens du projet : geles automatiquement si l'URL n'est pas publiee */}
                    <div className="proj__links">
                      <ProjectLink
                        url={p.liveUrl}
                        icon={<ExternalLink size={16} />}
                        label={t("portfolio.view")}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <ProjectLink
                        url={p.githubUrl}
                        icon={<FaGithub size={16} />}
                        label={t("portfolio.code")}
                        onClick={(e) => e.stopPropagation()}
                      />
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