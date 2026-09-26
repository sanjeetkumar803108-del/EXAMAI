import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import PaperGenerator from './components/PaperGenerator';
import LiveResearchModal from './components/LiveResearchModal';
import ExamPaperView from './components/ExamPaperView';
import AnswerEvaluationModal from './components/AnswerEvaluationModal';
import SubscriptionModal from './components/SubscriptionModal';
import { performLiveWebResearch, generateExamPaper, evaluateStudentAnswers } from './services/aiGenerator';

export default function App() {
  // Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('examai_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Profile state
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('examai_profile');
    return saved ? JSON.parse(saved) : null;
  });

  // App & Exam Paper states
  const [currentPaper, setCurrentPaper] = useState(() => {
    const saved = localStorage.getItem('examai_last_paper');
    return saved ? JSON.parse(saved) : null;
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [researchStep, setResearchStep] = useState('');
  const [activeResearchTopic, setActiveResearchTopic] = useState('');

  // Evaluation & Modals
  const [evaluationReport, setEvaluationReport] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Usage balance under $2.99 plan (30 tests / month limit)
  const [testsRemaining, setTestsRemaining] = useState(() => {
    const saved = localStorage.getItem('examai_tests_remaining');
    return saved ? parseInt(saved, 10) : 28;
  });

  // Handle Login
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    const existingProfile = localStorage.getItem('examai_profile');
    if (!existingProfile) {
      setShowProfileModal(true);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('examai_user');
    setUser(null);
  };

  // Handle Profile Save
  const handleProfileSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setShowProfileModal(false);
  };

  // Trigger Sample Paper Generation with Live Web Grounding & Gemini
  const handleGeneratePaper = async ({ topic, questionCount, difficulty }) => {
    if (!profile) {
      setShowProfileModal(true);
      return;
    }

    if (testsRemaining <= 0) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsGenerating(true);
      setActiveResearchTopic(topic);

      // Step 1: Live Web Syllabus Grounding & Research
      const researchData = await performLiveWebResearch(topic, profile, (stepText) => {
        setResearchStep(stepText);
      });

      // Step 2: Gemini AI Question Paper Synthesis Grounded on Research
      const paper = await generateExamPaper({
        topic,
        profile,
        questionCount,
        difficulty,
        researchData,
      });

      setCurrentPaper(paper);
      localStorage.setItem('examai_last_paper', JSON.stringify(paper));

      // Decrement usage balance
      const newRemaining = Math.max(0, testsRemaining - 1);
      setTestsRemaining(newRemaining);
      localStorage.setItem('examai_tests_remaining', newRemaining.toString());
    } catch (err) {
      console.error('Failed to generate paper:', err);
      alert(err.message || 'Error generating exam paper. Please check console.');
    } finally {
      setIsGenerating(false);
      setResearchStep('');
    }
  };

  // Trigger Live AI Answer Sheet Evaluation
  const handleEvaluateAnswers = async (studentAnswers) => {
    if (!currentPaper) return;

    try {
      setIsEvaluating(true);
      const report = await evaluateStudentAnswers(currentPaper, studentAnswers);
      setEvaluationReport(report);
    } catch (err) {
      console.error('Evaluation failed:', err);
      alert('Error evaluating answers.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // 1. If not logged in, render Start Auth Page
  if (!user) {
    return <AuthModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={styles.appWrapper}>
      {/* Top Minimal Navigation */}
      <Navbar
        profile={profile}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenSubscription={() => setShowSubscriptionModal(true)}
        onLogout={handleLogout}
        testsRemaining={testsRemaining}
        totalTests={30}
      />

      {/* Main Content Area */}
      <main style={styles.main}>
        {currentPaper ? (
          <ExamPaperView
            paper={currentPaper}
            onEvaluate={handleEvaluateAnswers}
            onReset={() => setCurrentPaper(null)}
          />
        ) : (
          <PaperGenerator
            profile={profile}
            onGenerate={handleGeneratePaper}
            isGenerating={isGenerating}
          />
        )}
      </main>

      {/* Live Web Research Visualization Modal */}
      {isGenerating && (
        <LiveResearchModal
          currentStep={researchStep}
          topic={activeResearchTopic}
          profile={profile}
        />
      )}

      {/* Evaluation Report Modal */}
      {evaluationReport && (
        <AnswerEvaluationModal
          evaluation={evaluationReport}
          onClose={() => setEvaluationReport(null)}
        />
      )}

      {/* Profile Calibration Modal */}
      {showProfileModal && (
        <ProfileModal
          initialProfile={profile}
          onSave={handleProfileSave}
          isMandatory={!profile}
        />
      )}

      {/* Subscription & Usage Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          testsRemaining={testsRemaining}
          totalTests={30}
        />
      )}
    </div>
  );
}

const styles = {
  appWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    color: '#0f172a',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
};
