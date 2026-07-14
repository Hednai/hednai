// ============================================
// components/ScrollToTop.tsx
// Bouton boussole maritime — retour en haut de page
// Apparait seulement quand on a scrolle assez bas
// ============================================
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./ScrollToTop.css";

export function ScrollToTop() {
  const { t } = useLanguage();

  // Le bouton est visible ou pas selon la position du scroll
  const [visible, setVisible] = useState(false);
  // Pour savoir si la souris survole le bouton (fait bouger l'aiguille)
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Afficher le bouton seulement apres 600px de scroll
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Remonter en haut de la page en douceur
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="compass-btn"
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={t("scrollToTop")}
          title={t("scrollToTop")}

          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Anneau de pulsation au survol */}
          <div className="compass-btn__pulse" />

          {/* Lueur ambiante qui tourne en continu */}
          <div className="compass-btn__glow" />

          {/* Le corps de la boussole */}
          <div className="compass-btn__ring" />

          {/* Les 4 petits traits cardinaux */}
          <div className="compass-btn__ticks">
            <div className="compass-btn__tick compass-btn__tick--n" />
            <div className="compass-btn__tick compass-btn__tick--e" />
            <div className="compass-btn__tick compass-btn__tick--s" />
            <div className="compass-btn__tick compass-btn__tick--w" />
          </div>

          {/* La lettre "N" en haut */}
          <span className="compass-btn__north-label">N</span>

          {/* L'aiguille */}
          <motion.div
            className="compass-btn__needle"
            animate={
              hovered
                ? { rotate: [0, -15, 12, -8, 5, -2, 0] }
                : { rotate: 0 }
            }
            transition={
              hovered
                ? { duration: 0.8, ease: "easeOut" }
                : { duration: 0.4, ease: "easeOut" }
            }
          >
            <div className="compass-btn__needle-north" />
            <div className="compass-btn__needle-south" />
          </motion.div>

          {/* Le petit point central */}
          <div className="compass-btn__pin" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
