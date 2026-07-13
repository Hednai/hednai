// ============================================
// features/contact/contact.controller.ts
// Logique metier pour le formulaire de contact
// Gere les deux methodes : Email ou WhatsApp
// Pattern : Karibou Market controllers (next(error) + logAction)
// + Hednai v5.2 (honeypot, validation)
// ============================================
import type { Request, Response, NextFunction } from "express";
import validator from "validator";

import { contactSchema } from "./contact.validation";
import { createMessage } from "./contact.model";
import { logAction } from "../../utils/auditLog";
import { sendContactNotification } from "../../lib/mailer";

// ---- POST /api/contact ----
// Recevoir et sauvegarder un message de contact (Email ou WhatsApp)
export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Valider les donnees avec Zod (union discriminee email/whatsapp)
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Donnees invalides",
        details: result.error.issues,
      });
    }

    // 2. Honeypot : si le champ invisible est rempli, c'est un bot
    // On retourne un faux succes pour ne pas alerter le bot
    if (result.data.honeypot) {
      return res.status(200).json({ success: true });
    }

    // 3. Selon la methode choisie, on ne garde que le champ pertinent
    // (email normalise si methode = email, phone tel quel si methode = whatsapp)
    const cleanEmail =
      result.data.contactMethod === "email"
        ? validator.normalizeEmail(result.data.email) || result.data.email
        : undefined;

    const cleanPhone =
      result.data.contactMethod === "whatsapp"
        ? result.data.phone.replace(/\s/g, "")
        : undefined;

    // 4. Sauvegarder en base de donnees
    const msg = await createMessage({
      name: result.data.name,
      email: cleanEmail,
      phone: cleanPhone,
      contactMethod: result.data.contactMethod,
      subject: result.data.subject,
      message: result.data.message,
    });

    // 5. Journaliser l'action (non-bloquant)
    await logAction(req, "CONTACT_SUBMIT", "Message", String(msg.id), {
      contactMethod: result.data.contactMethod,
      subject: result.data.subject,
    });

    // 6. Envoyer l'email de notification seulement si methode = email
    // (sendContactNotification retourne false automatiquement si pas d'email)
    const emailSent = await sendContactNotification({
      name: result.data.name,
      email: cleanEmail,
      subject: result.data.subject,
      message: result.data.message,
    });

    // 7. Journaliser le resultat de l'envoi email (seulement si methode = email)
    if (result.data.contactMethod === "email") {
      if (emailSent) {
        await logAction(req, "CONTACT_EMAIL_SENT", "Message", String(msg.id));
      } else {
        await logAction(req, "CONTACT_EMAIL_FAILED", "Message", String(msg.id));
      }
    }

    // 8. Reponse au format uniforme
    res.status(201).json({
      success: true,
      data: { id: msg.id },
    });
  } catch (error) {
    // Deleguer au error handler centralise (pattern Karibou)
    next(error);
  }
};