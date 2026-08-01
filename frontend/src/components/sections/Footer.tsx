// ============================================
// components/sections/Footer.tsx
// Pied de page : logo, navigation, copyright
// ============================================
import { useLanguage } from "../../i18n/LanguageContext";
import { NAV_LINKS } from "../../data/navLinks";
import { SITE_CONFIG } from "../../config/site";
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

        {/* Bloc d'infos startup — 3 colonnes */}
        <div className="footer__grid">
          <div className="footer__col">
            <h4>{t("footer.mission.title")}</h4>
            <p>{t("footer.mission.text")}</p>
          </div>

          <div className="footer__col">
            <h4>{t("footer.tech.title")}</h4>
            <p>{t("footer.tech.text")}</p>
          </div>

          <div className="footer__col">
            <h4>{t("footer.contact.title")}</h4>
            <p>{SITE_CONFIG.contact.email}</p>
            <p>{SITE_CONFIG.contact.location}</p>
          </div>
        </div>

        <p>&copy; {new Date().getFullYear()} Hednai. {t("footer.rights")}</p>
      </div>
    </footer>
  ); 
}