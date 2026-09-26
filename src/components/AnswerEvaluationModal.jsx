import React from 'react';
import { Award, CheckCircle2, XCircle, AlertCircle, ArrowLeft, Download, Sparkles } from 'lucide-react';
import MathRenderer from './MathRenderer';

export default function AnswerEvaluationModal({ evaluation, onClose }) {
  if (!evaluation) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal} className="animate-fade-in">
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Sparkles size={14} color="#2563eb" />
            <span>AI Live Step-Marking Evaluation</span>
          </div>
          <h2 style={styles.title}>Official Examination Performance Report</h2>
          <p style={styles.subtitle}>
            Evaluated against official marking scheme and step-marking rubrics • {evaluation.evaluatedAt}
          </p>
        </div>

        {/* Scorecard Hero */}
        <div style={styles.scoreHero}>
          <div style={styles.scoreCircle}>
            <span style={styles.scoreVal}>{evaluation.totalAwardedMarks}</span>
            <span style={styles.scoreMax}>/ {evaluation.totalMaxMarks}</span>
          </div>

          <div style={styles.scoreDetails}>
            <div style={styles.percentageRow}>
              <span style={styles.percentText}>{evaluation.percentage}% Overall Score</span>
            </div>
            <p style={styles.remarksText}>{evaluation.gradeRemarks}</p>
          </div>
        </div>

        {/* Question-by-Question Step Breakdown */}
        <div style={styles.breakdownHeader}>
          <h3 style={styles.breakdownTitle}>Question-by-Question Step Marking Breakdown</h3>
        </div>

        <div style={styles.questionsContainer}>
          {evaluation.questions.map((q, idx) => {
            const isFullMarks = q.marksEarned === q.marksPossible;
            const isZeroMarks = q.marksEarned === 0;

            return (
              <div key={idx} style={styles.qCard}>
                {/* Q Title Bar */}
                <div style={styles.qBar}>
                  <div style={styles.qBarLeft}>
                    <span style={styles.qNum}>Question {q.questionNumber}</span>
                    <span style={styles.qStatusBadge}>
                      {isFullMarks ? (
                        <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={13} /> Full Marks
                        </span>
                      ) : isZeroMarks ? (
                        <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <XCircle size={13} /> 0 Marks
                        </span>
                      ) : (
                        <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <AlertCircle size={13} /> Partial Marks
                        </span>
                      )}
                    </span>
                  </div>

                  <span style={styles.qScoreBadge}>
                    {q.marksEarned} / {q.marksPossible} Marks
                  </span>
                </div>

                {/* Examiner Feedback */}
                <div style={styles.feedbackBox}>
                  <span style={styles.feedbackLabel}>Examiner Remarks:</span>
                  <div style={styles.feedbackText}>
                    <MathRenderer text={q.feedback} />
                  </div>
                </div>

                {/* Step Breakdown */}
                {q.stepBreakdown && q.stepBreakdown.length > 0 && (
                  <div style={styles.stepsList}>
                    <span style={styles.stepsTitle}>Step-Marking Rubric Points:</span>
                    {q.stepBreakdown.map((st, sIdx) => (
                      <div key={sIdx} style={styles.stepRow}>
                        {st.awarded ? (
                          <CheckCircle2 size={13} color="#16a34a" style={{ flexShrink: 0 }} />
                        ) : (
                          <XCircle size={13} color="#dc2626" style={{ flexShrink: 0 }} />
                        )}
                        <span style={{ color: st.awarded ? '#15803d' : '#991b1b', flex: 1 }}>
                          <MathRenderer text={st.step} />
                        </span>
                        <span style={{ fontWeight: '700', fontSize: '11px', color: '#475569' }}>
                          {st.note}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comparison Details */}
                <div style={styles.comparisonGrid}>
                  <div style={styles.ansBox}>
                    <span style={styles.ansLabel}>Your Submission:</span>
                    <div style={styles.ansContent}>
                      <MathRenderer text={q.studentAnswer || '— No response provided —'} />
                    </div>
                  </div>
                  <div style={{ ...styles.ansBox, backgroundColor: '#f8fafc' }}>
                    <span style={styles.ansLabel}>Official Model Answer:</span>
                    <div style={styles.ansContent}>
                      <MathRenderer text={q.officialAnswer} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button
            type="button"
            onClick={onClose}
            style={styles.closeBtn}
          >
            <ArrowLeft size={15} />
            <span>Return to Exam Paper</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '780px',
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    border: '1px solid #e2e8f0',
    padding: '30px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: '20px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    fontSize: '12px',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '8px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.4px',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '12.5px',
    color: '#64748b',
  },
  scoreHero: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '18px 24px',
    backgroundColor: '#fafafa',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    marginBottom: '22px',
  },
  scoreCircle: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
  },
  scoreVal: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-1px',
  },
  scoreMax: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#94a3b8',
  },
  scoreDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  percentageRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  percentText: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#0f172a',
  },
  remarksText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#2563eb',
  },
  breakdownHeader: {
    marginBottom: '12px',
  },
  breakdownTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  questionsContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    paddingRight: '6px',
    marginBottom: '16px',
  },
  qCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#ffffff',
  },
  qBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  qBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  qNum: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#0f172a',
  },
  qStatusBadge: {
    fontSize: '12px',
    fontWeight: '600',
  },
  qScoreBadge: {
    fontSize: '12px',
    fontWeight: '700',
    padding: '3px 8px',
    backgroundColor: '#f1f5f9',
    borderRadius: '6px',
    color: '#0f172a',
  },
  feedbackBox: {
    backgroundColor: '#f8fafc',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  feedbackLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '2px',
  },
  feedbackText: {
    fontSize: '12.5px',
    color: '#1e293b',
    lineHeight: '1.4',
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '10px',
  },
  stepsTitle: {
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#64748b',
    marginBottom: '2px',
  },
  stepRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    lineHeight: '1.3',
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '8px',
    marginTop: '6px',
  },
  ansBox: {
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid #f1f5f9',
  },
  ansLabel: {
    fontSize: '10.5px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '2px',
  },
  ansContent: {
    fontSize: '12px',
    color: '#334155',
    lineHeight: '1.4',
    whiteSpace: 'pre-line',
  },
  footer: {
    paddingTop: '14px',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
  },
};
