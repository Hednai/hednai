// ============================================
// vite.config.ts
// Configuration Vite + Vitest + PWA + decoupage du bundle
//
// Trois changements par rapport a la version precedente :
//   1. Tailwind retire : aucune classe utilitaire n'etait utilisee dans le code
//      (verifie par recherche sur tout src/). Deux dependances en moins.
//   2. vite-plugin-pwa : genere le manifeste ET le service worker. Sans service
//      worker, Chrome ne declenche jamais "beforeinstallprompt" : la banniere
//      d'installation ne pouvait pas apparaitre.
//      Source : web.dev/articles/install-criteria
//   3. manualChunks : le bundle principal faisait 449 ko d'un seul bloc.
//      On isole les grosses librairies pour qu'elles soient mises en cache
//      independamment du code applicatif.
// ============================================
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    // ---- PWA : manifeste + service worker ----
    VitePWA({
      // Le service worker se met a jour tout seul, sans invite a l'utilisateur
      registerType: "autoUpdate",

      // Fichiers de public/ a inclure tels quels dans le precache
      includeAssets: [
        "favicon-32.png",
        "apple-touch-icon.png",
        "logo-anchor.webp",
        "robots.txt",
      ],

      // Source unique de verite du manifeste.
      // L'ancien public/manifest.json est supprime : il pointait vers
      // /logo-anchor.png qui n'existe pas, ce qui invalidait tout le manifeste.
      manifest: {
        name: "Hednai | Maritime Software & AI",
        short_name: "Hednai",
        description: "Logiciels et solutions IA pour le secteur maritime.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        lang: "fr-FR",
        theme_color: "#0c2340",
        background_color: "#ffffff",
        icons: [
          // "any" : icone affichee telle quelle
          { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          // "maskable" : fichiers distincts avec zone de securite de 20 %.
          // Reutiliser la meme image pour les deux roles fait rogner le logo
          // sur Android. Source : w3c.github.io/manifest/#purpose-member
          { src: "/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },

      workbox: {
        // Ressources mises en precache au premier chargement
        globPatterns: ["**/*.{js,css,html,webp,png,svg,woff2}"],

        // Les PDF des CV pesent environ 300 ko chacun : on les sert par le
        // reseau, pas la peine de les precacher
        globIgnores: ["**/*.pdf"],

        // Toute navigation retombe sur index.html (application monopage)
        navigateFallback: "/index.html",

        // Le nouveau service worker prend la main immediatement
        skipWaiting: true,
        clientsClaim: true,

        runtimeCaching: [
          {
            // Polices Google : cache longue duree, mise a jour en arriere-plan
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts" },
          },
        ],
      },

      // Le service worker est desactive en dev pour ne pas servir de code
      // obsolete pendant le developpement
      devOptions: { enabled: false },
    }),
  ],

  build: {
    rollupOptions: {
      output: {
        // Decoupage manuel : chaque groupe change a un rythme different,
        // donc chacun garde son propre cache navigateur entre deux deploiements
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
            return "vendor-motion";
          }
          if (id.includes("lucide-react") || id.includes("react-icons")) {
            return "vendor-icons";
          }
          if (id.includes("react-router") || id.includes("/react-dom/") || id.includes("/react/")) {
            return "vendor-react";
          }
          return "vendor";
        },
      },
    },
    // Seuil d'alerte de taille de chunk (ko)
    chunkSizeWarningLimit: 300,
  },

  // Config des tests Vitest
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
  },
});