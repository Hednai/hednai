// ============================================
// routes/contact.ts
// Appel API pour le formulaire de contact
// ============================================
import { fetchAPI } from "./api";
import type { ContactPayload } from "../types";

// Envoyer un message de contact au backend
// On envoie le payload deja "nettoye" (email OU whatsapp, jamais les deux)
export const sendContactMessage = async (payload: ContactPayload) => {
  return fetchAPI<{ id: number }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};