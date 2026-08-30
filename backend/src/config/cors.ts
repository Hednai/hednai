// ============================================
// config/cors.ts
// Configuration CORS extraite du server.ts
// Pattern : Hednai v5.2 (extrait pour lisibilite)
// ============================================
import cors from "cors";
import { env } from "./env";

// Middleware CORS configure : autorise le frontend + le header Authorization (dashboard admin)
export const corsMiddleware = cors({
  origin: env.FRONTEND_URL,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
});