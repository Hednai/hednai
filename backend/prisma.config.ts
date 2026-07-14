// ============================================
// prisma.config.ts
// Configuration Prisma 7 — necessaire pour que les commandes CLI
// (prisma db push, prisma generate...) lisent le fichier .env
// Depuis Prisma 7, l'URL de connexion ne se met plus dans schema.prisma,
// elle doit etre ici, dans datasource.url
// ============================================
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});