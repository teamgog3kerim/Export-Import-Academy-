import React, { useState } from 'react';
import {
  INCOTERMS_2020,
  SUPPLY_CHAIN_STAGES,
  INCOTERMS_CASE_STUDIES,
  ETHIOPIAN_REGULATORY_DIRECTIVES
} from '../data/incotermsData';
import {
  IncotermCode,
  IncotermDefinition,
  SupplyChainStageId
} from '../types';
import {
  Ship,
  Truck,
  Package,
  Building2,
  Anchor,
  Globe,
  ShieldCheck,
  Container,
  Coins,
  Warehouse,
  FileCheck,
  Check,
  AlertTriangle,
  ArrowRight,
  ArrowLeftRight,
  Copy,
  CheckCheck,
  Printer,
  Sparkles,
  Info,
  Scale,
  Compass,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Map icon string to Lucide component
const getStageIcon = (iconName: string) => {
  switch (iconName) {
    case 'Package': return Package;
    case 'Truck': return Truck;
    case 'FileCheck': return FileCheck;
    case 'Building2': return Building2;
    case 'Ship': return Ship;
    case 'Globe': return Globe;
    case 'ShieldCheck': return ShieldCheck;
    case 'Anchor': return Anchor;
    case 'Container': return Container;
    case 'Coins': return Coins;
    case 'Warehouse': return Warehouse;
    default: return Package;
  }
};

type ViewTab = 'explorer' | 'matrix' | 'compare' | 'wizard' | 'cases' | 'regulations';
type TradePerspective = 'import' | 'export';
type MatrixMode = 'cost' | 'risk' | 'both';

export const IncotermsGuide: React.FC = () => {
  const { setActiveNavTab, setSelectedChapterId, hasFullAccess, setShowPaywallModal } = useApp();

  const [activeTab, setActiveTab] = useState<ViewTab>('explorer');
  const [perspective, setPerspective] = useState<TradePerspective>('import');
  const [selectedTermCode, setSelectedTermCode] = useState<IncotermCode>('FOB');
  const [selectedStageId, setSelectedStageId] = useState<SupplyChainStageId | null>('loading');
  const [copiedClause, setCopiedClause] = useState<string | null>(null);

  // Matrix state
  const [matrixMode, setMatrixMode] = useState<MatrixMode>('cost');
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'any_mode' | 'sea_inland_waterway'>('all');
  const [highlightedStage, setHighlightedStage] = useState<SupplyChainStageId | null>(null);

  // Compare state
  const [compareTermA, setCompareTermA] = useState<IncotermCode>('FOB');
  const [compareTermB, setCompareTermB] = useState<IncotermCode>('CIF');

  // Wizard state
  const [wizardDirection, setWizardDirection] = useState<'import' | 'export'>('import');
  const [wizardMode, setWizardMode] = useState<'sea_container' | 'air_cargo' | 'multimodal_dryport' | 'bulk_vessel'>('sea_container');
  const [wizardCarrier, setWizardCarrier] = useState<'eslse' | 'seller_carrier'>('eslse');
  const [wizardInsurance, setWizardInsurance] = useState<'local_etb' | 'seller_foreign'>('local_etb');
  const [wizardCustoms, setWizardCustoms] = useState<'local_buyer_tin' | 'foreign_seller'>('local_buyer_tin');

  // Case study state
  const [activeCaseId, setActiveCaseId] = useState<string>(INCOTERMS_CASE_STUDIES[0].id);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const currentTerm = INCOTERMS_2020.find(t => t.code === selectedTermCode) || INCOTERMS_2020[0];
  const termA = INCOTERMS_2020.find(t => t.code === compareTermA) || INCOTERMS_2020[0];
  const termB = INCOTERMS_2020.find(t => t.code === compareTermB) || INCOTERMS_2020[2];
  const activeCase = INCOTERMS_CASE_STUDIES.find(c => c.id === activeCaseId) || INCOTERMS_CASE_STUDIES[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedClause(id);
    setTimeout(() => setCopiedClause(null), 2500);
  };

  const toggleSolution = (caseId: string) => {
    setRevealedSolutions(prev => ({ ...prev, [caseId]: !prev[caseId] }));
  };

  // Determine Wizard Recommendation
  const getWizardRecommendation = () => {
    if (wizardDirection === 'import') {
      if (wizardMode === 'sea_container' && wizardCarrier === 'eslse') {
        return {
          code: 'FOB',
          alt: 'FCA',
          title: 'FOB (Free on Board) - The Ethiopian Import Standard',
          reason: 'Matches Ethiopian Maritime Authority reservation policy and National Bank of Ethiopia L/C directives. Ocean freight is settled with ESLSE in Ethiopian Birr (ETB), conserving scarce foreign currency while goods move under a Combined Bill of Lading directly to Mojo Dry Port.',
          warning: 'Do not forget to procure mandatory local marine cargo insurance with an Ethiopian insurer in ETB before opening your Letter of Credit.',
          clause: 'Delivery Terms: FOB [Named Loading Port, e.g. Shanghai Port, China], Incoterms® 2020. Sea freight payable by Buyer in Addis Ababa to ESLSE in ETB.'
        };
      }
      if (wizardMode === 'air_cargo') {
        return {
          code: 'FCA',
          alt: 'CPT',
          title: 'FCA (Free Carrier) / CPT Bole Airport',
          reason: 'For air cargo via Ethiopian Airlines Cargo, FCA at origin airport or CPT Bole International Airport provides optimal risk and carriage clarity for non-maritime transport.',
          warning: 'Ensure origin airport handling (OTHC) is included in supplier quotes.',
          clause: 'Delivery Terms: FCA [Origin Airport, e.g. Dubai International Airport], Incoterms® 2020. Airfreight arranged via Ethiopian Airlines Cargo.'
        };
      }
      if (wizardCarrier === 'seller_carrier' && wizardInsurance === 'local_etb') {
        return {
          code: 'CFR',
          alt: 'CPT',
          title: 'CFR (Cost and Freight) Port of Djibouti',
          reason: 'Supplier pays international ocean freight to Djibouti, while the Ethiopian importer satisfies statutory NBE rules by procuring local marine insurance with Ethiopian Insurance Corporation (EIC) in ETB.',
          warning: 'CRITICAL REQUIREMENT: Commercial banks will require an ESLSE Shipping Waiver certificate before approving an import Letter of Credit on CFR terms.',
          clause: 'Delivery Terms: CFR Port of Djibouti (Doraleh), Incoterms® 2020. Marine Cargo Insurance covered locally by Buyer in Ethiopia. ESLSE waiver required.'
        };
      }
      if (wizardCarrier === 'seller_carrier' && wizardInsurance === 'seller_foreign') {
        return {
          code: 'CIF',
          alt: 'CIP',
          title: 'CIF (Cost, Insurance and Freight) Port of Djibouti',
          reason: 'Supplier handles both sea freight and marine transit insurance to Djibouti port.',
          warning: 'HIGH REGULATORY RISK: Commercial banks in Ethiopia will generally refuse foreign exchange permits for CIF unless explicit waivers from both the Ethiopian Maritime Authority and NBE are presented.',
          clause: 'Delivery Terms: CIF Port of Djibouti (Doraleh), Incoterms® 2020. Marine Insurance under Institute Cargo Clauses (A) All Risks.'
        };
      }
      if (wizardCustoms === 'foreign_seller') {
        return {
          code: 'DAP',
          alt: 'DPU',
          title: 'DAP (Delivered at Place) - NOT DDP!',
          reason: 'Foreign suppliers cannot legally clear customs in Ethiopia under DDP due to TIN and e-SW requirements. DAP allows the foreign supplier to deliver to the buyer site while the Ethiopian buyer handles customs clearance with their own trade license.',
          warning: 'Never agree to DDP for Ethiopian imports! Use DAP instead.',
          clause: 'Delivery Terms: DAP [Named Project Site / Warehouse, Addis Ababa], Incoterms® 2020. Import customs clearance and duties for Buyer account.'
        };
      }
      return {
        code: 'FOB',
        alt: 'FCA',
        title: 'FOB (Free on Board) / FCA',
        reason: 'Standard Ethiopian commercial banking baseline for sea transit via Djibouti.',
        warning: 'Verify ESLSE booking agent details before signing proforma invoice.',
        clause: 'Delivery Terms: FOB Port of Loading, Incoterms® 2020.'
      };
    } else {
      // Export direction
      if (wizardMode === 'sea_container' && wizardCarrier === 'seller_carrier') {
        return {
          code: 'FCA',
          alt: 'FOB',
          title: 'FCA Mojo Dry Port (Recommended for Ethiopian Exporters)',
          reason: 'Protects the Ethiopian exporter from transit hazards along the 900 km corridor to Djibouti. Risk transfers the instant the container is accepted at Mojo Dry Port by ESLSE or the Ethio-Djibouti Railway!',
          warning: 'If you quote FOB Djibouti, you bear 100% of the risk for train derailments, truck accidents, or rain damage on the road to Djibouti.',
          clause: 'Delivery Terms: FCA Mojo Dry Port Container Terminal, Ethiopia, Incoterms® 2020. Export customs cleared by Seller via Ethiopian e-SW.'
        };
      }
      if (wizardMode === 'air_cargo') {
        return {
          code: 'FCA',
          alt: 'CPT',
          title: 'FCA Bole International Airport (Addis Ababa)',
          reason: 'Standard for Ethiopian perishable exports (fresh cut roses, chilled meat, khat). Risk transfers when cargo is delivered to Ethiopian Airlines Cargo cold-chain terminal.',
          warning: 'Ensure phytosanitary inspection certificates and MoTRI export clearances are completed before handover.',
          clause: 'Delivery Terms: FCA Bole International Airport Cargo Terminal, Addis Ababa, Incoterms® 2020.'
        };
      }
      return {
        code: 'FOB',
        alt: 'FCA',
        title: 'FOB Port of Djibouti (Doraleh)',
        reason: 'The traditional contract term requested by international green coffee and sesame buyers. Exporter clears Ethiopian export customs and handles transport to Djibouti until goods cross the ship rail.',
        warning: 'Ensure transit cargo insurance covers the road/rail journey from Addis Ababa/Mojo to the port of Djibouti.',
        clause: 'Delivery Terms: FOB Port of Djibouti (Doraleh Container Terminal), Incoterms® 2020. Export permits and phytosanitary certificates for Seller account.'
      };
    }
  };

  const wizardRec = getWizardRecommendation();

  return (
    <div className="space-y-6 pb-12 academy-enter">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#124f49] via-[#176b60] to-[#0f3d38] p-6 sm:p-8 text-white shadow-lg">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-[#e6b57d]/10 blur-xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#f1d4a5] mb-3 backdrop-blur-xs">
              <Compass className="h-3.5 w-3.5" />
              <span>ICC Incoterms® 2020 Master Reference</span>
            </div>
            <h1 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Ethiopian Trade Corridor: Cost & Risk Responsibilities Guide
            </h1>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#d7e8e1]">
              A definitive interactive guide mapping all 11 Incoterms across the 11 stages of the Djibouti–Addis Ababa logistics corridor. 
              Master the critical points of risk transfer, ESLSE multimodal mandates, NBE foreign exchange rules, and statutory marine insurance in Ethiopia.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <span className="rounded-lg bg-white/15 px-3 py-1.5 font-medium text-emerald-100 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-300" /> All 11 Official Rules
              </span>
              <span className="rounded-lg bg-white/15 px-3 py-1.5 font-medium text-amber-100 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-300" /> NBE & ESLSE Compliant
              </span>
              <span className="rounded-lg bg-white/15 px-3 py-1.5 font-medium text-sky-100 flex items-center gap-1.5">
                <Anchor className="h-3.5 w-3.5 text-sky-300" /> Mojo Dry Port & Djibouti Focus
              </span>
            </div>
          </div>

          {/* Quick Stats Box */}
          <div className="shrink-0 rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="text-xs text-[#d7e8e1]">Primary Import Term</span>
              <span className="font-mono text-sm font-bold text-[#f1d4a5]">FOB Djibouti / Origin</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="text-xs text-[#d7e8e1]">Recommended Export Term</span>
              <span className="font-mono text-sm font-bold text-[#f1d4a5]">FCA Mojo / FOB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#d7e8e1]">Statutory Marine Insurance</span>
              <span className="font-mono text-xs font-bold text-emerald-300">Mandatory Local (ETB)</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/15 pt-5">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'explorer'
                ? 'bg-white text-[#176b60] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Compass className="h-3.5 w-3.5" /> Stage-by-Stage Explorer
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'matrix'
                ? 'bg-white text-[#176b60] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Scale className="h-3.5 w-3.5" /> Master Cost & Risk Matrix
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'compare'
                ? 'bg-white text-[#176b60] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ArrowLeftRight className="h-3.5 w-3.5" /> Side-by-Side Comparison
          </button>
          <button
            onClick={() => setActiveTab('wizard')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'wizard'
                ? 'bg-white text-[#176b60] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" /> Incoterm Decision Wizard
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'cases'
                ? 'bg-white text-[#176b60] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FileText className="h-3.5 w-3.5" /> Corridor Dispute Cases ({INCOTERMS_CASE_STUDIES.length})
          </button>
          <button
            onClick={() => setActiveTab('regulations')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'regulations'
                ? 'bg-white text-[#176b60] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Directives & Legal Rules
          </button>
        </div>
      </section>

      {/* Subscription Paywall Overlay if not full access */}
      {!hasFullAccess && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-900 dark:text-amber-100 uppercase tracking-wider">
                Full Academy Subscription Required
              </h3>
              <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                The Incoterms® 2020 11-stage corridor analysis, comparison matrix, decision wizard, and dispute case studies are reserved for full subscribers. Subscribe for 3,900 ETB (Promotional 60% Discount!).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPaywallModal(true)}
            className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Subscribe to Unlock (3,900 ETB)</span>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: STAGE-BY-STAGE EXPLORER                          */}
      {/* ======================================================== */}
      {activeTab === 'explorer' && (
        <div className="space-y-6 academy-enter">
          {/* Controls: Incoterm Selector + Perspective Switcher */}
          <div className="academy-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider academy-muted">Select Incoterms® 2020 Rule</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {INCOTERMS_2020.map(term => {
                  const isSelected = selectedTermCode === term.code;
                  return (
                    <button
                      key={term.code}
                      onClick={() => setSelectedTermCode(term.code)}
                      className={`relative px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                        isSelected
                          ? 'bg-[#176b60] text-white shadow-md ring-2 ring-[#176b60]/30 scale-105'
                          : 'bg-[var(--canvas)] hover:bg-[var(--line)] text-[var(--ink)]'
                      }`}
                    >
                      {term.code}
                      {term.splitRiskAndCost && (
                        <span className="ml-1 text-[9px] px-1 rounded bg-amber-400 text-amber-950 font-sans" title="Split Risk and Cost point">⚡</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3 border-t md:border-t-0 md:border-l academy-line pt-3 md:pt-0 md:pl-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider academy-muted block">Trade Perspective</span>
                <div className="mt-1.5 inline-flex rounded-xl bg-[var(--canvas)] p-1 border academy-line">
                  <button
                    onClick={() => setPerspective('import')}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                      perspective === 'import'
                        ? 'bg-[var(--paper)] text-[#176b60] shadow-xs'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    Import into Ethiopia
                  </button>
                  <button
                    onClick={() => setPerspective('export')}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                      perspective === 'export'
                        ? 'bg-[var(--paper)] text-[#176b60] shadow-xs'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    Export from Ethiopia
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Incoterm Highlight Summary Banner */}
          <div className="academy-card p-5 sm:p-6 border-l-4 border-l-[#176b60] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#176b60] dark:text-[#8bc9b8]">
                    {currentTerm.code}
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-serif-title text-[var(--ink)]">
                    — {currentTerm.name}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--canvas)] text-[var(--muted)] border academy-line">
                    {currentTerm.amharicName}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--muted)] font-medium">
                  Category:{' '}
                  <span className="font-semibold text-[var(--ink)]">
                    {currentTerm.category === 'any_mode' ? 'Any Mode of Transport (Multimodal)' : 'Sea and Inland Waterway Only'}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  currentTerm.ethiopianStatus === 'standard_import'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200'
                    : currentTerm.ethiopianStatus === 'recommended_export'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200'
                    : currentTerm.ethiopianStatus === 'conditional_waiver'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200'
                }`}>
                  {currentTerm.ethiopianStatusLabel}
                </span>

                {currentTerm.splitRiskAndCost && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                    <AlertTriangle className="h-3 w-3" /> Split Risk vs Cost
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[var(--ink)]">
              {currentTerm.summary}
            </p>

            {/* Crucial Milestone Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-sky-200 bg-sky-50/70 dark:border-sky-900/60 dark:bg-sky-950/30 p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Point of Risk Transfer (Loss / Damage)
                </span>
                <p className="mt-1 text-xs font-medium text-sky-950 dark:text-sky-100">
                  {currentTerm.riskTransferPoint}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/30 p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5" /> Point of Cost Transfer (Who Pays What)
                </span>
                <p className="mt-1 text-xs font-medium text-emerald-950 dark:text-emerald-100">
                  {currentTerm.costTransferPoint}
                </p>
              </div>
            </div>

            {currentTerm.splitRiskAndCost && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 p-3 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <strong>Critical Ethiopian Commercial Distinction:</strong> In {currentTerm.code}, the risk transfer point and cost transfer point are physically different! The seller pays carriage/freight up to destination, but the buyer bears the risk of loss or physical damage during transit starting at the departure port. If cargo is lost at sea, the buyer must claim under insurance, NOT withhold payment from the seller!
                </div>
              </div>
            )}
          </div>

          {/* Interactive 11-Stage Supply Chain Pipeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-serif-title">
                  Supply Chain Pipeline: Who Pays & Who Bears Risk ({currentTerm.code})
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  Click on any stage to inspect specific Ethiopian corridor practices, bill of lading requirements, and risks.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" /> Seller Pays
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-sky-500 inline-block" /> Buyer Pays
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SUPPLY_CHAIN_STAGES.map((stage) => {
                const resp = currentTerm.stageResponsibilities[stage.id];
                const IconComponent = getStageIcon(stage.iconName);
                const isSelected = selectedStageId === stage.id;

                const isSellerCost = resp.cost === 'seller';
                const isBuyerCost = resp.cost === 'buyer';
                const isSellerRisk = resp.risk === 'seller';
                const isBuyerRisk = resp.risk === 'buyer';

                return (
                  <div
                    key={stage.id}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? 'border-[#176b60] ring-2 ring-[#176b60]/20 bg-[var(--paper)] shadow-md'
                        : 'academy-card hover:border-[var(--line)] hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--canvas)] text-[#176b60] dark:text-[#8bc9b8]">
                          <IconComponent className="h-4 w-4" />
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider academy-muted">
                            Stage {stage.stepNumber}
                          </span>
                          <h4 className="text-xs font-bold leading-tight line-clamp-1">
                            {stage.shortTitle}
                          </h4>
                        </div>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-[var(--canvas)] text-[var(--muted)] shrink-0">
                        {stage.location.split('/')[0]}
                      </span>
                    </div>

                    <p className="mt-2.5 text-[11px] text-[var(--muted)] line-clamp-2">
                      {resp.notes}
                    </p>

                    {/* Status Badges */}
                    <div className="mt-3.5 pt-3 border-t academy-line flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold academy-muted">Cost:</span>
                        <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                          isSellerCost
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : isBuyerCost
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                        }`}>
                          {resp.cost.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold academy-muted">Risk:</span>
                        <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                          isSellerRisk
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300'
                        }`}>
                          {resp.risk.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Stage Deep-Dive Drawer / Box */}
          {selectedStageId && (
            <div className="academy-card p-5 sm:p-6 bg-gradient-to-br from-[var(--paper)] to-[var(--canvas)] border-[#176b60]/40 shadow-sm space-y-4">
              {(() => {
                const stage = SUPPLY_CHAIN_STAGES.find(s => s.id === selectedStageId)!;
                const resp = currentTerm.stageResponsibilities[selectedStageId];
                const IconComponent = getStageIcon(stage.iconName);

                return (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b academy-line pb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#176b60]/10 text-[#176b60] dark:text-[#8bc9b8]">
                          <IconComponent className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#176b60]">Stage {stage.stepNumber} of 11</span>
                            <span className="text-xs text-[var(--muted)]">·</span>
                            <span className="text-xs text-[var(--muted)]">{stage.location}</span>
                          </div>
                          <h3 className="text-lg font-bold font-serif-title">{stage.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 rounded-xl border academy-line bg-[var(--paper)] text-xs">
                          <span className="academy-muted font-bold mr-1.5">Cost Borne By:</span>
                          <strong className={resp.cost === 'seller' ? 'text-emerald-700 dark:text-emerald-400' : 'text-sky-700 dark:text-sky-400'}>
                            {resp.cost.toUpperCase()}
                          </strong>
                        </div>
                        <div className="px-3 py-1.5 rounded-xl border academy-line bg-[var(--paper)] text-xs">
                          <span className="academy-muted font-bold mr-1.5">Risk Borne By:</span>
                          <strong className={resp.risk === 'seller' ? 'text-emerald-700 dark:text-emerald-400' : 'text-sky-700 dark:text-sky-400'}>
                            {resp.risk.toUpperCase()}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider academy-muted">Global ICC 2020 Standard</h4>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--ink)]">
                          {stage.description}
                        </p>

                        <div className="mt-3 p-3 rounded-xl bg-[var(--canvas)] text-xs border academy-line">
                          <strong className="text-[var(--ink)] block mb-1">Contractual Rule for {currentTerm.code}:</strong>
                          <span className="text-[var(--muted)]">{resp.notes}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#b46d2e] dark:text-[#e6b57d] flex items-center gap-1.5">
                          <Anchor className="h-3.5 w-3.5" /> Ethiopian Corridor Practical Reality
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--ink)] bg-[#fff8ee] dark:bg-[#30291f] p-3 rounded-xl border border-[#e8d6be] dark:border-[#574633]">
                          {stage.ethiopianCorridorDetail}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Deep Ethiopian Directives, Pros/Cons & Contract Clause Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Ethiopian Directives & Practical Advice */}
            <div className="academy-card p-5 sm:p-6 space-y-4">
              <h3 className="text-base font-bold font-serif-title flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#176b60]" />
                Ethiopian Banking & Legal Directives ({currentTerm.code})
              </h3>
              <p className="text-xs leading-relaxed text-[var(--muted)]">
                {currentTerm.ethiopiaRegulationNotes}
              </p>

              <div className="pt-2 border-t academy-line space-y-2">
                <span className="text-xs font-bold text-[var(--ink)] block">Practical Advice for Trade Contracts:</span>
                <ul className="space-y-1.5 text-xs text-[var(--muted)]">
                  {currentTerm.ethiopianPracticalAdvice.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-[#176b60] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real World Scenario */}
              <div className="rounded-xl bg-[var(--canvas)] p-3.5 border academy-line text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--ink)]">
                    Real Scenario: {currentTerm.exampleScenario.commodity}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--paper)] font-bold text-[#176b60]">
                    {currentTerm.exampleScenario.direction.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[var(--muted)]">Route: {currentTerm.exampleScenario.route}</p>
                <p className="text-xs text-[var(--ink)] leading-relaxed">{currentTerm.exampleScenario.breakdown}</p>
              </div>
            </div>

            {/* Right: Pros, Cons & Proforma Invoice Clause */}
            <div className="academy-card p-5 sm:p-6 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold font-serif-title flex items-center gap-2">
                  <Scale className="h-4 w-4 text-[#b46d2e]" />
                  Advantages & Commercial Risks ({currentTerm.code})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 p-3 border border-emerald-200 dark:border-emerald-900/60">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1 mb-2">
                      <Check className="h-3.5 w-3.5" /> Advantages
                    </span>
                    <ul className="space-y-1 text-[11px] text-emerald-950 dark:text-emerald-200 leading-tight">
                      {currentTerm.advantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-rose-50/60 dark:bg-rose-950/30 p-3 border border-rose-200 dark:border-rose-900/60">
                    <span className="text-xs font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1 mb-2">
                      <AlertTriangle className="h-3.5 w-3.5" /> Drawbacks & Risks
                    </span>
                    <ul className="space-y-1 text-[11px] text-rose-950 dark:text-rose-200 leading-tight">
                      {currentTerm.disadvantages.map((dis, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{dis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ready-to-use Contract / Proforma Invoice Clause */}
              <div className="mt-4 rounded-xl border border-dashed border-[#176b60] bg-[#176b60]/5 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#176b60]">
                    Recommended Proforma Invoice Clause
                  </span>
                  <button
                    onClick={() => handleCopy(currentTerm.proformaClauseExample, currentTerm.code)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#176b60] hover:underline"
                  >
                    {copiedClause === currentTerm.code ? (
                      <>
                        <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Clause
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-xs whitespace-pre-wrap rounded-lg bg-[var(--paper)] p-3 border academy-line text-[var(--ink)]">
                  {currentTerm.proformaClauseExample}
                </pre>
                <p className="text-[10px] text-[var(--muted)]">
                  Insert this exact text on proforma invoices to ensure seamless Commercial Bank of Ethiopia (CBE) and private bank L/C foreign exchange clearance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MASTER COST & RISK MATRIX                         */}
      {/* ======================================================== */}
      {activeTab === 'matrix' && (
        <div className="space-y-5 academy-enter">
          <div className="academy-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold font-serif-title">
                Master 11 Incoterms Responsibility Matrix (ICC 2020)
              </h2>
              <p className="text-xs text-[var(--muted)]">
                Cross-comparison of cost and risk allocations across all supply chain stages in Ethiopian trade.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl bg-[var(--canvas)] p-1 border academy-line text-xs font-semibold">
                <button
                  onClick={() => setMatrixMode('cost')}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    matrixMode === 'cost' ? 'bg-[var(--paper)] text-[#176b60] shadow-xs' : 'text-[var(--muted)]'
                  }`}
                >
                  Cost (Who Pays)
                </button>
                <button
                  onClick={() => setMatrixMode('risk')}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    matrixMode === 'risk' ? 'bg-[var(--paper)] text-[#176b60] shadow-xs' : 'text-[var(--muted)]'
                  }`}
                >
                  Risk (Who Bears Loss)
                </button>
                <button
                  onClick={() => setMatrixMode('both')}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    matrixMode === 'both' ? 'bg-[var(--paper)] text-[#176b60] shadow-xs' : 'text-[var(--muted)]'
                  }`}
                >
                  Both (Cost/Risk)
                </button>
              </div>

              <select
                value={matrixFilter}
                onChange={(e) => setMatrixFilter(e.target.value as any)}
                className="rounded-xl border academy-line bg-[var(--paper)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)]"
              >
                <option value="all">All 11 Incoterms</option>
                <option value="any_mode">Multimodal (Any Mode) Only</option>
                <option value="sea_inland_waterway">Sea / Inland Waterway Only</option>
              </select>
            </div>
          </div>

          {/* Color Key Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs px-2">
            <span className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded bg-emerald-500 inline-block text-center text-[9px] font-bold text-white leading-3.5">S</span>
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">Seller Responsible</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded bg-sky-500 inline-block text-center text-[9px] font-bold text-white leading-3.5">B</span>
              <span className="font-semibold text-sky-800 dark:text-sky-300">Buyer Responsible</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded bg-amber-500 inline-block text-center text-[9px] font-bold text-white leading-3.5">⚡</span>
              <span className="font-semibold text-amber-800 dark:text-amber-300">Split Risk vs Cost Transfer</span>
            </span>
          </div>

          {/* Master Responsive Table */}
          <div className="academy-card overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[980px]">
                <thead>
                  <tr className="bg-[var(--canvas)] border-b academy-line text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                    <th className="p-3 sticky left-0 bg-[var(--canvas)] z-10 w-28 border-r academy-line">
                      Incoterm
                    </th>
                    {SUPPLY_CHAIN_STAGES.map(stage => (
                      <th
                        key={stage.id}
                        onMouseEnter={() => setHighlightedStage(stage.id)}
                        onMouseLeave={() => setHighlightedStage(null)}
                        className={`p-2.5 text-center transition-colors min-w-[78px] ${
                          highlightedStage === stage.id ? 'bg-[#176b60]/10 text-[#176b60]' : ''
                        }`}
                        title={stage.title}
                      >
                        <div className="font-mono text-[10px] text-[var(--muted)]">#{stage.stepNumber}</div>
                        <div className="truncate max-w-[72px]">{stage.shortTitle}</div>
                      </th>
                    ))}
                    <th className="p-3 text-center">Status in Ethiopia</th>
                  </tr>
                </thead>
                <tbody className="divide-y academy-line">
                  {INCOTERMS_2020
                    .filter(term => matrixFilter === 'all' || term.category === matrixFilter)
                    .map(term => {
                      const isSelected = selectedTermCode === term.code;

                      return (
                        <tr
                          key={term.code}
                          onClick={() => {
                            setSelectedTermCode(term.code);
                            setActiveTab('explorer');
                          }}
                          className={`hover:bg-[var(--canvas)] cursor-pointer transition ${
                            isSelected ? 'bg-[#176b60]/5 font-bold' : ''
                          }`}
                        >
                          <td className="p-3 sticky left-0 bg-[var(--paper)] hover:bg-[var(--canvas)] border-r academy-line font-mono font-extrabold text-[13px] text-[#176b60] dark:text-[#8bc9b8]">
                            <div className="flex items-center gap-1.5">
                              <span>{term.code}</span>
                              {term.splitRiskAndCost && (
                                <span className="text-[10px] px-1 py-0.2 rounded bg-amber-400 text-amber-950" title="Split point">⚡</span>
                              )}
                            </div>
                            <span className="text-[10px] font-sans font-normal text-[var(--muted)] block truncate max-w-[90px]">
                              {term.name}
                            </span>
                          </td>

                          {SUPPLY_CHAIN_STAGES.map(stage => {
                            const resp = term.stageResponsibilities[stage.id];
                            const isCostSeller = resp.cost === 'seller';
                            const isRiskSeller = resp.risk === 'seller';

                            return (
                              <td
                                key={stage.id}
                                className={`p-2 text-center text-xs font-bold border-r academy-line ${
                                  highlightedStage === stage.id ? 'bg-[var(--canvas)]' : ''
                                }`}
                              >
                                {matrixMode === 'cost' && (
                                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono ${
                                    isCostSeller
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                                  }`}>
                                    {isCostSeller ? 'S' : 'B'}
                                  </span>
                                )}

                                {matrixMode === 'risk' && (
                                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono ${
                                    isRiskSeller
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                                  }`}>
                                    {isRiskSeller ? 'S' : 'B'}
                                  </span>
                                )}

                                {matrixMode === 'both' && (
                                  <div className="flex items-center justify-center gap-0.5 text-[10px] font-mono">
                                    <span className={`px-1 rounded ${
                                      isCostSeller ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                                    }`}>
                                      {isCostSeller ? 'S' : 'B'}
                                    </span>
                                    <span>/</span>
                                    <span className={`px-1 rounded ${
                                      isRiskSeller ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                                    }`}>
                                      {isRiskSeller ? 'S' : 'B'}
                                    </span>
                                  </div>
                                )}
                              </td>
                            );
                          })}

                          <td className="p-3 text-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                              term.ethiopianStatus === 'standard_import'
                                ? 'bg-emerald-100 text-emerald-800'
                                : term.ethiopianStatus === 'recommended_export'
                                ? 'bg-blue-100 text-blue-800'
                                : term.ethiopianStatus === 'conditional_waiver'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {term.ethiopianStatusLabel.split('/')[0]}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div className="bg-[var(--canvas)] p-3 border-t academy-line text-[11px] text-[var(--muted)] flex items-center justify-between">
              <span>Tip: Click on any row to open the complete deep dive and proforma contract clause for that term.</span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1 font-bold text-[#176b60] hover:underline"
              >
                <Printer className="h-3.5 w-3.5" /> Print Cheat Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: SIDE-BY-SIDE COMPARISON                          */}
      {/* ======================================================== */}
      {activeTab === 'compare' && (
        <div className="space-y-6 academy-enter">
          <div className="academy-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold font-serif-title">
                Compare Any Two Incoterms (Head-to-Head)
              </h2>
              <p className="text-xs text-[var(--muted)]">
                Examine differences in risk transfer, ocean freight obligations, and Ethiopian banking compliance.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={compareTermA}
                onChange={(e) => setCompareTermA(e.target.value as IncotermCode)}
                className="rounded-xl border academy-line bg-[var(--paper)] px-3 py-1.5 text-xs font-mono font-bold text-[#176b60]"
              >
                {INCOTERMS_2020.map(t => (
                  <option key={t.code} value={t.code}>{t.code} ({t.name})</option>
                ))}
              </select>

              <span className="text-xs font-bold font-mono academy-muted">VS</span>

              <select
                value={compareTermB}
                onChange={(e) => setCompareTermB(e.target.value as IncotermCode)}
                className="rounded-xl border academy-line bg-[var(--paper)] px-3 py-1.5 text-xs font-mono font-bold text-[#b46d2e]"
              >
                {INCOTERMS_2020.map(t => (
                  <option key={t.code} value={t.code}>{t.code} ({t.name})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Comparison Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Term A Card */}
            <div className="academy-card p-5 border-t-4 border-t-[#176b60] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-2xl font-black text-[#176b60]">{termA.code}</span>
                  <h3 className="font-serif-title text-base font-bold">{termA.name}</h3>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#176b60]/10 text-[#176b60]">
                  {termA.category === 'any_mode' ? 'Multimodal' : 'Maritime Sea Only'}
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{termA.summary}</p>
              
              <div className="space-y-1.5 text-xs pt-2 border-t academy-line">
                <div><strong>Risk Transfer:</strong> <span className="text-[var(--muted)]">{termA.riskTransferPoint}</span></div>
                <div><strong>Cost Transfer:</strong> <span className="text-[var(--muted)]">{termA.costTransferPoint}</span></div>
                <div><strong>Insurance:</strong> <span className="text-[var(--muted)]">{termA.insuranceRequirement}</span></div>
                <div><strong>ESLSE Role:</strong> <span className="text-[var(--muted)]">{termA.eslseRelevance}</span></div>
              </div>
            </div>

            {/* Term B Card */}
            <div className="academy-card p-5 border-t-4 border-t-[#b46d2e] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-2xl font-black text-[#b46d2e]">{termB.code}</span>
                  <h3 className="font-serif-title text-base font-bold">{termB.name}</h3>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#b46d2e]/10 text-[#b46d2e]">
                  {termB.category === 'any_mode' ? 'Multimodal' : 'Maritime Sea Only'}
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{termB.summary}</p>
              
              <div className="space-y-1.5 text-xs pt-2 border-t academy-line">
                <div><strong>Risk Transfer:</strong> <span className="text-[var(--muted)]">{termB.riskTransferPoint}</span></div>
                <div><strong>Cost Transfer:</strong> <span className="text-[var(--muted)]">{termB.costTransferPoint}</span></div>
                <div><strong>Insurance:</strong> <span className="text-[var(--muted)]">{termB.insuranceRequirement}</span></div>
                <div><strong>ESLSE Role:</strong> <span className="text-[var(--muted)]">{termB.eslseRelevance}</span></div>
              </div>
            </div>
          </div>

          {/* Stage-by-Stage Comparison Rows */}
          <div className="academy-card overflow-hidden">
            <div className="bg-[var(--canvas)] p-3 border-b academy-line font-bold text-xs uppercase tracking-wider">
              Stage-by-Stage Cost Division Comparison
            </div>
            <div className="divide-y academy-line">
              {SUPPLY_CHAIN_STAGES.map(stage => {
                const aResp = termA.stageResponsibilities[stage.id];
                const bResp = termB.stageResponsibilities[stage.id];
                const isDifferent = aResp.cost !== bResp.cost || aResp.risk !== bResp.risk;

                return (
                  <div
                    key={stage.id}
                    className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      isDifferent ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''
                    }`}
                  >
                    <div className="sm:w-1/3">
                      <span className="font-mono text-[10px] text-[var(--muted)]">Stage {stage.stepNumber}</span>
                      <h4 className="font-bold">{stage.title}</h4>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start gap-6 sm:w-2/3">
                      {/* Term A Result */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#176b60]">{termA.code}:</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          aResp.cost === 'seller' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                        }`}>
                          Cost: {aResp.cost.toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          aResp.risk === 'seller' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                        }`}>
                          Risk: {aResp.risk.toUpperCase()}
                        </span>
                      </div>

                      {/* Term B Result */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#b46d2e]">{termB.code}:</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          bResp.cost === 'seller' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                        }`}>
                          Cost: {bResp.cost.toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          bResp.risk === 'seller' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                        }`}>
                          Risk: {bResp.risk.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: DECISION ADVISOR WIZARD                           */}
      {/* ======================================================== */}
      {activeTab === 'wizard' && (
        <div className="space-y-6 academy-enter">
          <div className="academy-card p-5 sm:p-6 border-l-4 border-l-[#176b60]">
            <h2 className="text-lg font-bold font-serif-title flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#b46d2e]" />
              Incoterm Selection Advisor for Ethiopian Deals
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
              Answer 5 operational questions about your upcoming transaction to generate the legally compliant Incoterm, exact proforma invoice clause, and commercial bank checklist.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Questions (7 Cols) */}
            <div className="lg:col-span-7 academy-card p-5 sm:p-6 space-y-5">
              {/* Question 1: Direction */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider academy-muted block mb-2">
                  1. Trade Flow Direction
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setWizardDirection('import')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardDirection === 'import'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    🚢 Import into Ethiopia
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Purchasing from overseas</span>
                  </button>
                  <button
                    onClick={() => setWizardDirection('export')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardDirection === 'export'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    🌍 Export from Ethiopia
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Selling coffee, oilseeds, etc.</span>
                  </button>
                </div>
              </div>

              {/* Question 2: Mode */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider academy-muted block mb-2">
                  2. Transport Mode & Logistics Gateway
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setWizardMode('sea_container')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardMode === 'sea_container'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    🌊 Sea Container (via Port of Djibouti)
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Standard FCL/LCL ocean freight</span>
                  </button>
                  <button
                    onClick={() => setWizardMode('air_cargo')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardMode === 'air_cargo'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    ✈️ Airfreight (Bole Airport)
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">High value, urgent, perishables</span>
                  </button>
                </div>
              </div>

              {/* Question 3: Carrier Booking */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider academy-muted block mb-2">
                  3. Ocean Carriage & Freight Booking
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setWizardCarrier('eslse')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardCarrier === 'eslse'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    🇪🇹 ESLSE Booking (Pay in ETB)
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Standard bank mandate in Ethiopia</span>
                  </button>
                  <button
                    onClick={() => setWizardCarrier('seller_carrier')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardCarrier === 'seller_carrier'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    🌐 Foreign Carrier (Supplier pays freight)
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Requires ESLSE shipping waiver!</span>
                  </button>
                </div>
              </div>

              {/* Question 4: Marine Insurance */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider academy-muted block mb-2">
                  4. Marine / Transit Insurance Policy
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setWizardInsurance('local_etb')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardInsurance === 'local_etb'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    🛡️ Domestic Insurer (EIC, Awash, Nyala)
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Statutory requirement in ETB</span>
                  </button>
                  <button
                    onClick={() => setWizardInsurance('seller_foreign')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardInsurance === 'seller_foreign'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    🌍 Foreign Policy by Seller
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Under CIF / CIP clauses</span>
                  </button>
                </div>
              </div>

              {/* Question 5: Customs Clearance in Ethiopia */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider academy-muted block mb-2">
                  5. Destination Customs Clearance Registration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setWizardCustoms('local_buyer_tin')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardCustoms === 'local_buyer_tin'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    🏢 Ethiopian Buyer TIN & e-SW License
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Standard legal Importer of Record</span>
                  </button>
                  <button
                    onClick={() => setWizardCustoms('foreign_seller')}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      wizardCustoms === 'foreign_seller'
                        ? 'border-[#176b60] bg-[#176b60]/10 text-[#176b60]'
                        : 'academy-line hover:bg-[var(--canvas)]'
                    }`}
                  >
                    ❓ Supplier Proposed "Door-to-Door Duty Paid"
                    <span className="block text-[10px] font-normal text-[var(--muted)] mt-0.5">Checking DDP feasibility</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Recommendation Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="academy-card p-5 sm:p-6 bg-gradient-to-br from-[var(--paper)] to-[#176b60]/5 border-[#176b60] shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#176b60] flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Tailored Recommendation
                  </span>
                  <span className="font-mono text-2xl font-black text-[#176b60]">
                    {wizardRec.code}
                  </span>
                </div>

                <h3 className="font-serif-title text-lg font-bold text-[var(--ink)]">
                  {wizardRec.title}
                </h3>

                <p className="text-xs leading-relaxed text-[var(--ink)]">
                  {wizardRec.reason}
                </p>

                <div className="rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 p-3 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>{wizardRec.warning}</span>
                </div>

                {/* Proforma Clause */}
                <div className="pt-2 border-t academy-line space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase academy-muted">Recommended Proforma Invoice Text:</span>
                    <button
                      onClick={() => handleCopy(wizardRec.clause, 'wizard')}
                      className="text-xs font-bold text-[#176b60] hover:underline inline-flex items-center gap-1"
                    >
                      {copiedClause === 'wizard' ? <CheckCheck className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />} Copy
                    </button>
                  </div>
                  <pre className="font-mono text-xs p-3 rounded-lg bg-[var(--canvas)] text-[var(--ink)] whitespace-pre-wrap border academy-line">
                    {wizardRec.clause}
                  </pre>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedTermCode(wizardRec.code as IncotermCode);
                      setActiveTab('explorer');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#176b60] hover:bg-[#124f49] text-white text-xs font-bold transition shadow-xs"
                  >
                    Inspect Full Pipeline for {wizardRec.code} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: CORRIDOR DISPUTE CASE STUDIES                     */}
      {/* ======================================================== */}
      {activeTab === 'cases' && (
        <div className="space-y-6 academy-enter">
          <div className="academy-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold font-serif-title">
                Real-World Ethiopian Corridor Dispute Case Studies
              </h2>
              <p className="text-xs text-[var(--muted)]">
                Learn from actual maritime and railway disputes involving Doraleh container terminal demurrage, rain damage, and local tax impasses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Case List Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-2">
              {INCOTERMS_CASE_STUDIES.map((c) => {
                const isSelected = activeCaseId === c.id;

                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCaseId(c.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition ${
                      isSelected
                        ? 'border-[#176b60] bg-[#176b60]/5 shadow-xs ring-1 ring-[#176b60]'
                        : 'academy-card hover:bg-[var(--canvas)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#176b60]">
                        Term: {c.termInvolved}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--canvas)] academy-muted">
                        {c.direction.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="mt-1 text-xs font-bold font-serif-title leading-snug line-clamp-2">
                      {c.title}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Case Study Detail (8 cols) */}
            <div className="lg:col-span-8 academy-card p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b academy-line pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#176b60]">
                    Incoterm Dispute Analysis ({activeCase.termInvolved})
                  </span>
                  <h3 className="text-lg font-bold font-serif-title mt-0.5">{activeCase.title}</h3>
                  <p className="text-xs text-[var(--muted)]">{activeCase.subtitle}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {activeCase.direction === 'import' ? 'Import Corridor' : 'Export Corridor'}
                </span>
              </div>

              {/* Facts / Background */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider academy-muted">The Commercial Facts</h4>
                <p className="mt-1 text-xs leading-relaxed text-[var(--ink)]">
                  {activeCase.background}
                </p>
              </div>

              {/* The Dispute */}
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/30 p-3.5 space-y-1">
                <span className="text-xs font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" /> The Core Dispute
                </span>
                <p className="text-xs text-rose-950 dark:text-rose-200 leading-relaxed">
                  {activeCase.theDispute}
                </p>
              </div>

              {/* The Question */}
              <div className="rounded-xl bg-[var(--canvas)] p-3.5 border academy-line text-xs font-medium">
                <strong className="text-[var(--ink)] block mb-1">Legal Question:</strong>
                <p className="text-[var(--muted)]">{activeCase.keyQuestion}</p>
              </div>

              {/* Reveal Solution Button */}
              <div>
                <button
                  onClick={() => toggleSolution(activeCase.id)}
                  className="px-4 py-2 rounded-xl bg-[#176b60] hover:bg-[#124f49] text-white text-xs font-bold transition flex items-center gap-2"
                >
                  <Scale className="h-3.5 w-3.5" />
                  {revealedSolutions[activeCase.id] ? 'Hide Legal Ruling' : 'Reveal Ruling & Responsibility'}
                </button>
              </div>

              {/* Ruling & Takeaway */}
              {revealedSolutions[activeCase.id] && (
                <div className="space-y-3 pt-2 academy-enter">
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40 p-4 space-y-1">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Legal Ruling under ICC Incoterms® 2020 & Ethiopian Commercial Law
                    </span>
                    <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed">
                      {activeCase.legalRuling}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#b46d2e]/40 bg-[#fff8ee] dark:bg-[#30291f] p-4 space-y-1">
                    <span className="text-xs font-bold text-[#b46d2e] dark:text-[#e6b57d] flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" /> Key Takeaway for Ethiopian Practitioners
                    </span>
                    <p className="text-xs text-[var(--ink)] leading-relaxed">
                      {activeCase.practicalTakeaway}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: ETHIOPIAN REGULATORY DIRECTIVES                   */}
      {/* ======================================================== */}
      {activeTab === 'regulations' && (
        <div className="space-y-6 academy-enter">
          <div className="academy-card p-5 sm:p-6 border-l-4 border-l-[#176b60]">
            <h2 className="text-lg font-bold font-serif-title flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#176b60]" />
              Ethiopian Statutory Framework Governing Incoterms
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
              While Incoterms® are international rules established by the International Chamber of Commerce (ICC), domestic Ethiopian foreign exchange directives and shipping laws impose strict conditions on which terms commercial banks can approve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ETHIOPIAN_REGULATORY_DIRECTIVES.map((dir, idx) => (
              <div key={idx} className="academy-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif-title text-sm font-bold text-[var(--ink)]">
                    {dir.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--canvas)] font-bold text-[#176b60] shrink-0">
                    Statutory Rule
                  </span>
                </div>

                <p className="text-[11px] font-medium text-[#b46d2e] dark:text-[#e6b57d]">
                  Enforcing Authority: {dir.authority}
                </p>

                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {dir.summary}
                </p>

                <div className="p-3 rounded-xl bg-[var(--canvas)] border academy-line text-xs">
                  <strong className="text-[var(--ink)] block mb-0.5">Practical Impact on Importers/Exporters:</strong>
                  <span className="text-[var(--muted)]">{dir.practicalImpact}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick link to curriculum chapter 7 */}
          <div className="academy-card p-5 bg-gradient-to-r from-[#176b60]/10 to-[var(--paper)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-serif-title text-sm font-bold">
                Want to study Chapter 7: Incoterms 2020 & Mandatory Marine Insurance?
              </h3>
              <p className="text-xs text-[var(--muted)]">
                Includes full calculations of the 1% × (1.10 × C&F Value in ETB) statutory marine formula and joint survey protocols.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedChapterId('ch-7');
                setActiveNavTab('curriculum');
              }}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-[#176b60] hover:bg-[#124f49] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              Open Chapter 7 in Curriculum <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
