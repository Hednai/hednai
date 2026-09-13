// ============================================
// pages/ProjectDetail.tsx
// Page detail d'un projet — accessible via /project/:slug
// ============================================
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Seo } from "../components/Seo";
import { ProjectLink } from "../components/ui/ProjectLink";
import { SITE_CONFIG } from "../config/site";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/useLanguage";
import "./ProjectDetail.css";

export function ProjectDetail() {
  const { t } = useLanguage();

  // Recuperer le slug depuis l'URL (ex: /project/fleetmanager-pro → slug = "fleetmanager-pro")
  const { slug } = useParams();

  // Chercher le projet correspondant dans data/projects.ts
  const project = projects.find((p) => p.slug === slug);

  // Si aucun projet ne correspond, on affiche une page "non trouve"
  if (!project) {
    return (
      <div className="pd">
        <div className="container">
          <h1>{t("project.notFound")}</h1>

          <Link to="/">
            <ArrowLeft size={18} /> {t("project.backHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pd">
      <Seo
        title={`${t(project.titleKey)} | Hednai`}
        description={t(project.descriptionKey)}
        image={
          project.image.startsWith("http")
            ? project.image
            : `${SITE_CONFIG.meta.url}${project.image}`
        }
      />
      <div className="container">

        {/* Lien retour vers l'accueil */}
        <Link to="/" className="pd__back">
          <ArrowLeft size={18} /> {t("project.back")}
        </Link>

        {/* Categorie du projet (traduite via i18n) */}
        <span className="pd__cat">
          {t(project.categoryKey)}
        </span>

        {/* Titre du projet */}
        <h1>{t(project.titleKey)}</h1>

        {/* Image du projet */}
        <img
          src={project.image}
          alt={t(project.titleKey)}
          className="pd__img"
        />

        {/* Description longue si elle existe, sinon la description courte */}
        <p className="pd__desc">
          {project.longDescriptionKey ? t(project.longDescriptionKey) : t(project.descriptionKey)}
        </p>

        {/* Liste des technologies utilisees */}
        <div className="pd__techs">
          {project.technologies.map((tech) => (
            <span className="tech-tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        {/* Liste des fonctionnalites, seulement si le projet en a */}
        {project.featureKeys && (
          <div className="pd__features">
            <h3>{t("project.features")}</h3>

            <ul>
              {project.featureKeys.map((fk) => (
                <li key={fk}>{t(fk)}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Boutons d'action : voir le projet en ligne / voir le code
            ProjectLink gele automatiquement le bouton si l'URL n'est pas publiee */}
        <div className="pd__actions">

          <ProjectLink
            url={project.liveUrl}
            className="btn btn--primary"
            icon={<ExternalLink size={18} />}
            label={t("project.viewLive")}
          />

          <ProjectLink
            url={project.githubUrl}
            className="btn btn--secondary"
            icon={<FaGithub size={18} />}
            label={t("project.viewCode")}
          />

        </div>

      </div>
    </div>
  );
}