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
import { QuizCenter } from './components/QuizCenter';
import { SubscriptionView } from './components/SubscriptionView';
import { AdminDashboard } from './components/AdminDashboard';
import { ResourceLibrary } from './components/ResourceLibrary';
import { RecordsTracker } from './components/RecordsTracker';
import { CertificationView } from './components/CertificationView';
import { SubscriptionModal } from './components/SubscriptionModal';
import { TelegramAuthModal } from './components/TelegramAuthModal';
import { AlertTriangle, Send } from 'lucide-react';

const toolTabs = ['landed_cost', 'lc_calculator', 'tax_calculator'];

const MainContent: React.FC = () => {
  const {
    activeNavTab, isAdmin, showPaywallModal, setShowPaywallModal,
    showTelegramAuthModal, setShowTelegramAuthModal, isTelegramApp
  } = useApp();
  const [storageWarning, setStorageWarning] = useState(false);

  useEffect(() => {
    const warn = () => setStorageWarning(true);
    window.addEventListener('academy-storage-error', warn);
    return () => window.removeEventListener('academy-storage-error', warn);
  }, []);
  const isTool = toolTabs.includes(activeNavTab);
  const showAdmin = activeNavTab === 'admin' && isAdmin;

  return (
    <div className="academy-shell flex min-h-[100dvh] flex-col transition-colors">
      <Navbar />

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
            <p className="font-serif-title text-sm font-extrabold">Export-Import and Logistics Academy</p>
            <p className="mt-1 academy-muted">Professional training & computational suite for Ethiopian international trade practitioners.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 academy-muted">
            {isTelegramApp && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#229ed9] bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                <Send className="w-2.5 h-2.5" />
                <span>Telegram Mini App</span>
              </span>
            )}
            <span>Subscription: 3,900 ETB via telebirr</span>
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
