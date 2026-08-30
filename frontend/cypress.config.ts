// ============================================
// cypress.config.ts
// Configuration Cypress E2E pour HEDNAI
// Les tests simulent un vrai utilisateur dans un vrai navigateur
// Source : docs.cypress.io/app/references/configuration
// ============================================
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // URL de base du frontend en developpement
    baseUrl: "http://localhost:5173",

    // Dossier des fichiers de test
    specPattern: "cypress/e2e/**/*.cy.ts",

    // Dossier des fichiers de support (commands, hooks)
    supportFile: "cypress/support/e2e.ts",

    // Viewports : desktop par defaut, mobile dans les tests specifiques
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeout pour les commandes (10s par defaut, augmente pour les animations)
    defaultCommandTimeout: 8000,

    // Desactiver la video en CI pour accelerer
    video: false,

    // Screenshots uniquement en cas d'echec
    screenshotOnRunFailure: true,
  },
});