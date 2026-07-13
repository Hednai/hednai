// ============================================
// components/sections/Navbar.tsx
// Barre de navigation avec toggle FR/EN simple
// Pattern : toggle langue v6 (remplace les drapeaux)
// ============================================
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../i18n/LanguageContext";
import { NAV_LINKS } from "../../data/navLinks";
import "./Navbar.css";

export function Navbar() {
  // State local du composant
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();

  // Detecter si l'utilisateur a scrolle, pour changer le style de la navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu mobile (utilise quand on clique sur un lien)
  const close = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#accueil" className="navbar__logo">
          <img src="/logo-anchor.png" alt="Hednai" />
          <span>Hed<span style={{ color: "hsl(195 100% 45%)" }}>nai</span></span>
        </a>

        {/* Bouton menu burger, visible seulement sur mobile */}
        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Liste des liens de navigation */}
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className={link.key === "contact" ? "navbar__cta" : "navbar__link"}
                onClick={close}
              >
                {t(link.labelKey)}
              </a>
            </li>
          ))}

          {/* Theme sombre/clair */}
          <li className="navbar__toggles">
            <button
              onClick={toggleTheme}
              className="navbar__toggle-btn"
              aria-label={isDark ? "Mode clair" : "Mode sombre"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Toggle langue FR/EN simple */}
            <button
              onClick={toggleLang}
              className="navbar__toggle-btn navbar__lang-btn"
              aria-label="Changer de langue"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}