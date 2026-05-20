import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import CursorSpotlight from './components/CursorSpotlight';
import ScrollProgress from './components/ScrollProgress';
import MascotCaptain from './components/MascotCaptain';
import ComingSoonPopup from './components/ComingSoonPopup';
import ScrollToHash from './components/ScrollToHash';
import HomeRoot from './pages/HomeRoot';

// Inner pages are lazy — each route is its own chunk
const ProductsPage      = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ServicesPage      = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ProjectsPage      = lazy(() => import('./pages/ProjectsPage'));
const PrivacyPage       = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage         = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.TermsPage })));

const RouteFallback = () => (
  <div className="surface min-h-screen" aria-hidden />
);

export default function App() {
  const [loading, setLoading] = useState(true);

  // Run the preloader for ~3.6s
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3600);
    return () => clearTimeout(timer);
  }, []);

  // After preloader exits + on resize, refresh GSAP ScrollTrigger so all pin
  // positions are recomputed against the now-fully-rendered DOM.
  useEffect(() => {
    if (loading) return;
    let cancelled = false;
    const refresh = async () => {
      try {
        const mod = await import('gsap/ScrollTrigger');
        if (cancelled) return;
        setTimeout(() => {
          if (!cancelled) mod.ScrollTrigger.refresh();
        }, 250);
      } catch {
        /* gsap not available — no-op */
      }
    };
    refresh();
    const onResize = () => refresh();
    window.addEventListener('resize', onResize, { passive: true });
    const lateT = window.setTimeout(refresh, 1500);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      window.clearTimeout(lateT);
    };
  }, [loading]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Preloader isLoading={loading} />
        <ScrollProgress />
        <CursorSpotlight />
        <CustomCursor />
        <ScrollToHash />

        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomeRoot />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<HomeRoot />} />
          </Routes>
        </Suspense>

        {!loading && <MascotCaptain />}
        {!loading && <ComingSoonPopup />}
      </BrowserRouter>
    </ThemeProvider>
  );
}
