// ============================================
// components/sections/Navbar.tsx
// Barre de navigation — style icones + soulignement actif
// Toggle theme en cercle, FR | EN separes
// ============================================
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Home, Target, User, Map, LayoutGrid, Briefcase, Mail, BookOpen } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../i18n/useLanguage";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { NAV_LINKS } from "../../data/navLinks";
import { ViewModeToggle } from "../ViewModeToggle";
import "./Navbar.css";

// Associe chaque nom d'icone (string) a son composant Lucide
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={18} />,
  Target: <Target size={18} />,
  User: <User size={18} />,
  Map: <Map size={18} />,
  LayoutGrid: <LayoutGrid size={18} />,
  Briefcase: <Briefcase size={18} />,
  Mail: <Mail size={18} />,
  BookOpen: <BookOpen size={18} />,
};

export function Navbar() {
  // Le scroll a depasse 50px : on change le fond de la navbar
  const [scrolled, setScrolled] = useState(false);
  // Le menu mobile est ouvert ou ferme
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();

  // Navigation SPA : si on est sur /blog ou /solutions, revenir à "/" avant de scroller
  const location = useLocation();
  const navigate = useNavigate();

  // Fermer le menu mobile quand on clique sur un lien
  const close = () => setMenuOpen(false);

  // Gere le clic sur un lien — ancre (#section) ou route interne (/blog)
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Lien vers une route interne (ex: /blog, /solutions) — navigation SPA
    if (!href.startsWith("#")) {
      e.preventDefault();
      close();
      navigate(href);
      return;
    }

    // Lien ancre (#section) — scroll smooth
    e.preventDefault();
    close();
    const sectionId = href.replace("#", "");

    // Si on est deja sur la page d'accueil, scroller directement
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Sinon, naviguer vers "/" puis scroller apres le chargement
      navigate("/", { state: { scrollTo: sectionId } });
    }
  }, [location.pathname, navigate]);

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

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">

        {/* Logo + badge identitaire */}
        <a href="#accueil" className="navbar__logo" onClick={(e) => handleNavClick(e, "#accueil")}>
          <img src="/logo-anchor.png" alt="Hednai" />
          <div className="navbar__logo-text">
            <span>Hed<span style={{ color: "hsl(195 100% 45%)" }}>nai</span></span>
            <span className="navbar__badge">{t("nav.badge")}</span>
          </div>
        </a>

        {/* Bouton burger pour mobile */}
        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
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
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {/* Icone visible uniquement sur mobile (cachee en desktop via CSS) */}
                  <span className="navbar__link-icon">{iconMap[link.icon]}</span>
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
              aria-label={isDark ? t("nav.lightMode") : t("nav.darkMode")}
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

          {/* Mode Client/Recruteur — extreme droite */}
          <li>
            <ViewModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}