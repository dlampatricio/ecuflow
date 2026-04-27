"use client";

import { Component, type ReactNode } from "react";
import { ErrorDisplay } from "./error-display";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[50vh] items-center justify-center p-8">
            <div className="p-8 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] max-w-md">
              <ErrorDisplay
                title="Algo salió mal"
                message="Estamos trabajando para solucionarlo. Intenta recargar la página."
              />
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}