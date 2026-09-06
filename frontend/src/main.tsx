// ============================================
// main.tsx — Monte React dans le DOM
// ============================================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from "virtual:pwa-register";
import App from "./App";

// Polices auto-hebergees (version variable, toutes graisses 100-900)
import "@fontsource-variable/outfit";
import "@fontsource-variable/jetbrains-mono/wght.css";

import "./index.css";

// Service worker PWA
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);