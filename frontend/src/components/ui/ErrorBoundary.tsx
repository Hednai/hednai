// ============================================
// components/ui/ErrorBoundary.tsx
// Attrape les erreurs React pour eviter l'ecran blanc
// C'est une classe car cette fonctionnalite (getDerivedStateFromError)
// n'existe pas encore en hook, seulement en composant classe
// ============================================
import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // React appelle cette methode automatiquement si une erreur survient plus bas dans l'arbre
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // Utile pour logger l'erreur (ici juste dans la console)
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary :", error, info);
  }

  render() {
    // Si une erreur a ete attrapee, on affiche un message au lieu de planter
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Une erreur est survenue.</h2>
          <p>Rechargez la page ou reessayez plus tard.</p>
        </div>
      );
    }

    return this.props.children;
  }
}