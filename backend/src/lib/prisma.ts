// ============================================
// lib/prisma.ts
// Client Prisma unique pour PostgreSQL, partage par toute l'application.
// ============================================
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env";

// Adaptateur PostgreSQL.
// La chaine vient de config/env.ts : elle a deja ete validee au demarrage,
// contrairement a une lecture directe de process.env.
const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

// Client Prisma
const prisma = new PrismaClient({ adapter });

export { prisma };