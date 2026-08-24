// ============================================
// App.tsx — Structure principale de l'application
// Assemble : ErrorBoundary → LanguageProvider → BrowserRouter → MainLayout
// ============================================
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ViewModeProvider } from "./context/ViewModeContext";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";

// ---- Lazy loading ----
// Les pages sont chargees a la demande (code splitting)
// Cela reduit le temps de chargement initial
const ProjectDetail = lazy(() =>
  import("./pages/ProjectDetail").then((m) => ({ default: m.ProjectDetail }))
);
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const Blog = lazy(() =>
  import("./pages/Blog").then((m) => ({ default: m.Blog }))
);
const BlogArticle = lazy(() =>
  import("./pages/BlogArticle").then((m) => ({ default: m.BlogArticle }))
);
const Solutions = lazy(() =>
  import("./pages/Solutions").then((m) => ({ default: m.Solutions }))
);
const Recruiter = lazy(() =>
  import("./pages/Recruiter").then((m) => ({ default: m.Recruiter }))
);
// Page CV dediee — URL partageable
const CvPage = lazy(() =>
  import("./pages/CvPage").then((m) => ({ default: m.CvPage }))
);
const LegalNotice = lazy(() =>
  import("./pages/LegalNotice").then((m) => ({ default: m.LegalNotice }))
);
const PrivacyPolicy = lazy(() =>
  import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy }))
);

import { InstalledDateProvider } from "./providers/InstalledDateProvider";
import { InstallPrompt } from "./components/InstallPrompt";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    // Attrape toute erreur React pour eviter l'ecran blanc
    <ErrorBoundary>
      {/* Rend la langue et t() disponibles partout */}
      <LanguageProvider>
        {/* Gere la date de fermeture de la banniere PWA (localStorage) */}
        <InstalledDateProvider>
          <ViewModeProvider>
            {/* Active la navigation par URL (/, /project/:slug) */}
            <BrowserRouter>
              {/* Banniere d'installation PWA, au-dessus de tout le reste */}
              <InstallPrompt />
              {/* Navbar + Footer autour du contenu de chaque page */}
              <MainLayout>
                <Routes>
                  {/* Page d'accueil */}
                  <Route path="/" element={<Home />} />

                  {/* Page projet (detail) - chargee a la demande */}
                  <Route
                    path="/project/:slug"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <ProjectDetail />
                      </Suspense>
                    }
                  />

                  {/* Dashboard admin - charge a la demande */}
                  <Route
                    path="/admin"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />

                  {/* Blog - liste des articles */}
                  <Route
                    path="/blog"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <Blog />
                      </Suspense>
                    }
                  />

                  {/* Blog - article individuel */}
                  <Route
                    path="/blog/:slug"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <BlogArticle />
                      </Suspense>
                    }
                  />

                  {/* Page Solutions - chargee a la demande */}
                  <Route
                    path="/solutions"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <Solutions />
                      </Suspense>
                    }
                  />

                  {/* Page Recruiter - chargee a la demande */}
                  <Route
                    path="/recruiter"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <Recruiter />
                      </Suspense>
                    }
                  />

                  {/* Page CV dediee — URL partageable */}
                  <Route
                    path="/cv"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <CvPage />
                      </Suspense>
                    }
                  />

                  {/* Page Mentions legales */}
                  <Route
                    path="/mentions-legales"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <LegalNotice />
                      </Suspense>
                    }
                  />

                  {/* Page Politique de confidentialite */}
                  <Route
                    path="/confidentialite"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <PrivacyPolicy />
                      </Suspense>
                    }
                  />

                  {/* Route 404 - capture toutes les URLs inconnues */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </ViewModeProvider>
        </InstalledDateProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}