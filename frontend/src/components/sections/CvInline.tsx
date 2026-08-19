// ============================================
// components/sections/CvInline.tsx
// CV HTML inline avec 2 onglets (Full Stack / Capitaine)
// Visible uniquement en mode recruteur — bouton PDF pour telecharger
// ============================================
import { useState } from "react";
import { Download, Briefcase, Anchor } from "lucide-react";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import "./CvInline.css";

// Les deux profils CV disponibles
const CV_TABS = [
  { id: "fullstack", labelKey: "cv.tab.fullstack", icon: Briefcase, pdfUrl: "/cv-fullstack.pdf" },
  { id: "captain", labelKey: "cv.tab.captain", icon: Anchor, pdfUrl: "/cv-captain.pdf" },
] as const;

// Type pour les onglets
type CvTabId = typeof CV_TABS[number]["id"];

// Cles i18n pour les sections du CV (experience, formation, competences)
const CV_SECTIONS = {
  fullstack: {
    experienceKeys: [
      { periodKey: "cv.fs.exp1.period", titleKey: "cv.fs.exp1.title", companyKey: "cv.fs.exp1.company", descKey: "cv.fs.exp1.desc" },
      { periodKey: "cv.fs.exp2.period", titleKey: "cv.fs.exp2.title", companyKey: "cv.fs.exp2.company", descKey: "cv.fs.exp2.desc" },
    ],
    educationKeys: [
      { periodKey: "cv.fs.edu1.period", titleKey: "cv.fs.edu1.title", schoolKey: "cv.fs.edu1.school" },
      { periodKey: "cv.fs.edu2.period", titleKey: "cv.fs.edu2.title", schoolKey: "cv.fs.edu2.school" },
    ],
    skillGroups: [
      { labelKey: "cv.fs.skills.frontend", skillsKey: "cv.fs.skills.frontend.list" },
      { labelKey: "cv.fs.skills.backend", skillsKey: "cv.fs.skills.backend.list" },
      { labelKey: "cv.fs.skills.tools", skillsKey: "cv.fs.skills.tools.list" },
    ],
  },
  captain: {
    experienceKeys: [
      { periodKey: "cv.cap.exp1.period", titleKey: "cv.cap.exp1.title", companyKey: "cv.cap.exp1.company", descKey: "cv.cap.exp1.desc" },
      { periodKey: "cv.cap.exp2.period", titleKey: "cv.cap.exp2.title", companyKey: "cv.cap.exp2.company", descKey: "cv.cap.exp2.desc" },
    ],
    educationKeys: [
      { periodKey: "cv.cap.edu1.period", titleKey: "cv.cap.edu1.title", schoolKey: "cv.cap.edu1.school" },
    ],
    skillGroups: [
      { labelKey: "cv.cap.skills.navigation", skillsKey: "cv.cap.skills.navigation.list" },
      { labelKey: "cv.cap.skills.management", skillsKey: "cv.cap.skills.management.list" },
      { labelKey: "cv.cap.skills.safety", skillsKey: "cv.cap.skills.safety.list" },
    ],
  },
};

export function CvInline() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<CvTabId>("fullstack");

  const sections = CV_SECTIONS[activeTab];
  const currentTab = CV_TABS.find((tab) => tab.id === activeTab)!;

  return (
    <div className="cv-inline" id="cv">
      {/* Titre du CV */}
      <h2 className="cv-inline__title">{t("cv.title")}</h2>
      <p className="cv-inline__subtitle">{t("cv.subtitle")}</p>

      {/* Onglets Full Stack / Capitaine */}
      <div className="cv-tabs">
        {CV_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`cv-tabs__btn ${activeTab === tab.id ? "cv-tabs__btn--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              {t(tab.labelKey)}
            </button>
          );
        })}
      </div>

      <FadeIn key={activeTab}>
        <div className="cv-content">
          {/* ── Experience ── */}
          <div className="cv-section">
            <h3 className="cv-section__title">{t("cv.experience")}</h3>
            {sections.experienceKeys.map((exp) => (
              <div className="cv-entry" key={exp.titleKey}>
                <span className="cv-entry__period">{t(exp.periodKey)}</span>
                <h4 className="cv-entry__title">{t(exp.titleKey)}</h4>
                <span className="cv-entry__company">{t(exp.companyKey)}</span>
                <p className="cv-entry__desc">{t(exp.descKey)}</p>
              </div>
            ))}
          </div>

          {/* ── Formation ── */}
          <div className="cv-section">
            <h3 className="cv-section__title">{t("cv.education")}</h3>
            {sections.educationKeys.map((edu) => (
              <div className="cv-entry" key={edu.titleKey}>
                <span className="cv-entry__period">{t(edu.periodKey)}</span>
                <h4 className="cv-entry__title">{t(edu.titleKey)}</h4>
                <span className="cv-entry__company">{t(edu.schoolKey)}</span>
              </div>
            ))}
          </div>

          {/* ── Competences ── */}
          <div className="cv-section">
            <h3 className="cv-section__title">{t("cv.skills")}</h3>
            <div className="cv-skills-grid">
              {sections.skillGroups.map((group) => (
                <div className="cv-skills-group" key={group.labelKey}>
                  <h4>{t(group.labelKey)}</h4>
                  <div className="cv-skills-tags">
                    {t(group.skillsKey).split(", ").map((skill) => (
                      <span className="tech-tag" key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bouton PDF ── */}
          <div className="cv-download">
            <a href={currentTab.pdfUrl} download className="btn btn--primary cv-download__btn">
              <Download size={18} />
              {t("cv.download")}
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}