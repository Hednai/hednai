// ============================================
// routes/contact.ts
// Appel API pour le formulaire de contact
// ============================================
import { fetchAPI } from "./api";
import type { ContactForm } from "../types";

// Envoyer un message de contact au backend
export const sendContactMessage = async (form: ContactForm) => {
  return fetchAPI<{ id: number }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(form),
  });
};