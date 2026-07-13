// ============================================
// __tests__/setup.ts
// Configuration globale des tests Vitest
// Ajoute les matchers jest-dom (toBeInTheDocument, toBeDisabled, etc.)
// ============================================
import "@testing-library/jest-dom";

// jsdom (l'environnement de test) n'implemente pas scrollIntoView
// On ajoute une version vide pour eviter que les tests plantent
// quand le code appelle cette fonction (ex: Contact.tsx)
Element.prototype.scrollIntoView = () => {};