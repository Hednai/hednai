// ============================================
// __tests__/Navbar.mobile.test.tsx
// Tests de non-regression du menu mobile.
//
// Contrat verrouille : le panneau est monte dans document.body par un portail
// (et non dans la navbar), un voile cliquable existe, les attributs ARIA relient
// le burger au panneau, et les quatre chemins de fermeture fonctionnent.
//
// LIMITE CONNUE : jsdom ne calcule aucune mise en page, ces tests ne peuvent
// donc pas prouver que le menu est VISUELLEMENT visible. Le controle visuel
// reste du ressort de Cypress (cypress/e2e/mobile-menu.cy.ts).
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
    expect(document.querySelector(".mobile-menu__panel")).toBeNull();
  });

  it("le clic sur le burger ouvre le menu", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    expect(obtenirBurger()).toHaveAttribute("aria-expanded", "true");
    expect(document.querySelector(".mobile-menu__panel")).not.toBeNull();
  });

  it("le panneau est monte dans body et non dans la navbar", () => {
    // C'est le portail qui garantit que le panneau ne soit jamais enferme
    // dans le bloc conteneur cree par le backdrop-filter de la navbar
    const { container } = afficherNavbar();
    fireEvent.click(obtenirBurger());

    const panneau = document.querySelector(".mobile-menu__panel");
    expect(panneau).not.toBeNull();
    expect(container.contains(panneau)).toBe(false);
  });

  it("le panneau est annonce comme une surface modale", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    const panneau = document.querySelector(".mobile-menu__panel");
    expect(panneau).toHaveAttribute("role", "dialog");
    expect(panneau).toHaveAttribute("aria-modal", "true");
  });

  it("un voile cliquable dedie existe quand le menu est ouvert", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    expect(document.querySelector(".mobile-menu__backdrop")).not.toBeNull();
  });

  it("le clic sur le voile ferme le menu", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    const voile = document.querySelector(".mobile-menu__backdrop");
    expect(voile).not.toBeNull();
    fireEvent.click(voile as Element);

    expect(obtenirBurger()).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector(".mobile-menu__backdrop")).toBeNull();
  });

  it("le clic sur la croix du panneau ferme le menu", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    const croix = document.querySelector(".mobile-menu__close");
    expect(croix).not.toBeNull();
    fireEvent.click(croix as Element);

    expect(obtenirBurger()).toHaveAttribute("aria-expanded", "false");
  });

  it("le clic sur un lien ferme le menu", () => {
    afficherNavbar();
    fireEvent.click(obtenirBurger());

    const lien = document.querySelector(".mobile-menu__link");
    expect(lien).not.toBeNull();
    fireEvent.click(lien as Element);

    expect(obtenirBurger()).toHaveAttribute("aria-expanded", "false");
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
    fireEvent.click(obtenirBurger());
    const menu = document.querySelector("#navbar-menu");

    expect(menu).not.toBeNull();
    expect(obtenirBurger()).toHaveAttribute("aria-controls", "navbar-menu");
    // screen reste importe pour les futurs tests bases sur les roles
    expect(screen).toBeDefined();
  });
});