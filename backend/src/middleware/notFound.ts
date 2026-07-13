// ============================================
// middleware/notFound.ts
// Route catch-all pour les URL inexistantes
// Pattern : Karibou Market notFound.js
// Monte APRES toutes les routes dans server.ts
// ============================================
import type { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `${req.originalUrl} — Route introuvable.`,
  });
};

export default notFound;