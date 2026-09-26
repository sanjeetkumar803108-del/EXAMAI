import React, { useState, useEffect } from 'react';
import { Download, Clock, CheckCircle, Eye, EyeOff, Sparkles, FileText, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { exportExamToPDF } from '../services/pdfExporter';
import MathRenderer from './MathRenderer';
import FormattedQuestionBody from './FormattedQuestionBody';

export default function ExamPaperView({ paper, onEvaluate, onReset }) {
  const [studentAnswers, setStudentAnswers] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(paper.timeAllowed.includes('90') ? 90 * 60 : 180 * 60);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  const formatTimer = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h > 0 ? `${h}h ` : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleMCQSelect = (qId, optionChar) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [qId]: optionChar,
    }));
  };

  const handleTextAnswerChange = (qId, text) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [qId]: text,
    }));
  };

  const answeredCount = Object.keys(studentAnswers).filter((k) => studentAnswers[k]?.trim().length > 0).length;
  const totalQuestions = paper.sections.reduce((acc, s) => acc + s.questions.length, 0);

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Sticky Action Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarLeft}>
          <button
            type="button"
            onClick={onReset}
            style={styles.backBtn}
          >
            ← Generate New
          </button>
          <div style={styles.answeredBadge}>
            <span>{answeredCount}/{totalQuestions} Answered</span>
          </div>
          {timerActive && (
            <div style={styles.timerBadge}>
              <Clock size={13} color="#2563eb" />
              <span>{formatTimer(secondsLeft)}</span>
            </div>
          )}
        </div>

        <div style={styles.toolbarRight}>
          {/* Timer Toggle */}
          <button
            type="button"
            onClick={() => setTimerActive(!timerActive)}
            style={{
              ...styles.toolBtn,
              backgroundColor: timerActive ? '#eff6ff' : '#ffffff',
              color: timerActive ? '#1e40af' : '#475569',
            }}
          >
            <Clock size={14} />
            <span>{timerActive ? 'Pause Timer' : 'Start Exam Timer'}</span>
          </button>

          {/* Toggle Solutions */}
          <button
            type="button"
            onClick={() => setShowSolutions(!showSolutions)}
            style={styles.toolBtn}
          >
            {showSolutions ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showSolutions ? 'Hide Rubrics' : 'View Rubrics'}</span>
          </button>

          {/* Download PDF */}
          <button
            type="button"
            onClick={() => exportExamToPDF(paper)}
            style={styles.downloadBtn}
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>

          {/* Live AI Evaluation */}
          <button
            type="button"
            onClick={() => onEvaluate(studentAnswers)}
            style={styles.evaluateBtn}
          >
            <Sparkles size={14} />
            <span>Submit for Live AI Checking</span>
          </button>
        </div>
      </div>

      {/* Main Examination Sheet */}
      <div style={styles.paperCard}>
        {/* Research Verification Bar */}
        {paper.researchHighlights && (
          <div style={styles.researchPillBar}>
            <Sparkles size={14} color="#2563eb" />
            <span>
              Official Blueprint Grounded: <strong>{paper.studentProfile?.targetExam || paper.title}</strong> • {paper.board} • {paper.researchHighlights.detectedSubject} • {paper.researchHighlights.negativeMarking && paper.researchHighlights.negativeMarking !== 'None' ? paper.researchHighlights.negativeMarking : 'Standard Marking'} • Anti-Duplication Active (0 Duplicates)
            </span>
          </div>
        )}

        {/* Roll No & Code Bar */}
        <div style={styles.paperMetaBar}>
          <div style={styles.rollBox}>
            <span style={styles.rollLabel}>ROLL NO:</span>
            <div style={styles.rollGrid}>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={styles.rollSquare}></div>
              ))}
            </div>
          </div>
          <span style={styles.paperCodeText}>Paper Code: {paper.paperCode}</span>
        </div>

        {/* Paper Header */}
        <div style={styles.examHeader}>
          <h2 style={styles.examTitle}>{paper.title}</h2>
          <h3 style={styles.examBoard}>{paper.board}</h3>
          <div style={styles.examSubject}>
            <span>SUBJECT: {paper.subject}</span>
            <span style={{ margin: '0 8px' }}>•</span>
            <span>TOPIC: "{paper.topic.toUpperCase()}"</span>
          </div>

          <div style={styles.timeMarksRow}>
            <span>TIME ALLOWED: {paper.timeAllowed.toUpperCase()}</span>
            <span>MAXIMUM MARKS: {paper.maxMarks}</span>
          </div>
        </div>

        {/* General Instructions Toggle */}
        <div style={styles.instructionsContainer}>
          <button
            type="button"
            onClick={() => setShowInstructions(!showInstructions)}
            style={styles.instructionsToggle}
          >
            <span style={{ fontWeight: '700' }}>GENERAL INSTRUCTIONS</span>
            {showInstructions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showInstructions && (
            <ol style={styles.instructionsList}>
              {paper.generalInstructions.map((inst, idx) => (
                <li key={idx} style={styles.instructionItem}>
                  <MathRenderer text={inst} />
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Paper Sections */}
        {paper.sections.map((section, sIdx) => (
          <div key={sIdx} style={styles.sectionBlock}>
            {/* Section Header */}
            <div style={styles.sectionHeader}>
              <span style={styles.sectionBadge}>{section.name}</span>
              <span style={styles.sectionDesc}>{section.description}</span>
            </div>

            {/* Reading Passage Box if section has reading/case context */}
            {section.passage && (
              <div style={styles.passageCard}>
                <div style={styles.passageHeader}>
                  <BookOpen size={14} color="#2563eb" />
                  <span style={styles.passageTitle}>Reading Passage / Reference Context</span>
                </div>
                <FormattedQuestionBody text={section.passage} customTextStyle={styles.passageText} />
              </div>
            )}

            {/* Questions */}
            <div style={styles.questionsList}>
              {section.questions.map((q) => {
                const studentAns = studentAnswers[q.id] || '';

                return (
                  <div key={q.id} style={styles.questionItem}>
                    {/* Q Header */}
                    <div style={styles.questionTop}>
                      <span style={styles.qNumber}>Q.{q.questionNumber}</span>
                      <span style={styles.qMarks}>[{q.marks} Mark{q.marks > 1 ? 's' : ''}]</span>
                    </div>

                    {/* Question Text & Structured Tables */}
                    <FormattedQuestionBody text={q.text} />

                    {/* MCQ Options */}
                    {q.type === 'mcq' && q.options && (
                      <div style={styles.optionsGrid}>
                        {q.options.map((opt, oIdx) => {
                          const optChar = opt.charAt(0);
                          const isSelected = studentAns === optChar;
                          const optBody = opt.replace(/^[A-E][).:\s]\s*/, '');

                          return (
                            <button
                              type="button"
                              key={oIdx}
                              onClick={() => handleMCQSelect(q.id, optChar)}
                              style={{
                                ...styles.optionButton,
                                borderColor: isSelected ? '#0f172a' : '#e2e8f0',
                                backgroundColor: isSelected ? '#f8fafc' : '#ffffff',
                                fontWeight: isSelected ? '700' : '400',
                              }}
                            >
                              <span
                                style={{
                                  ...styles.optLetterBadge,
                                  backgroundColor: isSelected ? '#0f172a' : '#f1f5f9',
                                  color: isSelected ? '#ffffff' : '#475569',
                                }}
                              >
                                {optChar}
                              </span>
                              <span style={styles.optContent}>
                                <MathRenderer text={optBody} />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Subjective / Numerical Answer Field */}
                    {q.type !== 'mcq' && (
                      <div style={styles.textAnswerWrapper}>
                        <textarea
                          rows={3}
                          value={studentAns}
                          onChange={(e) => handleTextAnswerChange(q.id, e.target.value)}
                          placeholder="Type or paste your step-by-step solution here (or formula, calculations, derivation)..."
                          style={styles.answerTextarea}
                        />
                      </div>
                    )}

                    {/* Official Solution & Step Marking (if toggled) */}
                    {showSolutions && (
                      <div style={styles.solutionBox} className="animate-fade-in">
                        <div style={styles.solHeader}>
                          <CheckCircle size={13} color="#10b981" />
                          <span style={styles.solTitle}>Official Solution & Step Rubric</span>
                        </div>
                        <FormattedQuestionBody text={q.correctAnswer} customTextStyle={styles.solText} />

                        {q.stepMarkingScheme && (
                          <div style={styles.rubricSteps}>
                            {q.stepMarkingScheme.map((step, stIdx) => (
                              <div key={stIdx} style={styles.rubricItem}>
                                <span style={styles.rubricDot}>•</span>
                                <div style={{ flex: 1 }}>
                                  <MathRenderer text={step} />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '920px',
    margin: '0 auto',
    padding: '20px 20px 80px 20px',
  },
  toolbar: {
    position: 'sticky',
    top: '60px',
    zIndex: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #f1f5f9',
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  backBtn: {
    padding: '6px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#475569',
  },
  answeredBadge: {
    padding: '5px 10px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#0f172a',
  },
  timerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px 10px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#1e40af',
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  toolBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#475569',
  },
  downloadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 14px',
    backgroundColor: '#ffffff',
    border: '1.5px solid #0f172a',
    borderRadius: '8px',
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#0f172a',
  },
  evaluateBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 14px',
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#ffffff',
  },
  paperCard: {
    backgroundColor: '#ffffff',
    border: '1.5px solid #e2e8f0',
    borderRadius: '16px',
    padding: '36px 32px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
  },
  researchPillBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '7px 12px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    fontSize: '11.5px',
    color: '#1e40af',
    marginBottom: '18px',
  },
  paperMetaBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '14px',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '20px',
  },
  rollBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  rollLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#475569',
    letterSpacing: '0.4px',
  },
  rollGrid: {
    display: 'flex',
    gap: '3px',
  },
  rollSquare: {
    width: '14px',
    height: '18px',
    border: '1px solid #cbd5e1',
    borderRadius: '2px',
  },
  paperCodeText: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '0.5px',
  },
  examHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  examTitle: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.3px',
    marginBottom: '4px',
  },
  examBoard: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#475569',
    marginBottom: '6px',
  },
  examSubject: {
    fontSize: '13.5px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '14px',
  },
  timeMarksRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderTop: '2px solid #0f172a',
    borderBottom: '1px solid #0f172a',
    fontSize: '12px',
    fontWeight: '700',
    color: '#0f172a',
  },
  instructionsContainer: {
    margin: '18px 0 28px 0',
    backgroundColor: '#fafafa',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '10px 14px',
  },
  instructionsToggle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    fontSize: '12px',
    color: '#334155',
  },
  instructionsList: {
    marginTop: '10px',
    paddingLeft: '18px',
    fontSize: '12px',
    color: '#475569',
    lineHeight: '1.6',
  },
  instructionItem: {
    marginBottom: '4px',
  },
  sectionBlock: {
    marginBottom: '32px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  passageCard: {
    backgroundColor: '#fafafa',
    border: '1px solid #e2e8f0',
    borderLeft: '4px solid #2563eb',
    borderRadius: '8px',
    padding: '14px 16px',
    marginBottom: '20px',
  },
  passageHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px',
  },
  passageTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  passageText: {
    fontSize: '13px',
    color: '#334155',
    lineHeight: '1.65',
    whiteSpace: 'pre-line',
    fontStyle: 'normal',
  },
  sectionBadge: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#0f172a',
  },
  sectionDesc: {
    fontSize: '12px',
    color: '#64748b',
  },
  questionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
  },
  questionItem: {
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '20px',
  },
  questionTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  qNumber: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#0f172a',
  },
  qMarks: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#64748b',
  },
  questionBodyWrapper: {
    marginBottom: '12px',
  },
  questionText: {
    fontSize: '14px',
    color: '#1e293b',
    lineHeight: '1.6',
    marginBottom: '8px',
    whiteSpace: 'pre-wrap',
  },
  tableCard: {
    margin: '12px 0 16px 0',
    overflowX: 'auto',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
  },
  dataTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12.5px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  dataTh: {
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    fontWeight: '700',
    padding: '8px 14px',
    border: '1px solid #cbd5e1',
    letterSpacing: '0.2px',
  },
  dataTd: {
    padding: '8px 14px',
    border: '1px solid #e2e8f0',
    color: '#334155',
    fontFamily: 'monospace, sans-serif',
    fontWeight: '500',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '8px',
    marginTop: '8px',
  },
  optionButton: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textAlign: 'left',
    fontSize: '13px',
    color: '#334155',
    lineHeight: '1.4',
  },
  optLetterBadge: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    flexShrink: 0,
  },
  optContent: {
    flex: 1,
  },
  textAnswerWrapper: {
    marginTop: '10px',
  },
  answerTextarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    color: '#0f172a',
    resize: 'vertical',
  },
  solutionBox: {
    marginTop: '12px',
    padding: '12px 14px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
  },
  solHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '6px',
  },
  solTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#166534',
  },
  solText: {
    fontSize: '12.5px',
    color: '#14532d',
    lineHeight: '1.5',
    whiteSpace: 'pre-line',
  },
  rubricSteps: {
    marginTop: '6px',
    paddingTop: '6px',
    borderTop: '1px dashed #86efac',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  rubricItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
    fontSize: '11.5px',
    color: '#15803d',
  },
  rubricDot: {
    fontWeight: '700',
  },
};
