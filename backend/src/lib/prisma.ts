// ============================================
// lib/prisma.ts
// Client Prisma pour PostgreSQL
// Pattern : Hednai v5.2 (simplifie)
//
// Amelioration future v7 : ajouter Prisma $extends pour
// un audit automatique sur tous les modeles.
// Voir ProfMatchAI prisma.js pour le pattern complet :
// baseClient.$extends({ query: { $allModels: { create, update, delete } } })
// ============================================
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Adaptateur PostgreSQL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Client Prisma
const prisma = new PrismaClient({ adapter });

export { prisma };