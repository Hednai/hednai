// ============================================
// hooks/useContactForm.ts
// Logique du formulaire de contact extraite du composant
// Separation logique (ici) / affichage (dans Contact.tsx)
// ============================================
import { useState } from "react";
import { sendContactMessage } from "../routes/contact";
import { isValidEmail, isMinLength } from "../utils/validation";
import type { ContactForm, FormStatus } from "../types";

// Etat initial du formulaire (tous les champs vides)
const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

export function useContactForm() {
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

  // Verifier que tous les champs respectent les regles avant l'envoi
  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isMinLength(form.name, 2)) {
      errors.name = "contact.form.error.name";
    }
    if (!isValidEmail(form.email)) {
      errors.email = "contact.form.error.email";
    }
    if (!isMinLength(form.subject, 2)) {
      errors.subject = "contact.form.error.subject";
    }
    if (!isMinLength(form.message, 10)) {
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

    setStatus("loading");

    try {
      // 2. On appelle l'API
      await sendContactMessage(form);

      // 3. Succes : on reinitialise le formulaire
      setStatus("success");
      setFieldErrors({});
      setForm(INITIAL_FORM);
    } catch {
      // 4. Erreur (ex: serveur injoignable)
      setStatus("error");
      setFieldErrors({ general: "contact.form.error.network" });
    }
  };

  return { form, status, fieldErrors, updateField, submit };
}