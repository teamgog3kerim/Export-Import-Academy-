import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Copy,
  Check,
  UploadCloud,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Smartphone,
  User,
  Send,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { triggerTelegramHaptic, formatTelegramHandle } from '../utils/telegramAuth';
import { TelegramLoginWidget } from './TelegramLoginWidget';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentUser, submitSubscriptionPayment, isTelegramApp, telegramWebAppUser } = useApp();

  const isGuest = currentUser.id === 'guest-student';
  const [telegramUsername, setTelegramUsername] = useState(
    currentUser.telegramUsername || (telegramWebAppUser?.username ? `@${telegramWebAppUser.username}` : '')
  );
  const [fullName, setFullName] = useState(
    (!isGuest && currentUser.fullName) || [telegramWebAppUser?.first_name, telegramWebAppUser?.last_name].filter(Boolean).join(' ') || ''
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successSubmitted, setSuccessSubmitted] = useState(
    currentUser.subscriptionStatus === 'pending_approval'
  );

  useEffect(() => {
    if (isOpen && telegramWebAppUser) {
      if (!telegramUsername && telegramWebAppUser.username) {
        setTelegramUsername(`@${telegramWebAppUser.username}`);
      }
      if (!fullName) {
        const name = [telegramWebAppUser.first_name, telegramWebAppUser.last_name].filter(Boolean).join(' ');
        if (name) setFullName(name);
      }
    }
  }, [isOpen, telegramWebAppUser]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const copyTelebirrNumber = () => {
    navigator.clipboard.writeText('0967684490');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    // Limit file size ~5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size should be under 5MB.');
      return;
    }
    setErrorMessage('');

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      // Compress if large using off-screen canvas
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
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setScreenshotData(compressed);
        } else {
          setScreenshotData(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!telegramUsername.trim()) {
      setErrorMessage('Please enter your Telegram account (e.g. @username).');
      return;
    }
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your mobile phone number.');
      return;
    }
    if (!screenshotData) {
      setErrorMessage('Please upload the telebirr payment transfer screenshot.');
      return;
    }

    setIsSubmitting(true);
    try {
      submitSubscriptionPayment({
        telegramUsername: telegramUsername.trim(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        telebirrTxId: telebirrTxId.trim(),
        paymentScreenshot: screenshotData
      });
      triggerTelegramHaptic('success');
      setSuccessSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to submit subscription request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-modal-title"
        className="w-full max-w-xl my-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-7 space-y-6 animate-scale-up"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>
                {currentUser.subscriptionStatus === 'expired'
                  ? 'Renew Academy Subscription (30 Days)'
                  : 'Full Academy Subscription (30 Days)'}
              </span>
            </div>
            <h2 id="subscription-modal-title" className="text-xl sm:text-2xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
              {currentUser.subscriptionStatus === 'expired'
                ? 'Your 30-Day Subscription Expired'
                : 'Unlock All 16 Chapters & Tools'}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {currentUser.subscriptionStatus === 'expired'
                ? 'Every subscription is valid for 30 days. Renew your access for 3,900 Birr to continue accessing all lessons, tools, and certification.'
                : 'Every subscription is for 30 days (3,900 Birr per 30 days). Get full access to all lessons, calculation sheets, checklists, and verified certification.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-xl p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Telebirr Payment Instructions Box */}
        <div className="rounded-2xl border border-amber-200 bg-[#fff9f0] dark:border-amber-900/60 dark:bg-amber-950/30 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-xs font-bold text-white">
                TB
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  telebirr Transfer
                </span>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/70">
                  Send payment via telebirr app or *127#
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-serif-title font-extrabold text-amber-900 dark:text-amber-100">
                3,900 ETB
              </span>
              <span className="block text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                30-day access
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-amber-200/70 dark:border-amber-900/40 text-xs">
            <div className="bg-white/80 dark:bg-neutral-900/80 rounded-xl p-2.5 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
                  telebirr Account Number
                </span>
                <span className="font-mono font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  09 6768 4490
                </span>
              </div>
              <button
                type="button"
                onClick={copyTelebirrNumber}
                className="px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/50 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-100 text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                {copiedPhone ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white/80 dark:bg-neutral-900/80 rounded-xl p-2.5 border border-amber-200/60 dark:border-amber-900/40">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
                Account Name
              </span>
              <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                Abdulkerim
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-300">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
            <span>
              Approvals are reviewed by administrator <strong>@Eximmanlearnbot</strong>.
            </span>
          </div>
        </div>

        {/* Status notice if already pending */}
        {successSubmitted && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Subscription Request Submitted!</span>
            </div>
            <p className="text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
              Your payment receipt of <strong>3,900 ETB</strong> has been sent to <strong>@Eximmanlearnbot</strong> (Abdulkerim). Once verified, your full 30-day access will be approved.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSuccessSubmitted(false)}
                className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline text-[11px]"
              >
                Submit updated receipt
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Subscription Form */}
        {!successSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-2 text-xs text-rose-800 dark:text-rose-200">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Telegram Account Linking Widget */}
            {!currentUser.telegramUsername || currentUser.telegramUsername === '@Eximmanlearnbot' ? (
              <div className="p-3.5 bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/40 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5 text-[#229ed9]" />
                    <span>Log in with Telegram to Link Subscription</span>
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Authorize with Telegram to auto-fill your profile and link your 3,900 ETB subscription.
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
              <div className="p-2.5 bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-neutral-600 dark:text-neutral-300">
                    Linked to Telegram account: <strong className="text-[#1b7fae] dark:text-[#6cc2e9]">{currentUser.telegramUsername}</strong>
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Telegram Username */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5 text-amber-600" />
                  <span>Telegram Account (@) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={telegramUsername}
                  onChange={e => setTelegramUsername(e.target.value)}
                  placeholder="@your_username"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Full Name */}
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
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Mobile Phone Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="09 11 22 33 44"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs font-mono"
                />
              </div>

              {/* Telebirr Tx ID */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Telebirr Transaction ID (optional)</span>
                </label>
                <input
                  type="text"
                  value={telebirrTxId}
                  onChange={e => setTelebirrTxId(e.target.value)}
                  placeholder="e.g. CK982341..."
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs font-mono"
                />
              </div>
            </div>

            {/* Upload Payment Screenshot */}
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <UploadCloud className="h-3.5 w-3.5 text-amber-600" />
                  <span>Telebirr Payment Screenshot *</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-normal">
                  PNG, JPG up to 5MB
                </span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {screenshotData ? (
                <div className="relative border border-amber-300 dark:border-amber-800 rounded-2xl p-2 bg-neutral-50 dark:bg-neutral-800/50 flex items-center gap-3">
                  <img
                    src={screenshotData}
                    alt="Payment Screenshot Preview"
                    className="h-20 w-24 object-cover rounded-xl border border-neutral-200 dark:border-neutral-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Receipt Screenshot Ready</span>
                    </span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Screenshot loaded. Click replace if you want to select another file.
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      Replace Screenshot
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScreenshotData('')}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-5 text-center bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-amber-50/20 transition-all space-y-1.5"
                >
                  <UploadCloud className="h-8 w-8 text-amber-600 mx-auto" />
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs">
                    Click or drag & drop telebirr payment screenshot
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Upload the transaction confirmation screen showing 3,900 ETB sent to 09 6768 4490
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>
                  {currentUser.subscriptionStatus === 'expired'
                    ? 'Resubscribe for 3,900 Birr (30 Days Access)'
                    : 'Submit Subscription for Admin Approval (3,900 ETB / 30 Days)'}
                </span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
