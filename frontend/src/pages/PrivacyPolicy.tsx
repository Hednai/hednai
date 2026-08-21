// ============================================
// pages/PrivacyPolicy.tsx
// Politique de confidentialite — accessible via /confidentialite
// 10 sections : responsable, collecte, motifs, tiers/transferts, conservation,
//               securite, droits, cookies/stockage, modifications, contact
// ============================================
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/useLanguage";
import "./Legal.css";

export function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="legal-page">
      <Helmet>
        <title>{t("privacy.seo.title")}</title>
        <meta name="description" content={t("privacy.seo.desc")} />
      </Helmet>

      <div className="container">
        <h1 className="legal-page__title">{t("privacy.title")}</h1>
        <p className="legal-page__updated">{t("privacy.updated")}</p>

        <div className="legal-page__content">
          <section>
            <h2>{t("privacy.controller.title")}</h2>
            <p>{t("privacy.controller.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.collected.title")}</h2>
            <p>{t("privacy.collected.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.purpose.title")}</h2>
            <p>{t("privacy.purpose.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.thirdParty.title")}</h2>
            <p>{t("privacy.thirdParty.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.retention.title")}</h2>
            <p>{t("privacy.retention.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.security.title")}</h2>
            <p>{t("privacy.security.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.rights.title")}</h2>
            <p>{t("privacy.rights.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.cookies.title")}</h2>
            <p>{t("privacy.cookies.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.changes.title")}</h2>
            <p>{t("privacy.changes.text")}</p>
          </section>

          <section>
            <h2>{t("privacy.contact.title")}</h2>
            <p>{t("privacy.contact.text")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}