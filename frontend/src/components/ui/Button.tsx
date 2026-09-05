// ============================================
// components/ui/Button.tsx
// Bouton reutilisable partout dans le site
// Variantes : "primary" (noir), "secondary" (contour), "ghost" (discret)
// ============================================
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const classes = `btn btn--${variant} ${fullWidth ? "btn--full" : ""} ${className}`;

  // Si un lien (href) est fourni, on affiche un lien qui ressemble a un bouton.
  // On distingue deux cas, car ils n'ont pas du tout le meme comportement :
  //   - route interne ("/blog", "/cv") -> <Link> de React Router, navigation
  //     cote client, aucun rechargement de page
  //   - lien externe, ancre, mailto, tel -> <a> classique, c'est le navigateur
  //     qui doit s'en charger
  if (href) {
    const estInterne =
      href.startsWith("/") && !href.startsWith("//");

    if (estInterne) {
      return (
        <Link to={href} className={classes} onClick={onClick}>
          {children}
        </Link>
      );
    }

    // Lien sortant : rel="noopener noreferrer" empeche la page cible
    // d'acceder a window.opener (faille de type "tabnabbing")
    const estExterne = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(estExterne
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  // Sinon, on affiche un vrai <button>
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}