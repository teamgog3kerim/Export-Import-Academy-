import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import type { NavTabType } from '../context/AppContext';
import {
  Award,
  BookOpen,
  Calculator,
  Check,
  ChevronDown,
  Coins,
  CreditCard,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  Menu,
  Moon,
  Shield,
  Sun,
  X,
  Send,
  User,
  Plus
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
    currentUser,
    users,
    switchUser,
    loginAsAdmin,
    loginWithTelegram,
    isAdmin,
    setShowPaywallModal,
    setShowTelegramAuthModal,
    isTelegramApp,
    telegramWebAppUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [telegramLoginInput, setTelegramLoginInput] = useState('');
  const [showTelegramForm, setShowTelegramForm] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userDropdownOpen) return;
    const closeOnOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
        setShowTelegramForm(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserDropdownOpen(false);
        setShowTelegramForm(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [userDropdownOpen]);

  const navigate = (tab: NavItem['id']) => {
    setActiveNavTab(tab as NavTabType);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const handleTelegramLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramLoginInput.trim()) return;
    loginWithTelegram(telegramLoginInput.trim());
    setTelegramLoginInput('');
    setShowTelegramForm(false);
    setUserDropdownOpen(false);
  };

  const renderNavItem = (item: NavItem, mobile = false) => {
    const Icon = item.icon;
    const active = activeNavTab === item.id;
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
        <span>{item.label}</span>
        {active && mobile && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#176b60] dark:text-[#8bc9b8]">
            Active
          </span>
        )}
      </button>
    );
  };

  const getUserBadgeText = () => {
    if (isAdmin) return 'Admin (@Eximmanlearnbot)';
    if (currentUser.subscriptionStatus === 'active_paid') return 'Subscriber (Paid)';
    if (currentUser.subscriptionStatus === 'pending_approval') return 'Pending Approval';
    if (currentUser.subscriptionStatus === 'expired') return 'Expired (Renew 3,900 ETB)';
    return 'Free Trial (Ch 1 & 2)';
  };

  return (
    <header className="no-print relative z-40 border-b academy-line bg-[var(--paper)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8">
        <div className="flex min-h-[68px] items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate('overview')}
            className="group flex min-w-0 items-center gap-3 text-left"
            aria-label="Academy overview"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#174f49] text-[#efcf9e] shadow-sm transition-transform group-hover:-rotate-3">
              <span className="font-serif-title text-sm font-extrabold tracking-[-.06em]">ET</span>
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif-title text-[15px] font-extrabold tracking-[-.035em] sm:text-base">
                Export-Import and Logistics Academy
              </span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[.15em] academy-muted">
                Professional Trade Education
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden min-[1180px]:flex min-w-0 items-center gap-2">
            {sections.map(section => (
              <div
                key={section.label}
                className="flex items-center gap-0.5 border-r pr-2 academy-line last:border-0 last:pr-0"
              >
                <span className="mr-1 hidden 2xl:block text-[9px] font-bold uppercase tracking-[.12em] academy-muted">
                  {section.label}
                </span>
                {section.items.map(item => renderNavItem(item))}
              </div>
            ))}
            {renderNavItem({ id: 'subscription', label: 'Subscription', icon: CreditCard })}
            {isAdmin && renderNavItem({ id: 'admin', label: 'Admin Dashboard', icon: Shield })}
          </nav>

          {/* Actions & User Profile */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Telegram Mini App indicator if detected */}
            {isTelegramApp && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 text-[#1b7fae] dark:text-[#6cc2e9] text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#229ed9] animate-pulse" />
                <span>Mini App</span>
              </span>
            )}

            {/* Quick Telegram Auth Modal button */}
            <button
              type="button"
              onClick={() => setShowTelegramAuthModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50/70 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/60 text-[#1b7fae] dark:text-[#6cc2e9] text-xs font-semibold transition-colors"
            >
              <Send className="h-3.5 w-3.5 text-[#229ed9]" />
              <span>Telegram Login</span>
            </button>

            {/* Quick Subscription CTA for free trial or expired users */}
            {!isAdmin && currentUser.subscriptionStatus !== 'active_paid' && (
              <button
                type="button"
                onClick={() => setShowPaywallModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-2xs"
              >
                <span>
                  {currentUser.subscriptionStatus === 'expired'
                    ? 'Renew (3,900 ETB / 30 Days)'
                    : 'Subscribe (3,900 ETB / 30 Days)'}
                </span>
              </button>
            )}

            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(value => !value)}
                aria-expanded={userDropdownOpen}
                aria-haspopup="menu"
                className="flex min-h-10 items-center gap-2 rounded-xl border px-2 py-1.5 text-left transition hover:bg-[#f1f4ef] dark:hover:bg-[#26312d] sm:px-2.5 academy-line"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dce9e2] text-[11px] font-bold text-[#205f53] dark:bg-[#344c43] dark:text-[#c8e6d8]">
                  {currentUser.fullName.charAt(0)}
                </span>
                <span className="hidden max-w-32 sm:block">
                  <span className="block truncate text-[11px] font-bold">
                    {currentUser.telegramUsername || currentUser.fullName}
                  </span>
                  <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[.08em] text-amber-700 dark:text-amber-400">
                    {getUserBadgeText()}
                  </span>
                </span>
                <ChevronDown className="h-3.5 w-3.5 academy-muted" />
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
                    <p className="font-mono text-[11px] text-[#176b60] dark:text-[#8bc9b8]">
                      {currentUser.telegramUsername}
                    </p>
                    {currentUser.phoneNumber && (
                      <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                        {currentUser.phoneNumber}
                      </p>
                    )}
                    <div className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {getUserBadgeText()}
                    </div>
                  </div>

                  {/* Switch to or log in as student accounts */}
                  <div className="py-1">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Select Account
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-0.5">
                      {users.map(user => (
                        <button
                          key={user.id}
                          role="menuitem"
                          onClick={() => {
                            switchUser(user.id);
                            setUserDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-[#eff3ee] dark:hover:bg-[#26312d] ${
                            user.id === currentUser.id ? 'bg-[#e6f1ed] dark:bg-[#263a35]' : ''
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <span className="block text-xs font-semibold truncate">
                              {user.fullName}
                            </span>
                            <span className="block text-[10px] font-mono text-neutral-500 truncate">
                              {user.telegramUsername}
                            </span>
                          </div>
                          {user.id === currentUser.id && (
                            <Check className="h-4 w-4 text-[#176b60] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Telegram Sign In / Switch */}
                  {showTelegramForm ? (
                    <form onSubmit={handleTelegramLoginSubmit} className="p-2 border-t academy-line space-y-2">
                      <label className="block text-[10px] font-bold uppercase text-neutral-500">
                        Sign in with Telegram Handle
                      </label>
                      <input
                        type="text"
                        autoFocus
                        required
                        value={telegramLoginInput}
                        onChange={e => setTelegramLoginInput(e.target.value)}
                        placeholder="@username"
                        className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg"
                      />
                      <div className="flex gap-1.5">
                        <button
                          type="submit"
                          className="flex-1 py-1 bg-amber-700 text-white rounded-lg text-xs font-bold"
                        >
                          Switch
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTelegramForm(false)}
                          className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-xs rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid gap-1 border-t pt-2 academy-line">
                      <button
                        role="menuitem"
                        onClick={() => {
                          setShowTelegramAuthModal(true);
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#1b7fae] dark:text-[#6cc2e9] hover:bg-sky-50 dark:hover:bg-sky-950/40"
                      >
                        <Send className="h-3.5 w-3.5 text-[#229ed9]" />
                        <span>Telegram Auth & Validation Helper</span>
                      </button>

                      <button
                        role="menuitem"
                        onClick={() => setShowTelegramForm(true)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#eff3ee] dark:hover:bg-[#26312d]"
                      >
                        <User className="h-3.5 w-3.5 text-neutral-500" />
                        <span>Quick Handle Switch</span>
                      </button>

                      {!isAdmin && (
                        <button
                          role="menuitem"
                          onClick={() => {
                            loginAsAdmin();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#176b60] hover:bg-[#e6f1ed] dark:text-[#b5dfd2] dark:hover:bg-[#263a35]"
                        >
                          <Shield className="h-3.5 w-3.5" />
                          <span>Login as Admin (@Eximmanlearnbot)</span>
                        </button>
                      )}

                      <button
                        role="menuitem"
                        onClick={() => navigate('subscription')}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#eff3ee] dark:hover:bg-[#26312d]"
                      >
                        <CreditCard className="h-3.5 w-3.5 text-neutral-500" />
                        <span>Subscription Plans (3,900 ETB)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#68766f] transition hover:bg-[#eef1ec] dark:text-[#b7c1ba] dark:hover:bg-[#26312d]"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-[#e6b57d]" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(value => !value)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#596760] hover:bg-[#eef1ec] dark:text-[#d5ddd7] dark:hover:bg-[#26312d] min-[1180px]:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t py-4 academy-line min-[1180px]:hidden"
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
                  Membership
                </p>
                {renderNavItem({ id: 'subscription', label: 'Subscription Plans (3,900 ETB)', icon: CreditCard }, true)}
              </section>
              {isAdmin && (
                <section>
                  <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[.15em] academy-muted">
                    Administration
                  </p>
                  {renderNavItem({ id: 'admin', label: 'Admin Dashboard (@Eximmanlearnbot)', icon: Shield }, true)}
                </section>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
