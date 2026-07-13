// ============================================
// components/ui/Skeleton.tsx
// Placeholder de chargement anime
// Affiche un rectangle gris qui "pulse" en attendant le vrai contenu
// ============================================

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "var(--radius-sm)",
}: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "var(--bg-gray)",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}