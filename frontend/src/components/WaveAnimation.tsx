// ============================================
// components/WaveAnimation.tsx
// Zone de vagues animees avec bateau et particules
// Utilise autour de la section Contact
// ============================================
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Ship } from "lucide-react";

import FloatingCode from "./FloatingCode";
import { WAVE_LAYERS } from "../data/waveLayers";
import "./WaveAnimation.css";

// Ce composant peut recevoir un contenu a l'interieur (ex: le formulaire Contact)
interface WaveAnimationProps {
  children?: ReactNode;
}

export default function WaveAnimation({ children }: WaveAnimationProps) {
  return (
    <div className="wave-container">

      {/* Le contenu passe en enfant (ex: Contact) s'affiche au-dessus des vagues */}
      {children && (
        <div className="wave-content">
          {children}
        </div>
      )}

      {/* Zone des vagues, derriere le contenu */}
      <div className="wave-inner">

        {/* Lignes de code qui defilent en arriere-plan */}
        <FloatingCode count={6} baseDelay={1} />

        {/* Le bateau qui flotte sur les vagues */}
        <motion.div
          className="wave-boat"
          style={{ left: "42%" }}
          animate={{
            bottom: ["20px", "470px", "485px", "475px", "20px"],
            x: [0, -40, 30, -20, 0],
            rotate: [0, -8, 6, -4, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.45, 0.6, 1],
          }}
        >
          {/* Le bateau tangue un peu sur lui-meme */}
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Ship size={32} />
          </motion.div>
        </motion.div>

        {/* 10 petites particules qui montent comme des bulles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="wave-particle"
            style={{
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              left: `${8 + (i * 9) % 85}%`,
              bottom: "80px",
              background:
                i % 2 === 0
                  ? "hsl(195 100% 35%)"
                  : "hsl(185 100% 45%)",
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -120, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Petits textes techniques qui flottent */}
        {["≋AI", "01", "∿∿", "ML"].map((txt, i) => (
          <motion.span
            key={`tech-${i}`}
            className="wave-tech-text"
            style={{
              left: `${15 + i * 22}%`,
              bottom: "100px",
            }}
            animate={{
              opacity: [0, 0.18, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          >
            {txt}
          </motion.span>
        ))}

        {/* Le SVG des vagues : plusieurs couches pour un effet de profondeur */}
        <svg
          className="wave-svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{ height: "600px" }}
        >
          {/* Les six couches de vagues, generees depuis WAVE_LAYERS.

              CORRECTIF DES SIX ERREURS CONSOLE :
              "<path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\""

              L'ancien code declarait animate={{ d: [...] }} sans jamais fournir
              d'attribut "d" ni de prop "initial". Motion doit lire une valeur de
              depart avant de pouvoir animer ; ne trouvant rien sur l'element, il
              ecrivait litteralement d="undefined", que le moteur SVG rejette.
              Six <motion.path> = six erreurs, exactement ce que montrait la console.

              La correction est de fournir la valeur initiale. Comme "animate" est
              un tableau d'images cles, la valeur de depart est par definition la
              PREMIERE image cle : on la pose donc dans l'attribut d.
              Source : motion.dev/docs/react-animation#keyframes
                       ("the first keyframe is the initial value") */}
          {WAVE_LAYERS.map((couche) => (
            <motion.path
              key={couche.id}
              // Valeur initiale = premiere image cle : plus de d="undefined"
              d={couche.keyframes[0]}
              fill={couche.fill}
              stroke={couche.stroke}
              strokeWidth={couche.strokeWidth}
              strokeOpacity={couche.strokeOpacity}
              animate={{ d: couche.keyframes }}
              transition={{
                duration: couche.duration,
                repeat: Infinity,
                ease: "easeInOut",
                times: couche.times,
                delay: couche.delay,
              }}
            />
          ))}
        </svg>

        {/* Ligne fine en bas de la zone */}
        <div className="wave-base" />
      </div>
    </div>
  );
}
