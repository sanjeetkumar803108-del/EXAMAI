import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, HelpCircle, CheckCircle2, ArrowRight, ArrowLeft, Send, X, AlertTriangle, Lightbulb, BookOpen, RefreshCw } from 'lucide-react';
import FormattedQuestionBody from './FormattedQuestionBody';
import MathRenderer from './MathRenderer';
import { askAIQuestionTutor } from '../services/aiGenerator';

export default function AskAIModal({ isOpen, onClose, paper, profile, initialQuestionNumber = 1 }) {
  // ✅ ALL HOOKS MUST BE CALLED UNCONDITIONALLY FIRST (React Rules of Hooks)
  const allQuestions = (isOpen && paper) ? paper.sections.flatMap((s) => s.questions) : [];
  const totalQuestions = allQuestions.length;

  // Phase: 'selection' or 'chat'
  const [phase, setPhase] = useState('selection');
  const [questionInput, setQuestionInput] = useState(String(initialQuestionNumber || 1));
  const [inputError, setInputError] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [mode, setMode] = useState('explain_question'); // 'explain_question' or 'explain_answer'

  // Chatbot State
  const [messages, setMessages] = useState([]);
  const [followUpText, setFollowUpText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Validate question number on change
  useEffect(() => {
    if (!isOpen || !paper || totalQuestions === 0) return;

    const trimmed = questionInput.trim();
    if (!trimmed) {
      setInputError('Please enter a question number.');
      setSelectedQuestion(null);
      return;
    }

    const num = parseInt(trimmed, 10);
    if (isNaN(num)) {
      setInputError('Please enter a valid numeric question number.');
      setSelectedQuestion(null);
      return;
    }

    if (num < 1 || num > totalQuestions) {
      setInputError(
        `Question ${num} does not exist in this paper! This question paper only contains Q.1 to Q.${totalQuestions}.`
      );
      setSelectedQuestion(null);
      return;
    }

    // Found valid question
    const found = allQuestions.find((q) => Number(q.questionNumber) === num);
    if (found) {
      setInputError('');
      setSelectedQuestion(found);
    } else {
      setInputError(`Could not locate Question ${num} in this paper.`);
      setSelectedQuestion(null);
    }
  }, [questionInput, totalQuestions, isOpen, paper]);

  // Set initial selected question on mount / when modal opens
  useEffect(() => {
    if (!isOpen || !paper || totalQuestions === 0) return;
    const initNum = Math.min(Math.max(1, initialQuestionNumber || 1), totalQuestions);
    setQuestionInput(String(initNum));
    // Reset chat when modal opens fresh
    setPhase('selection');
    setMessages([]);
    setFollowUpText('');
  }, [isOpen, initialQuestionNumber, totalQuestions]);

  // Scroll chat to bottom
  useEffect(() => {
    if (phase === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, phase]);

  // ✅ Early return AFTER all hooks
  if (!isOpen || !paper) return null;

  // Trigger initial AI Tutor generation
  const handleStartTutor = async (chosenMode) => {
    if (!selectedQuestion || inputError) return;

    setMode(chosenMode);
    setPhase('chat');
    setIsLoading(true);
    setMessages([]);

    try {
      const response = await askAIQuestionTutor({
        question: selectedQuestion,
        paperContext: {
          title: paper.title,
          targetExam: paper.targetExam,
          subject: paper.subject,
          topic: paper.topic,
        },
        profile: profile || {},
        mode: chosenMode,
      });

      setMessages([
        {
          id: 'initial_' + Date.now(),
          role: 'assistant',
          mode: chosenMode,
          content: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages([
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: `⚠️ ${err.message || 'Failed to connect to AI Tutor. Please try again.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Switch between Explain Question and Explain Answer inside Chat
  const handleSwitchModeInChat = async (newMode) => {
    if (newMode === mode || isLoading) return;
    setMode(newMode);
    setIsLoading(true);

    try {
      const response = await askAIQuestionTutor({
        question: selectedQuestion,
        paperContext: {
          title: paper.title,
          targetExam: paper.targetExam,
          subject: paper.subject,
          topic: paper.topic,
        },
        profile: profile || {},
        mode: newMode,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: 'switch_' + Date.now(),
          role: 'assistant',
          mode: newMode,
          content: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: `⚠️ ${err.message || 'Failed to switch explanation mode.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Send Student Follow-up Question
  const handleSendFollowUp = async (customText) => {
    const textToSend = customText || followUpText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setFollowUpText('');
    setIsLoading(true);

    try {
      const response = await askAIQuestionTutor({
        question: selectedQuestion,
        paperContext: {
          title: paper.title,
          targetExam: paper.targetExam,
          subject: paper.subject,
          topic: paper.topic,
        },
        profile: profile || {},
        mode,
        userMessage: textToSend.trim(),
        chatHistory: messages.slice(-4), // Last 4 messages for context
      });

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          role: 'assistant',
          content: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: `⚠️ ${err.message || 'Could not answer follow-up. Please try again.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.backdrop} className="animate-fade-in">
      <div style={styles.modalCard}>
        {/* PHASE 1: QUESTION SELECTION & EXPLANATION CHOICE */}
        {phase === 'selection' ? (
          <div>
            {/* Modal Header */}
            <div style={styles.header}>
              <div style={styles.headerLeft}>
                <div style={styles.aiBadge}>
                  <Bot size={18} color="#2563eb" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={styles.headerTitle}>Ask AI Study Assistant</h3>
                    <span style={styles.targetExamPill}>{paper.targetExam || 'Official Exam'}</span>
                  </div>
                  <p style={styles.headerSubtitle}>
                    Get personalized concept breakdowns or step-by-step full solutions for any question.
                  </p>
                </div>
              </div>
              <button type="button" onClick={onClose} style={styles.closeBtn} title="Close">
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Question Number Input Section */}
            <div style={styles.qInputCard}>
              <label style={styles.inputLabel}>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>Enter Question Number to ask AI:</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}> (Paper contains Q.1 to Q.{totalQuestions})</span>
              </label>

              <div style={styles.inputRow}>
                <div style={styles.inputWrapper}>
                  <span style={styles.qPrefix}>Q.</span>
                  <input
                    type="number"
                    min="1"
                    max={totalQuestions}
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                    placeholder={`1 - ${totalQuestions}`}
                    style={{
                      ...styles.numberInput,
                      borderColor: inputError ? '#ef4444' : '#cbd5e1',
                    }}
                  />
                </div>

                {/* Quick Selection Chips */}
                <div style={styles.quickChipsWrapper}>
                  <span style={styles.chipsLabel}>Quick Select:</span>
                  <div style={styles.chipsScroll}>
                    {allQuestions.map((q) => {
                      const isActive = String(q.questionNumber) === questionInput.trim();
                      return (
                        <button
                          key={q.id || q.questionNumber}
                          type="button"
                          onClick={() => setQuestionInput(String(q.questionNumber))}
                          style={{
                            ...styles.chipBtn,
                            backgroundColor: isActive ? '#0f172a' : '#f1f5f9',
                            color: isActive ? '#ffffff' : '#334155',
                            borderColor: isActive ? '#0f172a' : '#e2e8f0',
                            fontWeight: isActive ? '700' : '500',
                          }}
                        >
                          Q.{q.questionNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Validation Error Alert */}
              {inputError && (
                <div style={styles.errorBox} className="animate-fade-in">
                  <AlertTriangle size={15} color="#dc2626" style={{ flexShrink: 0 }} />
                  <span>{inputError}</span>
                </div>
              )}

              {/* Question Preview Box (when valid) */}
              {selectedQuestion && !inputError && (
                <div style={styles.previewBox} className="animate-fade-in">
                  <div style={styles.previewHeader}>
                    <span style={styles.previewTag}>Selected for AI:</span>
                    <span style={styles.previewQNum}>
                      Question {selectedQuestion.questionNumber} [{selectedQuestion.marks} Mark{selectedQuestion.marks > 1 ? 's' : ''}]
                    </span>
                  </div>
                  <div style={styles.previewText}>
                    <MathRenderer
                      text={
                        selectedQuestion.text.length > 160
                          ? selectedQuestion.text.slice(0, 160) + '...'
                          : selectedQuestion.text
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Mode Selection Cards */}
            <div style={styles.optionsSection}>
              <span style={styles.optionsSectionTitle}>Choose AI Assistant Action:</span>

              <div style={styles.optionsGrid}>
                {/* Option 1: Explain Question */}
                <button
                  type="button"
                  disabled={!selectedQuestion || !!inputError}
                  onClick={() => handleStartTutor('explain_question')}
                  style={{
                    ...styles.optionCard,
                    opacity: !selectedQuestion || !!inputError ? 0.5 : 1,
                    cursor: !selectedQuestion || !!inputError ? 'not-allowed' : 'pointer',
                  }}
                >
                  <div style={styles.optionTop}>
                    <div style={{ ...styles.optionIconBox, backgroundColor: '#eff6ff' }}>
                      <Lightbulb size={22} color="#2563eb" />
                    </div>
                    <span style={styles.optionBadgeBlue}>Option 1 • Concept Breakdown</span>
                  </div>

                  <h4 style={styles.optionTitle}>Explain Question by AI</h4>
                  <p style={styles.optionDesc}>
                    Break down what the question is asking in 4 simple steps. Explains given clues, core formulas, and the thought process without giving away the final answer!
                  </p>

                  <div style={styles.optionFooter}>
                    <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '13px' }}>
                      Launch Question Explainer →
                    </span>
                  </div>
                </button>

                {/* Option 2: Explain Full Answer */}
                <button
                  type="button"
                  disabled={!selectedQuestion || !!inputError}
                  onClick={() => handleStartTutor('explain_answer')}
                  style={{
                    ...styles.optionCard,
                    opacity: !selectedQuestion || !!inputError ? 0.5 : 1,
                    cursor: !selectedQuestion || !!inputError ? 'not-allowed' : 'pointer',
                  }}
                >
                  <div style={styles.optionTop}>
                    <div style={{ ...styles.optionIconBox, backgroundColor: '#f0fdf4' }}>
                      <CheckCircle2 size={22} color="#16a34a" />
                    </div>
                    <span style={styles.optionBadgeGreen}>Option 2 • Full Solution</span>
                  </div>

                  <h4 style={styles.optionTitle}>Explain Full Answer by AI</h4>
                  <p style={styles.optionDesc}>
                    Get the complete official answer, detailed mathematical derivation, step-by-step rubric mark distribution, and common pitfalls to avoid!
                  </p>

                  <div style={styles.optionFooter}>
                    <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '13px' }}>
                      Launch Solution Explainer →
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* PHASE 2: INTERACTIVE AI CHATBOT & STEP-BY-STEP TUTOR */
          <div style={styles.chatWrapper}>
            {/* Chat Header */}
            <div style={styles.chatHeader}>
              <button
                type="button"
                onClick={() => setPhase('selection')}
                style={styles.backBtn}
                title="Change Question Number"
              >
                <ArrowLeft size={16} />
                <span>Change Question</span>
              </button>

              <div style={styles.chatHeaderCenter}>
                <span style={styles.chatQBadge}>Q.{selectedQuestion?.questionNumber}</span>
                <span style={styles.chatTopicBadge}>
                  {mode === 'explain_question' ? 'Concept Breakdown' : 'Full Solution Masterclass'}
                </span>
              </div>

              {/* Switch Mode Button inside chat */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() =>
                    handleSwitchModeInChat(
                      mode === 'explain_question' ? 'explain_answer' : 'explain_question'
                    )
                  }
                  style={styles.switchModeBtn}
                  disabled={isLoading}
                >
                  <RefreshCw size={13} />
                  <span>
                    {mode === 'explain_question' ? 'Switch to Full Answer' : 'Switch to Question Concept'}
                  </span>
                </button>
                <button type="button" onClick={onClose} style={styles.closeBtn} title="Close">
                  <X size={18} color="#64748b" />
                </button>
              </div>
            </div>

            {/* Selected Question Context Banner */}
            <div style={styles.qContextCard}>
              <div style={styles.qContextTop}>
                <span style={styles.qContextLabel}>
                  Question {selectedQuestion?.questionNumber} [{selectedQuestion?.marks} Mark{selectedQuestion?.marks > 1 ? 's' : ''}]
                </span>
                <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                  Target: {paper.targetExam || 'Board Exam'}
                </span>
              </div>
              <div style={styles.qContextBody}>
                <FormattedQuestionBody text={selectedQuestion?.text} />
              </div>
            </div>

            {/* Conversation Messages Thread */}
            <div style={styles.chatMessagesArea}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.messageRow,
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                  className="animate-fade-in"
                >
                  {msg.role === 'assistant' && (
                    <div style={styles.assistantAvatar}>
                      <Bot size={17} color="#ffffff" />
                    </div>
                  )}

                  <div
                    style={
                      msg.role === 'user'
                        ? styles.userBubble
                        : styles.assistantBubble
                    }
                  >
                    {msg.role === 'assistant' ? (
                      <div>
                        <div style={styles.assistantMsgTop}>
                          <span style={styles.assistantMsgAuthor}>ExamAI Study Tutor</span>
                          <span style={styles.msgTime}>{msg.timestamp}</span>
                        </div>
                        <FormattedQuestionBody text={msg.content} />
                      </div>
                    ) : (
                      <div>
                        <p style={styles.userMsgText}>{msg.content}</p>
                        <span style={styles.userMsgTime}>{msg.timestamp}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div style={styles.loadingRow} className="animate-fade-in">
                  <div style={styles.assistantAvatar}>
                    <Bot size={17} color="#ffffff" />
                  </div>
                  <div style={styles.loadingBubble}>
                    <Sparkles size={16} color="#2563eb" className="animate-spin" />
                    <span style={styles.loadingText}>
                      ExamAI Tutor is analyzing Q.{selectedQuestion?.questionNumber} and formulating step-by-step guidance...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Follow-up Chips */}
            <div style={styles.quickPromptsBar}>
              <span style={styles.quickPromptsLabel}>Quick Doubts:</span>
              <button
                type="button"
                onClick={() => handleSendFollowUp('Can you give me a subtle hint on how to start?')}
                style={styles.quickPromptChip}
                disabled={isLoading}
              >
                💡 Give me a hint
              </button>
              <button
                type="button"
                onClick={() => handleSendFollowUp('Can you explain the main formula used here in simpler words?')}
                style={styles.quickPromptChip}
                disabled={isLoading}
              >
                📐 Explain formula in simple words
              </button>
              <button
                type="button"
                onClick={() => handleSendFollowUp('What common mistake do students make on this question?')}
                style={styles.quickPromptChip}
                disabled={isLoading}
              >
                ⚠️ Common mistakes to avoid
              </button>
              <button
                type="button"
                onClick={() => handleSendFollowUp('Is there another alternative way to solve this?')}
                style={styles.quickPromptChip}
                disabled={isLoading}
              >
                ✍️ Show alternative method
              </button>
            </div>

            {/* Chat Input Bar */}
            <div style={styles.inputArea}>
              <input
                type="text"
                value={followUpText}
                onChange={(e) => setFollowUpText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendFollowUp();
                  }
                }}
                placeholder={`Ask follow-up question or doubt on Q.${selectedQuestion?.questionNumber}...`}
                style={styles.chatInput}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => handleSendFollowUp()}
                disabled={!followUpText.trim() || isLoading}
                style={{
                  ...styles.sendBtn,
                  opacity: !followUpText.trim() || isLoading ? 0.5 : 1,
                  cursor: !followUpText.trim() || isLoading ? 'not-allowed' : 'pointer',
                }}
              >
                <Send size={15} color="#ffffff" />
                <span>Send</span>
              </button>
            </div>
          </div>
        )}
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
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
    padding: '16px',
  },
  modalCard: {
    width: '100%',
    maxWidth: '820px',
    maxHeight: '90vh',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
    border: '1px solid #e2e8f0',
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '18px',
    paddingBottom: '14px',
    borderBottom: '1px solid #f1f5f9',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  aiBadge: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  targetExamPill: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: '999px',
    padding: '2px 8px',
  },
  headerSubtitle: {
    fontSize: '13px',
    color: '#64748b',
    marginTop: '3px',
    marginBottom: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s ease',
  },
  qInputCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '16px 18px',
    marginBottom: '20px',
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    marginBottom: '10px',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '120px',
  },
  qPrefix: {
    position: 'absolute',
    left: '12px',
    fontWeight: '700',
    fontSize: '14px',
    color: '#0f172a',
    pointerEvents: 'none',
  },
  numberInput: {
    width: '100%',
    padding: '9px 12px 9px 32px',
    borderRadius: '10px',
    border: '1.5px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    color: '#0f172a',
    outline: 'none',
  },
  quickChipsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    minWidth: '240px',
  },
  chipsLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    whiteSpace: 'nowrap',
  },
  chipsScroll: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    overflowX: 'auto',
    padding: '4px 0',
  },
  chipBtn: {
    padding: '5px 10px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s ease',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#991b1b',
    fontSize: '12.5px',
    marginTop: '10px',
    fontWeight: '500',
  },
  previewBox: {
    marginTop: '12px',
    padding: '12px 14px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  previewTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  previewQNum: {
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#0f172a',
  },
  previewText: {
    fontSize: '12.5px',
    color: '#334155',
    lineHeight: '1.45',
  },
  optionsSection: {
    marginTop: '6px',
  },
  optionsSectionTitle: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '700',
    color: '#334155',
    marginBottom: '12px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '14px',
  },
  optionCard: {
    backgroundColor: '#ffffff',
    border: '1.5px solid #e2e8f0',
    borderRadius: '14px',
    padding: '18px 20px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.15s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
  },
  optionTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  optionIconBox: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionBadgeBlue: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#1d4ed8',
    backgroundColor: '#eff6ff',
    padding: '3px 8px',
    borderRadius: '999px',
  },
  optionBadgeGreen: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#15803d',
    backgroundColor: '#f0fdf4',
    padding: '3px 8px',
    borderRadius: '999px',
  },
  optionTitle: {
    fontSize: '15.5px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 6px 0',
  },
  optionDesc: {
    fontSize: '12.5px',
    color: '#64748b',
    lineHeight: '1.5',
    margin: '0 0 14px 0',
    flex: 1,
  },
  optionFooter: {
    borderTop: '1px solid #f1f5f9',
    paddingTop: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  chatWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '75vh',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid #f1f5f9',
    gap: '8px',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#334155',
    cursor: 'pointer',
  },
  chatHeaderCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  chatQBadge: {
    fontSize: '12.5px',
    fontWeight: '800',
    color: '#ffffff',
    backgroundColor: '#0f172a',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  chatTopicBadge: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  switchModeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '6px 10px',
    fontSize: '11.5px',
    fontWeight: '600',
    color: '#0f172a',
    cursor: 'pointer',
  },
  qContextCard: {
    marginTop: '10px',
    padding: '10px 14px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    maxHeight: '130px',
    overflowY: 'auto',
  },
  qContextTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  qContextLabel: {
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#0f172a',
  },
  qContextBody: {
    fontSize: '12.5px',
    color: '#334155',
  },
  chatMessagesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    width: '100%',
  },
  assistantAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    backgroundColor: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.2)',
  },
  assistantBubble: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '14px 16px',
    maxWidth: '85%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
  },
  assistantMsgTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '4px',
  },
  assistantMsgAuthor: {
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#2563eb',
  },
  msgTime: {
    fontSize: '10.5px',
    color: '#94a3b8',
  },
  userBubble: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderRadius: '14px',
    padding: '10px 14px',
    maxWidth: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userMsgText: {
    fontSize: '13px',
    color: '#ffffff',
    margin: 0,
    lineHeight: '1.45',
  },
  userMsgTime: {
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: '4px',
  },
  loadingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  loadingBubble: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '12px',
    padding: '10px 14px',
  },
  loadingText: {
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#1e40af',
  },
  quickPromptsBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    overflowX: 'auto',
    padding: '8px 0',
    borderTop: '1px solid #f1f5f9',
  },
  quickPromptsLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
  },
  quickPromptChip: {
    padding: '4px 10px',
    backgroundColor: '#f8fafc',
    border: '1px solid #cbd5e1',
    borderRadius: '999px',
    fontSize: '11.5px',
    color: '#334155',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: '500',
    transition: 'all 0.15s ease',
  },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingTop: '8px',
  },
  chatInput: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #cbd5e1',
    fontSize: '13px',
    color: '#0f172a',
    outline: 'none',
  },
  sendBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
  },
};
