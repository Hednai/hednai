// ============================================
// utils/gracefulShutdown.ts
// Arret propre du serveur sur SIGINT / SIGTERM.
// Sequence : arret des nouvelles connexions, attente des requetes en cours,
// puis fermeture de Prisma et Redis. Un minuteur force la sortie si l'arret
// depasse le delai autorise.
// ============================================
import type { Server } from "node:http";
import { prisma } from "../lib/prisma";
import { disconnectRedis } from "../config/redis";
import { logger } from "../lib/logger";
import { ARRET } from "../config/constants";

// Serveur HTTP a fermer. Renseigne par server.ts une fois app.listen appele.
let serveurHttp: Server | null = null;

// Empeche deux arrets concurrents si SIGINT et SIGTERM arrivent ensemble
let arretEnCours = false;

// Enregistrer le serveur HTTP a fermer.
// Sans cette etape, l'arret coupait la base pendant que des requetes etaient
// encore en cours de traitement : le client recevait une erreur au lieu de
// sa reponse. La plateforme d'hebergement envoie SIGTERM a chaque deploiement.
export const enregistrerServeur = (serveur: Server) => {
  serveurHttp = serveur;
};

// Fermer le serveur HTTP et attendre la fin des requetes en cours
const fermerServeurHttp = (): Promise<void> =>
  new Promise((resolve) => {
    if (!serveurHttp) return resolve();
    serveurHttp.close(() => resolve());
  });

const gracefulShutdown = async (signal: string) => {
  if (arretEnCours) return;
  arretEnCours = true;

  logger.info(`${signal} recu, fermeture propre...`);

  // Minuteur de securite : forcer l'arret si la fermeture s'eternise.
  // unref() evite que ce minuteur maintienne le processus en vie a lui seul.
  const sortieForcee = setTimeout(() => {
    logger.error("Delai d'arret depasse, arret force.");
    process.exit(1);
  }, ARRET.DELAI_MAX_MS);
  sortieForcee.unref();

  try {
    // 1. Ne plus accepter de nouvelles connexions, finir celles en cours
    await fermerServeurHttp();

    // 2. Fermer les connexions aux services externes
    await prisma.$disconnect();
    await disconnectRedis();

    clearTimeout(sortieForcee);
    logger.info("Serveur arrete proprement.");
    process.exit(0);
  } catch (err) {
    logger.error({ err }, "Erreur pendant l'arret du serveur");
    process.exit(1);
  }
};

// Ecouter les signaux d'arret
process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));

export default gracefulShutdown;