import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types';
import {
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Search,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Send,
  Smartphone,
  UserPlus,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileCheck2,
  Bot,
  RefreshCw,
  Check,
  Radio,
  Share2,
  Trash2,
  Bell,
  AlertTriangle,
  UploadCloud
} from 'lucide-react';
import {
  formatTelegramHandle,
  normalizeTelegramUsername,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_BOT_USERNAME,
  TELEGRAM_BOT_ID,
  TELEGRAM_BOT_NAME,
  fetchTelegramBotInfo,
  syncTelegramMenuButton,
  resetTelegramMenuButton,
  TelegramBotInfo
} from '../utils/telegramAuth';

export const AdminDashboard: React.FC = () => {
  const {
    users,
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
    currentUser,
    loginWithTelegram,
    loginWithTelegramWidget,
    submitSubscriptionPayment
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProofUser, setSelectedProofUser] = useState<UserProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

  // New Student State
  const [newTelegram, setNewTelegram] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [grantPaidDirectly, setGrantPaidDirectly] = useState(true);

  // Telegram Bot Integration State
  const [botInfo, setBotInfo] = useState<TelegramBotInfo | null>(null);
  const [targetMiniAppUrl, setTargetMiniAppUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') return window.location.origin;
    return 'https://ais-dev-nft5jzi37kuatg2q6f77lw-761402629536.europe-west2.run.app';
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Load live bot profile on mount
  React.useEffect(() => {
    fetchTelegramBotInfo().then(info => {
      setBotInfo(info);
      if (info.menuButtonUrl && !targetMiniAppUrl) {
        setTargetMiniAppUrl(info.menuButtonUrl);
      }
    });
  }, []);

  const handleSyncMenuButton = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!targetMiniAppUrl.trim()) return;

    setIsSyncing(true);
    setSyncFeedback({ type: 'idle', message: '' });

    const result = await syncTelegramMenuButton(targetMiniAppUrl.trim(), 'Launch Academy');
    if (result.ok) {
      setSyncFeedback({ type: 'success', message: result.message });
      // Refresh bot info
      const updated = await fetchTelegramBotInfo();
      setBotInfo(updated);
    } else {
      setSyncFeedback({ type: 'error', message: result.message });
    }
    setIsSyncing(false);
  };

  const handleResetMenuButton = async () => {
    setIsSyncing(true);
    setSyncFeedback({ type: 'idle', message: '' });

    const result = await resetTelegramMenuButton();
    if (result.ok) {
      setSyncFeedback({ type: 'success', message: result.message });
      const updated = await fetchTelegramBotInfo();
      setBotInfo(updated);
    } else {
      setSyncFeedback({ type: 'error', message: result.message });
    }
    setIsSyncing(false);
  };

  const handleCopyBotLink = () => {
    const link = `https://t.me/${TELEGRAM_BOT_USERNAME}`;
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Metrics
  const nonAdminUsers = users.filter(u => u.role !== 'admin' && u.telegramUsername?.toLowerCase() !== '@eximmanlearnbot');
  const totalUsers = nonAdminUsers.length;
  const pendingUsers = nonAdminUsers.filter(u => u.subscriptionStatus === 'pending_approval');
  const activePaidUsers = nonAdminUsers.filter(u => u.subscriptionStatus === 'active_paid');
  const expiredUsers = nonAdminUsers.filter(u => u.subscriptionStatus === 'expired');
  const widgetUsers = nonAdminUsers.filter(u => u.isTelegramWidgetUser);
  const totalRevenueETB = (activePaidUsers.length + expiredUsers.length) * 3900;

  // Filtered users
  const filteredUsers = nonAdminUsers
    .filter(u => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'telegram_widget') return Boolean(u.isTelegramWidgetUser);
      return u.subscriptionStatus === statusFilter;
    })
    .filter(u => {
      const q = searchQuery.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        (u.telegramUsername && u.telegramUsername.toLowerCase().includes(q)) ||
        u.phoneNumber.toLowerCase().includes(q) ||
        (u.telebirrTxId && u.telebirrTxId.toLowerCase().includes(q))
      );
    });

  const formatETB = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const getDaysLeft = (expiresAt: string | null) => {
    if (!expiresAt) return null;
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleManualAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTelegram.trim()) return;

    const formatted = formatTelegramHandle(newTelegram.trim());
    loginWithTelegram(formatted, newName.trim(), newPhone.trim());

    if (grantPaidDirectly) {
      setTimeout(() => {
        const u = users.find(
          item => normalizeTelegramUsername(item.telegramUsername) === normalizeTelegramUsername(formatted)
        );
        if (u) adminApproveUser(u.id, 30);
      }, 100);
    }

    setShowAddModal(false);
    setNewTelegram('');
    setNewName('');
    setNewPhone('');
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    const res = adminDeleteUser(userToDelete.id);
    setDeleteNotice(res.message);
    setUserToDelete(null);
    setTimeout(() => setDeleteNotice(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Delete Feedback Toast */}
      {deleteNotice && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center justify-between shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{deleteNotice}</span>
          </div>
          <button onClick={() => setDeleteNotice(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator Control Center</span>
            <span>·</span>
            <span className="font-mono text-neutral-900 dark:text-neutral-100 font-bold">@EximmanAbdIstad</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            Subscription Approvals & Student Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Auto-records Telegram logins & reviews telebirr payments (3,900 ETB to 09 6768 4490 · Abdulkerim) for instant 30-day access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Enroll New Student</span>
          </button>
        </div>
      </div>

      {/* Instant Pending Approvals Queue Card - High visibility when requests exist */}
      {pendingUsers.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border-2 border-amber-500 rounded-3xl p-5 sm:p-6 shadow-md animate-pulse-subtle space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-xs shrink-0 animate-bounce">
                <Bell className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-serif-title font-bold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                  <span>Instant Subscription Requests ({pendingUsers.length} Awaiting Approval)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-600 text-white">
                    Action Required
                  </span>
                </h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  Students submitted 3,900 ETB via telebirr (or bank) to 09 6768 4490. Approve below to activate full 30-day course & calculator access instantly!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {pendingUsers.map(user => (
              <div
                key={user.id}
                className="bg-white dark:bg-neutral-900 border border-amber-300 dark:border-amber-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <span>{user.fullName}</span>
                      {user.isTelegramWidgetUser && (
                        <span className="text-[10px] text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-200 dark:border-sky-800 font-normal">
                          Telegram Widget
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400 block mt-0.5">
                      {user.telegramUsername}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono block">
                      Phone: {user.phoneNumber || 'Not provided'}
                    </span>
                    {user.telebirrTxId && (
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 block mt-0.5 font-bold">
                        Tx Ref: {user.telebirrTxId}
                      </span>
                    )}
                  </div>

                  {user.paymentScreenshot && (
                    <button
                      onClick={() => setSelectedProofUser(user)}
                      className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 text-[11px] font-semibold hover:bg-amber-100 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Proof</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => adminApproveUser(user.id, 30)}
                    className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve 30 Days (3,900 ETB)</span>
                  </button>
                  <button
                    onClick={() => adminGrantLifetime(user.id)}
                    className="py-2 px-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs transition"
                    title="Grant Lifetime VIP"
                  >
                    VIP
                  </button>
                  <button
                    onClick={() => {
                      adminRejectUser(
                        user.id,
                        'Payment transfer failed or could not be verified in telebirr. Please upload the correct telebirr payment screenshot and try again for subscription approval.'
                      );
                      setDeleteNotice(
                        `Rejected ${user.fullName} due to payment transfer failure. User notified to upload correct payment screenshot.`
                      );
                    }}
                    className="py-2 px-2.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 rounded-xl font-bold text-xs transition flex items-center gap-1"
                    title="Reject and notify user to upload correct payment screenshot"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-amber-600" />
                    <span>Upload Payment</span>
                  </button>
                  <button
                    onClick={() => adminRejectUser(user.id)}
                    className="py-2 px-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-600 rounded-xl font-semibold text-xs transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => setUserToDelete(user)}
                    className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title={`Delete ${user.fullName} (${user.telegramUsername}) from records`}
                    aria-label={`Delete ${user.fullName}`}
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Total Students
          </span>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">
            {totalUsers}
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">Trial & Subscribers</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-sky-300 dark:border-sky-800 rounded-2xl p-4 shadow-xs bg-sky-50/20">
          <span className="text-xs font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1">
            <Send className="w-3.5 h-3.5 text-[#229ed9]" />
            <span>Telegram Widget</span>
          </span>
          <div className="text-2xl font-bold font-mono text-sky-700 dark:text-sky-300 mt-1">
            {widgetUsers.length}
          </div>
          <span className="text-[10px] text-sky-600 dark:text-sky-400 mt-0.5 block">Auto-recorded from widget</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-amber-300 dark:border-amber-800 rounded-2xl p-4 shadow-xs bg-amber-50/20">
          <span className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </span>
          <div className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-1">
            {pendingUsers.length}
          </div>
          <span className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5 block">
            {pendingUsers.length > 0 ? 'Requires approval' : 'All approved'}
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Active Paid
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {activePaidUsers.length}
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">Full 16 Ch & Tools</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Telebirr Revenue
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1 truncate">
            {formatETB(totalRevenueETB)}{' '}
            <span className="text-xs font-sans font-normal text-neutral-500">ETB</span>
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">@ 3,900 ETB / student</span>
        </div>
      </div>

      {/* Admin Live Verification & Simulation Suite */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-amber-500/10 dark:from-amber-950/40 dark:via-sky-950/30 dark:to-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-neutral-100">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Admin Live Verification & Simulation Suite</span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
              Instantly test Telegram login widget recording, subscription request notifications, and 3-day trial push reminders:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const randomId = Math.floor(10000000 + Math.random() * 90000000);
                const testUser = {
                  id: randomId,
                  first_name: 'Abebe',
                  last_name: 'Kebede',
                  username: `Trader_${randomId.toString().slice(-4)}`,
                  auth_date: Math.floor(Date.now() / 1000),
                  hash: 'verified_simulated_hash'
                };
                loginWithTelegramWidget(testUser);
              }}
              className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              title="Simulates a student logging in with the Telegram login widget"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simulate Widget Login</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const randomId = Math.floor(10000000 + Math.random() * 90000000);
                submitSubscriptionPayment({
                  fullName: 'Bethlehem Tadesse',
                  telegramUsername: `@Betty_Export_${randomId.toString().slice(-4)}`,
                  phoneNumber: '09 11 45 78 90',
                  telebirrTxId: `TB${Date.now().toString().slice(-8)}`,
                  paymentScreenshot: 'simulated_payment_proof'
                });
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              title="Simulates an instant 3,900 ETB subscription request submitted for admin approval"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Simulate 3,900 ETB Request</span>
            </button>
            <button
              type="button"
              onClick={() => {
                simulateTrialDays(3);
                setDeleteNotice('Simulated current user as 3+ days on trial! 3-day push notification for courses & cost calculators is now active.');
                setTimeout(() => setDeleteNotice(null), 5000);
              }}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              title="Sets current user trial start to 3 days ago to test the 3-day push notification"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Test 3-Day Push Notification</span>
            </button>
          </div>
        </div>
      </div>

      {/* Telegram Chatbot & Mini App Integration Card */}
      <div className="bg-gradient-to-br from-sky-50/80 via-white to-sky-50/40 dark:from-sky-950/20 dark:via-neutral-900 dark:to-neutral-900 border border-sky-200 dark:border-sky-900/60 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-sky-100 dark:border-sky-950">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#229ed9] text-white shadow-sm">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Telegram Chatbot & Mini App Integration
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Bot Token Integrated
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Official bot <span className="font-mono font-bold text-[#1b7fae] dark:text-[#6cc2e9]">@{TELEGRAM_BOT_USERNAME}</span> is connected to launch this academy as a Telegram native Mini App.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`https://t.me/${TELEGRAM_BOT_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#229ed9] hover:bg-[#1b8ec6] text-white text-xs font-bold transition-all shadow-xs"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Open in Telegram</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>

            <button
              type="button"
              onClick={handleCopyBotLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-200 text-xs font-semibold transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Copy Bot Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bot Technical Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-800 text-xs">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block">
              Bot Identity & Token
            </span>
            <div className="mt-1 font-mono font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-between">
              <span>{TELEGRAM_BOT_NAME}</span>
              <span className="text-[10px] text-neutral-400">ID: {TELEGRAM_BOT_ID}</span>
            </div>
            <div className="mt-1.5 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 truncate bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
              Token: {TELEGRAM_BOT_TOKEN.slice(0, 10)}...{TELEGRAM_BOT_TOKEN.slice(-6)}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-800 text-xs">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block">
              Active Telegram Menu Button
            </span>
            <div className="mt-1 font-mono text-[11px] text-[#1b7fae] dark:text-[#6cc2e9] truncate font-medium">
              {botInfo?.menuButtonUrl ? botInfo.menuButtonUrl : 'Standard Bot Commands (No Dev URL)'}
            </div>
            <span className="mt-1 text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <Check className="h-3 w-3" />
              {botInfo?.menuButtonUrl ? 'Type: Web App ("Launch Academy")' : 'Type: Native Bot Commands'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-800 text-xs">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block">
              Mini App Capabilities
            </span>
            <div className="mt-1.5 space-y-1 text-[11px] text-neutral-700 dark:text-neutral-300">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>Auto-login with Telegram account</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>Native Haptic Feedback support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>Expanded viewport & custom theme</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sync / Update URL Bar */}
        <div className="mt-5 pt-4 border-t border-sky-100 dark:border-sky-950/60">
          <form onSubmit={handleSyncMenuButton} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Production Mini App URL:
              </span>
              <input
                type="url"
                required
                value={targetMiniAppUrl}
                onChange={e => setTargetMiniAppUrl(e.target.value)}
                placeholder="https://your-domain.ethiodeploy.com"
                className="w-full pl-44 pr-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#229ed9]"
              />
            </div>

            <button
              type="submit"
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs shrink-0"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Live URL'}</span>
            </button>

            <button
              type="button"
              disabled={isSyncing}
              onClick={handleResetMenuButton}
              className="px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0"
              title="Reset Telegram Menu Button to default commands (clears web app URL)"
            >
              <span>Reset to Commands</span>
            </button>
          </form>

          {/* Google Login Protection Notice */}
          <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px]">
              <strong>Why Google Sign-In Appeared:</strong> Google AI Studio development preview URLs (<code>ais-dev-...</code>) are protected by Google Cloud IAP, which prompts visitors for Google accounts. Regular Telegram users cannot open that URL. Once you deploy this applet to production (e.g. your EthioDeploy, custom domain, or public host), enter that public HTTPS address above to link it directly to the Telegram Menu Button!
            </div>
          </div>

          {syncFeedback.message && (
            <div
              className={`mt-2.5 p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
                syncFeedback.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {syncFeedback.type === 'success' ? (
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
              )}
              <span>{syncFeedback.message}</span>
            </div>
          )}

          {/* Telegram Login Widget & BotFather Setup Note */}
          <div className="mt-4 pt-3.5 border-t border-sky-100/80 dark:border-sky-950/40 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 bg-white/70 dark:bg-neutral-850 rounded-xl border border-sky-100 dark:border-sky-950">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#229ed9]" />
                <span>Telegram Login Widget Integration</span>
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                The official Telegram Login Widget is active on login modals and subscription screens. Students can click "Log in with Telegram" to authenticate in 1 click and link their accounts.
              </p>
            </div>

            <div className="p-3 bg-white/70 dark:bg-neutral-850 rounded-xl border border-sky-100 dark:border-sky-950">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Authorize Custom Domain via @BotFather</span>
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-mono text-[10px]">
                To link a new domain: message <strong>@BotFather</strong> → <strong>/setdomain</strong> → select <strong>@{TELEGRAM_BOT_USERNAME}</strong> → enter domain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by Telegram, name, or phone..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: `All (${nonAdminUsers.length})` },
            { id: 'pending_approval', label: `Pending Requests (${pendingUsers.length})` },
            { id: 'telegram_widget', label: `Telegram Widget (${widgetUsers.length})` },
            { id: 'active_paid', label: `Active Paid (${activePaidUsers.length})` },
            { id: 'free_trial', label: 'Free Trial' },
            { id: 'expired', label: `Expired (${expiredUsers.length})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === f.id
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 font-semibold">
                <th className="py-3 px-4">Student & Telegram</th>
                <th className="py-3 px-4">Mobile Contact</th>
                <th className="py-3 px-4">Subscription Status</th>
                <th className="py-3 px-4">Telebirr Proof</th>
                <th className="py-3 px-4">Access Period</th>
                <th className="py-3 px-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="max-w-md mx-auto space-y-2">
                      <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                        No registered students yet
                      </p>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        The academy is clean and ready for real users! Students will automatically appear here once they log in via Telegram (@Eximmanlearnbot widget or Mini App) or submit their 3,900 ETB subscription.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const daysLeft = getDaysLeft(user.expiresAt);
                  const isCurrent = currentUser.id === user.id;
                  const trialStart = user.trialStartedAt || user.registeredAt;
                  const daysOnTrial = Math.max(0, Math.floor((Date.now() - new Date(trialStart).getTime()) / (1000 * 60 * 60 * 24)));

                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors ${
                        user.subscriptionStatus === 'pending_approval'
                          ? 'bg-amber-50/40 dark:bg-amber-950/20'
                          : ''
                      }`}
                    >
                      {/* Name & Telegram */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 flex-wrap">
                          <span>{user.fullName}</span>
                          {user.isTelegramWidgetUser && (
                            <span className="text-[10px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                              Auto Widget
                            </span>
                          )}
                          {user.completedChapters && user.completedChapters.length > 0 && (
                            <span className="text-[10px] font-normal text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                              {user.completedChapters.length}/16 ch
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                            <Send className="w-3 h-3 shrink-0" />
                            <span>{user.telegramUsername}</span>
                          </span>

                          {user.telegramUsername && (
                            <a
                              href={`https://t.me/${user.telegramUsername.replace(/^@/, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1b7fae] dark:text-[#6cc2e9] hover:underline bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800"
                              title={`Directly message ${user.fullName} on Telegram`}
                            >
                              <span>Follow up</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Mobile & Activity */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>{user.phoneNumber || '—'}</span>
                        </div>
                        <div className="text-neutral-400 text-[10px] mt-0.5 space-y-0.5">
                          <div>Reg: {new Date(user.registeredAt).toLocaleDateString()}</div>
                          {user.subscriptionStatus === 'free_trial' && (
                            <div className={`font-semibold ${daysOnTrial >= 3 ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-500'}`}>
                              Trial: Day {daysOnTrial + 1} {daysOnTrial >= 3 ? '(3D Push Active)' : ''}
                            </div>
                          )}
                          {user.lastLoginAt && (
                            <div className="text-neutral-500">Active: {new Date(user.lastLoginAt).toLocaleDateString()}</div>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {user.subscriptionStatus === 'pending_approval' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 animate-pulse">
                            <Clock className="w-3 h-3" />
                            <span>Pending (3,900 ETB)</span>
                          </span>
                        )}
                        {user.subscriptionStatus === 'active_paid' && !user.expiresAt && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-300 dark:border-purple-800">
                            <Sparkles className="w-3 h-3" />
                            <span>Lifetime VIP Access</span>
                          </span>
                        )}
                        {user.subscriptionStatus === 'active_paid' && user.expiresAt && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active Paid (30D)</span>
                          </span>
                        )}
                        {user.subscriptionStatus === 'expired' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-300 dark:border-rose-800">
                            <Clock className="w-3 h-3" />
                            <span>Expired 30D</span>
                          </span>
                        )}
                        {user.subscriptionStatus === 'free_trial' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded-full">
                            <span>Free Trial (Ch 1 & 2)</span>
                          </span>
                        )}
                        {user.subscriptionStatus === 'rejected' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3" />
                            <span>Declined</span>
                          </span>
                        )}
                      </td>

                      {/* Telebirr Proof */}
                      <td className="py-3.5 px-4">
                        {user.paymentScreenshot ? (
                          <button
                            onClick={() => setSelectedProofUser(user)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-[11px] font-semibold hover:bg-amber-100 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Screenshot</span>
                          </button>
                        ) : user.telebirrTxId ? (
                          <span className="font-mono text-neutral-700 dark:text-neutral-300 text-[11px]">
                            Ref: {user.telebirrTxId}
                          </span>
                        ) : (
                          <span className="text-neutral-400 text-[11px]">No proof uploaded</span>
                        )}
                      </td>

                      {/* Access Period */}
                      <td className="py-3.5 px-4">
                        {user.subscriptionStatus === 'active_paid' && !user.expiresAt ? (
                          <div>
                            <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">
                              Unlimited Lifetime
                            </span>
                            <span className="text-[10px] text-neutral-400 block">
                              All 16 Chapters Unlocked
                            </span>
                          </div>
                        ) : user.subscriptionStatus === 'active_paid' && daysLeft !== null ? (
                          <div>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                              {daysLeft} Days Remaining
                            </span>
                            <span className="text-[10px] text-neutral-400 block font-mono">
                              Exp: {new Date(user.expiresAt!).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-[11px]">Limited trial</span>
                        )}
                      </td>

                      {/* Admin Approval Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          {user.subscriptionStatus === 'pending_approval' && (
                            <>
                              <button
                                onClick={() => adminApproveUser(user.id, 30)}
                                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] transition-colors shadow-2xs"
                                title="Approve 30-Day Full Access"
                              >
                                Approve 30 Days
                              </button>
                              <button
                                onClick={() => adminGrantLifetime(user.id)}
                                className="px-2.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-[11px] transition-colors shadow-2xs"
                                title="Grant Lifetime VIP Access"
                              >
                                Lifetime VIP
                              </button>
                              <button
                                onClick={() => {
                                  adminRejectUser(
                                    user.id,
                                    'Payment transfer failed or could not be verified in telebirr. Please upload the correct telebirr payment screenshot and try again for subscription approval.'
                                  );
                                  setDeleteNotice(
                                    `Rejected ${user.fullName} due to payment transfer failure. User notified to upload correct payment screenshot.`
                                  );
                                }}
                                className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1"
                                title="Reject and request user to upload correct payment screenshot"
                              >
                                <UploadCloud className="w-3 h-3 text-amber-600" />
                                <span>Upload Payment</span>
                              </button>
                              <button
                                onClick={() => adminRejectUser(user.id)}
                                className="px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-rose-600 rounded-lg font-medium text-[11px] transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {user.subscriptionStatus === 'active_paid' && (
                            <>
                              <button
                                onClick={() => adminExtendUser(user.id, 30)}
                                className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg font-semibold text-[11px] transition-colors flex items-center gap-1"
                                title="Add 30 additional days"
                              >
                                <RotateCcw className="w-3 h-3 text-amber-600" />
                                <span>Extend +30D</span>
                              </button>
                              {!user.expiresAt ? null : (
                                <button
                                  onClick={() => adminGrantLifetime(user.id)}
                                  className="px-2.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-semibold text-[11px] transition-colors"
                                  title="Upgrade to Lifetime Access"
                                >
                                  Make Lifetime
                                </button>
                              )}
                              <button
                                onClick={() => adminResetToTrial(user.id)}
                                className="px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-neutral-600 rounded-lg text-[10px]"
                                title="Reset to Free Trial"
                              >
                                Reset Trial
                              </button>
                            </>
                          )}

                          {user.subscriptionStatus === 'free_trial' && (
                            <>
                              <button
                                onClick={() => adminApproveUser(user.id, 30)}
                                className="px-2.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold text-[11px] transition-colors"
                                title="Upgrade to 30-day paid subscription"
                              >
                                Approve 30D (3,900 ETB)
                              </button>
                              <button
                                onClick={() => adminGrantLifetime(user.id)}
                                className="px-2 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-[11px] transition-colors"
                                title="Grant Lifetime Access"
                              >
                                VIP Lifetime
                              </button>
                            </>
                          )}

                          {user.subscriptionStatus === 'expired' && (
                            <>
                              <button
                                onClick={() => adminApproveUser(user.id, 30)}
                                className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] transition-colors shadow-2xs"
                                title="Renew for 30 Days"
                              >
                                Renew 30D (3,900 ETB)
                              </button>
                              <button
                                onClick={() => adminGrantLifetime(user.id)}
                                className="px-2 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-[11px] transition-colors shadow-2xs"
                              >
                                Lifetime VIP
                              </button>
                            </>
                          )}

                          {user.subscriptionStatus === 'rejected' && (
                            <>
                              <button
                                onClick={() => adminApproveUser(user.id, 30)}
                                className="px-2.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold text-[11px] transition-colors"
                              >
                                Re-approve 30D
                              </button>
                              <button
                                onClick={() => adminResetToTrial(user.id)}
                                className="px-2 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 rounded-lg text-[10px]"
                              >
                                To Trial
                              </button>
                            </>
                          )}

                          {/* Delete User Button */}
                          <button
                            onClick={() => setUserToDelete(user)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ml-1"
                            title={`Delete ${user.fullName} (${user.telegramUsername}) from records`}
                            aria-label={`Delete ${user.fullName}`}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500 hover:text-rose-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screenshot Proof Modal */}
      {selectedProofUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="font-serif-title font-bold text-lg text-neutral-900 dark:text-neutral-100">
                  telebirr Transfer Receipt Proof
                </h3>
                <span className="text-xs text-neutral-500">
                  {selectedProofUser.fullName} ({selectedProofUser.telegramUsername}) · {selectedProofUser.phoneNumber}
                </span>
              </div>
              <button
                onClick={() => setSelectedProofUser(null)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-2 max-h-96 overflow-y-auto text-center">
              {selectedProofUser.paymentScreenshot && selectedProofUser.paymentScreenshot !== 'simulated_payment_proof' ? (
                <img
                  src={selectedProofUser.paymentScreenshot}
                  alt="Receipt"
                  className="max-h-88 mx-auto rounded-xl object-contain shadow-sm"
                />
              ) : selectedProofUser.paymentScreenshot === 'simulated_payment_proof' ? (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 max-w-sm mx-auto shadow-sm text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#e31e24] text-white text-[10px] font-bold">telebirr</span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Completed Transfer</span>
                    </span>
                  </div>
                  <div className="text-center py-2">
                    <span className="text-2xl font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                      3,900.00 ETB
                    </span>
                    <span className="block text-[11px] text-neutral-500">Academy 30-Day Subscription (60% Off)</span>
                  </div>
                  <div className="space-y-1.5 text-xs border-t border-neutral-100 dark:border-neutral-800 pt-2 font-mono">
                    <div className="flex justify-between text-neutral-500">
                      <span>Sender:</span>
                      <span className="text-neutral-800 dark:text-neutral-200 font-sans font-medium">{selectedProofUser.fullName}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Sender Phone:</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{selectedProofUser.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Receiver:</span>
                      <span className="text-neutral-800 dark:text-neutral-200 font-sans font-medium">Abdulkerim (@EximmanAbdIstad)</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Receiver Phone:</span>
                      <span className="text-neutral-800 dark:text-neutral-200">09 6768 4490</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Tx ID:</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{selectedProofUser.telebirrTxId || 'TB98234123'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-neutral-400 text-xs">
                  No image attached.
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300 block">
                  Amount: 3,900 ETB
                </span>
                {selectedProofUser.telebirrTxId && (
                  <span className="font-mono text-neutral-500 text-[11px]">
                    Tx Ref: {selectedProofUser.telebirrTxId}
                  </span>
                )}
                {selectedProofUser.paymentRejectedReason && (
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 block mt-0.5 font-medium">
                    Prior Rejection: {selectedProofUser.paymentRejectedReason}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 justify-end w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    adminRejectUser(
                      selectedProofUser.id,
                      'Payment transfer failed or could not be verified in telebirr. Please upload the correct telebirr payment screenshot and try again for subscription approval.'
                    );
                    setDeleteNotice(
                      `Subscription request for ${selectedProofUser.fullName} (${selectedProofUser.telegramUsername}) rejected due to payment transfer failure. User has been notified to upload correct payment screenshot.`
                    );
                    setSelectedProofUser(null);
                  }}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
                  title="Reject due to failure in payment transfer & notify user to upload correct screenshot"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload Payment</span>
                </button>
                <button
                  onClick={() => {
                    adminRejectUser(selectedProofUser.id, 'Subscription request declined');
                    setDeleteNotice(`Declined request for ${selectedProofUser.fullName}.`);
                    setSelectedProofUser(null);
                  }}
                  className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    adminApproveUser(selectedProofUser.id, 30);
                    setDeleteNotice(`Approved 30-day access for ${selectedProofUser.fullName} (${selectedProofUser.telegramUsername})!`);
                    setSelectedProofUser(null);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve 30 Days Access</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Enroll Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="font-serif-title font-bold text-lg text-neutral-900 dark:text-neutral-100">
                  Enroll New Student
                </h3>
                <span className="text-xs text-neutral-500">
                  Register student with Telegram, Name & Mobile
                </span>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddStudent} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Telegram Username *
                </label>
                <input
                  type="text"
                  required
                  value={newTelegram}
                  onChange={e => setNewTelegram(e.target.value)}
                  placeholder="@student_username"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Almaz Bekele"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  placeholder="09 11 22 33 44"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 dark:text-neutral-300">
                  <input
                    type="checkbox"
                    checked={grantPaidDirectly}
                    onChange={e => setGrantPaidDirectly(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                  />
                  <span>Directly grant active 30-day paid subscription (3,900 ETB)</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center gap-3 text-rose-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 shrink-0">
                <Trash2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif-title font-bold text-lg text-neutral-900 dark:text-neutral-100">
                  Delete Student Record?
                </h3>
                <span className="text-xs text-neutral-500">
                  Confirm permanent removal from database
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs space-y-1.5">
              <div><strong>Student:</strong> {userToDelete.fullName}</div>
              <div><strong>Telegram:</strong> <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">{userToDelete.telegramUsername}</span></div>
              <div><strong>Subscription:</strong> <span className="capitalize">{userToDelete.subscriptionStatus.replace('_', ' ')}</span></div>
              {userToDelete.phoneNumber && <div><strong>Mobile:</strong> {userToDelete.phoneNumber}</div>}
              {userToDelete.isTelegramWidgetUser && (
                <div className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">Registered via Telegram Login Widget</div>
              )}
            </div>

            <p className="text-xs text-rose-700 dark:text-rose-400 leading-relaxed">
              ⚠️ This will permanently delete this student, their 30-day subscription, chapter completions, and payment records. This action cannot be reversed.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete User</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
