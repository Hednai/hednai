// ============================================
// middleware/cache.ts
// Cache Redis OPTIONNEL pour les reponses GET
// Pattern : ProfMatchAI cache.js + Karibou cache.js
// Si Redis est indisponible, le serveur fonctionne sans cache
// ============================================
import type { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis.js";

// Mettre en cache les reponses GET pendant ttl secondes
export function cacheResponse(ttl = 60) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Pas de cache si Redis est indisponible
    if (!redis) {
      return next();
    }

    // Cache uniquement les requetes GET
    if (req.method !== "GET") {
      return next();
    }

    // Cle de cache basee sur l'URL complete
    const cle = `cache:${req.originalUrl}`;

    try {
      // Verifier si la reponse est deja en cache
      const cached = await redis.get(cle);

      if (cached) {
        return res.json(JSON.parse(cached));
      }

      // Intercepter res.json pour stocker en cache
      const jsonOriginal = res.json.bind(res);

      res.json = function (data: unknown) {
        // Stocker la reponse dans Redis avec le TTL
        redis!.setEx(cle, ttl, JSON.stringify(data)).catch(() => {
          // Silencieux si le stockage echoue
        });

        return jsonOriginal(data);
      } as typeof res.json;

      next();
    } catch {
      // En cas d'erreur Redis, continuer sans cache
      next();
    }
  };
}

// Invalider le cache apres une modification (POST, PUT, DELETE)
export async function invalidateCache(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Pas d'invalidation si Redis est indisponible
  if (!redis) {
    return next();
  }

  // Seulement pour les requetes qui modifient des donnees
  if (req.method === "GET") {
    return next();
  }

  // Intercepter res.json pour invalider apres la reponse
  const jsonOriginal = res.json.bind(res);

  res.json = function (data: unknown) {
    const entite = req.baseUrl.replace("/api/", "");

    // Invalidation async (non-bloquante pour la reponse)
    (async () => {
      try {
        let cursor = "0";
        do {
          const result = await redis!.scan(cursor, {
            MATCH: `cache:*${entite}*`,
            COUNT: 100,
          });
          cursor = result.cursor;
          if (result.keys.length > 0) {
            await redis!.del(result.keys);
          }
        } while (cursor !== "0");
      } catch {
        // Silencieux
      }
    })();

    return jsonOriginal(data);
  } as typeof res.json;

  next();
}