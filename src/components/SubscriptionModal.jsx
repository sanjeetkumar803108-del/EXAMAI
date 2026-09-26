import React from 'react';
import { CreditCard, Check, X, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function SubscriptionModal({ onClose, testsRemaining = 28, totalTests = 30 }) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const styles = getStyles(isMobile);

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal} className="animate-fade-in">
        <div style={styles.header}>
          <div style={styles.badge}>
            <Sparkles size={14} color="#2563eb" />
            <span>Fair & Transparent Pricing</span>
          </div>
          <button type="button" onClick={onClose} style={styles.closeIcon}>
            <X size={18} color="#64748b" />
          </button>
        </div>

        <h2 style={styles.title}>ExamAI Student Membership</h2>
        <p style={styles.sub}>
          High-accuracy standardized sample papers and live step-marking grading at a fraction of global competitor costs.
        </p>

        {/* Pricing Card */}
        <div style={styles.pricingCard}>
          <div style={styles.priceRow}>
            <div style={styles.priceAmount}>
              <span style={styles.dollar}>$</span>
              <span style={styles.mainPrice}>2.99</span>
              <span style={styles.period}>/ month</span>
            </div>
            <div style={styles.badgeActive}>Active Plan</div>
          </div>
          <p style={styles.inrEquiv}>≈ ₹250 INR • Cancel anytime with single click</p>

          <div style={styles.featuresList}>
            <div style={styles.featureItem}>
              <div style={styles.checkWrap}><Check size={13} color="#16a34a" /></div>
              <span><strong>30 Full Mock Papers / month</strong> (All 4 official sections)</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.checkWrap}><Check size={13} color="#16a34a" /></div>
              <span><strong>30 Live AI Answer Sheet Evaluations</strong> with step-marking</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.checkWrap}><Check size={13} color="#16a34a" /></div>
              <span><strong>Live Web Syllabus Grounding</strong> (2025-2026 Latest Updates)</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.checkWrap}><Check size={13} color="#16a34a" /></div>
              <span><strong>Printable PDF Export</strong> with standard exam board formatting</span>
            </div>
          </div>

          {/* Current Month Usage Progress */}
          <div style={styles.usageBox}>
            <div style={styles.usageHeader}>
              <span style={styles.usageTitle}>Monthly Fair Usage Balance:</span>
              <span style={styles.usageStat}>{testsRemaining} of {totalTests} Tests Left</span>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${(testsRemaining / totalTests) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Value Comparison */}
        <div style={styles.valueBox}>
          <ShieldCheck size={16} color="#10b981" style={{ flexShrink: 0 }} />
          <div style={styles.valueText}>
            <span style={{ fontWeight: '700', color: '#0f172a' }}>Unbeatable Value:</span>{' '}
            At $2.99 for 30 tests, each full mock test + step-wise AI evaluation costs only{' '}
            <strong style={{ color: '#2563eb' }}>$0.099 (₹8.30)</strong>. Competitor tools charge $12-$15/month for basic MCQs!
          </div>
        </div>

        <button type="button" onClick={onClose} style={styles.okBtn}>
          Got it, Close
        </button>
      </div>
    </div>
  );
}

const getStyles = (isMobile) => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: isMobile ? '8px' : '16px',
    boxSizing: 'border-box',
  },
  modal: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    borderRadius: isMobile ? '16px' : '18px',
    border: '1px solid #e2e8f0',
    padding: isMobile ? '18px 14px' : '28px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
    maxHeight: isMobile ? '94vh' : '90vh',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 8px',
    borderRadius: '16px',
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#1e40af',
  },
  closeIcon: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.4px',
    marginBottom: '4px',
  },
  sub: {
    fontSize: '13px',
    color: '#64748b',
    lineHeight: '1.4',
    marginBottom: '20px',
  },
  pricingCard: {
    border: '1.5px solid #0f172a',
    borderRadius: '14px',
    padding: '20px',
    backgroundColor: '#ffffff',
    marginBottom: '16px',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceAmount: {
    display: 'flex',
    alignItems: 'baseline',
  },
  dollar: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
  },
  mainPrice: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
    marginLeft: '2px',
  },
  period: {
    fontSize: '13px',
    color: '#64748b',
    marginLeft: '4px',
  },
  badgeActive: {
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    border: '1px solid #a7f3d0',
    fontSize: '11.5px',
    fontWeight: '700',
  },
  inrEquiv: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '2px',
    marginBottom: '16px',
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: '12.5px',
    color: '#334155',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '14px',
    marginBottom: '18px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkWrap: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#f0fdf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  usageBox: {
    backgroundColor: '#f8fafc',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
  usageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11.5px',
    marginBottom: '6px',
  },
  usageTitle: {
    fontWeight: '600',
    color: '#475569',
  },
  usageStat: {
    fontWeight: '700',
    color: '#0f172a',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  valueBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '10px 12px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '10px',
    fontSize: '12px',
    color: '#166534',
    lineHeight: '1.4',
    marginBottom: '18px',
  },
  valueText: {
    flex: 1,
  },
  okBtn: {
    width: '100%',
    padding: isMobile ? '13px' : '11px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '9px',
    fontSize: '13.5px',
    fontWeight: '700',
  },
});
