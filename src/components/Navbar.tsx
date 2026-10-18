import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import type { NavTabType } from '../context/AppContext';
import { isAdminTelegram } from '../utils/telegramAuth';
import {
  Award,
  BookOpen,
  Calculator,
  Check,
  ChevronDown,
  Coins,
  Compass,
  CreditCard,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  Menu,
  Moon,
  Shield,
  Ship,
  Sun,
  X,
  Send,
  User,
  Plus,
  LogOut,
  Languages,
  Lock,
  Bell,
  Clock
} from 'lucide-react';

type NavItem = {
  id:
    | 'overview'
    | 'curriculum'
    | 'quiz_center'
    | 'progress'
    | 'certificate'
    | 'landed_cost'
    | 'lc_calculator'
    | 'tax_calculator'
    | 'incoterms_guide'
    | 'resources'
    | 'subscription'
    | 'admin';
  label: string;
  icon: React.ElementType;
};

const sections: { label: string; items: NavItem[] }[] = [
  {
    label: 'Learning',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'curriculum', label: 'Curriculum (16 Ch)', icon: BookOpen },
      { id: 'quiz_center', label: 'Quizzes', icon: Check },
      { id: 'progress', label: 'Progress', icon: FileCheck2 },
      { id: 'certificate', label: 'Certificate', icon: Award },
    ],
  },
  {
    label: 'Trade tools',
    items: [
      { id: 'landed_cost', label: 'Landed cost', icon: FileSpreadsheet },
      { id: 'lc_calculator', label: 'L/C calculator', icon: Calculator },
      { id: 'tax_calculator', label: 'Customs tax', icon: Coins },
      { id: 'incoterms_guide', label: 'Incoterms guide', icon: Compass },
    ],
  },
  {
    label: 'Reference',
    items: [{ id: 'resources', label: 'Resources', icon: FileText }],
  },
];

export const Navbar: React.FC = () => {
  const {
    activeNavTab,
    setActiveNavTab,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    t,
    currentUser,
    users,
    adminNotifications,
    markNotificationRead,
    adminApproveUser,
    loginWithTelegram,
    logout,
    isAdmin,
    hasFullAccess,
    setShowPaywallModal,
    setShowTelegramAuthModal,
    isTelegramApp,
    telegramWebAppUser
  } = useApp();

  const PAID_TOOL_TABS: NavItem['id'][] = ['landed_cost', 'lc_calculator', 'tax_calculator', 'incoterms_guide'];

  const pendingRequests = users.filter(
    u => u.role !== 'admin' && u.subscriptionStatus === 'pending_approval'
  );
  const pendingApprovalsCount = pendingRequests.length;

  const getNavLabel = (id: string, defaultLabel: string) => {
    if (language !== 'am') return defaultLabel;
    switch (id) {
      case 'overview': return 'አጠቃላይ';
      case 'curriculum': return 'ሥርዓተ ትምህርት';
      case 'quiz_center': return 'ፈተናዎች';
      case 'progress': return 'ሂደት';
      case 'certificate': return 'ምስክር ወረቀት';
      case 'landed_cost': return 'የዕቃ ጠቅላላ ወጪ';
      case 'lc_calculator': return 'የኤል ሲ ስሌት';
      case 'tax_calculator': return 'የጉምሩክ ታክስ';
      case 'incoterms_guide': return 'የኢንኮተርምስ መመሪያ';
      case 'resources': return 'ሰነዶችና ሕጎች';
      case 'subscription': return 'የአባልነት ዕቅድ';
      case 'admin': return 'የአስተዳዳሪ ማዕከል';
      default: return defaultLabel;
    }
  };

  const getSectionLabel = (label: string) => {
    if (language !== 'am') return label;
    if (label === 'Learning') return 'ትምህርት';
    if (label === 'Trade tools') return 'የንግድ ማስያዎች';
    if (label === 'Reference') return 'ዋቢ ሰነዶች';
    return label;
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminNotifsOpen, setAdminNotifsOpen] = useState(false);
  const [adminNotifTab, setAdminNotifTab] = useState<'alerts' | 'pending'>('alerts');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const adminNotifsRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = adminNotifications.filter(n => !n.read);
  const totalAdminAlertCount = Math.max(pendingApprovalsCount, unreadNotifs.length);

  useEffect(() => {
    if (!userDropdownOpen && !adminNotifsOpen) return;
    const closeOnOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (adminNotifsRef.current && !adminNotifsRef.current.contains(event.target as Node)) {
        setAdminNotifsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserDropdownOpen(false);
        setAdminNotifsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [userDropdownOpen, adminNotifsOpen]);

  const navigate = (tab: NavItem['id']) => {
    if (PAID_TOOL_TABS.includes(tab) && !hasFullAccess) {
      setShowPaywallModal(true);
      setMobileMenuOpen(false);
      setUserDropdownOpen(false);
      return;
    }
    setActiveNavTab(tab as NavTabType);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const renderNavItem = (item: NavItem, mobile = false) => {
    const Icon = item.icon;
    const active = activeNavTab === item.id;
    const itemLabel = getNavLabel(item.id, item.label);
    const isPaidTool = PAID_TOOL_TABS.includes(item.id);
    const showLock = isPaidTool && !hasFullAccess;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => navigate(item.id)}
        aria-current={active ? 'page' : undefined}
        className={`group flex items-center gap-2 rounded-lg text-left transition-colors ${
          mobile ? 'w-full px-3 py-2.5 text-sm' : 'whitespace-nowrap px-2.5 py-2 text-[11px]'
        } ${
          active
            ? 'bg-[#e6f1ed] font-bold text-[#145c52] dark:bg-[#263a35] dark:text-[#b5dfd2]'
            : 'font-semibold text-[#596760] hover:bg-[#eef1ec] hover:text-[#202b29] dark:text-[#b1bdb5] dark:hover:bg-[#26312d] dark:hover:text-white'
        }`}
      >
        <Icon
          className={`${mobile ? 'h-4 w-4' : 'h-3.5 w-3.5'} shrink-0 ${
            active ? 'text-[#176b60] dark:text-[#8bc9b8]' : ''
          }`}
        />
        <span>{itemLabel}</span>
        {item.id === 'admin' && pendingApprovalsCount > 0 && (
          <span className="ml-auto inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-extrabold bg-rose-600 text-white animate-pulse shadow-xs">
            {pendingApprovalsCount}
          </span>
        )}
        {showLock && (
          <Lock className="ml-auto h-3 w-3 text-amber-600/80 dark:text-amber-400/80 shrink-0" />
        )}
        {active && mobile && !showLock && item.id !== 'admin' && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#176b60] dark:text-[#8bc9b8]">
            {language === 'am' ? 'ገባሪ' : 'Active'}
          </span>
        )}
      </button>
    );
  };

  const getUserBadgeText = () => {
    if (isAdmin) return language === 'am' ? 'አስተዳዳሪ (@EximmanAbdIstad)' : 'Admin (@EximmanAbdIstad)';
    if (currentUser.subscriptionStatus === 'active_paid') return language === 'am' ? 'የተመዘገበ አባል (የከፈለ)' : 'Subscriber (Paid)';
    if (currentUser.subscriptionStatus === 'pending_approval') return language === 'am' ? 'በማረጋገጥ ላይ' : 'Pending Approval';
    if (currentUser.subscriptionStatus === 'expired') return language === 'am' ? 'ያለቀበት (በ3,900 ብር ያድሱ)' : 'Expired (Renew 3,900 ETB)';
    return language === 'am' ? 'ነፃ ሙከራ (ምዕራፍ 1 እና 2)' : 'Free Trial (Ch 1 & 2)';
  };

  return (
    <header className="no-print relative z-40 border-b academy-line bg-[var(--paper)]">
      <div className="mx-auto max-w-[1440px] px-2 sm:px-4 md:px-6 xl:px-8">
        <div className="flex min-h-[50px] xs:min-h-[56px] sm:min-h-[64px] md:min-h-[68px] w-full min-w-0 items-center justify-between gap-1 xs:gap-1.5 sm:gap-3 md:gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate('overview')}
            className="group flex min-w-0 flex-1 sm:flex-initial items-center gap-1.5 xs:gap-2 sm:gap-3 text-left"
            aria-label="Export-Import Logistics Academy overview"
          >
            <span className="flex h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[10px] sm:rounded-[14px] bg-[#174f49] text-[#efcf9e] shadow-sm transition-transform group-hover:-rotate-3">
              <Ship className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 text-[#efcf9e]" strokeWidth={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif-title text-[11px] xs:text-[12px] sm:text-[14px] md:text-base font-extrabold tracking-[-.02em] leading-tight text-neutral-900 dark:text-neutral-50 whitespace-normal break-words">
                {language === 'am' ? 'የላኪና አስመጪ ሎጂስቲክስ አካዳሚ' : 'Export-Import Logistics Academy'}
              </span>
              <span className="mt-0.5 hidden sm:block text-[8.5px] sm:text-[9px] font-bold uppercase tracking-[.15em] academy-muted truncate">
                {language === 'am' ? 'የውጭ ንግድና ሎጂስቲክስ ሙያዊ ሥልጠና' : 'Professional Trade Education'}
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden min-[1200px]:flex min-w-0 items-center gap-1 xl:gap-2 shrink">
            {sections.map(section => (
              <div
                key={section.label}
                className="flex items-center gap-0.5 border-r pr-1.5 xl:pr-2 academy-line last:border-0 last:pr-0"
              >
                <span className="mr-1 hidden 2xl:block text-[9px] font-bold uppercase tracking-[.12em] academy-muted">
                  {getSectionLabel(section.label)}
                </span>
                {section.items.map(item => renderNavItem(item))}
              </div>
            ))}
            {renderNavItem({ id: 'subscription', label: 'Subscription', icon: CreditCard })}
            {isAdmin && renderNavItem({ id: 'admin', label: 'Admin Dashboard', icon: Shield })}
          </nav>

          {/* Actions & User Profile */}
          <div className="flex shrink-0 items-center gap-1 xs:gap-1.5 sm:gap-2">
            {/* Telegram Mini App indicator if detected */}
            {isTelegramApp ? (
              <span
                className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 xs:px-2 sm:px-2.5 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 text-[#1b7fae] dark:text-[#6cc2e9] text-[10px] sm:text-[11px] font-semibold shrink-0"
                title="Telegram Mini App active"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#229ed9] animate-pulse" />
                <span className="hidden xs:inline">Mini App</span>
              </span>
            ) : (
              <a
                href="https://t.me/Eximmanlearnbot"
                target="_blank"
                rel="noopener noreferrer"
                title="Launch in Telegram Chatbot Mini App"
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50/80 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/60 text-[#1b7fae] dark:text-[#6cc2e9] text-xs font-semibold transition-colors shrink-0"
              >
                <Send className="h-3.5 w-3.5 text-[#229ed9]" />
                <span>@Eximmanlearnbot</span>
              </a>
            )}

            {/* Quick Telegram Auth Modal button - compact on small screens */}
            <button
              type="button"
              onClick={() => setShowTelegramAuthModal(true)}
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-sky-300 dark:border-sky-800 bg-[#229ed9]/15 hover:bg-[#229ed9]/25 text-[#1b7fae] dark:text-[#6cc2e9] text-xs font-semibold transition-colors shrink-0"
              title="Log in with Telegram account"
              aria-label="Telegram Login"
            >
              <Send className="h-3.5 w-3.5 text-[#229ed9] shrink-0" />
              <span className="hidden sm:inline">
                {currentUser.telegramUsername ? currentUser.telegramUsername : 'Telegram Login'}
              </span>
            </button>

            {/* Quick Subscription CTA for free trial or expired users */}
            {!isAdmin && currentUser.subscriptionStatus !== 'active_paid' && (
              <button
                type="button"
                onClick={() => setShowPaywallModal(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-2xs shrink-0 whitespace-nowrap"
              >
                <span>
                  {currentUser.subscriptionStatus === 'expired'
                    ? (language === 'am' ? 'ያድሱ (3,900 ብር)' : 'Renew (3,900 ETB)')
                    : (language === 'am' ? 'ይመዝገቡ (3,900 ብር)' : 'Subscribe (3,900 ETB)')}
                </span>
              </button>
            )}

            {/* Responsive Language Switcher - compact on mobile, dual pills on tablet/desktop */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex sm:hidden items-center gap-1 px-2 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-bold text-amber-800 dark:text-amber-300 shrink-0 hover:bg-neutral-200 dark:hover:bg-neutral-700 shadow-2xs"
              title={language === 'am' ? 'Switch to English' : 'ወደ አማርኛ ቀይር'}
              aria-label="Toggle language"
            >
              <Languages className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>{language === 'am' ? 'EN' : 'አማ'}</span>
            </button>

            <div
              role="group"
              aria-label="Language selection"
              className="hidden sm:inline-flex items-center p-0.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100/90 dark:bg-neutral-800/90 shrink-0 shadow-2xs"
            >
              <button
                type="button"
                onClick={() => {
                  if (language !== 'am') toggleLanguage();
                }}
                className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                  language === 'am'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60'
                }`}
                title="ወደ አማርኛ ቋንቋ ቀይር (Switch to Amharic)"
                aria-pressed={language === 'am'}
              >
                <span>አማርኛ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (language !== 'en') toggleLanguage();
                }}
                className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60'
                }`}
                title="Switch to English"
                aria-pressed={language === 'en'}
              >
                <span>English</span>
              </button>
            </div>

            {/* Instant Admin Notification Bell for Administrator */}
            {isAdmin && (
              <div className="relative" ref={adminNotifsRef}>
                <button
                  type="button"
                  onClick={() => setAdminNotifsOpen(v => !v)}
                  aria-expanded={adminNotifsOpen}
                  aria-haspopup="menu"
                  aria-label="Admin Notifications"
                  className="relative flex h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-2xs"
                  title={
                    totalAdminAlertCount > 0
                      ? `🚨 ${totalAdminAlertCount} Student Activity Alert(s)!`
                      : 'Admin Notifications'
                  }
                >
                  <Bell className={`h-4 w-4 ${totalAdminAlertCount > 0 ? 'text-amber-600 animate-bounce' : 'text-neutral-500'}`} />
                  {totalAdminAlertCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-600 text-white text-[10px] font-extrabold shadow-xs animate-pulse">
                      {totalAdminAlertCount}
                    </span>
                  )}
                </button>

                {adminNotifsOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-[min(400px,calc(100vw-24px))] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 shadow-2xl z-50 animate-scale-up"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2 px-1">
                      <div className="flex items-center gap-1.5">
                        <Bell className="h-4 w-4 text-amber-600" />
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          Admin Student Alerts ({adminNotifications.length})
                        </h4>
                      </div>
                      <button
                        onClick={() => {
                          navigate('admin');
                          setAdminNotifsOpen(false);
                        }}
                        className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline"
                      >
                        Admin Dashboard →
                      </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 pt-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                      <button
                        onClick={() => setAdminNotifTab('alerts')}
                        className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition ${
                          adminNotifTab === 'alerts'
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        Telegram Activity ({adminNotifications.length})
                      </button>
                      <button
                        onClick={() => setAdminNotifTab('pending')}
                        className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition ${
                          adminNotifTab === 'pending'
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        Pending ({pendingApprovalsCount})
                      </button>
                    </div>

                    <div className="py-2 space-y-2 max-h-72 overflow-y-auto academy-scrollbar">
                      {adminNotifTab === 'alerts' ? (
                        adminNotifications.length === 0 ? (
                          <div className="text-center py-6 px-2 text-xs text-neutral-500 dark:text-neutral-400">
                            <Check className="h-5 w-5 text-emerald-500 mx-auto mb-1 opacity-70" />
                            <span>No alerts recorded yet. Real-time notifications will appear as students log in via Telegram.</span>
                          </div>
                        ) : (
                          adminNotifications.slice(0, 15).map(n => (
                            <div
                              key={n.id}
                              onClick={() => markNotificationRead(n.id)}
                              className={`p-2.5 rounded-xl border text-xs space-y-1 transition cursor-pointer ${
                                !n.read
                                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 font-medium'
                                  : 'bg-neutral-50/60 dark:bg-neutral-850/60 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{n.fullName}</span>
                                  <span className="font-mono text-[11px] text-amber-700 dark:text-amber-400 font-semibold">{n.telegramUsername}</span>
                                  {n.subscriptionStatus && (
                                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                                      {n.subscriptionStatus.replace('_', ' ')}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                                  {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">{n.message}</p>
                              {n.type === 'subscription_request' && (
                                <div className="pt-1 flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      adminApproveUser(n.userId, 30);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] shadow-2xs transition"
                                  >
                                    Approve 30 Days (Instant)
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        )
                      ) : (
                        pendingRequests.length === 0 ? (
                          <div className="text-center py-6 px-2 text-xs text-neutral-500 dark:text-neutral-400">
                            <Check className="h-5 w-5 text-emerald-500 mx-auto mb-1 opacity-70" />
                            <span>No pending subscription requests. All students are approved!</span>
                          </div>
                        ) : (
                          pendingRequests.map(req => (
                            <div
                              key={req.id}
                              className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs space-y-1.5"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                                    {req.fullName}
                                  </span>
                                  <span className="font-mono text-[11px] text-[#176b60] dark:text-[#8bc9b8]">
                                    {req.telegramUsername}
                                  </span>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white shrink-0">
                                  3,900 ETB
                                </span>
                              </div>

                              {req.telebirrTxId && (
                                <p className="font-mono text-[10px] text-neutral-500 truncate">
                                  TxID: {req.telebirrTxId}
                                </p>
                              )}

                              <div className="pt-1 flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    navigate('admin');
                                    setAdminNotifsOpen(false);
                                  }}
                                  className="px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-[10px] font-medium"
                                >
                                  View Details
                                </button>
                                <button
                                  onClick={() => {
                                    adminApproveUser(req.id, 30);
                                  }}
                                  className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] shadow-2xs transition"
                                >
                                  Approve 30 Days (Instant Access)
                                </button>
                              </div>
                            </div>
                          ))
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(value => !value)}
                aria-expanded={userDropdownOpen}
                aria-haspopup="menu"
                aria-label="User account menu"
                className="flex min-h-[32px] xs:min-h-[36px] sm:min-h-10 items-center gap-1 xs:gap-1.5 sm:gap-2 rounded-xl border px-1 xs:px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-left transition hover:bg-[#f1f4ef] dark:hover:bg-[#26312d] academy-line shrink-0"
              >
                <span className="flex h-6 w-6 xs:h-7 xs:w-7 sm:h-7.5 sm:w-7.5 shrink-0 items-center justify-center rounded-full bg-[#dce9e2] text-[10px] sm:text-[11px] font-bold text-[#205f53] dark:bg-[#344c43] dark:text-[#c8e6d8]">
                  {currentUser.fullName.charAt(0)}
                </span>
                <span className="hidden md:block max-w-28 lg:max-w-32">
                  <span className="block truncate text-[11px] font-bold">
                    {currentUser.telegramUsername || currentUser.fullName}
                  </span>
                  <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[.08em] text-amber-700 dark:text-amber-400">
                    {getUserBadgeText()}
                  </span>
                </span>
                <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 academy-muted shrink-0" />
              </button>

              {userDropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-[min(340px,calc(100vw-24px))] rounded-2xl border academy-line academy-paper p-2.5 shadow-[0_18px_45px_rgba(21,39,32,.18)]"
                >
                  {/* Account Header */}
                  <div className="border-b px-3 py-2.5 academy-line">
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-amber-700 dark:text-amber-400">
                      Current Account
                    </p>
                    <p className="mt-1 truncate text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      {currentUser.fullName}
                    </p>
                    {currentUser.telegramUsername ? (
                      <p className="font-mono text-[11px] text-[#176b60] dark:text-[#8bc9b8]">
                        {currentUser.telegramUsername}
                      </p>
                    ) : (
                      <p className="text-[11px] text-neutral-400 italic">
                        Not linked to Telegram yet
                      </p>
                    )}
                    {currentUser.phoneNumber && (
                      <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                        {currentUser.phoneNumber}
                      </p>
                    )}
                    <div className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {getUserBadgeText()}
                    </div>
                  </div>

                  {/* User Actions - No switching to admin or other accounts allowed */}
                  <div className="grid gap-1 border-t pt-2 academy-line">
                    {/* If Admin: Direct Control Center Link */}
                    {isAdmin && (
                      <button
                        role="menuitem"
                        onClick={() => {
                          navigate('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-amber-800 hover:bg-amber-100/60 dark:text-amber-300 dark:hover:bg-amber-950/40 bg-amber-50/60 dark:bg-amber-950/20"
                      >
                        <Shield className="h-3.5 w-3.5 text-amber-600" />
                        <span>Administrator Control Center</span>
                      </button>
                    )}

                    {/* Telegram Account Login / Re-connect Modal */}
                    <button
                      role="menuitem"
                      onClick={() => {
                        setShowTelegramAuthModal(true);
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#1b7fae] dark:text-[#6cc2e9] hover:bg-sky-50 dark:hover:bg-sky-950/40"
                    >
                      <Send className="h-3.5 w-3.5 text-[#229ed9]" />
                      <span>{currentUser.telegramUsername ? 'Telegram Account Details' : 'Log in with Telegram'}</span>
                    </button>

                      <button
                        role="menuitem"
                        onClick={() => navigate('subscription')}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#eff3ee] dark:hover:bg-[#26312d]"
                      >
                        <CreditCard className="h-3.5 w-3.5 text-neutral-500" />
                        <span>{language === 'am' ? 'የአባልነት ዕቅዶች (3,900 ብር)' : 'Subscription Plans (3,900 ETB · 60% Off)'}</span>
                      </button>

                      <button
                        role="menuitem"
                        onClick={() => {
                          toggleLanguage();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#eff3ee] dark:hover:bg-[#26312d]"
                      >
                        <span className="flex items-center gap-2">
                          <Languages className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                          <span>{language === 'am' ? 'ቋንቋ፦ አማርኛ' : 'Language: English'}</span>
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                          {language === 'am' ? 'Switch to EN' : 'ቀይር ወደ አማርኛ'}
                        </span>
                      </button>

                      {currentUser.id !== 'guest-student' && (
                        <button
                          role="menuitem"
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        >
                          <LogOut className="h-3.5 w-3.5 text-rose-500" />
                          <span>Log Out (Guest Mode)</span>
                        </button>
                      )}
                    </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="flex h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-[#68766f] transition hover:bg-[#eef1ec] dark:text-[#b7c1ba] dark:hover:bg-[#26312d]"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-[#e6b57d]" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(value => !value)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              className="flex h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-[#596760] hover:bg-[#eef1ec] dark:text-[#d5ddd7] dark:hover:bg-[#26312d] min-[1200px]:hidden"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5 sm:h-5 sm:w-5" /> : <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t py-4 academy-line min-[1200px]:hidden"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {sections.map(section => (
                <div key={section.label}>
                  <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[.15em] academy-muted">
                    {section.label}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map(item => renderNavItem(item, true))}
                  </div>
                </div>
              ))}
              <section>
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[.15em] academy-muted">
                  Telegram Mini App & Login
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowTelegramAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[#1b7fae] dark:text-[#6cc2e9] hover:bg-sky-50 dark:hover:bg-sky-950/40"
                >
                  <Send className="h-4 w-4 text-[#229ed9]" />
                  <span>Telegram Auth & Validation Helper</span>
                </button>
              </section>
              <section>
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[.15em] academy-muted">
                  {language === 'am' ? 'የአባልነት ዕቅድ' : 'Membership'}
                </p>
                {renderNavItem({ id: 'subscription', label: 'Subscription Plans (3,900 ETB)', icon: CreditCard }, true)}
              </section>
              <section>
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[.15em] academy-muted">
                  {language === 'am' ? 'ቋንቋ ምረጡ (Select Language)' : 'Language (ቋንቋ)'}
                </p>
                <div className="flex items-center gap-2 px-3 py-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (language !== 'en') toggleLanguage();
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      language === 'en'
                        ? 'bg-amber-700 text-white border-amber-700 shadow-2xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (language !== 'am') toggleLanguage();
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      language === 'am'
                        ? 'bg-amber-700 text-white border-amber-700 shadow-2xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    አማርኛ (Amharic)
                  </button>
                </div>
              </section>
              {isAdmin && (
                <section>
                  <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[.15em] academy-muted">
                    Administration
                  </p>
                  {renderNavItem({ id: 'admin', label: 'Admin Dashboard (@EximmanAbdIstad)', icon: Shield }, true)}
                </section>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
