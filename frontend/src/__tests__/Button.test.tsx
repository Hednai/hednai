// ============================================
// __tests__/Button.test.tsx
// Test du composant Button reutilisable
// Verifie les variants, le disabled et le rendu en lien
// ============================================
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../components/ui/Button";

describe("Button", () => {
  // --- Rendu de base ---
  it("affiche le texte du bouton", () => {
    render(<Button>Cliquez ici</Button>);

    expect(screen.getByText("Cliquez ici")).toBeInTheDocument();
  });

  // --- Variant primary (par defaut) ---
  it("applique la classe btn--primary par defaut", () => {
    render(<Button>Test</Button>);

    const bouton = screen.getByRole("button");
    expect(bouton.className).toContain("btn--primary");
  });

  // --- Variant secondary ---
  it("applique la classe btn--secondary", () => {
    render(<Button variant="secondary">Test</Button>);

    const bouton = screen.getByRole("button");
    expect(bouton.className).toContain("btn--secondary");
  });

  // --- Disabled ---
  it("est desactive quand disabled est true", () => {
    render(<Button disabled>Test</Button>);

    const bouton = screen.getByRole("button");
    expect(bouton).toBeDisabled();
  });

  // --- Click handler ---
  it("appelle onClick quand on clique", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Test</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // --- Rendu en lien si href ---
  it("rend un lien si href est fourni", () => {
    render(<Button href="https://hednai.com">Visiter</Button>);

    const lien = screen.getByText("Visiter");
    expect(lien.tagName).toBe("A");
    expect(lien).toHaveAttribute("href", "https://hednai.com");
  });

  // --- Full width ---
  it("applique la classe btn--full si fullWidth est true", () => {
    render(<Button fullWidth>Test</Button>);

    const bouton = screen.getByRole("button");
    expect(bouton.className).toContain("btn--full");
  });
});