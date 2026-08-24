// ============================================
// pages/CvPage.tsx
// Page dédiée CV accessible via /cv
// Style inspiré de cv.diogotc.com
// Deux onglets : Full Stack / Capitaine
// Bilingue FR/EN via i18n
// ============================================
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Download, Briefcase, Anchor, ArrowLeft, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FadeIn } from "../components/FadeIn";
import { useLanguage } from "../i18n/useLanguage";
import { SITE_CONFIG } from "../config/site";
import "./CvPage.css";

const CV_TABS = [
  { id: "fullstack", labelKey: "cv.tab.fullstack", icon: Briefcase, pdfUrl: "/cv-fullstack.pdf" },
  { id: "captain", labelKey: "cv.tab.captain", icon: Anchor, pdfUrl: "/cv-captain.pdf" },
] as const;

type CvTabId = typeof CV_TABS[number]["id"];

const CV_CONFIG = {
  fullstack: {
    objectiveKey: "cv.fs.objective",
    skillGroups: [
      { labelKey: "cv.fs.skills.frontend", listKey: "cv.fs.skills.frontend.list" },
      { labelKey: "cv.fs.skills.backend", listKey: "cv.fs.skills.backend.list" },
      { labelKey: "cv.fs.skills.mobile", listKey: "cv.fs.skills.mobile.list" },
      { labelKey: "cv.fs.skills.db", listKey: "cv.fs.skills.db.list" },
      { labelKey: "cv.fs.skills.ai", listKey: "cv.fs.skills.ai.list" },
      { labelKey: "cv.fs.skills.tools", listKey: "cv.fs.skills.tools.list" },
    ],
    methodKeys: ["cv.fs.methods.1", "cv.fs.methods.2", "cv.fs.methods.3", "cv.fs.methods.4"] as const,
    keyskillKeys: ["cv.fs.keyskills.1", "cv.fs.keyskills.2", "cv.fs.keyskills.3", "cv.fs.keyskills.4"] as const,
    projects: [
      { titleKey: "cv.fs.proj1.title", contextKey: "cv.fs.proj1.context", descKey: "cv.fs.proj1.desc" },
      { titleKey: "cv.fs.proj2.title", contextKey: "cv.fs.proj2.context", descKey: "cv.fs.proj2.desc" },
      { titleKey: "cv.fs.proj3.title", contextKey: "cv.fs.proj3.context", descKey: "cv.fs.proj3.desc" },
      { titleKey: "cv.fs.proj4.title", contextKey: "cv.fs.proj4.context", descKey: "cv.fs.proj4.desc" },
      { titleKey: "cv.fs.proj5.title", contextKey: "cv.fs.proj5.context", descKey: "cv.fs.proj5.desc" },
    ],
    education: [
      { periodKey: "cv.fs.edu1.period", titleKey: "cv.fs.edu1.title", schoolKey: "cv.fs.edu1.school", noteKey: null },
      { periodKey: "cv.fs.edu2.period", titleKey: "cv.fs.edu2.title", schoolKey: "cv.fs.edu2.school", noteKey: "cv.fs.edu2.note" },
      { periodKey: "cv.fs.edu3.period", titleKey: "cv.fs.edu3.title", schoolKey: "cv.fs.edu3.school", noteKey: null },
    ],
    experience: [
      {
        periodKey: "cv.fs.exp1.period", titleKey: "cv.fs.exp1.title", companyKey: "cv.fs.exp1.company",
        descKey: null,
        bulletKeys: ["cv.fs.exp1.bullets.1", "cv.fs.exp1.bullets.2", "cv.fs.exp1.bullets.3", "cv.fs.exp1.bullets.4"] as string[],
      },
    ],
    langKeys: ["cv.fs.lang.1", "cv.fs.lang.2"] as const,
    awardKeys: ["cv.fs.award.1", "cv.fs.award.2"] as const,
    zoneKeys: null as null,
    certKeys: null as null,
    techProject: null as null,
  },
  captain: {
    objectiveKey: "cv.cap.objective",
    skillGroups: null as null,
    methodKeys: null as null,
    keyskillKeys: ["cv.cap.keyskills.1", "cv.cap.keyskills.2", "cv.cap.keyskills.3", "cv.cap.keyskills.4", "cv.cap.keyskills.5", "cv.cap.keyskills.6", "cv.cap.keyskills.7", "cv.cap.keyskills.8"] as const,
    projects: null as null,
    education: [
      { periodKey: "cv.cap.edu1.period", titleKey: "cv.cap.edu1.title", schoolKey: "cv.cap.edu1.school", noteKey: null },
      { periodKey: "cv.cap.edu2.period", titleKey: "cv.cap.edu2.title", schoolKey: "cv.cap.edu2.school", noteKey: "cv.cap.edu2.note" },
      { periodKey: "cv.cap.edu3.period", titleKey: "cv.cap.edu3.title", schoolKey: "cv.cap.edu3.school", noteKey: "cv.cap.edu3.note" },
      { periodKey: "cv.cap.edu4.period", titleKey: "cv.cap.edu4.title", schoolKey: "cv.cap.edu4.school", noteKey: null },
    ],
    experience: [
      { periodKey: "cv.cap.exp1.period", titleKey: "cv.cap.exp1.title", companyKey: "cv.cap.exp1.company", descKey: "cv.cap.exp1.desc", bulletKeys: null as null },
      { periodKey: "cv.cap.exp2.period", titleKey: "cv.cap.exp2.title", companyKey: "cv.cap.exp2.company", descKey: "cv.cap.exp2.desc", bulletKeys: null as null },
      { periodKey: "cv.cap.exp3.period", titleKey: "cv.cap.exp3.title", companyKey: "cv.cap.exp3.company", descKey: "cv.cap.exp3.desc", bulletKeys: null as null },
      { periodKey: "cv.cap.exp4.period", titleKey: "cv.cap.exp4.title", companyKey: "cv.cap.exp4.company", descKey: "cv.cap.exp4.desc", bulletKeys: null as null },
      { periodKey: "cv.cap.exp5.period", titleKey: "cv.cap.exp5.title", companyKey: "cv.cap.exp5.company", descKey: "cv.cap.exp5.desc", bulletKeys: null as null },
      { periodKey: "cv.cap.exp6.period", titleKey: "cv.cap.exp6.title", companyKey: "cv.cap.exp6.company", descKey: "cv.cap.exp6.desc", bulletKeys: null as null },
    ],
    langKeys: ["cv.cap.lang.1", "cv.cap.lang.2", "cv.cap.lang.3", "cv.cap.lang.4"] as const,
    awardKeys: ["cv.cap.award.1", "cv.cap.award.2"] as const,
    zoneKeys: ["cv.cap.zones.1", "cv.cap.zones.2", "cv.cap.zones.3", "cv.cap.zones.4", "cv.cap.zones.5"] as const,
    certKeys: ["cv.cap.cert.1", "cv.cap.cert.2", "cv.cap.cert.3", "cv.cap.cert.4", "cv.cap.cert.5", "cv.cap.cert.6", "cv.cap.cert.7", "cv.cap.cert.8", "cv.cap.cert.9"] as const,
    techProject: { titleKey: "cv.cap.techproject.title", periodKey: "cv.cap.techproject.period", descKey: "cv.cap.techproject.desc" },
  },
};

export function CvPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<CvTabId>("fullstack");
  const config = CV_CONFIG[activeTab];
  const currentTab = CV_TABS.find((tab) => tab.id === activeTab)!;

  return (
    <div className="cv-page">
      <Helmet>
        <title>CV | Daren - Hednai</title>
        <meta name="description" content={t("cv.subtitle")} />
      </Helmet>

      <div className="cv-page__container">
        {/* Header */}
        <header className="cv-header">
          <Link to="/" className="cv-header__back">
            <ArrowLeft size={16} /> {t("recruiter.back")}
          </Link>
          <h1 className="cv-header__name">Daren</h1>
          <p className="cv-header__tagline">{t("recruiter.tagline")}</p>
          <div className="cv-header__links">
            <a href={`mailto:${SITE_CONFIG.contact.email}`}>
              <Mail size={16} /> {SITE_CONFIG.contact.email}
            </a>
            <a href={SITE_CONFIG.socials.github} target="_blank" rel="noopener noreferrer">
              <FaGithub size={16} /> GitHub
            </a>
            <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={16} /> LinkedIn
            </a>
          </div>
          <div className="cv-tabs">
            {CV_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`cv-tabs__btn ${activeTab === tab.id ? "cv-tabs__btn--active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} /> {t(tab.labelKey)}
                </button>
              );
            })}
          </div>
        </header>

        {/* Contenu */}
        <FadeIn key={activeTab}>
          <main className="cv-main">

            {/* Objectif */}
            <section className="cv-section">
              <h2>{t("cv.objective")}</h2>
              <p className="cv-section__text">{t(config.objectiveKey)}</p>
            </section>

            {/* Compétences techniques (Full Stack only) */}
            {config.skillGroups && (
              <section className="cv-section">
                <h2>{t("cv.skills")}</h2>
                <div className="cv-skills-grid">
                  {config.skillGroups.map((group) => (
                    <div className="cv-skills-group" key={group.labelKey}>
                      <h3>{t(group.labelKey)}</h3>
                      <div className="cv-tags">
                        {t(group.listKey).split(", ").map((skill) => (
                          <span className="cv-tag" key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Méthodes (Full Stack only) */}
            {config.methodKeys && (
              <section className="cv-section">
                <h2>{t("cv.methods")}</h2>
                <ul className="cv-list">
                  {config.methodKeys.map((key) => <li key={key}>{t(key)}</li>)}
                </ul>
              </section>
            )}

            {/* Compétences clés */}
            {config.keyskillKeys && (
              <section className="cv-section">
                <h2>{t("cv.keyskills")}</h2>
                <ul className="cv-list">
                  {config.keyskillKeys.map((key) => <li key={key}>{t(key)}</li>)}
                </ul>
              </section>
            )}

            {/* Projets (Full Stack only) */}
            {config.projects && (
              <section className="cv-section">
                <h2>{t("cv.projects")}</h2>
                {config.projects.map((proj) => (
                  <div className="cv-entry" key={proj.titleKey}>
                    <div className="cv-entry__header">
                      <h3>{t(proj.titleKey)}</h3>
                      <span className="cv-entry__date">{t(proj.contextKey)}</span>
                    </div>
                    <p>{t(proj.descKey)}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Expérience */}
            <section className="cv-section">
              <h2>{t("cv.experience")}</h2>
              {config.experience.map((exp) => (
                <div className="cv-entry" key={exp.titleKey}>
                  <div className="cv-entry__header">
                    <h3>{t(exp.titleKey)}</h3>
                    <span className="cv-entry__date">{t(exp.periodKey)}</span>
                  </div>
                  <span className="cv-entry__sub">{t(exp.companyKey)}</span>
                  {exp.descKey && <p>{t(exp.descKey)}</p>}
                  {exp.bulletKeys && (
                    <ul className="cv-entry__bullets">
                      {exp.bulletKeys.map((bk) => <li key={bk}>{t(bk)}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>

            {/* Zones (Captain only) */}
            {config.zoneKeys && (
              <section className="cv-section">
                <h2>{t("cv.zones")}</h2>
                <ul className="cv-list">
                  {config.zoneKeys.map((key) => <li key={key}>{t(key)}</li>)}
                </ul>
              </section>
            )}

            {/* Études */}
            <section className="cv-section">
              <h2>{t("cv.education")}</h2>
              {config.education.map((edu) => (
                <div className="cv-entry" key={edu.titleKey}>
                  <div className="cv-entry__header">
                    <h3>{t(edu.titleKey)}</h3>
                    <span className="cv-entry__date">{t(edu.periodKey)}</span>
                  </div>
                  <span className="cv-entry__sub">{t(edu.schoolKey)}</span>
                  {edu.noteKey && <p className="cv-entry__note">{t(edu.noteKey)}</p>}
                </div>
              ))}
            </section>

            {/* Certificats (Captain only) */}
            {config.certKeys && (
              <section className="cv-section">
                <h2>{t("cv.certificates")}</h2>
                <div className="cv-tags cv-tags--wrap">
                  {config.certKeys.map((key) => (
                    <span className="cv-tag" key={key}>{t(key)}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Langues */}
            <section className="cv-section">
              <h2>{t("cv.languages")}</h2>
              <ul className="cv-list">
                {config.langKeys.map((key) => <li key={key}>{t(key)}</li>)}
              </ul>
            </section>

            {/* Projet techno (Captain only) */}
            {config.techProject && (
              <section className="cv-section">
                <h2>{t("cv.techproject")}</h2>
                <div className="cv-entry">
                  <div className="cv-entry__header">
                    <h3>{t(config.techProject.titleKey)}</h3>
                    <span className="cv-entry__date">{t(config.techProject.periodKey)}</span>
                  </div>
                  <p>{t(config.techProject.descKey)}</p>
                </div>
              </section>
            )}

            {/* Distinctions */}
            <section className="cv-section">
              <h2>{t("cv.awards")}</h2>
              <ul className="cv-list">
                {config.awardKeys.map((key) => <li key={key}>{t(key)}</li>)}
              </ul>
            </section>

          </main>
        </FadeIn>

        {/* Footer PDF */}
        <footer className="cv-footer">
          <a href={currentTab.pdfUrl} download className="btn btn--primary cv-footer__download">
            <Download size={18} /> {t("cv.download")}
          </a>
        </footer>
      </div>
    </div>
  );
}