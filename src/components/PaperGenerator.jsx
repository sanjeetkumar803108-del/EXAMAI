import React, { useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, Search, BookOpen, Layers, CheckCircle2, Calculator, Award } from 'lucide-react';
import { AP_SUBJECTS, QUESTION_TYPES, UNITS_AB, UNITS_BC, POPULAR_CALC_TOPICS } from '../data/examCatalog';

export default function PaperGenerator({ onGenerate, isGenerating }) {
  const [selectedSubject, setSelectedSubject] = useState('ap_calc_ab'); // 'ap_calc_ab' | 'ap_calc_bc'
  const [selectedQuestionType, setSelectedQuestionType] = useState('mcq'); // Strictly 'mcq' | 'frq'
  const [topic, setTopic] = useState('Unit 4: Contextual Applications of Differentiation');
  const [questionCount, setQuestionCount] = useState(15);
  const [difficulty, setDifficulty] = useState('Standard');
  const [showOptions, setShowOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update default question count when switching between MCQ and FRQ
  const handleQuestionTypeChange = (typeId) => {
    setSelectedQuestionType(typeId);
    if (typeId === 'frq') {
      setQuestionCount(2); // 2 FRQs default (18 pts)
    } else {
      setQuestionCount(15); // 15 MCQs default
    }
  };

  // Switch between AP Calculus AB and BC
  const handleSubjectChange = (subjectId) => {
    setSelectedSubject(subjectId);
    if (subjectId === 'ap_calc_bc' && topic.includes('AB')) {
      setTopic('Unit 10: Infinite Sequences & Series');
    } else if (subjectId === 'ap_calc_ab' && (topic.includes('Unit 9') || topic.includes('Unit 10') || topic.includes('BC'))) {
      setTopic('Unit 4: Contextual Applications of Differentiation');
    }
  };

  const activeSubjectObj = AP_SUBJECTS.find((s) => s.id === selectedSubject) || AP_SUBJECTS[0];
  const activeUnits = selectedSubject === 'ap_calc_bc' ? UNITS_BC : UNITS_AB;
  const popularTopics = POPULAR_CALC_TOPICS[selectedSubject] || POPULAR_CALC_TOPICS.ap_calc_ab;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({
      subject: selectedSubject,
      questionType: selectedQuestionType,
      topic: topic.trim(),
      questionCount,
      difficulty,
      // Pass standard profile format for compatibility
      profile: {
        targetExam: activeSubjectObj.name,
        subject: activeSubjectObj.name,
        grade: 'AP Calculus Candidate (High School)',
        country: 'us',
      },
      questionStyle: selectedQuestionType,
    });
  };

  const styles = getStyles(isMobile);

  return (
    <div style={styles.container}>
      {/* College Board AP Calculus Hero */}
      <div style={styles.heroBox}>
        <div style={styles.heroBadgeRow}>
          <span style={styles.heroBadge}>
            <Award size={13} color="#2563eb" style={{ marginRight: '5px' }} />
            The College Board • Advanced Placement Program
          </span>
        </div>
        <h1 style={styles.heroTitle}>AP® Calculus Exam & Question Generator</h1>
        <p style={styles.heroSub}>
          Specialized exclusively for <strong style={{ color: '#0f172a' }}>AP Calculus AB & BC</strong>. Generate authentic College Board MCQs and official 9-point Free Response Questions (FRQs).
        </p>
      </div>

      {/* Main Search & Config Form */}
      <form onSubmit={handleSubmit} style={styles.formBox}>
        {/* Step 1: Select Subject (AP Calculus AB vs BC) */}
        <div style={styles.subjectSelectorWrap}>
          <div style={styles.stepHeader}>
            <span style={styles.stepNumberBadge}>1</span>
            <span style={styles.stepLabel}>Select AP Calculus Examination:</span>
          </div>
          <div style={styles.subjectCardsRow}>
            {AP_SUBJECTS.map((sub) => {
              const isSelected = selectedSubject === sub.id;
              return (
                <button
                  type="button"
                  key={sub.id}
                  onClick={() => handleSubjectChange(sub.id)}
                  style={{
                    ...styles.subjectCard,
                    backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    borderColor: isSelected ? '#0f172a' : '#e2e8f0',
                    boxShadow: isSelected ? '0 4px 14px rgba(15, 23, 42, 0.12)' : '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={styles.subjectCardTop}>
                    <span
                      style={{
                        ...styles.subjectCodeBadge,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : '#f1f5f9',
                        color: isSelected ? '#93c5fd' : '#2563eb',
                      }}
                    >
                      {sub.code}
                    </span>
                    {isSelected && <CheckCircle2 size={16} color="#60a5fa" />}
                  </div>
                  <h3 style={styles.subjectCardTitle}>{sub.name}</h3>
                  <p
                    style={{
                      ...styles.subjectCardDesc,
                      color: isSelected ? '#cbd5e1' : '#64748b',
                    }}
                  >
                    {sub.level} • {sub.totalUnits} Units (College Board CED)
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Question Typology (STRICTLY TWO OPTIONS: MCQ or FRQ) */}
        <div style={styles.typeSelectorWrap}>
          <div style={styles.stepHeader}>
            <span style={styles.stepNumberBadge}>2</span>
            <span style={styles.stepLabel}>Select Question Format (Strictly MCQ or FRQ):</span>
          </div>
          <div style={styles.typeCardsRow}>
            {QUESTION_TYPES.map((qt) => {
              const isSelected = selectedQuestionType === qt.id;
              return (
                <button
                  type="button"
                  key={qt.id}
                  onClick={() => handleQuestionTypeChange(qt.id)}
                  style={{
                    ...styles.typeCard,
                    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                    borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                    boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.1)' : '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={styles.typeCardTop}>
                    <div style={styles.typeCardTitleRow}>
                      <span
                        style={{
                          ...styles.typeBadge,
                          backgroundColor: isSelected ? '#2563eb' : '#f1f5f9',
                          color: isSelected ? '#ffffff' : '#334155',
                        }}
                      >
                        {qt.shortLabel}
                      </span>
                      <h4 style={{ ...styles.typeTitle, color: isSelected ? '#1e40af' : '#0f172a' }}>
                        {qt.label}
                      </h4>
                    </div>
                    <div
                      style={{
                        ...styles.radioIndicator,
                        borderColor: isSelected ? '#2563eb' : '#cbd5e1',
                        backgroundColor: isSelected ? '#2563eb' : 'transparent',
                      }}
                    >
                      {isSelected && <CheckCircle2 size={12} color="#ffffff" />}
                    </div>
                  </div>
                  <p style={styles.typeDesc}>{qt.desc}</p>
                  <div style={styles.typeMetaBadge}>
                    <span>{qt.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Enter Topic or Select College Board Unit */}
        <div style={styles.topicSectionWrap}>
          <div style={styles.stepHeader}>
            <span style={styles.stepNumberBadge}>3</span>
            <span style={styles.stepLabel}>Enter Topic or Select College Board CED Unit:</span>
          </div>

          <div style={styles.inputWrapper}>
            <Search size={18} color="#94a3b8" style={styles.searchIcon} />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={isMobile ? "Enter topic (e.g. Related Rates, Taylor Series)..." : "Enter calculus topic (e.g. Unit 4: Related Rates, Unit 6: FTC, Unit 10: Taylor Series)..."}
              style={styles.mainInput}
            />
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              style={{
                ...styles.optionsToggle,
                backgroundColor: showOptions ? '#f1f5f9' : '#ffffff',
              }}
              title="Configure Question Count & Difficulty"
            >
              <SlidersHorizontal size={15} color="#475569" />
            </button>
            {!isMobile && (
              <button
                type="submit"
                disabled={!topic.trim() || isGenerating}
                style={{
                  ...styles.generateBtn,
                  opacity: !topic.trim() || isGenerating ? 0.6 : 1,
                }}
              >
                <Sparkles size={16} />
                <span>{isGenerating ? 'Synthesizing...' : `Generate ${selectedQuestionType.toUpperCase()}`}</span>
              </button>
            )}
          </div>

          {isMobile && (
            <button
              type="submit"
              disabled={!topic.trim() || isGenerating}
              style={{
                ...styles.generateBtnMobile,
                opacity: !topic.trim() || isGenerating ? 0.6 : 1,
              }}
            >
              <Sparkles size={16} />
              <span>{isGenerating ? `Synthesizing ${activeSubjectObj.shortName} Paper...` : `Generate ${activeSubjectObj.shortName} ${selectedQuestionType.toUpperCase()}`}</span>
            </button>
          )}

          {/* Collapsible Options Drawer */}
          {showOptions && (
            <div style={styles.optionsDrawer} className="animate-fade-in">
              <div style={styles.optionCol}>
                <label style={styles.optionLabel}>
                  {selectedQuestionType === 'mcq' ? 'Number of Multiple Choice Questions' : 'Number of Free Response Questions (9 Pts Each)'}
                </label>
                <div style={styles.pillGroup}>
                  {(selectedQuestionType === 'mcq' ? [5, 10, 15, 20] : [1, 2, 3, 4]).map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      style={{
                        ...styles.pillBtn,
                        backgroundColor: questionCount === num ? '#0f172a' : '#ffffff',
                        color: questionCount === num ? '#ffffff' : '#475569',
                        borderColor: questionCount === num ? '#0f172a' : '#e2e8f0',
                      }}
                    >
                      {num} {selectedQuestionType.toUpperCase()}s
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.optionCol}>
                <label style={styles.optionLabel}>Target Exam Rigor</label>
                <div style={styles.pillGroup}>
                  {['Standard', 'Challenging (AP 5 Target)'].map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setDifficulty(lvl)}
                      style={{
                        ...styles.pillBtn,
                        backgroundColor: difficulty === lvl ? '#0f172a' : '#ffffff',
                        color: difficulty === lvl ? '#ffffff' : '#475569',
                        borderColor: difficulty === lvl ? '#0f172a' : '#e2e8f0',
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* College Board CED Unit Quick Selectors */}
          <div style={styles.unitsSection}>
            <span style={styles.unitsHeading}>
              <BookOpen size={13} color="#2563eb" style={{ marginRight: '6px' }} />
              Official {activeSubjectObj.name} Units (Click to set topic):
            </span>
            <div style={styles.unitsGrid}>
              {activeUnits.map((u) => {
                const isActive = topic.toLowerCase().includes(u.title.toLowerCase()) || topic === u.title;
                return (
                  <button
                    type="button"
                    key={u.id}
                    onClick={() => setTopic(u.title)}
                    style={{
                      ...styles.unitChip,
                      backgroundColor: isActive ? '#eff6ff' : '#f8fafc',
                      borderColor: isActive ? '#2563eb' : '#e2e8f0',
                      color: isActive ? '#1d4ed8' : '#334155',
                      fontWeight: isActive ? '700' : '500',
                    }}
                  >
                    <span style={styles.unitChipNum}>U{u.unitNumber}</span>
                    <span style={styles.unitChipTitle}>{u.title.replace(/^Unit \d+: /, '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Configuration Summary Strip */}
          <div style={styles.activeSummaryBanner}>
            <div style={styles.activeSummaryRow}>
              <span style={styles.activeTagBadge}>Active Subject:</span>
              <strong style={{ color: '#0f172a' }}>{activeSubjectObj.name}</strong>
              <span style={styles.dotSeparator}>•</span>
              <span style={styles.activeTagBadge}>Format:</span>
              <strong style={{ color: '#2563eb' }}>
                {selectedQuestionType === 'mcq' ? `${questionCount} Multiple Choice Questions (Section I)` : `${questionCount} Free Response Questions (Section II, ${questionCount * 9} Total Points)`}
              </strong>
              <span style={styles.dotSeparator}>•</span>
              <span style={{ color: '#64748b' }}>Rigor: {difficulty}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const getStyles = (isMobile) => ({
  container: {
    width: '100%',
    maxWidth: '920px',
    margin: '0 auto',
    padding: isMobile ? '16px 12px 36px 12px' : '36px 20px 24px 20px',
    boxSizing: 'border-box',
  },
  heroBox: {
    textAlign: 'center',
    marginBottom: isMobile ? '20px' : '28px',
  },
  heroBadgeRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '100px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1d4ed8',
  },
  heroTitle: {
    fontSize: isMobile ? '22px' : '30px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.6px',
    marginBottom: '8px',
    lineHeight: 1.25,
  },
  heroSub: {
    fontSize: isMobile ? '13px' : '14.5px',
    color: '#64748b',
    maxWidth: '640px',
    margin: '0 auto',
    lineHeight: 1.5,
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '18px' : '22px',
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
  },
  stepNumberBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '700',
  },
  stepLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },

  // Subject Selector
  subjectSelectorWrap: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: isMobile ? '14px' : '18px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  subjectCardsRow: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '12px',
  },
  subjectCard: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    padding: '16px',
    borderRadius: '12px',
    border: '1.5px solid',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
  },
  subjectCardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  subjectCodeBadge: {
    fontSize: '11px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '6px',
    letterSpacing: '0.5px',
  },
  subjectCardTitle: {
    fontSize: isMobile ? '16px' : '18px',
    fontWeight: '800',
    margin: '0 0 4px 0',
    letterSpacing: '-0.3px',
  },
  subjectCardDesc: {
    fontSize: '12px',
    margin: 0,
    lineHeight: 1.4,
  },

  // Question Type Selector (Strictly MCQ or FRQ)
  typeSelectorWrap: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: isMobile ? '14px' : '18px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  typeCardsRow: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '12px',
  },
  typeCard: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    padding: '16px',
    borderRadius: '12px',
    border: '1.5px solid',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
  },
  typeCardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  typeCardTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  typeBadge: {
    fontSize: '11px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  typeTitle: {
    fontSize: '15px',
    fontWeight: '700',
    margin: 0,
  },
  radioIndicator: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeDesc: {
    fontSize: '12px',
    color: '#475569',
    lineHeight: 1.45,
    margin: '0 0 10px 0',
  },
  typeMetaBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#2563eb',
    marginTop: 'auto',
  },

  // Topic Section
  topicSectionWrap: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: isMobile ? '14px' : '18px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '12px',
    padding: '4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
    boxSizing: 'border-box',
    marginBottom: '12px',
  },
  searchIcon: {
    marginLeft: '12px',
    flexShrink: 0,
  },
  mainInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: '12px 10px',
    fontSize: isMobile ? '13px' : '14.5px',
    color: '#0f172a',
    fontWeight: '500',
    boxSizing: 'border-box',
  },
  optionsToggle: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '8px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '6px',
    flexShrink: 0,
  },
  generateBtn: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9px',
    padding: '10px 18px',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.15)',
    flexShrink: 0,
  },
  generateBtnMobile: {
    width: '100%',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '13px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 3px 10px rgba(15, 23, 42, 0.15)',
    boxSizing: 'border-box',
    marginBottom: '12px',
  },

  // Options Drawer
  optionsDrawer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '14px',
    marginBottom: '14px',
  },
  optionCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  optionLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  pillGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  pillBtn: {
    padding: '5px 12px',
    borderRadius: '7px',
    border: '1px solid',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },

  // Units Grid
  unitsSection: {
    marginTop: '6px',
  },
  unitsHeading: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    marginBottom: '8px',
  },
  unitsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '14px',
  },
  unitChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.15s ease',
  },
  unitChipNum: {
    fontSize: '10.5px',
    fontWeight: '800',
    color: '#2563eb',
    backgroundColor: '#dbeafe',
    padding: '1px 5px',
    borderRadius: '4px',
  },
  unitChipTitle: {
    whiteSpace: 'nowrap',
  },

  // Summary Banner
  activeSummaryBanner: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '9px 12px',
    fontSize: '12px',
  },
  activeSummaryRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '6px',
  },
  activeTagBadge: {
    color: '#64748b',
    fontWeight: '500',
  },
  dotSeparator: {
    color: '#cbd5e1',
    margin: '0 2px',
  },
});
