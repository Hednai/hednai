// ============================================
// config/env.ts
// Validation des variables d'environnement au demarrage
// Si une variable requise manque, le serveur refuse de demarrer
// Pattern : nouveau (bonne pratique Zod)
// ============================================
import { z } from "zod";
import "dotenv/config";

// Schema des variables attendues
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL est requise"),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
  PORT: z.string().default("3000"),
  REDIS_URL: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  CONTACT_EMAIL: z.string().default("contact@hednai.com"),
});

// Valider au demarrage
const resultat = envSchema.safeParse(process.env);

if (!resultat.success) {
  console.error("Variables d'environnement invalides :");
  console.error(resultat.error.format());
  process.exit(1);
}

// Exporter les variables validees et typees
export const env = resultat.data;