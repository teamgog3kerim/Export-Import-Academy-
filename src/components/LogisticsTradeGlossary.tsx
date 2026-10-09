import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from '../data/glossaryData';
import { GlossaryTerm, GlossaryCategory } from '../types';
import { useApp } from '../context/AppContext';
import {
  Search,
  BookOpen,
  Filter,
  Copy,
  Check,
  Building2,
  FileText,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  HelpCircle,
  ExternalLink,
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onOpenChapter?: (chapterNumber: number) => void;
}

export const LogisticsTradeGlossary: React.FC<Props> = ({ onOpenChapter }) => {
  const { setSelectedChapterId, setActiveNavTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(GLOSSARY_TERMS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards');

  // Available initial letters for quick filter
  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    GLOSSARY_TERMS.forEach(t => {
      const first = t.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) letters.add(first);
    });
    return Array.from(letters).sort();
  }, []);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(term => {
      // 1. Category filter
      if (selectedCategory !== 'all' && term.category !== selectedCategory) {
        return false;
      }

      // 2. Letter filter
      if (selectedLetter !== 'all') {
        const first = term.term.charAt(0).toUpperCase();
        if (first !== selectedLetter) return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTerm = term.term.toLowerCase().includes(q);
        const matchesAcronym = term.acronym?.toLowerCase().includes(q);
        const matchesAmharic = term.amharicTerm?.toLowerCase().includes(q);
        const matchesShort = term.shortDefinition.toLowerCase().includes(q);
        const matchesDeep = term.inDepthExplanation.toLowerCase().includes(q);
        const matchesEx = term.ethiopianContextExample.toLowerCase().includes(q);
        const matchesTag = term.tags.some(t => t.toLowerCase().includes(q));

        if (!matchesTerm && !matchesAcronym && !matchesAmharic && !matchesShort && !matchesDeep && !matchesEx && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  const handleCopyDefinition = (term: GlossaryTerm) => {
    const textToCopy = `${term.term}${term.acronym ? ` (${term.acronym})` : ''}${term.amharicTerm ? ` - ${term.amharicTerm}` : ''}\n\nDefinition: ${term.shortDefinition}\n\nEthiopian Context: ${term.ethiopianContextExample}\n\nLegal Reference: ${term.proclamationRef || 'Ethiopian Foreign Trade Regulations'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleNavigateToChapter = (chapterNum: number) => {
    const targetId = `ch-${chapterNum}`;
    setSelectedChapterId(targetId);
    setActiveNavTab('curriculum');
    if (onOpenChapter) {
      onOpenChapter(chapterNum);
    }
  };

  const activeCategoryInfo = useMemo(() => {
    return GLOSSARY_CATEGORIES.find(c => c.id === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-neutral-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Reference Encyclopedia</span>
              </span>
              <span className="text-xs text-neutral-400">· {GLOSSARY_TERMS.length} Verified Ethiopian Trade Terms</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif-title font-bold text-white tracking-tight">
              Logistics & Foreign Trade Glossary
            </h2>
            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
              Standardized dictionary of Ethiopian maritime transit, commercial banking, customs valuation, and export regulatory terminology. Clarifies local statutory nuances from NBE directives, Customs Proclamation No. 859/2014, and ESLSE shipping operations.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/20 transition-all backdrop-blur-xs"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Print Glossary</span>
            </button>
          </div>
        </div>

        {/* Quick stat chips */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-neutral-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span><strong>{GLOSSARY_TERMS.length}</strong> Key Definitions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span><strong>{GLOSSARY_CATEGORIES.length}</strong> Specialized Domains</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Dual-language (English & Amharic terminology)</span>
          </div>
        </div>
      </div>

      {/* Search, Filter & Alphabet Navigator Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by English term, acronym (e.g. DPV, B/L, ESW), Amharic script (e.g. ቀረጥ, ማርጂን), or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl flex items-center text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Card View
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Compact List
              </button>
            </div>
            <span className="text-xs text-neutral-500 font-mono">
              {filteredTerms.length} Results
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-2xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            All Categories ({GLOSSARY_TERMS.length})
          </button>
          {GLOSSARY_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const count = GLOSSARY_TERMS.filter(t => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Alphabet quick jumps */}
        <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-2">
            A–Z Jump:
          </span>
          <button
            onClick={() => setSelectedLetter('all')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
              selectedLetter === 'all'
                ? 'bg-amber-600 text-white font-bold'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            ALL
          </button>
          {alphabet.map(letter => {
            const isSelected = selectedLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(isSelected ? 'all' : letter)}
                className={`w-6 h-6 rounded text-[11px] font-mono font-semibold flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Indicator Description */}
      {activeCategoryInfo && (
        <div className="px-4 py-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
          <span><strong>Category Focus:</strong> {activeCategoryInfo.description}</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-[11px] text-amber-700 dark:text-amber-400 underline font-semibold hover:text-amber-900 ml-4 shrink-0"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Zero State */}
      {filteredTerms.length === 0 && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-neutral-400 mx-auto" />
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            No Glossary Terms Found
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            No terms matched "{searchQuery}". Try searching for acronyms like "DPV", "ESLSE", "e-SAD", "L/C", or general terms like "Demurrage" or "Multimodal".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLetter('all');
            }}
            className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* CARDS VIEW */}
      {viewMode === 'cards' && filteredTerms.length > 0 && (
        <div className="space-y-4">
          {filteredTerms.map((term) => {
            const isExpanded = expandedTermId === term.id;
            const categoryBadge = GLOSSARY_CATEGORIES.find(c => c.id === term.category)?.badgeColor || 'bg-neutral-100 text-neutral-800';

            return (
              <div
                key={term.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl transition-all shadow-xs overflow-hidden"
              >
                {/* Header row */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {term.term}
                      </h3>

                      {term.acronym && (
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-amber-700 dark:text-amber-400 border border-neutral-200 dark:border-neutral-700">
                          {term.acronym}
                        </span>
                      )}

                      {term.amharicTerm && (
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 font-sans">
                          ({term.amharicTerm})
                        </span>
                      )}

                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${categoryBadge}`}>
                        {term.categoryLabel}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                      {term.shortDefinition}
                    </p>
                  </div>

                  {/* Actions on right */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleCopyDefinition(term)}
                      className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Copy full definition"
                    >
                      {copiedId === term.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {term.relatedChapterNumber && (
                      <button
                        onClick={() => handleNavigateToChapter(term.relatedChapterNumber!)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 transition-colors flex items-center gap-1.5 border border-amber-200/60 dark:border-amber-800/60"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        <span>Chapter {term.relatedChapterNumber}</span>
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedTermId(isExpanded ? null : term.id)}
                      className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand full explanation'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded In-Depth Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 bg-neutral-50 dark:bg-neutral-850 border-t border-neutral-100 dark:border-neutral-800/80 space-y-4 text-xs">
                    {/* Deep Explanation */}
                    <div className="space-y-1">
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 text-xs flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-amber-600" />
                        <span>Comprehensive Legal & Operational Mechanism:</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {term.inDepthExplanation}
                      </p>
                    </div>

                    {/* Ethiopian Context & Practical Example */}
                    <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200/80 dark:border-neutral-800 space-y-1.5">
                      <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Real Ethiopian Trade Case Application:</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                        {term.ethiopianContextExample}
                      </p>
                    </div>

                    {/* Footer citation, tags and chapter link */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px] text-neutral-500">
                      <div className="flex flex-wrap items-center gap-2">
                        {term.proclamationRef && (
                          <span className="flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300">
                            <Shield className="w-3 h-3 text-amber-600" />
                            <strong>Proclamation/Regulation:</strong> {term.proclamationRef}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-neutral-400">Tags:</span>
                        {term.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            onClick={() => setSearchQuery(tag)}
                            className="px-2 py-0.5 rounded bg-neutral-200/70 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[10px] cursor-pointer hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* COMPACT LIST VIEW */}
      {viewMode === 'compact' && filteredTerms.length > 0 && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                <th className="py-3 px-4">Term & Acronym</th>
                <th className="py-3 px-4">Amharic Equivalent</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Short Definition</th>
                <th className="py-3 px-4 text-right">Chapter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredTerms.map((term) => (
                <tr
                  key={term.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-850/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setViewMode('cards');
                    setExpandedTermId(term.id);
                  }}
                >
                  <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <span>{term.term}</span>
                      {term.acronym && (
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-amber-700 dark:text-amber-400 font-bold">
                          {term.acronym}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">
                    {term.amharicTerm || '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {term.categoryLabel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400 max-w-md truncate">
                    {term.shortDefinition}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {term.relatedChapterNumber ? (
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-400 text-[11px]">
                        Ch {term.relatedChapterNumber}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
