// ============================================
// config/cors.ts
// Configuration CORS de l'API.
// Autorise uniquement les origines declarees dans FRONTEND_URL,
// plus l'en-tete Authorization utilise par le dashboard admin.
// ============================================
import cors from "cors";
import { ORIGINES_AUTORISEES } from "./env.js";

// Une liste plutot qu'une chaine unique : le site est joignable sur plusieurs
// origines legitimes (apex, www, domaine de preproduction). Le paquet "cors"
// accepte un tableau et repond alors avec l'origine exacte de la requete.
// Source : github.com/expressjs/cors#configuration-options
export const corsMiddleware = cors({
  origin: ORIGINES_AUTORISEES,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // Duree de mise en cache du preflight par le navigateur (secondes)
  maxAge: 86400,
});