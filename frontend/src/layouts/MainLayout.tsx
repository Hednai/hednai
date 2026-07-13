// ============================================
// layouts/MainLayout.tsx
// Structure commune a toutes les pages : Navbar + contenu + Footer
// ============================================
import type { ReactNode } from "react";
import { Navbar } from "../components/sections/Navbar";
import { Footer } from "../components/sections/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}