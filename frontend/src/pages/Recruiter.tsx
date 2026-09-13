// ============================================
// pages/Recruiter.tsx
// Page dediee aux recruteurs — CV en ligne, competences, liens
// Accessible via /recruiter
// Un recruteur qui recoit ce lien voit immediatement le profil
// ============================================
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Seo } from "../components/Seo";
import { Card } from "../components/ui/Card";
import { FadeIn } from "../components/FadeIn";
import { useLanguage } from "../i18n/useLanguage";
import { SITE_CONFIG } from "../config/site";
import "./Recruiter.css";

// Une categorie regroupe des libelles bruts (noms de technologies, identiques
// dans les deux langues) et, optionnellement, des libelles traduits via i18n
interface SkillCategory {
  titleKey: string;
  skills: string[];
  skillKeys?: string[];
}

// Categories de competences techniques
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    titleKey: "recruiter.skills.frontend",
    skills: ["React", "TypeScript", "HTML/CSS", "Framer Motion", "Vite", "PWA"],
  },
  {
    titleKey: "recruiter.skills.backend",
    skills: ["Node.js", "Express 5", "Prisma", "PostgreSQL", "Redis", "REST API"],
  },
  {
    titleKey: "recruiter.skills.tools",
    skills: ["Git", "GitHub Actions", "Docker", "Vitest", "ESLint", "Pino"],
  },
  {
    titleKey: "recruiter.skills.other",
    skills: ["Zod", "i18n", "Helmet", "SEO", "Accessibilite", "SOLID"],
  },
  {
    titleKey: "recruiter.skills.methods",
    skills: ["Agile", "Scrum", "Jira", "Git / GitHub", "Travail en équipe", "Gestion du backlog"],
    skillKeys: ["recruiter.skills.leadershipManagement"],
  },
];

export function Recruiter() {
  const { t } = useLanguage();

  return (
    <div className="recruiter-page">
      <Seo title={t("recruiter.seo.title")} description={t("recruiter.seo.desc")} />

      <div className="container">
        {/* Bouton retour */}
        <Link to="/" className="recruiter-page__back">
          <ArrowLeft size={16} /> {t("recruiter.back")}
        </Link>

        {/* En-tete profil */}
        <FadeIn>
          <div className="recruiter-page__header">
            <h1>{t("recruiter.title")}</h1>
            <p className="recruiter-page__tagline">{t("recruiter.tagline")}</p>

            {/* Liens rapides */}
            <div className="recruiter-page__links">
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
              >
                <FaGithub size={16} /> GitHub
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
              >
                <FaLinkedin size={16} /> LinkedIn
              </a>
              <button
                className="btn btn--primary"
                onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
              >
                <Mail size={16} /> {t("recruiter.contact")}
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Parcours retire : deja dans ProfileSection sur la page d'accueil */}

        {/* Competences techniques */}
        <FadeIn delay={0.2}>
          <h2 className="recruiter-page__section-title">
            {t("recruiter.skills.title")}
          </h2>
          <div className="recruiter-skills-grid">
            {SKILL_CATEGORIES.map((cat) => (
              <Card key={cat.titleKey} hoverable={false}>
                <div className="recruiter-skill-cat">
                  <h3>{t(cat.titleKey)}</h3>
                  <div className="recruiter-skill-tags">
                    {[...cat.skills, ...(cat.skillKeys ?? []).map((key) => t(key))].map((skill) => (
                      <span key={skill} className="recruiter-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* "Ce qui me differencie" retire : deja dans WhyHednai mode recruteur */}

        {/* CTA final */}
        <div className="recruiter-page__cta">
          <button
            className="btn btn--primary"
            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
          >
            <Mail size={16} /> {t("recruiter.cta")}
          </button>
        </div>
      </div>
    </div>
  );
}