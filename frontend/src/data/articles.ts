// ============================================
// data/articles.ts
// Donnees des articles de blog
// Pour l'instant en dur — v8 : migrer vers le backend avec API
// Chaque article a un slug unique pour l'URL
// ============================================

export interface Article {
  id: number;
  slug: string;
  titleKey: string;
  summaryKey: string;
  contentKey: string;
  date: string;
  readTime: number; // minutes
  tags: string[];
}

export const articles: Article[] = [
  {
    id: 1,
    slug: "pourquoi-digitaliser-le-maritime",
    titleKey: "blog.article1.title",
    summaryKey: "blog.article1.summary",
    contentKey: "blog.article1.content",
    date: "2025-07-01",
    readTime: 5,
    tags: ["maritime", "digital"],
  },
  {
    id: 2,
    slug: "react-typescript-architecture",
    titleKey: "blog.article2.title",
    summaryKey: "blog.article2.summary",
    contentKey: "blog.article2.content",
    date: "2025-07-15",
    readTime: 8,
    tags: ["react", "typescript"],
  },
  {
    id: 3,
    slug: "ia-maintenance-predictive-navires",
    titleKey: "blog.article3.title",
    summaryKey: "blog.article3.summary",
    contentKey: "blog.article3.content",
    date: "2025-08-01",
    readTime: 6,
    tags: ["ia", "maritime"],
  },
];