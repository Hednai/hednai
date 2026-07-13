// ============================================
// components/ui/Card.tsx
// Conteneur generique de type "carte"
// Ne gere que l'aspect visuel — le contenu vient des enfants (children)
// ============================================
import type { ReactNode } from "react";
import "./Card.css";

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  className?: string;
}

export function Card({ children, hoverable = true, className = "" }: CardProps) {
  return (
    <div className={`card ${hoverable ? "card--hoverable" : ""} ${className}`}>
      {children}
    </div>
  );
}