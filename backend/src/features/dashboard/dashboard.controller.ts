// ============================================
// features/dashboard/dashboard.controller.ts
// Controller dashboard — coordonne les appels au service
// Protege par un mot de passe Bearer token simple
// ============================================
import type { Request, Response, NextFunction } from "express";
import { getDashboardStats, getDashboardMessages } from "./dashboard.service";

// ---- Middleware d'authentification simple ----
// Verifie le header Authorization: Bearer <mot-de-passe>
// Le mot de passe est stocke dans la variable d'environnement ADMIN_PASSWORD
const checkAdminAuth = (req: Request, res: Response): boolean => {
  const authHeader = req.headers.authorization;
  const expectedPassword = process.env.ADMIN_PASSWORD || "hednai2025";

  // Verifier le format "Bearer <password>"
  if (!authHeader || authHeader !== `Bearer ${expectedPassword}`) {
    res.status(401).json({
      success: false,
      message: "Non autorise. Header Authorization requis.",
    });
    return false;
  }

  return true;
};

// ---- GET /api/dashboard/stats ----
export const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Verifier l'authentification
    if (!checkAdminAuth(req, res)) return;

    // 2. Recuperer les statistiques
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
    // 1. Verifier l'authentification
    if (!checkAdminAuth(req, res)) return;

    // 2. Pagination via query params
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getDashboardMessages(page, limit);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};