import React, { useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, Search, Globe, Layers, CheckCircle2 } from 'lucide-react';
import { COUNTRIES, COUNTRY_QUESTION_STYLES, POPULAR_TOPICS } from '../data/examCatalog';

export default function PaperGenerator({ profile, onGenerate, isGenerating }) {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(20);
  const [difficulty, setDifficulty] = useState('Standard');
  const [showOptions, setShowOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cascading Country & Question Typology selection state
  const [selectedCountry, setSelectedCountry] = useState(profile?.country || 'in');
  const [selectedStyle, setSelectedStyle] = useState(() => {
    const countryStyles = COUNTRY_QUESTION_STYLES[profile?.country || 'in'] || COUNTRY_QUESTION_STYLES.in;
    return countryStyles[0]?.id || 'mixed';
  });

  // Sync with profile country if profile updates
  useEffect(() => {
    if (profile?.country && profile.country !== selectedCountry) {
      setSelectedCountry(profile.country);
      const newStyles = COUNTRY_QUESTION_STYLES[profile.country] || COUNTRY_QUESTION_STYLES.global;
      setSelectedStyle(newStyles[0]?.id || 'mixed');
    }
  }, [profile?.country]);

  // Suggested topics based on stream
  const suggestedTopics = POPULAR_TOPICS[profile?.stream] || POPULAR_TOPICS.general;

  // Active country and styles
  const activeCountryObj = COUNTRIES.find((c) => c.id === selectedCountry) || COUNTRIES[0];
  const currentCountryStyles = COUNTRY_QUESTION_STYLES[selectedCountry] || COUNTRY_QUESTION_STYLES.global || [];
  const activeStyleObj = currentCountryStyles.find((s) => s.id === selectedStyle) || currentCountryStyles[0];

  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);
    const availableStyles = COUNTRY_QUESTION_STYLES[countryId] || COUNTRY_QUESTION_STYLES.global;
    if (availableStyles && availableStyles.length > 0) {
      setSelectedStyle(availableStyles[0].id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({
      topic: topic.trim(),
      questionCount,
      difficulty,
      country: selectedCountry,
      questionStyle: selectedStyle,
    });
  };

  const handleSelectChip = (suggested) => {
    setTopic(suggested);
  };

  const styles = getStyles(isMobile);

  return (
    <div style={styles.container}>
      {/* Clean Minimalist Hero */}
      <div style={styles.heroBox}>
        <h1 style={styles.heroTitle}>Generate Official Sample Paper</h1>
        <p style={styles.heroSub}>
          Real-time syllabus grounding & standardized exam pattern for{' '}
          <strong style={{ color: '#0f172a' }}>{profile?.targetExam || 'Your Exam'}</strong>
        </p>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} style={styles.formBox}>
        <div style={styles.inputWrapper}>
          <Search size={18} color="#94a3b8" style={styles.searchIcon} />
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={isMobile ? "Enter topic (e.g. Thermodynamics, Calculus)..." : "Enter any chapter or topic (e.g. Thermodynamics, Calculus, Organic Aldehydes)..."}
            style={styles.mainInput}
            autoFocus
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
              <span>{isGenerating ? 'Synthesizing...' : 'Generate Paper'}</span>
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
            <span>{isGenerating ? 'Synthesizing Official Paper...' : 'Generate Official Paper'}</span>
          </button>
        )}

        {/* Collapsible Options Drawer */}
        {showOptions && (
          <div style={styles.optionsDrawer} className="animate-fade-in">
            <div style={styles.optionCol}>
              <label style={styles.optionLabel}>Question Count</label>
              <div style={styles.pillGroup}>
                {[15, 20, 30].map((num) => (
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
                    {num} Questions
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.optionCol}>
              <label style={styles.optionLabel}>Cognitive Difficulty</label>
              <div style={styles.pillGroup}>
                {['Standard', 'Challenging (Top 1% Percentile)'].map((diff) => (
                  <button
                    type="button"
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    style={{
                      ...styles.pillBtn,
                      backgroundColor: difficulty === diff ? '#0f172a' : '#ffffff',
                      color: difficulty === diff ? '#ffffff' : '#475569',
                      borderColor: difficulty === diff ? '#0f172a' : '#e2e8f0',
                    }}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Suggested Quick Chips */}
        <div style={styles.chipsContainer}>
          <span style={styles.chipsLabel}>Suggested Chapters:</span>
          <div style={styles.chipsRow}>
            {suggestedTopics.slice(0, 5).map((t, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handleSelectChip(t)}
                style={styles.chip}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Country & National Exam Typology Selector (Cascading Dropdowns / Grid) */}
        <div style={styles.typologySection}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitleRow}>
              <div style={styles.sectionIconWrap}>
                <Globe size={16} color="#2563eb" />
              </div>
              <h2 style={styles.sectionTitle}>
                National Exam Framework & Question Typology
              </h2>
            </div>
            <p style={styles.sectionSub}>
              Select target country to auto-configure authentic national exam patterns, cognitive question styles, and marking rubrics.
            </p>
          </div>

          {/* Step 1: Select Country / Board */}
          <div style={styles.countryPickerWrap}>
            <div style={styles.stepIndicatorRow}>
              <span style={styles.stepBadge}>Step 1</span>
              <span style={styles.countryLabel}>Select Country / Board Framework:</span>
            </div>
            <div style={styles.countryPillsRow}>
              {COUNTRIES.map((c) => {
                const isSelected = selectedCountry === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => handleCountryChange(c.id)}
                    style={{
                      ...styles.countryPill,
                      backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#334155',
                      borderColor: isSelected ? '#0f172a' : '#e2e8f0',
                      boxShadow: isSelected ? '0 2px 8px rgba(15, 23, 42, 0.15)' : 'none',
                    }}
                  >
                    <span style={styles.flagIcon}>{c.flag}</span>
                    <span style={{ fontWeight: isSelected ? '700' : '500' }}>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Question Style (Dynamic List based on Selected Country) */}
          <div style={styles.stylesGridWrap}>
            <div style={styles.styleGridHeader}>
              <div style={styles.styleGridTitleRow}>
                <span style={styles.stepBadge}>Step 2</span>
                <Layers size={15} color="#2563eb" />
                <span style={styles.styleGridTitle}>
                  Select Authentic Question Style ({activeCountryObj?.name}):
                </span>
              </div>
              <span style={styles.activeStyleCounter}>
                {currentCountryStyles.length} Authentic Formats
              </span>
            </div>

            <div style={styles.stylesGrid}>
              {currentCountryStyles.map((styleItem) => {
                const isItemActive = selectedStyle === styleItem.id;
                return (
                  <button
                    type="button"
                    key={styleItem.id}
                    onClick={() => setSelectedStyle(styleItem.id)}
                    style={{
                      ...styles.styleCard,
                      borderColor: isItemActive ? '#2563eb' : '#e2e8f0',
                      backgroundColor: isItemActive ? '#f8faff' : '#ffffff',
                      boxShadow: isItemActive
                        ? '0 4px 14px rgba(37, 99, 235, 0.09), 0 0 0 2px #2563eb'
                        : '0 1px 3px rgba(0, 0, 0, 0.02)',
                    }}
                  >
                    <div style={styles.cardTopRow}>
                      <span
                        style={{
                          ...styles.styleBadge,
                          backgroundColor: isItemActive ? '#eff6ff' : '#f1f5f9',
                          color: isItemActive ? '#2563eb' : '#475569',
                          borderColor: isItemActive ? '#bfdbfe' : '#e2e8f0',
                        }}
                      >
                        {styleItem.badge}
                      </span>
                      <div
                        style={{
                          ...styles.checkCircle,
                          backgroundColor: isItemActive ? '#2563eb' : '#f8fafc',
                          borderColor: isItemActive ? '#2563eb' : '#cbd5e1',
                        }}
                      >
                        {isItemActive && <CheckCircle2 size={12} color="#ffffff" />}
                      </div>
                    </div>

                    <div style={styles.cardContent}>
                      <h4
                        style={{
                          ...styles.cardTitle,
                          color: isItemActive ? '#1e3a8a' : '#0f172a',
                        }}
                      >
                        {styleItem.label}
                      </h4>
                      <p style={styles.cardDesc}>{styleItem.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Blueprint Grounding Strip */}
          <div style={styles.activeSummaryBanner}>
            <span style={styles.activeSummaryIcon}>⚡</span>
            <div style={styles.activeSummaryText}>
              <span style={{ color: '#64748b' }}>Live Grounding Active: </span>
              <strong>{activeCountryObj?.flag} {activeCountryObj?.name}</strong>
              <span style={{ margin: '0 6px', color: '#94a3b8' }}>•</span>
              <span style={{ color: '#2563eb', fontWeight: '700' }}>
                {activeStyleObj?.label || 'Standard Mixed'}
              </span>
              <span style={{ color: '#64748b', fontSize: '12px', marginLeft: '6px' }}>
                — {activeStyleObj?.desc}
              </span>
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
    maxWidth: '860px',
    margin: '0 auto',
    padding: isMobile ? '16px 12px 36px 12px' : '36px 20px 24px 20px',
    boxSizing: 'border-box',
  },
  heroBox: {
    textAlign: 'center',
    marginBottom: isMobile ? '18px' : '28px',
  },
  heroTitle: {
    fontSize: isMobile ? '22px' : '28px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.6px',
    marginBottom: '6px',
  },
  heroSub: {
    fontSize: isMobile ? '13px' : '14px',
    color: '#64748b',
    lineHeight: 1.4,
  },
  formBox: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 10px',
    backgroundColor: '#ffffff',
    border: '1.5px solid #cbd5e1',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    transition: 'border-color 0.2s ease',
  },
  searchIcon: {
    marginLeft: '6px',
  },
  mainInput: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '15px',
    color: '#0f172a',
    padding: '8px 4px',
    outline: 'none',
  },
  optionsToggle: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  generateBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '9px',
    fontSize: '13.5px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  generateBtnMobile: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '13px 18px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    marginTop: '10px',
    border: 'none',
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
    cursor: 'pointer',
  },
  optionsDrawer: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '14px' : '24px',
    padding: isMobile ? '14px' : '16px',
    marginTop: '12px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  optionCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  optionLabel: {
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  pillGroup: {
    display: 'flex',
    gap: '8px',
  },
  pillBtn: {
    padding: '5px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
  },
  chipsContainer: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    flexWrap: 'wrap',
  },
  chipsLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#94a3b8',
    paddingTop: '4px',
  },
  chipsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  chip: {
    padding: '5px 10px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#334155',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  // Typology Cascading Selector Section
  typologySection: {
    marginTop: isMobile ? '18px' : '28px',
    padding: isMobile ? '14px 12px' : '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
  },
  sectionHeader: {
    marginBottom: '16px',
  },
  sectionTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  sectionIconWrap: {
    width: '26px',
    height: '26px',
    borderRadius: '7px',
    backgroundColor: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  sectionSub: {
    fontSize: '12.5px',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.4',
  },
  stepIndicatorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px',
  },
  stepBadge: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '4px',
    padding: '1px 6px',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  countryPickerWrap: {
    marginBottom: '20px',
  },
  countryLabel: {
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#334155',
  },
  countryPillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '6px',
  },
  countryPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '12.5px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  flagIcon: {
    fontSize: '14px',
  },
  stylesGridWrap: {
    marginBottom: '16px',
  },
  styleGridHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  styleGridTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  styleGridTitle: {
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#334155',
  },
  activeStyleCounter: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: '500',
  },
  stylesGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '10px',
  },
  styleCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1.5px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    backgroundColor: '#ffffff',
  },
  cardTopRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '6px',
  },
  styleBadge: {
    fontSize: '10.5px',
    fontWeight: '700',
    padding: '2px 7px',
    borderRadius: '5px',
    border: '1px solid #e2e8f0',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  checkCircle: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: '1.5px solid #cbd5e1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    width: '100%',
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: '700',
    margin: '0 0 3px 0',
    lineHeight: '1.3',
  },
  cardDesc: {
    fontSize: '11.5px',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.4',
  },
  activeSummaryBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: '#f8faff',
    border: '1px solid #dbeafe',
    borderRadius: '10px',
    fontSize: '12px',
  },
  activeSummaryIcon: {
    fontSize: '14px',
  },
  activeSummaryText: {
    color: '#1e3a8a',
    lineHeight: '1.4',
  },
});
