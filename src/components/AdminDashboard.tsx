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
  Send,
  Smartphone,
  UserPlus,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileCheck2
} from 'lucide-react';
import { formatTelegramHandle, normalizeTelegramUsername } from '../utils/telegramAuth';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    adminApproveUser,
    adminRejectUser,
    adminExtendUser,
    switchUser,
    currentUser,
    loginWithTelegram
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProofUser, setSelectedProofUser] = useState<UserProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Student State
  const [newTelegram, setNewTelegram] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [grantPaidDirectly, setGrantPaidDirectly] = useState(true);

  // Metrics
  const nonAdminUsers = users.filter(u => u.role !== 'admin' && u.telegramUsername?.toLowerCase() !== '@eximmanlearnbot');
  const totalUsers = nonAdminUsers.length;
  const pendingUsers = nonAdminUsers.filter(u => u.subscriptionStatus === 'pending_approval');
  const activePaidUsers = nonAdminUsers.filter(u => u.subscriptionStatus === 'active_paid');
  const expiredUsers = nonAdminUsers.filter(u => u.subscriptionStatus === 'expired');
  const totalRevenueETB = (activePaidUsers.length + expiredUsers.length) * 3900;

  // Filtered users
  const filteredUsers = nonAdminUsers
    .filter(u => {
      if (statusFilter === 'all') return true;
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

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator Control Center</span>
            <span>·</span>
            <span className="font-mono text-neutral-900 dark:text-neutral-100 font-bold">@Eximmanlearnbot</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            Subscription Approvals & Student Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Review telebirr payments (3,900 ETB to 09 6768 4490 · Abdulkerim) and grant 30-day full academy access.
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Total Enrolled Students
          </span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">
            {totalUsers}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Active & Trial Students</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-amber-300 dark:border-amber-800 rounded-2xl p-5 shadow-xs bg-amber-50/20">
          <span className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Approvals</span>
          </span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-1">
            {pendingUsers.length}
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 block">
            {pendingUsers.length > 0 ? 'Requires your approval' : 'All requests up to date'}
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Active Paid Subscribers
          </span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {activePaidUsers.length}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">All 16 Chapters Unlocked</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Telebirr Revenue
          </span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">
            {formatETB(totalRevenueETB)}{' '}
            <span className="text-sm font-sans font-normal text-neutral-500">ETB</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">@ 3,900 ETB / student</span>
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
            { id: 'pending_approval', label: `Pending Review (${pendingUsers.length})` },
            { id: 'active_paid', label: `Active (${activePaidUsers.length})` },
            { id: 'expired', label: `Expired (${expiredUsers.length})` },
            { id: 'free_trial', label: 'Free Trial' }
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
                  <td colSpan={6} className="py-8 text-center text-neutral-400">
                    No students match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const daysLeft = getDaysLeft(user.expiresAt);
                  const isCurrent = currentUser.id === user.id;

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
                        <div className="font-bold text-neutral-900 dark:text-neutral-100">
                          {user.fullName}
                        </div>
                        <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                          <Send className="w-3 h-3 shrink-0" />
                          <span>{user.telegramUsername}</span>
                        </div>
                      </td>

                      {/* Mobile */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{user.phoneNumber || '—'}</span>
                        </div>
                        <div className="text-neutral-400 text-[10px] mt-0.5">
                          Registered: {new Date(user.registeredAt).toLocaleDateString()}
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
                        {user.subscriptionStatus === 'active_paid' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active Paid</span>
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
                        {user.subscriptionStatus === 'active_paid' && daysLeft !== null ? (
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

                      {/* Admin Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {user.subscriptionStatus === 'pending_approval' && (
                            <>
                              <button
                                onClick={() => adminApproveUser(user.id, 30)}
                                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] transition-colors shadow-2xs"
                              >
                                Approve 30 Days
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
                            <button
                              onClick={() => adminExtendUser(user.id, 30)}
                              className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg font-semibold text-[11px] transition-colors flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3 text-amber-600" />
                              <span>Extend +30D</span>
                            </button>
                          )}

                          {user.subscriptionStatus === 'free_trial' && (
                            <button
                              onClick={() => adminApproveUser(user.id, 30)}
                              className="px-2.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold text-[11px] transition-colors"
                            >
                              Upgrade to Paid
                            </button>
                          )}

                          {user.subscriptionStatus === 'expired' && (
                            <button
                              onClick={() => adminApproveUser(user.id, 30)}
                              className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] transition-colors shadow-2xs"
                            >
                              Renew 30 Days (3,900 ETB)
                            </button>
                          )}

                          <button
                            onClick={() => switchUser(user.id)}
                            title="Switch view to this student"
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-mono border transition-colors ${
                              isCurrent
                                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 font-bold'
                                : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                            }`}
                          >
                            {isCurrent ? 'Viewing' : 'Switch'}
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
              {selectedProofUser.paymentScreenshot ? (
                <img
                  src={selectedProofUser.paymentScreenshot}
                  alt="Receipt"
                  className="max-h-88 mx-auto rounded-xl object-contain shadow-sm"
                />
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
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    adminRejectUser(selectedProofUser.id);
                    setSelectedProofUser(null);
                  }}
                  className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    adminApproveUser(selectedProofUser.id, 30);
                    setSelectedProofUser(null);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                >
                  Approve 30 Days Access
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
    </div>
  );
};
