// ============================================
// pages/Home.tsx
// Page d'accueil — assemble les sections dans l'ordre d'affichage
// ============================================
import { Hero } from "../components/sections/Hero";
import { WhyHednai } from "../components/sections/WhyHednai";
import { Services } from "../components/sections/Services";
import { Portfolio } from "../components/sections/Portfolio";
import { Contact } from "../components/sections/Contact";
import WaveAnimation from "../components/WaveAnimation";

export function Home() {
  return (
    <>
      <Hero />
      <WhyHednai />
      <Services />
      <Portfolio />

      {/* Contact est enveloppe dans les vagues animees */}
      <WaveAnimation>
        <Contact />
      </WaveAnimation>
    </>
  );
}