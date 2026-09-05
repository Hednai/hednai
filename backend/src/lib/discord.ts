// ============================================
// lib/discord.ts
// Notification Discord via webhook lors d'un nouveau message de contact.
// Fonctionnalite optionnelle : sans DISCORD_WEBHOOK_URL, la fonction ne fait rien.
// ============================================
import { env } from "../config/env";
import { logger } from "./logger";
import { NOTIFICATION } from "../config/constants";

// Type pour les donnees du message a notifier
interface DiscordNotification {
  name: string;
  contactMethod: string;
  subject: string;
}

// ---- Envoyer une notification Discord ----
export const sendDiscordNotification = async (
  data: DiscordNotification,
): Promise<void> => {
  // Si pas de webhook configure, on ne fait rien
  if (!env.DISCORD_WEBHOOK_URL) return;

  try {
    // Construire le message Discord
    const content = [
      "**NOUVEAU MESSAGE SUR HEDNAI**",
      `**Nom :** ${data.name}`,
      `**Methode :** ${data.contactMethod}`,
      `**Sujet :** ${data.subject}`,
      `**Date :** ${new Date().toLocaleString("fr-FR")}`,
    ].join("\n");

    // AbortSignal.timeout : si Discord ne repond pas, l'appel est coupe.
    // Sans plafond, un webhook lent retenait la requete du visiteur.
    // Source : developer.mozilla.org/docs/Web/API/AbortSignal/timeout_static
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
      signal: AbortSignal.timeout(NOTIFICATION.TIMEOUT_MS),
    });

    logger.info("Notification Discord envoyee");
  } catch (err) {
    // Silencieux — le webhook Discord ne doit jamais bloquer l'API
    logger.warn({ err }, "Echec notification Discord (non-bloquant)");
  }
};