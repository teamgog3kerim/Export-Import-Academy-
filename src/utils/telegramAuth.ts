import { UserProfile } from '../types';

export interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  is_premium?: boolean;
}

export interface TelegramWidgetUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
}

export interface TelegramAuthValidationResult {
  isValid: boolean;
  role: 'admin' | 'user';
  user: UserProfile | null;
  status: 'admin_matched' | 'user_matched' | 'not_found' | 'invalid_input';
  message: string;
  telegramHandle: string;
}

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramWidgetUser) => void;
    Telegram?: {
      WebApp?: {
        initData: string;
        initDataUnsafe?: {
          query_id?: string;
          user?: TelegramWebAppUser;
          auth_date?: string;
          hash?: string;
        };
        version: string;
        platform: string;
        colorScheme: 'light' | 'dark';
        themeParams: TelegramThemeParams;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        ready: () => void;
        expand: () => void;
        close: () => void;
        enableClosingConfirmation?: () => void;
        setHeaderColor?: (color: string) => void;
        setBackgroundColor?: (color: string) => void;
        onEvent?: (eventType: string, eventHandler: () => void) => void;
        offEvent?: (eventType: string, eventHandler: () => void) => void;
        sendData?: (data: string) => void;
        openLink?: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink?: (url: string) => void;
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        MainButton?: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive: boolean) => void;
          hideProgress: () => void;
        };
        BackButton?: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
      };
    };
  }
}

export const ADMIN_TELEGRAM_HANDLE = '@EximmanAbdIstad';
export const ADMIN_TELEGRAM_NORMALIZED = 'eximmanabdistad';
export const TELEGRAM_BOT_TOKEN = '8569973222:AAGLyuItmHoanxh-5P6L8eQf40TDQJxOYsk';
export const TELEGRAM_BOT_USERNAME = 'Eximmanlearnbot';
export const TELEGRAM_BOT_ID = '8569973222';
export const TELEGRAM_BOT_NAME = 'EXIMMAN LEARN';
export const TELEGRAM_BOT_URL = 'https://t.me/Eximmanlearnbot';
export const TELEGRAM_CHANNEL_HANDLE = '@eximmanlearn';
export const TELEGRAM_CHANNEL_URL = 'https://t.me/eximmanlearn';

export function openTelegramChannel() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.openTelegramLink) {
    window.Telegram.WebApp.openTelegramLink(TELEGRAM_CHANNEL_URL);
  } else {
    window.open(TELEGRAM_CHANNEL_URL, '_blank', 'noopener,noreferrer');
  }
}

export function openTelegramBot() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.openTelegramLink) {
    window.Telegram.WebApp.openTelegramLink(TELEGRAM_BOT_URL);
  } else {
    window.open(TELEGRAM_BOT_URL, '_blank', 'noopener,noreferrer');
  }
}

export interface TelegramBotInfo {
  ok: boolean;
  username?: string;
  firstName?: string;
  id?: number;
  menuButtonUrl?: string;
  error?: string;
}

/**
 * Fetches live bot details from Telegram Bot API using the configured token
 */
export async function fetchTelegramBotInfo(): Promise<TelegramBotInfo> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
    const data = await res.json();
    if (!data.ok) {
      return { ok: false, error: data.description || 'Failed to fetch bot profile' };
    }

    let menuUrl: string | undefined;
    try {
      const menuRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMenuButton`);
      const menuData = await menuRes.json();
      if (menuData.ok && menuData.result?.web_app?.url) {
        menuUrl = menuData.result.web_app.url;
      }
    } catch {
      // Menu button query optional
    }

    return {
      ok: true,
      username: data.result.username,
      firstName: data.result.first_name,
      id: data.result.id,
      menuButtonUrl: menuUrl
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { ok: false, error: message };
  }
}

/**
 * Updates the Telegram chat menu button so that clicking it launches this Mini App
 */
export async function syncTelegramMenuButton(
  targetUrl: string,
  buttonText = 'Launch Academy'
): Promise<{ ok: boolean; message: string }> {
  try {
    const cleanUrl = targetUrl.trim();
    if (!cleanUrl.startsWith('https://')) {
      return {
        ok: false,
        message: 'Telegram Mini Apps require a secure HTTPS URL (https://...)'
      };
    }

    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setChatMenuButton`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        menu_button: {
          type: 'web_app',
          text: buttonText,
          web_app: {
            url: cleanUrl
          }
        }
      })
    });
    const data = await res.json();
    if (data.ok) {
      return {
        ok: true,
        message: `Chat menu button in @${TELEGRAM_BOT_USERNAME} successfully updated to: ${cleanUrl}`
      };
    } else {
      return {
        ok: false,
        message: data.description || 'Telegram Bot API error updating menu button'
      };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection failed';
    return { ok: false, message };
  }
}

/**
 * Resets the Telegram chat menu button back to standard commands (removes any web_app URL)
 */
export async function resetTelegramMenuButton(): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setChatMenuButton`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const data = await res.json();
    if (data.ok) {
      return {
        ok: true,
        message: `Chat menu button in @${TELEGRAM_BOT_USERNAME} successfully reset to standard commands.`
      };
    } else {
      return {
        ok: false,
        message: data.description || 'Failed to reset menu button'
      };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection failed';
    return { ok: false, message };
  }
}

/**
 * Sends a message notification via the bot to a Telegram chat ID
 */
export async function sendTelegramBotMessage(
  chatId: string | number,
  text: string
): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML'
      })
    });
    const data = await res.json();
    return { ok: data.ok, message: data.description };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection failed';
    return { ok: false, message };
  }
}

/**
 * Returns the Telegram WebApp instance if running in Telegram
 */
export function getTelegramWebApp() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp;
  }
  return null;
}

/**
 * Detects if the app is currently running inside Telegram Mini App
 */
export function isTelegramMiniApp(): boolean {
  const tg = getTelegramWebApp();
  if (!tg) return false;
  // If initData is present or platform is recognized (not 'unknown')
  if (tg.initData && tg.initData.length > 0) return true;
  if (tg.initDataUnsafe?.user) return true;
  if (tg.platform && tg.platform !== 'unknown') return true;
  return false;
}

/**
 * Extracts current authenticated user from Telegram WebApp SDK
 */
export function getTelegramUser(): TelegramWebAppUser | null {
  const tg = getTelegramWebApp();
  return tg?.initDataUnsafe?.user || null;
}

/**
 * Strips whitespace, leading @, and lowercases for uniform matching
 */
export function normalizeTelegramUsername(username: string): string {
  if (!username) return '';
  return username.trim().replace(/^@+/, '').toLowerCase();
}

/**
 * Formats a username to always include @ prefix for display
 */
export function formatTelegramHandle(username: string): string {
  if (!username) return '';
  const clean = username.trim().replace(/^@+/, '');
  return clean ? `@${clean}` : '';
}

/**
 * Checks if a given username matches the designated admin (@EximmanAbdIstad)
 */
export function isAdminTelegram(username: string): boolean {
  return normalizeTelegramUsername(username) === ADMIN_TELEGRAM_NORMALIZED;
}

/**
 * Validates user credentials against admin and registered Telegram students
 */
export function validateTelegramCredentials(
  input: { telegramUsername: string; phoneNumber?: string },
  registeredUsers: UserProfile[],
  authenticatedTelegramUsername?: string
): TelegramAuthValidationResult {
  const rawInput = input.telegramUsername?.trim() || '';
  if (!rawInput) {
    return {
      isValid: false,
      role: 'user',
      user: null,
      status: 'invalid_input',
      message: 'Please enter a valid Telegram username.',
      telegramHandle: ''
    };
  }

  const normalized = normalizeTelegramUsername(rawInput);
  const handle = `@${normalized}`;

  // 1. Admin Verification (Strict Security: only allowed if verified from official Telegram session)
  if (normalized === ADMIN_TELEGRAM_NORMALIZED) {
    const isSessionVerified =
      Boolean(authenticatedTelegramUsername) &&
      normalizeTelegramUsername(authenticatedTelegramUsername!) === ADMIN_TELEGRAM_NORMALIZED;

    const adminUser = registeredUsers.find(
      u => u.role === 'admin' || normalizeTelegramUsername(u.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED
    ) || null;

    if (isSessionVerified) {
      return {
        isValid: true,
        role: 'admin',
        user: adminUser,
        status: 'admin_matched',
        message: 'Authenticated as Administrator (@EximmanAbdIstad). Full access enabled.',
        telegramHandle: ADMIN_TELEGRAM_HANDLE
      };
    } else {
      return {
        isValid: false,
        role: 'user',
        user: null,
        status: 'invalid_input',
        message: 'Administrator (@EximmanAbdIstad) access requires logging in through your verified Telegram account.',
        telegramHandle: ADMIN_TELEGRAM_HANDLE
      };
    }
  }

  // 2. Student Verification against Admin-defined / Registered Accounts
  const matchedStudent = registeredUsers.find(
    u => normalizeTelegramUsername(u.telegramUsername) === normalized
  );

  if (matchedStudent) {
    const isPaid = matchedStudent.subscriptionStatus === 'active_paid';
    const isPending = matchedStudent.subscriptionStatus === 'pending_approval';
    const isExpired = matchedStudent.subscriptionStatus === 'expired';

    let msg = `Welcome back, ${matchedStudent.fullName}!`;
    if (isPaid) {
      msg += ' Your 30-day subscription is active.';
    } else if (isPending) {
      msg += ' Your subscription is awaiting @EximmanAbdIstad approval.';
    } else if (isExpired) {
      msg += ' Your 30-day subscription has expired. You can resubscribe for 3,900 ETB / 30 days.';
    } else {
      msg += ' Free trial active (Chapters 1 & 2).';
    }

    return {
      isValid: true,
      role: 'user',
      user: matchedStudent,
      status: 'user_matched',
      message: msg,
      telegramHandle: handle
    };
  }

  // 3. User Not Found in registered database
  return {
    isValid: false,
    role: 'user',
    user: null,
    status: 'not_found',
    message: `Telegram account ${handle} is not yet registered. You can enroll for Free Trial or submit a 3,900 ETB subscription.`,
    telegramHandle: handle
  };
}

/**
 * Initializes Telegram Mini App environment
 */
export function initTelegramMiniApp(options?: {
  onThemeChange?: (scheme: 'light' | 'dark') => void;
  onViewportChange?: () => void;
}) {
  const tg = getTelegramWebApp();
  if (!tg) return () => {};

  try {
    // Notify Telegram that WebApp is ready to be displayed
    tg.ready();
    
    // Expand to full available height
    if (!tg.isExpanded) {
      tg.expand();
    }

    // Enable closing confirmation so accidental swipes don't discard lesson progress
    if (tg.enableClosingConfirmation) {
      tg.enableClosingConfirmation();
    }

    // Set colors matching academy palette
    if (tg.setHeaderColor) {
      tg.setHeaderColor('#174f49');
    }
    if (tg.setBackgroundColor) {
      tg.setBackgroundColor(tg.colorScheme === 'dark' ? '#151d1b' : '#f5f6f1');
    }

    // Event listeners
    const handleTheme = () => {
      if (options?.onThemeChange && tg.colorScheme) {
        options.onThemeChange(tg.colorScheme);
      }
    };

    const handleViewport = () => {
      if (options?.onViewportChange) {
        options.onViewportChange();
      }
    };

    if (tg.onEvent) {
      tg.onEvent('themeChanged', handleTheme);
      tg.onEvent('viewportChanged', handleViewport);
    }

    return () => {
      if (tg.offEvent) {
        tg.offEvent('themeChanged', handleTheme);
        tg.offEvent('viewportChanged', handleViewport);
      }
    };
  } catch (err) {
    console.warn('[Telegram Mini App] Initialization notice:', err);
    return () => {};
  }
}

/**
 * Triggers Telegram native haptic feedback
 */
export function triggerTelegramHaptic(
  type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light'
) {
  const tg = getTelegramWebApp();
  if (!tg?.HapticFeedback) return;

  try {
    if (type === 'success' || type === 'warning' || type === 'error') {
      tg.HapticFeedback.notificationOccurred(type);
    } else {
      tg.HapticFeedback.impactOccurred(type);
    }
  } catch {
    // Ignore if not supported
  }
}
