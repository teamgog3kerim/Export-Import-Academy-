import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSE_MODULES } from '../data/courseData';
import {
  CheckCircle2,
  Clock,
  Lock,
  Award,
  BookOpen,
  Printer,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck,
  RotateCcw,
  Shield,
  HelpCircle,
  Calculator,
  User,
  Calendar
} from 'lucide-react';

export const RecordsTracker: React.FC = () => {
  const {
    currentUser,
    hasFullAccess,
    completedChaptersCount,
    progressPercentage,
    isChapterCompleted,
    toggleChapterComplete,
    quizScores,
    setSelectedChapterId,
    setActiveNavTab,
    setShowPaywallModal
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // Flatten all 16 chapters
  const allChapters = COURSE_MODULES.flatMap(mod =>
    mod.chapters.map(ch => ({
      ...ch,
      moduleNumber: mod.moduleNumber,
      moduleTitle: mod.title
    }))
  );

  // Calculate quiz statistics
  const quizAttemptedCount = Object.keys(quizScores).length;
  let totalScoreEarned = 0;
  let totalMaxScore = 0;
  Object.values(quizScores).forEach(q => {
    totalScoreEarned += q.score;
    totalMaxScore += q.maxScore;
  });
  const averageQuizPct = totalMaxScore > 0 ? Math.round((totalScoreEarned / totalMaxScore) * 100) : 0;

  // Filtered chapters for table
  const displayedChapters = allChapters.filter(ch => {
    const completed = isChapterCompleted(ch.id);
    if (filter === 'completed') return completed;
    if (filter === 'pending') return !completed;
    return true;
  });

  const isEligibleForCert = completedChaptersCount === allChapters.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Student Dossier Header Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <FileCheck className="w-4 h-4" />
              <span>Learning Progress & Performance Tracker</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              {currentUser.fullName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>{currentUser.email || 'No email saved'}</span>
              </span>
              <span>·</span>
              {currentUser.phoneNumber && <span>Mobile: {currentUser.phoneNumber}</span>}
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>Enrolled: {new Date(currentUser.registeredAt).toLocaleDateString()}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                currentUser.role === 'admin'
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                  : currentUser.subscriptionStatus === 'active_paid'
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                  : currentUser.subscriptionStatus === 'pending_approval'
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
              }`}>
                {currentUser.role === 'admin'
                  ? 'Program Administrator'
                  : currentUser.subscriptionStatus === 'active_paid'
                  ? 'Paid 30-Day Subscription (Active)'
                  : currentUser.subscriptionStatus === 'pending_approval'
                  ? 'Payment Pending Approval (3,900 ETB)'
                  : currentUser.subscriptionStatus === 'expired'
                  ? '30-Day Subscription Expired (Renew for 3,900 Birr)'
                  : 'Free Trial (Module 1, Ch 1 & 2)'}
              </span>

              {currentUser.expiresAt && (
                <span className={`text-xs font-mono ${
                  currentUser.subscriptionStatus === 'expired' ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-neutral-500'
                }`}>
                  {currentUser.subscriptionStatus === 'expired'
                    ? `Expired on ${new Date(currentUser.expiresAt).toLocaleDateString()} · Renew for 3,900 Birr`
                    : `Valid until: ${new Date(currentUser.expiresAt).toLocaleDateString()}`}
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 no-print">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print progress summary</span>
            </button>

            <button
              onClick={() => setActiveNavTab('certificate')}
              className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs ${
                isEligibleForCert
                  ? 'bg-amber-700 hover:bg-amber-800 text-white'
                  : 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{isEligibleForCert ? 'View Executive Certificate' : 'Certificate Status'}</span>
            </button>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Academy Course Progress
              </span>
              <span className="text-xs font-mono text-neutral-400">
                ({completedChaptersCount} of 16 Chapters Completed)
              </span>
            </div>
            <span className="text-sm font-bold font-mono text-amber-700 dark:text-amber-400">
              {progressPercentage}%
            </span>
          </div>

          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-700 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Chapters Finished</span>
            <BookOpen className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-2">
            {completedChaptersCount} <span className="text-xs text-neutral-400 font-sans">/ 16</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            {16 - completedChaptersCount} remaining to graduate
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Quizzes Passed</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-2">
            {quizAttemptedCount} <span className="text-xs text-neutral-400 font-sans">tests</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Avg mastery score: {averageQuizPct}%
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Financial Tools</span>
            <Calculator className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-2">
            3 <span className="text-xs text-neutral-400 font-sans">Calculators</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Landed Cost, LC Debits & Customs Tax
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Diploma Readiness</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-2 flex items-center gap-1.5">
            {isEligibleForCert ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Qualified for Issue
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400">
                {allChapters.length - completedChaptersCount} lessons left
              </span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Local course-completion record · not a verified qualification
          </p>
        </div>
      </div>

      {/* Module Breakdown Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
          Curriculum Module Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSE_MODULES.map(mod => {
            const modTotal = mod.chapters.length;
            const modDone = mod.chapters.filter(c => isChapterCompleted(c.id)).length;
            const modPct = Math.round((modDone / modTotal) * 100);

            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Module {mod.moduleNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    {modDone}/{modTotal} ({modPct}%)
                  </span>
                </div>

                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                  {mod.title}
                </h4>

                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full transition-all"
                    style={{ width: `${modPct}%` }}
                  />
                </div>

                <div className="text-[11px] text-neutral-500 space-y-1 pt-1">
                  {mod.chapters.map(c => {
                    const done = isChapterCompleted(c.id);
                    return (
                      <div key={c.id} className="flex items-center justify-between text-[11px]">
                        <span className="line-clamp-1">Ch {c.chapterNumber}: {c.title}</span>
                        {done ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        ) : (
                          <Clock className="w-3 h-3 text-neutral-400 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 16-Chapter Detailed Audit Ledger Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h2 className="text-lg font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
              Lesson Completion & Module Status
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Track completion, review quiz examination scores, and manage your course milestones.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl no-print text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
          All ({allChapters.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'completed'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Completed ({completedChaptersCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Pending ({16 - completedChaptersCount})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-3 px-3">Chapter #</th>
                <th className="py-3 px-3">Title & Module</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Quiz Result</th>
                <th className="py-3 px-3 text-right no-print">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {displayedChapters.map(ch => {
                const completed = isChapterCompleted(ch.id);
                const isLocked = !hasFullAccess && !ch.isFreeTrialAccessible;
                const scoreInfo = quizScores[ch.id];

                return (
                  <tr
                    key={ch.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-amber-800 dark:text-amber-400">
                      Ch {ch.chapterNumber}
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {ch.title}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Module {ch.moduleNumber}: {ch.moduleTitle}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      {completed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Completed</span>
                        </span>
                      ) : isLocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                          <Lock className="w-3 h-3" />
                          <span>Requires 3,900 ETB</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending Study</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 font-mono">
                      {scoreInfo ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            {scoreInfo.score}/{scoreInfo.maxScore}
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            ({Math.round((scoreInfo.score / scoreInfo.maxScore) * 100)}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-neutral-400 text-[11px]">Not tested</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-right space-x-2 no-print">
                      {isLocked ? (
                        <button
                          onClick={() => setShowPaywallModal(true)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-700 hover:bg-amber-800 text-white transition-colors"
                        >
                          Subscribe (3,900 ETB · 60% Off)
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleChapterComplete(ch.id)}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                              completed
                                ? 'border-neutral-200 text-neutral-500 hover:bg-neutral-100 dark:border-neutral-700'
                                : 'border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                            }`}
                          >
                            {completed ? 'Mark Pending' : 'Mark Done'}
                          </button>

                          <button
                            onClick={() => {
                              setSelectedChapterId(ch.id);
                              setActiveNavTab('curriculum');
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90 transition-colors"
                          >
                            Study
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
