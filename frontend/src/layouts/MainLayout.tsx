// ============================================
// layouts/MainLayout.tsx
// Structure commune a toutes les pages : Navbar + contenu + Footer + ScrollToTop
// ============================================
import type { ReactNode } from "react";
import { Navbar } from "../components/sections/Navbar";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/sections/Footer";
import { ScrollToTop } from "../components/ScrollToTop";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      {/* Fil d'Ariane — visible uniquement sur les pages interieures */}
      <Breadcrumb />
      <main>{children}</main>
      <Footer />
      {/* Bouton boussole, visible seulement apres avoir scrolle */}
      <ScrollToTop />
    </>
  );
}