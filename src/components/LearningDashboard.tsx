import React from 'react';
import { AlertTriangle, ArrowDownRight, ArrowRight, BookOpen, Check, Clock3, FileText, Landmark, PackageCheck, Play, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COURSE_MODULES } from '../data/courseData';

const toolLinks = [
  { tab: 'landed_cost', title: 'Landed cost build-up', description: 'Bring purchase, freight, banking and clearance costs together.', icon: PackageCheck },
  { tab: 'lc_calculator', title: 'Letter of credit', description: 'Explore opening and settlement estimates for an L/C.', icon: Landmark },
  { tab: 'tax_calculator', title: 'Customs tax assessment', description: 'Practice a structured estimate of import taxes.', icon: FileText },
] as const;

export const LearningDashboard: React.FC = () => {
  const {
    currentUser, isAdmin, completedChaptersCount, progressPercentage, isChapterCompleted,
    setActiveNavTab, setSelectedChapterId, quizScores, setShowPaywallModal
  } = useApp();

  const chapters = COURSE_MODULES.flatMap(module => module.chapters);
  const nextChapter = chapters.find(chapter => !isChapterCompleted(chapter.id)) ?? chapters[0];
  const moduleForNext = COURSE_MODULES.find(module => module.id === nextChapter?.moduleId);
  const completedQuizzes = Object.keys(quizScores).length;

  const continueLearning = () => {
    if (nextChapter) setSelectedChapterId(nextChapter.id);
    setActiveNavTab('curriculum');
  };

  return (
    <div className="academy-enter space-y-6 pb-8">
      {/* Expired Subscription Banner */}
      {!isAdmin && currentUser.subscriptionStatus === 'expired' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-500/80 text-amber-950 dark:text-amber-200 shadow-xs">
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 mt-0.5">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold">Your 30-Day Subscription Has Expired</h3>
              <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-0.5">
                Every subscription period lasts 30 days. Resubscribe now for 3,900 Birr to continue uninterrupted access to all 16 chapters and certificates.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPaywallModal(true)}
            className="shrink-0 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
          >
            Resubscribe for 3,900 ETB (30 Days)
          </button>
        </div>
      )}

      <section className="relative overflow-hidden rounded-[26px] bg-[#174f49] px-6 py-8 text-[#f6f4e9] sm:px-9 sm:py-10 lg:px-12">
        <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
        <div className="absolute -right-2 -top-14 h-52 w-52 rounded-full border border-white/10" aria-hidden="true" />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.15em] text-[#d8e8dd]">
              <Sparkles className="h-3.5 w-3.5" /> Your learning desk
            </div>
            <h1 className="font-serif-title text-3xl font-extrabold leading-tight tracking-[-.045em] sm:text-4xl">
              Trade knowledge - Learn Wherever you are, <span className="text-[#d4ad78]">put to work.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#d5e3dc] sm:text-base">
              Welcome back, {currentUser.fullName.split(' ')[0]}. Build practical confidence in Ethiopian import, export and logistics—one lesson and one calculation at a time.
            </p>
            <button onClick={continueLearning} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#f1d4a5] px-4 py-2.5 text-sm font-bold text-[#243a34] transition hover:bg-[#f8e3c2]">
              <Play className="h-4 w-4 fill-current" /> Continue learning <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative min-w-44 rounded-2xl border border-white/15 bg-white/[.08] p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-[#d5e3dc]">
              <span>Course progress</span><BookOpen className="h-4 w-4" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-serif-title text-4xl font-bold tracking-tight">{progressPercentage}%</span>
              <span className="pb-1 text-xs text-[#d5e3dc]">{completedChaptersCount} of {chapters.length} lessons</span>
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
          <div><p className="text-xs font-semibold academy-muted">Lessons completed</p><p className="mt-0.5 font-serif-title text-2xl font-bold">{completedChaptersCount}<span className="ml-1 text-sm font-medium academy-muted">/ {chapters.length}</span></p></div>
        </div>
        <div className="academy-card flex items-center gap-4 p-4 sm:p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7eee2] text-[#9b622e]"><Sparkles className="h-5 w-5" /></div>
          <div><p className="text-xs font-semibold academy-muted">Quiz attempts saved</p><p className="mt-0.5 font-serif-title text-2xl font-bold">{completedQuizzes}</p></div>
        </div>
        <div className="academy-card flex items-center gap-4 p-4 sm:p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf0e9] text-[#4f675b]"><Clock3 className="h-5 w-5" /></div>
          <div><p className="text-xs font-semibold academy-muted">Learning pathway</p><p className="mt-0.5 text-sm font-bold">{COURSE_MODULES.length} modules · {chapters.length} lessons</p></div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.35fr_.75fr]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div><p className="text-[11px] font-bold uppercase tracking-[.16em] academy-brand">Structured curriculum</p><h2 className="mt-1 font-serif-title text-2xl font-bold tracking-tight">Pick up where practice begins</h2></div>
            <button onClick={() => setActiveNavTab('curriculum')} className="inline-flex items-center gap-1 text-xs font-bold academy-brand hover:underline">All lessons <ArrowRight className="h-3.5 w-3.5" /></button>
          </div>
          <div className="space-y-3">
            {COURSE_MODULES.map((module, index) => {
              const moduleDone = module.chapters.filter(chapter => isChapterCompleted(chapter.id)).length;
              const isCurrent = module.id === moduleForNext?.id;
              const firstChapter = module.chapters[0];
              return (
                <article key={module.id} className={`academy-card academy-card-hover p-4 sm:p-5 ${isCurrent ? 'border-l-[3px] border-l-[#176b60]' : ''}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-3.5">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${isCurrent ? 'bg-[#176b60] text-white' : 'bg-[#e8ede8] text-[#53635b] dark:bg-[#34413c] dark:text-[#e1e9e3]'}`}>{String(index + 1).padStart(2, '0')}</div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[.12em] academy-muted">Module {module.moduleNumber}</span>
                          {isCurrent && <span className="rounded-full bg-[#e6f1ed] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#176b60] dark:bg-[#263a35] dark:text-[#b5dfd2]">Up next</span>}
                        </div>
                        <h3 className="mt-1 text-sm font-bold leading-5">{module.title}</h3>
                        <p className="mt-1 text-xs leading-5 academy-muted">{module.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:min-w-32 sm:flex-col sm:items-end">
                      <span className="text-xs font-semibold academy-muted">{moduleDone}/{module.chapters.length} lessons</span>
                      <button
                        onClick={() => {
                          const target = module.chapters.find(chapter => !isChapterCompleted(chapter.id)) ?? firstChapter;
                          if (target) setSelectedChapterId(target.id);
                          setActiveNavTab('curriculum');
                        }}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border academy-line px-3 text-xs font-bold transition hover:bg-[#e6f1ed] dark:hover:bg-[#263a35]"
                      >
                        {moduleDone === module.chapters.length && module.chapters.length > 0 ? 'Review module' : 'Browse module'} <ArrowDownRight className="h-3.5 w-3.5" />
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
            <p className="text-[11px] font-bold uppercase tracking-[.16em] academy-accent">Learn by doing</p>
            <h2 className="mt-1 font-serif-title text-2xl font-bold tracking-tight">Practice with trade tools</h2>
            <p className="mt-2 text-xs leading-5 academy-muted">Use the calculators alongside your lessons to connect concepts with working estimates.</p>
            <div className="mt-4 space-y-2.5">
              {toolLinks.map(({ tab, title, description, icon: Icon }) => (
                <button key={tab} onClick={() => setActiveNavTab(tab)} className="academy-card academy-card-hover flex w-full items-center gap-3 p-3.5 text-left">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7eee2] text-[#9b622e]"><Icon className="h-4.5 w-4.5" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{title}</span><span className="mt-0.5 block text-[11px] leading-4 academy-muted">{description}</span></span>
                  <ArrowRight className="h-4 w-4 shrink-0 academy-muted" />
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#e7d7c1] bg-[#fff8ee] p-4 dark:border-[#5a4934] dark:bg-[#30291f]">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 h-2 w-2 rounded-full bg-[#b46d2e]" />
              <div><h3 className="text-xs font-bold text-[#664627] dark:text-[#edc995]">Practice, then verify</h3><p className="mt-1 text-[11px] leading-5 text-[#735f49] dark:text-[#cbbb9f]">Tool outputs are educational estimates. Verify current regulations and exchange rates with the relevant authorities and financial institutions.</p></div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
