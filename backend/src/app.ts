// ============================================
// app.ts
// Creation et configuration de l'application Express
// Separe de server.ts pour pouvoir etre importee dans les tests
// sans demarrer le serveur (Supertest en a besoin)
// ============================================
import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import { corsMiddleware } from "./config/cors";
import xssClean from "./middleware/xssClean";
import { invalidateCache } from "./middleware/cache";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import { contactRouter } from "./features/contact/contact.route";
import { dashboardRouter } from "./features/dashboard/dashboard.route";

// Creer l'application Express
const app = express();

// ---- Middlewares de securite (ordre important) ----

// Trust proxy (pour Render / reverse proxy)
app.set("trust proxy", 1);

// Helmet : headers de securite
app.use(helmet());

// CORS : autoriser seulement le frontend
app.use(corsMiddleware);

// Compression des reponses
app.use(compression());

// Parser le JSON (limite 10kb)
app.use(express.json({ limit: "10kb" }));

// Protection XSS
app.use(xssClean);

// Invalidation du cache Redis
app.use(invalidateCache);

// ---- Rate limiting ----
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Trop de messages. Reessayez dans 15 minutes.",
  },
});

// ---- Routes API ----

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok", time: new Date() });
});

// Contact — avec rate limiting
app.use("/api/contact", contactLimiter, contactRouter);

// Dashboard admin — sans rate limiting (usage interne)
app.use("/api/dashboard", dashboardRouter);

// ---- Gestion des erreurs (en dernier) ----
app.use(notFound);
app.use(errorHandler);

export { app };