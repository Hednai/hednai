// ============================================
// features/contact/contact.controller.ts
// Controller contact — coordonne validation et delegation au service
// Ne contient AUCUNE logique metier (c'est le role du service)
// Pattern : Route → Controller → Service → Model
// ============================================
import type { Request, Response, NextFunction } from "express";

import { contactSchema } from "./contact.validation";
import { processContactMessage } from "./contact.service";

// ---- POST /api/contact ----
// Recevoir un message de contact (Email ou WhatsApp)
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

    // 2. Deleguer toute la logique metier au service
    const contactResult = await processContactMessage(result.data, req);

    // 3. Si c'est un bot, on retourne un faux succes
    if (contactResult.isBot) {
      return res.status(200).json({ success: true });
    }

    // 4. Reponse au format uniforme
    res.status(201).json({
      success: true,
      data: { id: contactResult.messageId },
    });
  } catch (error) {
    // Deleguer au error handler centralise
    next(error);
  }
};