// ============================================
// cypress/e2e/admin-dashboard.cy.ts
// Tests E2E : dashboard admin (/admin)
// Teste l'authentification et l'affichage des stats
// Le backend doit tourner en local pour ces tests
// ============================================

describe("Dashboard admin", () => {
  beforeEach(() => {
    cy.visit("/admin");
  });

  it("affiche l'ecran de connexion", () => {
    cy.get(".dashboard__login").should("be.visible");
    cy.get("input[type='password']").should("be.visible");
  });

  it("refuse un mot de passe incorrect", () => {
    // Intercepter l'appel API pour simuler un 401
    cy.intercept("GET", "**/api/dashboard/stats", {
      statusCode: 401,
      body: { success: false, message: "Unauthorized." },
    });
    cy.intercept("GET", "**/api/dashboard/messages*", {
      statusCode: 401,
      body: { success: false, message: "Unauthorized." },
    });

    cy.get("input[type='password']").type("mauvais-token");
    cy.get(".btn--primary").click();
    // L'erreur d'auth doit apparaitre
    cy.get(".dashboard__auth-error").should("be.visible");
  });

  it("affiche le dashboard avec un token valide (mock)", () => {
    // Mocker les reponses API
    cy.intercept("GET", "**/api/dashboard/stats", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          totalMessages: 5,
          lastMessage: {
            createdAt: "2026-08-28T10:00:00Z",
            name: "Test",
            subject: "Test",
          },
          byMethod: [{ contactMethod: "email", _count: 5 }],
          totalAuditLogs: 12,
          serverTime: "2026-08-29T10:00:00Z",
        },
      },
    });
    cy.intercept("GET", "**/api/dashboard/messages*", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          messages: [
            {
              id: 1,
              name: "Alice",
              email: "alice@test.com",
              phone: null,
              contactMethod: "email",
              subject: "collaboration",
              message: "Message de test",
              createdAt: "2026-08-28T10:00:00Z",
            },
          ],
          pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
        },
      },
    });

    cy.get("input[type='password']").type("token-test");
    cy.get(".btn--primary").click();

    // Le dashboard doit afficher les stats
    cy.get(".dashboard__stats-grid").should("be.visible");
    // Les messages doivent etre dans le tableau
    cy.get(".dashboard__table").should("be.visible");
    cy.get(".dashboard__table tbody tr").should("have.length", 1);
  });
});