// ============================================
// context/ViewModeContext.tsx
// Contexte global qui gere le mode d'affichage du site
// "client" = startup (nous, solutions, maritime)
// "recruiter" = portfolio (je, competences, CV)
// Le toggle est dans la Navbar
// ============================================
import { createContext, useState, useCallback, useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";

// Les deux modes possibles
type ViewMode = "client" | "recruiter";

// Ce que le contexte fournit a toute l'application
interface ViewModeContextType {
  mode: ViewMode;
  toggleMode: () => void;
  setMode: (mode: ViewMode) => void;
  isRecruiter: boolean;
  // Callback optionnel execute apres chaque changement de mode
  onModeChange: ((newMode: ViewMode) => void) | null;
  setOnModeChange: (cb: ((newMode: ViewMode) => void) | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

// Cle de stockage — declaree une seule fois (pas de chaine en dur repetee)
const CLE_STOCKAGE = "hednai-mode";

// Provider qui enveloppe l'application
export function ViewModeProvider({ children }: { children: ReactNode }) {
  // Mode par defaut : client (startup).
  // On relit le choix precedent dans le localStorage.
  const [mode, setModeState] = useState<ViewMode>(() => {
    try {
      return localStorage.getItem(CLE_STOCKAGE) === "recruiter" ? "recruiter" : "client";
    } catch {
      return "client";
    }
  });

  // Sauvegarde du mode a chaque changement (effet, jamais pendant le rendu)
  useEffect(() => {
    try {
      localStorage.setItem(CLE_STOCKAGE, mode);
    } catch {
      // Navigation privee Safari : le stockage peut lever une exception
    }
  }, [mode]);

  // Callback optionnel pour reagir au changement de mode (ex: scroll to top).
  // useRef au lieu de useState : changer le callback ne doit PAS recreer
  // toggleMode ni setMode, sinon chaque enregistrement du callback par
  // MainLayout provoque une cascade de re-rendus via useMemo.
  const onModeChangeRef = useRef<((newMode: ViewMode) => void) | null>(null);

  // Setter stable : met a jour la ref sans declencher de rendu
  const setOnModeChange = useCallback(
    (cb: ((newMode: ViewMode) => void) | null) => {
      onModeChangeRef.current = cb;
    },
    [],
  );

  // Definir un mode specifique (utile pour le CTA recruteur)
  const setMode = useCallback((newMode: ViewMode) => {
    setModeState(newMode);
    // Le callback est lu dans la ref au moment de l'appel,
    // donc toujours a jour, jamais une closure perimee
    onModeChangeRef.current?.(newMode);
  }, []);

  // Basculer entre les deux modes
  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next = prev === "client" ? "recruiter" : "client";
      // requestAnimationFrame : repousse le navigate() APRES que React a
      // termine la mise a jour d'etat. L'ancienne version appelait navigate()
      // PENDANT setModeState, ce qui est un effet de bord dans un updater
      // et pouvait etre ignore silencieusement par React.
      requestAnimationFrame(() => onModeChangeRef.current?.(next));
      return next;
    });
  }, []);

  // Raccourci pour savoir si on est en mode recruteur
  const isRecruiter = mode === "recruiter";

  // useMemo : sans lui, un nouvel objet etait cree a chaque rendu du provider.
  // toggleMode, setMode et setOnModeChange sont tous stables (deps vides),
  // donc le memo ne se recalcule QUE quand mode change. C'est exactement
  // le comportement voulu.
  const valeur = useMemo(
    () => ({ mode, toggleMode, setMode, isRecruiter, onModeChange: null, setOnModeChange }),
    [mode, toggleMode, setMode, isRecruiter, setOnModeChange],
  );

  return (
    <ViewModeContext.Provider value={valeur}>
      {children}
    </ViewModeContext.Provider>
  );
}