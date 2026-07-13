// ============================================
// __tests__/fetchAPI.test.ts
// Test de la fonction fetchAPI (utilitaire d'appel API)
// Verifie le comportement sur succes et erreur
// ============================================
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchAPI } from "../routes/api";

// Mocker le fetch global du navigateur
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("fetchAPI", () => {
  // Reinitialiser le mock avant chaque test
  beforeEach(() => {
    mockFetch.mockReset();
  });

  // --- Succes : retourne les donnees ---
  it("retourne les donnees sur une reponse 200", async () => {
    // Simuler une reponse OK du backend
    const donnees = { success: true, data: { id: 1 } };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => donnees,
    });

    // Appeler fetchAPI
    const resultat = await fetchAPI("/api/contact");

    // Verifier que le resultat correspond bien
    expect(resultat).toEqual(donnees);
    expect(resultat.success).toBe(true);
  });

  // --- Erreur : lance une exception ---
  it("lance une erreur sur une reponse 400", async () => {
    // Simuler une reponse d'erreur du backend
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: "Donnees invalides." }),
    });

    // Verifier que fetchAPI lance bien une erreur avec le bon message
    await expect(fetchAPI("/api/contact")).rejects.toThrow("Donnees invalides.");
  });

  // --- Erreur serveur avec message par defaut ---
  it("lance 'Erreur serveur.' si aucun message dans la reponse", async () => {
    // Simuler un 500 sans message precis
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false }),
    });

    await expect(fetchAPI("/api/contact")).rejects.toThrow("Erreur serveur.");
  });

  // --- Verifie les headers envoyes ---
  it("envoie le header Content-Type application/json", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await fetchAPI("/api/test");

    // Verifier que fetch a ete appele avec le bon header
    const appelOptions = mockFetch.mock.calls[0][1];
    expect(appelOptions.headers["Content-Type"]).toBe("application/json");
  });
});