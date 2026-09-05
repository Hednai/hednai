// ============================================
// cypress/e2e/portfolio.cy.ts
// Tests E2E : section Portfolio (filtres, cartes expandables)
// ============================================

describe("Portfolio", () => {
  beforeEach(() => {
    cy.visit("/");
    // Scroller vers la section portfolio
    cy.get("#portfolio").scrollIntoView();
  });

  it("affiche les boutons de filtre", () => {
    cy.get(".portfolio-filters").should("be.visible");
    cy.get(".filter-btn").should("have.length.greaterThan", 3);
  });

  it("le filtre Selection est actif par defaut", () => {
    cy.get(".filter-btn--active").should("exist");
  });

  it("filtre les projets par categorie", () => {
    // Compter les cartes avec le filtre par defaut
    cy.get(".portfolio-grid .card").then(($defaultCards) => {
      const defaultCount = $defaultCards.length;

      // Cliquer sur "Tous" pour voir tous les projets
      cy.get(".filter-btn").last().click();
      cy.get(".portfolio-grid .card").should(
        "have.length.greaterThan",
        defaultCount - 1
      );
    });
  });

  it("ouvre une carte au clic et affiche les details", () => {
    // Cliquer sur la premiere carte
    cy.get(".portfolio-grid .card").first().click();
    // L'overlay doit apparaitre
    cy.get(".portfolio-expanded").should("be.visible");
    // Le titre doit etre visible
    cy.get(".portfolio-expanded h3").should("be.visible");
    // Les technologies doivent etre listees
    cy.get(".portfolio-expanded .tech-tag").should("have.length.greaterThan", 0);
  });

  it("ferme la carte expandee au clic sur X", () => {
    cy.get(".portfolio-grid .card").first().click();
    cy.get(".portfolio-expanded").should("be.visible");
    cy.get(".portfolio-expanded__close").click();
    cy.get(".portfolio-expanded").should("not.exist");
  });

  it("ferme la carte expandee avec Escape", () => {
    cy.get(".portfolio-grid .card").first().click();
    cy.get(".portfolio-expanded").should("be.visible");
    cy.get("body").type("{esc}");
    cy.get(".portfolio-expanded").should("not.exist");
  });
});