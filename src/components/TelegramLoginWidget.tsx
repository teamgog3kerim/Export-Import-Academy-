import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TELEGRAM_BOT_USERNAME,
  TelegramWidgetUser,
  triggerTelegramHaptic
} from '../utils/telegramAuth';
import { Send, CheckCircle2, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';

interface Props {
  onSuccess?: (user: TelegramWidgetUser) => void;
  size?: 'small' | 'medium' | 'large';
  radius?: number;
  showDirectLink?: boolean;
  className?: string;
}

export const TelegramLoginWidget: React.FC<Props> = ({
  onSuccess,
  size = 'large',
  radius = 12,
  showDirectLink = true,
  className = ''
}) => {
  const { loginWithTelegramWidget } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Expose global callback for Telegram Widget
    window.onTelegramAuth = (user: TelegramWidgetUser) => {
      triggerTelegramHaptic('success');
      const result = loginWithTelegramWidget(user);
      setFeedback({ type: 'success', message: result.message });
      if (onSuccess) {
        onSuccess(user);
      }
    };

    if (!containerRef.current) return;

    // Clear previous widget iframe if any
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', TELEGRAM_BOT_USERNAME);
    script.setAttribute('data-size', size);
    script.setAttribute('data-radius', radius.toString());
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'true');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');

    script.onload = () => {
      setIsLoading(false);
    };

    script.onerror = () => {
      setIsLoading(false);
    };

    containerRef.current.appendChild(script);

    // Timeout fallback for loading indicator
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [loginWithTelegramWidget, onSuccess, radius, size]);

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Official Telegram Login Widget Container */}
      <div className="relative min-h-[44px] flex items-center justify-center">
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 py-2">
            <Send className="h-4 w-4 text-[#229ed9] animate-pulse" />
            <span>Connecting to @{TELEGRAM_BOT_USERNAME}...</span>
          </div>
        )}
        <div ref={containerRef} className="flex justify-center" />
      </div>

      {feedback && (
        <div
          className={`w-full max-w-sm p-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {showDirectLink && (
        <div className="text-center pt-1">
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Powered by official bot{' '}
            <a
              href={`https://t.me/${TELEGRAM_BOT_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-[#1b7fae] dark:text-[#6cc2e9] hover:underline inline-flex items-center gap-0.5"
            >
              @{TELEGRAM_BOT_USERNAME}
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
