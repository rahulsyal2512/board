import React, { Component } from "react";
import styled from "styled-components";

const ErrorMessage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage>
          <h2>An error occurred. Please reload the page to continue!</h2>
        </ErrorMessage>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
