import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { COURSE_MODULES } from '../data/courseData';
import {
  isTelegramMiniApp,
  getTelegramUser,
  initTelegramMiniApp,
  validateTelegramCredentials,
  normalizeTelegramUsername,
  formatTelegramHandle,
  isAdminTelegram,
  TelegramWebAppUser,
  TelegramAuthValidationResult,
  ADMIN_TELEGRAM_HANDLE
} from '../utils/telegramAuth';

export type NavTabType =
  | 'overview'
  | 'curriculum'
  | 'lc_calculator'
  | 'landed_cost'
  | 'tax_calculator'
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
  adminApproveUser: (userId: string, days?: number) => void;
  adminRejectUser: (userId: string, reason?: string) => void;
  adminExtendUser: (userId: string, days?: number) => void;
  switchUser: (userId: string) => void;
  loginAsAdmin: () => void;
  loginWithTelegram: (telegramUsername: string, fullName?: string, phoneNumber?: string) => void;
  validateTelegramLogin: (telegramUsername: string, phoneNumber?: string) => TelegramAuthValidationResult;
  seamlessTelegramAuth: (credentials: {
    telegramUsername: string;
    fullName?: string;
    phoneNumber?: string;
  }) => { success: boolean; message: string; role: 'admin' | 'user' };
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

const STORAGE_KEY_USERS = 'ethio_impex_users_v5';
const STORAGE_KEY_CURRENT_USER = 'ethio_impex_curr_user_v5';
const STORAGE_KEY_THEME = 'ethio_impex_theme';
const STORAGE_KEY_QUIZ_SCORES = 'ethio_impex_quiz_scores_v5';
const STORAGE_KEY_USER_QUIZZES = 'ethio_impex_user_quizzes_v5';

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

const ADMIN_BOT_USER: UserProfile = {
  id: 'admin-eximman-bot',
  fullName: 'Eximman Admin',
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

const DEFAULT_STUDENT_USER: UserProfile = {
  id: 'student-01',
  fullName: 'Abebe Kebede',
  telegramUsername: '@abebe_trade',
  phoneNumber: '09 1122 3344',
  email: 'abebe@example.com',
  role: 'user',
  subscriptionStatus: 'free_trial',
  registeredAt: '2026-01-01T00:00:00.000Z',
  expiresAt: null,
  paymentAmount: 0,
  completedChapters: ['ch-1']
};

const SEED_PAID_USER: UserProfile = {
  id: 'student-02',
  fullName: 'Selamawit Tesfaye',
  telegramUsername: '@selam_exim',
  phoneNumber: '09 2233 4455',
  email: 'selam@example.com',
  role: 'user',
  subscriptionStatus: 'active_paid',
  registeredAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  approvedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  expiresAt: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(), // 22 days left of 30
  paymentAmount: 3900,
  telebirrTxId: 'TB-8842199',
  notes: 'Approved 30 days active subscription by @Eximmanlearnbot',
  completedChapters: ['ch-1', 'ch-2', 'ch-3', 'ch-4', 'ch-5', 'ch-6']
};

const SEED_EXPIRED_USER: UserProfile = {
  id: 'student-03',
  fullName: 'Dawit Haile',
  telegramUsername: '@dawit_logistics',
  phoneNumber: '09 3344 5566',
  email: 'dawit@example.com',
  role: 'user',
  subscriptionStatus: 'expired',
  registeredAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
  approvedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
  expiresAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // expired 5 days ago
  paymentAmount: 3900,
  telebirrTxId: 'TB-7712340',
  notes: '30-day subscription expired. Ready to resubscribe for 3,900 ETB / 30 days.',
  completedChapters: ['ch-1', 'ch-2', 'ch-3', 'ch-4']
};

const SEED_PENDING_USER: UserProfile = {
  id: 'student-04',
  fullName: 'Tigist Alemu',
  telegramUsername: '@tigist_trade',
  phoneNumber: '09 4455 6677',
  email: 'tigist@example.com',
  role: 'user',
  subscriptionStatus: 'pending_approval',
  registeredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  expiresAt: null,
  paymentAmount: 3900,
  telebirrTxId: 'TB-9988214',
  notes: 'Telebirr 3,900 ETB payment submitted for @Eximmanlearnbot approval',
  completedChapters: ['ch-1']
};

const SEED_USERS: UserProfile[] = [
  ADMIN_BOT_USER,
  DEFAULT_STUDENT_USER,
  SEED_PAID_USER,
  SEED_EXPIRED_USER,
  SEED_PENDING_USER
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length) {
          const hasBotAdmin = parsed.some(
            u => isAdminTelegram(u.telegramUsername) && u.role === 'admin'
          );
          if (!hasBotAdmin) {
            return [ADMIN_BOT_USER, ...parsed.filter(u => u.id !== 'admin-eximman-bot')];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return SEED_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (stored) return stored;
    } catch (e) {
      console.error(e);
    }
    return 'student-01';
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

  const [activeNavTab, setActiveNavTab] = useState<NavTabType>('overview');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch-1');
  const [showPaywallModal, setShowPaywallModal] = useState<boolean>(false);
  const [showTelegramAuthModal, setShowTelegramAuthModal] = useState<boolean>(false);

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
      if (stored) return { 'student-01': JSON.parse(stored) };
    } catch (e) {
      console.error(e);
    }
    return {};
  });

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
      const rawUser = tgUser.username ? `@${tgUser.username}` : '';
      const fullName = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ') || rawUser || 'Telegram User';

      if (rawUser) {
        if (isAdminTelegram(rawUser)) {
          loginAsAdmin();
        } else {
          loginWithTelegram(rawUser, fullName);
        }
      }
    }

    return () => {
      cleanup();
    };
  }, []);

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

  const currentUser = users.find(u => u.id === currentUserId) || users[0] || ADMIN_BOT_USER;
  const quizScores = userQuizScores[currentUser.id] || {};

  // @Eximmanlearnbot is designated administrator
  const isAdmin = currentUser.role === 'admin' || isAdminTelegram(currentUser.telegramUsername);

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

    setUsers(prev => {
      const existingIdx = prev.findIndex(
        u => u.id === currentUser.id || normalizeTelegramUsername(u.telegramUsername) === normalizeTelegramUsername(formattedTelegram)
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        const target = copy[existingIdx];
        copy[existingIdx] = {
          ...target,
          fullName: data.fullName.trim() || target.fullName,
          telegramUsername: formattedTelegram,
          phoneNumber: data.phoneNumber.trim() || target.phoneNumber,
          subscriptionStatus: 'pending_approval',
          telebirrTxId: data.telebirrTxId?.trim() || target.telebirrTxId,
          paymentScreenshot: data.paymentScreenshot,
          paymentAmount: 3900,
          notes: `Telebirr 3,900 ETB payment submitted for @Eximmanlearnbot approval`
        };
        setCurrentUserId(target.id);
        return copy;
      } else {
        const newUser: UserProfile = {
          id: `user-${Date.now()}`,
          fullName: data.fullName.trim() || formattedTelegram,
          telegramUsername: formattedTelegram,
          phoneNumber: data.phoneNumber.trim(),
          role: 'user',
          subscriptionStatus: 'pending_approval',
          registeredAt: now,
          expiresAt: null,
          telebirrTxId: data.telebirrTxId?.trim(),
          paymentScreenshot: data.paymentScreenshot,
          paymentAmount: 3900,
          notes: `Telebirr 3,900 ETB payment submitted for @Eximmanlearnbot approval`,
          completedChapters: []
        };
        setCurrentUserId(newUser.id);
        return [...prev, newUser];
      }
    });
  };

  const loginWithTelegram = (telegramUsername: string, fullName?: string, phoneNumber?: string) => {
    const formatted = formatTelegramHandle(telegramUsername);

    if (isAdminTelegram(formatted)) {
      loginAsAdmin();
      return;
    }

    setUsers(prev => {
      const match = prev.find(
        u => normalizeTelegramUsername(u.telegramUsername) === normalizeTelegramUsername(formatted)
      );
      if (match) {
        setCurrentUserId(match.id);
        return prev;
      }

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        fullName: fullName?.trim() || formatted,
        telegramUsername: formatted,
        phoneNumber: phoneNumber?.trim() || '',
        role: 'user',
        subscriptionStatus: 'free_trial',
        registeredAt: new Date().toISOString(),
        expiresAt: null,
        paymentAmount: 0,
        completedChapters: []
      };
      setCurrentUserId(newUser.id);
      return [...prev, newUser];
    });
  };

  const validateTelegramLogin = (telegramUsername: string, phoneNumber?: string): TelegramAuthValidationResult => {
    return validateTelegramCredentials({ telegramUsername, phoneNumber }, users);
  };

  const seamlessTelegramAuth = (credentials: {
    telegramUsername: string;
    fullName?: string;
    phoneNumber?: string;
  }) => {
    const val = validateTelegramCredentials(
      { telegramUsername: credentials.telegramUsername, phoneNumber: credentials.phoneNumber },
      users
    );

    if (val.role === 'admin') {
      loginAsAdmin();
      return { success: true, message: 'Logged in as Administrator (@Eximmanlearnbot)', role: 'admin' as const };
    }

    if (val.status === 'user_matched' && val.user) {
      switchUser(val.user.id);
      return { success: true, message: `Welcome back, ${val.user.fullName}!`, role: 'user' as const };
    }

    loginWithTelegram(credentials.telegramUsername, credentials.fullName, credentials.phoneNumber);
    return {
      success: true,
      message: `Enrolled student account for ${formatTelegramHandle(credentials.telegramUsername)}. Free trial activated!`,
      role: 'user' as const
    };
  };

  const adminApproveUser = (userId: string, days: number = 30) => {
    if (!isAdmin || !Number.isInteger(days) || days < 1) return;
    const now = new Date();
    const expiry = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            subscriptionStatus: 'active_paid',
            approvedAt: now.toISOString(),
            expiresAt: expiry.toISOString(),
            notes: `Approved by @Eximmanlearnbot for ${days} days until ${expiry.toLocaleDateString()}`
          };
        }
        return u;
      })
    );
  };

  const adminRejectUser = (userId: string, reason?: string) => {
    if (!isAdmin) return;
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            subscriptionStatus: 'rejected',
            notes: reason || 'Telebirr payment screenshot could not be verified'
          };
        }
        return u;
      })
    );
  };

  const adminExtendUser = (userId: string, days: number = 30) => {
    if (!isAdmin || !Number.isInteger(days) || days < 1) return;
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const currentExpiry = u.expiresAt ? new Date(u.expiresAt).getTime() : Date.now();
          const baseTime = Math.max(currentExpiry, Date.now());
          const newExpiry = new Date(baseTime + days * 24 * 60 * 60 * 1000);
          return {
            ...u,
            subscriptionStatus: 'active_paid',
            expiresAt: newExpiry.toISOString(),
            notes: `Extended +${days} days by @Eximmanlearnbot until ${newExpiry.toLocaleDateString()}`
          };
        }
        return u;
      })
    );
  };

  const switchUser = (userId: string) => {
    if (!users.some(user => user.id === userId)) return;
    setCurrentUserId(userId);
    setActiveNavTab('overview');
  };

  const loginAsAdmin = () => {
    setUsers(prev => {
      const hasBot = prev.some(u => isAdminTelegram(u.telegramUsername));
      if (!hasBot) {
        return [ADMIN_BOT_USER, ...prev];
      }
      return prev;
    });
    setCurrentUserId('admin-eximman-bot');
    setActiveNavTab('admin');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        theme,
        toggleTheme,
        adminApproveUser,
        adminRejectUser,
        adminExtendUser,
        switchUser,
        loginAsAdmin,
        loginWithTelegram,
        validateTelegramLogin,
        seamlessTelegramAuth,
        isTelegramApp,
        telegramWebAppUser,
        submitSubscriptionPayment,
        isAdmin,
        hasFullAccess,
        activeNavTab,
        setActiveNavTab,
        selectedChapterId,
        setSelectedChapterId,
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
