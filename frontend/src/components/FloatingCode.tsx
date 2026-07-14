// ============================================
// components/FloatingCode.tsx
// Lignes de code qui defilent en arriere-plan
// Utilise a l'interieur de WaveAnimation
// ============================================
import { motion } from "framer-motion";

// Liste des lignes de code affichees, theme maritime/IA
const codeSnippets = [
  "const ship = await navigate({ route: 'Atlantic' })",
  "ship.optimize(fuelConsumption)",
  "AI.predictRoute(oceanData)",
  "await maritime.connect()",
  "function trackVessel(id) { return sea.stream(id); }",
  "if (storm.detected) { reroute(vessel); }",
  "export const fleet = useFleet({ live: true })",
  "// Maritime AI",
  "wave.amplitude(0.8)",
  "ai: enabled",
];

// Ce composant accepte 2 options :
// - count : combien de lignes afficher (par defaut 6)
// - baseDelay : delai avant que la premiere ligne apparaisse
interface FloatingCodeProps {
  count?: number;
  baseDelay?: number;
}

export default function FloatingCode({ count = 6, baseDelay = 1 }: FloatingCodeProps) {
  return (
    <>
      {/* On prend seulement les "count" premieres lignes de la liste */}
      {codeSnippets.slice(0, count).map((code, i) => (
        <motion.span
          key={i}
          className="floating-code"
          style={{
            // Chaque ligne a une hauteur differente (3 niveaux qui se repetent)
            bottom: `${30 + (i % 3) * 40}px`,
          }}
          animate={{
            // La ligne traverse l'ecran de gauche a droite
            x: ["-200px", "100vw"],
            // Elle apparait, reste visible, puis disparait
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            // Chaque ligne demarre a un moment different
            delay: baseDelay + i * 2.5,
            ease: "linear",
            times: [0, 0.05, 0.9, 1],
          }}
        >
          {code}
        </motion.span>
      ))}
    </>
  );
}
