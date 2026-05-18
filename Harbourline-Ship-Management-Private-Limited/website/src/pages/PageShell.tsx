import { useEffect, Suspense, lazy } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import FloatingButtons from '../components/FloatingButtons';
import ErrorBoundary from '../components/ErrorBoundary';

const Footer = lazy(() => import('../components/Footer'));

/**
 * Wraps every inner page with the brand chrome (top bar, nav, footer, floating UI)
 * and scrolls to top on route change.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="surface min-h-[60vh]">{children}</main>
      <Suspense fallback={<div className="h-40 surface" />}>
        <ErrorBoundary fallback={null}>
          <Footer />
        </ErrorBoundary>
      </Suspense>
      <FloatingButtons />
    </>
  );
}
