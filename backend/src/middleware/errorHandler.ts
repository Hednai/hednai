// ============================================
// middleware/errorHandler.ts
// Gestion centralisee des erreurs — format uniforme
// Pattern : Karibou Market (adapte Mongoose → Prisma)
// En production : pas de stack trace pour la securite
// ============================================
import type { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  code?: string;
  meta?: { target?: string[] };
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // 1. Log pour le debogage serveur
  if (process.env.NODE_ENV === "development") {
    console.error("Erreur :", err);
  } else {
    console.error("Erreur :", err.message);
  }

  // 2. Code HTTP et message par defaut
  let statusCode = err.statusCode || 500;
  let message = err.message || "Erreur interne du serveur.";

  // 3. Erreurs Prisma specifiques

  // P2002 : contrainte unique violee (ex: email deja utilise)
  if (err.code === "P2002") {
    statusCode = 400;
    const champ = err.meta?.target?.[0] || "champ";
    message = `Valeur dupliquee pour "${champ}".`;
  }

  // P2025 : enregistrement non trouve
  if (err.code === "P2025") {
    statusCode = 404;
    message = "Enregistrement non trouve.";
  }

  // Erreur Zod : validation echouee
  if (err.name === "ZodError") {
    statusCode = 400;
    message = "Donnees invalides.";
  }

  // 4. Reponse au format uniforme
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;