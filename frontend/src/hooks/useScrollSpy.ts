// ============================================
// hooks/useScrollSpy.ts
// Detecte quelle section est visible dans le viewport
// Utilise pour surligner le lien actif dans la Navbar
// ============================================
import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[]) {
  // Id de la section actuellement visible a l'ecran
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // IntersectionObserver = outil du navigateur qui detecte
    // quand un element entre ou sort de l'ecran
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    // On demande a l'observer de surveiller chaque section de la page
    for (const id of sectionIds) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    // Nettoyage : arreter d'observer quand le composant est retire
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}