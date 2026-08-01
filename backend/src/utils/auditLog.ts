// ============================================
// utils/auditLog.ts
// Journalisation des actions dans la table AuditLog
// Pattern : Karibou Market auditLog.js (adapte Mongoose → Prisma)
// Appelee dans les controllers apres chaque action
// Non-bloquant : si le log echoue, la requete continue
//
// Amelioration future v7 : remplacer par Prisma $extends
// pour un audit automatique (voir ProfMatchAI prisma.js)
// ============================================
import type { Request } from "express";
import type { ActionType, Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";

// Journaliser une action
export const logAction = async (
  req: Request,
  action: ActionType,
  entityType: string,
  entityId?: string,
  payload?: Record<string, unknown>,
) => {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        entityType,
        entityId: entityId ?? null,
        ip: req.ip ?? null,
        userAgent: req.get("User-Agent") ?? null,
        // Cast necessaire : Prisma attend un type JSON precis pour ce champ
        payload: (payload ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });
  } catch (error) {
    // Ne pas bloquer la requete si le log echoue
    // Le log est important mais pas critique pour l'utilisateur
    logger.error({ err: error }, "Erreur auditLog");
  }
};