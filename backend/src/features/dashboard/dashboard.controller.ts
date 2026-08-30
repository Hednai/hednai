// ============================================
// features/dashboard/dashboard.controller.ts
// Controller dashboard — coordonne les appels au service
// Protege par un mot de passe Bearer token simple
// ============================================
import type { Request, Response, NextFunction } from "express";
import { getDashboardStats, getDashboardMessages } from "./dashboard.service";

// Authentification geree par le middleware authAdmin (dashboard.route.ts)
// Aucune verification supplementaire necessaire ici

// ---- GET /api/dashboard/stats ----
export const getStats = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Authentification deja verifiee par le middleware authAdmin
    // Recuperer les statistiques
    const stats = await getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

// ---- GET /api/dashboard/messages ----
export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Authentification deja verifiee par le middleware authAdmin
    // Pagination via query params
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getDashboardMessages(page, limit);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};