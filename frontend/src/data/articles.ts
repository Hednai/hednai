// ============================================
// data/articles.ts
// Donnees des articles Insights (ex-Blog)
// Chaque article a un slug unique pour l'URL
// categoryKey pointe vers une cle i18n pour le badge de categorie
// ============================================

export interface Article {
  id: number;
  slug: string;
  titleKey: string;
  summaryKey: string;
  contentKey: string;
  categoryKey: string;
  date: string;
  readTime: number; // minutes
  tags: string[];
}

export const articles: Article[] = [
  {
    id: 1,
    slug: "de-la-mer-au-code",
    titleKey: "blog.article1.title",
    summaryKey: "blog.article1.summary",
    contentKey: "blog.article1.content",
    categoryKey: "blog.category.journey",
    date: "2026-06-15",
    readTime: 6,
    tags: ["parcours", "maritime", "hednai"],
  },
  {
    id: 2,
    slug: "pourquoi-construire-hednai",
    titleKey: "blog.article2.title",
    summaryKey: "blog.article2.summary",
    contentKey: "blog.article2.content",
    categoryKey: "blog.category.hednai",
    date: "2026-07-10",
    readTime: 7,
    tags: ["hednai", "maritime", "solutions"],
  },
  {
    id: 3,
    slug: "ia-maritime-au-dela-tendance",
    titleKey: "blog.article3.title",
    summaryKey: "blog.article3.summary",
    contentKey: "blog.article3.content",
    categoryKey: "blog.category.maritimeAi",
    date: "2026-08-01",
    readTime: 8,
    tags: ["ia", "maritime", "smart port"],
  },
];