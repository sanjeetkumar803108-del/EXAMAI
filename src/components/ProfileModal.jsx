import React, { useState } from 'react';
import { COUNTRIES, GRADES_BY_COUNTRY, STREAMS, TARGET_EXAMS_BY_COUNTRY } from '../data/examCatalog';
import { User, Globe, GraduationCap, BookOpen, Target, CheckCircle2 } from 'lucide-react';

export default function ProfileModal({ initialProfile, onSave, isMandatory = false }) {
  const [name, setName] = useState(initialProfile?.name || 'Aryan Sharma');
  const [country, setCountry] = useState(initialProfile?.country || 'in');
  const [grade, setGrade] = useState(initialProfile?.grade || 'Class 12 (Sr. Secondary)');
  const [stream, setStream] = useState(initialProfile?.stream || 'science_pcm');
  const [targetExam, setTargetExam] = useState(initialProfile?.targetExam || 'CBSE Board (Class 12)');

  // Handle Country switch and update default grade/exams
  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    const availableGrades = GRADES_BY_COUNTRY[newCountry] || GRADES_BY_COUNTRY.global;
    setGrade(availableGrades[0]);
    const availableExams = TARGET_EXAMS_BY_COUNTRY[newCountry] || TARGET_EXAMS_BY_COUNTRY.global;
    setTargetExam(availableExams[0]?.name || 'Standardized Exam');
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      name,
      country,
      grade,
      stream,
      targetExam,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem('examai_profile', JSON.stringify(updated));
    onSave(updated);
  };

  const selectedCountryObj = COUNTRIES.find((c) => c.id === country) || COUNTRIES[0];
  const gradesList = GRADES_BY_COUNTRY[country] || GRADES_BY_COUNTRY.global;
  const examsList = TARGET_EXAMS_BY_COUNTRY[country] || TARGET_EXAMS_BY_COUNTRY.global;

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

          {/* Country Selection */}
          <div style={styles.field}>
            <label style={styles.label}>
              <Globe size={14} color="#64748b" />
              <span>Country / Educational Jurisdiction</span>
            </label>
            <div style={styles.countryGrid}>
              {COUNTRIES.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => handleCountryChange(c.id)}
                  style={{
                    ...styles.countryCard,
                    borderColor: country === c.id ? '#0f172a' : '#e2e8f0',
                    backgroundColor: country === c.id ? '#f8fafc' : '#ffffff',
                    fontWeight: country === c.id ? '700' : '500',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{c.flag}</span>
                  <span style={styles.countryName}>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Two-Column Grid for Grade & Stream */}
          <div style={styles.row}>
            {/* Grade */}
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

            {/* Stream */}
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
                {STREAMS.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Target Exam Selection */}
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
              {examsList.map((ex) => (
                <option key={ex.id} value={ex.name}>
                  {ex.name} — ({ex.authority})
                </option>
              ))}
            </select>
          </div>

          {/* Save Button */}
          <button type="submit" style={styles.submitBtn}>
            <CheckCircle2 size={18} />
            <span>Launch ExamAI Workspace</span>
          </button>
        </form>
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
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '16px',
  },
  modal: {
    width: '100%',
    maxWidth: '560px',
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    border: '1px solid #e2e8f0',
    padding: '28px 28px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  header: {
    marginBottom: '22px',
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
    fontSize: '20px',
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
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '9px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13.5px',
    color: '#0f172a',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '9px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    color: '#334155',
  },
  row: {
    display: 'flex',
    gap: '14px',
  },
  countryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
    gap: '8px',
  },
  countryCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1.5px solid #e2e8f0',
    fontSize: '12px',
    color: '#1e293b',
    cursor: 'pointer',
    textAlign: 'left',
  },
  countryName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  submitBtn: {
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
  },
};
