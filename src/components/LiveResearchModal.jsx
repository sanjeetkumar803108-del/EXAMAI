import React from 'react';
import { Globe, Search, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function LiveResearchModal({ currentStep, topic, profile }) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const styles = getStyles(isMobile);

  return (
    <div style={styles.backdrop}>
      <div style={styles.card} className="animate-fade-in">
        {/* Radar Icon */}
        <div style={styles.radarWrapper}>
          <div style={styles.pulseRing} className="animate-pulse"></div>
          <div style={styles.radarIcon}>
            <Globe size={24} color="#0f172a" className="animate-spin" />
          </div>
        </div>

        {/* Content */}
        <h3 style={styles.title}>Live Syllabus & Pattern Research</h3>
        <p style={styles.subtitle}>
          ExamAI is actively grounding "{topic}" exclusively for <strong>{profile?.targetExam || 'Your Exam'}</strong> ({profile?.grade || 'Class'}) according to the official syllabus and real exam question patterns.
        </p>

        {/* Live Terminal Log */}
        <div style={styles.logBox}>
          <div style={styles.logHeader}>
            <span style={styles.logDot}></span>
            <span style={styles.logStatus}>Active Official Grounding Stream</span>
          </div>
          <div style={styles.logBody}>
            <p style={styles.logText}>
              <span style={{ color: '#2563eb', fontWeight: 'bold' }}>&gt;</span> {currentStep || 'Initializing curriculum connection...'}
            </p>
          </div>
        </div>

        {/* Candidate Profile Verification Cards */}
        <div style={styles.metaRow}>
          <div style={styles.metaItem}>
            <ShieldCheck size={14} color="#10b981" />
            <span><strong>Exam:</strong> {profile?.targetExam || 'National Board'}</span>
          </div>
          <div style={styles.metaItem}>
            <span><strong>Class:</strong> {profile?.grade || 'Standard'}</span>
          </div>
          <div style={styles.metaItem}>
            <span><strong>Region:</strong> {profile?.country || 'Global'}</span>
          </div>
        </div>
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
  card: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: '#ffffff',
    borderRadius: isMobile ? '16px' : '18px',
    border: '1px solid #e2e8f0',
    padding: isMobile ? '20px 14px' : '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
    boxSizing: 'border-box',
  },
  radarWrapper: {
    position: 'relative',
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  pulseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    border: '2px solid #e2e8f0',
  },
  radarIcon: {
    position: 'relative',
    zIndex: 2,
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  title: {
    fontSize: isMobile ? '16px' : '18px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.4px',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: isMobile ? '12px' : '13px',
    color: '#64748b',
    lineHeight: '1.4',
    marginBottom: '20px',
    maxWidth: '380px',
  },
  logBox: {
    width: '100%',
    backgroundColor: '#fafafa',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '12px 14px',
    textAlign: 'left',
    marginBottom: '18px',
    boxSizing: 'border-box',
  },
  logHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px',
  },
  logDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
  },
  logStatus: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  logBody: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: '#0f172a',
  },
  logText: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    lineHeight: '1.4',
  },
  metaRow: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '6px' : '16px',
    fontSize: '11.5px',
    color: '#64748b',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
});
