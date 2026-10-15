/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LearningDashboard } from './components/LearningDashboard';
import { CourseViewer } from './components/CourseViewer';
import { CostBreakdownSheet } from './components/CostBreakdownSheet';
import { LCCalculator } from './components/LCCalculator';
import { TaxAssessmentCalculator } from './components/TaxAssessmentCalculator';
import { IncotermsGuide } from './components/IncotermsGuide';
import { QuizCenter } from './components/QuizCenter';
import { SubscriptionView } from './components/SubscriptionView';
import { AdminDashboard } from './components/AdminDashboard';
import { ResourceLibrary } from './components/ResourceLibrary';
import { RecordsTracker } from './components/RecordsTracker';
import { CertificationView } from './components/CertificationView';
import { SubscriptionModal } from './components/SubscriptionModal';
import { TelegramAuthModal } from './components/TelegramAuthModal';
import { AlertTriangle, Send, Clock, CreditCard, Bell, Sparkles, CheckCircle2, X, AlertCircle, UploadCloud } from 'lucide-react';

const toolTabs = ['landed_cost', 'lc_calculator', 'tax_calculator', 'incoterms_guide'];

const MainContent: React.FC = () => {
  const {
    activeNavTab, setActiveNavTab, selectedChapterId, isAdmin, showPaywallModal, setShowPaywallModal,
    showTelegramAuthModal, setShowTelegramAuthModal, isTelegramApp, currentUser, language, users, adminApproveUser
  } = useApp();
  const [storageWarning, setStorageWarning] = useState(false);
  const [dismissed3DayPush, setDismissed3DayPush] = useState(false);
  const [showApprovalNotice, setShowApprovalNotice] = useState(false);
  const [showRejectedNotice, setShowRejectedNotice] = useState(true);

  // Ensure pages and chapters always start from the top when navigating
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeNavTab, selectedChapterId]);

  useEffect(() => {
    const warn = () => setStorageWarning(true);
    window.addEventListener('academy-storage-error', warn);
    return () => window.removeEventListener('academy-storage-error', warn);
  }, []);

  // Listen for instant subscription approval
  useEffect(() => {
    const handleApproved = (e: Event) => {
      const customEv = e as CustomEvent<{ userId: string }>;
      if (customEv.detail?.userId === currentUser.id) {
        setShowApprovalNotice(true);
        setShowRejectedNotice(false);
      }
    };
    window.addEventListener('academy-user-approved', handleApproved as EventListener);
    return () => window.removeEventListener('academy-user-approved', handleApproved as EventListener);
  }, [currentUser.id]);

  // Listen for subscription rejection / payment re-upload notification
  useEffect(() => {
    const handleRejected = (e: Event) => {
      const customEv = e as CustomEvent<{ userId: string; reason?: string }>;
      if (customEv.detail?.userId === currentUser.id) {
        setShowRejectedNotice(true);
        setShowApprovalNotice(false);
      }
    };
    window.addEventListener('academy-payment-rejected', handleRejected as EventListener);
    return () => window.removeEventListener('academy-payment-rejected', handleRejected as EventListener);
  }, [currentUser.id]);

  const daysLeft = currentUser.expiresAt && currentUser.subscriptionStatus === 'active_paid'
    ? Math.max(0, Math.ceil((new Date(currentUser.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  // 3-Day Trial Stay Calculation
  const trialStart = currentUser.trialStartedAt || currentUser.registeredAt;
  const daysSinceTrialStart = trialStart
    ? Math.max(0, Math.floor((Date.now() - new Date(trialStart).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const show3DayPush =
    !isAdmin &&
    currentUser.subscriptionStatus === 'free_trial' &&
    daysSinceTrialStart >= 3 &&
    !dismissed3DayPush;

  // Admin pending subscription requests
  const pendingRequests = users.filter(
    u => u.role !== 'admin' && u.subscriptionStatus === 'pending_approval'
  );

  const isTool = toolTabs.includes(activeNavTab);
  const showAdmin = activeNavTab === 'admin' && isAdmin;

  return (
    <div className="academy-shell flex min-h-[100dvh] flex-col transition-colors">
      <Navbar />

      {/* Instant Admin Notification Bar: Alert admin immediately of every subscription request */}
      {isAdmin && pendingRequests.length > 0 && (
        <div role="alert" className="border-b-2 border-rose-500 bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white px-3 sm:px-4 py-2.5 sm:py-2 text-xs leading-5 shadow-md animate-pulse-subtle">
          <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 w-full">
            <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white shrink-0 mt-0.5 sm:mt-0 animate-bounce">
                <Bell className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <strong>🚨 Instant Admin Alert ({pendingRequests.length} Pending Approval):</strong>{' '}
                {pendingRequests.map(r => `${r.fullName} (${r.telegramUsername})`).slice(0, 2).join(', ')}
                {pendingRequests.length > 2 ? ` +${pendingRequests.length - 2} more` : ''} submitted 3,900 ETB telebirr payment for 30-day access!
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button
                onClick={() => setActiveNavTab('admin')}
                className="px-3 py-1 bg-white text-neutral-900 rounded-lg font-bold text-xs hover:bg-neutral-100 transition shadow-2xs"
              >
                Review in Admin Dashboard
              </button>
              <button
                onClick={() => adminApproveUser(pendingRequests[0].id, 30)}
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs transition shadow-2xs"
                title={`Instantly activate 30-day access for ${pendingRequests[0].telegramUsername}`}
              >
                Approve ({pendingRequests[0].telegramUsername})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Transfer Verification Failed Notice for Student */}
      {!isAdmin && currentUser.subscriptionStatus === 'rejected' && showRejectedNotice && (
        <div role="alert" className="border-b-2 border-rose-500 bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 text-xs leading-5 shadow-md animate-fade-in">
          <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 w-full">
            <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white shrink-0 mt-0.5 sm:mt-0 animate-pulse">
                <AlertCircle className="h-4 w-4 text-amber-200" />
              </span>
              <div className="min-w-0">
                <strong className="block sm:inline font-bold">
                  {language === 'am' ? '⚠️ የክፍያ ማረጋገጫ አልተሳካም፦' : '⚠️ Payment Verification Issue:'}
                </strong>{' '}
                <span>
                  {currentUser.paymentRejectedReason || (language === 'am'
                    ? 'የቴሌብር ክፍያ ማስተላለፍ ስክሪንሾት ማረጋገጥ አልተቻለም። እባክዎ ትክክለኛውን የክፍያ ስክሪንሾት እንደገና በመጫን ማጽደቂያ ይጠይቁ።'
                    : 'Your subscription request was rejected due to a payment transfer verification issue. Please upload the correct payment screenshot and try again for approval.')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button
                onClick={() => setShowPaywallModal(true)}
                className="px-3.5 py-1.5 bg-white text-rose-800 hover:bg-neutral-100 rounded-lg font-bold text-xs transition shadow-2xs flex items-center gap-1.5"
              >
                <UploadCloud className="h-3.5 w-3.5 text-amber-600" />
                <span>{language === 'am' ? 'ትክክለኛውን ክፍያ ይጫኑ' : 'Upload Payment & Try Again'}</span>
              </button>
              <button
                onClick={() => setShowRejectedNotice(false)}
                className="p-1 rounded hover:bg-rose-800 transition"
                aria-label="Dismiss notice"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instant Access Approved Celebration Banner for Student */}
      {showApprovalNotice && currentUser.subscriptionStatus === 'active_paid' && (
        <div role="status" className="border-b-2 border-emerald-500 bg-emerald-600 text-white px-3 sm:px-4 py-2.5 text-xs font-semibold shadow-md animate-fade-in">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-amber-300 animate-spin-slow" />
              <span>
                <strong>🎉 {language === 'am' ? 'እንኳን ደስ አለዎት! ሙሉ አባልነትዎ ጸድቋል' : 'Congratulations! Subscription Approved!'}</strong>{' '}
                {language === 'am'
                  ? 'የ30 ቀናት ሙሉ አባልነትዎ በአስተዳዳሪ @EximmanAbdIstad ጸድቋል። ሙሉ 16 ምዕራፎችና የዋጋ ማስያ መሳሪያዎች አሁን ተከፍተዋል!'
                  : 'Your 30-day full subscription has been approved by @EximmanAbdIstad. All 16 chapters & computational cost calculators are now fully unlocked!'}
              </span>
            </div>
            <button
              onClick={() => setShowApprovalNotice(false)}
              className="p-1 rounded hover:bg-emerald-700 transition"
              aria-label="Close notice"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3-Day Trial Push Notification: Push trial students to proceed to subscribe and use cost calculators */}
      {show3DayPush && (
        <div role="alert" className="border-b-2 border-amber-600 bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-transparent dark:bg-amber-950/80 px-3 sm:px-4 py-3 text-xs leading-5 text-amber-950 dark:text-amber-100 shadow-sm animate-fade-in">
          <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 w-full">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-amber-600 text-white shrink-0 mt-0.5 shadow-2xs">
                <Clock className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-amber-900 dark:text-amber-200">
                  {language === 'am'
                    ? '⏰ ነፃ ሙከራ ከጀመሩ 3 ቀናት ሞልቷል! ሙሉ ትምህርቱንና የዋጋ ማስያ መሳሪያዎችን ለመጠቀም ይመዝገቡ'
                    : '⏰ 3 Days on Free Trial! Ready to master Ethiopian export-import trade & cost calculators?'}
                </p>
                <p className="text-[11px] text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                  {language === 'am'
                    ? 'የነፃ ሙከራ ምዕራፍ 1 እና 2ን ጎብኝተዋል። አሁን በ3,900 ብር (ልዩ 60% ቅናሽ!) በመመዝገብ ሙሉ 16 ምዕራፎችን፣ Landed Cost፣ Letter of Credit እና የጉምሩክ ቀረጥ ማስያ መሳሪያዎችን ለ30 ቀናት በሙሉ ይጠቀሙ!'
                    : "You've explored chapters 1 & 2 on free trial. Subscribe now for 3,900 ETB (Promotional 60% Discount!) to unlock chapters 3–16 and all financial calculators (Landed Cost Build-up, L/C, Customs Tax Assessment, and Incoterms Guide) for 30 days!"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <button
                onClick={() => setShowPaywallModal(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition shadow-2xs"
              >
                <CreditCard className="h-3.5 w-3.5" />
                <span>
                  {language === 'am'
                    ? 'አባልነትን ያጠናቁና መሳሪያዎችን ይጠቀሙ (3,900 ብር)'
                    : 'Subscribe for Full Courses & Cost Calculators (3,900 ETB)'}
                </span>
              </button>
              <button
                onClick={() => setDismissed3DayPush(true)}
                className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-amber-500/10 rounded-xl transition"
                title="Dismiss reminder"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4-Day Expiry App-wide Notification Bar */}
      {!isAdmin && currentUser.subscriptionStatus === 'active_paid' && daysLeft !== null && daysLeft <= 4 && (
        <div role="alert" className="border-b-2 border-amber-500 bg-amber-500/15 dark:bg-amber-950/70 px-3 sm:px-4 py-2.5 sm:py-2 text-xs leading-5 text-amber-950 dark:text-amber-100 shadow-2xs">
          <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 w-full">
            <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
              <span className="min-w-0">
                <strong>{language === 'am' ? 'የአባልነት ማሳሰቢያ፦' : 'Subscription Expiry Notice:'}</strong>{' '}
                {language === 'am'
                  ? `የ30 ቀናት አባልነትዎ ሊያልቅ ${daysLeft} ${daysLeft === 1 ? 'ቀን' : 'ቀናት'} ብቻ ቀርቷል! ሙሉ ኮርሶችንና የዋጋ ማስያ መሳሪያዎችን ያለማቋረጥ ለመጠቀም አባልነትዎን ያድሱ።`
                  : `Your 30-day subscription expires in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}! Please update your subscription now to maintain full course access and cost calculators.`}
              </span>
            </div>
            <button
              onClick={() => setShowPaywallModal(true)}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-xs transition shrink-0 shadow-2xs"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>{language === 'am' ? 'አባልነትዎን ያድሱ (3,900 ብር)' : 'Update / Renew Now (3,900 ETB)'}</span>
            </button>
          </div>
        </div>
      )}

      {storageWarning && (
        <div role="alert" className="border-b border-rose-300 bg-rose-50 px-4 py-2.5 text-xs leading-5 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100">
          <p className="mx-auto max-w-[1440px]"><strong>Browser storage issue.</strong> Please ensure storage permissions are enabled to save your learning progress.</p>
        </div>
      )}

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 sm:py-8 xl:px-8">
        {isTool && (
          <div role="note" className="mb-5 flex gap-2.5 rounded-xl border border-[#e8d6be] bg-[#fff8ee] px-4 py-3 text-xs leading-5 text-[#705634] dark:border-[#574633] dark:bg-[#30291f] dark:text-[#ddc59f]">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p><strong>Educational computation estimates.</strong> Verify current NBE foreign exchange directives, bank commission schedules, and customs tariffs before executing commercial transactions.</p>
          </div>
        )}

        {(activeNavTab as string) === 'overview' && <LearningDashboard />}
        {activeNavTab === 'curriculum' && <CourseViewer />}
        {activeNavTab === 'resources' && <ResourceLibrary />}
        {activeNavTab === 'progress' && <RecordsTracker />}
        {activeNavTab === 'certificate' && <CertificationView />}
        {activeNavTab === 'landed_cost' && <CostBreakdownSheet />}
        {activeNavTab === 'lc_calculator' && <LCCalculator />}
        {activeNavTab === 'tax_calculator' && <TaxAssessmentCalculator />}
        {activeNavTab === 'incoterms_guide' && <IncotermsGuide />}
        {activeNavTab === 'quiz_center' && <QuizCenter />}
        {activeNavTab === 'subscription' && <SubscriptionView />}
        {showAdmin && <AdminDashboard />}
        {activeNavTab === 'admin' && !isAdmin && <LearningDashboard />}
      </main>

      <SubscriptionModal isOpen={showPaywallModal} onClose={() => setShowPaywallModal(false)} />
      <TelegramAuthModal isOpen={showTelegramAuthModal} onClose={() => setShowTelegramAuthModal(false)} />

      <footer className="no-print mt-8 border-t academy-line bg-[var(--paper)] py-6">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:px-6 xl:px-8">
          <div>
            <p className="font-serif-title text-sm font-extrabold">Export-Import Logistics Academy</p>
            <p className="mt-1 academy-muted">Professional training & computational suite for Ethiopian international trade practitioners.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 academy-muted">
            {isTelegramApp && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#229ed9] bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                <Send className="w-2.5 h-2.5" />
                <span>Telegram Mini App</span>
              </span>
            )}
            <span>Subscription: 3,900 ETB via telebirr (Promotional 60% Discount!)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
