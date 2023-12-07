import { Component, PropsWithChildren } from 'react';

import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className={styles.errorContainer}>
          <h1 className={styles.errorHeading}>Something went wrong</h1>
          <p className={styles.errorText}>{this.state.error.message}</p>
          <button
            onClick={this.resetError}
            className={styles.resetButton}
            type="button"
          >
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
