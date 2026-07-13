// ============================================
// server.ts
// Point d'entree principal du backend Hednai
// Pattern : Karibou Market server.js (ordre des middlewares)
// Monte les middlewares de securite et les routes par feature
// ============================================
import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

// Config
import { env } from "./config/env";
import { corsMiddleware } from "./config/cors";
import { connectDatabase } from "./config/database";
import { connectRedis } from "./config/redis";

// Middlewares de securite
import xssClean from "./middleware/xssClean";
import { invalidateCache } from "./middleware/cache";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";

// Routes par feature
import { contactRouter } from "./features/contact/contact.route";

// Graceful shutdown (ecoute SIGINT/SIGTERM)
import "./utils/gracefulShutdown";

// ============================================
// 1. CREER L'APPLICATION EXPRESS
// ============================================
const app = express();
const PORT = env.PORT;

// ============================================
// 2. CONNEXIONS (base de donnees + cache optionnel)
// ============================================
const demarrer = async () => {
  // Connecter a PostgreSQL (requis)
  await connectDatabase();

  // Connecter a Redis (optionnel — le serveur marche sans)
  await connectRedis();

  // ============================================
  // 3. MIDDLEWARES DE SECURITE (ordre important)
  // ============================================

  // Trust proxy (pour Render / reverse proxy)
  app.set("trust proxy", 1);

  // Helmet : headers de securite (CSP, HSTS, X-Frame-Options)
  app.use(helmet());

  // CORS : autoriser seulement le frontend
  app.use(corsMiddleware);

  // Compression des reponses
  app.use(compression());

  // Parser le JSON (limite 10kb pour eviter les payloads enormes)
  app.use(express.json({ limit: "10kb" }));

  // Protection XSS (preserve les accents francais)
  app.use(xssClean);

  // Invalidation du cache Redis sur les modifications
  app.use(invalidateCache);

  // ============================================
  // 4. RATE LIMITING (memoire — suffisant pour un portfolio)
  // ============================================
  // v7 : remplacer par Redis rate limiting si trafic important
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 messages max par fenetre
    message: {
      success: false,
      message: "Trop de messages. Reessayez dans 15 minutes.",
    },
  });

  // ============================================
  // 5. ROUTES API
  // ============================================

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ success: true, status: "ok", time: new Date() });
  });

  // Contact — avec rate limiting
  app.use("/api/contact", contactLimiter, contactRouter);

  // v7 : ajouter features/blog/, features/testimonial/, etc.

  // ============================================
  // 6. GESTION DES ERREURS (en dernier)
  // ============================================

  // 404 — routes inexistantes
  app.use(notFound);

  // Gestion centralisee des erreurs
  app.use(errorHandler);

  // ============================================
  // 7. DEMARRER LE SERVEUR
  // ============================================
  app.listen(PORT, () => {
    console.log(`Serveur Hednai demarre sur le port ${PORT}`);
    console.log(`API : http://localhost:${PORT}/api/health`);
  });
};

// Lancer le demarrage
demarrer();