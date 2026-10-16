import React, { useEffect, useState } from 'react';
import { COURSE_MODULES } from '../data/courseData';
import { useApp } from '../context/AppContext';
import { MODULE_TRANSLATIONS, CHAPTER_TRANSLATIONS } from '../utils/translations';
import {
  HelpCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  RotateCcw,
  Award,
  Sparkles,
  BookOpen,
  Check,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const QuizCenter: React.FC = () => {
  const {
    currentUser,
    hasFullAccess,
    setShowPaywallModal,
    setSelectedChapterId,
    setActiveNavTab,
    recordQuizScore,
    quizScores,
    language
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

  // Calculate question completion metrics for a module
  const getModuleStats = (modId: string) => {
    const mod = COURSE_MODULES.find(m => m.id === modId);
    if (!mod) return { total: 0, completed: 0, percentage: 0, remaining: 0 };
    const questions = mod.chapters.flatMap(ch => ch.quiz);
    const total = questions.length;
    const completed = questions.filter(q => {
      const ch = mod.chapters.find(c => c.quiz.some(item => item.id === q.id));
      const isRecorded = ch && Boolean(quizScores[ch.id]);
      return checkedQuestions[q.id] || isRecorded;
    }).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const remaining = Math.max(0, total - completed);
    return { total, completed, percentage, remaining };
  };

  const activeModule = COURSE_MODULES.find(m => m.id === selectedModuleId);
  const activeStats = activeModule ? getModuleStats(activeModule.id) : null;

  // Overall statistics across all modules
  const totalAllQuestions = COURSE_MODULES.flatMap(m => m.chapters.flatMap(c => c.quiz)).length;
  const completedAllQuestions = COURSE_MODULES.flatMap(m => m.chapters.flatMap(c => c.quiz)).filter(q => {
    const ch = allQuizzes.find(item => item.chapter.quiz.some(item2 => item2.id === q.id))?.chapter;
    return checkedQuestions[q.id] || (ch && Boolean(quizScores[ch.id]));
  }).length;
  const overallPercentage = totalAllQuestions > 0 ? Math.round((completedAllQuestions / totalAllQuestions) * 100) : 0;
  const overallRemaining = Math.max(0, totalAllQuestions - completedAllQuestions);

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
    setUserAnswers(previous =>
      Object.fromEntries(Object.entries(previous).filter(([id]) => !questionIds.includes(id)))
    );
    setCheckedQuestions(previous =>
      Object.fromEntries(Object.entries(previous).filter(([id]) => !questionIds.includes(id)))
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <Award className="w-4 h-4" />
          <span>{language === 'am' ? 'የዕውቀት መመዘኛና ተግባራዊ ጥያቄዎች' : 'Knowledge Assessment Center'}</span>
          <span>·</span>
          <span>{language === 'am' ? 'የተግባር ልምምድ' : 'Interactive Practice'}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50">
          {language === 'am'
            ? 'የኢትዮጵያ ወጪና ገቢ ንግድ የፈተና ጥያቄዎች'
            : 'Ethiopian Import & Export Practice Questionnaires'}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          {language === 'am'
            ? 'የብሔራዊ ባንክ መመሪያዎችን፣ የኤል ሲ (L/C) ስሌቶችን፣ የጉምሩክ ቀረጥ ካስኬድና የጅቡቲ ኮሪደር ሎጂስቲክስ እውቀትዎን በተጨባጭ የፈተና ጥያቄዎች ይፈትሹ።'
            : 'Test your mastery of NBE directives, LC settlement calculations, customs cascade tax tiers, and Djibouti corridor logistics with real exam-grade scenarios.'}
        </p>
      </div>

      {/* Module filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedModuleId('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
            selectedModuleId === 'all'
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          {language === 'am' ? 'ሁሉም ሞጁሎች' : 'All Modules'}
        </button>
        {COURSE_MODULES.map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedModuleId(m.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
              selectedModuleId === m.id
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            {language === 'am' ? `ሞጁል ${m.moduleNumber}` : `Mod ${m.moduleNumber}`}
          </button>
        ))}
      </div>

      {/* =========================================================================
          MODULE VISUAL PROGRESS BAR & QUESTION COMPLETION TRACKER
          ========================================================================= */}
      {activeModule && activeStats ? (
        <div className="bg-gradient-to-br from-amber-500/10 via-white to-emerald-500/10 dark:from-amber-950/30 dark:via-neutral-900 dark:to-emerald-950/30 border border-amber-300 dark:border-amber-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <TrendingUp className="w-4 h-4" />
                <span>
                  {language === 'am'
                    ? `ሞጁል ${activeModule.moduleNumber} የፈተና ጥያቄዎች ሂደት`
                    : `Module ${activeModule.moduleNumber} Question Progress`}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {MODULE_TRANSLATIONS[activeModule.id]?.title[language] || activeModule.title}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {MODULE_TRANSLATIONS[activeModule.id]?.subtitle[language] || activeModule.subtitle}
              </p>
            </div>

            <div className="flex items-baseline gap-1.5 self-start sm:self-auto shrink-0 bg-white dark:bg-neutral-800 px-3.5 py-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-2xs">
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
                {activeStats.percentage}%
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                ({activeStats.completed}/{activeStats.total} {language === 'am' ? 'ጥያቄዎች' : 'Questions'})
              </span>
            </div>
          </div>

          {/* Visual Progress Bar Component */}
          <div className="space-y-1.5">
            <div className="w-full h-3.5 sm:h-4 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                style={{ width: `${activeStats.percentage}%` }}
                className={`h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-1.5 text-[9px] font-extrabold text-white shadow-xs ${
                  activeStats.percentage === 100
                    ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500'
                    : activeStats.percentage > 0
                    ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600'
                    : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
              >
                {activeStats.percentage >= 15 && `${activeStats.percentage}%`}
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
              <span className="font-medium">
                {activeStats.completed} {language === 'am' ? 'የተመለሱ ጥያቄዎች' : 'Questions Completed'}
              </span>
              <span className="font-medium">
                {activeStats.remaining > 0
                  ? (language === 'am' ? `${activeStats.remaining} የቀሩ ጥያቄዎች` : `${activeStats.remaining} Remaining to finish`)
                  : (language === 'am' ? 'ሙሉው ተጠናቋል ✓' : 'Fully Completed ✓')}
              </span>
            </div>
          </div>

          {/* Motivational Encouragement Banner */}
          <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-3 ${
            activeStats.percentage === 100
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
              : 'bg-white/80 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
          }`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-xl shrink-0 font-bold ${
              activeStats.percentage === 100
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
            }`}>
              {activeStats.percentage === 100 ? '✓' : '★'}
            </span>
            <p className="leading-relaxed font-medium">
              {activeStats.percentage === 100
                ? (language === 'am'
                    ? '🎉 ድንቅ ውጤት! የዚህን ሞጁል ሁሉንም ጥያቄዎች በተሳካ ሁኔታ አጠናቀዋል። የምስክር ወረቀትዎን ለመቀበል ሌሎች ሞጁሎችን ይቀጥሉ!'
                    : 'Mastery achieved! All exam questions in this module are verified. Complete remaining modules to earn your Executive Certificate!')
                : activeStats.percentage >= 50
                ? (language === 'am'
                    ? `⚡ እጅግ ጥሩ ሂደት! የዚህን ሞጁል ከግማሽ በላይ አጠናቀዋል። የቀሩትን ${activeStats.remaining} ጥያቄዎች በማጠናቀቅ ሙሉ እውቀትዎን ያረጋግጡ።`
                    : `Great momentum! You are over halfway through this module. Answer the remaining ${activeStats.remaining} questions to complete.`)
                : activeStats.percentage > 0
                ? (language === 'am'
                    ? `🚀 ጥሩ ጅምር! ${activeStats.completed} ጥያቄዎች ተመልሰዋል። የቀሩትን ${activeStats.remaining} ጥያቄዎች በመመለስ የሞጁሉን ስልጠና ያጠናቁ።`
                    : `Good start! ${activeStats.completed} of ${activeStats.total} answered. Complete the remaining ${activeStats.remaining} questions below to solidify your understanding.`)
                : (language === 'am'
                    ? `🎯 በዚህ ሞጁል ያሉትን ${activeStats.total} ጥያቄዎች በመመለስ እውቀትዎን ይፈትሹና ያጠናቁ!`
                    : `0 of ${activeStats.total} completed. Answer the practice questions below to test your mastery of this module!`)}
            </p>
          </div>
        </div>
      ) : (
        /* Overall Progress Summary Bar & Interactive Module Cards */
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'am' ? 'የአካዳሚው አጠቃላይ የጥያቄዎች ሂደት' : 'Overall Academy Question Progress'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {language === 'am' ? 'የ16ቱ ምዕራፎች የፈተና ሂደት' : 'Curriculum Question Mastery'}
              </h2>
            </div>
            <div className="flex items-baseline gap-1.5 self-start sm:self-auto shrink-0 bg-neutral-100 dark:bg-neutral-800 px-3.5 py-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-2xs">
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
                {overallPercentage}%
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                ({completedAllQuestions}/{totalAllQuestions} {language === 'am' ? 'ጥያቄዎች' : 'Total Questions'})
              </span>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3.5 sm:h-4 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                style={{ width: `${overallPercentage}%` }}
                className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 shadow-xs"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
              <span>{completedAllQuestions} {language === 'am' ? 'የተመለሱ ጥያቄዎች' : 'Questions Completed'}</span>
              <span>{overallRemaining} {language === 'am' ? 'የቀሩ ጥያቄዎች ለሰርተፊኬት' : 'Remaining for Certificate'}</span>
            </div>
          </div>

          {/* 6 Module Quick Visual Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
            {COURSE_MODULES.map(m => {
              const mStats = getModuleStats(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedModuleId(m.id)}
                  className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 hover:border-amber-400 dark:hover:border-amber-700 transition text-left space-y-2 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                      {language === 'am' ? `ሞጁል ${m.moduleNumber}` : `Mod ${m.moduleNumber}`}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-neutral-400">
                      {mStats.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${mStats.percentage}%` }}
                      className={`h-full rounded-full ${
                        mStats.percentage === 100 ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}
                    />
                  </div>
                  <div className="text-[10px] text-neutral-500 truncate">
                    {mStats.completed}/{mStats.total} {language === 'am' ? 'ጥያቄዎች' : 'Qs'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

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
                  {language === 'am' ? `ሞጁል ${module.moduleNumber}` : `Module ${module.moduleNumber}`} · {language === 'am' ? `ምዕራፍ ${chapter.chapterNumber}` : `Chapter ${chapter.chapterNumber}`}
                </span>
                <h3 className="text-lg font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                  {CHAPTER_TRANSLATIONS[chapter.id]?.title[language] || chapter.title}
                </h3>
              </div>

              {!isAccessible ? (
                <span className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'am' ? 'የተከፈለበት ምዕራፍ' : 'Paid Chapter'}</span>
                </span>
              ) : (
                <button
                  onClick={() => {
                    setSelectedChapterId(chapter.id);
                    setActiveNavTab('curriculum');
                  }}
                  className="text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>{language === 'am' ? 'ወደ ጥናት ማስታወሻ ሂድ' : 'Go to Study Notes'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {!isAccessible ? (
              <div className="p-6 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl text-center space-y-3">
                <Lock className="w-6 h-6 text-neutral-400 mx-auto" />
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                  {language === 'am'
                    ? `የምዕራፍ ${chapter.chapterNumber} የፈተና ጥያቄዎች የ30 ቀናት ሙሉ አባልነት ያስፈልጋቸዋል (3,900 ብር በቴሌብር · የ60% ቅናሽ!)።`
                    : `Questions for Chapter ${chapter.chapterNumber} require an active 30-day subscription (3,900 ETB via telebirr · Promotional 60% Discount!).`}
                </p>
                <button
                  onClick={() => setShowPaywallModal(true)}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold"
                >
                  {language === 'am' ? 'በቴሌብር ይመዝገቡ (3,900 ብር · የ60% ቅናሽ)' : 'Subscribe via telebirr (3,900 ETB · 60% Off)'}
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
                        <span>{language === 'am' && q.questionAm ? q.questionAm : q.question}</span>
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          let optStyle =
                            'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300';

                          if (isChecked) {
                            if (optIdx === q.correctIndex) {
                              optStyle =
                                'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                            } else if (selectedOpt === optIdx && !isCorrect) {
                              optStyle =
                                'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 line-through';
                            }
                          } else if (selectedOpt === optIdx) {
                            optStyle =
                              'border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold';
                          }

                          const optionText = language === 'am' && q.optionsAm && q.optionsAm[optIdx] ? q.optionsAm[optIdx] : opt;

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={isChecked}
                              aria-pressed={selectedOpt === optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${optStyle}`}
                            >
                              <span>{optionText}</span>
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
                            onClick={() =>
                              handleCheckQuestion(
                                q.id,
                                chapter.id,
                                chapter.quiz.map(question => question.id)
                              )
                            }
                            disabled={selectedOpt === undefined}
                            className="px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 text-white rounded-lg text-[11px] font-bold disabled:opacity-40 transition-colors"
                          >
                            {language === 'am' ? 'መልሴን አረጋግጥ' : 'Verify Answer'}
                          </button>
                        ) : (
                          <span
                            className={`text-[11px] font-semibold ${
                              isCorrect
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {isCorrect
                              ? (language === 'am' ? '✓ ትክክለኛ መልስ!' : '✓ Correct Answer!')
                              : (language === 'am' ? '✗ የተሳሳተ መልስ' : '✗ Incorrect Answer')}
                          </span>
                        )}
                      </div>

                      {isChecked && (
                        <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1">
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
                            {language === 'am' ? 'ሕጋዊና መመሪያ ማጣቀሻ፦' : 'Regulatory Reference:'}
                          </span>
                          <p>{language === 'am' && q.explanationAm ? q.explanationAm : q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {chapter.quiz.length > 0 &&
                  chapter.quiz.every(question => checkedQuestions[question.id]) &&
                  quizScores[chapter.id] && (
                    <div
                      role="status"
                      className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div>
                        {language === 'am' ? 'የፈተና ውጤትዎ ተመዝግቧል፦' : 'Quiz score recorded:'}{' '}
                        <strong>
                          {quizScores[chapter.id].score}/{quizScores[chapter.id].maxScore}
                        </strong>
                        .{' '}
                        {quizScores[chapter.id].score / quizScores[chapter.id].maxScore >= 0.6
                          ? (language === 'am' ? 'ትምህርቱ በተሳካ ሁኔታ ተጠናቋል።' : ' The lesson is marked complete.')
                          : (language === 'am' ? 'ትምህርቱን ከልሰው ድጋሚ ይሞክሩ።' : ' Review the lesson, then try again.')}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRetake(chapter.quiz.map(question => question.id))}
                        className="font-bold underline text-emerald-800 dark:text-emerald-300 hover:opacity-80"
                      >
                        {language === 'am' ? 'ይህንን ፈተና ድጋሚ ይውሰዱ' : 'Retake this quiz'}
                      </button>
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
