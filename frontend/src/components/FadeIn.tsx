// ============================================
// components/FadeIn.tsx
// Animation d'apparition en fondu au scroll
// Utilise Framer Motion — s'active quand l'element entre dans l'ecran
// ============================================
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0
}: {
  children: ReactNode;
  delay?: number;
}) {

  return (
    <motion.div
      // Etat de depart : invisible et decale vers le bas
      initial={{ opacity: 0, y: 30 }}

      // Etat final quand l'element devient visible a l'ecran
      whileInView={{ opacity: 1, y: 0 }}

      // Ne joue l'animation qu'une seule fois, meme en re-scrollant
      viewport={{
        once: true,
        margin: "-50px"
      }}

      // Duree et douceur de l'animation
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}