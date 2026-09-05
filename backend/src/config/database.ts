// ============================================
// config/database.ts
// Initialisation de la connexion Prisma
// Pattern : Karibou Market config/db.js (adapte MongoDB → Prisma)
// Prisma gere la reconnexion automatiquement
// ============================================
import { prisma } from "../lib/prisma.js";
import { logger } from "../lib/logger.js";

// Verifier que la base est accessible au demarrage
export const connectDatabase = async () => {
  try {
    // Prisma se connecte automatiquement a la premiere requete
    // On force une connexion pour verifier au demarrage
    await prisma.$connect();
    logger.info("PostgreSQL connecte via Prisma.");
  } catch (error) {
    logger.error({ err: error }, "Impossible de connecter a PostgreSQL");
    process.exit(1);
  }
};