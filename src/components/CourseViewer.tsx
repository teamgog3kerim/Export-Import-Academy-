import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSE_MODULES } from '../data/courseData';
import { Chapter, QuizQuestion } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Briefcase,
  AlertCircle,
  FileCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  Anchor,
  TrendingUp,
  DollarSign,
  Award,
  ClipboardCheck
} from 'lucide-react';
import { ExportDocumentChecklistGenerator } from './ExportDocumentChecklistGenerator';
import { MODULE_TRANSLATIONS, CHAPTER_TRANSLATIONS } from '../utils/translations';


export const CourseViewer: React.FC = () => {
  const {
    currentUser,
    hasFullAccess,
    language,
    selectedChapterId,
    setSelectedChapterId,
    setShowPaywallModal,
    completedChaptersCount,
    progressPercentage,
    isChapterCompleted,
    toggleChapterComplete,
    recordQuizScore,
    setActiveNavTab
  } = useApp();

  const [activeTab, setActiveTab] = useState<'study' | 'diagram' | 'casestudy' | 'quiz' | 'checklist'>('study');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});

  // Locate active chapter & module
  let currentModule = COURSE_MODULES[0];
  let currentChapter: Chapter = COURSE_MODULES[0].chapters[0];

  for (const mod of COURSE_MODULES) {
    const found = mod.chapters.find(c => c.id === selectedChapterId);
    if (found) {
      currentModule = mod;
      currentChapter = found;
      break;
    }
  }

  const isLocked = !hasFullAccess && !currentChapter.isFreeTrialAccessible;

  const toggleModuleCollapse = (modId: string) => {
    setCollapsedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    currentChapter.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Sidebar: Curriculum Navigator */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {language === 'am' ? 'የስልጠና ማውጫ' : 'Course Syllabus'}
              </span>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {language === 'am' ? 'የኢትዮጵያ ወጪና ገቢ ንግድ አካዳሚ' : 'Ethiopia Import & Export Academy'}
              </h2>
            </div>
            <span className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded">
              {language === 'am' ? '16 ምዕራፎች' : '16 Chapters'}
            </span>
          </div>

          {/* Student Progress Mini-Card */}
          <div className="my-3 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-neutral-700 dark:text-neutral-300">
                {language === 'am'
                  ? `የትምህርት ሂደት፦ ${completedChaptersCount}/16 ምዕራፎች`
                  : `Progress: ${completedChaptersCount}/16 Chapters`}
              </span>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-1 text-[10px] font-semibold">
              <button
                onClick={() => setActiveNavTab('progress')}
                className="text-neutral-600 dark:text-neutral-400 hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-1"
              >
                <span>{language === 'am' ? 'የትምህርት ሂደት መዝገብ' : 'Records Tracker'}</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
              <button
                onClick={() => setActiveNavTab('certificate')}
                className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>{language === 'am' ? 'የምስክር ወረቀት' : 'Certification'}</span>
                <Award className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Export Document Checklist Generator Quick Link */}
          <button
            onClick={() => {
              setActiveTab('checklist');
            }}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all mb-3 border ${
              activeTab === 'checklist'
                ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                : 'bg-amber-50/80 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <ClipboardCheck className={`w-4 h-4 ${activeTab === 'checklist' ? 'text-white' : 'text-amber-700 dark:text-amber-400'}`} />
              <span>{language === 'am' ? 'የወጪ ንግድ ሰነዶች ማረጋገጫ' : 'Export Checklist Tool'}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
              activeTab === 'checklist' ? 'bg-white/20 text-white' : 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100'
            }`}>
              {language === 'am' ? 'መሳሪያ' : 'Tool'}
            </span>
          </button>

          {/* Module list */}
          <div className="mt-3 space-y-3">
            {COURSE_MODULES.map(mod => {
              const isCollapsed = collapsedModules[mod.id];
              const isCurrentMod = mod.id === currentModule.id;
              const modTitle = MODULE_TRANSLATIONS[mod.id]?.title[language] || mod.title;

              return (
                <div key={mod.id} className="border border-neutral-200/70 dark:border-neutral-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleModuleCollapse(mod.id)}
                    className={`w-full px-3 py-2.5 flex items-center justify-between text-left transition-colors ${
                      isCurrentMod
                        ? 'bg-neutral-100/80 dark:bg-neutral-800/80 font-semibold'
                        : 'bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40'
                    }`}
                  >
                    <div className="pr-2">
                      <div className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                        {language === 'am' ? `ሞጁል ${mod.moduleNumber}` : `Module ${mod.moduleNumber}`}
                      </div>
                      <div className="text-xs text-neutral-800 dark:text-neutral-200 font-medium line-clamp-1">
                        {modTitle}
                      </div>
                    </div>
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    ) : (
                      <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  {!isCollapsed && (
                    <div className="p-1 space-y-1 bg-white dark:bg-neutral-900 divide-y divide-neutral-50 dark:divide-neutral-800/40">
                      {mod.chapters.map(ch => {
                        const isSelected = ch.id === currentChapter.id;
                        const chLocked = !hasFullAccess && !ch.isFreeTrialAccessible;
                        const chTitle = CHAPTER_TRANSLATIONS[ch.id]?.title[language] || ch.title;

                        return (
                          <button
                            key={ch.id}
                            onClick={() => {
                              setSelectedChapterId(ch.id);
                              setActiveTab('study');
                              setShowResults(false);
                            }}
                            className={`w-full px-3 py-2 text-left rounded-lg text-xs flex items-center justify-between transition-colors ${
                              isSelected
                                ? 'bg-amber-900 text-white font-medium shadow-xs'
                                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                            }`}
                          >
                            <div className="flex items-center gap-2 pr-2">
                              <span className="font-mono text-[10px] opacity-75">
                                {language === 'am' ? `ምዕራፍ ${ch.chapterNumber}` : `Ch ${ch.chapterNumber}`}
                              </span>
                              <span className="line-clamp-1">{chTitle}</span>
                            </div>

                            <div className="shrink-0 flex items-center gap-1.5">
                              {ch.isFreeTrialAccessible ? (
                                <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${
                                  isSelected ? 'bg-white/20 text-white' : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                                }`}>
                                  {language === 'am' ? 'ነፃ' : 'Free'}
                                </span>
                              ) : chLocked ? (
                                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                              ) : (
                                <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-emerald-600'}`} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Free trial user upgrade prompt */}
        {!hasFullAccess && (
          <div className="bg-amber-950 text-white rounded-2xl p-5 space-y-3 shadow-md border border-amber-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Full Academy Access</span>
            </div>
            <h3 className="text-base font-serif-title font-bold text-white">
              Unlock Chapters 3 through 16
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              You are currently on the Free Trial (Chapters 1 & 2). Subscribe for 3,900 Birr (Promotional 60% Discount!) via telebirr to 09 6768 4490 (Abdulkerim) to unlock all 16 chapters, trade calculation tools, and verified course certification.
            </p>
            <button
              onClick={() => setShowPaywallModal(true)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Subscribe Now (3,900 ETB · 60% Discount!)
            </button>
          </div>
        )}
      </div>

      {/* Right Main Pane: Content & Study Station */}
      <div className="lg:col-span-8 space-y-6">
        {/* Chapter Header Card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <span>MODULE {currentModule.moduleNumber}</span>
              <span>·</span>
              <span>CHAPTER {currentChapter.chapterNumber}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-neutral-500">
                <Clock className="w-3 h-3" />
                {currentChapter.estimatedMinutes} min read
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleChapterComplete(currentChapter.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border shadow-2xs ${
                  isChapterCompleted(currentChapter.id)
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-emerald-500'
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    isChapterCompleted(currentChapter.id) ? 'text-emerald-600' : 'text-neutral-400'
                  }`}
                />
                <span>
                  {isChapterCompleted(currentChapter.id)
                    ? (language === 'am' ? 'ተጠናቋል ✓' : 'Completed ✓')
                    : (language === 'am' ? 'እንደተጠናቀቀ ምልክት አድርግ' : 'Mark Complete')}
                </span>
              </button>

              <button
                onClick={() => setActiveNavTab('resources')}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-amber-700 dark:hover:text-amber-400 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                {language === 'am' ? 'መፍቻና ተጨማሪ ሰነዶች' : 'Glossary & Resources'}
              </button>

              {currentChapter.isFreeTrialAccessible ? (
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {language === 'am' ? 'ነፃ የሙከራ ምዕራፍ' : 'Free Trial Chapter'}
                </span>
              ) : (
                <span className="text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  {language === 'am' ? 'የተከፈለበት የአካዳሚ ምዕራፍ' : 'Paid Academy Chapter'}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-3">
            {CHAPTER_TRANSLATIONS[currentChapter.id]?.title[language] || currentChapter.title}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            {currentChapter.description}
          </p>

          {currentChapter.chapterNumber === 7 && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-transparent border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                  {language === 'am' ? 'ተግባራዊ የመለማመጃ መሳሪያ' : 'Interactive Practice Tool'}
                </span>
                <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {language === 'am'
                    ? 'የኢንኮተርምስ® 2020 መስተጋብራዊ የኃላፊነትና ወጪ መመሪያ'
                    : 'Incoterms® 2020 Interactive Stage & Responsibility Guide'}
                </p>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  {language === 'am'
                    ? 'በ11ዱ የኢትዮጵያ ንግድ ኮሪደር ደረጃዎች የወጪና የስጋት ድልድልን ይመርምሩ፣ የክርክር ጉዳዮችን ይፍቱ።'
                    : 'Inspect visual cost and risk division across 11 corridor stages, run dispute case studies, and use the decision wizard.'}
                </p>
              </div>
              <button
                onClick={() => setActiveNavTab('incoterms_guide')}
                className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                {language === 'am' ? 'የኢንኮተርምስ መመሪያን ክፈት' : 'Launch Incoterms Guide'} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Interactive sub-tabs */}
          {!isLocked && (
            <div className="flex flex-wrap gap-2 pt-5 border-t border-neutral-100 dark:border-neutral-800 mt-5">
              <button
                onClick={() => setActiveTab('study')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'study'
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'am' ? 'የጥናት መመሪያና ደንቦች' : 'Study Guide & Rules'}</span>
              </button>

              <button
                onClick={() => setActiveTab('diagram')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'diagram'
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Anchor className="w-3.5 h-3.5" />
                <span>{language === 'am' ? 'የሂደት ዲያግራም' : 'Visual Process Diagram'}</span>
              </button>

              {currentChapter.caseStudy && (
                <button
                  onClick={() => setActiveTab('casestudy')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === 'casestudy'
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{language === 'am' ? 'የኢትዮጵያ ተግባራዊ ጥናት' : 'Real Ethiopian Case Study'}</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'quiz'
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>
                  {language === 'am'
                    ? `የዕውቀት መመዘኛ ፈተና (${currentChapter.quiz.length} ጥያቄዎች)`
                    : `Interactive Quiz (${currentChapter.quiz.length} Qs)`}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'checklist'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/60'
                }`}
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>{language === 'am' ? 'የሰነዶች ማረጋገጫ ዝርዝር' : 'Document Checklist Generator'}</span>
              </button>
            </div>
          )}
        </div>

        {/* LOCKED CHAPTER PAYWALL OVERLAY */}
        {isLocked ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/60 rounded-full flex items-center justify-center mx-auto text-amber-700 dark:text-amber-400">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
                {currentUser.subscriptionStatus === 'expired'
                  ? (language === 'am' ? 'የአባልነት ጊዜ አልቋል' : 'Subscription Expired')
                  : (language === 'am' ? 'የአባልነት ምዝገባ ያስፈልጋል' : 'Subscription Required')}
              </span>
              <h2 className="text-2xl font-serif-title font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                {currentUser.subscriptionStatus === 'expired'
                  ? (language === 'am' ? 'የ30 ቀናት የአባልነት ጊዜዎ አልቋል' : 'Your 30-Day Subscription Has Expired')
                  : (language === 'am'
                      ? `ምዕራፍ ${currentChapter.chapterNumber} በነፃ ሙከራ የተቆለፈ ነው`
                      : `Chapter ${currentChapter.chapterNumber} is locked in Free Trial`)}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto mt-2">
                {currentUser.subscriptionStatus === 'expired'
                  ? (language === 'am'
                      ? 'የቀደመው የ30 ቀናት መዳረሻዎ አብቅቷል። ሁሉንም 16 ምዕራፎችና የምስክር ወረቀት ለማግኘት በቴሌብር 3,900 ብር (ልዩ የ60% ቅናሽ!) ወደ 09 6768 4490 (አብዱልከሪም) በመላክ ያድሱ።'
                      : 'Your previous 30-day access period has ended. Renew your subscription for 3,900 Birr (Promotional 60% Discount!) per 30 days via telebirr to 09 6768 4490 (Abdulkerim) to regain access to all chapters and practical tools.')
                  : (language === 'am'
                      ? `ምዕራፍ 1 እና 2 በነፃ ማጥናት ይችላሉ። ከምዕራፍ ${currentChapter.chapterNumber} እስከ 16 ያሉትን ሁሉንም ትምህርቶች ለመክፈት በቴሌብር 3,900 ብር (ልዩ የ60% ቅናሽ!) ወደ 09 6768 4490 (አብዱልከሪም) በመላክ ይመዝገቡ።`
                      : `Chapters 1 and 2 are free to study. To unlock Chapter ${currentChapter.chapterNumber} through Chapter 16 and access the full academy tools, please subscribe for 3,900 Birr (Promotional 60% Discount!) per 30 days via telebirr to 09 6768 4490 (Abdulkerim).`)}
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl max-w-md mx-auto text-left text-xs space-y-2.5 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {currentUser.subscriptionStatus === 'expired'
                    ? 'Renew for 3,900 ETB Full Access:'
                    : 'What you unlock with 30-Day Subscription:'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-600 text-white">
                  60% Off Promo!
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All 16 Chapters: Customs, Djibouti corridor, dry ports, coffee, FX hedging</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full & Partial LC Settlement financial calculator (10 units case)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Customs Tax 7-tier Assessment tool with downloadable notice</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Academy Certificate issued in your name</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 text-[11px] text-amber-800 dark:text-amber-300">
                telebirr transfer: <strong>09 6768 4490 (Abdulkerim)</strong> · Approved by <strong>@EximmanAbdIstad</strong>
              </div>
            </div>

            <button
              onClick={() => setShowPaywallModal(true)}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
            >
              {currentUser.subscriptionStatus === 'expired'
                ? 'Resubscribe for 3,900 ETB (Promotional 60% Discount!)'
                : 'Subscribe via telebirr (3,900 ETB · Promotional 60% Discount!)'}
            </button>
          </div>
        ) : (
          /* UNLOCKED CONTENT TABS */
          <div className="space-y-6">
            {/* TAB 1: STUDY GUIDE */}
            {activeTab === 'study' && (
              <div className="space-y-6">
                {/* Authentic Documentary Illustration/Photograph if available */}
                {currentChapter.imageUrl && (
                  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
                    <img
                      src={currentChapter.imageUrl}
                      alt={currentChapter.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-56 sm:h-72 md:h-80 object-cover"
                    />
                    {currentChapter.imageCaption && (
                      <div className="px-4 py-2.5 bg-neutral-50/80 dark:bg-neutral-800/60 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                        <span className="font-semibold text-amber-700 dark:text-amber-400">FIELD DOCUMENTATION:</span>
                        <span>{currentChapter.imageCaption}</span>
                      </div>
                    )}
                  </div>
                )}

                {currentChapter.sections.map(sec => (
                  <div
                    key={sec.id}
                    className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4"
                  >
                    <h3 className="text-lg font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                      {sec.title}
                    </h3>

                    <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line space-y-3">
                      {sec.content}
                    </div>

                    {/* Regulation or Pro Tip Callout Box */}
                    {sec.callout && (
                      <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 p-4 rounded-r-xl space-y-1">
                        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-xs uppercase tracking-wider">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>{sec.callout.title}</span>
                        </div>
                        <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                          {sec.callout.text}
                        </p>
                      </div>
                    )}

                    {/* Key Takeaways */}
                    {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                          Key Executive Takeaways
                        </div>
                        <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                          {sec.keyTakeaways.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}

                {/* Export Commodity Document Checklist Interactive Gateway Banner */}
                <div className="bg-gradient-to-r from-amber-900/10 via-amber-800/10 to-stone-900/10 dark:from-amber-950/40 dark:via-stone-900/40 dark:to-neutral-900 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-white uppercase tracking-wider">
                        Curriculum Toolkit
                      </span>
                      <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                        Step-by-Step Export Document Checklist Generator
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Identify exact documents required for your specific commodity (Certificates of Origin, Packing List, Commercial Invoice, e-SAD, Phytosanitary, Halal) across all 5 Ethiopian export phases.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('checklist')}
                    className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-xs"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>Launch Checklist Generator</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: VISUAL PROCESS DIAGRAM */}
            {activeTab === 'diagram' && (
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                    Process Roadmap & Operational Architecture
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Visual end-to-end procedural workflow as practiced in Ethiopian commercial logistics.
                  </p>
                </div>

                {/* Corridor Flow Diagram */}
                {(currentChapter.diagramType === 'corridor_flow' || currentChapter.moduleId === 'mod-3') && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800 text-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center mx-auto text-xs">
                          1
                        </div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                          Port of Djibouti (Doraleh)
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          Vessel discharge, THC fees (386,530 ETB/unit), customs transit seal.
                        </div>
                      </div>

                      <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800 text-center">
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center mx-auto text-xs">
                          2
                        </div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                          Transit Corridor Trucking
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          Galafi border crossing, 850km transit (549,194 ETB/unit trucking).
                        </div>
                      </div>

                      <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800 text-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold flex items-center justify-center mx-auto text-xs">
                          3
                        </div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                          Mojo / Indode Dry Port
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          e-SAD declaration, Customs inspection (Green/Yellow/Red channel).
                        </div>
                      </div>

                      <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800 text-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center mx-auto text-xs">
                          4
                        </div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                          Delivery & Assembly
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          Transport to Anhama warehouse (35k ETB), assembly (2.4M ETB).
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tax Cascade Diagram */}
                {(currentChapter.diagramType === 'tax_cascade' || currentChapter.moduleId === 'mod-4') && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Ethiopian Customs Cascading Tax Hierarchy
                    </div>
                    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden divide-y divide-neutral-200 dark:divide-neutral-700 text-xs">
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 flex justify-between items-center">
                        <span className="font-semibold">Step 1 · Duty Paying Value (DPV)</span>
                        <span className="font-mono text-neutral-600 dark:text-neutral-400">CIF ETB = FOB + Freight + Insurance</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-900 flex justify-between items-center">
                        <span className="font-semibold">Step 2 · Import Customs Duty (Code 01)</span>
                        <span className="font-mono text-neutral-600 dark:text-neutral-400">CIF × Duty % (0% - 35%)</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-900 flex justify-between items-center">
                        <span className="font-semibold">Step 3 · Excise Tax (Code 03)</span>
                        <span className="font-mono text-neutral-600 dark:text-neutral-400">(CIF + Duty) × Excise %</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-900 flex justify-between items-center">
                        <span className="font-semibold">Step 4 · Surtax (Code 05)</span>
                        <span className="font-mono text-neutral-600 dark:text-neutral-400">(CIF + Duty + Excise) × 10%</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-900 flex justify-between items-center">
                        <span className="font-semibold">Step 5 · Social Welfare Tax (Code 12)</span>
                        <span className="font-mono text-neutral-600 dark:text-neutral-400">CIF × 3%</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-900 flex justify-between items-center font-bold text-amber-800 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20">
                        <span>Step 6 · Value Added Tax (Code 04)</span>
                        <span className="font-mono">(CIF + Duty + Excise + Surtax + Social Welfare) × 15%</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-900 flex justify-between items-center">
                        <span className="font-semibold">Step 7 · Withholding (Code 15) & Scanning (Code 16)</span>
                        <span className="font-mono text-neutral-600 dark:text-neutral-400">CIF × 3% WHT + CIF × 0.07% Scanning</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* LC Lifecycle Diagram */}
                {(currentChapter.diagramType === 'lc_lifecycle' || currentChapter.moduleId === 'mod-2' || currentChapter.moduleId === 'mod-6') && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Letter of Credit (L/C) Opening to Retirement Lifecycle
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl space-y-2">
                        <div className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                          Stage 1: Opening Payments
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          Importer pays 30% to 50% Margin cash hold, 4% bank commission, 15% VAT on commission, and SWIFT transmission fees.
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl space-y-2">
                        <div className="font-bold text-blue-900 dark:text-blue-200 text-sm">
                          Stage 2: 60-90 Days Transit
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          Supplier ships cargo from China to Djibouti. Importer monitors currency exchange rate shifts (+1.8% to +2.5% monthly).
                        </p>
                      </div>

                      <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
                        <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                          Stage 3: Settlement Debit
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          Original documents arrive. Bank settles remaining 50% or 70% at new settlement rate + 2.5% statutory NBE fee.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Port Comparison Diagram */}
                {currentChapter.diagramType === 'port_comparison' && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Regional Maritime Corridor Comparison Matrix
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl space-y-2">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 block text-sm">
                          1. Djibouti (Doraleh DCT / DMP)
                        </span>
                        <div className="text-neutral-600 dark:text-neutral-400 space-y-1">
                          <div><strong>Volume:</strong> 90% of Ethiopian foreign trade</div>
                          <div><strong>Distance to Addis:</strong> 850 km</div>
                          <div><strong>Advantage:</strong> Direct electric railway to Mojo</div>
                          <div><strong>Constraint:</strong> High port tariffs & container demurrage</div>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl space-y-2">
                        <span className="font-bold text-amber-900 dark:text-amber-200 block text-sm">
                          2. Port of Berbera (DP World)
                        </span>
                        <div className="text-neutral-600 dark:text-neutral-300 space-y-1">
                          <div><strong>Volume:</strong> Rapidly growing Eastern corridor</div>
                          <div><strong>Distance to Dire Dawa:</strong> 310 km (40% shorter)</div>
                          <div><strong>Advantage:</strong> Fastest transit for Eastern Free Trade Zone</div>
                          <div><strong>Constraint:</strong> Bilateral customs transit formalities</div>
                        </div>
                      </div>

                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl space-y-2">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 block text-sm">
                          3. Port of Lamu (LAPSSET)
                        </span>
                        <div className="text-neutral-600 dark:text-neutral-400 space-y-1">
                          <div><strong>Volume:</strong> Southern Ethiopia gateway</div>
                          <div><strong>Distance to Hawassa:</strong> ~750 km</div>
                          <div><strong>Advantage:</strong> Ultra-deep natural harbor</div>
                          <div><strong>Constraint:</strong> Cross-border road infrastructure phases</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FX Hedging Architecture Diagram */}
                {currentChapter.diagramType === 'fx_hedging' && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Foreign Exchange Risk Protection Flow
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Pillar 1</span>
                        <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">Natural Export Hedge</div>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          Utilize 50% NBE Forex Retention balance to fund import L/Cs with 0% currency conversion exposure.
                        </p>
                      </div>

                      <div className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Pillar 2</span>
                        <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">100% Margin Lock</div>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          Negotiate full cash margin collateral with the issuing bank to freeze the exchange rate on opening day.
                        </p>
                      </div>

                      <div className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Pillar 3</span>
                        <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">Sales Contract Indexing</div>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          Incorporate contractual NBE exchange rate indexing clauses in local supply contracts to pass through currency adjustments.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PCA Post Clearance Audit Diagram */}
                {currentChapter.diagramType === 'pca_audit' && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Ethiopian Customs 3-Year Post-Clearance Audit Roadmap
                    </div>
                    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl divide-y divide-neutral-200 dark:divide-neutral-700 text-xs">
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 flex justify-between items-center">
                        <span className="font-semibold">Day 0: Cargo Release at Dry Port</span>
                        <span className="font-mono text-neutral-500">e-SAD Assessment Notice cleared</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-900 flex justify-between items-center">
                        <span className="font-semibold">Year 1 to 3: Statutory Audit Window</span>
                        <span className="font-mono text-neutral-500">PCA Directorate can request transaction records</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-900 flex justify-between items-center font-bold text-amber-800 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20">
                        <span>Mandatory Document Archive (5 Years)</span>
                        <span className="font-mono">Invoices, Swift Advices, Bill of Lading & Stock Cards</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: REAL ETHIOPIAN CASE STUDY */}
            {activeTab === 'casestudy' && currentChapter.caseStudy && (
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    <Briefcase className="w-4 h-4" />
                    <span>Real-World Business Simulation</span>
                  </div>
                  <h3 className="text-xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                    {currentChapter.caseStudy.title}
                  </h3>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Target Commodity: <strong>{currentChapter.caseStudy.commodity}</strong>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800/60 p-4 rounded-xl text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                    The Business Problem:
                  </div>
                  {currentChapter.caseStudy.scenario}
                </div>

                {/* Real-world Data Cards */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Key Financial Parameters
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(currentChapter.caseStudy.realWorldData).map(([k, v]) => (
                      <div
                        key={k}
                        className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 shadow-xs"
                      >
                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400">{k}</span>
                        <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 font-mono-numbers mt-0.5">
                          {v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow execution */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Executed Logistics Workflow
                  </div>
                  <div className="space-y-2">
                    {currentChapter.caseStudy.logisticsWorkflow.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl text-xs text-neutral-700 dark:text-neutral-300"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solution summary */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Commercial Takeaway & Financial Result</span>
                  </div>
                  <p className="text-xs text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
                    {currentChapter.caseStudy.solutionSummary}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: INTERACTIVE QUIZ & QUESTIONNAIRE */}
            {activeTab === 'quiz' && (
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div>
                    <h3 className="text-lg font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                      Chapter Mastery Questionnaire
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Test your understanding of the regulations, cost mechanics, and procedures covered in this chapter.
                    </p>
                  </div>
                  {showResults && (
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-lg">
                        Score: {calculateScore()} / {currentChapter.quiz.length}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {currentChapter.quiz.map((q, qIndex) => {
                    const selected = selectedAnswers[q.id];
                    const isAnswered = selected !== undefined;
                    const isCorrect = isAnswered && selected === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50"
                      >
                        <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 flex items-start gap-2">
                          <span className="font-mono text-amber-700 dark:text-amber-400">
                            Q{qIndex + 1}.
                          </span>
                          <span>{q.question}</span>
                        </div>

                        <div className="space-y-2">
                          {q.options.map((opt, optIndex) => {
                            const isThisSelected = selected === optIndex;
                            let btnStyle = 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300';

                            if (showResults) {
                              if (optIndex === q.correctIndex) {
                                btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                              } else if (isThisSelected && !isCorrect) {
                                btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 line-through';
                              }
                            } else if (isThisSelected) {
                              btnStyle = 'border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold';
                            }

                            return (
                              <button
                                key={optIndex}
                                onClick={() => handleOptionSelect(q.id, optIndex)}
                                className={`w-full p-3 rounded-lg border text-left text-xs flex items-center justify-between transition-colors ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {showResults && optIndex === q.correctIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {showResults && (
                          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs space-y-1">
                            <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                              Official Regulatory Explanation:
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quiz controls */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={resetQuiz}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  >
                    Reset Answers
                  </button>

                  {!showResults ? (
                    <button
                      onClick={() => {
                        setShowResults(true);
                        const score = calculateScore();
                        recordQuizScore(currentChapter.id, score, currentChapter.quiz.length);
                      }}
                      className="px-5 py-2.5 bg-neutral-900 hover:bg-black dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Submit & Check Answers
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        // find next chapter if available
                        const allChapters = COURSE_MODULES.flatMap(m => m.chapters);
                        const currentIndex = allChapters.findIndex(c => c.id === currentChapter.id);
                        if (currentIndex < allChapters.length - 1) {
                          setSelectedChapterId(allChapters[currentIndex + 1].id);
                          setActiveTab('study');
                          setShowResults(false);
                          setSelectedAnswers({});
                        }
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      <span>Proceed to Next Chapter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: STEP-BY-STEP EXPORT DOCUMENT CHECKLIST GENERATOR */}
            {activeTab === 'checklist' && (
              <ExportDocumentChecklistGenerator
                initialCommodity={
                  currentChapter.chapterNumber === 13 || currentChapter.chapterNumber === 14
                    ? 'coffee'
                    : 'coffee'
                }
                onOpenChapter={(chId) => {
                  setSelectedChapterId(chId);
                  setActiveTab('study');
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
