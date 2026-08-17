// ============================================
// pages/Home.tsx
// Page d'accueil — assemble les sections dans l'ordre d'affichage
// ============================================
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/useLanguage";
import { Hero } from "../components/sections/Hero";
import { WhyHednai } from "../components/sections/WhyHednai";
import { About } from "../components/sections/About";
import { Roadmap } from "../components/sections/Roadmap";
import { Services } from "../components/sections/Services";
import { Portfolio } from "../components/sections/Portfolio";
import { Testimonials } from "../components/sections/Testimonials";
import { CtaBanner } from "../components/sections/CtaBanner";

export function Home() {
  const { t } = useLanguage();
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

      {/* About et Roadmap cote a cote sur grand ecran */}
      <section className="about-roadmap-row">
        <div className="container about-roadmap-row__inner">
          <div className="about-roadmap-row__left">
            <About />
          </div>
          <div className="about-roadmap-row__right">
            <Roadmap />
          </div>
        </div>
      </section>

      <Services />
      <Portfolio />
      <Testimonials />
      <CtaBanner />
    </>
  );
}