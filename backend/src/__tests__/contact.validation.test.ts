// ============================================
// __tests__/contact.validation.test.ts
// Test du schema Zod pour le formulaire contact
// Verifie l'union discriminee email/whatsapp
// ============================================
import { describe, it, expect } from "vitest";
import { contactSchema } from "../features/contact/contact.validation";

// Donnees valides pour la methode Email
const donneeEmailValide = {
  contactMethod: "email" as const,
  name: "Jean Dupont",
  email: "jean@example.com",
  subject: "Question projet",
  message: "Bonjour, je voudrais en savoir plus sur vos services maritimes.",
};

// Donnees valides pour la methode WhatsApp
const donneeWhatsappValide = {
  contactMethod: "whatsapp" as const,
  name: "Jean Dupont",
  phone: "2250102919065",
  subject: "Question projet",
  message: "Bonjour, je voudrais en savoir plus sur vos services maritimes.",
};

describe("contactSchema", () => {
  // --- Cas valide : Email ---
  it("accepte des donnees valides via Email", () => {
    const resultat = contactSchema.safeParse(donneeEmailValide);

    expect(resultat.success).toBe(true);
  });

  // --- Cas valide : WhatsApp ---
  it("accepte des donnees valides via WhatsApp", () => {
    const resultat = contactSchema.safeParse(donneeWhatsappValide);

    expect(resultat.success).toBe(true);
  });

  // --- Email invalide ---
  it("rejette un email sans @ (methode email)", () => {
    const resultat = contactSchema.safeParse({
      ...donneeEmailValide,
      email: "pas-un-email",
    });

    expect(resultat.success).toBe(false);
  });

  // --- WhatsApp sans telephone ---
  it("rejette un contact WhatsApp sans numero de telephone", () => {
    const { phone, ...sansTelephone } = donneeWhatsappValide;

    const resultat = contactSchema.safeParse(sansTelephone);

    expect(resultat.success).toBe(false);
  });

  // --- WhatsApp avec telephone trop court ---
  it("rejette un numero de telephone trop court (WhatsApp)", () => {
    const resultat = contactSchema.safeParse({
      ...donneeWhatsappValide,
      phone: "123",
    });

    expect(resultat.success).toBe(false);
  });

  // --- Message trop court ---
  it("rejette un message de moins de 10 caracteres", () => {
    const resultat = contactSchema.safeParse({
      ...donneeEmailValide,
      message: "Court",
    });

    expect(resultat.success).toBe(false);
  });

  // --- Nom trop court ---
  it("rejette un nom de moins de 2 caracteres", () => {
    const resultat = contactSchema.safeParse({
      ...donneeEmailValide,
      name: "A",
    });

    expect(resultat.success).toBe(false);
  });

  // --- Honeypot rempli (bot detecte) ---
  it("rejette un honeypot rempli (bot)", () => {
    const resultat = contactSchema.safeParse({
      ...donneeEmailValide,
      honeypot: "je-suis-un-bot",
    });

    expect(resultat.success).toBe(false);
  });

  // --- Honeypot vide (humain) ---
  it("accepte un honeypot vide", () => {
    const resultat = contactSchema.safeParse({
      ...donneeEmailValide,
      honeypot: "",
    });

    expect(resultat.success).toBe(true);
  });

  // --- contactMethod manquant ou invalide ---
  it("rejette une methode de contact inconnue", () => {
    const resultat = contactSchema.safeParse({
      ...donneeEmailValide,
      contactMethod: "sms",
    });

    expect(resultat.success).toBe(false);
  });
});