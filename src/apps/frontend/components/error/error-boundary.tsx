import axios from 'axios';
import React, { Component, ErrorInfo, ReactNode } from 'react';

import { JsonObject } from '../../types/common-types';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  errorData: JsonObject & {
    errorInfo: string;
    errorMessage: string;
    errorName: string;
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.errorData = {
      errorName: error.name,
      errorMessage: error.message,
      errorInfo: errorInfo.componentStack,
    };
    try {
      await axios.post('http://localhost:8080/api/client_logs', this.errorData);
    } catch (err) {
      console.error('Error logging client logs:', err);
    }
  }

  public render() {
    if (this.state.hasError) {
      return <div>Sorry.. there was an error</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
