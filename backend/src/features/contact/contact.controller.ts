// ============================================
// features/contact/contact.controller.ts
// Logique metier pour le formulaire de contact
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
// Recevoir et sauvegarder un message de contact
export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Valider les donnees avec Zod
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

    // 3. Normaliser l'email (Jean@Gmail.COM → jean@gmail.com)
    // Note : pas de validator.escape() — le middleware xssClean s'en charge
    const cleanEmail =
      validator.normalizeEmail(result.data.email) || result.data.email;

    // 4. Sauvegarder en base de donnees
    const msg = await createMessage({
      name: result.data.name,
      email: cleanEmail,
      subject: result.data.subject,
      message: result.data.message,
    });

    // 5. Journaliser l'action (non-bloquant)
    await logAction(req, "CONTACT_SUBMIT", "Message", String(msg.id), {
      email: cleanEmail,
      subject: result.data.subject,
    });

    // 6. Envoyer l'email de notification (non-bloquant)
    const emailSent = await sendContactNotification({
      name: result.data.name,
      email: cleanEmail,
      subject: result.data.subject,
      message: result.data.message,
    });

    // 7. Journaliser le resultat de l'envoi email
    if (emailSent) {
      await logAction(req, "CONTACT_EMAIL_SENT", "Message", String(msg.id));
    } else {
      await logAction(req, "CONTACT_EMAIL_FAILED", "Message", String(msg.id));
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