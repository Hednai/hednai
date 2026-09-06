// ============================================
// lib/mailer.ts
// Envoi d'email de notification pour les messages du formulaire contact.
// Deux transports : Resend (API HTTP) ou SMTP (Nodemailer).
// Si aucun n'est configure, les emails ne sont pas envoyes mais le
// message reste sauve en base.
// ============================================
import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "./logger.js";
import { NOTIFICATION } from "../config/constants.js";

// Message sortant, independant du fournisseur
interface MailSortant {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

// Contrat commun aux deux transports
interface MailTransport {
  readonly nom: string;
  envoyer(mail: MailSortant): Promise<void>;
}

// ---- Transport Resend (API HTTP, port 443) ----
const creerTransportResend = (cle: string): MailTransport => ({
  nom: "resend",
  async envoyer(mail) {
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: [mail.to],
        subject: mail.subject,
        text: mail.text,
        reply_to: mail.replyTo,
      }),
      signal: AbortSignal.timeout(NOTIFICATION.TIMEOUT_MS),
    });

    if (!reponse.ok) {
      const detail = await reponse.text();
      throw new Error(`Resend ${reponse.status} : ${detail}`);
    }
  },
});

// ---- Transport SMTP (Nodemailer) ----
const creerTransportSmtp = (): MailTransport => {
  const transporteur = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: Number(env.SMTP_PORT) === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: NOTIFICATION.TIMEOUT_MS,
    greetingTimeout: NOTIFICATION.TIMEOUT_MS,
    socketTimeout: NOTIFICATION.TIMEOUT_MS,
  });

  return {
    nom: "smtp",
    async envoyer(mail) {
      await transporteur.sendMail({
        from: env.MAIL_FROM,
        to: mail.to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
      });
    },
  };
};

// Selection du transport au demarrage : Resend si disponible, SMTP sinon
const choisirTransport = (): MailTransport | null => {
  if (env.RESEND_API_KEY) return creerTransportResend(env.RESEND_API_KEY);

  if (env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS) {
    return creerTransportSmtp();
  }

  return null;
};

const transport = choisirTransport();

// Donnees du message contact
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
  if (!transport) {
    logger.warn("Aucun transport email configure. Email non envoye.");
    return false;
  }

  // Pas d'email fourni (contact via WhatsApp)
  if (!data.email) {
    return false;
  }

  try {
    await transport.envoyer({
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

    logger.info({ transport: transport.nom }, "Notification email envoyee");
    return true;
  } catch (error) {
    logger.error({ err: error, transport: transport.nom }, "Erreur envoi email");
    return false;
  }
};