import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSE_MODULES } from '../data/courseData';
import {
  Award,
  CheckCircle2,
  Printer,
  Download,
  Share2,
  Shield,
  ShieldCheck,
  Calendar,
  User,
  ExternalLink,
  Sparkles,
  Lock,
  ArrowRight,
  QrCode,
  Edit3,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';

export const CertificationView: React.FC = () => {
  const {
    currentUser,
    completedChaptersCount,
    issueCertificate,
    setActiveNavTab,
    setShowPaywallModal,
    quizScores,
    completeAllCoursesAndQuizzes,
    resetCoursesAndQuizzes
  } = useApp();

  const [studentName, setStudentName] = useState(currentUser.fullName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showIncompleteAlert, setShowIncompleteAlert] = useState(false);
  useEffect(() => setStudentName(currentUser.fullName), [currentUser.id, currentUser.fullName]);

  const allChapters = COURSE_MODULES.flatMap(module => module.chapters);
  const totalChapters = allChapters.length; // 16
  const isChaptersComplete = completedChaptersCount >= totalChapters;
  const completedQuizzesCount = allChapters.filter(ch => Boolean(quizScores?.[ch.id])).length;
  const isQuizzesComplete = completedQuizzesCount >= totalChapters;
  const isFullyComplete = isChaptersComplete && isQuizzesComplete;

  useEffect(() => {
    if (isFullyComplete && !currentUser.certificateIssuedAt) {
      issueCertificate();
    }
  }, [isFullyComplete, currentUser.certificateIssuedAt, issueCertificate]);

  const certificateId = currentUser.certificateId || (isFullyComplete ? 'ET-IMPEX-2026-ACTIVE' : 'Locked (Finish courses & questions)');
  const issueDate = currentUser.certificateIssuedAt
    ? new Date(currentUser.certificateIssuedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : isFullyComplete
    ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Not eligible yet';

  const handlePrint = () => {
    if (!isFullyComplete) {
      setShowIncompleteAlert(true);
      return;
    }
    window.print();
  };

  const handleDownload = () => {
    if (!isFullyComplete) {
      setShowIncompleteAlert(true);
      return;
    }
    window.print();
  };

  const handleCopyVerification = async () => {
    if (!isFullyComplete) {
      setShowIncompleteAlert(true);
      return;
    }
    try {
      await navigator.clipboard.writeText(certificateId);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Control Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xs no-print space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
              <Award className="w-4 h-4" />
              <span>Verified Course-Completion Certificate</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50">
              Executive Certification in Ethiopian Foreign Trade
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Official credential issued upon completion of all 16 curriculum chapters and examination requirements.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (!isFullyComplete) {
                  setShowIncompleteAlert(true);
                  return;
                }
                handleDownload();
              }}
              className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                !isFullyComplete
                  ? 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
              title={!isFullyComplete ? 'complete your course first !' : 'Download certificate'}
            >
              {!isFullyComplete ? (
                <Lock className="w-4 h-4 text-amber-700 dark:text-amber-300" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{!isFullyComplete ? 'Download (Locked)' : 'Download Certificate'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isFullyComplete) {
                  setShowIncompleteAlert(true);
                  return;
                }
                handlePrint();
              }}
              className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                !isFullyComplete
                  ? 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                  : 'bg-amber-700 hover:bg-amber-800 text-white'
              }`}
              title={!isFullyComplete ? 'complete your course first !' : 'Print course record'}
            >
              <Printer className="w-4 h-4" />
              <span>{!isFullyComplete ? 'Print (Locked)' : 'Print course record'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isFullyComplete) {
                  setShowIncompleteAlert(true);
                  return;
                }
                handleCopyVerification();
              }}
              className="py-2.5 px-3.5 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <ShieldCheck className="w-4 h-4 text-emerald-600" />}
              <span>{copiedLink ? 'ID copied' : isFullyComplete && currentUser.certificateIssuedAt ? 'Copy certificate ID' : 'Certificate ID (Locked)'}</span>
            </button>
          </div>
        </div>

        {/* Completion Status Alert */}
        {!isFullyComplete ? (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Curriculum Progress: {completedChaptersCount}/{totalChapters} Chapters · {completedQuizzesCount}/{totalChapters} Quizzes Completed
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white">
                  Certificate Locked
                </span>
              </div>
              <p className="text-amber-800/90 dark:text-amber-300/80 leading-relaxed text-[11px]">
                Users who haven't finished the full courses and questions are not allowed to view or download the certificate. Complete all 16 chapters and answer all question quizzes to unlock your credential.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowIncompleteAlert(true)}
                className="py-2.5 px-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs transition shadow-2xs flex items-center gap-1.5 animate-pulse cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
                <span>complete your course first !</span>
              </button>
              <button
                onClick={() => setActiveNavTab('progress')}
                className="py-2.5 px-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 font-semibold rounded-xl text-xs hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"
              >
                Go to Tracker
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900 dark:text-emerald-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">Course and questions complete!</span> Official verified credential unlocked. You are authorized to view and download your certificate.
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrint}
                className="py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print Now</span>
              </button>
            </div>
          </div>
        )}

        {/* Name Customization */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
          <span className="text-neutral-500 font-medium">Recipient Name on Diploma:</span>
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold"
              />
              <button
                onClick={() => setIsEditingName(false)}
                className="px-2 py-1 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md font-bold text-[11px]"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-900 dark:text-neutral-100">{studentName}</span>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          THE OFFICIAL CERTIFICATE / DIPLOMA (PRINTABLE CONTAINER)
          Targeted by CSS Selector: div#root > div > main > div > div:nth-of-type(2)
          ========================================================================= */}
      <div
        className={`certificate-print-wrapper relative overflow-hidden rounded-3xl transition-all duration-300 ${
          !isFullyComplete
            ? 'border-4 border-dashed border-amber-400/80 dark:border-amber-700/80 bg-neutral-100/90 dark:bg-neutral-900/90 shadow-lg min-h-[520px] sm:min-h-[600px] flex items-center justify-center p-6'
            : 'bg-white dark:bg-neutral-900 border-8 border-amber-900/20 dark:border-amber-700/30 p-6 sm:p-10 md:p-14 shadow-2xl text-neutral-900 dark:text-neutral-100'
        }`}
      >
        {!isFullyComplete ? (
          <>
            {/* Obscured / Blurred Silhouette of Diploma - Users cannot view certificate */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none select-none blur-xl opacity-20 dark:opacity-15 scale-105 overflow-hidden filter grayscale"
            >
              <div className="p-8 space-y-6">
                <div className="w-24 h-24 rounded-full bg-amber-900 mx-auto" />
                <div className="h-8 bg-neutral-400 rounded-lg max-w-md mx-auto" />
                <div className="h-12 bg-neutral-400 rounded-lg max-w-sm mx-auto" />
                <div className="h-6 bg-neutral-300 rounded max-w-xl mx-auto" />
                <div className="h-24 bg-neutral-300 rounded-xl max-w-lg mx-auto" />
                <div className="h-16 bg-neutral-400 rounded-lg max-w-xs mx-auto" />
              </div>
            </div>

            {/* Locked Protection Shield & Prominent Pop-up Alert Button */}
            <div className="relative z-10 max-w-md w-full mx-auto p-6 sm:p-8 text-center space-y-5">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-700 p-1 shadow-xl flex items-center justify-center text-white">
                  <div className="w-full h-full rounded-[22px] bg-white dark:bg-neutral-900 flex items-center justify-center text-amber-700 dark:text-amber-400">
                    <Lock className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-white shadow-md text-xs">
                  <AlertTriangle className="w-4 h-4" />
                </span>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  Official Credential Locked
                </span>
                <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50 tracking-tight">
                  Certificate Protected
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed max-w-sm mx-auto">
                  Users who didn't finish the full courses and questions are not allowed to view or download the certificate.
                </p>
              </div>

              {/* THE REQUESTED POP UP ALERT BUTTON */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowIncompleteAlert(true)}
                  className="w-full sm:w-auto mx-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 active:scale-95 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer border border-amber-400/50"
                  title="Click to view course completion requirements"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-200 animate-pulse" />
                  <span>complete your course first !</span>
                </button>
              </div>

              {/* Progress Counters Badge */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 text-left">
                <div className={`p-3 rounded-2xl border text-xs ${
                  isChaptersComplete
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-white/80 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Course Lessons</span>
                  <div className="font-serif-title font-bold text-base mt-0.5 flex items-center justify-between">
                    <span>{completedChaptersCount} / {totalChapters}</span>
                    {isChaptersComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] text-amber-600 font-sans font-semibold">Pending</span>
                    )}
                  </div>
                </div>

                <div className={`p-3 rounded-2xl border text-xs ${
                  isQuizzesComplete
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-white/80 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Question Quizzes</span>
                  <div className="font-serif-title font-bold text-base mt-0.5 flex items-center justify-between">
                    <span>{completedQuizzesCount} / {totalChapters}</span>
                    {isQuizzesComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] text-amber-600 font-sans font-semibold">Pending</span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 pt-1">
                Finish all 16 chapters and answer all question quizzes to view and download your certificate.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Subtle Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none">
              <Shield className="w-[600px] h-[600px] text-amber-900" />
            </div>

            {/* Inner Ornamental Border */}
            <div className="border-2 border-amber-800/40 dark:border-amber-600/40 p-6 md:p-10 rounded-2xl relative space-y-8 bg-gradient-to-b from-amber-50/20 to-transparent dark:from-amber-950/10">
              {/* Certificate Header with Ethiopian Crest Motif */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-0.5 bg-amber-800/60 dark:bg-amber-600/60" />
                  <div className="w-10 h-10 rounded-full bg-amber-900 flex items-center justify-center text-amber-300 font-serif-title font-bold text-lg shadow-sm">
                    ET
                  </div>
                  <div className="w-12 h-0.5 bg-amber-800/60 dark:bg-amber-600/60" />
                </div>

                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 mt-2">
                  OFFICIAL ACADEMY CREDENTIAL
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif-title font-bold tracking-wider text-amber-900 dark:text-amber-400 uppercase">
                  Ethiopia Import, Export & Logistics Academy
                </h2>

                <div className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 font-semibold">
                  Center for Continuing Trade Finance, Customs Valuation & Corridor Logistics Mastery
                </div>
              </div>

              {/* Main Statement */}
              <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
                <div className="text-xs sm:text-sm uppercase tracking-widest font-sans text-neutral-400 dark:text-neutral-500 font-semibold">
                  This is to certify that
                </div>

                <div className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 tracking-tight border-b-2 border-amber-700/30 pb-3 inline-block px-6">
                  {studentName}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans pt-2">
                  has satisfactorily completed the rigorous professional training curriculum, real-world case studies, and advanced financial modeling examinations to earn the credential of:
                </p>

                <div className="bg-amber-100/70 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 rounded-xl p-4 my-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif-title font-bold text-amber-950 dark:text-amber-200">
                    Course Completion · Ethiopian Import, Export & Logistics
                  </h3>
                </div>
              </div>

              {/* Competency Syllabus Summary */}
              <div className="max-w-3xl mx-auto pt-2">
                <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 text-center mb-2">
                  Topics covered in the curriculum:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-400 font-sans">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>NBE Forex Directives & Market-Determined Hedging</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>Ethiopian Single Window (trade.esw.et) e-SAD Declarations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>Letter of Credit (LC) Margins, Commissions & Settlement</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>Djibouti & Regional Corridors, Demurrage & Dry Ports</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>Customs 7-Tier Tax Stacking (Codes 01, 03, 05, 12, 04, 15, 16)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>ECX Coffee & Agro-Exports with 50% NBE Forex Retention</span>
                  </div>
                </div>
              </div>

              {/* Academy Signatures & Seal */}
              <div className="pt-8 border-t border-amber-800/30 dark:border-amber-700/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-1">
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    Ethio-ImpEx Academy
                  </div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    Curriculum Verified
                  </div>
                </div>

                <div className="relative shrink-0 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-700 p-1 shadow-lg flex items-center justify-center text-center">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-amber-950 flex flex-col items-center justify-center bg-amber-500 text-amber-950 p-1">
                      <ShieldCheck className="w-6 h-6" />
                      <span className="text-[8px] font-bold uppercase tracking-tighter leading-tight mt-0.5">
                        ACADEMY SEAL
                      </span>
                      <span className="text-[7px] font-mono leading-none">OFFICIAL</span>
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-right space-y-1">
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    Executive Board
                  </div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    Course Conferred
                  </div>
                </div>
              </div>

              {/* Footer Metadata */}
              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex flex-wrap items-center justify-between text-[10px] font-mono text-neutral-400 gap-2">
                <div>
                  CERTIFICATE ID: <span className="font-bold text-neutral-700 dark:text-neutral-300">{certificateId}</span>
                </div>
                <div>
                  DATE CONFERRED: <span className="font-bold text-neutral-700 dark:text-neutral-300">{issueDate}</span>
                </div>
                <div>
                  REGISTRATION STATUS: <span className="font-bold text-emerald-700 dark:text-emerald-400">ISSUED & VERIFIED</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* =========================================================================
          "complete your course first !" POP-UP ALERT MODAL
          ========================================================================= */}
      {showIncompleteAlert && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-neutral-900 border-2 border-amber-500/80 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-start justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 dark:bg-amber-950/60 border border-amber-400 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                  <Lock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-serif-title font-extrabold text-xl text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-2">
                    <span>complete your course first !</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                      Locked
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Official Executive Certification in Ethiopian Foreign Trade
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowIncompleteAlert(false)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close alert"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Restriction Notice */}
            <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-950 dark:text-rose-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-700 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Certificate Viewing &amp; Download Restricted</span>
              </div>
              <p className="leading-relaxed text-[11.5px]">
                Users who didn't finish the full courses and questions are not allowed to view or download the certificate. You must finish all 16 curriculum chapters and answer all question quizzes before you can download or view this certificate.
              </p>
            </div>

            {/* Checklist Progress Breakdown */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Requirements Checklist ({isChaptersComplete && isQuizzesComplete ? '2/2 Satisfied' : 'Pending Completion'}):
              </div>

              {/* Requirement 1: Full Courses */}
              <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                isChaptersComplete
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isChaptersComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                  }`}>
                    {isChaptersComplete ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <span>1. Finish All 16 Course Chapters</span>
                      {isChaptersComplete && <span className="text-[10px] text-emerald-600 font-extrabold uppercase">(Completed)</span>}
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Progress: {completedChaptersCount} of {totalChapters} chapters completed
                    </p>
                  </div>
                </div>

                {!isChaptersComplete && (
                  <button
                    onClick={() => {
                      setShowIncompleteAlert(false);
                      setActiveNavTab('curriculum');
                    }}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-[11px] shrink-0 transition"
                  >
                    Finish Chapters
                  </button>
                )}
              </div>

              {/* Requirement 2: Questions & Quizzes */}
              <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                isQuizzesComplete
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isQuizzesComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                  }`}>
                    {isQuizzesComplete ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <span>2. Answer All 16 Chapter Quizzes</span>
                      {isQuizzesComplete && <span className="text-[10px] text-emerald-600 font-extrabold uppercase">(Completed)</span>}
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Progress: {completedQuizzesCount} of {totalChapters} quizzes completed
                    </p>
                  </div>
                </div>

                {!isQuizzesComplete && (
                  <button
                    onClick={() => {
                      setShowIncompleteAlert(false);
                      setActiveNavTab('quizzes');
                    }}
                    className="px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl font-bold text-[11px] shrink-0 transition"
                  >
                    Take Quizzes
                  </button>
                )}
              </div>
            </div>

            {/* Test Simulation Controls */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[11px] text-neutral-400">Testing Toggle:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    completeAllCoursesAndQuizzes();
                    setShowIncompleteAlert(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] hover:bg-emerald-200 transition"
                  title="Simulates 100% completion of all 16 chapters and quizzes to test unlocking the certificate"
                >
                  Simulate Full Completion (Unlock)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetCoursesAndQuizzes();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium text-[11px] hover:bg-neutral-200 transition"
                  title="Reset completion to test locked state"
                >
                  Reset Progress
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowIncompleteAlert(false)}
              className="w-full py-2.5 bg-neutral-900 hover:bg-black dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 rounded-xl font-bold text-xs transition"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Record info modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Certificate Record Information
                </h3>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-900 dark:text-emerald-300">
                <div className="font-bold">Official Academy Credential Record</div>
                <div className="text-[11px] mt-0.5">Issued upon verification of 16 completed training modules and examination milestones.</div>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Student Name:</span>
                  <span className="font-bold">{studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Certificate ID:</span>
                  <span className="font-mono font-bold">{certificateId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Conferred Date:</span>
                  <span>{issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Curriculum Scope:</span>
                  <span>{COURSE_MODULES.length} course modules</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Record storage:</span>
                  <span>This browser only</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
