// ============================================
// cypress/e2e/navigation.cy.ts
// Tests E2E : navigation entre les pages et sections
// Verifie que toutes les routes fonctionnent et que le contenu se charge
// ============================================

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("affiche la page d'accueil avec le Hero", () => {
    cy.get("#accueil").should("exist");
    cy.get(".hero__content h1").should("be.visible");
  });

  it("scroll vers chaque section depuis la navbar", () => {
    // Cliquer sur "Pourquoi" dans la navbar
    cy.get(".navbar__link").contains("Pourquoi").click();
    cy.get("#pourquoi").should("be.visible");

    // Cliquer sur "Services"
    cy.get(".navbar__link").contains("Services").click();
    cy.get("#services").should("be.visible");

    // Cliquer sur "Portfolio"
    cy.get(".navbar__link").contains("Portfolio").click();
    cy.get("#portfolio").should("be.visible");
  });

  it("navigue vers la page Blog", () => {
    cy.get(".navbar__link").contains("Articles").click();
    cy.url().should("include", "/blog");
    // La page Blog doit contenir un titre
    cy.get("h1").should("be.visible");
  });

  it("navigue vers les Mentions legales depuis le footer", () => {
    // Scroller vers le bas pour voir le footer
    cy.get(".footer__legal a").first().click({ force: true });
    cy.url().should("include", "/mentions-legales");
    cy.get("h1").should("be.visible");
  });

  it("navigue vers la Politique de confidentialite depuis le footer", () => {
    cy.get(".footer__legal a").last().click({ force: true });
    cy.url().should("include", "/confidentialite");
    cy.get("h1").should("be.visible");
  });

  it("affiche la page 404 pour une URL inconnue", () => {
    cy.visit("/page-inexistante", { failOnStatusCode: false });
    cy.get("body").should("contain.text", "404");
  });

  it("retourne a l'accueil via le logo", () => {
    cy.visit("/blog");
    cy.get(".navbar__logo").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });
});