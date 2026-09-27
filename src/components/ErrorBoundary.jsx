import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ExamAI ErrorBoundary Caught]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      localStorage.removeItem('examai_last_paper');
    } catch (e) {
      console.warn('Error clearing cached paper:', e);
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

      return (
        <div style={styles.overlay}>
          <div style={styles.card}>
            <div style={styles.iconCircle}>
              <AlertTriangle size={32} color="#ef4444" />
            </div>

            <h2 style={styles.title}>Unable to Display Screen</h2>
            <p style={styles.message}>
              A display error occurred while rendering the exam paper. Don't worry, your account and settings are safe.
            </p>

            {this.state.error && (
              <div style={styles.errorBox}>
                <code style={styles.errorCode}>
                  {this.state.error.message || String(this.state.error)}
                </code>
              </div>
            )}

            <div style={{ ...styles.buttonGroup, flexDirection: isMobile ? 'column' : 'row' }}>
              <button
                type="button"
                onClick={this.handleReset}
                style={styles.primaryBtn}
              >
                <Home size={16} />
                <span>Return to Home & Generator</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                style={styles.secondaryBtn}
              >
                <RefreshCw size={16} />
                <span>Reload App</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  overlay: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f8fafc',
    boxSizing: 'border-box',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '32px 24px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  iconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#fef2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 18px auto',
    border: '1px solid #fee2e2',
  },
  title: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 10px 0',
    letterSpacing: '-0.3px',
  },
  message: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.55',
    margin: '0 0 20px 0',
  },
  errorBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '10px 14px',
    marginBottom: '24px',
    textAlign: 'left',
    overflowX: 'auto',
    maxHeight: '100px',
  },
  errorCode: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: '#b91c1c',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '11px 20px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13.5px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  secondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '11px 20px',
    backgroundColor: '#ffffff',
    color: '#475569',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
};
