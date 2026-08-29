// ============================================
// features/dashboard/dashboard.route.ts
// Routes du dashboard admin
// GET /api/dashboard/stats — statistiques globales
// GET /api/dashboard/messages — liste des messages
// ============================================
import { Router } from "express";
import { getStats, getMessages } from "./dashboard.controller";
import { authAdmin } from "../../middleware/authAdmin";

const dashboardRouter = Router();

// Toutes les routes admin protegees par token Bearer
dashboardRouter.use(authAdmin);

// Statistiques globales (nombre de messages, dernier message, etc.)
dashboardRouter.get("/stats", getStats);

// Liste des messages recus (paginee)
dashboardRouter.get("/messages", getMessages);

export { dashboardRouter };