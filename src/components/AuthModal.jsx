import React, { useState, useEffect } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  // Check for pending redirect sign-in result from Google OAuth on mount
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          const resultUser = result.user;
          const userData = {
            id: resultUser.uid,
            name: resultUser.displayName || resultUser.email?.split('@')[0] || 'Student',
            email: resultUser.email,
            avatar: resultUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${resultUser.email}`,
            authProvider: 'google',
            createdAt: new Date().toISOString(),
          };
          saveAccount(userData);
          localStorage.setItem('examai_user', JSON.stringify(userData));
          onLoginSuccess(userData);
        }
      })
      .catch((err) => {
        console.warn('[Google Auth Redirect Notice]:', err);
      });
  }, []);

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
      if (accounts[cleanEmail]) {
        setErrorMsg('An account with this email already exists. Click below to Sign In.');
        return;
      }

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
      const existing = accounts[cleanEmail];
      if (existing) {
        if (existing.password && existing.password !== password) {
          setErrorMsg('Incorrect password. Please try again.');
          return;
        }
        localStorage.setItem('examai_user', JSON.stringify(existing));
        onLoginSuccess(existing);
      } else {
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

  // Authentic Firebase Google Sign-In with forced Google Account Picker
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsGoogleLoading(true);

    try {
      const freshProvider = new GoogleAuthProvider();
      // Forces Google to always show the account chooser dialog with all logged-in accounts
      freshProvider.setCustomParameters({ prompt: 'select_account' });

      let resultUser = null;
      try {
        const result = await signInWithPopup(auth, freshProvider);
        resultUser = result.user;
      } catch (popupErr) {
        console.warn('[Google Auth] Popup blocked or closed, falling back to redirect:', popupErr);
        if (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/cancelled-popup-request') {
          await signInWithRedirect(auth, freshProvider);
          return;
        }
        if (popupErr.code === 'auth/popup-closed-by-user') {
          setIsGoogleLoading(false);
          return;
        }
        throw popupErr;
      }

      if (resultUser) {
        const userData = {
          id: resultUser.uid,
          name: resultUser.displayName || resultUser.email?.split('@')[0] || 'Google User',
          email: resultUser.email,
          avatar: resultUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${resultUser.email}`,
          authProvider: 'google',
          createdAt: new Date().toISOString(),
        };

        saveAccount(userData);
        localStorage.setItem('examai_user', JSON.stringify(userData));
        setSuccessMsg(`Welcome, ${userData.name}!`);
        setTimeout(() => {
          onLoginSuccess(userData);
        }, 300);
      }
    } catch (err) {
      console.error('[Google Auth Error]:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        // User closed the popup, cancel gracefully
      } else if (err.code === 'auth/unauthorized-domain') {
        setErrorMsg('Domain not authorized in Firebase Console. Please add current domain to Firebase Auth Authorized Domains.');
      } else {
        setErrorMsg(err.message || 'Google Sign-In failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
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

          {/* OR CONTINUE WITH Divider (AP-Exam Style) */}
          <div style={styles.dividerWrap}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>OR CONTINUE WITH</span>
          </div>

          {/* Sign In With Google Button (AP-Exam Style) */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            style={{
              ...styles.googleBtn,
              opacity: isGoogleLoading ? 0.75 : 1,
              cursor: isGoogleLoading ? 'wait' : 'pointer',
            }}
            title="Sign in with your real Google Account"
          >
            {isGoogleLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={18} className="animate-spin" color="#334155" />
                <span>CONNECTING GOOGLE...</span>
              </div>
            ) : (
              <>
                <GoogleIcon />
                <span>GOOGLE SIGN-IN</span>
              </>
            )}
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
              {mode === 'signup' ? 'Sign In' : 'Sign Up'}
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
    </div>
  );
}

const styles = {
  overlay: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    boxSizing: 'border-box',
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
    textAlign: 'center',
    marginBottom: '24px',
  },
  logoBadge: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
    marginBottom: '10px',
  },
  brandTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  brandTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  aiTag: {
    fontSize: '10.5px',
    fontWeight: '700',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    padding: '2px 7px',
    borderRadius: '6px',
    border: '1px solid #dbeafe',
  },
  brandSubtitle: {
    fontSize: '12.5px',
    color: '#64748b',
    margin: 0,
    fontWeight: '500',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
    padding: '28px 24px',
    boxSizing: 'border-box',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.4px',
    margin: '0 0 4px 0',
  },
  cardDesc: {
    fontSize: '12px',
    color: '#64748b',
    lineHeight: '1.4',
    margin: 0,
  },
  alertError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '10px',
    color: '#b91c1c',
    fontSize: '12px',
    marginBottom: '16px',
    lineHeight: '1.4',
  },
  alertSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '10px',
    color: '#15803d',
    fontSize: '12px',
    marginBottom: '16px',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
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
    padding: '10px 12px 10px 36px',
    fontSize: '13.5px',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1.5px solid #cbd5e1',
    borderRadius: '10px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
  },
  eyeBtn: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '13.5px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'background-color 0.15s ease',
  },
  dividerWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '22px 0 16px 0',
  },
  dividerLine: {
    position: 'absolute',
    width: '100%',
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    position: 'relative',
    backgroundColor: '#ffffff',
    padding: '0 12px',
    fontSize: '10.5px',
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  googleBtn: {
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1.5px solid #e2e8f0',
    color: '#1e293b',
    fontWeight: '700',
    padding: '13px 20px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    fontSize: '13px',
    letterSpacing: '0.3px',
  },
  toggleFooter: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '12.5px',
  },
  toggleText: {
    color: '#64748b',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontWeight: '700',
    cursor: 'pointer',
    padding: 0,
    fontSize: '12.5px',
  },
  trustSignals: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'center',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#94a3b8',
  },
};
