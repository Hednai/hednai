// ============================================
// features/contact/contact.model.ts
// Requetes Prisma pour les messages de contact
// Pattern : ProfMatchAI (Model dans chaque feature)
// ============================================
import { prisma } from "../../lib/prisma";

// Sauvegarder un nouveau message de contact
// email et phone sont optionnels : selon contactMethod,
// un seul des deux est rempli (jamais les deux)
export const createMessage = async (data: {
  name: string;
  email?: string;
  phone?: string;
  contactMethod: string;
  subject: string;
  message: string;
}) => {
  // Creer le message en base
  const msg = await prisma.message.create({
    data,
  });

  return msg;
};