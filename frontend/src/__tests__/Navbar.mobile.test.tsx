// ============================================
// __tests__/Navbar.mobile.test.tsx
// Tests de non-regression du menu mobile.
//
// Rappel du bug corrige : backdrop-filter sur .navbar creait un bloc conteneur
// pour le position:fixed du menu, qui se retrouvait enferme dans une bande de
// 72 px et sans zone de fond cliquable.
//
// LIMITE CONNUE : jsdom ne calcule aucune mise en page, ces tests ne peuvent
// donc pas prouver que le menu est VISUELLEMENT visible. Ils verrouillent le
// contrat du composant : classe posee sur la nav, fond present et cliquable,
// attributs ARIA corrects. Le controle visuel reste du ressort de Cypress
// (cypress/e2e/mobile-menu.cy.ts).
// ============================================
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "../i18n/LanguageContext";
import { ViewModeProvider } from "../context/ViewModeContext";
import { Navbar } from "../components/sections/Navbar";

// Enveloppe la Navbar de tous les providers dont elle depend
function afficherNavbar() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <LanguageProvider>
          <ViewModeProvider>
            <Navbar />
          </ViewModeProvider>
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

// Le bouton burger est le seul bouton portant aria-controls="navbar-menu"
function obtenirBurger(): HTMLElement {
  const burger = document.querySelector('[aria-controls="navbar-menu"]');
  if (!burger) throw new Error("Bouton burger introuvable");
  return burger as HTMLElement;
}

describe("Navbar — menu mobile", () => {
  it("le menu est ferme au premier rendu", () => {
    afficherNavbar();
    expect(obtenirBurger()).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector(".navbar__links--open")).toBeNull();
  });

  it("le clic sur le burger ouvre le menu", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    expect(obtenirBurger()).toHaveAttribute("aria-expanded", "true");
    expect(document.querySelector(".navbar__links--open")).not.toBeNull();
  });

  it("la nav porte navbar--menu-open quand le menu est ouvert", () => {
    // C'est cette classe qui neutralise le backdrop-filter, donc qui rend
    // le menu plein ecran reellement visible
    const { container } = afficherNavbar();
    fireEvent.click(obtenirBurger());

    expect(container.querySelector("nav")?.className).toContain("navbar--menu-open");
  });

  it("un fond cliquable dedie existe quand le menu est ouvert", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    expect(document.querySelector(".navbar__backdrop")).not.toBeNull();
  });

  it("le clic sur le fond ferme le menu", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    const fond = document.querySelector(".navbar__backdrop");
    expect(fond).not.toBeNull();
    fireEvent.click(fond as Element);

    expect(obtenirBurger()).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector(".navbar__backdrop")).toBeNull();
  });

  it("la touche Echap ferme le menu et rend le focus au burger", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    fireEvent.keyDown(window, { key: "Escape" });

    expect(obtenirBurger()).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(obtenirBurger());
  });

  it("le menu est relie au burger par aria-controls", () => {
    afficherNavbar();
    const menu = document.querySelector("#navbar-menu");

    expect(menu).not.toBeNull();
    expect(obtenirBurger()).toHaveAttribute("aria-controls", "navbar-menu");
    // screen reste importe pour les futurs tests bases sur les roles
    expect(screen).toBeDefined();
  });
});