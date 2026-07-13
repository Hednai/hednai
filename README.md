# Hednai — Solutions Digitales Maritime & IA

Portfolio et vitrine freelance. Site bilingue (FR/EN) avec formulaire de contact, portfolio de projets et gestion de services.

## Stack technique

**Frontend** : React 19, Vite 7, TypeScript, React Router, i18n maison, Vitest + Testing Library

**Backend** : Express 5, Prisma 7, PostgreSQL, Zod, Helmet, CORS, XSS sanitization

**Optionnel** : Redis (Upstash) pour le cache, Nodemailer pour les notifications email

## Installation

### Prerequis

- Node.js 20+
- PostgreSQL (local ou cloud comme Supabase/Neon)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Remplir DATABASE_URL dans .env
npx prisma generate
npx prisma db push
npm run dev
```

Le serveur demarre sur `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Le site demarre sur `http://localhost:5173`.

### Tests

```bash
# Tests backend (validation Zod)
cd backend && npm test

# Tests frontend (composants + utilitaires)
cd frontend && npm test
```

## Structure du projet