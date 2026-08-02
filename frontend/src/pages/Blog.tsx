// ============================================
// pages/Blog.tsx
// Page liste des articles de blog
// Affiche les articles en grille avec resume et tags
// Accessible via /blog
// ============================================
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Card } from "../components/ui/Card";
import { FadeIn } from "../components/FadeIn";
import { useLanguage } from "../i18n/useLanguage";
import { articles } from "../data/articles";
import "./Blog.css";

export function Blog() {
  const { t } = useLanguage();

  return (
    <div className="blog-page">
      <Helmet>
        <title>{t("blog.seo.title")}</title>
        <meta name="description" content={t("blog.seo.desc")} />
      </Helmet>

      <div className="container">
        {/* En-tete */}
        <div className="blog-page__header">
          <h1>{t("blog.title")}</h1>
          <p>{t("blog.subtitle")}</p>
        </div>

        {/* Grille des articles */}
        <div className="blog-page__grid">
          {articles.map((article, index) => (
            <FadeIn key={article.id} delay={index * 0.1}>
              <Card>
                <div className="blog-card">
                  {/* Tags */}
                  <div className="blog-card__tags">
                    {article.tags.map((tag) => (
                      <span key={tag} className="blog-card__tag">{tag}</span>
                    ))}
                  </div>

                  {/* Titre */}
                  <h2>{t(article.titleKey)}</h2>

                  {/* Resume */}
                  <p className="blog-card__summary">{t(article.summaryKey)}</p>

                  {/* Meta : date + temps de lecture */}
                  <div className="blog-card__meta">
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <span className="blog-card__read-time">
                      <Clock size={14} />
                      {article.readTime} min
                    </span>
                  </div>

                  {/* Lien vers l'article */}
                  <Link to={`/blog/${article.slug}`} className="blog-card__link">
                    {t("blog.readMore")} <ArrowRight size={16} />
                  </Link>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}