// ============================================
// components/sections/Footer.tsx
// Pied de page autonome : logo, navigation, colonnes contextuelles
// S'adapte au mode Client / Recruteur via useViewMode
// Responsabilite unique : afficher les informations de fin de page
// ============================================
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, MapPin, Globe, X } from "lucide-react";
import { useLanguage } from "../../i18n/useLanguage";
import { useViewMode } from "../../context/useViewMode";
import { NAV_LINKS } from "../../data/navLinks";
import { SITE_CONFIG } from "../../config/site";
import { ApiStatus } from "../ApiStatus";
import { ContactModal } from "../ContactModal";
import "./Footer.css";

export function Footer() {
  const { t } = useLanguage();
  const { isRecruiter } = useViewMode();
  const navigate = useNavigate();
  const location = useLocation();

  // Etat du modal de contact
  const [contactOpen, setContactOpen] = useState(false);

  // Ecoute l'evenement global pour ouvrir le modal (depuis la navbar ou le CTA hero)
  useEffect(() => {
    const openModal = () => setContactOpen(true);
    window.addEventListener("open-contact-modal", openModal);
    return () => window.removeEventListener("open-contact-modal", openModal);
  }, []);

  // Gere le clic sur un lien ancre ou route interne
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();

      // Lien vers une route interne (ex: /blog, /mentions-legales)
      if (!href.startsWith("#")) {
        navigate(href);
        return;
      }

      // Lien ancre (#section) — scroll smooth
      const sectionId = href.replace("#", "");
      if (location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: sectionId } });
      }
    },
    [location.pathname, navigate]
  );

  return (
    <>
      <footer className="footer">
        <div className="container footer__inner">
          {/* ===== Colonne gauche : marque + identite ===== */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/logo-anchor.png" alt="Hednai" />
              <span>
                Hed<span className="footer__logo-accent">nai</span>
              </span>
            </div>
            <p className="footer__tagline">{t("footer.tagline")}</p>
            {/* Description conditionnelle selon le mode */}
            <p className="footer__identity">
              {isRecruiter
                ? t("footer.identity.recruiter")
                : t("footer.identity")}
            </p>

            {/* Localisation et disponibilite */}
            <div className="footer__location">
              <span className="footer__location-item">
                <MapPin size={14} />
                {t("footer.location")}
              </span>
              <span className="footer__location-item">
                <Globe size={14} />
                {t("footer.remote")}
              </span>
            </div>

            {/* Accroche reseaux sociaux */}
            <p className="footer__socials-label">{t("footer.socials.label")}</p>

            {/* Liens sociaux */}
            <div className="footer__socials">
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer__social-btn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="footer__social-btn"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* ===== Colonne navigation ===== */}
          <div className="footer__col">
            <h4>{t("footer.nav.title")}</h4>
            <nav className="footer__nav">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
          </div>

          {/* ===== Colonne contextuelle : Pourquoi HEDNAI (client) ou Competences + Technologies (recruteur) ===== */}
          <div className="footer__col">
            {isRecruiter ? (
              <>
                <h4>{t("footer.skills.title")}</h4>
                <ul className="footer__skills">
                  <li>{t("footer.skills.fullstack")}</li>
                  <li>{t("footer.skills.maritime")}</li>
                  <li>{t("footer.skills.ai")}</li>
                  <li>{t("footer.skills.webmobile")}</li>
                  <li>{t("footer.skills.architecture")}</li>
                </ul>
                {/* Technologies aussi visibles en mode recruteur */}
                <h4 className="footer__col-subtitle">
                  {t("footer.tech.title")}
                </h4>
                <div className="footer__tech-tags">
                  {t("footer.tech.text")
                    .split(", ")
                    .map((tech) => (
                      <span key={tech} className="footer__tech-tag">
                        {tech}
                      </span>
                    ))}
                </div>
              </>
            ) : (
              <>
                <h4>{t("footer.why.title")}</h4>
                <p className="footer__why-headline">
                  {t("footer.why.headline")}
                </p>
                <p>{t("footer.why.text")}</p>
                <h4 className="footer__col-subtitle">
                  {t("footer.tech.title")}
                </h4>
                <div className="footer__tech-tags">
                  {t("footer.tech.text")
                    .split(", ")
                    .map((tech) => (
                      <span key={tech} className="footer__tech-tag">
                        {tech}
                      </span>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* ===== Colonne appel a l'action ===== */}
          <div className="footer__col">
            <h4>
              {isRecruiter
                ? t("footer.recruiter.title")
                : t("footer.cta.title")}
            </h4>
            <p className="footer__cta-text">
              {isRecruiter
                ? t("footer.recruiter.text")
                : t("footer.cta.text")}
            </p>
            <div className="footer__contact-items">
              <div className="footer__contact-item">
                <Mail size={16} />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="footer__email-link">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              {/* Bouton qui ouvre le formulaire de contact en modal */}
              <button
                className="footer__contact-btn"
                onClick={() => setContactOpen(true)}
              >
                {isRecruiter
                  ? t("footer.recruiter.button")
                  : t("footer.cta.button")}
              </button>
            </div>
          </div>
        </div>

        {/* ===== Barre du bas : copyright + liens legaux ===== */}
        <div className="footer__bottom">
          <div className="container footer__bottom-inner">
            <p>
              &copy; {new Date().getFullYear()} Hednai.{" "}
              {t("footer.rights")}
            </p>

            {/* ApiStatus visible uniquement en developpement */}
            {import.meta.env.DEV && <ApiStatus />}

            <div className="footer__legal">
              <a
                href="/mentions-legales"
                onClick={(e) => handleNavClick(e, "/mentions-legales")}
              >
                {t("footer.legal.terms")}
              </a>
              <span className="footer__legal-sep" aria-hidden="true">
                ·
              </span>
              <a
                href="/confidentialite"
                onClick={(e) => handleNavClick(e, "/confidentialite")}
              >
                {t("footer.legal.privacy")}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Modal contact — meme pattern que QuoteCalculator et Calendly ===== */}
      {contactOpen && (
        <div
          className="contact-modal__overlay"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="contact-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="contact-modal__close"
              onClick={() => setContactOpen(false)}
              aria-label={t("pwa.close")}
            >
              <X size={24} />
            </button>
            <ContactModal />
          </div>
        </div>
      )}
    </>
  );
}