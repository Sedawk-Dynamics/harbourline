import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyUs from '../components/WhyUs';
import Products from '../components/Products';
import Services from '../components/Services';
import ErrorBoundary from '../components/ErrorBoundary';
import FloatingButtons from '../components/FloatingButtons';
import { Suspense, lazy } from 'react';

const MarqueeStrip = lazy(() => import('../components/Stats'));
const Testimonials = lazy(() => import('../components/Projects'));
const Brands       = lazy(() => import('../components/Brands'));
const CTA          = lazy(() => import('../components/CTA'));
const Contact      = lazy(() => import('../components/Contact'));
const Footer       = lazy(() => import('../components/Footer'));

const Placeholder = ({ h = 'h-[60vh]' }: { h?: string }) => (
  <div className={`surface ${h}`} aria-hidden />
);

export default function HomeRoot() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyUs />
        <Suspense fallback={<Placeholder h="h-16" />}>
          <ErrorBoundary fallback={<Placeholder h="h-16" />}>
            <MarqueeStrip />
          </ErrorBoundary>
        </Suspense>
        <Products />
        <Services />
        <Suspense fallback={<Placeholder h="h-[80vh]" />}>
          <ErrorBoundary fallback={<Placeholder h="h-[80vh]" />}>
            <Testimonials />
          </ErrorBoundary>
        </Suspense>
        <Suspense fallback={<Placeholder h="h-[40vh]" />}>
          <ErrorBoundary fallback={<Placeholder h="h-[40vh]" />}>
            <Brands />
          </ErrorBoundary>
        </Suspense>
        <Suspense fallback={<Placeholder h="h-[60vh]" />}>
          <ErrorBoundary fallback={<Placeholder h="h-[60vh]" />}>
            <CTA />
          </ErrorBoundary>
        </Suspense>
        <Suspense fallback={<Placeholder h="h-[80vh]" />}>
          <ErrorBoundary fallback={<Placeholder h="h-[80vh]" />}>
            <Contact />
          </ErrorBoundary>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ErrorBoundary fallback={null}>
          <Footer />
        </ErrorBoundary>
      </Suspense>
      <FloatingButtons />
    </>
  );
}
