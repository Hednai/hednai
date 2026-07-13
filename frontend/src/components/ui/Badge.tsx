// ============================================
// components/ui/Badge.tsx
// Badge reutilisable pour afficher un label court
// Utilise par exemple pour afficher les technologies d'un projet
// ============================================
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        background: "var(--tag-bg)",
        color: "var(--text-secondary)",
        padding: "2px 10px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}