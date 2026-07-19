'use client';

import { PureComponent, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends PureComponent<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-slate-100 font-sans">
          <div className="max-w-md text-center space-y-4">
            <div className="text-4xl">⚡</div>
            <h1 className="text-xl font-display font-bold">Something glitched</h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your aura reading hit a temporary interference. Try again — the universe usually cooperates.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
