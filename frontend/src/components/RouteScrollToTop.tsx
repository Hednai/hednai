// ============================================
// components/RouteScrollToTop.tsx
// Remonte en haut de page a chaque changement de route
// ============================================
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function RouteScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}