// ============================================
// middleware/authAdmin.ts
// Protection des routes admin par token Bearer
// V1 : token statique dans .env (solution minimale avant déploiement)
// V2 : migrer vers JWT avec expiration + refresh token + endpoint login
// Source : OWASP Authentication Cheat Sheet
// ============================================
import { timingSafeEqual } from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

// Middleware qui vérifie que la requête contient un token admin valide
const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Récupère l'en-tête Authorization envoyé avec la requête
  const authHeader = req.headers.authorization;

  // Vérifie que l'en-tête existe et commence bien par "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  // Récupère uniquement le token après "Bearer "
  const token = authHeader.split(" ")[1];

  // Récupère le token admin défini dans les variables d'environnement
  const expected = env.ADMIN_TOKEN;

  // Comparaison constante pour eviter les attaques par timing
  // Source : Node.js crypto.timingSafeEqual (docs.nodejs.org)
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);
  const isValid =
    tokenBuffer.length === expectedBuffer.length &&
    timingSafeEqual(tokenBuffer, expectedBuffer);

  if (!isValid) {
    return res.status(403).json({ success: false, message: "Forbidden." });
  }

  // Si le token est valide, la requête peut continuer vers la route suivante
  next();
};

export { authAdmin };