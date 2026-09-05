// ============================================
// hooks/useContactForm.ts
// Logique du formulaire de contact extraite du composant
// Gere les deux methodes : Email ou WhatsApp
// Separation logique (ici) / affichage (dans Contact.tsx)
// ============================================
import { useState } from "react";
import { sendContactMessage } from "../routes/contact";
import { isValidEmail, isMinLength, isValidPhone } from "../utils/validation";
import { SITE_CONFIG } from "../config/site";
import { useLanguage } from "../i18n/useLanguage";
import type { ContactForm, ContactMethod, FormStatus } from "../types";

// Bornes de validation : une seule source de verite (config/site.ts),
// alignee sur le schema Zod du backend
const REGLES = SITE_CONFIG.formulaire;

// Etat initial du formulaire (tous les champs vides)
// Methode par defaut : email | Indicatif par defaut : Cote d'Ivoire (+225)
const INITIAL_FORM: ContactForm = {
  contactMethod: "email",
  name: "",
  email: "",
  phone: "",
  dialCode: "+225",
  subject: "",
  message: "",
  honeypot: "",
};

export function useContactForm() {
  // Traduction : le gabarit du message WhatsApp suit la langue du site
  const { t } = useLanguage();

  // State du formulaire (les valeurs tapees par l'utilisateur)
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  // Statut de l'envoi : idle, loading, success ou error
  const [status, setStatus] = useState<FormStatus>("idle");
  // Erreurs par champ, pour afficher un message precis sous chaque input
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Mettre a jour un champ du formulaire quand l'utilisateur tape
  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Si ce champ avait une erreur, on l'efface des que l'utilisateur retape
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Changer d'onglet (Email <-> WhatsApp)
  // On efface les erreurs liees au champ qui disparait (email ou phone)
  const setContactMethod = (method: ContactMethod) => {
    setForm((prev) => ({ ...prev, contactMethod: method }));
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy.email;
      delete copy.phone;
      return copy;
    });
  };

  // Verifier que tous les champs respectent les regles avant l'envoi
  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isMinLength(form.name, REGLES.nomMin)) {
      errors.name = "contact.form.error.name";
    }

    // Seul le champ de la methode active est verifie
    if (form.contactMethod === "email") {
      if (!isValidEmail(form.email)) {
        errors.email = "contact.form.error.email";
      }
    } else {
      if (!isValidPhone(form.phone)) {
        errors.phone = "contact.form.error.phone";
      }
    }

    if (!isMinLength(form.subject, REGLES.sujetMin)) {
      errors.subject = "contact.form.error.subject";
    }
    if (!isMinLength(form.message, REGLES.messageMin)) {
      errors.message = "contact.form.error.message";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Soumettre le formulaire au backend
  const submit = async () => {
    // 1. On valide d'abord cote frontend, avant meme d'appeler le serveur
    if (!validate()) {
      setStatus("error");
      return;
    }

    // 2. Onglet WhatsApp reserve MAINTENANT, tant qu'on est encore dans le
    // geste utilisateur (le clic). Un window.open appele apres un await, ou
    // depuis un setTimeout, est bloque par le navigateur comme une popup.
    // Source : developer.mozilla.org/docs/Web/API/Window/open (popup blocking)
    const ongletWhatsapp =
      form.contactMethod === "whatsapp" ? window.open("", "_blank") : null;

    setStatus("loading");

    try {
      // 3. On appelle l'API avec seulement les champs pertinents
      // (le backend attend une union discriminee sur contactMethod)
      const payload =
        form.contactMethod === "email"
          ? {
              contactMethod: "email" as const,
              name: form.name,
              email: form.email,
              subject: form.subject,
              message: form.message,
              honeypot: form.honeypot,
            }
          : {
              contactMethod: "whatsapp" as const,
              name: form.name,
              phone: `${form.dialCode}${form.phone.replace(/\s/g, "")}`,
              subject: form.subject,
              message: form.message,
              honeypot: form.honeypot,
            };

      await sendContactMessage(payload);

      // 4. Succes
      setStatus("success");
      setFieldErrors({});

      // 5. Si WhatsApp : diriger l'onglet reserve vers wa.me avec le message
      // pre-rempli. Numero et gabarit viennent de la config et de l'i18n,
      // aucune chaine en dur ici.
      if (form.contactMethod === "whatsapp") {
        const texte = t("contact.whatsapp.template")
          .replace("{name}", form.name)
          .replace("{subject}", form.subject)
          .replace("{message}", form.message);

        const url = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(texte)}`;

        // Si le navigateur a quand meme bloque l'onglet, on retombe sur un
        // window.open direct plutot que de perdre silencieusement l'envoi.
        if (ongletWhatsapp) {
          ongletWhatsapp.location.href = url;
        } else {
          window.open(url, "_blank", "noopener");
        }
      }

      // 6. Reinitialiser le formulaire (on garde la methode choisie)
      setForm({ ...INITIAL_FORM, contactMethod: form.contactMethod });
    } catch {
      // 7. Erreur (ex: serveur injoignable) : on referme l'onglet reserve
      // pour ne pas laisser un onglet blanc ouvert.
      ongletWhatsapp?.close();
      setStatus("error");
      setFieldErrors({ general: "contact.form.error.network" });
    }
  };

  return { form, status, fieldErrors, updateField, setContactMethod, submit };
}
