// ============================================
// pages/BlogArticle.tsx
// Page d'un article individuel
// Accessible via /blog/:slug
// Rend le contenu multi-paragraphes avec titres ## depuis les cles i18n
// ============================================
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/useLanguage";
import { articles } from "../data/articles";
import "./Blog.css";

// Transforme le contenu brut (paragraphes separes par \n\n, titres ##) en elements JSX
function renderArticleContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    // Ligne commencant par ## = titre de section
    if (block.startsWith("## ")) {
      return <h2 key={i} className="blog-article__heading">{block.replace("## ", "")}</h2>;
    }
    // Paragraphe normal
    return <p key={i}>{block}</p>;
  });
}

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  // Chercher l'article par son slug
  const article = articles.find((a) => a.slug === slug);

  // Article non trouve
  if (!article) {
    return (
      <div className="blog-article">
        <div className="container">
          <p>{t("blog.notFound")}</p>
          <Link to="/blog" className="btn btn--secondary">
            <ArrowLeft size={16} /> {t("blog.backToList")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-article">
      <Helmet>
        <title>{t(article.titleKey)} | Hednai</title>
        <meta name="description" content={t(article.summaryKey)} />
      </Helmet>

      <div className="container">
        {/* Bouton retour */}
        <Link to="/blog" className="blog-article__back">
          <ArrowLeft size={16} /> {t("blog.backToList")}
        </Link>

        {/* En-tete de l'article */}
        <header className="blog-article__header">
          <div className="blog-card__tags">
            <span className="blog-card__tag">{t(article.categoryKey)}</span>
          </div>
          <h1>{t(article.titleKey)}</h1>
          <div className="blog-card__meta">
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span className="blog-card__read-time">
              <Clock size={14} /> {article.readTime} min
            </span>
          </div>
        </header>

        {/* Contenu de l'article — multi-paragraphes avec titres */}
        <div className="blog-article__content">
          {renderArticleContent(t(article.contentKey))}
        </div>
      </div>
    </div>
  );
}