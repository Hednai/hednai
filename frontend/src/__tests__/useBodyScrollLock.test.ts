// ============================================
// __tests__/useBodyScrollLock.test.ts
// Tests du verrou de scroll partage.
// Le point critique verifie ici : deux surfaces ouvertes en meme temps ne
// doivent PAS se deverrouiller mutuellement (bug de l'ancien code qui posait
// document.body.style.overflow directement dans chaque composant).
// ============================================
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

describe("useBodyScrollLock", () => {
  beforeEach(() => {
    // Repartir d'un body propre entre chaque test
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  it("bloque le scroll quand locked vaut true", () => {
    renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("ne touche pas au body quand locked vaut false", () => {
    renderHook(() => useBodyScrollLock(false));
    expect(document.body.style.overflow).toBe("");
  });

  it("restaure la valeur d'origine et non 'auto' au demontage", () => {
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    unmount();
    // L'ancien code remettait "auto" : la valeur d'origine est la chaine vide
    expect(document.body.style.overflow).toBe("");
  });

  it("garde le verrou tant qu'une seconde surface est ouverte", () => {
    const premier = renderHook(() => useBodyScrollLock(true));
    const second = renderHook(() => useBodyScrollLock(true));

    // Fermer la premiere surface ne doit PAS rendre le scroll
    premier.unmount();
    expect(document.body.style.overflow).toBe("hidden");

    // Seule la fermeture de la derniere surface libere le scroll
    second.unmount();
    expect(document.body.style.overflow).toBe("");
  });
});