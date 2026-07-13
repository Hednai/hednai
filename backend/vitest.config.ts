// ============================================
// vitest.config.ts
// Configuration des tests pour le backend
// ============================================
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
});