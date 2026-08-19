// ============================================
// pages/Home.tsx
// Page d'accueil — assemble les sections dans l'ordre d'affichage
// ============================================
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/useLanguage";
import { useViewMode } from "../context/useViewMode";
import { Hero } from "../components/sections/Hero";
import { WhyHednai } from "../components/sections/WhyHednai";
import { About } from "../components/sections/About";
import { Services } from "../components/sections/Services";
import { Portfolio } from "../components/sections/Portfolio";
import { Testimonials } from "../components/sections/Testimonials";
import { CtaBanner } from "../components/sections/CtaBanner";
import { ProfileSection } from "../components/sections/ProfileSection";

export function Home() {
  const { t } = useLanguage();
  const { isRecruiter } = useViewMode();
  const location = useLocation();

  // Si on arrive depuis une autre page avec un scrollTo, scroller vers la section
  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo) {
      // Petit delai pour laisser le DOM se charger
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      // Nettoyer le state pour eviter de re-scroller
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Helmet>
        <title>{t("seo.home.title")}</title>
        <meta name="description" content={t("seo.home.desc")} />
      </Helmet>
      <Hero />
      <WhyHednai />

      {/* Mode client : About avec cartes expandables (parcours + roadmap) */}
      {/* Mode recruteur : ProfileSection (photo + timeline parcours) */}
      {!isRecruiter ? (
        <About />
      ) : (
        <ProfileSection />
      )}

      <Services />
      <Portfolio />

      {/* Temoignages — mode client uniquement */}
      {!isRecruiter && <Testimonials />}

      <CtaBanner />
    </>
  );
}