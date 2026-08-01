// ============================================
// components/WaveAnimation.tsx
// Zone de vagues animees avec bateau et particules
// Utilise autour de la section Contact
// ============================================
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Ship } from "lucide-react";

import FloatingCode from "./FloatingCode";
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
          <motion.path
            fill="hsl(195 100% 35% / 0.06)"
            animate={{
              d: [
                "M0,580 C180,575 360,585 540,580 C720,575 900,570 1080,575 C1260,580 1380,585 1440,580 L1440,600 L0,600 Z",
                "M0,140 C260,90 440,160 620,100 C800,55 980,140 1160,85 C1300,110 1400,65 1440,120 L1440,600 L0,600 Z",
                "M0,120 C100,80 280,150 460,100 C640,60 820,130 1000,90 C1180,120 1360,70 1440,110 L1440,600 L0,600 Z",
                "M0,150 C220,95 400,165 580,105 C760,58 940,135 1120,88 C1280,115 1390,68 1440,115 L1440,600 L0,600 Z",
                "M0,580 C180,575 360,585 540,580 C720,575 900,570 1080,575 C1260,580 1380,585 1440,580 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.45, 0.6, 1],
            }}
          />
          <motion.path
            fill="hsl(195 100% 35% / 0.12)"
            animate={{
              d: [
                "M0,585 C200,580 400,590 600,585 C800,580 1000,575 1200,580 C1350,585 1420,582 1440,585 L1440,600 L0,600 Z",
                "M0,210 C280,155 460,235 680,175 C880,135 1060,215 1280,165 C1380,190 1430,150 1440,195 L1440,600 L0,600 Z",
                "M0,195 C120,165 300,225 520,185 C720,145 900,210 1120,175 C1300,200 1410,158 1440,185 L1440,600 L0,600 Z",
                "M0,220 C240,160 420,240 640,180 C840,138 1020,218 1240,168 C1360,192 1425,152 1440,192 L1440,600 L0,600 Z",
                "M0,585 C200,580 400,590 600,585 C800,580 1000,575 1200,580 C1350,585 1420,582 1440,585 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.28, 0.42, 0.58, 1],
              delay: 0.8,
            }}
          />
          <motion.path
            fill="hsl(195 100% 35% / 0.22)"
            animate={{
              d: [
                "M0,588 C240,584 480,592 720,588 C960,584 1200,580 1440,588 L1440,600 L0,600 Z",
                "M0,330 C320,275 560,355 800,295 C1040,265 1280,345 1440,305 L1440,600 L0,600 Z",
                "M0,310 C160,285 400,345 640,305 C880,272 1120,340 1440,315 L1440,600 L0,600 Z",
                "M0,325 C280,280 520,350 760,300 C1000,268 1240,342 1440,310 L1440,600 L0,600 Z",
                "M0,588 C240,584 480,592 720,588 C960,584 1200,580 1440,588 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.4, 0.55, 1],
              delay: 1.5,
            }}
          />
          <motion.path
            fill="hsl(195 100% 35% / 0.35)"
            animate={{
              d: [
                "M0,592 C300,588 600,596 900,592 C1100,588 1300,590 1440,592 L1440,600 L0,600 Z",
                "M0,435 C380,398 660,455 980,415 C1160,390 1340,445 1440,420 L1440,600 L0,600 Z",
                "M0,425 C200,405 480,448 760,422 C1000,398 1260,442 1440,430 L1440,600 L0,600 Z",
                "M0,440 C340,402 620,452 940,418 C1120,393 1320,443 1440,425 L1440,600 L0,600 Z",
                "M0,592 C300,588 600,596 900,592 C1100,588 1300,590 1440,592 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.27, 0.43, 0.58, 1],
              delay: 2,
            }}
          />
          <motion.path
            fill="none"
            stroke="hsl(195 100% 35%)"
            strokeWidth="1.2"
            strokeOpacity="0.25"
            animate={{
              d: [
                "M0,592 C300,588 600,596 900,592 C1100,588 1300,590 1440,592",
                "M0,435 C380,398 660,455 980,415 C1160,390 1340,445 1440,420",
                "M0,425 C200,405 480,448 760,422 C1000,398 1260,442 1440,430",
                "M0,440 C340,402 620,452 940,418 C1120,393 1320,443 1440,425",
                "M0,592 C300,588 600,596 900,592 C1100,588 1300,590 1440,592",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.27, 0.43, 0.58, 1],
              delay: 2,
            }}
          />
          <motion.path
            fill="hsl(185 100% 45% / 0.08)"
            animate={{
              d: [
                "M0,590 C360,586 720,594 1080,590 C1260,587 1380,592 1440,590 L1440,600 L0,600 Z",
                "M0,290 C440,238 800,315 1160,255 C1300,235 1400,285 1440,265 L1440,600 L0,600 Z",
                "M0,275 C200,245 560,305 920,268 C1120,242 1340,295 1440,275 L1440,600 L0,600 Z",
                "M0,285 C380,242 740,312 1100,258 C1280,238 1390,288 1440,268 L1440,600 L0,600 Z",
                "M0,590 C360,586 720,594 1080,590 C1260,587 1380,592 1440,590 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.47, 0.62, 1],
              delay: 0.3,
            }}
          />
        </svg>

        {/* Ligne fine en bas de la zone */}
        <div className="wave-base" />
      </div>
    </div>
  );
}
