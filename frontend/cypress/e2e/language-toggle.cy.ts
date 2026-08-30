// ============================================
// cypress/e2e/language-toggle.cy.ts
// Tests E2E : changement de langue FR / EN
// Verifie que les textes changent et que l'attribut lang du HTML est mis a jour
// ============================================

describe("Changement de langue", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("demarre en francais par defaut", () => {
    // L'attribut lang du HTML doit etre "fr"
    cy.get("html").should("have.attr", "lang", "fr");
    // Le bouton FR doit etre actif
    cy.get(".navbar__lang-btn--active").should("contain.text", "FR");
  });

  it("passe en anglais au clic sur EN", () => {
    cy.get(".navbar__lang-btn").contains("EN").click();
    // L'attribut lang doit changer
    cy.get("html").should("have.attr", "lang", "en");
    // Le bouton EN doit etre actif
    cy.get(".navbar__lang-btn--active").should("contain.text", "EN");
  });

  it("revient en francais au clic sur FR", () => {
    // Passer en EN d'abord
    cy.get(".navbar__lang-btn").contains("EN").click();
    // Puis revenir en FR
    cy.get(".navbar__lang-btn").contains("FR").click();
    cy.get("html").should("have.attr", "lang", "fr");
  });

  it("change le texte du Hero selon la langue", () => {
    // Capturer le texte FR
    cy.get(".hero__content h1").invoke("text").then((frText) => {
      // Passer en EN
      cy.get(".navbar__lang-btn").contains("EN").click();
      // Le titre doit etre different
      cy.get(".hero__content h1").invoke("text").should("not.eq", frText);
    });
  });
});