// ============================================
// layouts/MainLayout.tsx
// Structure commune a toutes les pages : Navbar + contenu + Vagues + Footer
// Enregistre le callback de scroll-to-top lors du changement de mode
// ============================================
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/sections/Navbar";
import { RouteScrollToTop } from "../components/RouteScrollToTop";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/sections/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { useViewMode } from "../context/useViewMode";
import WaveAnimation from "../components/WaveAnimation";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setOnModeChange } = useViewMode();

  // Quand le mode change, retourner a l'accueil et scroller en haut
  useEffect(() => {
    setOnModeChange(() => () => {
      if (location.pathname !== "/") {
        navigate("/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return () => setOnModeChange(null);
  }, [setOnModeChange, navigate, location.pathname]);

  return (
    <>
      <RouteScrollToTop />
      <Navbar />
      {/* Fil d'Ariane — visible uniquement sur les pages interieures */}
      <Breadcrumb />
      <main>{children}</main>
      {/* Vagues animees avec bateau — le footer vit a l'interieur */}
      <WaveAnimation>
        <Footer />
      </WaveAnimation>
      {/* Bouton boussole, visible seulement apres avoir scrolle */}
      <ScrollToTop />
    </>
  );
}