// ============================================
// components/sections/Navbar.tsx
// Barre de navigation — style icones + soulignement actif
// Toggle theme en cercle, FR | EN separes
// ============================================
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Home, LayoutGrid, Briefcase, Mail } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../i18n/LanguageContext";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { NAV_LINKS } from "../../data/navLinks";
import "./Navbar.css";

// Associe chaque nom d'icone (string) a son composant Lucide
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={18} />,
  LayoutGrid: <LayoutGrid size={18} />,
  Briefcase: <Briefcase size={18} />,
  Mail: <Mail size={18} />,
};

export function Navbar() {
  // Le scroll a depasse 50px : on change le fond de la navbar
  const [scrolled, setScrolled] = useState(false);
  // Le menu mobile est ouvert ou ferme
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();

  // Detecte quelle section est visible a l'ecran (pour souligner le bon lien)
  const activeSection = useScrollSpy(
    NAV_LINKS.map((link) => link.href.replace("#", "")),
  );

  // Detecter si l'utilisateur a scrolle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu mobile quand on clique sur un lien
  const close = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">

        {/* Logo */}
        <a href="#accueil" className="navbar__logo">
          <img src="/logo-anchor.png" alt="Hednai" />
          <span>Hed<span style={{ color: "hsl(195 100% 45%)" }}>nai</span></span>
        </a>

        {/* Bouton burger pour mobile */}
        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Liste des liens */}
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => {
            // Verifier si ce lien correspond a la section visible
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={link.key}>
                <a
                  href={link.href}
                  className={`navbar__link ${isActive ? "navbar__link--active" : ""}`}
                  onClick={close}
                >
                  {/* Icone a cote du texte */}
                  {iconMap[link.icon]}
                  {t(link.labelKey)}
                </a>
              </li>
            );
          })}

          {/* Separateur vertical entre les liens et les boutons */}
          <li className="navbar__separator" />

          {/* Bouton theme sombre/clair en forme de cercle */}
          <li>
            <button
              onClick={toggleTheme}
              className="navbar__theme-btn"
              aria-label={isDark ? "Mode clair" : "Mode sombre"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </li>

          {/* Boutons FR | EN separes */}
          <li>
            <div className="navbar__lang-group">
              <button
                onClick={() => lang !== "fr" && toggleLang()}
                className={`navbar__lang-btn ${lang === "fr" ? "navbar__lang-btn--active" : ""}`}
              >
                FR
              </button>
              <span className="navbar__lang-sep">|</span>
              <button
                onClick={() => lang !== "en" && toggleLang()}
                className={`navbar__lang-btn ${lang === "en" ? "navbar__lang-btn--active" : ""}`}
              >
                EN
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}