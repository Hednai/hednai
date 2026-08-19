// ============================================
// hooks/useOutsideClick.ts
// Detecte les clics en dehors d'un element ref
// Utilise pour fermer les cartes expandables, modals, etc.
// ============================================
import { useEffect, type RefObject } from "react";

export function useOutsideClick(
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}