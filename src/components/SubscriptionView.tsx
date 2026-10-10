import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  UploadCloud,
  Clock,
  ShieldCheck,
  Send,
  User,
  Smartphone,
  Lock,
  Sparkles,
  Award,
  BookOpen,
  Calculator,
  X,
  AlertCircle
} from 'lucide-react';
import { triggerTelegramHaptic } from '../utils/telegramAuth';
import { TelegramLoginWidget } from './TelegramLoginWidget';

export const SubscriptionView: React.FC = () => {
  const {
    currentUser,
    submitSubscriptionPayment,
    setActiveNavTab,
    isAdmin,
    hasFullAccess,
    isTelegramApp,
    telegramWebAppUser
  } = useApp();

  const [telegramUsername, setTelegramUsername] = useState(
    currentUser.telegramUsername || (telegramWebAppUser?.username ? `@${telegramWebAppUser.username}` : '')
  );
  const [fullName, setFullName] = useState(
    currentUser.fullName || [telegramWebAppUser?.first_name, telegramWebAppUser?.last_name].filter(Boolean).join(' ') || ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser.phoneNumber || ''
  );
  const [telebirrTxId, setTelebirrTxId] = useState(
    currentUser.telebirrTxId || ''
  );
  const [screenshotData, setScreenshotData] = useState<string>(
    currentUser.paymentScreenshot || ''
  );
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(
    currentUser.subscriptionStatus === 'pending_approval'
  );

  useEffect(() => {
    if (telegramWebAppUser) {
      if (!telegramUsername && telegramWebAppUser.username) {
        setTelegramUsername(`@${telegramWebAppUser.username}`);
      }
      if (!fullName) {
        const name = [telegramWebAppUser.first_name, telegramWebAppUser.last_name].filter(Boolean).join(' ');
        if (name) setFullName(name);
      }
    }
  }, [telegramWebAppUser]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyTelebirrNumber = () => {
    navigator.clipboard.writeText('0967684490');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload an image file (PNG, JPG, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size must be under 5MB.');
      return;
    }
    setErrorMessage('');

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setScreenshotData(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          setScreenshotData(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!telegramUsername.trim()) {
      setErrorMessage('Please provide your Telegram username (e.g. @username).');
      return;
    }
    if (!fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your mobile phone number.');
      return;
    }
    if (!screenshotData) {
      setErrorMessage('Please upload your telebirr transfer screenshot.');
      return;
    }

    try {
      submitSubscriptionPayment({
        telegramUsername: telegramUsername.trim(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        telebirrTxId: telebirrTxId.trim(),
        paymentScreenshot: screenshotData
      });
      triggerTelegramHaptic('success');
      setIsSubmittedSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to save subscription request. Please retry.');
    }
  };

  const daysLeft = currentUser.expiresAt
    ? Math.max(0, Math.ceil((new Date(currentUser.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-2">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Membership & Subscription Plans</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
          Ethiopian Import-Export Trade Academy Access
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Start for free with Chapters 1 and 2. Upgrade to full membership to master all 16 chapters, trade calculation sheets, regulatory checklists, and official course certification.
        </p>
      </div>

      {/* Current Status Pill if logged in */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 font-bold text-amber-800 dark:text-amber-300">
            {currentUser.fullName.charAt(0)}
          </span>
          <div>
            <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span>{currentUser.fullName}</span>
              <span className="font-mono text-neutral-400 font-normal">
                ({currentUser.telegramUsername})
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Phone: {currentUser.phoneNumber || 'Not saved'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
              Administrator (@Eximmanlearnbot)
            </span>
          ) : currentUser.subscriptionStatus === 'active_paid' ? (
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Active 30-Day Pass · {daysLeft !== null ? `${daysLeft} Days Left` : 'Active'}</span>
            </span>
          ) : currentUser.subscriptionStatus === 'pending_approval' ? (
            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Pending @Eximmanlearnbot Approval</span>
            </span>
          ) : currentUser.subscriptionStatus === 'expired' ? (
            <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>30-Day Subscription Expired (Renew for 3,900 Birr)</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
              Free Trial (Chapters 1 & 2)
            </span>
          )}
        </div>
      </div>

      {/* Plan Cards Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Plan 1: Free Trial */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-7 space-y-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Starter Tier
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                Free Forever
              </span>
            </div>

            <div>
              <h3 className="font-serif-title text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                Free Trial
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Explore foundational foreign trade concepts at zero cost.
              </p>
            </div>

            <div className="flex items-baseline gap-1 text-neutral-900 dark:text-neutral-50">
              <span className="font-serif-title text-4xl font-extrabold">0</span>
              <span className="text-sm font-bold text-neutral-500">ETB</span>
            </div>

            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Chapter 1:</strong> Ethiopian Foreign Trade Legal Architecture & NBE Framework</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Chapter 2:</strong> Letter of Credit (L/C) Mechanism & Bank Settlement Flow</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Full access to Chapter 1 & 2 study guides, process diagrams, case studies & quizzes</span>
              </li>
              <li className="flex items-start gap-2 text-neutral-400">
                <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Chapters 3 through 16 locked (requires full subscription)</span>
              </li>
              <li className="flex items-start gap-2 text-neutral-400">
                <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Course Completion Certificate locked</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setActiveNavTab('curriculum')}
            className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Start Free Lessons (Chapters 1 & 2)
          </button>
        </div>

        {/* Plan 2: Full Subscription */}
        <div className="relative bg-gradient-to-b from-amber-50/60 to-white dark:from-amber-950/20 dark:to-neutral-900 rounded-3xl border-2 border-amber-600/80 p-6 sm:p-7 space-y-5 shadow-lg flex flex-col justify-between">
          <div className="absolute -top-3 right-6 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            {currentUser.subscriptionStatus === 'expired' ? 'Resubscribe' : 'Recommended'}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Full Academy Pass
              </span>
            </div>

            <div>
              <h3 className="font-serif-title text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                30-Day Complete Subscription
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Every subscription is valid for 30 days. When 30 days expire, you can subscribe again for 3,900 Birr per 30 days.
              </p>
            </div>

            <div className="flex items-baseline gap-1 text-neutral-900 dark:text-neutral-50">
              <span className="font-serif-title text-4xl font-extrabold text-amber-900 dark:text-amber-100">
                3,900
              </span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                Birr / 30 Days
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-200 pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fixed 30-Day Period:</strong> Full access for 30 days from approval date, with continuous renewal at 3,900 Birr</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>All 16 Chapters Unlocked:</strong> Customs classification, Djibouti corridor, dry ports, coffee export, FX hedging</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Full LC Settlement Calculator:</strong> 10 units dump truck case, FCY conversion, statutory fees</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Customs 7-Tier Tax Tool:</strong> Duty, Excise, Surtax, Social Welfare, VAT, Withholding</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Export Document Checklist Generator:</strong> Tailored requirements by commodity & market</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Verified Academy Certificate:</strong> Generates unique code and progress verification</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href="#payment-section"
              className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold text-center block transition-colors shadow-sm"
            >
              {currentUser.subscriptionStatus === 'expired'
                ? 'Resubscribe for 3,900 Birr (30 Days)'
                : 'Subscribe via telebirr (3,900 Birr / 30 Days)'}
            </a>
          </div>
        </div>
      </div>

      {/* Payment Instructions & Submission Card */}
      <div id="payment-section" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <ShieldCheck className="h-4 w-4" />
            <span>telebirr Payment Instructions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            Subscribe by telebirr Transfer (3,900 Birr)
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Follow the 3 easy steps below to activate your 30-day full access.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white font-bold text-[11px]">
                1
              </span>
              <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
                Transfer Amount
              </span>
            </div>
            <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Transfer 3,900 Birr
            </p>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              Open your telebirr mobile app or dial *127# and send 3,900 ETB.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white font-bold text-[11px]">
                2
              </span>
              <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
                Recipient Details
              </span>
            </div>
            <p className="font-mono font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center justify-between">
              <span>09 6768 4490</span>
              <button
                type="button"
                onClick={copyTelebirrNumber}
                className="text-[11px] font-sans font-semibold text-amber-700 dark:text-amber-400 hover:underline"
              >
                {copiedPhone ? 'Copied' : 'Copy'}
              </button>
            </p>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              Recipient Name: <strong>Abdulkerim</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white font-bold text-[11px]">
                3
              </span>
              <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
                Admin Review
              </span>
            </div>
            <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Admin Approval
            </p>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              Upload the screenshot below. Administrator <strong>@Eximmanlearnbot</strong> approves your access.
            </p>
          </div>
        </div>

        {/* Submission Form */}
        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6">
          <h3 className="font-serif-title font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-4">
            Submit Payment Proof for Approval
          </h3>

          {isSubmittedSuccess && (
            <div className="mb-6 p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Payment Request Pending Approval</span>
              </div>
              <p className="text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
                Your payment submission of <strong>3,900 ETB</strong> via telebirr to <strong>09 6768 4490 (Abdulkerim)</strong> is recorded. Administrator <strong>@Eximmanlearnbot</strong> will review your screenshot and activate your 30-day full access.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsSubmittedSuccess(false)}
                  className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Edit details or re-upload receipt
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-2 text-xs text-rose-800 dark:text-rose-200">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Telegram Account Linking Widget */}
            {!currentUser.telegramUsername || currentUser.telegramUsername === '@Eximmanlearnbot' ? (
              <div className="p-4 bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/40 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5 text-[#229ed9]" />
                    <span>Log in with Telegram to Link Your Subscription</span>
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Log in with Telegram via @Eximmanlearnbot to automatically connect your account and verify your subscription status.
                </p>
                <div className="pt-1 flex justify-center">
                  <TelegramLoginWidget
                    size="medium"
                    showDirectLink={false}
                    onSuccess={widgetUser => {
                      const handle = widgetUser.username ? `@${widgetUser.username}` : `@id${widgetUser.id}`;
                      setTelegramUsername(handle);
                      const name = [widgetUser.first_name, widgetUser.last_name].filter(Boolean).join(' ');
                      if (name) setFullName(name);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-neutral-600 dark:text-neutral-300">
                    Linked to Telegram account: <strong className="text-[#1b7fae] dark:text-[#6cc2e9]">{currentUser.telegramUsername}</strong>
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5 text-amber-600" />
                  <span>Telegram Username *</span>
                </label>
                <input
                  type="text"
                  required
                  value={telegramUsername}
                  onChange={e => setTelegramUsername(e.target.value)}
                  placeholder="@your_username"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Abebe Kebede"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Mobile Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="09 11 22 33 44"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-neutral-500" />
                <span>Telebirr Transaction Reference (optional)</span>
              </label>
              <input
                type="text"
                value={telebirrTxId}
                onChange={e => setTelebirrTxId(e.target.value)}
                placeholder="e.g. CK94285129"
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 font-mono text-xs"
              />
            </div>

            {/* Screenshot upload */}
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <UploadCloud className="h-3.5 w-3.5 text-amber-600" />
                  <span>Upload Telebirr Payment Screenshot *</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-normal">
                  Image (PNG, JPG, WebP)
                </span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={e => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                className="hidden"
              />

              {screenshotData ? (
                <div className="border border-amber-300 dark:border-amber-800 rounded-2xl p-3 bg-neutral-50 dark:bg-neutral-800/50 flex items-center gap-4">
                  <img
                    src={screenshotData}
                    alt="Receipt Screenshot Preview"
                    className="h-24 w-28 object-cover rounded-xl border border-neutral-200 dark:border-neutral-700 shrink-0 shadow-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 text-xs">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Payment Screenshot Uploaded</span>
                    </span>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Ready for admin review. Click replace if you need to select another image.
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      Change Screenshot
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScreenshotData('')}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-amber-500 rounded-2xl p-6 text-center bg-neutral-50/50 dark:bg-neutral-800/40 transition-all space-y-1.5"
                >
                  <UploadCloud className="h-8 w-8 text-amber-600 mx-auto" />
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs">
                    Click to select payment screenshot from your device
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Screenshot showing 3,900 ETB transferred to 09 6768 4490 (Abdulkerim)
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="py-3 px-6 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-2"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>
                  {currentUser.subscriptionStatus === 'expired'
                    ? 'Submit 30-Day Resubscription Request (3,900 Birr)'
                    : 'Submit 30-Day Subscription Request (3,900 Birr)'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveNavTab('curriculum')}
                className="py-3 px-4 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Back to Curriculum
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
