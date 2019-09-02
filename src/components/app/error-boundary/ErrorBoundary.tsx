import React from "react";
import styles from "./styles.scss";

export interface ErrorBoundaryProps {}
export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public static getDerivedStateFromError(error: any) {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div>Something went wrong.</div>
          <div>
            <button onClick={this.refresh}>Refresh</button>
            <button onClick={this.back}>Back</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }

  /**
   * refresh
   */
  private refresh = () => {
    window.location.reload();
  };

  /**
   * back
   */
  private back = () => {
    window.history.back();
  };
}

export default ErrorBoundary;
