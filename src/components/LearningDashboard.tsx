import React from 'react';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Compass,
  FileText,
  Landmark,
  PackageCheck,
  Play,
  Sparkles,
  Send,
  User,
  CreditCard,
  Clock,
  AlertCircle,
  UploadCloud
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSE_MODULES } from '../data/courseData';
import { MODULE_TRANSLATIONS, CHAPTER_TRANSLATIONS } from '../utils/translations';

const toolLinks = [
  { tab: 'landed_cost', title: 'Landed cost build-up', description: 'Bring purchase, freight, banking and clearance costs together.', icon: PackageCheck },
  { tab: 'lc_calculator', title: 'Letter of credit', description: 'Explore opening and settlement estimates for an L/C.', icon: Landmark },
  { tab: 'tax_calculator', title: 'Customs tax assessment', description: 'Practice a structured estimate of import taxes.', icon: FileText },
  { tab: 'incoterms_guide', title: 'Incoterms® 2020 guide', description: 'Interactive cost & risk responsibilities along the Ethiopian corridor.', icon: Compass },
] as const;

export const LearningDashboard: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    hasFullAccess,
    language,
    completedChaptersCount,
    progressPercentage,
    isChapterCompleted,
    setActiveNavTab,
    setSelectedChapterId,
    quizScores,
    setShowPaywallModal,
    telegramWebAppUser,
    setShowTelegramAuthModal
  } = useApp();

  const effectiveTelegramUsername =
    currentUser.telegramUsername ||
    (telegramWebAppUser?.username ? `@${telegramWebAppUser.username}` : '');

  const chapters = COURSE_MODULES.flatMap(module => module.chapters);
  const nextChapter = chapters.find(chapter => !isChapterCompleted(chapter.id)) ?? chapters[0];
  const moduleForNext = COURSE_MODULES.find(module => module.id === nextChapter?.moduleId);
  const completedQuizzes = Object.keys(quizScores).length;

  const continueLearning = () => {
    if (nextChapter && !nextChapter.isFreeTrialAccessible && !hasFullAccess) {
      setShowPaywallModal(true);
      return;
    }
    if (nextChapter) setSelectedChapterId(nextChapter.id);
    setActiveNavTab('curriculum');
  };

  const getSubscriptionPill = () => {
    if (isAdmin) return language === 'am' ? 'አስተዳዳሪ' : 'Administrator';
    if (currentUser.subscriptionStatus === 'active_paid') return language === 'am' ? 'የተመዘገበ አባል (30 ቀናት)' : 'Active Subscriber (30-Day)';
    if (currentUser.subscriptionStatus === 'pending_approval') return language === 'am' ? 'በማረጋገጥ ላይ ያለ ክፍያ' : 'Payment Pending Approval';
    if (currentUser.subscriptionStatus === 'rejected') return language === 'am' ? 'ክፍያ አልተረጋገጠም (እንደገና ይጫኑ)' : 'Payment Issue (Upload Payment)';
    if (currentUser.subscriptionStatus === 'expired') return language === 'am' ? 'ያለቀበት (በ3,900 ብር ያድሱ)' : 'Expired (Renew 3,900 ETB)';
    return language === 'am' ? 'ነፃ ሙከራ (ምዕራፍ 1 እና 2)' : 'Free Trial (Ch 1 & 2)';
  };

  const getToolTitle = (tab: string, defaultTitle: string) => {
    if (language !== 'am') return defaultTitle;
    switch (tab) {
      case 'landed_cost': return 'የዕቃ ማድረሻ ጠቅላላ ወጪ ስሌት';
      case 'lc_calculator': return 'የብድር ደብዳቤ (L/C) ክፍያ ስሌት';
      case 'tax_calculator': return 'የጉምሩክ ቀረጥና ታክስ ግመታ';
      case 'incoterms_guide': return 'የኢንኮተርምስ® 2020 መመሪያ';
      default: return defaultTitle;
    }
  };

  const getToolDesc = (tab: string, defaultDesc: string) => {
    if (language !== 'am') return defaultDesc;
    switch (tab) {
      case 'landed_cost': return 'ግዥ፣ የባህር ጭነት፣ ባንክና የጉምሩክ ወጪዎችን በአንድ ላይ ያሰሉ';
      case 'lc_calculator': return 'የኤል ሲ አከፋፈት፣ የዋጋ ለውጥና የባንክ ኮሚሽን ግመታዎች';
      case 'tax_calculator': return 'ባለ 7 እርከን የጉምሩክ ቀረጥ፣ ኤክሳይዝ፣ ሱርና ቫት ስሌት';
      case 'incoterms_guide': return 'በኢትዮጵያ ንግድ ኮሪደር የወጪና የስጋት ድልድል መመሪያ';
      default: return defaultDesc;
    }
  };

  const daysLeft = currentUser.expiresAt && currentUser.subscriptionStatus === 'active_paid'
    ? Math.max(0, Math.ceil((new Date(currentUser.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  const trialStart = currentUser.trialStartedAt || currentUser.registeredAt;
  const daysSinceTrialStart = trialStart
    ? Math.max(0, Math.floor((Date.now() - new Date(trialStart).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const show3DayPush = !isAdmin && currentUser.subscriptionStatus === 'free_trial' && daysSinceTrialStart >= 3;

  return (
    <div className="academy-enter space-y-6 pb-8">
      {/* Payment Rejected Notification Banner */}
      {!isAdmin && currentUser.subscriptionStatus === 'rejected' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 text-rose-950 dark:text-rose-100 shadow-sm animate-fade-in">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white shrink-0 shadow-xs">
              <AlertCircle className="h-5 w-5" />
            </span>
            <div className="text-xs sm:text-sm min-w-0">
              <span className="font-extrabold text-rose-900 dark:text-rose-100 flex items-center gap-2">
                <span>{language === 'am' ? '⚠️ የክፍያ ማረጋገጫ ችግር ተፈጥሯል' : '⚠️ Subscription Request Rejected: Payment Issue'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-600 text-white">
                  Action Needed
                </span>
              </span>
              <p className="text-rose-950 dark:text-rose-200 text-xs mt-0.5 leading-relaxed font-medium">
                {currentUser.paymentRejectedReason || (language === 'am'
                  ? 'አስተዳዳሪ @EximmanAbdIstad የክፍያ ስክሪንሾትዎን ማረጋገጥ አልቻሉም። እባክዎ ትክክለኛውን የቴሌብር ክፍያ ስክሪንሾት በመጫን እንደገና ማጽደቂያ ይጠይቁ።'
                  : 'Administrator @EximmanAbdIstad was unable to verify your telebirr transfer. Please upload the correct payment screenshot and try again for approval.')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPaywallModal(true)}
            className="shrink-0 self-start sm:self-auto px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-xs flex items-center gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            <span>{language === 'am' ? 'ትክክለኛውን ክፍያ ይጫኑ' : 'Upload Payment & Retry'}</span>
          </button>
        </div>
      )}

      {/* 3-Day Free Trial Stay Push Notification: Urge student to proceed to subscribe and use cost calculators */}
      {show3DayPush && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-transparent dark:bg-amber-950/60 border-2 border-amber-600 text-amber-950 dark:text-amber-100 shadow-sm animate-fade-in">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shrink-0 shadow-xs">
              <Clock className="h-5 w-5" />
            </span>
            <div className="text-xs sm:text-sm min-w-0">
              <span className="font-extrabold text-amber-950 dark:text-amber-100 flex items-center gap-2">
                <span>{language === 'am' ? '⏰ ነፃ ሙከራ ከጀመሩ 3 ቀናት አልፈዋል! ሙሉ ትምህርቱንና የዋጋ ማስያዎችን ይጠቀሙ' : '⏰ 3+ Days on Free Trial! Ready to advance with courses and use cost calculators?'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-600 text-white">
                  60% Off
                </span>
              </span>
              <p className="text-amber-900/90 dark:text-amber-300/90 text-xs mt-0.5 leading-relaxed">
                {language === 'am'
                  ? 'የነፃ ሙከራ ምዕራፍ 1 እና 2ን አጠናቀዋል። አሁን በ3,900 ብር (ልዩ 60% ቅናሽ!) በመመዝገብ ሙሉ 16 ምዕራፎችንና የዕቃ ጠቅላላ ወጪ (Landed Cost)፣ የኤል ሲ ስሌት (L/C) እና የጉምሩክ ቀረጥ ማስያ መሳሪያዎችን ለ30 ቀናት በሙሉ ይጠቀሙ!'
                  : "You've explored chapters 1 & 2 on free trial. Subscribe now for 3,900 ETB (Promotional 60% Discount!) to unlock chapters 3–16 and all financial calculators (Landed Cost Build-up, L/C, Customs Tax Assessment, and Incoterms Guide) for 30 days!"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPaywallModal(true)}
            className="shrink-0 self-start sm:self-auto px-4 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-xs flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            <span>{language === 'am' ? 'ይመዝገቡና ማስያዎችን ይጠቀሙ (3,900 ብር)' : 'Subscribe for Courses & Calculators (3,900 ETB)'}</span>
          </button>
        </div>
      )}

      {/* 4-Day Expiry Notification Banner */}
      {!isAdmin && currentUser.subscriptionStatus === 'active_paid' && daysLeft !== null && daysLeft <= 4 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-amber-500/15 dark:bg-amber-950/50 border-2 border-amber-500 text-amber-950 dark:text-amber-100 shadow-sm animate-pulse-subtle">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shrink-0 shadow-xs">
              <Clock className="h-5 w-5" />
            </span>
            <div className="text-xs sm:text-sm min-w-0">
              <span className="font-extrabold text-amber-900 dark:text-amber-200">
                {language === 'am'
                  ? `አስቸኳይ ማሳሰቢያ፦ የ30 ቀናት አባልነትዎ ሊያልቅ ${daysLeft} ${daysLeft === 1 ? 'ቀን' : 'ቀናት'} ብቻ ቀርቷል!`
                  : `Subscription Notice: Only ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} remaining on your 30-day access!`}
              </span>
              <p className="text-amber-800/90 dark:text-amber-300/90 text-xs mt-0.5">
                {language === 'am'
                  ? 'ሁሉንም 16 ምዕራፎችና የዋጋ ማስያ መሳሪያዎችን ያለማቋረጥ ለመጠቀም አባልነትዎን አሁኑኑ ያድሱ (3,900 ብር)'
                  : 'Please update your subscription now to retain access to all 16 chapters, cost calculators, and tools (3,900 ETB / 30 days).'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPaywallModal(true)}
            className="shrink-0 self-start sm:self-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-xs flex items-center gap-1.5"
          >
            <CreditCard className="h-4 w-4" />
            <span>{language === 'am' ? 'አባልነትዎን ያድሱ (3,900 ብር)' : 'Update Subscription (3,900 ETB)'}</span>
          </button>
        </div>
      )}

      {/* Expired Subscription Banner */}
      {!isAdmin && currentUser.subscriptionStatus === 'expired' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/80 text-amber-950 dark:text-amber-200 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <div className="text-xs min-w-0">
              <span className="font-bold">
                {language === 'am' ? 'የ30 ቀናት ምዝገባዎ አልቋል' : '30-Day Subscription Expired'}
              </span>
              <span className="hidden md:inline text-amber-900/80 dark:text-amber-300/80 text-[11px] ml-2">
                {language === 'am' ? '· በ3,900 ብር (የ60% ቅናሽ) ያድሱ' : '· Renew for 3,900 ETB (Promotional 60% Discount!)'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowPaywallModal(true)}
            className="shrink-0 self-end sm:self-auto px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition shadow-2xs"
          >
            {language === 'am' ? 'በ3,900 ብር ያድሱ' : 'Renew (3,900 ETB · 60% Off)'}
          </button>
        </div>
      )}

      {/* Main Hero Section */}
      <section className="relative overflow-hidden rounded-[26px] bg-[#174f49] px-6 py-8 text-[#f6f4e9] sm:px-9 sm:py-10 lg:px-12">
        <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
        <div className="absolute -right-2 -top-14 h-52 w-52 rounded-full border border-white/10" aria-hidden="true" />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            {/* Top Tag & Telegram Identity Pill */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.15em] text-[#d8e8dd]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{language === 'am' ? 'የመማሪያ ማዕከል' : 'Your learning desk'}</span>
              </div>
              {effectiveTelegramUsername ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 px-3 py-1.5 text-[11px] font-bold text-sky-200">
                  <Send className="h-3 w-3 text-sky-300" />
                  <span>{effectiveTelegramUsername}</span>
                  <span className="text-[10px] font-normal text-sky-300/80">
                    · {getSubscriptionPill()}
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-[#d8e8dd]">
                  {language === 'am' ? 'ነፃ የሙከራ ተጠቃሚ' : 'Free Trial Guest'}
                </span>
              )}
            </div>

            {/* Personalized Heading */}
            <h1 className="font-serif-title text-3xl font-extrabold leading-tight tracking-[-.045em] sm:text-4xl">
              {effectiveTelegramUsername ? (
                <>
                  {language === 'am' ? 'እንኳን በደህና መጡ፣ ' : 'Welcome back, '}
                  <span className="text-[#f1d4a5]">{effectiveTelegramUsername}</span>!
                </>
              ) : (
                <>
                  {language === 'am' ? (
                    <>የንግድ እውቀት — የትም ሆነው ይማሩ፣ <span className="text-[#d4ad78]">በተግባር ያውሉ!</span></>
                  ) : (
                    <>Trade knowledge - Learn Wherever you are, <span className="text-[#d4ad78]">put to work.</span></>
                  )}
                </>
              )}
            </h1>

            {/* Personalized Subtitle */}
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#d5e3dc] sm:text-base">
              {effectiveTelegramUsername ? (
                language === 'am' ? (
                  <>
                    በቴሌግራም <strong className="text-white font-semibold">{effectiveTelegramUsername}</strong> ({currentUser.fullName}) ተገናኝተዋል። በኢትዮጵያ የወጪና የገቢ ንግድ እንዲሁም የሎጂስቲክስ ተግባራዊ እውቀት ያዳብሩ።
                  </>
                ) : (
                  <>
                    Logged in with Telegram as <strong className="text-white font-semibold">{effectiveTelegramUsername}</strong> ({currentUser.fullName}). Build practical confidence in Ethiopian import, export, and logistics—one lesson and one calculation at a time.
                  </>
                )
              ) : (
                language === 'am' ? (
                  <>
                    ወደ ላኪና አስመጪ ሎጂስቲክስ አካዳሚ እንኳን በደህና መጡ። የትምህርት ሂደቶን ለመከታተልና አባልነትዎን ለማንቃት በቴሌግራም አካውንትዎ ይግቡ።
                  </>
                ) : (
                  <>
                    Welcome to Export-Import Logistics Academy. Build practical confidence in Ethiopian import, export, and corridor operations. Log in with your Telegram account to sync your progress and activate your membership.
                  </>
                )
              )}
            </p>

            {/* Actions Toolbar */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={continueLearning}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#f1d4a5] px-4 py-2.5 text-sm font-bold text-[#243a34] transition hover:bg-[#f8e3c2]"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>
                  {hasFullAccess
                    ? (language === 'am' ? 'ትምህርቱን ይቀጥሉ' : 'Continue learning')
                    : (language === 'am' ? 'ትምህርቱን ይቀጥሉ - ነፃ ሙከራ (ምዕራፍ 1 እና 2 ብቻ)' : 'Continue learning - Free trial only Ch 1 and 2')}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="https://t.me/eximmanlearn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#229ed9] hover:bg-[#1e8ec3] px-4 py-2.5 text-sm font-bold text-white transition shadow-sm"
              >
                <Send className="h-4 w-4" />
                <span>{language === 'am' ? 'ለተጨማሪ የቢዝነስ መረጃዎች ቻናላችንን ይቀላቀሉ' : 'Join our channel for more business Updates'}</span>
              </a>

              {!effectiveTelegramUsername && (
                <button
                  type="button"
                  onClick={() => setShowTelegramAuthModal(true)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 px-4 py-2.5 text-sm font-bold text-white transition backdrop-blur-xs"
                >
                  <User className="h-4 w-4" />
                  <span>{language === 'am' ? 'በቴሌግራም ይግቡ' : 'Log in with Telegram'}</span>
                </button>
              )}

              {/* Line break: places Subscribe button directly below the Continue Learning row */}
              <div className="w-full basis-full h-0 m-0 p-0" />

              {/* Button below: Subscribe for full courses and cost calculators */}
              <button
                type="button"
                onClick={() => setShowPaywallModal(true)}
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white px-5 py-2.5 text-sm font-extrabold shadow-md transition-all hover:shadow-lg active:scale-[0.99]"
              >
                <CreditCard className="h-4 w-4 text-amber-200 shrink-0 group-hover:scale-110 transition-transform" />
                <span>
                  {language === 'am'
                    ? 'ሙሉ ኮርሶችንና የዋጋ ማስያ መሳሪያዎችን ለማግኘት ይመዝገቡ'
                    : 'Subscribe for full courses and cost calculators'}
                </span>
                <span className="hidden xs:inline-block ml-1 px-2.5 py-0.5 rounded-full bg-amber-900/60 text-[11px] font-semibold text-amber-100 border border-amber-300/30">
                  {language === 'am' ? '3,900 ብር · 30 ቀናት' : '3,900 ETB · 30 Days'}
                </span>
                <ArrowRight className="h-4 w-4 text-amber-200 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="relative min-w-44 rounded-2xl border border-white/15 bg-white/[.08] p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-[#d5e3dc]">
              <span>{language === 'am' ? 'የትምህርት ሂደት' : 'Course progress'}</span>
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-serif-title text-4xl font-bold tracking-tight">{progressPercentage}%</span>
              <span className="pb-1 text-xs text-[#d5e3dc]">
                {language === 'am'
                  ? `${completedChaptersCount} ከ ${chapters.length} ትምህርቶች`
                  : `${completedChaptersCount} of ${chapters.length} lessons`}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#dfbd8c] transition-all" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Learning snapshot" className="grid gap-3 sm:grid-cols-3">
        <div className="academy-card flex items-center gap-4 p-4 sm:p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f1ed] text-[#176b60]"><Check className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-semibold academy-muted">
              {language === 'am' ? 'የተጠናቀቁ ትምህርቶች' : 'Lessons completed'}
            </p>
            <p className="mt-0.5 font-serif-title text-2xl font-bold">
              {completedChaptersCount}
              <span className="ml-1 text-sm font-medium academy-muted">/ {chapters.length}</span>
            </p>
          </div>
        </div>
        <div className="academy-card flex items-center gap-4 p-4 sm:p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7eee2] text-[#9b622e]"><Sparkles className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-semibold academy-muted">
              {language === 'am' ? 'የተሞከሩ ፈተናዎች' : 'Quiz attempts saved'}
            </p>
            <p className="mt-0.5 font-serif-title text-2xl font-bold">{completedQuizzes}</p>
          </div>
        </div>
        <div className="academy-card flex items-center gap-4 p-4 sm:p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf0e9] text-[#4f675b]"><Clock3 className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-semibold academy-muted">
              {language === 'am' ? 'የስልጠና መዋቅር' : 'Learning pathway'}
            </p>
            <p className="mt-0.5 text-sm font-bold">
              {language === 'am'
                ? `${COURSE_MODULES.length} ሞጁሎች · ${chapters.length} ትምህርቶች`
                : `${COURSE_MODULES.length} modules · ${chapters.length} lessons`}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.35fr_.75fr]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.16em] academy-brand">
                {language === 'am' ? 'የተደራጀ ሥርዓተ ትምህርት' : 'Structured curriculum'}
              </p>
              <h2 className="mt-1 font-serif-title text-2xl font-bold tracking-tight">
                {language === 'am' ? 'ትምህርትዎን ከቆሙበት ይቀጥሉ' : 'Pick up where practice begins'}
              </h2>
            </div>
            <button onClick={() => setActiveNavTab('curriculum')} className="inline-flex items-center gap-1 text-xs font-bold academy-brand hover:underline">
              {language === 'am' ? 'ሁሉም ትምህርቶች' : 'All lessons'} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {COURSE_MODULES.map((module, index) => {
              const moduleDone = module.chapters.filter(chapter => isChapterCompleted(chapter.id)).length;
              const isCurrent = module.id === moduleForNext?.id;
              const firstChapter = module.chapters[0];
              const modTitle = MODULE_TRANSLATIONS[module.id]?.title[language] || module.title;
              const modSubtitle = MODULE_TRANSLATIONS[module.id]?.subtitle[language] || module.subtitle;

              return (
                <article key={module.id} className={`academy-card academy-card-hover p-4 sm:p-5 ${isCurrent ? 'border-l-[3px] border-l-[#176b60]' : ''}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-3.5">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${isCurrent ? 'bg-[#176b60] text-white' : 'bg-[#e8ede8] text-[#53635b] dark:bg-[#34413c] dark:text-[#e1e9e3]'}`}>{String(index + 1).padStart(2, '0')}</div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[.12em] academy-muted">
                            {language === 'am' ? `ሞጁል ${module.moduleNumber}` : `Module ${module.moduleNumber}`}
                          </span>
                          {isCurrent && (
                            <span className="rounded-full bg-[#e6f1ed] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#176b60] dark:bg-[#263a35] dark:text-[#b5dfd2]">
                              {language === 'am' ? 'ቀጣይ' : 'Up next'}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 text-sm font-bold leading-5">{modTitle}</h3>
                        <p className="mt-1 text-xs leading-5 academy-muted">{modSubtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:min-w-32 sm:flex-col sm:items-end">
                      <span className="text-xs font-semibold academy-muted">
                        {language === 'am'
                          ? `${moduleDone}/${module.chapters.length} ትምህርቶች`
                          : `${moduleDone}/${module.chapters.length} lessons`}
                      </span>
                      <button
                        onClick={() => {
                          const target = module.chapters.find(chapter => !isChapterCompleted(chapter.id)) ?? firstChapter;
                          if (target && !target.isFreeTrialAccessible && !hasFullAccess) {
                            setShowPaywallModal(true);
                            return;
                          }
                          if (target) setSelectedChapterId(target.id);
                          setActiveNavTab('curriculum');
                        }}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border academy-line px-3 text-xs font-bold transition hover:bg-[#e6f1ed] dark:hover:bg-[#263a35]"
                      >
                        {moduleDone === module.chapters.length && module.chapters.length > 0
                          ? (language === 'am' ? 'ሞጁሉን ከልስ' : 'Review module')
                          : (language === 'am' ? 'ሞጁሉን ክፈት' : 'Browse module')} <ArrowDownRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#e9ede8] dark:bg-[#34413c]"><div className="h-full rounded-full bg-[#4e9582]" style={{ width: `${module.chapters.length ? moduleDone / module.chapters.length * 100 : 0}%` }} /></div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.16em] academy-accent">
              {language === 'am' ? 'በተግባር ይማሩ' : 'Learn by doing'}
            </p>
            <h2 className="mt-1 font-serif-title text-2xl font-bold tracking-tight">
              {language === 'am' ? 'በተግባራዊ የንግድ መተግበሪያዎች ይለማመዱ' : 'Practice with trade tools'}
            </h2>
            <p className="mt-2 text-xs leading-5 academy-muted">
              {language === 'am'
                ? 'ፅንሰ-ሀሳቦችን ከተግባራዊ የንግድ ስሌቶች ጋር ለማገናኘት እነዚህን መተግበሪያዎች ይጠቀሙ።'
                : 'Use the calculators alongside your lessons to connect concepts with working estimates.'}
            </p>
            <div className="mt-4 space-y-2.5">
              {toolLinks.map(({ tab, title, description, icon: Icon }) => (
                <button
                  key={tab}
                  onClick={() => {
                    if (!hasFullAccess) {
                      setShowPaywallModal(true);
                      return;
                    }
                    setActiveNavTab(tab);
                  }}
                  className="academy-card academy-card-hover flex w-full items-center gap-3 p-3.5 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7eee2] text-[#9b622e]"><Icon className="h-4.5 w-4.5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">{getToolTitle(tab, title)}</span>
                    <span className="mt-0.5 block text-[11px] leading-4 academy-muted">{getToolDesc(tab, description)}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 academy-muted" />
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#e7d7c1] bg-[#fff8ee] p-4 dark:border-[#5a4934] dark:bg-[#30291f]">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 h-2 w-2 rounded-full bg-[#b46d2e]" />
              <div>
                <h3 className="text-xs font-bold text-[#664627] dark:text-[#edc995]">
                  {language === 'am' ? 'ይለማመዱና ያረጋግጡ' : 'Practice, then verify'}
                </h3>
                <p className="mt-1 text-[11px] leading-5 text-[#735f49] dark:text-[#cbbb9f]">
                  {language === 'am'
                    ? 'የመተግበሪያዎቹ ውጤቶች ለትምህርታዊ ግምት የቀረቡ ናቸው። ወቅታዊ መመሪያዎችንና የውጭ ምንዛሪ ተመኖችን ከሚመለከታቸው የመንግስት አካላትና ባንኮች ጋር ያረጋግጡ።'
                    : 'Tool outputs are educational estimates. Verify current regulations and exchange rates with the relevant authorities and financial institutions.'}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
