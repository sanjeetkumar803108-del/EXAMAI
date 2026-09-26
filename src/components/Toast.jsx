import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4500 }) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    const newToast = { id, type, title, message, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  const toast = {
    success: (message, title = 'Success', duration = 4500) =>
      addToast({ type: 'success', title, message, duration }),
    error: (message, title = 'Generation Issue', duration = 6500) =>
      addToast({ type: 'error', title, message, duration }),
    warning: (message, title = 'Notice', duration = 5000) =>
      addToast({ type: 'warning', title, message, duration }),
    info: (message, title = 'Update', duration = 4500) =>
      addToast({ type: 'info', title, message, duration }),
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback so it never crashes if invoked outside provider
    return {
      success: (msg) => console.log('Toast success:', msg),
      error: (msg) => console.error('Toast error:', msg),
      warning: (msg) => console.warn('Toast warning:', msg),
      info: (msg) => console.log('Toast info:', msg),
    };
  }
  return context.toast;
}

function ToastContainer({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={styles.container}>
      {toasts.map((item) => (
        <ToastItem key={item.id} toast={item} onClose={() => onClose(item.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  const config = {
    error: {
      color: '#ef4444',
      bgGlow: 'rgba(239, 68, 68, 0.15)',
      borderColor: 'rgba(239, 68, 68, 0.35)',
      icon: <AlertCircle size={20} color="#f87171" style={{ flexShrink: 0 }} />,
      defaultTitle: 'Something went wrong',
    },
    success: {
      color: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.35)',
      icon: <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0 }} />,
      defaultTitle: 'Operation Successful',
    },
    warning: {
      color: '#f59e0b',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.35)',
      icon: <AlertTriangle size={20} color="#fbbf24" style={{ flexShrink: 0 }} />,
      defaultTitle: 'Attention Required',
    },
    info: {
      color: '#3b82f6',
      bgGlow: 'rgba(59, 130, 246, 0.15)',
      borderColor: 'rgba(59, 130, 246, 0.35)',
      icon: <Info size={20} color="#60a5fa" style={{ flexShrink: 0 }} />,
      defaultTitle: 'Information',
    },
  }[toast.type] || {
    color: '#3b82f6',
    bgGlow: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.35)',
    icon: <Info size={20} color="#60a5fa" style={{ flexShrink: 0 }} />,
    defaultTitle: 'Notification',
  };

  return (
    <div
      style={{
        ...styles.toastCard,
        borderLeft: `4px solid ${config.color}`,
        borderColor: config.borderColor,
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? 'translateY(-12px) scale(0.95)' : 'translateY(0) scale(1)',
      }}
      className="toast-slide-down"
    >
      <div style={{ ...styles.iconContainer, backgroundColor: config.bgGlow }}>
        {config.icon}
      </div>

      <div style={styles.content}>
        <div style={styles.titleRow}>
          <span style={styles.title}>{toast.title || config.defaultTitle}</span>
          <button type="button" onClick={handleClose} style={styles.closeBtn} title="Dismiss">
            <X size={14} color="#94a3b8" />
          </button>
        </div>
        <p style={styles.message}>{toast.message}</p>
      </div>

      {toast.duration > 0 && (
        <div
          style={{
            ...styles.progressBar,
            backgroundColor: config.color,
            animation: `toastShrinkWidth ${toast.duration}ms linear forwards`,
          }}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 999999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    pointerEvents: 'none',
    width: '100%',
    maxWidth: '480px',
    padding: '0 16px',
  },
  toastCard: {
    pointerEvents: 'auto',
    width: '100%',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '12px',
    padding: '13px 16px 14px 14px',
    boxShadow: '0 20px 30px -5px rgba(0, 0, 0, 0.4), 0 10px 15px -3px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  iconContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '1px',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    marginBottom: '3px',
  },
  title: {
    fontSize: '13.5px',
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: '-0.2px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'background-color 0.15s ease',
  },
  message: {
    fontSize: '12.5px',
    color: '#94a3b8',
    lineHeight: '1.45',
    margin: 0,
    wordBreak: 'break-word',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    opacity: 0.8,
  },
};
