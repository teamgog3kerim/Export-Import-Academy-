import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  UserPlus,
  AlertCircle,
  Smartphone,
  User,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  isAdminTelegram,
  formatTelegramHandle,
  triggerTelegramHaptic
} from '../utils/telegramAuth';
import { TelegramLoginWidget } from './TelegramLoginWidget';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramAuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    validateTelegramLogin,
    seamlessTelegramAuth,
    isTelegramApp,
    telegramWebAppUser,
    currentUser,
    users
  } = useApp();

  const [inputHandle, setInputHandle] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationStatus, setValidationStatus] = useState<
    'idle' | 'admin' | 'existing_student' | 'new_student'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // If Mini App user is detected and field is empty, prefill
  useEffect(() => {
    if (telegramWebAppUser?.username && !inputHandle) {
      setInputHandle(`@${telegramWebAppUser.username}`);
      const name = [telegramWebAppUser.first_name, telegramWebAppUser.last_name].filter(Boolean).join(' ');
      if (name) setFullName(name);
    }
  }, [telegramWebAppUser, isOpen]);

  // Real-time validation as user types
  useEffect(() => {
    const trimmed = inputHandle.trim();
    if (!trimmed) {
      setValidationStatus('idle');
      setStatusMessage('');
      return;
    }

    const res = validateTelegramLogin(trimmed);

    if (res.role === 'admin') {
      setValidationStatus('admin');
      setStatusMessage('Administrator (@EximmanAbdIstad) access requires clicking the One-Click Telegram Widget above.');
    } else if (res.status === 'user_matched' && res.user) {
      setValidationStatus('existing_student');
      const sub =
        res.user.subscriptionStatus === 'active_paid'
          ? 'Active 30-Day Paid Subscription'
          : res.user.subscriptionStatus === 'pending_approval'
          ? 'Pending Telebirr Approval'
          : res.user.subscriptionStatus === 'expired'
          ? 'Expired 30-Day Subscription (Renew for 3,900 ETB)'
          : 'Free Trial (Chapters 1 & 2)';
      setStatusMessage(`Matched student: ${res.user.fullName} (${sub})`);
      if (res.user.fullName && !fullName) setFullName(res.user.fullName);
      if (res.user.phoneNumber && !phoneNumber) setPhoneNumber(res.user.phoneNumber);
    } else {
      setValidationStatus('new_student');
      setStatusMessage(`New student username ${formatTelegramHandle(trimmed)}. Complete details below to enroll on Free Trial.`);
    }
  }, [inputHandle, users]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const trimmed = inputHandle.trim();
    if (!trimmed) {
      setFeedback({ type: 'error', text: 'Please enter a Telegram username (e.g. @username).' });
      return;
    }

    // Strict security: Administrator (@EximmanAbdIstad) can only authenticate via official Telegram Widget or Mini App
    if (isAdminTelegram(trimmed)) {
      setFeedback({
        type: 'error',
        text: 'Administrator (@EximmanAbdIstad) access requires authenticating through the One-Click Telegram Login Widget above.'
      });
      return;
    }

    triggerTelegramHaptic('medium');

    const result = seamlessTelegramAuth({
      telegramUsername: trimmed,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim()
    });

    triggerTelegramHaptic('success');
    setFeedback({ type: 'success', text: result.message });

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleQuickMiniAppLogin = () => {
    if (!telegramWebAppUser) return;
    const handle = telegramWebAppUser.username ? `@${telegramWebAppUser.username}` : '';
    const name = [telegramWebAppUser.first_name, telegramWebAppUser.last_name].filter(Boolean).join(' ') || handle;

    triggerTelegramHaptic('medium');
    const result = seamlessTelegramAuth({
      telegramUsername: handle,
      fullName: name
    });

    triggerTelegramHaptic('success');
    setFeedback({ type: 'success', text: result.message });
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="telegram-auth-title"
        className="w-full max-w-md my-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-7 space-y-5 animate-scale-up"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#229ed9] text-white shadow-sm">
              <Send className="h-5 w-5" />
            </span>
            <div>
              <h2 id="telegram-auth-title" className="text-lg font-serif-title font-bold text-neutral-900 dark:text-neutral-50">
                Telegram Login
              </h2>
              <p className="text-[11px] text-neutral-500">
                Log in with your Telegram account to start &amp; continue learning
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Telegram Mini App Native Profile Badge if detected */}
        {isTelegramApp && telegramWebAppUser && (
          <div className="rounded-2xl border border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Telegram Mini App Detected</span>
              </span>
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">
                ID: {telegramWebAppUser.id}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              {telegramWebAppUser.photo_url ? (
                <img
                  src={telegramWebAppUser.photo_url}
                  alt="Telegram profile"
                  className="h-10 w-10 rounded-full object-cover border border-sky-200"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-bold text-sm">
                  {telegramWebAppUser.first_name?.charAt(0) || 'T'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="block truncate text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {telegramWebAppUser.first_name} {telegramWebAppUser.last_name || ''}
                </span>
                <span className="block truncate font-mono text-[11px] text-sky-700 dark:text-sky-300">
                  @{telegramWebAppUser.username || 'user'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickMiniAppLogin}
              className="w-full py-2 px-3 bg-[#229ed9] hover:bg-[#1e8ec3] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs mt-2"
            >
              <span>Continue as @{telegramWebAppUser.username || 'Telegram User'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Feedback message */}
        {feedback && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Official Telegram Login Widget */}
        <div className="rounded-2xl border border-sky-100 dark:border-sky-950 bg-sky-50/50 dark:bg-sky-950/20 p-4 text-center space-y-2.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-sky-900 dark:text-sky-200">
            <Send className="h-3.5 w-3.5 text-[#229ed9]" />
            <span>One-Click Telegram Widget Login</span>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Authorize securely through @Eximmanlearnbot:
          </p>
          <TelegramLoginWidget
            size="large"
            radius={12}
            showDirectLink={false}
            onSuccess={() => {
              setTimeout(() => {
                onClose();
              }, 1200);
            }}
          />
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
          <span className="bg-white dark:bg-neutral-900 px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 shrink-0">
            Or Enter Username
          </span>
          <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5 text-[#229ed9]" />
                <span>Telegram Username *</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-normal">
                e.g. @username
              </span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={inputHandle}
              onChange={e => setInputHandle(e.target.value)}
              placeholder="@username"
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#229ed9] text-xs font-mono"
            />
          </div>

          {/* Real-time Credential Validation Pill */}
          {validationStatus !== 'idle' && (
            <div
              className={`p-2.5 rounded-xl border flex items-start gap-2 text-[11px] leading-relaxed ${
                validationStatus === 'admin'
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-medium'
                  : validationStatus === 'existing_student'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {validationStatus === 'admin' && (
                <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              {validationStatus === 'existing_student' && (
                <UserCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {validationStatus === 'new_student' && (
                <UserPlus className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-bold block">
                  {validationStatus === 'admin'
                    ? 'Administrator Credentials Matched'
                    : validationStatus === 'existing_student'
                    ? 'Registered Student Verified'
                    : 'New Student Registration'}
                </span>
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 block mt-0.5">
                  {statusMessage}
                </span>
              </div>
            </div>
          )}

          {/* Extra fields for new student registration */}
          {validationStatus === 'new_student' && (
            <div className="space-y-2.5 pt-1 border-t border-neutral-100 dark:border-neutral-800">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Abebe Kebede"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Mobile Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="09 11 22 33 44"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 font-mono text-xs"
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-[#229ed9] hover:bg-[#1e8ec3] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>
                {validationStatus === 'admin'
                  ? 'Admin: Use Telegram Widget Above'
                  : validationStatus === 'existing_student'
                  ? 'Validate & Log In'
                  : 'Enroll & Start Free Trial'}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="text-[10px] text-neutral-400 border-t border-neutral-100 dark:border-neutral-800 pt-2 flex items-center justify-between">
          <span>Active user: {currentUser.telegramUsername}</span>
          <span className="capitalize">{currentUser.role}</span>
        </div>
      </div>
    </div>
  );
};
