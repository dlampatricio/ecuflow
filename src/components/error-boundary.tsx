"use client";

import { Component, type ReactNode } from "react";

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
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8">
            <div className="text-6xl">⚠️</div>
            <h2 className="text-xl font-semibold">Algo salió mal</h2>
            <p className="text-muted-foreground">
              Estamos trabajando para solucionarlo. Intenta recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Recargar
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}