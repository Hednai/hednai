// ============================================
// features/contact/contact.validation.ts
// Schema de validation Zod pour le formulaire contact
// Pattern : Karibou Market validators/authValidator.js
// Messages d'erreur en francais
// ============================================
import { z } from "zod";

// Schema pour un message de contact
export const contactSchema = z.object({
  name: z
    .string("Le nom est requis.")
    .min(2, "Le nom doit contenir au moins 2 caracteres.")
    .max(100, "Le nom ne peut pas depasser 100 caracteres."),

  email: z
    .string("L'email est requis.")
    .email("Format d'email invalide."),

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
});