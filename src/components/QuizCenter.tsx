import React, { useEffect, useState } from 'react';
import { COURSE_MODULES } from '../data/courseData';
import { useApp } from '../context/AppContext';
import { HelpCircle, CheckCircle2, Lock, ArrowRight, RotateCcw, Award } from 'lucide-react';

export const QuizCenter: React.FC = () => {
  const {
    currentUser, hasFullAccess, setShowPaywallModal, setSelectedChapterId,
    setActiveNavTab, recordQuizScore, quizScores
  } = useApp();

  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setUserAnswers({});
    setCheckedQuestions({});
  }, [currentUser.id]);

  // Gather all quizzes
  const allQuizzes = COURSE_MODULES.flatMap(mod =>
    mod.chapters.map(ch => ({
      module: mod,
      chapter: ch,
      isAccessible: hasFullAccess || ch.isFreeTrialAccessible
    }))
  );

  const displayedQuizzes = allQuizzes.filter(q => {
    if (selectedModuleId === 'all') return true;
    return q.module.id === selectedModuleId;
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (checkedQuestions[questionId]) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckQuestion = (questionId: string, chapterId: string, questionIds: string[]) => {
    if (userAnswers[questionId] === undefined) return;
    const nextChecked = { ...checkedQuestions, [questionId]: true };
    setCheckedQuestions(nextChecked);
    if (questionIds.every(id => nextChecked[id])) {
      const chapter = allQuizzes.find(item => item.chapter.id === chapterId)?.chapter;
      if (chapter) {
        const correctCount = chapter.quiz.filter(question =>
          userAnswers[question.id] === question.correctIndex
        ).length;
        recordQuizScore(chapterId, correctCount, questionIds.length);
      }
    }
  };

  const handleRetake = (questionIds: string[]) => {
    setUserAnswers(previous => Object.fromEntries(
      Object.entries(previous).filter(([id]) => !questionIds.includes(id))
    ));
    setCheckedQuestions(previous => Object.fromEntries(
      Object.entries(previous).filter(([id]) => !questionIds.includes(id))
    ));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <span>Knowledge Assessment Center</span>
          <span>·</span>
          <span>Interactive Practice</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50">
          Ethiopian Import & Export Practice Questionnaires
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Test your mastery of NBE directives, LC settlement calculations, customs cascade tax tiers, and Djibouti corridor logistics with real exam-grade scenarios.
        </p>
      </div>

      {/* Module filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedModuleId('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            selectedModuleId === 'all'
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          All Modules
        </button>
        {COURSE_MODULES.map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedModuleId(m.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedModuleId === m.id
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Mod {m.moduleNumber}
          </button>
        ))}
      </div>

      {/* Quizzes list */}
      <div className="space-y-8">
        {displayedQuizzes.map(({ module, chapter, isAccessible }) => (
          <div
            key={chapter.id}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                  Module {module.moduleNumber} · Chapter {chapter.chapterNumber}
                </span>
                <h3 className="text-lg font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                  {chapter.title}
                </h3>
              </div>

              {!isAccessible ? (
                <span className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Paid Chapter</span>
                </span>
              ) : (
                <button
                  onClick={() => {
                    setSelectedChapterId(chapter.id);
                    setActiveNavTab('curriculum');
                  }}
                  className="text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Go to Study Notes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {!isAccessible ? (
              <div className="p-6 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl text-center space-y-3">
                <Lock className="w-6 h-6 text-neutral-400 mx-auto" />
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                  Questions for Chapter {chapter.chapterNumber} require an active 30-day subscription (3,900 ETB via telebirr · Promotional 60% Discount!).
                </p>
                <button
                  onClick={() => setShowPaywallModal(true)}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold"
                >
                  Subscribe via telebirr (3,900 ETB · 60% Off)
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {chapter.quiz.map((q, idx) => {
                  const selectedOpt = userAnswers[q.id];
                  const isChecked = checkedQuestions[q.id];
                  const isCorrect = isChecked && selectedOpt === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-4 bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/80 rounded-xl space-y-3 text-xs"
                    >
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-start gap-2">
                        <span className="font-mono text-amber-700 dark:text-amber-400">
                          {idx + 1}.
                        </span>
                        <span>{q.question}</span>
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300';

                          if (isChecked) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                            } else if (selectedOpt === optIdx && !isCorrect) {
                              optStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 line-through';
                            }
                          } else if (selectedOpt === optIdx) {
                            optStyle = 'border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={isChecked}
                              aria-pressed={selectedOpt === optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {isChecked && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {!isChecked ? (
                          <button
                            onClick={() => handleCheckQuestion(q.id, chapter.id, chapter.quiz.map(question => question.id))}
                            disabled={selectedOpt === undefined}
                            className="px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 text-white rounded-lg text-[11px] font-bold disabled:opacity-40"
                          >
                            Verify Answer
                          </button>
                        ) : (
                          <span className={`text-[11px] font-semibold ${
                            isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
                          </span>
                        )}
                      </div>

                      {isChecked && (
                        <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1">
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
                            Regulatory Reference:
                          </span>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
                {chapter.quiz.length > 0 && chapter.quiz.every(question => checkedQuestions[question.id]) && quizScores[chapter.id] && (
                  <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                    Quiz score recorded: <strong>{quizScores[chapter.id].score}/{quizScores[chapter.id].maxScore}</strong>.
                    {quizScores[chapter.id].score / quizScores[chapter.id].maxScore >= 0.6
                      ? ' The lesson is marked complete.'
                      : ' Review the lesson, then try again.'}
                    <button type="button" onClick={() => handleRetake(chapter.quiz.map(question => question.id))} className="ml-3 font-bold underline">Retake this quiz</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
