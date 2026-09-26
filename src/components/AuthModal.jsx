import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, UserCheck } from 'lucide-react';

export default function AuthModal({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'usr_' + Date.now(),
      name: 'Aryan Sharma',
      email: 'student@examai.global',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    };
    localStorage.setItem('examai_user', JSON.stringify(demoUser));
    onLoginSuccess(demoUser);
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    if (!email) return;
    const user = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0],
      email: email,
      avatar: null,
    };
    localStorage.setItem('examai_user', JSON.stringify(demoUser));
    onLoginSuccess(user);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container} className="animate-fade-in">
        {/* Brand Header */}
        <div style={styles.brandBox}>
          <div style={styles.logoBadge}>
            <Sparkles size={20} color="#0f172a" />
          </div>
          <h1 style={styles.brandTitle}>ExamAI</h1>
          <p style={styles.brandSubtitle}>
            Global Standardized Exam & Sample Paper Generator
          </p>
        </div>

        {/* Auth Box */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              {isSignUp ? 'Create your student account' : 'Sign in to your account'}
            </h2>
            <p style={styles.cardDesc}>
              Tailored sample papers & live AI evaluation based on your country & syllabus
            </p>
          </div>

          {/* Quick Demo Access (One-Click) */}
          <button
            type="button"
            onClick={handleDemoLogin}
            style={styles.demoButton}
          >
            <div style={styles.demoButtonContent}>
              <UserCheck size={18} color="#2563eb" />
              <span style={{ fontWeight: 600 }}>Continue with One-Click Demo Access</span>
            </div>
            <ArrowRight size={16} color="#2563eb" />
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>or continue with email</span>
            <span style={styles.dividerLine}></span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Student Email</label>
              <div style={styles.inputWrapper}>
                <Mail size={16} color="#94a3b8" style={styles.inputIcon} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@student.edu"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} color="#94a3b8" style={styles.inputIcon} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={styles.input}
                />
              </div>
            </div>

            <button type="submit" style={styles.primaryButton}>
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Toggle Sign in / Sign up */}
          <div style={styles.toggleFooter}>
            <span style={styles.toggleText}>
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              style={styles.toggleBtn}
            >
              {isSignUp ? 'Sign In' : 'Sign Up Free'}
            </button>
          </div>
        </div>

        {/* Clean Footer Trust Signals */}
        <div style={styles.trustSignals}>
          <div style={styles.trustItem}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Official Curriculum Aligned (CBSE, SAT, GCSE, JEE, NEET)</span>
          </div>
          <div style={styles.trustItem}>
            <span>$2.99 / mo Plan • Fair Usage Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: '24px 16px',
  },
  container: {
    width: '100%',
    maxWidth: '440px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  brandBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '28px',
    textAlign: 'center',
  },
  logoBadge: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    border: '1px solid #e2e8f0',
  },
  brandTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
    marginBottom: '4px',
  },
  brandSubtitle: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '28px 24px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '4px',
  },
  cardDesc: {
    fontSize: '13px',
    color: '#64748b',
    lineHeight: '1.4',
  },
  demoButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '10px',
    color: '#1e40af',
    fontSize: '13.5px',
    marginBottom: '16px',
  },
  demoButtonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#f1f5f9',
  },
  dividerText: {
    fontSize: '11px',
    color: '#94a3b8',
    padding: '0 12px',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.5px',
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
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13.5px',
    color: '#0f172a',
    transition: 'border-color 0.15s ease',
  },
  primaryButton: {
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '11px 16px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: '600',
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
    backgroundColor: 'transparent',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '12.5px',
  },
  trustSignals: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11.5px',
    color: '#94a3b8',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
};
