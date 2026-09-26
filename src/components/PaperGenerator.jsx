import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ArrowRight, Search, FileText } from 'lucide-react';
import { POPULAR_TOPICS } from '../data/examCatalog';

export default function PaperGenerator({ profile, onGenerate, isGenerating }) {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(20);
  const [difficulty, setDifficulty] = useState('Standard');
  const [showOptions, setShowOptions] = useState(false);

  // Suggested topics based on stream
  const suggestedTopics = POPULAR_TOPICS[profile?.stream] || POPULAR_TOPICS.general;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({ topic: topic.trim(), questionCount, difficulty });
  };

  const handleSelectChip = (suggested) => {
    setTopic(suggested);
  };

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
            placeholder="Enter any chapter or topic (e.g. Thermodynamics, Calculus, Organic Aldehydes)..."
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
        </div>

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
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '860px',
    margin: '0 auto',
    padding: '36px 20px 24px 20px',
  },
  heroBox: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  heroTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.7px',
    marginBottom: '6px',
  },
  heroSub: {
    fontSize: '14px',
    color: '#64748b',
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
  },
  optionsToggle: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  optionsDrawer: {
    display: 'flex',
    gap: '24px',
    padding: '16px',
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
    transition: 'all 0.15s ease',
  },
};
