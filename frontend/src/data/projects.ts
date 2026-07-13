// ============================================
// data/projects.ts
// Donnees des projets portfolio avec cles i18n
// Chaque projet a un slug unique utilise dans l'URL (/project/:slug)
// ============================================
import type { Project } from "../types";

// Categories utilisees pour filtrer les projets affiches
export const CATEGORIES = [
  "portfolio.filter.all",
  "portfolio.filter.maritime",
  "portfolio.filter.ia",
  "portfolio.filter.web",
];

export const projects: Project[] = [
  {
    id: 1,
    slug: "fleetmanager-pro",
    categoryKey: "portfolio.filter.maritime",
    titleKey: "projects.fleet.title",
    descriptionKey: "projects.fleet.desc",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "PostgreSQL", "Maps API"],
    liveUrl: "#",
    githubUrl: "#",
    longDescriptionKey: "projects.fleet.long",
    featureKeys: ["projects.fleet.f1", "projects.fleet.f2", "projects.fleet.f3", "projects.fleet.f4"],
  },
  {
    id: 2,
    slug: "routeoptimizer-ai",
    categoryKey: "portfolio.filter.ia",
    titleKey: "projects.route.title",
    descriptionKey: "projects.route.desc",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    slug: "portalweb-maritime",
    categoryKey: "portfolio.filter.web",
    titleKey: "projects.portal.title",
    descriptionKey: "projects.portal.desc",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "Tailwind", "Supabase"],
    liveUrl: "#",
    githubUrl: "#",
  },
];