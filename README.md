# Hednai

Site 2-en-1 : portfolio de développeur full stack et vitrine de la startup Hednai, spécialisée dans les logiciels et solutions IA pour le secteur maritime.

Site en production : [hednai.com](https://hednai.com)

[![CI](https://github.com/Hednai/hednai/actions/workflows/ci.yml/badge.svg)](https://github.com/Hednai/hednai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Sommaire

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture du dépôt](#architecture-du-dépôt)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)
- [Tests](#tests)
- [Intégration continue](#intégration-continue)
- [Déploiement](#déploiement)
- [Conventions de contribution](#conventions-de-contribution)
- [Licence](#licence)

---

## Aperçu

Le site présente deux visages selon le visiteur, sans changer d'URL :

- **Mode client** : proposition de valeur, services, portfolio, retours, appel à l'action.
- **Mode recruteur** : profil, parcours, compétences techniques, CV en PDF, portfolio avec rôle et durée par projet.

Le basculement se fait par un bouton dans la barre de navigation. Le mode choisi est conservé dans le `localStorage`.

Le site est entièrement bilingue français et anglais, avec un système i18n interne découpé en modules par section.

---

## Fonctionnalités

- Bascule client et recruteur, bilingue FR et EN, thème clair et sombre
- Portfolio de 12 projets avec fiches dépliables, filtres par catégorie et page de détail dédiée
- Formulaire de contact avec deux canaux au choix, courriel ou WhatsApp, validé par Zod des deux côtés
- Progressive Web App installable, avec service worker et invite d'installation
- Pages légales complètes : mentions légales et politique de confidentialité
- Tableau de bord d'administration protégé, exposant les messages reçus et les statistiques
- Blog avec articles internes
- SEO : URL canonique par route, Open Graph, Twitter Card, données structurées JSON-LD, sitemap et robots

---

## Stack technique

**Frontend**

| Domaine | Choix |
| --- | --- |
| Framework | React 19, Vite 7 |
| Langage | TypeScript en mode strict |
| Routage | React Router 7 avec chargement paresseux des pages |
| Animations | Framer Motion |
| Icônes | lucide-react, react-icons |
| Métadonnées | react-helmet-async |
| PWA | vite-plugin-pwa (Workbox) |
| Polices | @fontsource-variable, auto-hébergées |
| Tests | Vitest, Testing Library, Cypress |

**Backend**

| Domaine | Choix |
| --- | --- |
| Serveur | Express 5 |
| Base de données | PostgreSQL via Prisma 7 |
| Validation | Zod |
| Sécurité | Helmet, CORS, nettoyage XSS, limitation de débit |
| Journalisation | Pino |
| Cache | Redis, optionnel |
| Courriel | Resend en HTTP, Nodemailer en repli |
| Tests | Vitest |

---

## Architecture du dépôt

```
hednai/
├── .github/workflows/ci.yml     Pipeline d'intégration continue
├── frontend/
│   ├── public/                  Fichiers servis tels quels
│   │   ├── projects/            Captures des projets du portfolio, en WebP
│   │   ├── sitemap.xml
│   │   └── robots.txt
│   └── src/
│       ├── components/          Composants réutilisables
│       │   ├── sections/        Sections de la page d'accueil
│       │   └── ui/              Briques de base : Button, Card, ProjectLink
│       ├── config/site.ts       Configuration centralisée du site
│       ├── context/             Contexte du mode client et recruteur
│       ├── data/                Données statiques : projets, services, articles
│       ├── hooks/               Hooks personnalisés
│       ├── i18n/                Traductions par module, en fr/ et en/
│       ├── layouts/             Structure commune des pages
│       ├── pages/               Une page par route
│       ├── types/               Interfaces TypeScript centralisées
│       └── utils/               Fonctions utilitaires pures
└── backend/
    ├── prisma/schema.prisma     Modèle de données
    └── src/
        ├── config/              Environnement, base de données, CORS, Redis
        ├── features/            Un dossier par domaine métier
        │   ├── contact/         Route, contrôleur, service, validation
        │   └── dashboard/
        ├── lib/                 Clients externes : Prisma, courriel
        ├── middleware/          Authentification, cache, erreurs, XSS
        └── utils/               Journal d'audit, arrêt propre
```

---

## Prérequis

- Node.js 22 ou supérieur. La version exacte est fixée dans `.nvmrc`, activez-la avec `nvm use`.
- Une base PostgreSQL, locale ou hébergée. Le projet utilise Neon en production.

---

## Installation

```bash
git clone https://github.com/Hednai/hednai.git
cd hednai
nvm use
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Renseigner DATABASE_URL et les autres variables dans .env
npx prisma generate
npx prisma db push
npm run dev
```

L'API démarre sur `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Le site démarre sur `http://localhost:5173`.

---

## Variables d'environnement

**backend/.env**

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL |
| `PORT` | Port d'écoute de l'API |
| `CORS_ORIGIN` | Origines autorisées, séparées par des virgules |
| `ADMIN_TOKEN` | Jeton d'accès au tableau de bord |
| `RESEND_API_KEY` | Clé d'envoi des courriels |
| `REDIS_URL` | Cache, facultatif |

**frontend/.env**

| Variable | Rôle |
| --- | --- |
| `VITE_API_URL` | URL de base de l'API backend |

Le domaine public du site n'est pas une variable d'environnement : il est défini une seule fois dans `frontend/src/config/site.ts`, sous `meta.url`. Toutes les URL canoniques et Open Graph en découlent.

---

## Scripts disponibles

**frontend**

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Vérification des types puis build de production |
| `npm run preview` | Prévisualisation du build |
| `npm run lint` | ESLint |
| `npm test` | Tests unitaires Vitest |
| `npm run test:e2e` | Tests de bout en bout Cypress |

**backend**

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur avec rechargement automatique |
| `npm run build` | Compilation TypeScript |
| `npm start` | Démarrage de la version compilée |
| `npm test` | Tests Vitest |
| `npm run diag:db` | Diagnostic de connexion à la base |

---

## Tests

```bash
cd backend && npm test      # validation Zod, routes de contact
cd frontend && npm test     # composants, hooks, appels API
cd frontend && npm run cy:open   # scénarios Cypress en mode interactif
```

---

## Intégration continue

Le pipeline `.github/workflows/ci.yml` s'exécute sur chaque poussée et chaque demande de tirage vers `main` et `dev`. Il vérifie, pour le frontend et le backend : les types TypeScript, ESLint, les tests unitaires, le build de production et l'audit de sécurité des dépendances.

---

## Déploiement

| Élément | Hébergeur |
| --- | --- |
| Frontend | Vercel, branche `main` |
| Backend | Render |
| Base de données | Neon, PostgreSQL |
| DNS et domaine | Cloudflare Registrar |
| Courriels entrants | Zoho Mail |
| Courriels sortants | Resend |

Sous-domaines déployés séparément : `foreur.hednai.com` pour le jeu Le Foreur Maritime.

---

## Conventions de contribution

- Une branche par fonctionnalité, créée depuis `dev`. Jamais de travail direct sur `main`.
- Nommage : `feat/`, `fix/`, `chore/` suivis d'un intitulé court en tirets.
- Messages de commit au format Conventional Commits, par exemple `feat(portfolio): ajout des liens GitHub`.
- Code guidé par les principes SOLID : aucune valeur en dur, composants réutilisables, une responsabilité par module.
- Aucun texte en dur dans les composants : tout passe par les clés i18n.
- Aucune couleur en dur : uniquement les variables CSS définies dans `src/index.css`.
- `npm run build`, `npm run lint` et `npm test` doivent passer avant toute demande de tirage.

---

## Licence

Ce projet est distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE).

Les contenus non logiciels du dépôt, à savoir les textes rédactionnels, les photographies, les captures de projets et le logo Hednai, ne sont pas couverts par cette licence et restent la propriété de leur auteur.