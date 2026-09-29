import React, { useState, useEffect } from 'react';
import { Sparkles, LogOut, CreditCard, ChevronRight, User } from 'lucide-react';
import { COUNTRIES } from '../data/examCatalog';

export default function Navbar({
  profile,
  onOpenProfile,
  onOpenSubscription,
  onLogout,
  testsRemaining = 28,
  totalTests = 30,
}) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const countryObj = COUNTRIES.find((c) => c.id === profile?.country) || {
    flag: profile?.countryFlag || '🌐',
    name: profile?.countryName || profile?.country || 'Education Profile',
  };

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        {/* Brand */}
        <div style={styles.brandGroup}>
          <div style={styles.logoBadge}>
            <Sparkles size={16} color="#0f172a" />
          </div>
          <span style={styles.brandName}>ExamAI</span>
          {!isMobile && <span style={styles.badgeVersion}>Gemini AI</span>}
        </div>

        {/* Right Actions */}
        <div style={styles.actions}>
          {/* Subscription Pill */}
          <button
            type="button"
            onClick={onOpenSubscription}
            style={isMobile ? styles.subPillMobile : styles.subPill}
            title="View $2.99/mo Plan & Usage"
          >
            <CreditCard size={13} color="#2563eb" />
            {!isMobile && <span style={styles.subText}>$2.99/mo</span>}
            <span style={styles.usageTag}>
              {testsRemaining} Left
            </span>
          </button>

          {/* AP Calculus Specialty Badge */}
          <div style={isMobile ? styles.apBadgeMobile : styles.apBadge}>
            <span style={styles.apBadgeDot}></span>
            <span style={styles.apBadgeText}>AP Calculus Specialist</span>
          </div>

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
    height: '56px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f1f5f9',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  inner: {
    width: '100%',
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  brandGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
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
    gap: '6px',
    flexShrink: 0,
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
  subPillMobile: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: '16px',
    fontSize: '11px',
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
    fontWeight: '700',
  },
  apBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 12px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '20px',
  },
  apBadgeMobile: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '16px',
  },
  apBadgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
  },
  apBadgeText: {
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#1d4ed8',
    letterSpacing: '0.2px',
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
    flexShrink: 0,
  },
};
