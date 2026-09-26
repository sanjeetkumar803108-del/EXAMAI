import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import PaperGenerator from './components/PaperGenerator';
import LiveResearchModal from './components/LiveResearchModal';
import ExamPaperView from './components/ExamPaperView';
import AnswerEvaluationModal from './components/AnswerEvaluationModal';
import SubscriptionModal from './components/SubscriptionModal';
import { ToastProvider, useToast } from './components/Toast';
import { performLiveWebResearch, generateExamPaper, evaluateStudentAnswers } from './services/aiGenerator';

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}

function MainApp() {
  const toast = useToast();

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
    toast.success(`Welcome to ExamAI, ${loggedInUser.name || 'Candidate'}!`, 'Logged In');
    const existingProfile = localStorage.getItem('examai_profile');
    if (!existingProfile) {
      setShowProfileModal(true);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('examai_user');
    setUser(null);
    toast.info('You have been signed out successfully.', 'Signed Out');
  };

  // Handle Profile Save
  const handleProfileSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setShowProfileModal(false);
    toast.success('Your educational profile and target exam have been saved.', 'Profile Saved');
  };

  // Trigger Sample Paper Generation with Live Web Grounding & Gemini
  const handleGeneratePaper = async ({ topic, questionCount, difficulty, country, questionStyle }) => {
    if (!profile) {
      toast.info('Please configure your target exam and grade first.', 'Profile Required');
      setShowProfileModal(true);
      return;
    }

    if (testsRemaining <= 0) {
      toast.warning('You have reached the monthly test limit. Upgrade to continue.', 'Usage Limit');
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsGenerating(true);
      setActiveResearchTopic(topic);

      const effectiveCountry = country || profile?.country || 'in';
      const effectiveProfile = {
        ...profile,
        country: effectiveCountry,
      };

      // Step 1: Live Web Syllabus Grounding & Research with Country & Question Style
      const researchData = await performLiveWebResearch(
        topic,
        effectiveProfile,
        (stepText) => {
          setResearchStep(stepText);
        },
        questionStyle
      );

      // Step 2: Gemini AI Question Paper Synthesis Grounded on Research & Style
      const paper = await generateExamPaper({
        topic,
        profile: effectiveProfile,
        questionCount,
        difficulty,
        researchData,
        country: effectiveCountry,
        questionStyle,
      });

      setCurrentPaper(paper);
      localStorage.setItem('examai_last_paper', JSON.stringify(paper));

      // Decrement usage balance
      const newRemaining = Math.max(0, testsRemaining - 1);
      setTestsRemaining(newRemaining);
      localStorage.setItem('examai_tests_remaining', newRemaining.toString());

      const totalQ = paper.sections.reduce((acc, s) => acc + s.questions.length, 0);
      toast.success(
        `Generated official ${paper.title || 'Exam Paper'} with ${totalQ} questions aligned with blueprint!`,
        'Exam Paper Ready'
      );
    } catch (err) {
      console.error('Failed to generate paper:', err);
      toast.error(
        err.message || 'Error generating exam paper. Please try again.',
        'Paper Generation Issue'
      );
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
      toast.success('Live AI Step-Marking performance report is ready!', 'Evaluation Complete');
    } catch (err) {
      console.error('Evaluation failed:', err);
      toast.error(
        err.message || 'Error evaluating answers. Please retry.',
        'Evaluation Issue'
      );
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
