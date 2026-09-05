import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Dossiers exclus de l'analyse :
  //   dist / dev-dist : sorties de build et service worker generes par Vite
  //   coverage        : rapports de couverture de tests
  //   cypress         : tests E2E, analyses par leur propre configuration
  globalIgnores(['dist', 'dev-dist', 'coverage', 'cypress']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
