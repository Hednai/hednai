// ============================================
// pages/Blog.tsx
// Page Insights (ex-Blog) — liste des articles
// Fond bleu marine + feuille d'érable (maple-section) comme Testimonials
// Affiche catégorie, titre, résumé, meta et CTA
// ============================================
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo";
import { Card } from "../components/ui/Card";
import { FadeIn } from "../components/FadeIn";
import { useLanguage } from "../i18n/useLanguage";
import { articles } from "../data/articles";
import "./Blog.css";

export function Blog() {
  const { t } = useLanguage();

  return (
    <div className="maple-section blog-page">
      {/* Feuille d'érable en filigrane — même SVG que Home.tsx */}
      <svg className="maple-section__leaf maple-section__leaf--right" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z" />
      </svg>
      <svg className="maple-section__leaf maple-section__leaf--left" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z" />
      </svg>

      <Seo title={t("blog.seo.title")} description={t("blog.seo.desc")} />

      <div className="container">
        {/* En-tête avec accroche */}
        <div className="blog-page__header">
          <h1>{t("blog.title")}</h1>
          <p className="blog-page__tagline">{t("blog.subtitle")}</p>
          <p className="blog-page__intro">{t("blog.intro")}</p>
        </div>

        {/* Grille des articles */}
        <div className="blog-page__grid">
          {articles.map((article, index) => (
            <FadeIn key={article.id} delay={index * 0.1}>
              <Card>
                <div className="blog-card">
                  {/* Badge catégorie */}
                  <div className="blog-card__tags">
                    <span className="blog-card__tag">
                      {t(article.categoryKey)}
                    </span>
                  </div>

                  {/* Titre */}
                  <h2>{t(article.titleKey)}</h2>

                  {/* Résumé */}
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