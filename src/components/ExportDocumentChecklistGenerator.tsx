import React, { useState, useMemo } from 'react';
import {
  COMMODITY_PROFILES,
  DESTINATION_MARKETS,
  TRANSPORT_MODES,
  PAYMENT_MODES,
  EXPORT_DOCUMENT_DATABASE
} from '../data/exportChecklistData';
import {
  ExportCommodityId,
  DestinationMarketId,
  TransportModeId,
  PaymentMethodId,
  ExportDocumentItem
} from '../types';
import { useApp } from '../context/AppContext';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Building2,
  Coins,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Check,
  Info,
  ExternalLink,
  BookOpen,
  Coffee,
  Wheat,
  Flower2,
  Beef,
  Shirt,
  Footprints,
  TreePine,
  Gem,
  PackageCheck,
  Plane,
  Ship,
  Truck,
  RotateCcw
} from 'lucide-react';

interface Props {
  initialCommodity?: ExportCommodityId;
  onOpenChapter?: (chapterId: string) => void;
}

export const ExportDocumentChecklistGenerator: React.FC<Props> = ({
  initialCommodity = 'coffee',
  onOpenChapter
}) => {
  const { setSelectedChapterId, setActiveNavTab } = useApp();

  // Wizard state
  const [selectedCommodityId, setSelectedCommodityId] = useState<ExportCommodityId>(initialCommodity);
  const [selectedDestinationId, setSelectedDestinationId] = useState<DestinationMarketId>('eu');
  const [selectedTransportId, setSelectedTransportId] = useState<TransportModeId>('sea_multimodal');
  const [selectedPaymentId, setSelectedPaymentId] = useState<PaymentMethodId>('lc_irrevocable');

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<'all' | 'pre_export' | 'inspection' | 'customs' | 'origin' | 'shipping' | 'banking'>('all');
  const [mandatoryOnly, setMandatoryOnly] = useState(false);

  // Completion tracker state
  const [completedDocs, setCompletedDocs] = useState<Record<string, boolean>>({
    'doc-motri-license': true,
    'doc-commercial-invoice': false,
    'doc-packing-list': false
  });

  // Modal / Detail state
  const [expandedDocId, setExpandedDocId] = useState<string | null>('doc-motri-license');
  const [activeTemplateDoc, setActiveTemplateDoc] = useState<ExportDocumentItem | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Helper icons for commodities
  const getCommodityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-700 dark:text-amber-400" />;
      case 'Wheat': return <Wheat className="w-5 h-5 text-amber-600 dark:text-amber-300" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Beef': return <Beef className="w-5 h-5 text-red-700 dark:text-red-400" />;
      case 'Shirt': return <Shirt className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-amber-800 dark:text-amber-500" />;
      case 'TreePine': return <TreePine className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      case 'Gem': return <Gem className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-600" />;
    }
  };

  const getTransportIcon = (id: TransportModeId) => {
    switch (id) {
      case 'air_cargo': return <Plane className="w-4 h-4 text-sky-600" />;
      case 'sea_multimodal': return <Ship className="w-4 h-4 text-blue-700" />;
      case 'road_crossborder': return <Truck className="w-4 h-4 text-emerald-600" />;
    }
  };

  const selectedCommodity = useMemo(
    () => COMMODITY_PROFILES.find(c => c.id === selectedCommodityId) || COMMODITY_PROFILES[0],
    [selectedCommodityId]
  );

  const selectedDestination = useMemo(
    () => DESTINATION_MARKETS.find(d => d.id === selectedDestinationId) || DESTINATION_MARKETS[0],
    [selectedDestinationId]
  );

  const selectedTransport = useMemo(
    () => TRANSPORT_MODES.find(t => t.id === selectedTransportId) || TRANSPORT_MODES[0],
    [selectedTransportId]
  );

  const selectedPayment = useMemo(
    () => PAYMENT_MODES.find(p => p.id === selectedPaymentId) || PAYMENT_MODES[0],
    [selectedPaymentId]
  );

  // Filter documents that match the current scenario
  const matchingDocuments = useMemo(() => {
    return EXPORT_DOCUMENT_DATABASE.filter(doc => {
      // 1. Commodity match
      if (!doc.applicableCommodities.includes(selectedCommodityId)) {
        return false;
      }

      // 2. Destination match (if restricted)
      if (doc.applicableDestinations && !doc.applicableDestinations.includes(selectedDestinationId)) {
        return false;
      }

      // 3. Transport match (if restricted)
      if (doc.applicableTransports && !doc.applicableTransports.includes(selectedTransportId)) {
        return false;
      }

      // 4. Payment match (if restricted)
      if (doc.applicablePayments && !doc.applicablePayments.includes(selectedPaymentId)) {
        return false;
      }

      // 5. Mandatory filter
      if (mandatoryOnly && !doc.isMandatory) {
        return false;
      }

      // 6. Stage filter
      if (stageFilter !== 'all' && doc.stage !== stageFilter) {
        return false;
      }

      // 7. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = doc.name.toLowerCase().includes(q);
        const matchAmharic = doc.amharicName?.toLowerCase().includes(q);
        const matchAuth = doc.issuingAuthority.toLowerCase().includes(q);
        const matchSummary = doc.summary.toLowerCase().includes(q);
        if (!matchName && !matchAmharic && !matchAuth && !matchSummary) {
          return false;
        }
      }

      return true;
    });
  }, [
    selectedCommodityId,
    selectedDestinationId,
    selectedTransportId,
    selectedPaymentId,
    mandatoryOnly,
    stageFilter,
    searchQuery
  ]);

  // Overall counts for scenario
  const allScenarioDocs = useMemo(() => {
    return EXPORT_DOCUMENT_DATABASE.filter(doc => {
      if (!doc.applicableCommodities.includes(selectedCommodityId)) return false;
      if (doc.applicableDestinations && !doc.applicableDestinations.includes(selectedDestinationId)) return false;
      if (doc.applicableTransports && !doc.applicableTransports.includes(selectedTransportId)) return false;
      if (doc.applicablePayments && !doc.applicablePayments.includes(selectedPaymentId)) return false;
      return true;
    });
  }, [selectedCommodityId, selectedDestinationId, selectedTransportId, selectedPaymentId]);

  const totalRequiredCount = allScenarioDocs.length;
  const completedCount = allScenarioDocs.filter(d => completedDocs[d.id]).length;
  const progressPercent = totalRequiredCount > 0 ? Math.round((completedCount / totalRequiredCount) * 100) : 0;
  const mandatoryCount = allScenarioDocs.filter(d => d.isMandatory).length;

  const toggleDocComplete = (id: string) => {
    setCompletedDocs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const applyPreset = (preset: {
    commodity: ExportCommodityId;
    destination: DestinationMarketId;
    transport: TransportModeId;
    payment: PaymentMethodId;
  }) => {
    setSelectedCommodityId(preset.commodity);
    setSelectedDestinationId(preset.destination);
    setSelectedTransportId(preset.transport);
    setSelectedPaymentId(preset.payment);
    setActiveStep(5); // Jump straight to checklist
  };

  const handleNavigateToChapter = (chapterNumber: number) => {
    const targetId = `ch-${chapterNumber}`;
    setSelectedChapterId(targetId);
    if (onOpenChapter) {
      onOpenChapter(targetId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Header */}
      <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-900 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-amber-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Official Ethiopian Export Gateway
              </span>
              <span className="text-xs text-neutral-400">trade.esw.et · MoTRI · NBE · ECTALE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif-title font-bold text-white tracking-tight">
              Export Document Checklist Generator
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Generates an operational compliance checklist tailored to your commodity, destination market, transport mode, and payment method across all 6 Ethiopian export procedural stages.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col items-stretch gap-2.5 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-white/20 transition-all backdrop-blur-xs shadow-xs"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Print Checklist</span>
            </button>
            <button
              onClick={() => setActiveNavTab('resources')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Resource Library</span>
            </button>
          </div>
        </div>

        {/* Quick Route Presets */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Popular Ethiopian Trade Routes:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset({ commodity: 'coffee', destination: 'eu', transport: 'sea_multimodal', payment: 'lc_irrevocable' })}
              className="px-3 py-1.5 rounded-lg text-xs bg-white/5 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>☕ Sidama Coffee to Germany (EU)</span>
            </button>
            <button
              onClick={() => applyPreset({ commodity: 'oilseeds_pulses', destination: 'china_asia', transport: 'sea_multimodal', payment: 'lc_irrevocable' })}
              className="px-3 py-1.5 rounded-lg text-xs bg-white/5 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>🌱 Humera Sesame to China</span>
            </button>
            <button
              onClick={() => applyPreset({ commodity: 'meat_livestock', destination: 'gcc_middle_east', transport: 'air_cargo', payment: 'advance_tt' })}
              className="px-3 py-1.5 rounded-lg text-xs bg-white/5 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>🥩 Chilled Goat Meat to Dubai (Air)</span>
            </button>
            <button
              onClick={() => applyPreset({ commodity: 'horticulture_flowers', destination: 'eu', transport: 'air_cargo', payment: 'consignment' })}
              className="px-3 py-1.5 rounded-lg text-xs bg-white/5 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>🌸 Cut Roses to Netherlands (Air)</span>
            </button>
            <button
              onClick={() => applyPreset({ commodity: 'textiles_garments', destination: 'afcfta_africa', transport: 'road_crossborder', payment: 'cad' })}
              className="px-3 py-1.5 rounded-lg text-xs bg-white/5 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>🧵 Hawassa Garments to Kenya (AfCFTA)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step Wizard Selection Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-4">
          <button
            onClick={() => setActiveStep(1)}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeStep === 1
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/50 shadow-xs'
                : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700/60 hover:border-neutral-300'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Step 1 · Commodity</div>
            <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate mt-1 flex items-center gap-1.5">
              {getCommodityIcon(selectedCommodity.iconName)}
              <span className="truncate">{selectedCommodity.name.split('(')[0]}</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">{selectedCommodity.category}</div>
          </button>

          <button
            onClick={() => setActiveStep(2)}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeStep === 2
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/50 shadow-xs'
                : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700/60 hover:border-neutral-300'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Step 2 · Destination</div>
            <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate mt-1 flex items-center gap-1.5">
              <span>{selectedDestination.flag}</span>
              <span className="truncate">{selectedDestination.name.split('(')[0]}</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">{selectedDestination.tradeScheme.split('/')[0]}</div>
          </button>

          <button
            onClick={() => setActiveStep(3)}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeStep === 3
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/50 shadow-xs'
                : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700/60 hover:border-neutral-300'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Step 3 · Transport</div>
            <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate mt-1 flex items-center gap-1.5">
              {getTransportIcon(selectedTransport.id)}
              <span className="truncate">{selectedTransport.name.split('(')[0]}</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">{selectedTransport.leadTime}</div>
          </button>

          <button
            onClick={() => setActiveStep(4)}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeStep === 4
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/50 shadow-xs'
                : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700/60 hover:border-neutral-300'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Step 4 · Payment</div>
            <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate mt-1 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span className="truncate">{selectedPayment.name.split('(')[0]}</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">Risk: {selectedPayment.riskLevel}</div>
          </button>
        </div>

        {/* Step 1 Selector View */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Select Your Specific Export Commodity
                </h4>
                <p className="text-xs text-neutral-500">
                  Ethiopian customs and regulatory agencies enforce distinct testing and licensing by HS code.
                </p>
              </div>
              <button
                onClick={() => setActiveStep(2)}
                className="px-3.5 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <span>Next: Destination</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COMMODITY_PROFILES.map(comm => {
                const isSelected = comm.id === selectedCommodityId;
                return (
                  <button
                    key={comm.id}
                    onClick={() => {
                      setSelectedCommodityId(comm.id);
                    }}
                    className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-900/10 dark:bg-amber-900/20 border-amber-600 dark:border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-white dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 hover:border-amber-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                          {getCommodityIcon(comm.iconName)}
                        </div>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 line-clamp-1">
                        {comm.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5 font-mono">
                        HS: {comm.hsCodePrefix}
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                        {comm.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-700/60 text-[10px] text-neutral-500 space-y-1">
                      <div><strong className="text-neutral-700 dark:text-neutral-300">Authority:</strong> {comm.leadAuthority}</div>
                      {comm.nbeFloorPriceApplies && (
                        <div className="text-amber-600 dark:text-amber-400 font-semibold">✓ Daily NBE Floor Price Enforced</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 Selector View */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Select Target Destination & Trade Agreement
                </h4>
                <p className="text-xs text-neutral-500">
                  Determines preferential certificates of origin (EUR.1, AfCFTA, GSP) and quarantine standards.
                </p>
              </div>
              <button
                onClick={() => setActiveStep(3)}
                className="px-3.5 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <span>Next: Transport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DESTINATION_MARKETS.map(dest => {
                const isSelected = dest.id === selectedDestinationId;
                return (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDestinationId(dest.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-900/10 dark:bg-amber-900/20 border-amber-600 dark:border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-white dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 hover:border-amber-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{dest.flag}</span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                        {dest.name}
                      </div>
                      <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">
                        {dest.tradeScheme}
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-700/60 text-[10px] text-neutral-500">
                      <div className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Key Documents:</div>
                      <div className="flex flex-wrap gap-1">
                        {dest.specialCertificatesRequired.slice(0, 2).map((cert, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[9px]">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 Selector View */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Select Transport Mode & Logistics Corridor
                </h4>
                <p className="text-xs text-neutral-500">
                  Determines whether you need an Ocean Multimodal Bill of Lading, Air Waybill, or Transit Consignment Note.
                </p>
              </div>
              <button
                onClick={() => setActiveStep(4)}
                className="px-3.5 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <span>Next: Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TRANSPORT_MODES.map(tm => {
                const isSelected = tm.id === selectedTransportId;
                return (
                  <button
                    key={tm.id}
                    onClick={() => setSelectedTransportId(tm.id)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-amber-900/10 dark:bg-amber-900/20 border-amber-600 dark:border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-white dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                        {getTransportIcon(tm.id)}
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-neutral-500">
                        {tm.leadTime}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                      {tm.name}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1">
                      Carrier: {tm.carrier}
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                      {tm.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4 Selector View */}
        {activeStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Select International Payment & Forex Channel
                </h4>
                <p className="text-xs text-neutral-500">
                  NBE directives mandate specific document flow for L/C at Sight vs CAD vs Advance TT.
                </p>
              </div>
              <button
                onClick={() => setActiveStep(5)}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <span>Generate Checklist</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {PAYMENT_MODES.map(pm => {
                const isSelected = pm.id === selectedPaymentId;
                return (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedPaymentId(pm.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-amber-900/10 dark:bg-amber-900/20 border-amber-600 dark:border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-white dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        pm.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                        pm.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' :
                        'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                      }`}>
                        Risk: {pm.riskLevel}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </div>
                    <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                      {pm.name}
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                      {pm.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Summary Scenario Status Bar & Checklist Controls */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Active Export Scenario
              </span>
              <span className="text-xs text-neutral-400">·</span>
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                {selectedCommodity.name.split('(')[0]} to {selectedDestination.name.split('(')[0]}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Transport: <strong>{selectedTransport.name.split('(')[0]}</strong> · Payment: <strong>{selectedPayment.name}</strong> · Authority: <strong>{selectedCommodity.leadAuthority}</strong>
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                {completedCount} of {totalRequiredCount} Verified
              </div>
              <div className="text-[11px] text-neutral-500">
                {progressPercent}% Readiness Complete
              </div>
            </div>
            <div className="w-32 bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  progressPercent === 100 ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <button
              onClick={() => {
                const reset: Record<string, boolean> = {};
                allScenarioDocs.forEach(d => { reset[d.id] = false; });
                setCompletedDocs(reset);
              }}
              title="Reset verified state"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search document name, Amharic title, issuing authority..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-xl text-[11px]">
              <button
                onClick={() => setStageFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  stageFilter === 'all'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                All Stages ({allScenarioDocs.length})
              </button>
              <button
                onClick={() => setStageFilter('pre_export')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  stageFilter === 'pre_export'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Pre-Export
              </button>
              <button
                onClick={() => setStageFilter('inspection')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  stageFilter === 'inspection'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Quality/SPS
              </button>
              <button
                onClick={() => setStageFilter('customs')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  stageFilter === 'customs'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Customs/ESW
              </button>
              <button
                onClick={() => setStageFilter('origin')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  stageFilter === 'origin'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Origin (COO)
              </button>
              <button
                onClick={() => setStageFilter('shipping')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  stageFilter === 'shipping'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Shipping/B/L
              </button>
            </div>

            <button
              onClick={() => setMandatoryOnly(!mandatoryOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                mandatoryOnly
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Mandatory Only ({mandatoryCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Checklist Items */}
      <div className="space-y-4">
        {matchingDocuments.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              No Documents Matching Search Filter
            </h4>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Try clearing your search query or switching the stage tab to "All Stages".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setStageFilter('all'); setMandatoryOnly(false); }}
              className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          matchingDocuments.map((doc, idx) => {
            const isCompleted = !!completedDocs[doc.id];
            const isExpanded = expandedDocId === doc.id;

            return (
              <div
                key={doc.id}
                className={`bg-white dark:bg-neutral-900 border rounded-2xl transition-all overflow-hidden ${
                  isCompleted
                    ? 'border-emerald-300/80 dark:border-emerald-900/60 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800 shadow-xs'
                }`}
              >
                {/* Document Main Row Header */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => toggleDocComplete(doc.id)}
                      className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-neutral-300 dark:border-neutral-600 hover:border-emerald-500 bg-neutral-50 dark:bg-neutral-800'
                      }`}
                      title={isCompleted ? 'Mark as pending' : 'Mark as verified'}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-3" /> : null}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] text-neutral-400">
                          #{idx + 1}
                        </span>
                        <h4 className={`text-sm md:text-base font-bold transition-colors ${
                          isCompleted
                            ? 'text-emerald-950 dark:text-emerald-300'
                            : 'text-neutral-900 dark:text-neutral-100'
                        }`}>
                          {doc.name}
                        </h4>

                        {doc.amharicName && (
                          <span className="text-xs text-neutral-500 font-sans">
                            ({doc.amharicName})
                          </span>
                        )}

                        {doc.isMandatory ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            Mandatory
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                            Destination Specific
                          </span>
                        )}

                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                          {doc.stageTitle.split(':')[0]}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {doc.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-neutral-500">
                        <span className="flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300">
                          <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                          {doc.issuingAuthority}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          {doc.estimatedTurnaround}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 text-neutral-400" />
                          {doc.officialFee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions right side */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {doc.sampleTemplateSnippet && (
                      <button
                        onClick={() => setActiveTemplateDoc(doc)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-600" />
                        <span>View Template</span>
                      </button>
                    )}

                    {doc.courseChapterRef && (
                      <button
                        onClick={() => handleNavigateToChapter(doc.courseChapterRef!)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Study Ch {doc.courseChapterRef}</span>
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                      className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand full guide'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded In-Depth Guidance Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 bg-neutral-50 dark:bg-neutral-850 border-t border-neutral-100 dark:border-neutral-800/80 space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Requirements checklist */}
                      <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                        <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Mandatory Information & Checkpoints:</span>
                        </div>
                        <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-300">
                          {doc.keyRequirements.map((req, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Critical pitfalls */}
                      <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                        <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          <span>Common Mistakes to Avoid:</span>
                        </div>
                        <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-300">
                          {doc.commonPitfalls.map((pit, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-red-500 font-bold">•</span>
                              <span>{pit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pro-Tip Bar */}
                    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-3.5 flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-900 dark:text-amber-200">Ethiopian Trade Pro-Tip: </span>
                        <span className="text-amber-800 dark:text-amber-300 leading-relaxed">{doc.proTip}</span>
                      </div>
                    </div>

                    {/* Legal citation & Resource link */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-neutral-500">
                      {doc.legalBasis && (
                        <span><strong>Legal Authority:</strong> {doc.legalBasis}</span>
                      )}
                      {doc.sampleTemplateSnippet && (
                        <button
                          onClick={() => setActiveTemplateDoc(doc)}
                          className="text-amber-700 dark:text-amber-400 font-semibold underline hover:text-amber-800"
                        >
                          Open Authentic Format Template →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* SAMPLE DOCUMENT MODAL VIEWER */}
      {activeTemplateDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  Sample Document Template Preview
                </span>
                <h3 className="text-lg font-serif-title font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                  {activeTemplateDoc.name}
                </h3>
                <p className="text-xs text-neutral-500">
                  Issued by: {activeTemplateDoc.issuingAuthority}
                </p>
              </div>

              <button
                onClick={() => setActiveTemplateDoc(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            {/* Template snippet box */}
            <div className="bg-neutral-950 text-neutral-100 p-4 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed border border-neutral-800">
              {activeTemplateDoc.sampleTemplateSnippet}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-neutral-500">
                Format matches Ethiopian customs & regulatory standards.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyTemplate(activeTemplateDoc.sampleTemplateSnippet || '')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5"
                >
                  {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTemplate ? 'Copied to Clipboard!' : 'Copy Template'}</span>
                </button>
                <button
                  onClick={() => setActiveTemplateDoc(null)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
