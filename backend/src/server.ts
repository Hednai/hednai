// ============================================
// server.ts
// Point d'entree — demarre le serveur et les connexions
// Toute la configuration Express est dans app.ts
// ============================================
import { app } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import { connectRedis } from "./config/redis";
import { logger } from "./lib/logger";

// Graceful shutdown
import "./utils/gracefulShutdown";

const PORT = env.PORT;

const demarrer = async () => {
  // Connecter a PostgreSQL (requis)
  await connectDatabase();

  // Connecter a Redis (optionnel)
  await connectRedis();

  // Demarrer le serveur
  app.listen(PORT, () => {
    logger.info(`Serveur Hednai demarre sur le port ${PORT}`);
    logger.info(`API : http://localhost:${PORT}/api/health`);
  });
};

demarrer();