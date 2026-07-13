// ============================================
// features/contact/contact.model.ts
// Requetes Prisma pour les messages de contact
// Pattern : ProfMatchAI (Model dans chaque feature)
// ============================================
import { prisma } from "../../lib/prisma";

// Sauvegarder un nouveau message de contact
export const createMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  // Creer le message en base
  const msg = await prisma.message.create({
    data,
  });

  return msg;
};