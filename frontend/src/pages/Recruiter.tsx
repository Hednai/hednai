// ============================================
// pages/Recruiter.tsx
// Page dediee aux recruteurs — CV en ligne, competences, liens
// Accessible via /recruiter
// Un recruteur qui recoit ce lien voit immediatement le profil
// ============================================
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Anchor, Code, Brain, Search } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Card } from "../components/ui/Card";
import { FadeIn } from "../components/FadeIn";
import { useLanguage } from "../i18n/useLanguage";
import { SITE_CONFIG } from "../config/site";
import "./Recruiter.css";

// Categories de competences techniques
const SKILL_CATEGORIES = [
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
  },
];
export function Recruiter() {
  const { t } = useLanguage();

  return (
    <div className="recruiter-page">
      <Helmet>
        <title>{t("recruiter.seo.title")}</title>
        <meta name="description" content={t("recruiter.seo.desc")} />
      </Helmet>

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
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="btn btn--primary"
              >
                <Mail size={16} /> {t("recruiter.contact")}
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Resume parcours */}
        <FadeIn delay={0.1}>
          <Card>
            <div className="recruiter-section">
              <h2>{t("recruiter.about.title")}</h2>
              <p>{t("recruiter.about.text")}</p>
            </div>
          </Card>
        </FadeIn>

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
                    {cat.skills.map((skill) => (
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

        {/* Ce qui me differencie — 4 cartes */}
        <FadeIn delay={0.3}>
          <h2 className="recruiter-page__section-title">
            {t("recruiter.diff.title")}
          </h2>
          <p className="recruiter-page__diff-intro">
            {t("recruiter.diff.intro")}
          </p>
          <div className="recruiter-diff-grid">
            {[
              { icon: Anchor, num: 1 },
              { icon: Code, num: 2 },
              { icon: Brain, num: 3 },
              { icon: Search, num: 4 },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.num} hoverable={false}>
                  <div className="recruiter-diff-card">
                    <div className="recruiter-diff-card__icon">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3>{t(`recruiter.diff.card${card.num}.title`)}</h3>
                    <p>{t(`recruiter.diff.card${card.num}.text`)}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </FadeIn>

        {/* CTA final */}
        <div className="recruiter-page__cta">
          <a href={`mailto:${SITE_CONFIG.contact.email}`} className="btn btn--primary">
            <Mail size={16} /> {t("recruiter.cta")}
          </a>
        </div>
      </div>
    </div>
  );
}