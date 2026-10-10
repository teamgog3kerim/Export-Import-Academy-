import React, { useState } from 'react';
import { RESOURCE_LIBRARY } from '../data/resourceData';
import { ResourceDocument } from '../types';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  BookOpen,
  Copy,
  Check,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
  FileSpreadsheet,
  X,
  ClipboardCheck,
  Compass,
  BookMarked,
  Scale
} from 'lucide-react';
import { LogisticsTradeGlossary } from './LogisticsTradeGlossary';

export const ResourceLibrary: React.FC = () => {
  const { setActiveNavTab, setSelectedChapterId } = useApp();
  const [resourceViewTab, setResourceViewTab] = useState<'documents' | 'glossary'>('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<ResourceDocument | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'regulation', label: 'Regulations & Directives' },
    { id: 'tariff', label: 'Tariffs & Customs Taxes' },
    { id: 'template', label: 'Excel Models & Templates' },
    { id: 'checklist', label: 'Checklists & Protocols' },
    { id: 'guideline', label: 'Corridor & Export SOPs' }
  ];

  const filteredDocs = RESOURCE_LIBRARY.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.keyHighlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyExcerpt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = (doc: ResourceDocument) => {
    const content = `=====================================================
${doc.title}
Authority: ${doc.authority}
Category: ${doc.category.toUpperCase()} | Format: ${doc.format}
=====================================================

DESCRIPTION:
${doc.description}

KEY REGULATORY HIGHLIGHTS:
${doc.keyHighlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

SAMPLE EXCERPT (NOT THE OFFICIAL SOURCE DOCUMENT):
-----------------------------------------------------
${doc.samplePreviewText}
-----------------------------------------------------

This reference summary is provided for educational trade study purposes.
Check current proclamations and directives directly with the respective issuing authorities.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_sample_summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    setDownloadSuccess(`Downloaded the sample text summary for "${doc.title}". It is not the official ${doc.format} document.`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  // Chapter mappings for quick navigation
  const getRelatedChapter = (docId: string): { id: string; num: number; title: string } | null => {
    switch (docId) {
      case 'res-01':
        return { id: 'ch-1', num: 1, title: 'Ecosystem & Market Mechanics' };
      case 'res-02':
        return { id: 'ch-10', num: 10, title: 'Duty Paying Value & Tax Stacking' };
      case 'res-03':
        return { id: 'ch-4', num: 4, title: 'LC Lifecycle & Opening Payments' };
      case 'res-04':
        return { id: 'ch-8', num: 8, title: 'Djibouti Corridor & Demurrage' };
      case 'res-05':
        return { id: 'ch-15', num: 15, title: 'Landed Cost Buildup Sheet' };
      case 'res-06':
        return { id: 'ch-3', num: 3, title: 'Ethiopian Single Window Masterclass' };
      case 'res-07':
        return { id: 'ch-13', num: 13, title: 'Coffee & Agro-Export Procedures' };
      case 'res-08':
        return { id: 'ch-12', num: 12, title: 'Customs Valuation Disputes & PCA' };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {downloadSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-neutral-700 animate-fade-in text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Shield className="w-4 h-4" />
            <span>Document Repository & Regulatory Compliance Toolkit</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Ethiopian Trade & Logistics Resource Library
          </h1>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Essential reference documents, proclamation excerpts, operational checklist templates, and regulatory guides for Ethiopian international trade practitioners.
          </p>
        </div>
      </div>

      {/* Top Resource Section Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <button
          onClick={() => setResourceViewTab('documents')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            resourceViewTab === 'documents'
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-500" />
          <span>Regulatory Documents & Directives</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
            resourceViewTab === 'documents'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
          }`}>
            {RESOURCE_LIBRARY.length}
          </span>
        </button>

        <button
          onClick={() => setResourceViewTab('glossary')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            resourceViewTab === 'glossary'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Logistics & Trade Glossary</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
            resourceViewTab === 'glossary'
              ? 'bg-white/20 text-white'
              : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
          }`}>
            30+ Terms
          </span>
        </button>

        <button
          onClick={() => setActiveNavTab('incoterms_guide')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800"
        >
          <Scale className="w-4 h-4 text-[#176b60]" />
          <span>Incoterms® 2020 Guide</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Interactive
          </span>
        </button>
      </div>

      {/* VIEW 1: REGULATORY DOCUMENTS & TEMPLATES */}
      {resourceViewTab === 'documents' ? (
        <>
          {/* Dynamic Export Document Checklist Generator Gateway */}
          <div className="bg-gradient-to-r from-amber-900/10 via-amber-800/10 to-stone-900/10 dark:from-amber-950/40 dark:via-stone-900/40 dark:to-neutral-900 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-white uppercase tracking-wider">
              Interactive Toolkit
            </span>
            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Need a Tailored Document Checklist for Your Export Commodity?
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Generate exact requirements for Coffee, Oilseeds, Meat, Cut Flowers, or Textiles across all 5 export phases (ECTALE cupping, Phytosanitary, e-SAD, EUR.1, and NBE retention).
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedChapterId('ch-13');
            setActiveNavTab('curriculum');
          }}
          className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-xs"
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Launch Checklist Generator</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by keyword, authority, proclamation, HS code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-neutral-500 font-mono shrink-0">
            Showing {filteredDocs.length} of {RESOURCE_LIBRARY.length} documents
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-2xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map(doc => {
          const relatedCh = getRelatedChapter(doc.id);

          return (
            <div
              key={doc.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-amber-700/40 dark:hover:border-amber-600/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                {/* Meta badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                    {doc.authority}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
                      {doc.format}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {doc.fileSize}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-serif-title font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2">
                  {doc.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                  {doc.description}
                </p>

                {/* Key Highlights */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Key Provisions Covered:
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {doc.keyHighlights.slice(0, 3).map((h, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons & Chapter Link */}
              <div className="space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                {relatedCh && (
                  <button
                    onClick={() => {
                      setSelectedChapterId(relatedCh.id);
                      setActiveNavTab('curriculum');
                    }}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Study in Chapter {relatedCh.num}: {relatedCh.title}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Preview</span>
                  </button>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-neutral-900 hover:bg-black dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white text-white transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download sample summary</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        </>
      ) : (
        /* VIEW 2: LOGISTICS & TRADE GLOSSARY */
        <LogisticsTradeGlossary
          onOpenChapter={(chapterNumber) => {
            setSelectedChapterId(`ch-${chapterNumber}`);
            setActiveNavTab('curriculum');
          }}
        />
      )}

      {/* Document Detail Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                  <span>{previewDoc.authority}</span>
                  <span>·</span>
                  <span>{previewDoc.format} ({previewDoc.fileSize})</span>
                </div>
                <h2 className="text-lg md:text-xl font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                  {previewDoc.title}
                </h2>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-700 dark:text-neutral-300">
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                  Regulatory Overview:
                </h4>
                <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {previewDoc.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  Key Legal Provisions & Guidelines:
                </h4>
                <ul className="space-y-1.5">
                  {previewDoc.keyHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                    Sample Document Preview & Text:
                  </h4>
                  <button
                    onClick={() => handleCopyExcerpt(previewDoc.samplePreviewText)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-neutral-800 dark:text-neutral-200 overflow-x-auto">
                  {previewDoc.samplePreviewText}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-between gap-3">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              >
                Close Preview
              </button>

              <button
                onClick={() => {
                  handleDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download sample text summary</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
