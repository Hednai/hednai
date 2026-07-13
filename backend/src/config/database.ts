// ============================================
// config/database.ts
// Initialisation de la connexion Prisma
// Pattern : Karibou Market config/db.js (adapte MongoDB → Prisma)
// Prisma gere la reconnexion automatiquement
// ============================================
import { prisma } from "../lib/prisma";

// Verifier que la base est accessible au demarrage
export const connectDatabase = async () => {
  try {
    // Prisma se connecte automatiquement a la premiere requete
    // On force une connexion pour verifier au demarrage
    await prisma.$connect();
    console.log("PostgreSQL connecte via Prisma.");
  } catch (error) {
    console.error("Impossible de connecter a PostgreSQL :", (error as Error).message);
    process.exit(1);
  }
};