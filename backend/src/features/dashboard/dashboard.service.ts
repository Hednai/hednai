// ============================================
// features/dashboard/dashboard.service.ts
// Service dashboard — logique metier des statistiques
// ============================================
import { prisma } from "../../lib/prisma";

// ---- Statistiques globales ----
export const getDashboardStats = async () => {
  // Compter le nombre total de messages
  const totalMessages = await prisma.message.count();

  // Dernier message recu
  const lastMessage = await prisma.message.findFirst({
    orderBy: { createdAt: "desc" },
    select: { createdAt: true, name: true, subject: true },
  });

  // Messages par methode de contact
  const byMethod = await prisma.message.groupBy({
    by: ["contactMethod"],
    _count: true,
  });

  // Nombre d'actions dans l'audit log
  const totalAuditLogs = await prisma.auditLog.count();

  return {
    totalMessages,
    lastMessage,
    byMethod,
    totalAuditLogs,
    serverTime: new Date(),
  };
};

// ---- Liste des messages (avec pagination) ----
export const getDashboardMessages = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  // Compter le total pour la pagination
  const total = await prisma.message.count();

  // Recuperer les messages de la page demandee
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      contactMethod: true,
      subject: true,
      message: true,
      createdAt: true,
    },
  });

  return {
    messages,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};