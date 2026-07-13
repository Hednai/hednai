// ============================================
// config/redis.ts
// Connexion Redis OPTIONNELLE (Upstash cloud)
// Pattern : ProfMatchAI cache.js + Karibou cache.js
// Si REDIS_URL absent ou Redis down → le serveur tourne sans cache
// ============================================
import { createClient } from "redis";
import type { RedisClientType } from "redis";
import { env } from "./env";

// null = Redis non disponible, le serveur tourne sans
export let redis: RedisClientType | null = null;

// Connexion optionnelle
export const connectRedis = async () => {
  // Si pas d'URL Redis configuree, on skip
  if (!env.REDIS_URL) {
    console.warn("REDIS_URL non definie. Cache desactive.");
    return;
  }

  try {
    // Creer le client Redis
    redis = createClient({ url: env.REDIS_URL });

    // Gerer les erreurs sans planter le serveur
    redis.on("error", () => {
      console.warn("Redis non disponible, cache desactive.");
      redis = null;
    });

    // Connecter
    await redis.connect();
    console.log("Redis connecte (cache actif).");
  } catch {
    console.warn("Redis non disponible. Le serveur fonctionne sans.");
    redis = null;
  }
};

// Deconnecter proprement (appele par gracefulShutdown)
export const disconnectRedis = async () => {
  if (redis) {
    await redis.quit();
  }
};