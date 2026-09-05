// ============================================
// server.ts
// Point d'entree : ouvre les connexions puis demarre le serveur HTTP.
// Toute la configuration Express est dans app.ts.
// ============================================
import { app } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import { connectRedis } from "./config/redis";
import { logger } from "./lib/logger";
import { enregistrerServeur } from "./utils/gracefulShutdown";

const demarrer = async () => {
  // Connecter a PostgreSQL (requis)
  await connectDatabase();

  // Connecter a Redis (optionnel)
  await connectRedis();

  // Demarrer le serveur
  const serveur = app.listen(env.PORT, () => {
    logger.info(`Serveur Hednai demarre sur le port ${env.PORT}`);
  });

  // Confier le serveur a l'arret propre, qui attendra la fin des requetes
  // en cours avant de couper la base sur SIGTERM.
  enregistrerServeur(serveur);
};

// Un rejet non gere ici laisserait le processus vivant sans serveur qui ecoute :
// la plateforme le considererait comme demarre alors qu'il ne repond a rien.
demarrer().catch((err) => {
  logger.error({ err }, "Echec du demarrage du serveur");
  process.exit(1);
});