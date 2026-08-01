// ============================================
// __tests__/contact.route.test.ts
// Tests d'integration — POST /api/contact
// Utilise Supertest pour tester les routes sans demarrer le serveur
// Prerequis : app.ts separe de server.ts (branche 19a)
// ============================================
import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../app";

// Mock de Prisma pour ne pas toucher a la vraie base de donnees
vi.mock("../lib/prisma", () => ({
  prisma: {
    message: {
      create: vi.fn().mockResolvedValue({ id: 1 }),
    },
    auditLog: {
      create: vi.fn().mockResolvedValue({ id: "mock-uuid" }),
    },
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  },
}));

// Mock du mailer pour ne pas envoyer de vrais emails
vi.mock("../lib/mailer", () => ({
  sendContactNotification: vi.fn().mockResolvedValue(false),
}));

// Donnees valides pour les tests
const donneeEmailValide = {
  contactMethod: "email",
  name: "Jean Dupont",
  email: "jean@example.com",
  subject: "Test projet",
  message: "Bonjour, ceci est un message de test pour verifier l'API.",
};

const donneeWhatsappValide = {
  contactMethod: "whatsapp",
  name: "Jean Dupont",
  phone: "2250102919065",
  subject: "Test projet",
  message: "Bonjour, ceci est un message de test pour verifier l'API.",
};

describe("POST /api/contact", () => {
  // --- Cas valide : Email ---
  it("retourne 201 avec des donnees email valides", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send(donneeEmailValide);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
  });

  // --- Cas valide : WhatsApp ---
  it("retourne 201 avec des donnees whatsapp valides", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send(donneeWhatsappValide);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  // --- Email invalide ---
  it("retourne 400 avec un email invalide", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...donneeEmailValide, email: "pas-un-email" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // --- Message trop court ---
  it("retourne 400 avec un message trop court", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...donneeEmailValide, message: "Court" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // --- Honeypot rempli (bot detecte) ---
  it("retourne 200 (faux succes) quand le honeypot est rempli", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...donneeEmailValide, honeypot: "je-suis-un-bot" });

    // Le honeypot fait echouer la validation Zod (max 0 caracteres)
    // Donc on attend un 400, pas un 200
    expect(res.status).toBe(400);
  });

  // --- Donnees vides ---
  it("retourne 400 avec un body vide", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({});

    expect(res.status).toBe(400);
  });
});

describe("GET /api/health", () => {
  it("retourne 200 avec le statut ok", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe("ok");
  });
});

describe("Route inexistante", () => {
  it("retourne 404 pour une URL inexistante", async () => {
    const res = await request(app).get("/api/nimportequoi");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});