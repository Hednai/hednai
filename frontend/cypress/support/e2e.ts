// ============================================
// cypress/support/e2e.ts
// Fichier de support charge avant chaque test E2E
// Contient les commandes personnalisees reutilisables
// ============================================

// --- Commande : changer la langue ---
Cypress.Commands.add("switchLanguage", (lang: "fr" | "en") => {
  cy.get(".navbar__lang-btn").contains(lang.toUpperCase()).click();
});

// --- Commande : basculer le mode client/recruteur ---
Cypress.Commands.add("switchMode", (mode: "client" | "recruiter") => {
  cy.get(".view-toggle").then(($toggle) => {
    const currentLabel = $toggle.text().toLowerCase();
    const isRecruiter = currentLabel.includes("client");
    const needsToggle =
      (mode === "recruiter" && !isRecruiter) ||
      (mode === "client" && isRecruiter);

    if (needsToggle) {
      cy.wrap($toggle).find("button").click();
    }
  });
});

// --- Commande : ouvrir le menu mobile ---
Cypress.Commands.add("openMobileMenu", () => {
  cy.get(".navbar__burger").click();
  cy.get(".navbar__links--open").should("be.visible");
});

// Force le fichier a etre un module ES (requis pour declare global)
export {};

// --- Declaration des types pour TypeScript ---
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /** Change la langue du site (FR ou EN) */
      switchLanguage(lang: "fr" | "en"): Chainable<void>;
      /** Bascule entre mode client et mode recruteur */
      switchMode(mode: "client" | "recruiter"): Chainable<void>;
      /** Ouvre le menu mobile (viewport mobile requis) */
      openMobileMenu(): Chainable<void>;
    }
  }
}