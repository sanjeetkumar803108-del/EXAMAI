import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, X } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function AuthModal({ onLoginSuccess }) {
  // Mode: 'signup' (default for new user) or 'signin' (existing account)
  const [mode, setMode] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  // Read stored accounts from localStorage
  const getStoredAccounts = () => {
    try {
      const data = localStorage.getItem('examai_registered_accounts');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  };

  // Save account to localStorage
  const saveAccount = (accountObj) => {
    try {
      const accounts = getStoredAccounts();
      accounts[accountObj.email.toLowerCase()] = accountObj;
      localStorage.setItem('examai_registered_accounts', JSON.stringify(accounts));
    } catch (e) {
      console.error('Failed to store account:', e);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    const accounts = getStoredAccounts();

    if (mode === 'signup') {
      // Check if user already exists
      if (accounts[cleanEmail]) {
        setErrorMsg('An account with this email already exists. Click below to Sign In.');
        return;
      }

      // Create new account
      const newUser = {
        id: 'usr_' + Date.now(),
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        password: password,
        authProvider: 'email',
        createdAt: new Date().toISOString(),
      };

      saveAccount(newUser);
      localStorage.setItem('examai_user', JSON.stringify(newUser));
      setSuccessMsg('Account created successfully! Welcome to ExamAI.');
      setTimeout(() => {
        onLoginSuccess(newUser);
      }, 350);
    } else {
      // Sign In mode
      const existing = accounts[cleanEmail];
      if (existing) {
        if (existing.password && existing.password !== password) {
          setErrorMsg('Incorrect password. Please try again.');
          return;
        }
        localStorage.setItem('examai_user', JSON.stringify(existing));
        onLoginSuccess(existing);
      } else {
        // If not found in localStorage (e.g. testing in a fresh browser session),
        // save and let them proceed seamlessly so they are never blocked!
        const newUser = {
          id: 'usr_' + Date.now(),
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          password: password,
          authProvider: 'email',
          createdAt: new Date().toISOString(),
        };
        saveAccount(newUser);
        localStorage.setItem('examai_user', JSON.stringify(newUser));
        onLoginSuccess(newUser);
      }
    }
  };

  // Google Sign-In handler
  const handleGoogleLogin = (chosenEmail = 'student.examai@gmail.com', chosenName = 'Google Student') => {
    const googleUser = {
      id: 'goog_' + Date.now(),
      name: chosenName,
      email: chosenEmail,
      authProvider: 'google',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    };
    saveAccount(googleUser);
    localStorage.setItem('examai_user', JSON.stringify(googleUser));
    setShowGoogleModal(false);
    onLoginSuccess(googleUser);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container} className="animate-fade-in">
        {/* App Branding Header */}
        <div style={styles.brandBox}>
          <div style={styles.logoBadge}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div style={styles.brandTitleRow}>
            <h1 style={styles.brandTitle}>ExamAI</h1>
            <span style={styles.aiTag}>Gemini AI</span>
          </div>
          <p style={styles.brandSubtitle}>
            AI-Powered Standardized Exam Preparation & Testing System
          </p>
        </div>

        {/* Auth Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              {mode === 'signup' ? 'Create your Account' : 'Sign in to your Account'}
            </h2>
            <p style={styles.cardDesc}>
              {mode === 'signup'
                ? 'Get started with customized question papers & instant AI grading'
                : 'Welcome back! Enter your details to continue your exam preparation'}
            </p>
          </div>

          {/* Inline Alerts */}
          {errorMsg && (
            <div style={styles.alertError} className="animate-fade-in">
              <AlertCircle size={15} color="#dc2626" style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div style={styles.alertSuccess} className="animate-fade-in">
              <CheckCircle2 size={15} color="#16a34a" style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleAuthSubmit} style={styles.form}>
            {/* Email Field */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={16} color="#94a3b8" style={styles.inputIcon} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="name@student.edu"
                  style={styles.input}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} color="#94a3b8" style={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder={mode === 'signup' ? 'Create a password (min. 6 chars)' : 'Enter your password'}
                  style={{ ...styles.input, paddingRight: '40px' }}
                  required
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} color="#64748b" /> : <Eye size={16} color="#64748b" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" style={styles.primaryButton}>
              <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* OR Divider */}
          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>OR</span>
            <span style={styles.dividerLine}></span>
          </div>

          {/* Sign In With Google */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            style={styles.googleButton}
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>

          {/* Toggle between Sign Up and Sign In */}
          <div style={styles.toggleFooter}>
            <span style={styles.toggleText}>
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signup' ? 'signin' : 'signup');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              style={styles.toggleBtn}
            >
              Click here
            </button>
          </div>
        </div>

        {/* Clean Footer Trust Signals */}
        <div style={styles.trustSignals}>
          <div style={styles.trustItem}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Curriculum Aligned (CBSE • SAT • GCSE • JEE • NEET • IB)</span>
          </div>
          <div style={styles.trustItem}>
            <span>🔒 Secure & Private • Instant AI Step-Marking</span>
          </div>
        </div>
      </div>

      {/* Google Account Selection Modal */}
      {showGoogleModal && (
        <div style={styles.googleModalBackdrop} className="animate-fade-in">
          <div style={styles.googleModalCard}>
            <div style={styles.googleModalTop}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GoogleIcon />
                <span style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
                  Sign in with Google
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                style={styles.closeBtn}
              >
                <X size={16} color="#64748b" />
              </button>
            </div>

            <p style={styles.googleModalDesc}>
              Choose a Google account to continue to <strong>ExamAI</strong>
            </p>

            <div style={styles.googleAccountsList}>
              <button
                type="button"
                onClick={() => handleGoogleLogin('student.scholar@gmail.com', 'Student Scholar')}
                style={styles.googleAccountItem}
              >
                <div style={styles.googleAvatarBadge}>S</div>
                <div style={styles.googleAccountInfo}>
                  <span style={styles.googleAccountName}>Student Scholar</span>
                  <span style={styles.googleAccountEmail}>student.scholar@gmail.com</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleGoogleLogin('candidate.examai@gmail.com', 'Exam Candidate')}
                style={styles.googleAccountItem}
              >
                <div style={{ ...styles.googleAvatarBadge, backgroundColor: '#7c3aed' }}>E</div>
                <div style={styles.googleAccountInfo}>
                  <span style={styles.googleAccountName}>Exam Candidate</span>
                  <span style={styles.googleAccountEmail}>candidate.examai@gmail.com</span>
                </div>
              </button>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                Or sign in with any custom Google email:
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  placeholder="your.google@gmail.com"
                  style={styles.customGoogleInput}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customGoogleEmail && customGoogleEmail.includes('@')) {
                      handleGoogleLogin(customGoogleEmail, customGoogleEmail.split('@')[0]);
                    }
                  }}
                  style={styles.customGoogleSubmit}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.05), transparent 60%)',
    padding: '24px 16px',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '430px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  brandBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px',
    textAlign: 'center',
  },
  logoBadge: {
    width: '46px',
    height: '46px',
    borderRadius: '13px',
    backgroundColor: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
  },
  brandTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  brandTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.6px',
  },
  aiTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: '999px',
    padding: '2px 8px',
    letterSpacing: '0.2px',
  },
  brandSubtitle: {
    fontSize: '12.5px',
    color: '#64748b',
    fontWeight: '500',
    maxWidth: '320px',
    lineHeight: '1.4',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '28px 24px',
    boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
  },
  cardHeader: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.3px',
    marginBottom: '4px',
  },
  cardDesc: {
    fontSize: '12.5px',
    color: '#64748b',
    lineHeight: '1.45',
  },
  alertError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '9px 12px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#991b1b',
    fontSize: '12px',
    marginBottom: '16px',
  },
  alertSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '9px 12px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
    color: '#166534',
    fontSize: '12px',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  inputLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#334155',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '11px 12px 11px 36px',
    borderRadius: '10px',
    border: '1.5px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13.5px',
    color: '#0f172a',
    outline: 'none',
    transition: 'all 0.15s ease',
  },
  eyeBtn: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
  },
  primaryButton: {
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '11.5px 16px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '10px',
    fontSize: '13.5px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.15)',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '18px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: '11px',
    color: '#94a3b8',
    padding: '0 12px',
    fontWeight: '700',
    letterSpacing: '0.8px',
  },
  googleButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '11px 16px',
    backgroundColor: '#ffffff',
    border: '1.5px solid #cbd5e1',
    borderRadius: '10px',
    color: '#1e293b',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
  },
  toggleFooter: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '13px',
  },
  toggleText: {
    color: '#64748b',
    fontWeight: '500',
  },
  toggleBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#2563eb',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    padding: '2px 4px',
  },
  trustSignals: {
    marginTop: '22px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11.5px',
    color: '#94a3b8',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  googleModalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    backdropFilter: 'blur(3px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 9999,
  },
  googleModalCard: {
    width: '100%',
    maxWidth: '380px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  googleModalTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleModalDesc: {
    fontSize: '12.5px',
    color: '#475569',
    marginBottom: '14px',
    lineHeight: '1.4',
  },
  googleAccountsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  googleAccountItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'background-color 0.15s ease',
  },
  googleAvatarBadge: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '13px',
    flexShrink: 0,
  },
  googleAccountInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  googleAccountName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#0f172a',
  },
  googleAccountEmail: {
    fontSize: '11.5px',
    color: '#64748b',
  },
  customGoogleInput: {
    flex: 1,
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '12px',
    color: '#0f172a',
  },
  customGoogleSubmit: {
    padding: '8px 14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
