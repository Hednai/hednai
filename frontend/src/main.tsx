// ============================================
// main.tsx — Monte React dans le DOM
// ============================================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./index.css";

// ---- Service worker (PWA) ----
// Genere par vite-plugin-pwa au build. Sans service worker actif, Chrome ne
// declenche jamais l'evenement "beforeinstallprompt" : la banniere
// d'installation du site ne peut pas apparaitre.
// immediate: true => enregistrement des le chargement, sans attendre "load".
// En developpement, le plugin ne genere rien : l'appel est simplement inerte.
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);