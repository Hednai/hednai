// ============================================
// lib/logger.ts
// Logger structure avec Pino (remplace console.log/warn/error)
// En production : JSON structure avec horodatage
// En dev : format lisible pour le terminal
// ============================================
import pino from "pino";

// Creer le logger avec un nom d'application
const logger = pino({
  name: "hednai",

  // En dev : format lisible. En prod : JSON brut
  transport:
    process.env.NODE_ENV === "development"
      ? { target: "pino/file", options: { destination: 1 } }
      : undefined,

  // Niveau minimum selon l'environnement
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
});

export { logger };