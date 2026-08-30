// ============================================
// cypress/e2e/mobile-menu.cy.ts
// Tests E2E : menu hamburger sur mobile
// Viewport 390px (iPhone 14/15 standard)
// ============================================

describe("Menu mobile", () => {
  beforeEach(() => {
    // Simuler un ecran mobile iPhone 14
    cy.viewport(390, 844);
    cy.visit("/");
  });

  it("affiche le bouton burger sur mobile", () => {
    cy.get(".navbar__burger").should("be.visible");
  });

  it("cache les liens de navigation par defaut", () => {
    cy.get(".navbar__links").should("not.be.visible");
  });

  it("ouvre le menu au clic sur le burger", () => {
    cy.get(".navbar__burger").click();
    cy.get(".navbar__links--open").should("be.visible");
  });

  it("affiche les icones des liens en mobile", () => {
    cy.get(".navbar__burger").click();
    cy.get(".navbar__link-icon").first().should("be.visible");
  });

  it("ferme le menu au clic sur le bouton X", () => {
    cy.get(".navbar__burger").click();
    cy.get(".navbar__links--open").should("be.visible");
    // Le burger est devenu un X
    cy.get(".navbar__burger").click();
    cy.get(".navbar__links--open").should("not.exist");
  });

  it("ferme le menu au clic sur un lien", () => {
    cy.get(".navbar__burger").click();
    cy.get(".navbar__links--open").should("be.visible");
    // Cliquer sur un lien de navigation
    cy.get(".navbar__link").contains("Services").click();
    // Le menu doit se fermer
    cy.get(".navbar__links--open").should("not.exist");
  });

  it("navigue correctement depuis le menu mobile", () => {
    cy.get(".navbar__burger").click();
    cy.get(".navbar__link").contains("Portfolio").click();
    // La section portfolio doit etre visible
    cy.get("#portfolio").should("exist");
  });
});