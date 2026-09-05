// ============================================
// components/ContactModal.tsx
// Formulaire de contact en modal — version epuree, sans panneau info
// Les infos de contact (email, tel, adresse) sont deja dans le footer
// ============================================
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "./ui/Button";
import { useLanguage } from "../i18n/useLanguage";
import { useContactForm } from "../hooks/useContactForm";
import { countryCodes } from "../data/countryDialCodes";
import "./ContactModal.css";

export function ContactModal() {
  const { t } = useLanguage();
  const { form, status, fieldErrors, updateField, setContactMethod, submit } = useContactForm();
  const errorRef = useRef<HTMLDivElement>(null);

  // Scroll vers la premiere erreur
  useEffect(() => {
    if (status === "error" && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status, fieldErrors]);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateField(e.target.id, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className="cm">
      {/* Titre */}
      <h2 className="cm__title">{t("contact.title")}</h2>
      <p className="cm__subtitle">{t("contact.subtitle")}</p>

      {/* Formulaire — pleine largeur, sans panneau latéral */}
      <form className="cm__form" onSubmit={handleSubmit}>
        {/* Onglets Email / WhatsApp */}
        <div className="cm__tabs">
          <button
            type="button"
            className={`cm__tab ${form.contactMethod === "email" ? "cm__tab--active" : ""}`}
            onClick={() => setContactMethod("email")}
          >
            <Mail size={16} />
            {t("contact.tab.email")}
          </button>
          <button
            type="button"
            className={`cm__tab cm__tab--whatsapp ${form.contactMethod === "whatsapp" ? "cm__tab--active" : ""}`}
            onClick={() => setContactMethod("whatsapp")}
          >
            <FaWhatsapp size={16} />
            {t("contact.tab.whatsapp")}
          </button>
        </div>

        {/* Ligne Nom + Email/Telephone */}
        <div className="cm__row">
          <div className="cm__field">
            <label htmlFor="name">{t("contact.form.name")}</label>
            <input id="name" placeholder={t("contact.form.name.placeholder")} value={form.name} onChange={change} className={fieldErrors.name ? "cm__input--error" : ""} />
            {fieldErrors.name && <span ref={errorRef} className="cm__error" role="alert">{t(fieldErrors.name)}</span>}
          </div>

          <AnimatePresence mode="wait">
            {form.contactMethod === "email" ? (
              <motion.div key="email-field" className="cm__field" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <label htmlFor="email">{t("contact.form.email")}</label>
                <input id="email" type="email" placeholder={t("contact.form.email.placeholder")} value={form.email} onChange={change} className={fieldErrors.email ? "cm__input--error" : ""} />
                {fieldErrors.email && <span className="cm__error" role="alert">{t(fieldErrors.email)}</span>}
              </motion.div>
            ) : (
              <motion.div key="phone-field" className="cm__field" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <label htmlFor="phone">{t("contact.form.phone")}</label>
                <div className="cm__phone">
                  <select id="dialCode" value={form.dialCode} onChange={change} className="cm__phone-code" aria-label={t("contact.form.dialCode")}>
                    {countryCodes.map((c) => (
                      <option key={c.iso} value={c.code}>{c.flag} {c.code}</option>
                    ))}
                  </select>
                  <input id="phone" type="tel" placeholder={t("contact.form.phone.placeholder")} value={form.phone} onChange={change} className={fieldErrors.phone ? "cm__input--error" : ""} />
                </div>
                {fieldErrors.phone && <span className="cm__error" role="alert">{t(fieldErrors.phone)}</span>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="cm__field">
          <label htmlFor="subject">{t("contact.form.subject")}</label>
          <select id="subject" value={form.subject} onChange={change} className={fieldErrors.subject ? "cm__input--error" : ""}>
            <option value="">{t("contact.form.subject.placeholder")}</option>
            <option value="application-maritime">{t("contact.form.subject.maritime")}</option>
            <option value="solution-portuaire">{t("contact.form.subject.port")}</option>
            <option value="projet-web-mobile">{t("contact.form.subject.webmobile")}</option>
            <option value="ia-donnees">{t("contact.form.subject.ai")}</option>
            <option value="collaboration">{t("contact.form.subject.collab")}</option>
            <option value="autre">{t("contact.form.subject.other")}</option>
          </select>
          {fieldErrors.subject && <span className="cm__error" role="alert">{t(fieldErrors.subject)}</span>}
        </div>

        <div className="cm__field">
          <label htmlFor="message">{t("contact.form.message")}</label>
          <textarea id="message" rows={4} placeholder={t("contact.form.message.placeholder")} value={form.message} onChange={change} className={fieldErrors.message ? "cm__input--error" : ""} />
          {fieldErrors.message && <span className="cm__error" role="alert">{t(fieldErrors.message)}</span>}
        </div>

        {/* Honeypot anti-spam */}
        <input type="text" name="honeypot" id="honeypot" value={form.honeypot || ""} onChange={change} style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} tabIndex={-1} autoComplete="off" />

        {status === "success" && (
          <div className="cm__msg cm__msg--ok"><CheckCircle size={18} /> {t("contact.form.success")}</div>
        )}
        {status === "error" && fieldErrors.general && (
          <div className="cm__msg cm__msg--err"><AlertCircle size={18} /> {t(fieldErrors.general)}</div>
        )}

        <Button fullWidth type="submit" disabled={status === "loading"}>
          {status === "loading" ? t("contact.form.sending") : t("contact.form.send")}
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}