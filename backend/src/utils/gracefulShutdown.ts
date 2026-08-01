// ============================================
// utils/gracefulShutdown.ts
// Fermeture propre du serveur sur SIGINT/SIGTERM
// Pattern : Karibou Market config/db.js (section gracefulShutdown)
// Ferme Prisma et Redis proprement
// Timeout de 5s pour forcer l'arret si ca prend trop longtemps
// ============================================
import { prisma } from "../lib/prisma";
import { disconnectRedis } from "../config/redis";
import { logger } from "../lib/logger";

const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} recu, fermeture propre...`);

  // Timeout de securite : forcer l'arret apres 5 secondes
  const forceExit = setTimeout(() => {
    logger.error("Timeout fermeture, arret force.");
    process.exit(1);
  }, 5000);

  // Fermer Prisma
  await prisma.$disconnect();

  // Fermer Redis (si connecte)
  await disconnectRedis();

  // Annuler le timeout et quitter
  clearTimeout(forceExit);
  logger.info("Serveur arrete proprement.");
  process.exit(0);
};

// Ecouter les signaux d'arret
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

export default gracefulShutdown;