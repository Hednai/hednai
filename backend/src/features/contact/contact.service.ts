// ============================================
// features/contact/contact.service.ts
// Couche Service — logique metier du formulaire contact
// Le controller coordonne, le service execute
// Pattern : Route → Controller → Service → Model
// ============================================
import validator from "validator";
import type { Request } from "express";

import { createMessage } from "./contact.model";
import { logAction } from "../../utils/auditLog";
import { logger } from "../../lib/logger";
import { sendContactNotification } from "../../lib/mailer";
import { sendDiscordNotification } from "../../lib/discord";

// Type pour les donnees validees qui arrivent du controller
interface ValidatedContactData {
  contactMethod: "email" | "whatsapp";
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// Resultat retourne par le service au controller
interface ContactResult {
  isBot: boolean;
  messageId?: number;
}

// ---- Traiter un message de contact ----
// Recoit les donnees DEJA validees par Zod (le controller s'en charge)
// Retourne le resultat pour que le controller construise la reponse HTTP
export const processContactMessage = async (
  data: ValidatedContactData,
  req: Request,
): Promise<ContactResult> => {

  // 1. Verifier le honeypot (piege a bots)
  if (data.honeypot) {
    return { isBot: true };
  }

  // 2. Normaliser les donnees selon la methode choisie
  const cleanEmail =
    data.contactMethod === "email"
      ? validator.normalizeEmail(data.email!) || data.email
      : undefined;

  const cleanPhone =
    data.contactMethod === "whatsapp"
      ? data.phone!.replace(/\s/g, "")
      : undefined;

  // 3. Sauvegarder en base de donnees
  const msg = await createMessage({
    name: data.name,
    email: cleanEmail,
    phone: cleanPhone,
    contactMethod: data.contactMethod,
    subject: data.subject,
    message: data.message,
  });

  // 4. Journaliser l'enregistrement du message
  await logAction(req, "CONTACT_SUBMIT", "Message", String(msg.id), {
    contactMethod: data.contactMethod,
    subject: data.subject,
  });

  // 5. Notifications (email, Discord).
  // Le message est deja en base : la reponse au visiteur ne depend plus de ces
  // appels sortants. Ils s'executent donc en arriere-plan et leur echec est
  // journalise sans jamais remonter au client.
  void (async () => {
    try {
      if (data.contactMethod === "email") {
        const emailSent = await sendContactNotification({
          name: data.name,
          email: cleanEmail,
          subject: data.subject,
          message: data.message,
        });

        await logAction(
          req,
          emailSent ? "CONTACT_EMAIL_SENT" : "CONTACT_EMAIL_FAILED",
          "Message",
          String(msg.id),
        );
      }

      await sendDiscordNotification({
        name: data.name,
        contactMethod: data.contactMethod,
        subject: data.subject,
      });
    } catch (err) {
      logger.warn({ err }, "Echec des notifications de contact (non-bloquant)");
    }
  })();

  return {
    isBot: false,
    messageId: msg.id,
  };
};
