import React from 'react';
import { Sparkles, LogOut, CreditCard, ChevronRight } from 'lucide-react';
import { COUNTRIES } from '../data/examCatalog';

export default function Navbar({
  profile,
  onOpenProfile,
  onOpenSubscription,
  onLogout,
  testsRemaining = 28,
  totalTests = 30,
}) {
  const countryObj = COUNTRIES.find((c) => c.id === profile?.country) || COUNTRIES[0];

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        {/* Brand */}
        <div style={styles.brandGroup}>
          <div style={styles.logoBadge}>
            <Sparkles size={16} color="#0f172a" />
          </div>
          <span style={styles.brandName}>ExamAI</span>
          <span style={styles.badgeVersion}>Gemini AI</span>
        </div>

        {/* Right Actions */}
        <div style={styles.actions}>
          {/* Subscription Pill */}
          <button
            type="button"
            onClick={onOpenSubscription}
            style={styles.subPill}
            title="View $2.99/mo Plan & Usage"
          >
            <CreditCard size={13} color="#2563eb" />
            <span style={styles.subText}>$2.99 / mo</span>
            <span style={styles.usageTag}>
              {testsRemaining}/{totalTests} Tests
            </span>
          </button>

          {/* Profile Pill */}
          <button
            type="button"
            onClick={onOpenProfile}
            style={styles.profilePill}
            title="Edit Educational Profile"
          >
            <span style={{ fontSize: '14px' }}>{countryObj.flag}</span>
            <div style={styles.profileText}>
              <span style={styles.profileExam}>{profile?.targetExam || 'General Exam'}</span>
            </div>
            <ChevronRight size={13} color="#94a3b8" />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            style={styles.iconButton}
            title="Sign Out"
          >
            <LogOut size={15} color="#475569" />
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: '60px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f1f5f9',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoBadge: {
    width: '28px',
    height: '28px',
    borderRadius: '7px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.4px',
  },
  badgeVersion: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    padding: '2px 7px',
    borderRadius: '6px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  subPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 10px',
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1e40af',
  },
  subText: {
    fontWeight: '700',
  },
  usageTag: {
    backgroundColor: '#ffffff',
    padding: '1px 6px',
    borderRadius: '10px',
    fontSize: '11px',
    color: '#2563eb',
    border: '1px solid #bfdbfe',
  },
  profilePill: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    padding: '5px 12px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#1e293b',
  },
  profileText: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '160px',
  },
  profileExam: {
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  iconButton: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
  },
};
