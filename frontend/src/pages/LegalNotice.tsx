// ============================================
// pages/LegalNotice.tsx
// Page Mentions legales — accessible via /mentions-legales
// 7 sections : exploitant, hebergement, PI, responsabilite, liens, droit applicable, contact
// ============================================
import { Seo } from "../components/Seo";
import { useLanguage } from "../i18n/useLanguage";
import "./Legal.css";

export function LegalNotice() {
  const { t } = useLanguage();

  return (
    <div className="legal-page">
      <Seo title={t("legal.seo.title")} description={t("legal.seo.desc")} />

      <div className="container">
        <h1 className="legal-page__title">{t("legal.title")}</h1>
        <p className="legal-page__updated">{t("legal.updated")}</p>

        <div className="legal-page__content">
          <section>
            <h2>{t("legal.editor.title")}</h2>
            <p>{t("legal.editor.text")}</p>
          </section>

          <section>
            <h2>{t("legal.hosting.title")}</h2>
            <p>{t("legal.hosting.text")}</p>
          </section>

          <section>
            <h2>{t("legal.ip.title")}</h2>
            <p>{t("legal.ip.text")}</p>
          </section>

          <section>
            <h2>{t("legal.liability.title")}</h2>
            <p>{t("legal.liability.text")}</p>
          </section>

          <section>
            <h2>{t("legal.links.title")}</h2>
            <p>{t("legal.links.text")}</p>
          </section>

          <section>
            <h2>{t("legal.law.title")}</h2>
            <p>{t("legal.law.text")}</p>
          </section>

          <section>
            <h2>{t("legal.contact.title")}</h2>
            <p>{t("legal.contact.text")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}