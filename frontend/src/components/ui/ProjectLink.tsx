// ============================================
// components/ui/ProjectLink.tsx
// Lien d'action d'un projet : site en ligne ou depot de code
// Rend un lien cliquable si l'URL est publiee, sinon un libelle gele
// (visible, non cliquable) pour les projets sans lien public
// ============================================
import type { MouseEvent, ReactNode } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { isLinkAvailable } from "../../utils/links";
import "./ProjectLink.css";

interface ProjectLinkProps {
  url: string;
  icon: ReactNode;
  label: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export function ProjectLink({ url, icon, label, className, onClick }: ProjectLinkProps) {
  const { t } = useLanguage();

  // Lien non publie : element inerte, annonce comme desactive aux lecteurs d'ecran
  if (!isLinkAvailable(url)) {
    return (
      <span
        className={["project-link--frozen", className].filter(Boolean).join(" ")}
        aria-disabled="true"
        title={t("portfolio.link.soon")}
      >
        {icon} {label}
      </span>
    );
  }

  // Liens sortants : target="_blank" + rel="noopener noreferrer".
  // Sans "noopener", la page ouverte peut manipuler window.opener
  // et rediriger l'onglet d'origine (attaque dite "tabnabbing").
  // Source : owasp.org/www-community/attacks/Reverse_Tabnabbing
  return (
    <a href={url} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {icon} {label}
    </a>
  );
}