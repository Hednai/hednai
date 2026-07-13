// ============================================
// features/contact/contact.validation.ts
// Schema de validation Zod pour le formulaire contact
// Union discriminee : soit "email", soit "whatsapp" (jamais les deux)
// Pattern : Karibou Market validators/authValidator.js
// Messages d'erreur en francais
// ============================================
import { z } from "zod";

// ── Champs communs aux deux methodes de contact ──
// name, subject, message et honeypot sont toujours requis,
// peu importe si le visiteur choisit Email ou WhatsApp
const baseFields = {
  name: z
    .string("Le nom est requis.")
    .min(2, "Le nom doit contenir au moins 2 caracteres.")
    .max(100, "Le nom ne peut pas depasser 100 caracteres."),

  subject: z
    .string("Le sujet est requis.")
    .min(2, "Le sujet doit contenir au moins 2 caracteres.")
    .max(200, "Le sujet ne peut pas depasser 200 caracteres."),

  message: z
    .string("Le message est requis.")
    .min(10, "Le message doit contenir au moins 10 caracteres.")
    .max(2000, "Le message ne peut pas depasser 2000 caracteres."),

  // Honeypot : champ invisible pour pieger les bots
  // Un humain ne le remplit jamais, un bot si
  honeypot: z.string().max(0).optional(),
};

// ── Variante 1 : contact par Email ──
const emailContactSchema = z.object({
  contactMethod: z.literal("email"),
  email: z
    .string("L'email est requis.")
    .email("Format d'email invalide."),
  ...baseFields,
});

// ── Variante 2 : contact par WhatsApp ──
const whatsappContactSchema = z.object({
  contactMethod: z.literal("whatsapp"),
  // L'indicatif (ex: +225) est colle devant le numero cote frontend
  // avant l'envoi, donc ici on recoit un numero deja complet
  phone: z
    .string("Le numero de telephone est requis.")
    .min(8, "Le numero de telephone est trop court.")
    .max(20, "Le numero de telephone est trop long."),
  ...baseFields,
});

// ── Schema final : union discriminee sur "contactMethod" ──
// Zod choisit automatiquement la bonne variante selon la valeur de contactMethod
export const contactSchema = z.discriminatedUnion("contactMethod", [
  emailContactSchema,
  whatsappContactSchema,
]);