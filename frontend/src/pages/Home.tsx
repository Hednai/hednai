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

      {/* Retours + CTA sur fond bleu marine avec feuille d'erable */}
      <div className="maple-section">
        <svg className="maple-section__leaf maple-section__leaf--right" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z" />
        </svg>
        <svg className="maple-section__leaf maple-section__leaf--left" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z" />
        </svg>
        {!isRecruiter && <Testimonials />}
        <CtaBanner />
      </div>
    </>
  );
}