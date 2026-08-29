// ============================================
// vite.config.ts
// Configuration Vite + Vitest + Tailwind
// ============================================
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Decommenter pour analyser le bundle : npm run build puis ouvrir stats.html
    // visualizer({ open: true, filename: "stats.html" }),
  ],

  // Config des tests Vitest
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
  },
});