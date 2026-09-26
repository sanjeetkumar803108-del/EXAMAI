import React, { useState, useEffect } from 'react';
import { COUNTRIES, GRADES_BY_COUNTRY, STREAMS, TARGET_EXAMS_BY_COUNTRY } from '../data/examCatalog';
import { fetchCountryEducationSystem } from '../services/aiGenerator';
import {
  User,
  Globe,
  GraduationCap,
  BookOpen,
  Target,
  CheckCircle2,
  Plus,
  Loader2,
  Save,
  X,
  Sparkles,
  Check,
} from 'lucide-react';

export default function ProfileModal({ initialProfile, onSave, isMandatory = false }) {
  // Load custom country catalogs stored in localStorage
  const [customCatalogs, setCustomCatalogs] = useState(() => {
    try {
      const saved = localStorage.getItem('examai_custom_catalogs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [name, setName] = useState(initialProfile?.name || 'Aryan Sharma');
  const [country, setCountry] = useState(initialProfile?.country || 'in');
  const [grade, setGrade] = useState(initialProfile?.grade || 'Class 12 (Sr. Secondary)');
  const [stream, setStream] = useState(initialProfile?.stream || 'science_pcm');
  const [targetExam, setTargetExam] = useState(initialProfile?.targetExam || 'CBSE Board (Class 12)');

  // Custom Country Addition State
  const [isAddingCountry, setIsAddingCountry] = useState(false);
  const [newCountryName, setNewCountryName] = useState('');
  const [isFetchingCurriculum, setIsFetchingCurriculum] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [fetchSuccess, setFetchSuccess] = useState('');

  // Handle Country switch and update default grade/streams/exams
  const handleCountryChange = (newCountryId) => {
    setCountry(newCountryId);
    setFetchError('');
    setFetchSuccess('');

    if (customCatalogs[newCountryId]) {
      const customData = customCatalogs[newCountryId];
      if (customData.grades && customData.grades.length > 0) {
        setGrade(customData.grades[0]);
      }
      if (customData.streams && customData.streams.length > 0) {
        const firstStream = typeof customData.streams[0] === 'object'
          ? (customData.streams[0].id || customData.streams[0].name)
          : customData.streams[0];
        setStream(firstStream);
      }
      if (customData.targetExams && customData.targetExams.length > 0) {
        const firstExam = typeof customData.targetExams[0] === 'object'
          ? customData.targetExams[0].name
          : customData.targetExams[0];
        setTargetExam(firstExam);
      }
    } else {
      const availableGrades = GRADES_BY_COUNTRY[newCountryId] || GRADES_BY_COUNTRY.in || [];
      setGrade(availableGrades[0] || 'Secondary Level');
      const availableExams = TARGET_EXAMS_BY_COUNTRY[newCountryId] || TARGET_EXAMS_BY_COUNTRY.in || [];
      setTargetExam(availableExams[0]?.name || 'Standardized Board Exam');
      setStream('science_pcm');
    }
  };

  // Delete a custom added country
  const handleDeleteCustomCountry = (e, countryIdToDelete) => {
    e.stopPropagation();
    const updated = { ...customCatalogs };
    delete updated[countryIdToDelete];
    setCustomCatalogs(updated);
    localStorage.setItem('examai_custom_catalogs', JSON.stringify(updated));

    if (country === countryIdToDelete) {
      handleCountryChange('in');
    }
    setFetchSuccess('');
    setFetchError('');
  };

  // Live Online Research for Custom Country with Typo-Correction & Real Geography Validation
  const handleSaveNewCountry = async (e) => {
    if (e) e.preventDefault();
    const query = newCountryName.trim();
    if (!query || isFetchingCurriculum) return;

    setIsFetchingCurriculum(true);
    setFetchError('');
    setFetchSuccess('');

    try {
      const result = await fetchCountryEducationSystem(query);
      if (!result || !result.id) {
        throw new Error('Could not parse education framework.');
      }

      // Store in custom catalogs state & localStorage
      const updatedCatalogs = {
        ...customCatalogs,
        [result.id]: result,
      };
      setCustomCatalogs(updatedCatalogs);
      localStorage.setItem('examai_custom_catalogs', JSON.stringify(updatedCatalogs));

      // Select the new country
      setCountry(result.id);

      // Immediately update all 3 dropdown boxes with fetched country options:
      if (result.grades && result.grades.length > 0) {
        setGrade(result.grades[0]);
      }
      if (result.streams && result.streams.length > 0) {
        const firstStream = typeof result.streams[0] === 'object'
          ? (result.streams[0].id || result.streams[0].name)
          : result.streams[0];
        setStream(firstStream);
      }
      if (result.targetExams && result.targetExams.length > 0) {
        const firstExam = typeof result.targetExams[0] === 'object'
          ? result.targetExams[0].name
          : result.targetExams[0];
        setTargetExam(firstExam);
      }

      setFetchSuccess(
        `✓ ${result.name} ${result.flag || ''} added! Auto-calibrated Grades, Streams, and ${result.targetExams?.length || 0} National Board Exams.`
      );
      setIsAddingCountry(false);
      setNewCountryName('');
    } catch (err) {
      console.error('Failed to fetch country education system:', err);
      setFetchError(err.message || 'Error fetching education system. Please check country name.');
    } finally {
      setIsFetchingCurriculum(false);
    }
  };

  // Final Form Submit: Launch ExamAI Workspace
  const handleSave = (e) => {
    e.preventDefault();

    const custom = customCatalogs[country];
    const standard = COUNTRIES.find((c) => c.id === country);
    const countryName = custom?.name || standard?.name || country;
    const countryFlag = custom?.flag || standard?.flag || '🌐';

    const updated = {
      name,
      country,
      countryName,
      countryFlag,
      grade,
      stream,
      targetExam,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem('examai_profile', JSON.stringify(updated));
    onSave(updated);
  };

  // Base preset countries without the static 'global' button
  const baseCountries = COUNTRIES.filter((c) => c.id !== 'global');
  const customList = Object.values(customCatalogs);
  const visibleCountries = [...baseCountries, ...customList];

  // Dynamic Options for the 3 Boxes
  const currentCustom = customCatalogs[country];

  const gradesList = currentCustom?.grades ||
                     GRADES_BY_COUNTRY[country] ||
                     GRADES_BY_COUNTRY.in ||
                     [];

  const streamsList = currentCustom?.streams || STREAMS;

  const examsList = currentCustom?.targetExams ||
                    TARGET_EXAMS_BY_COUNTRY[country] ||
                    TARGET_EXAMS_BY_COUNTRY.in ||
                    [];

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = getStyles(isMobile);

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal} className="animate-fade-in">
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.stepBadge}>
            <Target size={16} color="#0f172a" />
            <span>Academic Profile Calibration</span>
          </div>
          <h2 style={styles.title}>Configure Your Examination Profile</h2>
          <p style={styles.subtitle}>
            ExamAI uses these parameters for live syllabus grounding and exact question pattern blueprints.
          </p>
        </div>

        <form onSubmit={handleSave} style={styles.form}>
          {/* Full Name */}
          <div style={styles.field}>
            <label style={styles.label}>
              <User size={14} color="#64748b" />
              <span>Student / Candidate Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aryan Sharma"
              style={styles.input}
              required
            />
          </div>

          {/* Country Selection Header with Corner Save Button */}
          <div style={styles.field}>
            <div style={styles.countryHeaderRow}>
              <label style={styles.label}>
                <Globe size={14} color="#64748b" />
                <span>Country / Educational Jurisdiction</span>
              </label>

              {/* Corner Actions / Corner Save Button */}
              {isAddingCountry ? (
                <div style={styles.cornerActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingCountry(false);
                      setNewCountryName('');
                      setFetchError('');
                    }}
                    style={styles.cancelSmallBtn}
                    disabled={isFetchingCurriculum}
                  >
                    Cancel
                  </button>
                  {newCountryName.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={handleSaveNewCountry}
                      disabled={isFetchingCurriculum}
                      style={styles.cornerSaveBtn}
                      title="Save & Research Country Curriculum"
                    >
                      {isFetchingCurriculum ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Save size={13} />
                          <span>Save Country</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              ) : null}
            </div>

            {/* Country Cards Grid */}
            <div style={styles.countryGrid}>
              {visibleCountries.map((c) => {
                const isCustom = Boolean(customCatalogs[c.id]);
                const isSelected = country === c.id;

                return (
                  <div
                    key={c.id}
                    style={{
                      ...styles.countryCardWrapper,
                      borderColor: isSelected ? '#0f172a' : '#e2e8f0',
                      backgroundColor: isSelected ? '#f8fafc' : '#ffffff',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleCountryChange(c.id)}
                      style={{
                        ...styles.countryCardBtn,
                        fontWeight: isSelected ? '700' : '500',
                      }}
                      title={c.name}
                    >
                      <span style={styles.flagText}>{c.flag || c.countryCode || '🌍'}</span>
                      <span style={styles.countryName}>{c.name}</span>
                    </button>

                    {/* Quick remove button for custom-added entries */}
                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteCustomCountry(e, c.id)}
                        style={styles.deleteCountryBtn}
                        title={`Remove ${c.name} from list`}
                      >
                        <X size={12} color="#94a3b8" />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Interactive "+ Add Country" Button (Replacing International / IB) */}
              {!isAddingCountry && (
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCountry(true);
                    setFetchError('');
                    setFetchSuccess('');
                  }}
                  style={styles.addCountryCard}
                  title="Add any real country or state — AI will auto-correct typos & fetch authentic curriculum"
                >
                  <div style={styles.addIconCircle}>
                    <Plus size={15} color="#2563eb" />
                  </div>
                  <span style={styles.addCountryText}>+ Add Country</span>
                </button>
              )}
            </div>

            {/* Custom Country Input Box with Smart Auto-Correction & State support */}
            {isAddingCountry && (
              <div style={styles.addCountryBox} className="animate-fade-in">
                <div style={styles.addInputRow}>
                  <span style={{ fontSize: '18px' }}>🌍</span>
                  <input
                    type="text"
                    value={newCountryName}
                    onChange={(e) => setNewCountryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSaveNewCountry();
                      }
                    }}
                    placeholder="Type real country or state (e.g. Germany, Japan, California, Bihar)..."
                    style={styles.addInput}
                    autoFocus
                    disabled={isFetchingCurriculum}
                  />

                  {newCountryName.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={handleSaveNewCountry}
                      disabled={isFetchingCurriculum}
                      style={styles.inlineSaveBtn}
                      title="Save & Research Country"
                    >
                      {isFetchingCurriculum ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Save size={13} />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingCountry(false);
                      setNewCountryName('');
                      setFetchError('');
                    }}
                    style={styles.inlineCloseBtn}
                    disabled={isFetchingCurriculum}
                    title="Cancel"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div style={styles.addInputHint}>
                  <Sparkles size={13} color="#2563eb" />
                  <span>
                    Smart AI Geo-Validation: Auto-corrects spelling typos (e.g. <em>Jpan &rarr; Japan</em>, <em>Grmany &rarr; Germany</em>) & accepts recognized states (e.g. <em>Bihar &rarr; Bihar (India)</em>).
                  </span>
                </div>
              </div>
            )}

            {/* Processing / Loading State */}
            {isFetchingCurriculum && (
              <div style={styles.processingBanner} className="animate-pulse">
                <Loader2 size={18} className="animate-spin" color="#2563eb" />
                <div style={{ flex: 1 }}>
                  <div style={styles.processingTitle}>
                    Validating & Researching "{newCountryName}" Curriculum...
                  </div>
                  <div style={styles.processingDesc}>
                    AI is verifying geographic legitimacy, fixing typos, and fetching official national/state examination boards.
                  </div>
                </div>
              </div>
            )}

            {/* Success Banner */}
            {fetchSuccess && (
              <div style={styles.successBanner} className="animate-fade-in">
                <Check size={16} color="#16a34a" />
                <span>{fetchSuccess}</span>
              </div>
            )}

            {/* Error Banner */}
            {fetchError && (
              <div style={styles.errorBanner} className="animate-fade-in">
                <X size={16} color="#dc2626" />
                <span>{fetchError}</span>
              </div>
            )}
          </div>

          {/* Two-Column Grid for Box 1 (Grade) & Box 2 (Stream) */}
          <div style={styles.row}>
            {/* Box 1: Grade / Academic Level */}
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>
                <GraduationCap size={14} color="#64748b" />
                <span>Grade / Academic Level</span>
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                style={styles.select}
              >
                {gradesList.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Box 2: Stream / Subject Focus */}
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>
                <BookOpen size={14} color="#64748b" />
                <span>Stream / Subject Focus</span>
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                style={styles.select}
              >
                {streamsList.map((s) => {
                  const val = typeof s === 'object' ? (s.id || s.name) : s;
                  const label = typeof s === 'object' ? s.name : s;
                  return (
                    <option key={val} value={val}>{label}</option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Box 3: Target Standardized Examination */}
          <div style={styles.field}>
            <label style={styles.label}>
              <Target size={14} color="#64748b" />
              <span>Target Standardized Examination</span>
            </label>
            <select
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              style={{ ...styles.select, fontWeight: '600', color: '#0f172a' }}
            >
              {examsList.map((ex) => {
                const val = typeof ex === 'object' ? ex.name : ex;
                const authority = ex.authority ? ` — (${ex.authority})` : '';
                return (
                  <option key={typeof ex === 'object' ? (ex.id || ex.name) : ex} value={val}>
                    {val}{authority}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Final Submit Button */}
          <button type="submit" style={styles.submitBtn}>
            <CheckCircle2 size={18} />
            <span>Launch ExamAI Workspace</span>
          </button>
        </form>
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
    maxWidth: '580px',
    backgroundColor: '#ffffff',
    borderRadius: isMobile ? '16px' : '20px',
    border: '1px solid #e2e8f0',
    padding: isMobile ? '18px 14px' : '28px 28px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
    maxHeight: isMobile ? '95vh' : '92vh',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '20px',
  },
  stepBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: '#f1f5f9',
    fontSize: '12px',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '10px',
  },
  title: {
    fontSize: '21px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.4px',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#64748b',
    lineHeight: '1.45',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#334155',
  },
  countryHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '26px',
  },
  cornerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  cornerSaveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '6px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    fontSize: '11.5px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.25)',
    transition: 'all 0.15s ease',
  },
  cancelSmallBtn: {
    padding: '4px 8px',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #cbd5e1',
    fontSize: '11.5px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '9px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13.5px',
    color: '#0f172a',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '9px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    color: '#334155',
    outline: 'none',
  },
  row: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '12px' : '14px',
  },
  countryGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(95px, 1fr))' : 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: isMobile ? '6px' : '8px',
  },
  countryCardWrapper: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    border: '1.5px solid #e2e8f0',
    backgroundColor: '#ffffff',
    position: 'relative',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    overflow: 'hidden',
  },
  countryCardBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 8px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '12px',
    color: '#1e293b',
    cursor: 'pointer',
    textAlign: 'left',
    flex: 1,
    minWidth: 0,
  },
  flagText: {
    fontSize: '14px',
    fontWeight: '700',
    flexShrink: 0,
  },
  countryName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  deleteCountryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    padding: 0,
    marginRight: '4px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background-color 0.15s ease',
  },
  addCountryCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1.5px dashed #3b82f6',
    backgroundColor: '#f0f7ff',
    color: '#1d4ed8',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  addIconCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#dbeafe',
  },
  addCountryText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  addCountryBox: {
    marginTop: '8px',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1.5px solid #93c5fd',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  addInputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  addInput: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '7px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    color: '#0f172a',
    outline: 'none',
  },
  inlineSaveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 14px',
    borderRadius: '7px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    fontSize: '12.5px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.25)',
  },
  inlineCloseBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    borderRadius: '7px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#64748b',
    cursor: 'pointer',
  },
  addInputHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#475569',
    lineHeight: '1.4',
  },
  processingBanner: {
    marginTop: '8px',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #bfdbfe',
    backgroundColor: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  processingTitle: {
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#1e40af',
  },
  processingDesc: {
    fontSize: '11.5px',
    color: '#3b82f6',
    marginTop: '2px',
  },
  successBanner: {
    marginTop: '8px',
    padding: '10px 14px',
    borderRadius: '9px',
    border: '1px solid #bbf7d0',
    backgroundColor: '#f0fdf4',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#166534',
  },
  errorBanner: {
    marginTop: '8px',
    padding: '10px 14px',
    borderRadius: '9px',
    border: '1px solid #fecaca',
    backgroundColor: '#fef2f2',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#991b1b',
  },
  submitBtn: {
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: isMobile ? '14px 16px' : '13px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '10px',
    fontSize: isMobile ? '14.5px' : '14px',
    fontWeight: '700',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
    transition: 'background-color 0.15s ease',
  },
});
