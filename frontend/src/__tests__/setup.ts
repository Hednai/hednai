// ============================================
// __tests__/setup.ts
// Configuration globale des tests Vitest
// Ajoute les matchers jest-dom (toBeInTheDocument, toBeDisabled, etc.)
// ============================================
import "@testing-library/jest-dom";

// jsdom ne fournit pas toujours un localStorage fonctionnel : selon la version
// et l'origine du document, l'objet peut exister mais sans ses methodes.
// On teste donc la presence de getItem, et non celle de l'objet : un simple
// "if (!window.localStorage)" ne declenche jamais dans ce cas.
// useTheme, LanguageContext et ViewModeContext lisent localStorage des le
// premier rendu : sans ce double, tous les tests de composants echouent.
if (typeof globalThis.localStorage?.getItem !== "function") {
  const donnees = new Map<string, string>();

  const doubleStockage: Storage = {
    getItem: (cle) => (donnees.has(cle) ? donnees.get(cle)! : null),
    setItem: (cle, valeur) => { donnees.set(String(cle), String(valeur)); },
    removeItem: (cle) => { donnees.delete(cle); },
    clear: () => { donnees.clear(); },
    key: (index) => Array.from(donnees.keys())[index] ?? null,
    get length() { return donnees.size; },
  };

  // On pose le double sur window ET sur globalThis : le code applicatif ecrit
  // "localStorage.getItem(...)" sans prefixe, qui se resout sur globalThis.
  for (const cible of [globalThis, window]) {
    Object.defineProperty(cible, "localStorage", {
      value: doubleStockage,
      writable: true,
      configurable: true,
    });
  }
}

// jsdom (l'environnement de test) n'implemente pas scrollIntoView
// On ajoute une version vide pour eviter que les tests plantent
// quand le code appelle cette fonction (ex: Contact.tsx)
Element.prototype.scrollIntoView = () => {};

// jsdom n'implemente pas window.matchMedia. Plusieurs modules du projet s'en
// servent legitimement : useTheme (preference systeme clair/sombre), Navbar
// (fermeture du menu au passage en desktop) et Portfolio (prefers-reduced-motion).
// On fournit une implementation minimale conforme a l'interface MediaQueryList.
// Source : vitest.dev/guide/mocking + MDN MediaQueryList
if (!window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList => ({
    media: query,
    matches: false,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    // API historique, encore lue par certaines librairies
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom n'implemente pas non plus IntersectionObserver, utilise par
// useScrollSpy pour surligner le lien de navigation actif.
// Implementation minimale : les methodes existent et ne font rien.
if (!("IntersectionObserver" in window)) {
  class ObservateurIntersectionFactice {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  // Double conversion volontaire : l'interface DOM evolue d'une version de
  // TypeScript a l'autre (ajout de scrollMargin, etc.). On ne veut pas que le
  // double de test casse la compilation a chaque montee de version.
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: ObservateurIntersectionFactice as unknown as typeof IntersectionObserver,
  });
}