// ============================================
// components/sections/MobileMenu.tsx
// Panneau de navigation mobile, monte dans <body> par createPortal
// ============================================
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Home, Target, User, Map, LayoutGrid, Briefcase, Mail, BookOpen, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../i18n/useLanguage";
import { NAV_LINKS } from "../../data/navLinks";
import { ViewModeToggle } from "../ViewModeToggle";
import "./MobileMenu.css";

// Table d'icones par nom de lien
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={20} />,
  Target: <Target size={20} />,
  User: <User size={20} />,
  Map: <Map size={20} />,
  LayoutGrid: <LayoutGrid size={20} />,
  Briefcase: <Briefcase size={20} />,
  Mail: <Mail size={20} />,
  BookOpen: <BookOpen size={20} />,
};

// Elements pouvant recevoir le focus, pour le piege au clavier
const FOCUSABLES = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  activeHref: string | null;
}

export function MobileMenu({ open, onClose, onNavigate, activeHref }: MobileMenuProps) {
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);

  // Ouvre le formulaire de contact et referme le panneau
  const ouvrirContact = useCallback(() => {
    onClose();
    window.dispatchEvent(new Event("open-contact-modal"));
  }, [onClose]);

  // Focus initial et piege au clavier (WCAG 2.1.2)
  useEffect(() => {
    if (!open) return;
    const panneau = panelRef.current;
    if (!panneau) return;

    const premier = panneau.querySelector<HTMLElement>(FOCUSABLES);
    premier?.focus();

    const surTabulation = (evenement: KeyboardEvent) => {
      if (evenement.key !== "Tab") return;

      const cibles = Array.from(panneau.querySelectorAll<HTMLElement>(FOCUSABLES));
      if (cibles.length === 0) return;

      const debut = cibles[0];
      const fin = cibles[cibles.length - 1];

      if (!evenement.shiftKey && document.activeElement === fin) {
        evenement.preventDefault();
        debut.focus();
      } else if (evenement.shiftKey && document.activeElement === debut) {
        evenement.preventDefault();
        fin.focus();
      }
    };

    document.addEventListener("keydown", surTabulation);
    return () => document.removeEventListener("keydown", surTabulation);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="mobile-menu">
      {/* Voile */}
      <div className="mobile-menu__backdrop" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        id="navbar-menu"
        className="mobile-menu__panel"
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.menuLabel")}
      >
        {/* En-tete */}
        <div className="mobile-menu__header">
          <span className="mobile-menu__brand">
            Hed<span className="mobile-menu__brand-accent">nai</span>
          </span>
          <button
            type="button"
            className="mobile-menu__close"
            onClick={onClose}
            aria-label={t("nav.closeMenu")}
          >
            <X size={22} />
          </button>
        </div>

        {/* Liens de navigation */}
        <nav className="mobile-menu__nav">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.key}
              href={link.href}
              className={`mobile-menu__link ${
                activeHref === link.href ? "mobile-menu__link--active" : ""
              }`}
              onClick={(evenement) => onNavigate(evenement, link.href)}
              style={{ "--ordre": index } as React.CSSProperties}
            >
              <span className="mobile-menu__link-icon">{iconMap[link.icon]}</span>
              <span className="mobile-menu__link-label">{t(link.labelKey)}</span>
            </a>
          ))}
        </nav>

        {/* Appel a l'action */}
        <button type="button" className="mobile-menu__cta" onClick={ouvrirContact}>
          {t("nav.contactCta")}
        </button>

        {/* Reglages : theme, langue, mode client/recruteur */}
        <div className="mobile-menu__settings">
          <button
            type="button"
            className="mobile-menu__theme"
            onClick={toggleTheme}
            aria-label={isDark ? t("nav.lightMode") : t("nav.darkMode")}
          >
            {isDark ? t("nav.lightMode") : t("nav.darkMode")}
          </button>

          <div className="mobile-menu__lang">
            <button
              type="button"
              onClick={() => lang !== "fr" && toggleLang()}
              className={`mobile-menu__lang-btn ${
                lang === "fr" ? "mobile-menu__lang-btn--active" : ""
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => lang !== "en" && toggleLang()}
              className={`mobile-menu__lang-btn ${
                lang === "en" ? "mobile-menu__lang-btn--active" : ""
              }`}
            >
              EN
            </button>
          </div>

          <ViewModeToggle />
        </div>
      </div>
    </div>,
    document.body,
  );
}