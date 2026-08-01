// ============================================
// components/RadarAnimation.tsx
// Radar sonar avec sweep rotatif et blips echo
// ============================================
import { motion } from "framer-motion";
import "./RadarAnimation.css";

// Duree d'une rotation complete en secondes
const SWEEP_DURATION = 8;

// Calcule le delai pour que l'echo apparaisse APRES le passage du sweep
function getAngleDelay(left: number, top: number) {
  const dx = left - 50;
  const dy = top - 50;

  // Angle en degres (sens horaire depuis la droite)
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Normaliser entre 0 et 360
  if (angle < 0) {
    angle += 360;
  }

  // Convertir l'angle en delai dans le cycle du sweep
  return (angle / 360) * SWEEP_DURATION;
}

// Positions des echos (% depuis le coin haut-gauche) + labels
const echoPoints = [
  { top: 10, left: 48, label: "Daren" },
  { top: 20, left: 62, label: "Sea" },
  { top: 35, left: 28, label: "Ship" },
  { top: 55, left: 72, label: "Dev" },
  { top: 72, left: 38, label: "AI" },
  { top: 45, left: 55, label: "Hednai" },
  { top: 68, left: 70, label: "MCS" },
].map((p) => ({
  ...p,
  delay: getAngleDelay(p.left, p.top),
}));

export function RadarAnimation() {
  return (
    <div className="radar">

      {/* Anneaux concentriques — 4 cercles */}
      {[1, 0.75, 0.5, 0.25].map((scale, i) => (
        <div
          key={i}
          className="radar__ring"
          style={{
            transform: `scale(${scale})`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Ligne de sweep — tourne sur 360° */}
      <div className="radar__sweep">
        <div className="radar__sweep-line" />
        <div className="radar__sweep-glow" />
      </div>

      {/* Point central */}
      <motion.div
        className="radar__center"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Blips echo — apparaissent APRES le passage du sweep */}
      {echoPoints.map((echo, i) => (
        <motion.div
          key={i}
          className="radar__echo"
          style={{ top: `${echo.top}%`, left: `${echo.left}%` }}
          animate={{
            opacity: [0, 0, 1, 1, 0.6, 0.3, 0],
          }}
          transition={{
            duration: SWEEP_DURATION,
            repeat: Infinity,
            delay: echo.delay + 0.15,
            times: [0, 0.01, 0.04, 0.25, 0.45, 0.65, 0.95],
          }}
        >
          {/* Point du blip */}
          <div className="radar__blip">
            <div className="radar__blip-dot" />
            <motion.div
              className="radar__blip-ring"
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: echo.delay + 0.15,
              }}
            />
          </div>

          {/* Label */}
          <span className="radar__label">{echo.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
