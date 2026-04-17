"use client";

import React, { Component } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className={styles.container} role="alert">
          <div className={styles.icon}>⚠</div>
          <h2 className={styles.title}>Une erreur est survenue</h2>
          <p className={styles.message}>
            {this.state.error?.message || 'Erreur inattendue.'}
          </p>
          <button className={styles.btn} onClick={this.handleReset}>
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
