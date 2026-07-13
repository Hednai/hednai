// ============================================
// __tests__/contact.validation.test.ts
// Test du schema Zod pour le formulaire contact
// Verifie que la validation rejette les mauvaises donnees
// ============================================
import { describe, it, expect } from "vitest";
import { contactSchema } from "../features/contact/contact.validation";

// Donnees valides utilisees comme base pour tous les tests
const donneeValide = {
  name: "Jean Dupont",
  email: "jean@example.com",
  subject: "Question projet",
  message: "Bonjour, je voudrais en savoir plus sur vos services maritimes.",
};

describe("contactSchema", () => {
  // --- Cas valide ---
  it("accepte des donnees valides", () => {
    const resultat = contactSchema.safeParse(donneeValide);

    expect(resultat.success).toBe(true);
  });

  // --- Email invalide ---
  it("rejette un email sans @", () => {
    const resultat = contactSchema.safeParse({
      ...donneeValide,
      email: "pas-un-email",
    });

    expect(resultat.success).toBe(false);
  });

  // --- Message trop court ---
  it("rejette un message de moins de 10 caracteres", () => {
    const resultat = contactSchema.safeParse({
      ...donneeValide,
      message: "Court",
    });

    expect(resultat.success).toBe(false);
  });

  // --- Nom trop court ---
  it("rejette un nom de moins de 2 caracteres", () => {
    const resultat = contactSchema.safeParse({
      ...donneeValide,
      name: "A",
    });

    expect(resultat.success).toBe(false);
  });

  // --- Honeypot rempli (bot detecte) ---
  it("rejette un honeypot rempli (bot)", () => {
    const resultat = contactSchema.safeParse({
      ...donneeValide,
      honeypot: "je-suis-un-bot",
    });

    expect(resultat.success).toBe(false);
  });

  // --- Honeypot vide (humain) ---
  it("accepte un honeypot vide", () => {
    const resultat = contactSchema.safeParse({
      ...donneeValide,
      honeypot: "",
    });

    expect(resultat.success).toBe(true);
  });
});