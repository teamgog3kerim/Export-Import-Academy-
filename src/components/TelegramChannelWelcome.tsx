import React, { useState } from 'react';
import {
  Megaphone,
  Send,
  ExternalLink,
  Sparkles,
  BookOpen,
  X,
  CheckCircle2,
  Bot
} from 'lucide-react';
import {
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_CHANNEL_HANDLE,
  TELEGRAM_BOT_URL,
  TELEGRAM_BOT_USERNAME,
  openTelegramChannel,
  openTelegramBot,
  triggerTelegramHaptic
} from '../utils/telegramAuth';

interface Props {
  onProceed?: () => void;
  compact?: boolean;
}

const STORAGE_DISMISSED_KEY = 'exim_channel_welcome_dismissed_v1';

export const TelegramChannelWelcome: React.FC<Props> = ({ onProceed, compact = false }) => {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_DISMISSED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_DISMISSED_KEY, 'true');
    } catch {
      // ignore
    }
    setDismissed(true);
    triggerTelegramHaptic('light');
  };

  const handleJoinChannel = () => {
    triggerTelegramHaptic('medium');
    openTelegramChannel();
  };

  const handleOpenBot = () => {
    triggerTelegramHaptic('medium');
    openTelegramBot();
  };

  if (dismissed && !compact) {
    return (
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800 text-xs">
        <div className="flex items-center gap-2 text-sky-900 dark:text-sky-200 min-w-0">
          <Megaphone className="h-4 w-4 text-[#229ed9] shrink-0" />
          <span className="truncate">
            Official Academy Channel: <strong>{TELEGRAM_CHANNEL_HANDLE}</strong> for course updates & news.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleJoinChannel}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[#229ed9] hover:bg-[#1b8ec5] text-white rounded-lg text-xs font-bold transition"
          >
            <span>Join</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Welcome to Official Telegram Channel and Chatbot"
      className="relative overflow-hidden rounded-3xl border border-sky-200/90 dark:border-sky-900/60 bg-gradient-to-br from-sky-50 via-white to-sky-100/60 dark:from-[#13222e] dark:via-[#162734] dark:to-[#1a2f3e] p-5 sm:p-6 shadow-sm"
    >
      {/* Background accents */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#229ed9]/10 blur-2xl dark:bg-[#229ed9]/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-1/3 h-36 w-36 rounded-full bg-amber-500/10 blur-xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left side text */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#229ed9]/15 dark:bg-[#229ed9]/25 text-[#156e9c] dark:text-[#6cc2e9] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              <Megaphone className="h-3 w-3 text-[#229ed9]" />
              <span>Official Telegram Community</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              <span>Verified Academy Channel</span>
            </span>
          </div>

          <h2 className="font-serif-title text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-snug">
            Welcome to the Ethiopian Export-Import and Logistics Academy!
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Join our dedicated Telegram channel{' '}
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleJoinChannel}
              className="font-bold text-[#1b7fae] dark:text-[#6cc2e9] underline hover:text-[#145c52]"
            >
              {TELEGRAM_CHANNEL_HANDLE}
            </a>{' '}
            for all course announcements, schedules, and trade insights. Launch our interactive chatbot{' '}
            <strong className="text-neutral-800 dark:text-neutral-200">@{TELEGRAM_BOT_USERNAME}</strong> to proceed seamlessly with the app.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Live course announcements</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#176b60]" />
              <span>Ethiopian trade circulars & tariff changes</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Bot className="h-3.5 w-3.5 text-[#229ed9]" />
              <span>Chatbot assistant & Mini App launch</span>
            </span>
          </div>
        </div>

        {/* Right side CTA buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 pt-2 md:pt-0">
          <button
            type="button"
            onClick={handleJoinChannel}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#229ed9] hover:bg-[#1b8bc2] text-white font-bold text-xs sm:text-sm shadow-sm transition hover:shadow-md"
          >
            <Send className="h-4 w-4" />
            <span>Join Channel ({TELEGRAM_CHANNEL_HANDLE})</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </button>

          <button
            type="button"
            onClick={handleOpenBot}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-sky-300 dark:border-sky-800 bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-800 text-[#1b7fae] dark:text-[#6cc2e9] font-bold text-xs transition"
          >
            <Bot className="h-4 w-4 text-[#229ed9]" />
            <span>Chatbot (@{TELEGRAM_BOT_USERNAME})</span>
          </button>

          {onProceed && (
            <button
              type="button"
              onClick={onProceed}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-[11px] font-semibold transition"
            >
              <span>Proceed to Course Curriculum</span>
              <span>&rarr;</span>
            </button>
          )}
        </div>
      </div>

      {/* Dismiss Button */}
      {!compact && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Minimize welcome announcement"
          className="absolute top-3 right-3 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-sky-100/50 dark:hover:bg-sky-950/50 transition"
          title="Minimize announcement"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </section>
  );
};
