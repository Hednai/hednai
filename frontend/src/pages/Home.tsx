// ============================================
// pages/Home.tsx
// Page d'accueil — assemble les sections dans l'ordre d'affichage
// ============================================
import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { Portfolio } from "../components/sections/Portfolio";
import { Contact } from "../components/sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </>
  );
}