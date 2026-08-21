// ============================================
// components/sections/MapleBanner.tsx
// Bandeau decoratif bleu marine avec feuille d'erable en filigrane
// Separateur visuel entre le contenu principal et le contact
// ============================================
import "./MapleBanner.css";

export function MapleBanner() {
  return (
    <section className="maple-banner" aria-hidden="true">
      {/* Feuille d'erable droite, grande, en filigrane */}
      <svg
        className="maple-banner__leaf maple-banner__leaf--right"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M50 3L45 20L30 10L38 28L20 25L35 35L15 40L35 45L25 55L40 50L38 70L45 55L50 97L55 55L62 70L60 50L75 55L65 45L85 40L65 35L80 25L62 28L70 10L55 20Z"
        />
      </svg>
      {/* Feuille d'erable gauche, plus petite */}
      <svg
        className="maple-banner__leaf maple-banner__leaf--left"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M50 3L45 20L30 10L38 28L20 25L35 35L15 40L35 45L25 55L40 50L38 70L45 55L50 97L55 55L62 70L60 50L75 55L65 45L85 40L65 35L80 25L62 28L70 10L55 20Z"
        />
      </svg>
    </section>
  );
}
