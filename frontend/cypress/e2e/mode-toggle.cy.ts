// ============================================
// cypress/e2e/contact-form.cy.ts
// Tests E2E : formulaire de contact (modal)
// Verifie la validation frontend, les onglets email/whatsapp, la soumission
// ============================================

describe("Formulaire de contact", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Ouvre le modal de contact via le CTA du hero
  const openContactModal = () => {
    cy.get(".hero__buttons .btn--primary").first().click();
    cy.get(".contact-modal__content").should("be.visible");
  };

  it("ouvre le modal de contact depuis le bouton hero", () => {
    openContactModal();
    cy.get(".cm__title").should("be.visible");
  });

  it("ouvre le modal depuis la navbar (lien Contact)", () => {
    cy.get(".navbar__link").contains("Contact").click();
    cy.get(".contact-modal__content").should("be.visible");
  });

  it("affiche les erreurs de validation si le formulaire est vide", () => {
    openContactModal();
    // Soumettre sans remplir
    cy.get(".cm__form button[type='submit']").click();
    // Des messages d'erreur doivent apparaitre
    cy.get(".cm__error").should("have.length.greaterThan", 0);
  });

  it("bascule entre onglet Email et WhatsApp", () => {
    openContactModal();
    // Onglet email actif par defaut
    cy.get(".cm__tab--active").should("contain.text", "Email");

    // Cliquer sur WhatsApp
    cy.get(".cm__tab--whatsapp").click();
    cy.get("#phone").should("be.visible");
    cy.get("#email").should("not.exist");

    // Retour sur Email
    cy.get(".cm__tab").first().click();
    cy.get("#email").should("be.visible");
  });

  it("valide un email invalide", () => {
    openContactModal();
    cy.get("#name").type("Test User");
    cy.get("#email").type("pas-un-email");
    cy.get("#subject").select("collaboration");
    cy.get("#message").type("Ceci est un message de test pour Cypress.");
    cy.get(".cm__form button[type='submit']").click();
    // L'erreur email doit apparaitre
    cy.get(".cm__error").should("exist");
  });

  it("remplit et soumet le formulaire avec succes (mock API)", () => {
    // Intercepter l'appel API pour ne pas toucher au vrai backend
    cy.intercept("POST", "**/api/contact", {
      statusCode: 201,
      body: { success: true, data: { id: 999 } },
    }).as("submitContact");

    openContactModal();
    cy.get("#name").type("Cypress Test");
    cy.get("#email").type("cypress@test.com");
    cy.get("#subject").select("collaboration");
    cy.get("#message").type("Message de test automatise via Cypress E2E.");
    cy.get(".cm__form button[type='submit']").click();

    // Attendre la reponse mockee
    cy.wait("@submitContact");

    // Message de succes visible
    cy.get(".cm__msg--ok").should("be.visible");
  });

  it("ferme le modal au clic sur le bouton X", () => {
    openContactModal();
    cy.get(".contact-modal__close").click();
    cy.get(".contact-modal__content").should("not.exist");
  });

  it("ferme le modal au clic sur l'overlay", () => {
    openContactModal();
    // Cliquer sur l'overlay (en dehors du contenu)
    cy.get(".contact-modal__overlay").click("topLeft");
    cy.get(".contact-modal__content").should("not.exist");
  });
});