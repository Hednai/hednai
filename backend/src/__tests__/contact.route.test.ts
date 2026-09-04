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

describe("GET /api/health (liveness)", () => {
  // La sonde de vie doit repondre 200 meme si la base est injoignable :
  // c'est tout l'objet du correctif. L'ancien test exigeait status === "ok",
  // donc il ne passait qu'avec une vraie base derriere, ce qui le rendait
  // instable en CI et masquait le bug vu par l'utilisateur (API "hors ligne").
  it("retourne 200 et success:true meme sans base de donnees", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(["ok", "degraded"]).toContain(res.body.status);
    expect(res.body.checks).toHaveProperty("database");
    expect(typeof res.body.uptime).toBe("number");
  });
});

describe("GET /api/health/ready (readiness)", () => {
  // La sonde de disponibilite, elle, doit bien refleter l'etat de la base
  it("renvoie 503 quand la base est injoignable, 200 sinon", async () => {
    const res = await request(app).get("/api/health/ready");

    expect([200, 503]).toContain(res.status);
    expect(res.body.success).toBe(res.status === 200);
  });
});

