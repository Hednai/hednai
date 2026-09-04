// ============================================
// hooks/useOutsideClick.ts
// Detecte les clics en dehors d'un element ref
// Utilise pour fermer les cartes expandables, modals, etc.
// Delai de 300ms apres le montage pour eviter que le double-clic
// sur une carte en extremite ne referme immediatement l'overlay
// ============================================
import { useEffect, useRef, type RefObject } from "react";

export function useOutsideClick(
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void
) {
  // Horodatage du montage : sert a ignorer les clics trop proches de l'ouverture.
  // Initialise a 0 et non a Date.now() : appeler une fonction impure pendant le
  // rendu viole les regles des composants React (regle react-hooks/purity).
  // La vraie valeur est posee dans l'effet ci-dessous, qui lui a le droit.
  const mountedAt = useRef(0);

  useEffect(() => {
    // Memorise le moment ou l'effet est (re)monte
    mountedAt.current = Date.now();

    function handleClick(event: MouseEvent) {
      // Ignore les clics dans les 300ms apres le montage (double-clic)
      if (Date.now() - mountedAt.current < 300) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}