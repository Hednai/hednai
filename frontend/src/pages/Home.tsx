// ============================================
// pages/Home.tsx
// Page d'accueil — assemble les sections dans l'ordre d'affichage
// ============================================
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";
import { Hero } from "../components/sections/Hero";
import { WhyHednai } from "../components/sections/WhyHednai";
import { About } from "../components/sections/About";
import { Services } from "../components/sections/Services";
import { Portfolio } from "../components/sections/Portfolio";
import { Contact } from "../components/sections/Contact";
import WaveAnimation from "../components/WaveAnimation";

export function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("seo.home.title")}</title>
        <meta name="description" content={t("seo.home.desc")} />
      </Helmet>
      <Hero />
      <WhyHednai />
      <About />
      <Services />
      <Portfolio />

      {/* Contact est enveloppe dans les vagues animees */}
      <WaveAnimation>
        <Contact />
      </WaveAnimation>
    </>
  );
}