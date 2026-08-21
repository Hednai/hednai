// ============================================
// data/projects.ts
// Donnees des projets portfolio avec cles i18n
// Chaque projet a un slug unique utilise dans l'URL (/project/:slug)
// 12 projets reels classes par impact
// ============================================
import type { Project } from "../types";

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
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Express 5", "Prisma", "FastAPI", "Python"],
    liveUrl: "#", githubUrl: "#",
    longDescriptionKey: "projects.profmatch.long", badgeKey: "projects.profmatch.badge",
    featured: true,
  },
  {
    id: 2, slug: "hednai", categoryKey: "portfolio.filter.web",
    titleKey: "projects.hednai.title", descriptionKey: "projects.hednai.desc",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "Vite", "Express 5", "Prisma", "PostgreSQL"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.hednai.long",
    featured: true,
  },
  {
    id: 3, slug: "karibou-market", categoryKey: "portfolio.filter.web",
    titleKey: "projects.karibou.title", descriptionKey: "projects.karibou.desc",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Express 5", "MongoDB", "Redis"],
    liveUrl: "https://karibou-market.vercel.app/", githubUrl: "#", longDescriptionKey: "projects.karibou.long",
    featured: true,
  },
  {
    id: 4, slug: "modenova", categoryKey: "portfolio.filter.web",
    titleKey: "projects.modenova.title", descriptionKey: "projects.modenova.desc",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
    liveUrl: "https://modenova.vercel.app/", githubUrl: "#", longDescriptionKey: "projects.modenova.long",
    featured: true,
  },
  {
    id: 5, slug: "fleetlog", categoryKey: "portfolio.filter.maritime",
    titleKey: "projects.fleet.title", descriptionKey: "projects.fleet.desc",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop",
    technologies: ["Electron", "React", "TypeScript", "Drizzle", "SQLite", "Prisma", "PostgreSQL"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.fleet.long", badgeKey: "projects.fleet.badge",
    featured: true,
  },
  {
    id: 6, slug: "maritime-radio-trainer", categoryKey: "portfolio.filter.maritime",
    titleKey: "projects.radio.title", descriptionKey: "projects.radio.desc",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    technologies: ["JavaScript", "WebRTC", "Node.js", "HTML/CSS"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.radio.long",
    featured: true,
  },
  {
    id: 7, slug: "datalab-ia", categoryKey: "portfolio.filter.ia",
    titleKey: "projects.datalab.title", descriptionKey: "projects.datalab.desc",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Jupyter"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.datalab.long",
  },
  {
    id: 8, slug: "bibliokowazo", categoryKey: "portfolio.filter.mobile",
    titleKey: "projects.biblio.title", descriptionKey: "projects.biblio.desc",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop",
    technologies: [".NET MAUI", "C#", "XAML"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.biblio.long",
    featured: true,
  },
  {
    id: 9, slug: "geospot", categoryKey: "portfolio.filter.mobile",
    titleKey: "projects.geospot.title", descriptionKey: "projects.geospot.desc",
    image: "https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=600&h=400&fit=crop",
    technologies: ["SwiftUI", "MapKit", "CoreLocation"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.geospot.long",
    featured: true,
  },
  {
    id: 10, slug: "refugeanimo", categoryKey: "portfolio.filter.mobile",
    titleKey: "projects.refuge.title", descriptionKey: "projects.refuge.desc",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop",
    technologies: ["SwiftUI", "Swift Data"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.refuge.long",
  },
  {
    id: 11, slug: "autovitrine", categoryKey: "portfolio.filter.mobile",
    titleKey: "projects.auto.title", descriptionKey: "projects.auto.desc",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    technologies: ["Kotlin", "Android SDK", "XML Layouts"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.auto.long",
  },
  {
    id: 12, slug: "foreur-maritime", categoryKey: "portfolio.filter.jeux",
    titleKey: "projects.foreur.title", descriptionKey: "projects.foreur.desc",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600&h=400&fit=crop",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#", githubUrl: "#", longDescriptionKey: "projects.foreur.long",
    featured: true,
  },
];