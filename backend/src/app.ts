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
import { env } from "./config/env";
import xssClean from "./middleware/xssClean";
import { invalidateCache } from "./middleware/cache";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import { contactRouter } from "./features/contact/contact.route";
import { dashboardRouter } from "./features/dashboard/dashboard.route";

// Creer l'application Express
const app = express();

// ---- Middlewares de securite (ordre important) ----

// Trust proxy : 1 = fait confiance au premier proxy (Render, Nginx)
// Necessaire pour que express-rate-limit voie la vraie IP du client
// Si deploiement change (ex: 2 proxys), adapter la valeur
app.set("trust proxy", 1);

// Helmet : headers de securite avec CSP configuree
// Les defauts de Helmet sont conserves (default-src, font-src, style-src, img-src, etc.)
// On surcharge seulement les sources externes necessaires au projet
// Source : helmetjs.github.io
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "https://plausible.io"],
        connectSrc: ["'self'", env.FRONTEND_URL],
        frameSrc: ["'self'", "https://cal.com"],
      },
    },
    // HSTS : forcer HTTPS (max-age 1 an)
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
  })
);

// CORS : autoriser seulement le frontend
app.use(corsMiddleware);

// Compression des reponses
app.use(compression());

// Parser le JSON (limite 10kb)
app.use(express.json({ limit: "10kb" }));

// Empecher l'indexation des endpoints API par les moteurs de recherche
// Source : Google Search Central (X-Robots-Tag)
app.use("/api", (_req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  next();
});

// Protection XSS (sanitization des inputs)
app.use(xssClean);

// Invalidation du cache Redis
app.use(invalidateCache);

// ---- Rate limiting ----
// Source : npmjs.com/package/express-rate-limit v8

// Formulaire de contact : 10 requetes par 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again in 15 minutes.",
  },
});

// Routes admin : 30 requetes par 15 minutes
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests." },
});

// ---- Routes API ----

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok", time: new Date() });
});

// Contact : rate limiting
app.use("/api/contact", contactLimiter, contactRouter);

// Dashboard admin : rate limiting + auth (token Bearer dans dashboard.route.ts)
app.use("/api/dashboard", adminLimiter, dashboardRouter);

// ---- Gestion des erreurs (en dernier) ----
app.use(notFound);
app.use(errorHandler);

export { app };