// ============================================
// components/sections/Footer.tsx
// Pied de page : logo, navigation, copyright
// ============================================
import { useLanguage } from "../../i18n/LanguageContext";
import { NAV_LINKS } from "../../data/navLinks";
import "./Footer.css";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Logo (meme image que la Navbar) */}
        <div className="footer__logo">
          <img src="/logo-anchor.png" alt="Hednai" />
          <span>Hednai</span>
        </div>

        {/* Meme navigation que la Navbar, reutilisee ici */}
        <nav className="footer__links">
          {NAV_LINKS.map((link) => (
            <a key={link.key} href={link.href}>{t(link.labelKey)}</a>
          ))}
        </nav>

        {/* Annee generee automatiquement, jamais a mettre a jour a la main */}
        <p>&copy; {new Date().getFullYear()} Hednai. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}