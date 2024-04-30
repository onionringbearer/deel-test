import React from "react";
import { PropsWithChildren } from "react";

type ErrorBoundaryProps = PropsWithChildren<{
  message: string;
}>;

type ErrorBoundaryState = {
  hasError: boolean;
};

// Functional components do not support error boundaries yet.
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(this.props.message, error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <p>{this.props.message}</p>
          {this.props.children}
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
