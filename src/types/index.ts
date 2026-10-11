export type SubscriptionStatus = 'free_trial' | 'pending_approval' | 'active_paid' | 'expired' | 'rejected';

export interface UserProfile {
  id: string;
  fullName: string;
  telegramUsername: string; // e.g. @EximmanAbdIstad or @username
  phoneNumber: string; // e.g. 09 6768 4490
  email?: string;
  role: 'user' | 'admin';
  subscriptionStatus: SubscriptionStatus;
  registeredAt: string;
  expiresAt: string | null; // ISO Date string for 30 days expiry
  telebirrTxId?: string;
  paymentScreenshot?: string;
  paymentAmount: number;
  approvedAt?: string;
  notes?: string;
  completedChapters?: string[]; // IDs of completed chapters
  certificateIssuedAt?: string;
  certificateId?: string;
}

export interface ResourceDocument {
  id: string;
  title: string;
  category: 'regulation' | 'template' | 'checklist' | 'tariff' | 'guideline';
  authority: string;
  description: string;
  format: 'PDF' | 'XLSX' | 'DOCX';
  fileSize: string;
  keyHighlights: string[];
  samplePreviewText: string;
}

export interface StudentProgressRecord {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  completed: boolean;
  quizScore?: number;
  quizTotal?: number;
  completedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  practicalTip?: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  content: string; // Markdown / formatted text
  keyTakeaways?: string[];
  callout?: {
    type: 'regulation' | 'warning' | 'pro_tip' | 'formula';
    title: string;
    text: string;
  };
}

export interface CaseStudy {
  title: string;
  commodity: string;
  scenario: string;
  realWorldData: Record<string, string | number>;
  logisticsWorkflow: string[];
  solutionSummary: string;
}

export interface Chapter {
  id: string;
  moduleId: string;
  chapterNumber: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  isFreeTrialAccessible: boolean;
  sections: ChapterSection[];
  imageUrl?: string;
  imageCaption?: string;
  diagramType?: 'corridor_flow' | 'lc_lifecycle' | 'tax_cascade' | 'esw_process' | 'export_retention' | 'port_comparison' | 'fx_hedging' | 'pca_audit';
  caseStudy?: CaseStudy;
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  description: string;
  chapters: Chapter[];
}

// Data structures for Cost Build-Up Sheet (PDF Page 1 & 2)
export interface LandedCostCalculation {
  date: string;
  supplier: string;
  customer: string;
  descriptionOfGoods: string;
  model: string;
  units: number;
  origin: string;
  deliveryPoint: string;
  invoiceValueFobUSD: number;
  seaFreightUSD: number;
  exchangeRateOpening: number;
  exchangeRateSettlement: number;
  exchangeRateToday: number;
  forecastMonths: number;
  forecastMonthlyRateIncrementPct: number; // e.g. 1.8%
  // Bank Charges
  marginOpeningPct: number; // e.g. 100% or 30%
  lcBankCommissionPct: number; // e.g. 4%
  bankVatPct: number; // 15%
  nbeRatePayablePct: number; // 2.5%
  swiftChargeUSD: number; // 200 or 100
  seaFreightServiceChargePct: number; // 4%
  // Taxes & Duties
  customsDutyPct: number;
  exciseTaxPct: number;
  surtaxPct: number;
  socialWelfarePct: number; // 3%
  vatPct: number; // 15%
  withholdingTaxPct: number; // 3%
  scanningChargePct: number; // 0.07%
  // Port & Logistics
  portClearanceETB: number; // Djibouti port
  djiboutiToAddisTransportETB: number;
  customsToIndodeTransportETB: number;
  containerUnstuffingETB: number;
  warehouseStorageETB: number;
  assemblyAtWarehouseETB: number;
  miscellaneousCostsETB: number;
}

// Data structures for LC & Freight Partial / Full Breakdown (PDF Page 3, 5, 6)
export interface LCOpeningParams {
  fcyValueUSD: number;
  exchangeRate: number;
  marginPct: number; // e.g. 30% or 50%
  commissionPct: number; // 4%
  vatPct: number; // 15%
  unpaidMarginFeePct: number; // 5% if applicable
  swiftChargeUSD: number;
}

export interface LCSettlementParams {
  fcyValueUSD: number;
  settlementRate: number;
  marginHeldPct: number;
  settlementPct: number;
  nbeFeePct: number; // 2.5%
  swiftChargeUSD?: number;
}

export interface FreightParams {
  fcyValueUSD: number;
  freightRate: number;
  serviceChargePct: number; // 4%
  vatPct: number; // 15%
  nbeFeePct: number; // 2.5%
}

// Customs Tax Assessment (Screenshots 3 & 7)
export interface CustomsTaxParams {
  itemDescription: string;
  units: number;
  fobValueUSD: number;
  exchangeRate: number;
  freightUSD: number;
  insuranceETB: number;
  otherInlandETB: number;
  customsDutyRate: number; // e.g. 0% for machinery, 35% for cars
  exciseTaxRate: number;
  surtaxRate: number; // default 10%
  socialWelfareRate: number; // default 3%
  vatRate: number; // default 15%
  withholdingTaxRate: number; // default 3%
  scanningFeeRate: number; // default 0.07%
}

// Export Document Checklist Generator Types
export type ExportCommodityId = 
  | 'coffee'
  | 'oilseeds_pulses'
  | 'horticulture_flowers'
  | 'meat_livestock'
  | 'textiles_garments'
  | 'leather_goods'
  | 'spices_herbs'
  | 'natural_gums'
  | 'minerals_precious'
  | 'processed_manufactured';

export type DestinationMarketId =
  | 'eu'
  | 'gcc_middle_east'
  | 'usa_north_america'
  | 'china_asia'
  | 'afcfta_africa'
  | 'comesa'
  | 'standard_row';

export type TransportModeId =
  | 'air_cargo'
  | 'sea_multimodal'
  | 'road_crossborder';

export type PaymentMethodId =
  | 'lc_irrevocable'
  | 'cad'
  | 'advance_tt'
  | 'consignment';

export interface ExportDocumentItem {
  id: string;
  name: string;
  amharicName?: string;
  stage: 'pre_export' | 'inspection' | 'customs' | 'origin' | 'shipping' | 'banking';
  stageTitle: string;
  issuingAuthority: string;
  legalBasis?: string;
  estimatedTurnaround: string;
  officialFee: string;
  isMandatory: boolean;
  applicableCommodities: ExportCommodityId[];
  applicableDestinations?: DestinationMarketId[];
  applicableTransports?: TransportModeId[];
  applicablePayments?: PaymentMethodId[];
  summary: string;
  keyRequirements: string[];
  commonPitfalls: string[];
  proTip: string;
  sampleTemplateSnippet?: string;
  courseChapterRef?: number;
  resourceDocRefId?: string;
}

export interface CommodityProfile {
  id: ExportCommodityId;
  name: string;
  iconName: string;
  category: string;
  leadAuthority: string;
  hsCodePrefix: string;
  typicalPackaging: string;
  keyExportDestinations: string[];
  specialRegulatoryBodies: string[];
  description: string;
  nbeFloorPriceApplies: boolean;
  ecxTradingMandatory: boolean;
}

export type GlossaryCategory =
  | 'customs_valuation'
  | 'shipping_logistics'
  | 'trade_finance'
  | 'export_procedures'
  | 'incoterms_contracts'
  | 'regulatory_agencies';

export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  amharicTerm?: string;
  category: GlossaryCategory;
  categoryLabel: string;
  shortDefinition: string;
  inDepthExplanation: string;
  ethiopianContextExample: string;
  proclamationRef?: string;
  relatedChapterNumber?: number;
  relatedChapterTitle?: string;
  tags: string[];
}

export type IncotermCode =
  | 'EXW'
  | 'FCA'
  | 'CPT'
  | 'CIP'
  | 'DAP'
  | 'DPU'
  | 'DDP'
  | 'FAS'
  | 'FOB'
  | 'CFR'
  | 'CIF';

export type IncotermCategory = 'any_mode' | 'sea_inland_waterway';
export type IncotermParty = 'seller' | 'buyer' | 'shared' | 'not_applicable';

export type SupplyChainStageId =
  | 'packaging'
  | 'pre_carriage'
  | 'export_clearance'
  | 'origin_terminal'
  | 'loading'
  | 'main_carriage'
  | 'transit_insurance'
  | 'arrival_terminal'
  | 'transit_corridor'
  | 'import_clearance'
  | 'final_delivery';

export interface SupplyChainStage {
  id: SupplyChainStageId;
  stepNumber: number;
  title: string;
  shortTitle: string;
  iconName: string;
  location: string;
  description: string;
  ethiopianCorridorDetail: string;
}

export interface IncotermStageResponsibility {
  cost: IncotermParty;
  risk: 'seller' | 'buyer';
  notes: string;
}

export interface IncotermDefinition {
  code: IncotermCode;
  name: string;
  amharicName: string;
  category: IncotermCategory;
  summary: string;
  riskTransferPoint: string;
  costTransferPoint: string;
  splitRiskAndCost: boolean;
  ethiopianStatus: 'standard_import' | 'recommended_export' | 'conditional_waiver' | 'restricted_impractical';
  ethiopianStatusLabel: string;
  ethiopiaRegulationNotes: string;
  insuranceRequirement: string;
  eslseRelevance: string;
  advantages: string[];
  disadvantages: string[];
  ethiopianPracticalAdvice: string[];
  proformaClauseExample: string;
  stageResponsibilities: Record<SupplyChainStageId, IncotermStageResponsibility>;
  exampleScenario: {
    direction: 'import' | 'export';
    commodity: string;
    route: string;
    breakdown: string;
  };
}

export interface IncotermCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  termInvolved: IncotermCode;
  direction: 'import' | 'export';
  background: string;
  theDispute: string;
  keyQuestion: string;
  legalRuling: string;
  practicalTakeaway: string;
}


