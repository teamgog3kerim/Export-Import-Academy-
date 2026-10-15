import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AdminNotification, SubscriptionStatus } from '../types';
import { COURSE_MODULES } from '../data/courseData';
import { Language, translate } from '../utils/translations';
import {
  isTelegramMiniApp,
  getTelegramUser,
  initTelegramMiniApp,
  validateTelegramCredentials,
  normalizeTelegramUsername,
  formatTelegramHandle,
  isAdminTelegram,
  TelegramWebAppUser,
  TelegramWidgetUser,
  TelegramAuthValidationResult,
  ADMIN_TELEGRAM_HANDLE,
  ADMIN_TELEGRAM_NORMALIZED
} from '../utils/telegramAuth';

export type NavTabType =
  | 'overview'
  | 'curriculum'
  | 'lc_calculator'
  | 'landed_cost'
  | 'tax_calculator'
  | 'incoterms_guide'
  | 'quiz_center'
  | 'resources'
  | 'progress'
  | 'certificate'
  | 'subscription'
  | 'admin';

interface AppContextType {
  currentUser: UserProfile;
  users: UserProfile[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
  adminApproveUser: (userId: string, days?: number) => void;
  adminRejectUser: (userId: string, reason?: string) => void;
  adminExtendUser: (userId: string, days?: number) => void;
  adminGrantLifetime: (userId: string) => void;
  adminResetToTrial: (userId: string) => void;
  adminDeleteUser: (userId: string) => { success: boolean; message: string };
  adminNotifications: AdminNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  simulateTrialDays: (days: number) => void;
  switchUser: (userId: string) => void;
  loginAsAdmin: () => void;
  loginWithTelegram: (telegramUsername: string, fullName?: string, phoneNumber?: string) => void;
  loginWithTelegramWidget: (widgetUser: TelegramWidgetUser) => { success: boolean; message: string; role: 'admin' | 'user' };
  validateTelegramLogin: (telegramUsername: string, phoneNumber?: string) => TelegramAuthValidationResult;
  seamlessTelegramAuth: (credentials: {
    telegramUsername: string;
    fullName?: string;
    phoneNumber?: string;
  }) => { success: boolean; message: string; role: 'admin' | 'user' };
  logout: () => void;
  isTelegramApp: boolean;
  telegramWebAppUser: TelegramWebAppUser | null;
  submitSubscriptionPayment: (data: {
    telegramUsername: string;
    fullName: string;
    phoneNumber: string;
    telebirrTxId?: string;
    paymentScreenshot: string;
  }) => void;
  isAdmin: boolean;
  hasFullAccess: boolean;
  activeNavTab: NavTabType;
  setActiveNavTab: (tab: NavTabType) => void;
  selectedChapterId: string;
  setSelectedChapterId: (id: string) => void;
  showPaywallModal: boolean;
  setShowPaywallModal: (show: boolean) => void;
  showTelegramAuthModal: boolean;
  setShowTelegramAuthModal: (show: boolean) => void;
  // Progress and Certificate
  toggleChapterComplete: (chapterId: string) => void;
  isChapterCompleted: (chapterId: string) => boolean;
  completedChaptersCount: number;
  progressPercentage: number;
  issueCertificate: () => void;
  quizScores: Record<string, { score: number; maxScore: number; date: string }>;
  recordQuizScore: (chapterId: string, score: number, maxScore: number) => void;
}

const STORAGE_KEY_USERS = 'ethio_impex_users_v6';
const STORAGE_KEY_CURRENT_USER = 'ethio_impex_curr_user_v6';
const STORAGE_KEY_THEME = 'ethio_impex_theme';
const STORAGE_KEY_LANGUAGE = 'ethio_impex_lang_v1';
const STORAGE_KEY_QUIZ_SCORES = 'ethio_impex_quiz_scores_v6';
const STORAGE_KEY_USER_QUIZZES = 'ethio_impex_user_quizzes_v6';
const STORAGE_KEY_ADMIN_NOTIFS = 'ethio_impex_admin_notifs_v6';

type QuizScores = Record<string, { score: number; maxScore: number; date: string }>;
const ALL_CHAPTERS = COURSE_MODULES.flatMap(module => module.chapters);
const CHAPTER_IDS = new Set(ALL_CHAPTERS.map(chapter => chapter.id));

const saveLocal = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    window.dispatchEvent(new Event('academy-storage-error'));
  }
};

export const ADMIN_USER: UserProfile = {
  id: 'admin-eximman-abdistad',
  fullName: 'Abdulkerim (@EximmanAbdIstad)',
  telegramUsername: ADMIN_TELEGRAM_HANDLE,
  phoneNumber: '09 6768 4490',
  email: 'admin@eximmanlearn.et',
  role: 'admin',
  subscriptionStatus: 'active_paid',
  registeredAt: '2026-01-01T00:00:00.000Z',
  expiresAt: null,
  paymentAmount: 0,
  completedChapters: []
};

const playAdminChime = () => {
  try {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch {
    // Ignore audio restrictions
  }
};

export const GUEST_STUDENT_USER: UserProfile = {
  id: 'guest-student',
  fullName: 'New Student (Guest)',
  telegramUsername: '',
  phoneNumber: '',
  email: '',
  role: 'user',
  subscriptionStatus: 'free_trial',
  registeredAt: new Date().toISOString(),
  trialStartedAt: new Date().toISOString(),
  expiresAt: null,
  paymentAmount: 0,
  completedChapters: []
};

// Filter out sample dummy accounts from previous versions
const isSampleUserId = (id: string) =>
  ['student-01', 'student-02', 'student-03', 'student-04'].includes(id);

const INITIAL_USERS: UserProfile[] = [ADMIN_USER];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length) {
          const cleanList = parsed
            .filter(u => !isSampleUserId(u.id) && u.id !== 'admin-eximman-bot')
            .map(u => {
              // Only @EximmanAbdIstad can be admin
              if (u.role === 'admin' && normalizeTelegramUsername(u.telegramUsername) !== ADMIN_TELEGRAM_NORMALIZED) {
                return { ...u, role: 'user' as const };
              }
              return u;
            });
          const hasAdmin = cleanList.some(
            u => isAdminTelegram(u.telegramUsername) && u.role === 'admin'
          );
          if (!hasAdmin) {
            return [ADMIN_USER, ...cleanList];
          }
          return cleanList.length ? cleanList : INITIAL_USERS;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      const tgUser = getTelegramUser();
      // Security: if stored was admin, only allow if verified @EximmanAbdIstad in Telegram session
      if (stored === ADMIN_USER.id || stored === 'admin-eximman-abdistad') {
        const isVerifiedAdmin =
          Boolean(tgUser?.username) &&
          normalizeTelegramUsername(tgUser?.username || '') === ADMIN_TELEGRAM_NORMALIZED;
        if (isVerifiedAdmin) {
          return ADMIN_USER.id;
        }
        return 'guest-student';
      }
      if (stored && !isSampleUserId(stored) && stored !== 'admin-eximman-bot') return stored;
    } catch (e) {
      console.error(e);
    }
    return 'guest-student';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_THEME);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {
      console.error(e);
    }
    return 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LANGUAGE);
      if (stored === 'en' || stored === 'am') return stored;
    } catch (e) {
      console.error(e);
    }
    return 'en';
  });

  const [activeNavTab, setActiveNavTab] = useState<NavTabType>('overview');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch-1');
  const [showPaywallModal, setShowPaywallModal] = useState<boolean>(false);
  const [showTelegramAuthModal, setShowTelegramAuthModal] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (!stored || stored === 'guest-student') return true;
      const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
      if (storedUsers) {
        const parsed = JSON.parse(storedUsers);
        const user = parsed.find((u: UserProfile) => u.id === stored);
        if (!user || !user.telegramUsername) return true;
      }
    } catch {
      return true;
    }
    return false;
  });

  // Telegram Mini App detection & user state
  const [isTelegramApp, setIsTelegramApp] = useState<boolean>(() => isTelegramMiniApp());
  const [telegramWebAppUser, setTelegramWebAppUser] = useState<TelegramWebAppUser | null>(() => getTelegramUser());

  const [userQuizScores, setUserQuizScores] = useState<Record<string, QuizScores>>(() => {
    try {
      const scoped = localStorage.getItem(STORAGE_KEY_USER_QUIZZES);
      if (scoped) {
        const parsed = JSON.parse(scoped);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
      }
      const stored = localStorage.getItem(STORAGE_KEY_QUIZ_SCORES);
      if (stored) return { 'guest-student': JSON.parse(stored) };
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ADMIN_NOTIFS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    saveLocal(STORAGE_KEY_ADMIN_NOTIFS, JSON.stringify(adminNotifications));
  }, [adminNotifications]);

  const markNotificationRead = (id: string) => {
    setAdminNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setAdminNotifications([]);
  };

  // Cross-tab and real-time event listener for instant subscription requests and approvals
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_USERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setUsers(parsed);
          }
        } catch {}
      }
      if (e.key === STORAGE_KEY_ADMIN_NOTIFS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setAdminNotifications(parsed);
          }
        } catch {}
      }
    };

    const handleUserApproved = (e: Event) => {
      const customEv = e as CustomEvent<{ userId: string; expiresAt: string }>;
      if (customEv.detail?.userId) {
        setUsers(prev =>
          prev.map(u =>
            u.id === customEv.detail.userId
              ? {
                  ...u,
                  subscriptionStatus: 'active_paid' as const,
                  expiresAt: customEv.detail.expiresAt,
                  notes: 'Approved by @EximmanAbdIstad'
                }
              : u
          )
        );
      }
    };

    const handleSubRequest = () => {
      playAdminChime();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('academy-user-approved', handleUserApproved as EventListener);
    window.addEventListener('academy-subscription-request', handleSubRequest as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('academy-user-approved', handleUserApproved as EventListener);
      window.removeEventListener('academy-subscription-request', handleSubRequest as EventListener);
    };
  }, []);

  // Telegram Mini App Lifecycle Hook
  useEffect(() => {
    const isInsideTelegram = isTelegramMiniApp();
    setIsTelegramApp(isInsideTelegram);

    const cleanup = initTelegramMiniApp({
      onThemeChange: scheme => {
        setTheme(scheme);
      }
    });

    const tgUser = getTelegramUser();
    if (tgUser) {
      setTelegramWebAppUser(tgUser);
      const rawUser = tgUser.username ? `@${tgUser.username}` : `@id${tgUser.id}`;

      if (rawUser && isAdminTelegram(rawUser)) {
        loginAsAdmin();
      }
    }

    return () => {
      cleanup();
    };
  }, []);

  const currentUser = users.find(u => u.id === currentUserId) || GUEST_STUDENT_USER;

  // Guarantee pop-up Telegram login widget on app launch for unauthenticated visitors
  useEffect(() => {
    const isUnauthenticated = currentUserId === 'guest-student' || !currentUser.telegramUsername;
    if (isUnauthenticated) {
      const timer = setTimeout(() => {
        setShowTelegramAuthModal(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentUserId, currentUser.telegramUsername]);

  // Check if subscription has expired and sync status
  useEffect(() => {
    setUsers(prev => {
      let changed = false;
      const updated = prev.map(u => {
        if (
          u.role !== 'admin' &&
          u.subscriptionStatus === 'active_paid' &&
          u.expiresAt &&
          new Date(u.expiresAt).getTime() <= Date.now()
        ) {
          changed = true;
          return {
            ...u,
            subscriptionStatus: 'expired' as const,
            notes: `30-day subscription expired on ${new Date(u.expiresAt).toLocaleDateString()}. Resubscribe for 3,900 ETB / 30 days.`
          };
        }
        return u;
      });
      return changed ? updated : prev;
    });
  }, []);

  useEffect(() => {
    saveLocal(STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    saveLocal(STORAGE_KEY_CURRENT_USER, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    saveLocal(STORAGE_KEY_USER_QUIZZES, JSON.stringify(userQuizScores));
  }, [userQuizScores]);

  useEffect(() => {
    saveLocal(STORAGE_KEY_THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    saveLocal(STORAGE_KEY_LANGUAGE, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'am' : 'en'));
  };

  const t = (key: string, defaultText?: string) => {
    return translate(key, language, defaultText);
  };

  const quizScores = userQuizScores[currentUser.id] || {};

  // Only @EximmanAbdIstad is designated administrator
  const isAdmin =
    (currentUser.role === 'admin' && normalizeTelegramUsername(currentUser.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED) ||
    isAdminTelegram(currentUser.telegramUsername);

  const isSubscriptionValid = () => {
    if (isAdmin) return true;
    if (currentUser.subscriptionStatus !== 'active_paid') return false;
    if (!currentUser.expiresAt) return true;
    return new Date(currentUser.expiresAt).getTime() > Date.now();
  };

  const hasFullAccess = isAdmin || isSubscriptionValid();

  // Progress logic
  const completedChapters = [...new Set(currentUser.completedChapters || [])].filter(id => CHAPTER_IDS.has(id));
  const completedChaptersCount = completedChapters.length;
  const progressPercentage = Math.round((completedChaptersCount / ALL_CHAPTERS.length) * 100);

  const isChapterCompleted = (chapterId: string) => {
    return completedChapters.includes(chapterId);
  };

  const toggleChapterComplete = (chapterId: string) => {
    const chapter = ALL_CHAPTERS.find(ch => ch.id === chapterId);
    if (!chapter || (!hasFullAccess && !chapter.isFreeTrialAccessible)) {
      if (!hasFullAccess) setShowPaywallModal(true);
      return;
    }
    setUsers(prev =>
      prev.map(u => {
        if (u.id === currentUser.id) {
          const currentList = u.completedChapters || [];
          const exists = currentList.includes(chapterId);
          const updated = exists
            ? currentList.filter(id => id !== chapterId)
            : [...currentList, chapterId];

          return {
            ...u,
            completedChapters: updated
          };
        }
        return u;
      })
    );
  };

  const recordQuizScore = (chapterId: string, score: number, maxScore: number) => {
    const chapter = ALL_CHAPTERS.find(ch => ch.id === chapterId);
    if (!chapter || (!hasFullAccess && !chapter.isFreeTrialAccessible) ||
      !Number.isInteger(score) || maxScore !== chapter.quiz.length || maxScore < 1 ||
      score < 0 || score > maxScore) {
      if (!hasFullAccess && chapter && !chapter.isFreeTrialAccessible) setShowPaywallModal(true);
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    setUserQuizScores(prev => ({
      ...prev,
      [currentUser.id]: {
        ...prev[currentUser.id],
        [chapterId]: { score, maxScore, date: today }
      }
    }));

    if (score / maxScore >= 0.6) {
      if (!isChapterCompleted(chapterId)) {
        toggleChapterComplete(chapterId);
      }
    }
  };

  const issueCertificate = () => {
    if (completedChaptersCount !== ALL_CHAPTERS.length) return;
    const certCode = `ET-IMPEX-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const now = new Date().toISOString();

    setUsers(prev =>
      prev.map(u => {
        if (u.id === currentUserId) {
          return {
            ...u,
            certificateId: u.certificateId || certCode,
            certificateIssuedAt: u.certificateIssuedAt || now
          };
        }
        return u;
      })
    );
  };

  const submitSubscriptionPayment = (data: {
    telegramUsername: string;
    fullName: string;
    phoneNumber: string;
    telebirrTxId?: string;
    paymentScreenshot: string;
  }) => {
    const formattedTelegram = formatTelegramHandle(data.telegramUsername);
    const now = new Date().toISOString();
    let assignedUserId = '';

    setUsers(prev => {
      const existingIdx = prev.findIndex(
        u => u.id === currentUser.id || normalizeTelegramUsername(u.telegramUsername) === normalizeTelegramUsername(formattedTelegram)
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        const target = copy[existingIdx];
        assignedUserId = target.id;
        const wasWidgetUser = Boolean(target.isTelegramWidgetUser || currentUser.isTelegramWidgetUser);
        copy[existingIdx] = {
          ...target,
          fullName: data.fullName.trim() || target.fullName,
          telegramUsername: formattedTelegram,
          phoneNumber: data.phoneNumber.trim() || target.phoneNumber,
          subscriptionStatus: 'pending_approval',
          isTelegramWidgetUser: wasWidgetUser,
          telebirrTxId: data.telebirrTxId?.trim() || target.telebirrTxId,
          paymentScreenshot: data.paymentScreenshot,
          paymentAmount: 3900,
          paymentRejectedReason: undefined,
          paymentRejectedAt: undefined,
          paymentSubmittedAt: now,
          notes: `Telebirr 3,900 ETB payment submitted for @EximmanAbdIstad approval`
        };
        setCurrentUserId(target.id);
        saveLocal(STORAGE_KEY_USERS, JSON.stringify(copy));
        return copy;
      } else {
        const isFromWidget = Boolean(currentUser.isTelegramWidgetUser);
        const newUser: UserProfile = {
          id: `user-${Date.now()}`,
          fullName: data.fullName.trim() || formattedTelegram,
          telegramUsername: formattedTelegram,
          phoneNumber: data.phoneNumber.trim(),
          role: 'user',
          subscriptionStatus: 'pending_approval',
          isTelegramWidgetUser: isFromWidget,
          registeredAt: now,
          trialStartedAt: now,
          expiresAt: null,
          telebirrTxId: data.telebirrTxId?.trim(),
          paymentScreenshot: data.paymentScreenshot,
          paymentAmount: 3900,
          notes: `Telebirr 3,900 ETB payment submitted for @EximmanAbdIstad approval`,
          completedChapters: []
        };
        assignedUserId = newUser.id;
        setCurrentUserId(newUser.id);
        const updated = [...prev, newUser];
        saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
        return updated;
      }
    });

    const isWidgetStudent = Boolean(currentUser.isTelegramWidgetUser);

    // Notify the admin INSTANTLY for every user's subscription request
    const notif: AdminNotification = {
      id: `notif-sub-${Date.now()}`,
      type: 'subscription_request',
      userId: assignedUserId,
      telegramUsername: formattedTelegram,
      fullName: data.fullName.trim() || formattedTelegram,
      amount: 3900,
      timestamp: now,
      read: false,
      isTelegramWidgetUser: isWidgetStudent,
      telebirrTxId: data.telebirrTxId?.trim(),
      hasScreenshot: Boolean(data.paymentScreenshot),
      message: `🚨 ${isWidgetStudent ? '[Telegram Widget] ' : ''}New Subscription Request: ${formattedTelegram} (${data.fullName.trim() || formattedTelegram}) submitted 3,900 ETB for 30-day approval!`
    };

    setAdminNotifications(prev => [notif, ...prev]);
    playAdminChime();

    // Broadcast instant subscription request notification event
    window.dispatchEvent(
      new CustomEvent('academy-subscription-request', {
        detail: {
          userId: assignedUserId,
          telegramUsername: formattedTelegram,
          fullName: data.fullName.trim() || formattedTelegram,
          amount: 3900,
          isTelegramWidgetUser: isWidgetStudent
        }
      })
    );
  };

  const loginWithTelegram = (telegramUsername: string, fullName?: string, phoneNumber?: string) => {
    const formatted = formatTelegramHandle(telegramUsername);
    const normalized = normalizeTelegramUsername(formatted);

    // Prevent direct text bypass to admin account without verified credentials
    if (normalized === ADMIN_TELEGRAM_NORMALIZED) {
      const tgUser = getTelegramUser();
      const isTgAdmin = Boolean(tgUser?.username) && normalizeTelegramUsername(tgUser?.username || '') === ADMIN_TELEGRAM_NORMALIZED;
      if (!isTgAdmin) {
        console.warn('Administrator (@EximmanAbdIstad) login requires verified Telegram session or official widget.');
        return;
      }
      loginAsAdmin();
      return;
    }

    const now = new Date().toISOString();

    setUsers(prev => {
      const matchIdx = prev.findIndex(
        u => normalizeTelegramUsername(u.telegramUsername) === normalized
      );
      if (matchIdx >= 0) {
        const copy = [...prev];
        const existing = copy[matchIdx];
        copy[matchIdx] = {
          ...existing,
          fullName: fullName?.trim() || existing.fullName || formatted,
          phoneNumber: phoneNumber?.trim() || existing.phoneNumber || '',
          lastLoginAt: now
        };
        setCurrentUserId(existing.id);
        saveLocal(STORAGE_KEY_USERS, JSON.stringify(copy));
        return copy;
      }

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        fullName: fullName?.trim() || formatted,
        telegramUsername: formatted,
        phoneNumber: phoneNumber?.trim() || '',
        role: 'user',
        subscriptionStatus: 'free_trial',
        registeredAt: now,
        trialStartedAt: now,
        lastLoginAt: now,
        expiresAt: null,
        paymentAmount: 0,
        completedChapters: []
      };
      setCurrentUserId(newUser.id);
      const updated = [...prev, newUser];
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });
  };

  const loginWithTelegramWidget = (widgetUser: TelegramWidgetUser) => {
    const rawHandle = widgetUser.username ? `@${widgetUser.username}` : `@id${widgetUser.id}`;
    const formatted = formatTelegramHandle(rawHandle);
    const normalized = normalizeTelegramUsername(formatted);
    const fullName = [widgetUser.first_name, widgetUser.last_name].filter(Boolean).join(' ') || formatted;
    const now = new Date().toISOString();

    if (normalized === ADMIN_TELEGRAM_NORMALIZED) {
      setUsers(prev => {
        const hasAdmin = prev.some(u => normalizeTelegramUsername(u.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED);
        if (!hasAdmin) return [ADMIN_USER, ...prev];
        const updated = prev.map(u =>
          normalizeTelegramUsername(u.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED
            ? { ...u, role: 'admin' as const, subscriptionStatus: 'active_paid' as const, fullName, lastLoginAt: now }
            : u
        );
        saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
        return updated;
      });
      setCurrentUserId('admin-eximman-abdistad');
      setActiveNavTab('admin');
      return { success: true, message: 'Authenticated as Administrator (@EximmanAbdIstad)', role: 'admin' as const };
    }

    let targetUserId = '';
    let isNewRegistration = false;
    let userSubscriptionStatus: SubscriptionStatus | null = null;

    setUsers(prev => {
      const matchIdx = prev.findIndex(
        u => normalizeTelegramUsername(u.telegramUsername) === normalized
      );

      if (matchIdx >= 0) {
        const copy = [...prev];
        const target = copy[matchIdx];
        targetUserId = target.id;
        userSubscriptionStatus = target.subscriptionStatus;
        copy[matchIdx] = {
          ...target,
          fullName: fullName || target.fullName,
          lastLoginAt: now,
          isTelegramWidgetUser: true
        };
        saveLocal(STORAGE_KEY_USERS, JSON.stringify(copy));
        return copy;
      }

      isNewRegistration = true;
      const newUser: UserProfile = {
        id: `tg-${widgetUser.id || Date.now()}`,
        fullName,
        telegramUsername: formatted,
        phoneNumber: '',
        role: 'user',
        subscriptionStatus: 'free_trial',
        registeredAt: now,
        trialStartedAt: now,
        lastLoginAt: now,
        isTelegramWidgetUser: true,
        expiresAt: null,
        paymentAmount: 0,
        completedChapters: [],
        notes: 'Automatically enrolled via Telegram Login Widget (Free Trial Ch 1 & 2)'
      };
      targetUserId = newUser.id;
      const updated = [...prev, newUser];
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });

    if (targetUserId) {
      setCurrentUserId(targetUserId);
    }

    // Automatically record and notify admin of Telegram widget student login
    if (isNewRegistration) {
      const notif: AdminNotification = {
        id: `notif-tg-${Date.now()}`,
        type: 'trial_login',
        userId: targetUserId,
        telegramUsername: formatted,
        fullName,
        amount: 0,
        timestamp: now,
        read: false,
        isTelegramWidgetUser: true,
        message: `New student auto-recorded via Telegram Login Widget: ${fullName} (${formatted}) on Free Trial`
      };
      setAdminNotifications(prev => [notif, ...prev]);
      window.dispatchEvent(new CustomEvent('academy-user-update', { detail: { userId: targetUserId } }));
    } else if (userSubscriptionStatus === 'pending_approval') {
      const notif: AdminNotification = {
        id: `notif-tg-pending-${Date.now()}`,
        type: 'subscription_request',
        userId: targetUserId,
        telegramUsername: formatted,
        fullName,
        amount: 3900,
        timestamp: now,
        read: false,
        isTelegramWidgetUser: true,
        message: `🚨 Telegram Widget user ${fullName} (${formatted}) logged in with PENDING 3,900 ETB subscription approval request!`
      };
      setAdminNotifications(prev => [notif, ...prev]);
      playAdminChime();
    }

    return {
      success: true,
      message: `Welcome, ${fullName}! Your Telegram account (${formatted}) is connected. Continue learning!`,
      role: 'user' as const
    };
  };

  const validateTelegramLogin = (telegramUsername: string, phoneNumber?: string): TelegramAuthValidationResult => {
    return validateTelegramCredentials({ telegramUsername, phoneNumber }, users);
  };

  const seamlessTelegramAuth = (credentials: {
    telegramUsername: string;
    fullName?: string;
    phoneNumber?: string;
  }) => {
    const formatted = formatTelegramHandle(credentials.telegramUsername);
    const normalized = normalizeTelegramUsername(formatted);

    // Prevent unauthorized hijack of admin account
    if (normalized === ADMIN_TELEGRAM_NORMALIZED) {
      const tgUser = getTelegramUser();
      const isTgAdmin = Boolean(tgUser?.username) && normalizeTelegramUsername(tgUser?.username || '') === ADMIN_TELEGRAM_NORMALIZED;
      if (!isTgAdmin) {
        return {
          success: false,
          message: 'Administrator (@EximmanAbdIstad) access requires logging in through your verified Telegram account or widget.',
          role: 'user' as const
        };
      }
      loginAsAdmin();
      return { success: true, message: 'Logged in as Administrator (@EximmanAbdIstad)', role: 'admin' as const };
    }

    const val = validateTelegramCredentials(
      { telegramUsername: credentials.telegramUsername, phoneNumber: credentials.phoneNumber },
      users
    );

    const now = new Date().toISOString();

    if (val.status === 'user_matched' && val.user) {
      setUsers(prev => {
        const updated = prev.map(u => (u.id === val.user!.id ? { ...u, lastLoginAt: now } : u));
        saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
        return updated;
      });
      setCurrentUserId(val.user.id);
      setActiveNavTab('overview');
      return { success: true, message: `Welcome back, ${val.user.fullName}!`, role: 'user' as const };
    }

    loginWithTelegram(credentials.telegramUsername, credentials.fullName, credentials.phoneNumber);
    return {
      success: true,
      message: `Enrolled student account for ${formatted}. Free trial activated!`,
      role: 'user' as const
    };
  };

  const adminApproveUser = (userId: string, days: number = 30) => {
    if (!isAdmin || !Number.isInteger(days) || days < 1) return;
    const now = new Date();
    const expiry = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const expiryIso = expiry.toISOString();

    setUsers(prev => {
      const updated = prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            subscriptionStatus: 'active_paid' as const,
            approvedAt: now.toISOString(),
            expiresAt: expiryIso,
            notes: `Approved by @EximmanAbdIstad for ${days} days until ${expiry.toLocaleDateString()}`
          };
        }
        return u;
      });
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });

    // Mark notifications for this user as approved/read
    setAdminNotifications(prev =>
      prev.map(n => (n.userId === userId ? { ...n, read: true } : n))
    );

    // Broadcast instant approval so user gets immediate access in current or other sessions
    window.dispatchEvent(
      new CustomEvent('academy-user-approved', {
        detail: { userId, days, expiresAt: expiryIso }
      })
    );
  };

  const adminDeleteUser = (userId: string) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    const target = users.find(u => u.id === userId);
    if (!target) return { success: false, message: 'User not found' };

    // Prevent deletion of designated administrator @EximmanAbdIstad
    if (
      target.id === ADMIN_USER.id ||
      target.id === 'admin-eximman-abdistad' ||
      normalizeTelegramUsername(target.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED
    ) {
      return { success: false, message: 'Administrator (@EximmanAbdIstad) cannot be deleted.' };
    }

    setUsers(prev => {
      const updated = prev.filter(u => u.id !== userId);
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });

    // If deleting the active user in the preview session, revert to admin or guest
    if (currentUserId === userId) {
      setCurrentUserId(ADMIN_USER.id);
    }

    // Clean up quiz scores
    setUserQuizScores(prev => {
      const copy = { ...prev };
      delete copy[userId];
      saveLocal(STORAGE_KEY_USER_QUIZZES, JSON.stringify(copy));
      return copy;
    });

    // Remove notifications for this user
    setAdminNotifications(prev => prev.filter(n => n.userId !== userId));

    window.dispatchEvent(new CustomEvent('academy-user-deleted', { detail: { userId } }));
    return {
      success: true,
      message: `Successfully deleted user ${target.fullName} (${target.telegramUsername}) from admin records.`
    };
  };

  const simulateTrialDays = (days: number) => {
    const simulatedDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    setUsers(prev => {
      const updated = prev.map(u => {
        if (u.id === currentUserId) {
          return {
            ...u,
            subscriptionStatus: 'free_trial' as const,
            registeredAt: simulatedDate,
            trialStartedAt: simulatedDate
          };
        }
        return u;
      });
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });
  };

  const adminGrantLifetime = (userId: string) => {
    if (!isAdmin) return;
    const now = new Date();
    setUsers(prev => {
      const updated = prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            subscriptionStatus: 'active_paid' as const,
            approvedAt: now.toISOString(),
            expiresAt: null,
            notes: `Granted Lifetime VIP Full Access by @EximmanAbdIstad on ${now.toLocaleDateString()}`
          };
        }
        return u;
      });
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });
  };

  const adminResetToTrial = (userId: string) => {
    if (!isAdmin) return;
    setUsers(prev => {
      const updated = prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            subscriptionStatus: 'free_trial' as const,
            expiresAt: null,
            notes: `Reset to Free Trial (Chapters 1 & 2) by @EximmanAbdIstad`
          };
        }
        return u;
      });
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });
  };

  const adminRejectUser = (userId: string, reason?: string) => {
    if (!isAdmin) return;
    const defaultReason =
      reason ||
      'Telebirr payment transfer failed or could not be verified. Please upload the correct payment screenshot and try again for subscription approval.';
    setUsers(prev => {
      const updated = prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            subscriptionStatus: 'rejected' as const,
            paymentRejectedReason: defaultReason,
            paymentRejectedAt: new Date().toISOString(),
            notes: `Rejected by @EximmanAbdIstad: ${defaultReason}`
          };
        }
        return u;
      });
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });

    // Mark notifications for this user as handled
    setAdminNotifications(prev =>
      prev.map(n => (n.userId === userId ? { ...n, read: true } : n))
    );

    // Broadcast instant rejection event so subscriber is immediately notified
    window.dispatchEvent(
      new CustomEvent('academy-payment-rejected', {
        detail: { userId, reason: defaultReason }
      })
    );
  };

  const adminExtendUser = (userId: string, days: number = 30) => {
    if (!isAdmin || !Number.isInteger(days) || days < 1) return;
    setUsers(prev => {
      const updated = prev.map(u => {
        if (u.id === userId) {
          const currentExpiry = u.expiresAt ? new Date(u.expiresAt).getTime() : Date.now();
          const baseTime = Math.max(currentExpiry, Date.now());
          const newExpiry = new Date(baseTime + days * 24 * 60 * 60 * 1000);
          return {
            ...u,
            subscriptionStatus: 'active_paid' as const,
            expiresAt: newExpiry.toISOString(),
            notes: `Extended +${days} days by @EximmanAbdIstad until ${newExpiry.toLocaleDateString()}`
          };
        }
        return u;
      });
      saveLocal(STORAGE_KEY_USERS, JSON.stringify(updated));
      return updated;
    });
  };

  const switchUser = (userId: string) => {
    const target = users.find(user => user.id === userId);
    if (!target) return;

    // Strict security check: NEVER allow switching to admin account!
    const isTargetAdmin =
      target.role === 'admin' ||
      normalizeTelegramUsername(target.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED;

    if (isTargetAdmin) {
      if (!isAdmin) {
        console.warn('Security alert: Unauthorized attempt to switch to admin account blocked.');
        return;
      }
    }

    // "never let users switch accounts to the admin account, don't give other users to switch account to the admin account and get into the app using the admin account. Just let them use the account they logged in only."
    if (!isAdmin && userId !== currentUserId) {
      console.warn('Students may only access the account they logged in with.');
      return;
    }

    setCurrentUserId(userId);
    setActiveNavTab('overview');
  };

  const loginAsAdmin = () => {
    const tgUser = getTelegramUser();
    const isTgAdmin = Boolean(tgUser?.username) && normalizeTelegramUsername(tgUser?.username || '') === ADMIN_TELEGRAM_NORMALIZED;
    const isCurrentAdmin = Boolean(currentUser.telegramUsername) && normalizeTelegramUsername(currentUser.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED;

    if (!isTgAdmin && !isCurrentAdmin) {
      console.warn('Access denied: Only @EximmanAbdIstad can log in as administrator.');
      return;
    }

    setUsers(prev => {
      const hasAdmin = prev.some(u => normalizeTelegramUsername(u.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED);
      if (!hasAdmin) {
        return [ADMIN_USER, ...prev.filter(u => u.id !== 'admin-eximman-bot')];
      }
      return prev.map(u =>
        normalizeTelegramUsername(u.telegramUsername) === ADMIN_TELEGRAM_NORMALIZED
          ? { ...u, role: 'admin' as const, subscriptionStatus: 'active_paid' as const }
          : u
      );
    });
    setCurrentUserId('admin-eximman-abdistad');
    setActiveNavTab('admin');
  };

  const logout = () => {
    setCurrentUserId('guest-student');
    setActiveNavTab('overview');
    setShowTelegramAuthModal(true);
  };

  const handleSetActiveNavTab = (tab: NavTabType) => {
    const subscriberTabs: NavTabType[] = ['landed_cost', 'lc_calculator', 'tax_calculator', 'incoterms_guide'];
    if (subscriberTabs.includes(tab) && !hasFullAccess) {
      setShowPaywallModal(true);
      return;
    }
    setActiveNavTab(tab);
  };

  const handleSetSelectedChapterId = (id: string) => {
    setSelectedChapterId(id);
    const chapter = ALL_CHAPTERS.find(ch => ch.id === id);
    if (chapter && !chapter.isFreeTrialAccessible && !hasFullAccess) {
      setShowPaywallModal(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        theme,
        toggleTheme,
        language,
        setLanguage,
        toggleLanguage,
        t,
        adminApproveUser,
        adminRejectUser,
        adminExtendUser,
        adminGrantLifetime,
        adminResetToTrial,
        adminDeleteUser,
        adminNotifications,
        markNotificationRead,
        clearAllNotifications,
        simulateTrialDays,
        switchUser,
        loginAsAdmin,
        logout,
        loginWithTelegram,
        loginWithTelegramWidget,
        validateTelegramLogin,
        seamlessTelegramAuth,
        isTelegramApp,
        telegramWebAppUser,
        submitSubscriptionPayment,
        isAdmin,
        hasFullAccess,
        activeNavTab,
        setActiveNavTab: handleSetActiveNavTab,
        selectedChapterId,
        setSelectedChapterId: handleSetSelectedChapterId,
        showPaywallModal,
        setShowPaywallModal,
        showTelegramAuthModal,
        setShowTelegramAuthModal,
        toggleChapterComplete,
        isChapterCompleted,
        completedChaptersCount,
        progressPercentage,
        issueCertificate,
        quizScores,
        recordQuizScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
