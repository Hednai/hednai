// ============================================
// config/env.ts
// Validation des variables d'environnement au demarrage.
// Si une variable requise manque ou a un format invalide,
// le serveur refuse de demarrer plutot que d'echouer plus tard en production.
// ============================================
import { z } from "zod";
import "dotenv/config";

// Schema des variables attendues.
// z.url() valide reellement le format (zod v4) : une valeur comme
// "hednai.com" sans schema est rejetee des le demarrage au lieu de casser
// silencieusement CORS et la CSP.
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  DATABASE_URL: z.string().min(1, "DATABASE_URL est requise"),

  // Origines autorisees par CORS, separees par une virgule.
  // Exemple : "https://hednai.com,https://www.hednai.com"
  FRONTEND_URL: z.string().min(1).default("http://localhost:5173"),

  // coerce.number : les variables d'environnement sont toujours des chaines
  PORT: z.coerce.number().int().positive().default(3000),

  REDIS_URL: z.url().optional(),

  // Resend (API HTTP, prioritaire sur le SMTP)
  RESEND_API_KEY: z.string().min(1).optional(),
  MAIL_FROM: z.string().min(1).default("Hednai <contact@send.hednai.com>"),

  // SMTP (repli, utilise si RESEND_API_KEY est absente)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  CONTACT_EMAIL: z.email().default("contact@hednai.com"),

  ADMIN_TOKEN: z.string().min(32, "ADMIN_TOKEN doit faire au moins 32 caracteres"),

  // Webhook Discord optionnel : declare ici pour que TOUTE la configuration
  // passe par le meme schema valide (avant, il etait lu directement dans
  // process.env, donc jamais valide)
  DISCORD_WEBHOOK_URL: z.url().optional(),
});

// Valider au demarrage
const resultat = envSchema.safeParse(process.env);

if (!resultat.success) {
  // z.treeifyError remplace error.format(), deprecie en zod v4
  // Source : zod.dev/v4/changelog
  console.error("Variables d'environnement invalides :");
  console.error(JSON.stringify(z.treeifyError(resultat.error), null, 2));
  process.exit(1);
}

// Exporter les variables validees et typees
export const env = resultat.data;

// Liste des origines autorisees, derivee de FRONTEND_URL.
// Le "replace" retire un eventuel slash final : "https://hednai.com/" et
// "https://hednai.com" sont deux origines differentes pour le navigateur,
// et seule la seconde forme correspond a l'en-tete Origin envoye.
export const ORIGINES_AUTORISEES = env.FRONTEND_URL.split(",")
  .map((origine) => origine.trim().replace(/\/+$/, ""))
  .filter((origine) => origine.length > 0);