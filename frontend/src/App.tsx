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
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/project/:slug"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <ProjectDetail />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/blog"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <Blog />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/blog/:slug"
                    element={
                      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
                        <BlogArticle />
                      </Suspense>
                    }
                  />
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