//  ====================================
// layouts/MainLayout.tsx
// Structure commune a toutes les pages : Navbar + contenu + Footer + ScrollToTop
// ============================================
import type { ReactNode } from "react";
import { Navbar } from "../components/sections/Navbar";
import { RouteScrollToTop } from "../components/RouteScrollToTop";
import { Breadcrumb } from "../components/Breadcrumb";
import { Contact } from "../components/sections/Contact";
import { ScrollToTop } from "../components/ScrollToTop";
import WaveAnimation from "../components/WaveAnimation";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <RouteScrollToTop />
      <Navbar />
      {/* Fil d'Ariane — visible uniquement sur les pages interieures */}
      <Breadcrumb />
      <main>{children}</main>
      {/* Footer unifie : vagues + bateau + contact + infos */}
      <WaveAnimation>
        <Contact />
      </WaveAnimation>
      {/* Bouton boussole, visible seulement apres avoir scrolle */}
      <ScrollToTop />
    </>
  );
}