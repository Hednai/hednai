// ============================================
// components/sections/Navbar.tsx
// Barre de navigation horizontale (desktop) + delegation au panneau mobile
// ============================================
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../i18n/useLanguage";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { NAV_LINKS } from "../../data/navLinks";
import { ViewModeToggle } from "../ViewModeToggle";
import { MobileMenu } from "./MobileMenu";
import "./Navbar.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setMenuOpen(false), []);

  useBodyScrollLock(menuOpen);

  // Escape ferme le menu
  useEscapeKey(useCallback(() => {
    if (menuOpen) {
      close();
      burgerRef.current?.focus();
    }
  }, [menuOpen, close]));

  // Clic sur un lien : ancre (#section) ou route interne (/blog)
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      e.preventDefault();
      close();
      navigate(href);
      return;
    }

    if (href === "#contact") {
      e.preventDefault();
      close();
      window.dispatchEvent(new Event("open-contact-modal"));
      return;
    }

    e.preventDefault();
    close();
    const sectionId = href.replace("#", "");

    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  }, [location.pathname, navigate, close]);

  // Scroll spy : souligne le lien de la section visible
  const sectionIds = useMemo(
    () => NAV_LINKS.map((link) => link.href.replace("#", "")),
    [],
  );
  const activeSection = useScrollSpy(sectionIds);

  // Lien actif : partage avec le panneau mobile
  const activeHref = useMemo(() => {
    const trouve = NAV_LINKS.find((link) =>
      link.href.startsWith("#")
        ? location.pathname === "/" && activeSection === link.href.replace("#", "")
        : location.pathname === link.href,
    );
    return trouve ? trouve.href : null;
  }, [location.pathname, activeSection]);

  // Fermer le menu si l'ecran repasse en desktop
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 769px)");
    const onChange = () => { if (mq.matches) close(); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen, close]);

  // Detection du scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${menuOpen ? "navbar--menu-open" : ""}`}>
      <div className="navbar__inner">

        {/* Logo */}
        <a href="#accueil" className="navbar__logo" onClick={(e) => handleNavClick(e, "#accueil")}>
          <img src="/logo-anchor.webp" alt="Hednai" width="36" height="36" />
          <div className="navbar__logo-text">
            <span>Hed<span className="navbar__logo-accent">nai</span></span>
            <span className="navbar__badge">{t("nav.badge")}</span>
          </div>
        </a>

        {/* Bouton burger (mobile) */}
        <button
          ref={burgerRef}
          type="button"
          className="navbar__burger"
          onClick={() => setMenuOpen((ouvert) => !ouvert)}
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation horizontale (desktop, masquee sous 769px) */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className={`navbar__link ${activeHref === link.href ? "navbar__link--active" : ""}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {t(link.labelKey)}
              </a>
            </li>
          ))}

          <li className="navbar__separator" />

          {/* Theme sombre/clair */}
          <li>
            <button
              onClick={toggleTheme}
              className="navbar__theme-btn"
              aria-label={isDark ? t("nav.lightMode") : t("nav.darkMode")}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </li>

          {/* FR | EN */}
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

          {/* Mode Client/Recruteur */}
          <li>
            <ViewModeToggle />
          </li>
        </ul>
      </div>

      {/* Panneau mobile */}
      <MobileMenu
        open={menuOpen}
        onClose={close}
        onNavigate={handleNavClick}
        activeHref={activeHref}
      />
    </nav>
  );
}