// ============================================
// components/ui/Button.tsx
// Bouton reutilisable partout dans le site
// Variantes : "primary" (noir), "secondary" (contour), "ghost" (discret)
// ============================================
import type { ReactNode } from "react";
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

  // Si un lien (href) est fourni, on affiche un <a> qui ressemble a un bouton
  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  // Sinon, on affiche un vrai <button>
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}