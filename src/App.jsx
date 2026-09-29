import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import PaperGenerator from './components/PaperGenerator';
import ExamPaperView from './components/ExamPaperView';
import AnswerEvaluationModal from './components/AnswerEvaluationModal';
import SubscriptionModal from './components/SubscriptionModal';
import { ToastProvider, useToast } from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import { generateExamPaper, evaluateStudentAnswers } from './services/aiGenerator';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <MainApp />
      </ToastProvider>
    </ErrorBoundary>
  );
}

function MainApp() {
  const toast = useToast();

  // Auth state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('examai_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Listen for persistent Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'AP Candidate',
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${firebaseUser.email}`,
          authProvider: 'google',
          createdAt: new Date().toISOString(),
        };
        setUser(userData);
        try {
          localStorage.setItem('examai_user', JSON.stringify(userData));
        } catch (e) {
          console.warn('Failed to save user:', e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // App & Exam Paper states
  const [currentPaper, setCurrentPaper] = useState(() => {
    try {
      const saved = localStorage.getItem('examai_last_paper');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.sections) && parsed.sections.length > 0) {
        return parsed;
      }
      return null;
    } catch (e) {
      console.warn('Failed to parse cached paper from storage:', e);
      try {
        localStorage.removeItem('examai_last_paper');
      } catch {}
      return null;
    }
  });

  const handleResetPaper = () => {
    try {
      localStorage.removeItem('examai_last_paper');
    } catch (e) {
      console.warn('Failed to remove cached paper:', e);
    }
    setCurrentPaper(null);
  };

  const [isGenerating, setIsGenerating] = useState(false);

  // Evaluation & Subscription Modals
  const [evaluationReport, setEvaluationReport] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Usage balance under plan
  const [testsRemaining, setTestsRemaining] = useState(() => {
    const saved = localStorage.getItem('examai_tests_remaining');
    return saved ? parseInt(saved, 10) : 28;
  });

  // Handle Login
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    toast.success(`Welcome to AP Calculus AI, ${loggedInUser.name || 'Candidate'}!`, 'Logged In');
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('SignOut error:', e);
    }
    localStorage.removeItem('examai_user');
    setUser(null);
    toast.info('You have been signed out successfully.', 'Signed Out');
  };

  // Trigger AP Calculus Paper Generation
  const handleGeneratePaper = async ({ subject, questionType, topic, questionCount, difficulty }) => {
    if (testsRemaining <= 0) {
      toast.warning('You have reached the monthly test limit. Upgrade to continue.', 'Usage Limit');
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsGenerating(true);

      const paper = await generateExamPaper({
        subject,
        questionType,
        topic,
        questionCount,
        difficulty,
      });

      setCurrentPaper(paper);
      localStorage.setItem('examai_last_paper', JSON.stringify(paper));

      // Decrement usage balance
      const newRemaining = Math.max(0, testsRemaining - 1);
      setTestsRemaining(newRemaining);
      localStorage.setItem('examai_tests_remaining', newRemaining.toString());

      const totalQ = paper.sections.reduce((acc, s) => acc + (s.questions ? s.questions.length : 0), 0);
      toast.success(
        `Generated ${paper.title || 'AP Calculus Paper'} with ${totalQ} ${questionType === 'frq' ? 'Free Response (FRQ)' : 'Multiple Choice (MCQ)'} questions!`,
        'Paper Ready'
      );
    } catch (err) {
      console.error('Failed to generate paper:', err);
      toast.error(
        err.message || 'Error generating AP Calculus paper. Please try again.',
        'Generation Issue'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Trigger Live AI Answer Evaluation with AP Rubrics
  const handleEvaluateAnswers = async (studentAnswers) => {
    if (!currentPaper) return;

    try {
      setIsEvaluating(true);
      const report = await evaluateStudentAnswers(currentPaper, studentAnswers);
      setEvaluationReport(report);
      toast.success('Official AP Reader score report is ready!', 'Evaluation Complete');
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
        onOpenSubscription={() => setShowSubscriptionModal(true)}
        onLogout={handleLogout}
        testsRemaining={testsRemaining}
        totalTests={30}
      />

      {/* Main Content Area */}
      <main style={styles.main}>
        {currentPaper ? (
          <ErrorBoundary onReset={handleResetPaper}>
            <ExamPaperView
              paper={currentPaper}
              onEvaluate={handleEvaluateAnswers}
              onReset={handleResetPaper}
            />
          </ErrorBoundary>
        ) : (
          <PaperGenerator
            onGenerate={handleGeneratePaper}
            isGenerating={isGenerating}
          />
        )}
      </main>

      {/* Evaluation Report Modal */}
      {evaluationReport && (
        <AnswerEvaluationModal
          evaluation={evaluationReport}
          onClose={() => setEvaluationReport(null)}
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
