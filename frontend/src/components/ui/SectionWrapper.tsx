// ============================================
// components/ui/SectionWrapper.tsx
// Enveloppe une section avec titre, sous-titre et conteneur
// Chaque section du site l'utilise → espacement et mise en page coherents
// ============================================
import type { ReactNode } from "react";
import "./SectionWrapper.css";

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  gray?: boolean; // fond alterne (gris ou blanc)
  children: ReactNode;
}

export function SectionWrapper({ id, title, subtitle, gray = false, children }: SectionWrapperProps) {
  return (
    <section className={`section ${gray ? "section--gray" : ""}`} id={id}>
      <div className="container">
        <h2 className="section__title">{title}</h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}