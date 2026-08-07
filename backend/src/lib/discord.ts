// ============================================
// lib/discord.ts
// Envoie une notification Discord quand un nouveau message arrive
// Utilise un webhook Discord (gratuit, sans bot)
// Si le webhook n'est pas configure, ne fait rien (optionnel)
// ============================================
import { logger } from "./logger";

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
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) return;

  try {
    // Construire le message Discord
    const content = [
      "**NOUVEAU MESSAGE SUR HEDNAI**",
      `**Nom :** ${data.name}`,
      `**Methode :** ${data.contactMethod}`,
      `**Sujet :** ${data.subject}`,
      `**Date :** ${new Date().toLocaleString("fr-FR")}`,
    ].join("\n");

    // Envoyer au webhook Discord
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    logger.info("Notification Discord envoyee");
  } catch (err) {
    // Silencieux — le webhook Discord ne doit jamais bloquer l'API
    logger.warn({ err }, "Echec notification Discord (non-bloquant)");
  }
};