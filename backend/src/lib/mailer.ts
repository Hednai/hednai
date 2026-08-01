// ============================================
// lib/mailer.ts
// Envoi d'email via Nodemailer (SMTP)
// Pattern : nouveau
// Optionnel : si les variables SMTP ne sont pas dans le .env,
// les emails ne sont pas envoyes mais le message est sauve en base
// ============================================
import nodemailer from "nodemailer";
import { env } from "../config/env";
import { logger } from "./logger";

// Verifier si l'email est configure
const isMailConfigured =
  env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS;

// Creer le transporteur SMTP (ou null si pas configure)
const transporter = isMailConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  : null;

// Interface pour les donnees du message
// email est optionnel : si le visiteur a contacte via WhatsApp,
// il n'y a pas d'email a notifier
interface ContactData {
  name: string;
  email?: string;
  subject: string;
  message: string;
}

// Envoyer un email de notification pour un nouveau message contact
export const sendContactNotification = async (
  data: ContactData,
): Promise<boolean> => {
  // Si l'email n'est pas configure cote serveur, on skip
  if (!transporter) {
    logger.warn("SMTP non configure. Email non envoye.");
    return false;
  }

  // Si le visiteur a contacte via WhatsApp (pas d'email fourni), on skip aussi
  // Rien a notifier par email dans ce cas
  if (!data.email) {
    return false;
  }

  try {
    // Envoyer l'email
    await transporter.sendMail({
      from: `"Hednai Contact" <${env.SMTP_USER}>`,
      to: env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `[Hednai] ${data.subject}`,
      text: [
        `Nouveau message de ${data.name} (${data.email})`,
        "",
        `Sujet : ${data.subject}`,
        "",
        data.message,
      ].join("\n"),
    });

    return true;
  } catch (error) {
    logger.error({ err: error }, "Erreur envoi email");
    return false;
  }
};