import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puoi inviare l'errore a un servizio di log o eseguire altre azioni necessarie qui
    console.error('Errore:', error);
    console.error('Dettagli:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puoi personalizzare il messaggio di errore visualizzato all'utente
      return <h1>Si è verificato un errore.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
