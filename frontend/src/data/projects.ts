// ============================================
// data/projects.ts
// Donnees des projets portfolio avec cles i18n
// Chaque projet a un slug unique utilise dans l'URL (/project/:slug)
// 12 projets reels classes par impact
// ============================================
import type { Project } from "../types";
import { UNAVAILABLE_URL } from "../utils/links";

// Categories utilisees pour filtrer les projets affiches
export const CATEGORIES = [
  "portfolio.filter.selection",
  "portfolio.filter.maritime",
  "portfolio.filter.ia",
  "portfolio.filter.web",
  "portfolio.filter.mobile",
  "portfolio.filter.jeux",
  "portfolio.filter.all",
];

export const projects: Project[] = [
  {
    id: 1, slug: "profmatchai", categoryKey: "portfolio.filter.ia",
    titleKey: "projects.profmatch.title", descriptionKey: "projects.profmatch.desc",
    image: "/projects/profmatchai.webp",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Express 5", "Prisma", "FastAPI", "Python"],
    liveUrl: UNAVAILABLE_URL, githubUrl: "https://github.com/YvanJaures/ProfMatchAI",
    longDescriptionKey: "projects.profmatch.long", badgeKey: "projects.profmatch.badge",
    featured: true,
  },
  {
    id: 2, slug: "hednai", categoryKey: "portfolio.filter.web",
    titleKey: "projects.hednai.title", descriptionKey: "projects.hednai.desc",
    image: "/projects/hednai.webp",
    technologies: ["React", "TypeScript", "Vite", "Express 5", "Prisma", "PostgreSQL"],
    liveUrl: "https://hednai.com", githubUrl: "https://github.com/Hednai/hednai", longDescriptionKey: "projects.hednai.long",
    featured: true,
  },
  {
    id: 3, slug: "karibou-market", categoryKey: "portfolio.filter.web",
    titleKey: "projects.karibou.title", descriptionKey: "projects.karibou.desc",
    image: "/projects/karibou-market.webp",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Express 5", "MongoDB", "Redis"],
    liveUrl: "https://karibou-market.vercel.app/", githubUrl: "https://github.com/Darenmcs/karibou-market", longDescriptionKey: "projects.karibou.long",
    featured: true,
  },
  {
    id: 4, slug: "modenova", categoryKey: "portfolio.filter.web",
    titleKey: "projects.modenova.title", descriptionKey: "projects.modenova.desc",
    image: "/projects/modenova.webp",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
    liveUrl: "https://modenova.vercel.app/", githubUrl: "https://github.com/Darenmcs/modenova", longDescriptionKey: "projects.modenova.long",
    featured: true,
  },
  {
    id: 5, slug: "fleetlog", categoryKey: "portfolio.filter.maritime",
    titleKey: "projects.fleet.title", descriptionKey: "projects.fleet.desc",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&h=900&fit=crop",
    technologies: ["Electron", "React", "TypeScript", "Drizzle", "SQLite", "Prisma", "PostgreSQL"],
    liveUrl: UNAVAILABLE_URL, githubUrl: UNAVAILABLE_URL, longDescriptionKey: "projects.fleet.long", badgeKey: "projects.fleet.badge",
    featured: true,
  },
  {
    id: 6, slug: "maritime-radio-trainer", categoryKey: "portfolio.filter.maritime",
    titleKey: "projects.radio.title", descriptionKey: "projects.radio.desc",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&h=900&fit=crop",
    technologies: ["JavaScript", "WebRTC", "Node.js", "HTML/CSS"],
    liveUrl: UNAVAILABLE_URL, githubUrl: UNAVAILABLE_URL, longDescriptionKey: "projects.radio.long", badgeKey: "projects.radio.badge",
    featured: true,
  },
  {
    id: 7, slug: "datalab-ia", categoryKey: "portfolio.filter.ia",
    titleKey: "projects.datalab.title", descriptionKey: "projects.datalab.desc",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&h=900&fit=crop",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Jupyter"],
    liveUrl: UNAVAILABLE_URL, githubUrl: UNAVAILABLE_URL, longDescriptionKey: "projects.datalab.long",
  },
  {
    id: 8, slug: "bibliokowazo", categoryKey: "portfolio.filter.mobile",
    titleKey: "projects.biblio.title", descriptionKey: "projects.biblio.desc",
    image: "/projects/bibliokowazo.webp",
    technologies: [".NET MAUI", "C#", "XAML"],
    liveUrl: UNAVAILABLE_URL, githubUrl: UNAVAILABLE_URL, longDescriptionKey: "projects.biblio.long",
    featured: true,
  },
  {
    id: 9, slug: "geospot", categoryKey: "portfolio.filter.mobile",
    titleKey: "projects.geospot.title", descriptionKey: "projects.geospot.desc",
    image: "https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=1600&h=900&fit=crop",
    technologies: ["SwiftUI", "MapKit", "CoreLocation"],
    liveUrl: UNAVAILABLE_URL, githubUrl: UNAVAILABLE_URL, longDescriptionKey: "projects.geospot.long",
    featured: true,
  },
  {
    id: 10, slug: "refugeanimo", categoryKey: "portfolio.filter.mobile",
    titleKey: "projects.refuge.title", descriptionKey: "projects.refuge.desc",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&h=900&fit=crop",
    technologies: ["SwiftUI", "Swift Data"],
    liveUrl: UNAVAILABLE_URL, githubUrl: UNAVAILABLE_URL, longDescriptionKey: "projects.refuge.long",
  },
  {
    id: 11, slug: "autovitrine", categoryKey: "portfolio.filter.mobile",
    titleKey: "projects.auto.title", descriptionKey: "projects.auto.desc",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&h=900&fit=crop",
    technologies: ["Kotlin", "Android SDK", "XML Layouts"],
    liveUrl: UNAVAILABLE_URL, githubUrl: UNAVAILABLE_URL, longDescriptionKey: "projects.auto.long",
  },
  {
    id: 12, slug: "foreur-maritime", categoryKey: "portfolio.filter.jeux",
    titleKey: "projects.foreur.title", descriptionKey: "projects.foreur.desc",
    image: "/projects/foreur-maritime.webp",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://foreur.hednai.com", githubUrl: "https://github.com/Darenmcs/ForeurMaritime", longDescriptionKey: "projects.foreur.long",
    featured: true,
  },
];