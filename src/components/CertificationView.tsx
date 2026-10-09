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
  X
} from 'lucide-react';

export const CertificationView: React.FC = () => {
  const {
    currentUser,
    completedChaptersCount,
    issueCertificate,
    setActiveNavTab,
    setShowPaywallModal
  } = useApp();

  const [studentName, setStudentName] = useState(currentUser.fullName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  useEffect(() => setStudentName(currentUser.fullName), [currentUser.id, currentUser.fullName]);

  const isCompleted = completedChaptersCount === COURSE_MODULES.flatMap(module => module.chapters).length;
  const certificateId = currentUser.certificateId || 'Not issued';
  const issueDate = currentUser.certificateIssuedAt
    ? new Date(currentUser.certificateIssuedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not issued';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyVerification = async () => {
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
              onClick={handleCopyVerification}
              disabled={!currentUser.certificateIssuedAt}
              className="py-2.5 px-4 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{currentUser.certificateIssuedAt ? 'Copy certificate ID' : 'No certificate issued'}</span>
            </button>

            <button
              onClick={handleCopyVerification}
              disabled={!currentUser.certificateIssuedAt}
              className="py-2.5 px-4 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'ID copied' : 'Copy certificate ID'}</span>
            </button>

            <button
              onClick={handlePrint}
              disabled={!currentUser.certificateIssuedAt}
              className="py-2.5 px-5 text-xs font-bold rounded-xl bg-amber-700 hover:bg-amber-800 text-white transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4" />
                <span>Print course record</span>
            </button>
          </div>
        </div>

        {/* Completion Status Alert */}
        {!isCompleted ? (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Course progress: {completedChaptersCount} of {COURSE_MODULES.flatMap(module => module.chapters).length} lessons completed</span>
              </div>
              <p className="text-amber-800/90 dark:text-amber-300/80">
                Complete all 16 course chapters and pass associated quizzes to generate your verified certificate of completion.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveNavTab('progress')}
                className="py-2 px-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 font-semibold rounded-lg text-[11px]"
              >
                Go to Tracker
              </button>
            </div>
          </div>
        ) : currentUser.certificateIssuedAt ? (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Course complete.</span> Official course completion record generated. You have satisfied all curriculum requirements.
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 sm:flex-row sm:items-center sm:justify-between">
            <p><strong>All lessons completed.</strong> You can generate a local course-completion record. It is not an accredited credential.</p>
            <button type="button" onClick={issueCertificate} className="shrink-0 rounded-lg bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-900 dark:bg-emerald-200 dark:text-emerald-950">Generate course record</button>
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
          ========================================================================= */}
      <div className="certificate-print-wrapper bg-white dark:bg-neutral-900 border-8 border-amber-900/20 dark:border-amber-700/30 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden text-neutral-900 dark:text-neutral-100">
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

          {/* Local demonstration record; not an accredited credential. */}
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
      </div>

      {/* No online registry exists for certificates in this local demo. */}
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
