// ============================================
// pages/CvPage.tsx
// Page CV/Resume — viewer PDF intégré dans le MainLayout
// Onglets Full Stack / Maritime, iframe PDF, bouton télécharger
// La navbar du site gère la navigation (flèche retour fonctionne)
// ============================================
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Download, Briefcase, Anchor, ArrowLeft } from "lucide-react";
import { useLanguage } from "../i18n/useLanguage";
import "./CvPage.css";

// Onglets avec chemins PDF par langue
const CV_TABS = [
  {
    id: "fullstack",
    labelKey: "cv.tab.fullstack",
    icon: Briefcase,
    pdf: { fr: "/cv-fullstack.pdf", en: "/resume-fullstack.pdf" },
  },
  {
    id: "captain",
    labelKey: "cv.tab.captain",
    icon: Anchor,
    pdf: { fr: "/cv-maritime.pdf", en: "/resume-maritime.pdf" },
  },
] as const;

type CvTabId = typeof CV_TABS[number]["id"];

export function CvPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // L'URL est la SOURCE DE VERITE de l'onglet actif : on la lit a chaque rendu
  // au lieu de la recopier dans un etat local synchronise par un effet.
  // L'ancienne version appelait setActiveTab() dans un useEffect, ce qui
  // provoquait un rendu en cascade (React affichait le mauvais onglet une
  // frame, puis le corrigeait) et declenchait la regle set-state-in-effect.
  // Source : react.dev/learn/you-might-not-need-an-effect
  const activeTab: CvTabId =
    searchParams.get("tab") === "captain" ? "captain" : "fullstack";

  // Changer d'onglet met a jour l'URL ; replace: true evite de polluer
  // l'historique du navigateur a chaque clic
  const setActiveTab = (tab: CvTabId) => {
    setSearchParams({ tab }, { replace: true });
  };

  // PDF selon onglet actif et langue du site
  const currentTab = CV_TABS.find((tab) => tab.id === activeTab)!;
  const pdfLang = lang === "fr" ? "fr" : "en";
  const pdfUrl = currentTab.pdf[pdfLang];
  const pageTitle = lang === "fr" ? "CV | Daren - Hednai" : "Resume | Daren - Hednai";

  return (
    <section className="cv-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={t("cv.subtitle")} />
      </Helmet>

      {/* Lien retour — ramène à la page précédente */}
      <button onClick={() => navigate(-1)} className="cv-page__back">
        <ArrowLeft size={16} />
        {t("cv.back")}
      </button>

      {/* Titre de la page */}
      <div className="cv-page__header">
        <h1 className="cv-page__title">{t("cv.title")}</h1>
        <p className="cv-page__subtitle">{t("cv.subtitle")}</p>
      </div>

      {/* Barre d'actions : onglets + télécharger */}
      <div className="cv-page__toolbar">
        <div className="cv-page__tabs">
          {CV_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`cv-page__tab ${activeTab === tab.id ? "cv-page__tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>

        <a href={pdfUrl} download className="cv-page__download">
          <Download size={16} />
          {t("cv.download")}
        </a>
      </div>

      {/* Viewer PDF — iframe */}
      <div className="cv-page__viewer">
        <iframe
          key={pdfUrl}
          src={pdfUrl}
          className="cv-page__iframe"
          title={t("cv.title")}
        />
      </div>
    </section>
  );
}