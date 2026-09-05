// ============================================
// vite-env.d.ts
// Declarations de types pour les modules virtuels de Vite.
//
// "virtual:pwa-register" n'existe pas sur le disque : il est genere a la volee
// par vite-plugin-pwa. Sans cette reference, TypeScript ne trouve pas le module
// importe dans main.tsx et le build echoue avec TS2307.
// Source : vite-pwa-org.netlify.app/guide/#typescript-support
// ============================================

/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />