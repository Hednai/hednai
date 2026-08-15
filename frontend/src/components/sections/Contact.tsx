// ============================================
// components/sections/Contact.tsx
// Formulaire de contact — onglets Email / WhatsApp
// Ce fichier ne gere que l'affichage (JSX), toute la logique
// vient du hook useContactForm
// ============================================
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Button } from "../ui/Button";
import { useLanguage } from "../../i18n/useLanguage";
import { useContactForm } from "../../hooks/useContactForm";
import { SITE_CONFIG } from "../../config/site";
import { countryCodes } from "../../data/countryDialCodes";
import "./Contact.css";

export function Contact() {
  const { t } = useLanguage();
  // Toute la logique (validation, envoi, erreurs, onglet actif) vient du hook
  const { form, status, fieldErrors, updateField, setContactMethod, submit } = useContactForm();
  // Reference vers le premier message d'erreur, pour scroller dessus sur mobile
  const errorRef = useRef<HTMLDivElement>(null);

  // Si une erreur apparait, on scroll automatiquement dessus (utile sur mobile)
  useEffect(() => {
    if (status === "error" && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status, fieldErrors]);

  // A chaque frappe dans un champ, on met a jour le formulaire via le hook
  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateField(e.target.id, e.target.value);
  };

  // Quand on soumet le formulaire : on empeche le rechargement de page et on envoie
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <SectionWrapper id="contact" title={t("contact.title")} subtitle={t("contact.subtitle")}>
      <div className="contact-grid">
        {/* Colonne de gauche : informations de contact */}
        <div className="contact-info">
          <h3>{t("contact.info.title")}</h3>

          <div className="ci">
            <div className="ci__icon"><Mail size={18} /></div>
            <div>
              <h4>{t("contact.info.email")}</h4>
              <p>{SITE_CONFIG.contact.email}</p>
            </div>
          </div>

          <div className="ci">
            <div className="ci__icon"><Phone size={18} /></div>
            <div>
              <h4>{t("contact.info.phone")}</h4>
              <p>{SITE_CONFIG.contact.phone}</p>
            </div>
          </div>

          <div className="ci">
            <div className="ci__icon"><MapPin size={18} /></div>
            <div>
              <h4>{t("contact.info.location")}</h4>
              <p>{SITE_CONFIG.contact.location} - {t("contact.info.available")}</p>
            </div>
          </div>

          <p className="ci__social-title">{t("contact.info.follow")}</p>
          <div className="ci__social">
            <a href={SITE_CONFIG.socials.linkedin} className="social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={18} />
            </a>
            <a href={SITE_CONFIG.socials.github} className="social-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Colonne de droite : le formulaire avec onglets */}
        <form className="contact-form" onSubmit={handleSubmit}>

          {/* ===== ONGLETS EMAIL / WHATSAPP ===== */}
          <div className="contact-tabs">
            <button
              type="button"
              className={`contact-tab ${form.contactMethod === "email" ? "contact-tab--active" : ""}`}
              onClick={() => setContactMethod("email")}
            >
              <Mail size={16} />
              {t("contact.tab.email")}
            </button>
            <button
              type="button"
              className={`contact-tab ${form.contactMethod === "whatsapp" ? "contact-tab--active" : ""}`}
              onClick={() => setContactMethod("whatsapp")}
            >
              <FaWhatsapp size={16} />
              {t("contact.tab.whatsapp")}
            </button>
          </div>

          {/* ===== LIGNE NOM + EMAIL/TELEPHONE COTE A COTE ===== */}
          <div className="contact-form__row">
            <div className="fg">
              <label htmlFor="name">{t("contact.form.name")}</label>
              <input id="name" placeholder={t("contact.form.name.placeholder")} value={form.name} onChange={change} className={fieldErrors.name ? "input--error" : ""} aria-describedby={fieldErrors.name ? "error-name" : undefined} />
              {fieldErrors.name && <span ref={errorRef} id="error-name" className="field-error" role="alert">{t(fieldErrors.name)}</span>}
            </div>

            {/* ===== CHAMP QUI CHANGE SELON L'ONGLET ACTIF ===== */}
            <AnimatePresence mode="wait">
              {form.contactMethod === "email" ? (
                <motion.div
                  key="email-field"
                  className="fg"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="email">{t("contact.form.email")}</label>
                  <input id="email" type="email" placeholder={t("contact.form.email.placeholder")} value={form.email} onChange={change} className={fieldErrors.email ? "input--error" : ""} aria-describedby={fieldErrors.email ? "error-email" : undefined} />
                  {fieldErrors.email && <span id="error-email" className="field-error" role="alert">{t(fieldErrors.email)}</span>}
                </motion.div>
              ) : (
                <motion.div
                  key="phone-field"
                  className="fg"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="phone">{t("contact.form.phone")}</label>
                  <div className="phone-field">
                    <select
                      id="dialCode"
                      value={form.dialCode}
                      onChange={change}
                      className="phone-field__code"
                      aria-label={t("contact.form.dialCode")}
                    >
                      {countryCodes.map((c) => (
                        <option key={c.iso} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      placeholder={t("contact.form.phone.placeholder")}
                      value={form.phone}
                      onChange={change}
                      className={fieldErrors.phone ? "input--error" : ""}
                      aria-describedby={fieldErrors.phone ? "error-phone" : undefined}
                    />
                  </div>
                  {fieldErrors.phone && <span id="error-phone" className="field-error" role="alert">{t(fieldErrors.phone)}</span>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="fg">
            <label htmlFor="subject">{t("contact.form.subject")}</label>
            <input id="subject" placeholder={t("contact.form.subject.placeholder")} value={form.subject} onChange={change} className={fieldErrors.subject ? "input--error" : ""} aria-describedby={fieldErrors.subject ? "error-subject" : undefined} />
            {fieldErrors.subject && <span id="error-subject" className="field-error" role="alert">{t(fieldErrors.subject)}</span>}
          </div>

          <div className="fg">
            <label htmlFor="message">{t("contact.form.message")}</label>
            <textarea id="message" placeholder={t("contact.form.message.placeholder")} value={form.message} onChange={change} className={fieldErrors.message ? "input--error" : ""} aria-describedby={fieldErrors.message ? "error-message" : undefined} />
            {fieldErrors.message && <span id="error-message" className="field-error" role="alert">{t(fieldErrors.message)}</span>}
          </div>

          {/* Honeypot : champ invisible pour les humains, sert a piéger les robots spammeurs */}
          <input type="text" name="honeypot" id="honeypot" value={form.honeypot || ""} onChange={change} style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} tabIndex={-1} autoComplete="off" />

          {/* Message de succes ou d'erreur generale, affiche selon le statut */}
          {status === "success" && (
            <div className="form-msg form-msg--ok"><CheckCircle size={18} /> {t("contact.form.success")}</div>
          )}
          {status === "error" && fieldErrors.general && (
            <div className="form-msg form-msg--err"><AlertCircle size={18} /> {t(fieldErrors.general)}</div>
          )}

          <Button fullWidth type="submit" disabled={status === "loading"}>
            {status === "loading" ? t("contact.form.sending") : t("contact.form.send")}
            <Send size={18} />
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
}