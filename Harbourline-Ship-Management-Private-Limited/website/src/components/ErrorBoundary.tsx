import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Optional small fallback rendered in place of the broken subtree. */
  fallback?: ReactNode;
};

type State = { hasError: boolean };

/**
 * Catch render-time exceptions from lazy chunks / Swiper / GSAP so a single
 * broken section never takes the whole page down. In dev, the Vite HMR
 * "Invalid hook call" error during dep re-optimization will be swallowed here
 * and a placeholder is shown until the next valid render.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface to the console in dev so we still see something.
    if (import.meta.env.DEV) {
      console.warn('[ErrorBoundary]', error.message, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="py-12 text-center text-mute text-sm">
            This section couldn’t load. Refresh the page to try again.
          </div>
        )
      );
    }
    return this.props.children;
  }
}
