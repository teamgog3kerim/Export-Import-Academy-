import {
  CommodityProfile,
  DestinationMarketId,
  ExportCommodityId,
  ExportDocumentItem,
  PaymentMethodId,
  TransportModeId
} from '../types';

export interface DestinationProfile {
  id: DestinationMarketId;
  name: string;
  flag: string;
  tradeScheme: string;
  specialCertificatesRequired: string[];
  description: string;
}

export interface TransportProfile {
  id: TransportModeId;
  name: string;
  carrier: string;
  leadTime: string;
  suitableCargo: string;
  description: string;
}

export interface PaymentProfile {
  id: PaymentMethodId;
  name: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  nbeRequirements: string;
  description: string;
}

export const COMMODITY_PROFILES: CommodityProfile[] = [
  {
    id: 'coffee',
    name: 'Arabica Green Coffee (Specialty & Commercial)',
    iconName: 'Coffee',
    category: 'Agricultural Cash Crop',
    leadAuthority: 'Ethiopian Coffee & Tea Authority (ECTALE)',
    hsCodePrefix: '0901.11 (Not roasted, not decaffeinated)',
    typicalPackaging: '60 kg Clean Jute Bags lined with Hermetic GrainPro bags (320 bags / 20ft container = 19.2 MT)',
    keyExportDestinations: ['Germany (EU)', 'United States', 'Saudi Arabia', 'Japan', 'South Korea', 'Belgium'],
    specialRegulatoryBodies: ['ECTALE Liquoring Laboratory', 'National Bank of Ethiopia (NBE)', 'Ministry of Agriculture (Phytosanitary)'],
    description: 'Ethiopia’s premier hard-currency export. Subject to daily NBE minimum export registration floor prices, moisture band enforcement (10.5%–11.5%), and mandatory ICO origin certification.',
    nbeFloorPriceApplies: true,
    ecxTradingMandatory: false // Direct export permitted for licensed growers/washing stations
  },
  {
    id: 'oilseeds_pulses',
    name: 'Oilseeds & Pulses (Sesame, Soybeans, Chickpeas)',
    iconName: 'Wheat',
    category: 'Grains & Oilseeds',
    leadAuthority: 'Ministry of Trade & Regional Integration (MoTRI) / MoA',
    hsCodePrefix: '1207.40 (Sesame seeds), 1201.90 (Soybeans), 0713.20 (Chickpeas)',
    typicalPackaging: '50 kg PP or Jute bags (380 to 400 bags / 20ft container = 19 to 20 MT)',
    keyExportDestinations: ['China', 'Israel', 'Turkey', 'United Arab Emirates', 'India', 'Jordan'],
    specialRegulatoryBodies: ['Ethiopian Commodity Exchange (ECX)', 'Ministry of Agriculture Plant Health', 'GACC (China)'],
    description: 'High-volume export commodities primarily traded through the ECX warehouse receipt platform. Requires stringent moisture tests (below 7% for sesame) and gas fumigation against weevil infestation.',
    nbeFloorPriceApplies: true,
    ecxTradingMandatory: true
  },
  {
    id: 'horticulture_flowers',
    name: 'Cut Flowers, Roses & Fresh Horticulture',
    iconName: 'Flower2',
    category: 'Perishable Horticulture',
    leadAuthority: 'Ethiopian Horticulture Producer Exporters Association (EHPEA) / MoA',
    hsCodePrefix: '0603.11 (Fresh cut roses), 0708.20 (Fresh beans)',
    typicalPackaging: 'Temperature-controlled carton boxes (Cold chain 2°C–4°C) with dry ice or gel packs',
    keyExportDestinations: ['Netherlands (Aalsmeer Auction)', 'United Kingdom', 'Germany', 'Norway', 'Saudi Arabia'],
    specialRegulatoryBodies: ['Ethiopian Airlines Cargo Cold Hub', 'Ministry of Agriculture Quarantine', 'EU Plant Health (TRACES)'],
    description: 'Time-critical airfreight exports utilizing Bole International Airport’s specialized cold-chain hub. Zero tolerance for quarantine pests like false codling moth; requires fast-track e-SAD clearance within hours.',
    nbeFloorPriceApplies: false,
    ecxTradingMandatory: false
  },
  {
    id: 'meat_livestock',
    name: 'Chilled Meat (Goat & Sheep) & Live Animals',
    iconName: 'Beef',
    category: 'Livestock & Animal Products',
    leadAuthority: 'Ministry of Agriculture (Animal Health & Veterinary Directorate)',
    hsCodePrefix: '0204.10 (Chilled sheep/goat carcass), 0102.29 (Live bovine)',
    typicalPackaging: 'Stockinette-wrapped chilled whole carcasses in refrigerated air containers (0°C to 2°C)',
    keyExportDestinations: ['United Arab Emirates (Dubai)', 'Saudi Arabia (Jeddah, Riyadh)', 'Qatar', 'Kuwait', 'Oman'],
    specialRegulatoryBodies: ['National Veterinary Institute', 'Supreme Council for Islamic Affairs (Halal)', 'GCC Food Safety'],
    description: 'High-value airfreight trade to Gulf countries. Requires certified ante-mortem and post-mortem veterinary inspection at export abattoirs (Bishoftu, Modjo, Adama) and authentic Halal certification.',
    nbeFloorPriceApplies: true,
    ecxTradingMandatory: false
  },
  {
    id: 'textiles_garments',
    name: 'Textiles, Apparel & Finished Garments',
    iconName: 'Shirt',
    category: 'Industrial Manufacturing',
    leadAuthority: 'Textile Industry Development Institute (TIDI) / MoTRI',
    hsCodePrefix: '6109.10 (Cotton T-shirts), 6203.42 (Trousers), 5205.12 (Cotton yarn)',
    typicalPackaging: 'Poly-bagged individual pieces inside master corrugated export cartons with pallet wrapping',
    keyExportDestinations: ['European Union', 'United States', 'Kenya (AfCFTA)', 'South Africa', 'Middle East'],
    specialRegulatoryBodies: ['Industrial Parks Development Corporation (IPDC)', 'Ethiopian Customs Commission (Hawassa/Bole Lemi)', 'ECCSA'],
    description: 'Manufactured consignments produced in export processing zones (Hawassa, Bole Lemi, Kombolcha). Employs preferential origin schemes like AfCFTA and EU Everything But Arms for tariff-free access.',
    nbeFloorPriceApplies: false,
    ecxTradingMandatory: false
  },
  {
    id: 'leather_goods',
    name: 'Finished Leather & Leather Goods (Footwear, Bags)',
    iconName: 'Footprints',
    category: 'Leather & Finished Products',
    leadAuthority: 'Leather Industry Development Institute (LIDI) / MoTRI',
    hsCodePrefix: '4107.92 (Bovine grain leather), 6403.59 (Leather upper footwear)',
    typicalPackaging: 'Carton-packed pairs, moisture-absorbing silica gel pouches inside master maritime cartons',
    keyExportDestinations: ['Italy', 'Germany', 'United Kingdom', 'China', 'Kenya', 'Uganda'],
    specialRegulatoryBodies: ['LIDI Quality Laboratory', 'Ministry of Industry', 'ECCSA'],
    description: 'Ethiopia actively discourages raw hide exports via heavy export taxes to stimulate local value-addition. Finished shoes and bags enjoy 0% export duty and preferential duty-free access abroad.',
    nbeFloorPriceApplies: false,
    ecxTradingMandatory: false
  },
  {
    id: 'spices_herbs',
    name: 'Spices, Ethiopian Cardamom (Korarima) & Ginger',
    iconName: 'Sparkles',
    category: 'Agricultural Spices',
    leadAuthority: 'Ministry of Agriculture / MoTRI / ECX',
    hsCodePrefix: '0908.31 (Cardamoms/Korarima), 0910.11 (Ginger raw)',
    typicalPackaging: 'Double-stitched PP sacks with polythene liners (25 kg or 50 kg bags)',
    keyExportDestinations: ['Sudan', 'United Arab Emirates', 'India', 'Egypt', 'Saudi Arabia', 'United Kingdom'],
    specialRegulatoryBodies: ['ECX Quality Labs', 'MoA Plant Health Directorate'],
    description: 'Indigenous aromatic spices grown in southern and southwestern forests. Requires aflatoxin testing, moisture certification below 12%, and phytosanitary treatment before sea or road transit.',
    nbeFloorPriceApplies: true,
    ecxTradingMandatory: true
  },
  {
    id: 'natural_gums',
    name: 'Natural Gums, Frankincense & Gum Arabic',
    iconName: 'TreePine',
    category: 'Forestry Products',
    leadAuthority: 'Ethiopian Forestry Development (EFD) / MoTRI',
    hsCodePrefix: '1301.20 (Gum Arabic), 1301.90 (Olibanum / Frankincense tears)',
    typicalPackaging: 'Multi-wall paper bags or export-grade jute bags (50 kg net weight)',
    keyExportDestinations: ['Germany', 'France', 'United States', 'China', 'United Arab Emirates'],
    specialRegulatoryBodies: ['EFD Forestry Directorate', 'MoA Plant Quarantine'],
    description: 'Wild-harvested botanical resins from Tigray, Amhara, and Somali regions. High global demand in perfumery, confectionery, and pharmaceuticals; strictly governed to prevent illegal cross-border smuggling.',
    nbeFloorPriceApplies: true,
    ecxTradingMandatory: false
  },
  {
    id: 'minerals_precious',
    name: 'Mining Products, Gold & Raw/Cut Gemstones',
    iconName: 'Gem',
    category: 'Extractive & Mining',
    leadAuthority: 'Ministry of Mines & Petroleum / National Bank of Ethiopia',
    hsCodePrefix: '7108.12 (Semi-manufactured gold), 7103.10 (Unworked precious stones: emeralds, opals)',
    typicalPackaging: 'Tamper-evident armored security pouches in certified diplomatic/courier bullion containers',
    keyExportDestinations: ['Switzerland', 'United Arab Emirates (Dubai Gold Souk)', 'India', 'United States'],
    specialRegulatoryBodies: ['Ministry of Mines Assay Laboratory', 'NBE Gold Reserve Department', 'Ethiopian Police / Airport Customs'],
    description: 'Subject to the most rigorous security oversight in Ethiopia. Commercial gold is purchased directly by the National Bank of Ethiopia at premium incentive rates; certified gemstones require formal Ministry of Mines valuation and sealed export certificates.',
    nbeFloorPriceApplies: true,
    ecxTradingMandatory: false
  },
  {
    id: 'processed_manufactured',
    name: 'Processed Agro-Foods & General Manufactured Goods',
    iconName: 'PackageCheck',
    category: 'Processed Food & FMCG',
    leadAuthority: 'Ministry of Trade & Regional Integration (MoTRI)',
    hsCodePrefix: '2008.99 (Preserved fruit), 1512.19 (Refined sunflower oil), 6810.11 (Cement blocks)',
    typicalPackaging: 'Consumer-ready retail packaging inside branded master corrugated shipper cartons',
    keyExportDestinations: ['Djibouti', 'Somalia', 'Kenya', 'South Sudan', 'Sudan'],
    specialRegulatoryBodies: ['Ethiopian Food and Drug Authority (EFDA)', 'Ethiopian Conformity Assessment Enterprise (ECAE)'],
    description: 'Fast-growing export sector serving neighboring East African markets. Requires product registration at EFDA, batch test analysis, and regional Certificate of Origin (COMESA/AfCFTA).',
    nbeFloorPriceApplies: false,
    ecxTradingMandatory: false
  }
];

export const DESTINATION_MARKETS: DestinationProfile[] = [
  {
    id: 'eu',
    name: 'European Union (27 Member States)',
    flag: '🇪🇺',
    tradeScheme: 'Everything But Arms (EBA) / Duty-Free Quota-Free',
    specialCertificatesRequired: ['EUR.1 Movement Certificate', 'EUDR Deforestation Compliance (Coffee)', 'Phytosanitary via TRACES-NT', 'Certificate of Origin'],
    description: 'Tariff-free and quota-free access under the EU Generalized Scheme of Preferences (GSP). Stringent maximum residue levels (MRLs) and new European Union Deforestation Regulation (EUDR) geolocational tracking for coffee.'
  },
  {
    id: 'gcc_middle_east',
    name: 'Gulf Cooperation Council (UAE, Saudi Arabia, Qatar, Kuwait)',
    flag: '🇸🇦',
    tradeScheme: 'Bilateral Trade & Commercial Agreements',
    specialCertificatesRequired: ['Halal Slaughter & Processing Certificate', 'Veterinary Health Quarantine Certificate', 'Chamber of Commerce Attestation', 'Arabic Labeling Compliance'],
    description: 'Major destination for Ethiopian chilled meat, livestock, coffee, and oilseeds. Strict Halal authentication by approved Islamic bodies and compliance with SFDA (Saudi) and MoIAT (UAE) food standards.'
  },
  {
    id: 'usa_north_america',
    name: 'United States & North America',
    flag: '🇺🇸',
    tradeScheme: 'MFN / General Tariff Schedule',
    specialCertificatesRequired: ['FDA Food Facility Registration & Prior Notice', 'Commercial Invoice with HTSUS Codes', 'Phytosanitary Certificate', 'Lacey Act Botanical Declaration'],
    description: 'Top consumer of Ethiopian specialty coffee and leather footwear. Importers require valid US FDA facility registration, Bioterrorism Act Prior Notice confirmations, and strict agricultural pest inspection at US ports of entry.'
  },
  {
    id: 'china_asia',
    name: 'China & East Asia (Japan, South Korea)',
    flag: '🇨🇳',
    tradeScheme: 'Special Preferential Tariff Treatment for LDCs (0% Tariffs)',
    specialCertificatesRequired: ['GACC Single Window Registration (Decree 248/249)', 'Form A GSP Certificate of Origin', 'MoA Plant Health Quarantine Certificate'],
    description: 'Tremendous market for Humera sesame, soybeans, and specialty coffee. Exporters must be officially registered on China’s GACC customs portal; agricultural consignments require zero-soil quarantine clean-sheets.'
  },
  {
    id: 'afcfta_africa',
    name: 'African Continental Free Trade Area (AfCFTA)',
    flag: '🌍',
    tradeScheme: 'AfCFTA Preferential Trade Protocol (Zero Tariff Phase-in)',
    specialCertificatesRequired: ['AfCFTA Certificate of Origin', 'Standard Customs e-SAD Declaration', 'Commercial Invoice in USD/EUR'],
    description: 'The world’s largest unified free trade zone. Ethiopian manufacturers of garments, footwear, and processed foods benefit from duty reductions when trading with Ghana, Kenya, South Africa, and other ratified states.'
  },
  {
    id: 'comesa',
    name: 'COMESA Regional Trade Area (Kenya, Egypt, Sudan, Uganda)',
    flag: '🤝',
    tradeScheme: 'COMESA Free Trade Protocol / Simplified Trade Regime (STR)',
    specialCertificatesRequired: ['COMESA Certificate of Origin', 'Cross-Border Trucking Transit Waybill', 'MoA SPS Certificate'],
    description: 'Regional economic community granting preferential access for cross-border Ethiopian commodities moving overland to Kenya (via Moyale), Sudan (via Metema), or maritime to Egypt.'
  },
  {
    id: 'standard_row',
    name: 'Rest of the World (Standard MFN)',
    flag: '🌐',
    tradeScheme: 'Most Favoured Nation (WTO/Bilateral Terms)',
    specialCertificatesRequired: ['Chamber of Commerce Certificate of Origin', 'Commercial Invoice', 'Packing List', 'Bill of Lading'],
    description: 'Standard international commercial trade documentation complying with International Chamber of Commerce (ICC) Incoterms 2020 rules.'
  }
];

export const TRANSPORT_MODES: TransportProfile[] = [
  {
    id: 'sea_multimodal',
    name: 'Multimodal Ocean Freight via Port of Djibouti (ESLSE / Doraleh)',
    carrier: 'ESLSE & Major Global Container Lines (Maersk, MSC, CMA CGM)',
    leadTime: '18 to 35 Days (Port to Destination Port)',
    suitableCargo: 'Bulk green coffee, sesame seeds, soybeans, pulses, manufactured goods',
    description: 'Cost-effective logistics for heavy containerized cargo. Goods stuffed into 20ft/40ft containers at inland dry ports or Addis warehouses, rail/truck transit to Djibouti, and ocean vessel loading.'
  },
  {
    id: 'air_cargo',
    name: 'Air Freight Cargo via Ethiopian Airlines (Bole Cargo Terminal)',
    carrier: 'Ethiopian Airlines Cargo & Logistics Services (Boeing 777F Fleet)',
    leadTime: '8 to 48 Hours direct flights',
    suitableCargo: 'Fresh cut flowers, chilled goat/sheep meat, high-grade specialty microlots, precious minerals',
    description: 'Africa’s largest air cargo network with state-of-the-art cold hub facilities at Bole International Airport. Temperature-controlled transit maintaining cold chain unbroken from farm/abattoir to overseas market.'
  },
  {
    id: 'road_crossborder',
    name: 'Cross-Border Road Freight (Moyale, Metema, Galafi, Togochale)',
    carrier: 'Commercial Cross-Border Heavy Freight Trucks (COMESA Carrier License)',
    leadTime: '2 to 5 Days overland',
    suitableCargo: 'Agricultural goods to Kenya, livestock to Somaliland/Djibouti, industrial supplies',
    description: 'Direct trucking across regional border posts. Utilizes bilateral one-stop border posts (OSBP) like Moyale (Kenya) and Galafi (Djibouti) under bonded customs transit guarantee.'
  }
];

export const PAYMENT_MODES: PaymentProfile[] = [
  {
    id: 'lc_irrevocable',
    name: 'Irrevocable Letter of Credit (L/C at Sight)',
    riskLevel: 'Low',
    nbeRequirements: 'Must be authenticated by prime international bank; shipping documents presented within 21 days of BL.',
    description: 'Highest security for Ethiopian exporters. Foreign buyer’s bank guarantees payment upon presentation of compliant shipping documents with zero discrepancy.'
  },
  {
    id: 'cad',
    name: 'Cash Against Documents (CAD / Documentary Collection)',
    riskLevel: 'Medium',
    nbeRequirements: 'Commercial bank sends original shipping documents directly to foreign collecting bank; release only upon buyer payment.',
    description: 'Documents are routed bank-to-bank. Exporter retains title until payment is made, but bears risk if foreign buyer fails to honor collection.'
  },
  {
    id: 'advance_tt',
    name: '100% Advance Payment (Telegraphic Transfer / TT)',
    riskLevel: 'Low',
    nbeRequirements: 'Export permit issued only after commercial bank verifies advance foreign currency credit on SWIFT MT103 advice.',
    description: 'Buyer remits full foreign exchange into exporter’s bank before goods are cleared through customs. Highly preferred for small specialty shipments.'
  },
  {
    id: 'consignment',
    name: 'Consignment Basis (Approved Horticulture & Meat)',
    riskLevel: 'High',
    nbeRequirements: 'Strictly restricted by NBE; only permitted for perishable cut flowers and auction commodities under ministerial waiver.',
    description: 'Goods are shipped to foreign auction or distributor before sale price is finalized. Sales proceeds must be repatriated to Ethiopian commercial bank within statutory 90 days.'
  }
];

export const EXPORT_DOCUMENT_DATABASE: ExportDocumentItem[] = [
  // STAGE 1: PRE-EXPORT REGISTRATION & STATUTORY AUTHORIZATIONS
  {
    id: 'doc-motri-license',
    name: 'MoTRI Commodity Export Trade License',
    amharicName: 'የንግድና ቀጠናዊ ትስስር ሚኒስቴር የውጭ ንግድ ፈቃድ',
    stage: 'pre_export',
    stageTitle: 'Phase 1: Pre-Export Authorizations & Bank Permits',
    issuingAuthority: 'Ministry of Trade & Regional Integration (MoTRI)',
    legalBasis: 'Commercial Registration & Business Licensing Proclamation No. 980/2016',
    estimatedTurnaround: '1–2 Working Days (via eTrade.gov.et)',
    officialFee: '3,000–5,000 ETB (Annual renewal fee)',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers', 'meat_livestock',
      'textiles_garments', 'leather_goods', 'spices_herbs', 'natural_gums',
      'minerals_precious', 'processed_manufactured'
    ],
    summary: 'The primary legal foundation required to engage in foreign trade. Must carry the specific sector code corresponding to the export commodity.',
    keyRequirements: [
      'Valid Tax Identification Number (TIN) & Ministry of Revenues VAT registration certificate',
      'Competency Certificate (CoC) from sector authority (e.g. ECTALE for coffee, MoA for grain)',
      'Current fiscal quarter Tax Clearance Certificate from Ethiopian Revenues',
      'Minimum registered enterprise capital requirements'
    ],
    commonPitfalls: [
      'Attempting to export sesame under a "General Agricultural Equipment" import/wholesale license.',
      'License expired or failure to complete annual audit filing before renewal date.'
    ],
    proTip: 'Ensure your enterprise license explicitly lists the 6-digit HS code category on the eTrade portal; commercial banks automatically cross-check this code before registering export contracts.',
    sampleTemplateSnippet: `ETHIOPIAN COMMERCIAL REGISTRATION & EXPORT LICENSE
Registration No: TR/AA/14298/2016
Exporter Name: Great Rift Valley Export PLC
Authorized Activity: EXPORT OF ARABICA COFFEE & OILSEEDS (Code: 4521)
Tax Clearance Status: VALID FOR FISCAL QUARTER Q3
Status: ACTIVE & COMPLIANT`,
    courseChapterRef: 2,
    resourceDocRefId: 'res-ecc-tariff'
  },
  {
    id: 'doc-nbe-contract-reg',
    name: 'NBE Sales Contract Registration & Export Permit',
    amharicName: 'የብሔራዊ ባንክ የውል ምዝገባና የወጪ ንግድ ፈቃድ',
    stage: 'pre_export',
    stageTitle: 'Phase 1: Pre-Export Authorizations & Bank Permits',
    issuingAuthority: 'National Bank of Ethiopia (NBE) & Authorized Commercial Bank',
    legalBasis: 'NBE Directive No. FXD/83/2021 (Transparency in Export Contracts)',
    estimatedTurnaround: '24 Hours from sales agreement signing',
    officialFee: 'Commercial Bank Processing Fee (approx 0.5% or fixed 2,500 ETB)',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers', 'meat_livestock',
      'textiles_garments', 'leather_goods', 'spices_herbs', 'natural_gums',
      'minerals_precious', 'processed_manufactured'
    ],
    summary: 'Statutory registration of the international sales contract to prevent under-invoicing and guarantee repatriation of hard currency earnings.',
    keyRequirements: [
      'Signed Sales Contract / Proforma Invoice indicating Incoterms, quantity in MT, unit price in USD, and shipment date',
      'Unit price must be equal to or higher than the official daily NBE Minimum Floor Price (for coffee, oilseeds, pulses)',
      'Approved mode of payment (L/C, CAD, or Advance Payment Confirmation SWIFT)',
      'Registration submitted within 24 hours of contract closure'
    ],
    commonPitfalls: [
      'Signing a contract below the NBE daily benchmark price; the commercial bank will automatically block permit generation!',
      'Delays exceeding 24 hours in registering coffee contracts leading to regulatory rejection.'
    ],
    proTip: 'Always check the morning NBE daily price bulletin before confirming export contracts with European or Asian buyers to avoid being trapped below floor prices.',
    sampleTemplateSnippet: `NATIONAL BANK OF ETHIOPIA - EXPORT CONTRACT PERMIT
Permit Reference: CBE/EXP/2026/08942
Commodity: Natural Washed Guji Grade 1 Coffee
Quantity: 19.20 MT (320 Jute Bags)
Agreed Contract Price: $6.85 USD / kg FOB Djibouti
NBE Minimum Floor Benchmark: $6.40 USD / kg (COMPLIANT: +$0.45 above floor)
Payment Terms: Irrevocable L/C at Sight
Authorized Shipping Expiry: 60 Days from issue`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-nbe-forex'
  },
  {
    id: 'doc-ectale-coffee-permit',
    name: 'ECTALE Coffee Export Certificate & Cupping Grade Release',
    amharicName: 'የቡናና ሻይ ባለሥልጣን የጥራት ምርመራና የወጪ ፈቃድ ሰርተፊኬት',
    stage: 'inspection',
    stageTitle: 'Phase 2: Technical Inspection, Quality & Quarantine Certificates',
    issuingAuthority: 'Ethiopian Coffee & Tea Authority (ECTALE)',
    legalBasis: 'Coffee Marketing and Quality Control Proclamation No. 1051/2017',
    estimatedTurnaround: '2–3 Working Days',
    officialFee: '350–500 ETB per lot sample analysis',
    isMandatory: true,
    applicableCommodities: ['coffee'],
    summary: 'The holy grail of Ethiopian coffee exports: physical defect grading, moisture content analysis, and sensory cup evaluation conducted at the national laboratory.',
    keyRequirements: [
      'Draw sample of 3 kg taken by ECTALE authorized sampler from lot ready in warehouse',
      'Moisture reading strictly between 10.5% and 11.5% (anything over 12.0% rejected)',
      'Defect count matching claimed grade (Grade 1 $\\le 3$ defects; Grade 2: 4–12 defects per 350g)',
      'Sensory cupping clean cup confirmation (no mold, unwashed taints, or phenol off-flavors)'
    ],
    commonPitfalls: [
      'Shipping coffee with 12.4% moisture; container sweat during Red Sea transit will mold the beans and trigger total buyer rejection.',
      'Discrepancy between sample cup score and final bulk container stuffing.'
    ],
    proTip: 'Always line your containers with certified hermetic GrainPro bags and place minimum 4 silica-gel pole desiccants in each 20ft container.',
    sampleTemplateSnippet: `ETHIOPIAN COFFEE & TEA AUTHORITY - QUALITY CERTIFICATE
Lab Analysis Certificate No: ECTALE/QC/2026/4109
Origin: Oromia / Guji / Shakiso Washing Station
Process: Fully Washed | Screen Size: 15+ (92%)
Moisture Content: 10.8% (PASS - Standard 10.5%-11.5%)
Total Defect Count: 2 Defects / 350g (GRADE 1 CERTIFIED)
Cup Quality: Clean cup, floral jasmine, bergamot, bright citric acidity (87.5 Pts)
STATUS: APPROVED FOR EXPORT RELEASE`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-coffee-checklist'
  },
  {
    id: 'doc-moa-phytosanitary',
    name: 'Ministry of Agriculture Phytosanitary Certificate',
    amharicName: 'የግብርና ሚኒስቴር የእፅዋት ጤና ጥበቃ (ፋይቶሳኒተሪ) ሰርተፊኬት',
    stage: 'inspection',
    stageTitle: 'Phase 2: Technical Inspection, Quality & Quarantine Certificates',
    issuingAuthority: 'Ministry of Agriculture (Plant Health Regulatory Directorate)',
    legalBasis: 'Plant Quarantine Proclamation & International IPPC Standards',
    estimatedTurnaround: '24 Hours after warehouse inspection',
    officialFee: '500–1,500 ETB depending on tonnage',
    isMandatory: true,
    applicableCommodities: ['coffee', 'oilseeds_pulses', 'horticulture_flowers', 'spices_herbs', 'natural_gums'],
    summary: 'International certification attesting that agricultural cargo has been officially inspected and is free from quarantine pests, weed seeds, and plant diseases.',
    keyRequirements: [
      'Official physical warehouse inspection by MoA quarantine officer',
      'Gas fumigation treatment certificate (for grains, pulses, coffee)',
      'Cold-chain inspection for fresh cut roses and vegetables',
      'Full scientific name of botanical species and declared destination port'
    ],
    commonPitfalls: [
      'Failing to declare wood packaging materials (dunnage, pallets); pallets must be ISPM-15 heat-treated or stamped!',
      'Certificate date issuing after the Bill of Lading onboard date (violates IPPC international rules).'
    ],
    proTip: 'Request phytosanitary inspection 48 hours before loading into containers; ensure the consignee name exactly matches your Commercial Invoice and L/C.',
    sampleTemplateSnippet: `FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA - MINISTRY OF AGRICULTURE
PHYTOSANITARY CERTIFICATE (IPPC Model)
Certificate No: ET/AG/PHYTO/2026/09931
Botanical Name: Coffea arabica L.
Quantity Declared: 19,200 Kgs (320 Jute Bags)
Distinguishing Marks: "GUJI SPECIALTY LOT #4 - DJIBOUTI IN TRANSIT"
Treatment: Phosphine (Aluminium Phosphide) Fumigation @ 3g/m³ for 72 hrs
DECLARATION: Cargo inspected and deemed free from quarantine pests.`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-esw-flowchart'
  },
  {
    id: 'doc-veterinary-health',
    name: 'National Veterinary Health & Quarantine Certificate',
    amharicName: 'የእንስሳት ጤናና ኳራንቲን ምርመራ ሰርተፊኬት',
    stage: 'inspection',
    stageTitle: 'Phase 2: Technical Inspection, Quality & Quarantine Certificates',
    issuingAuthority: 'Ministry of Agriculture (Veterinary Services Directorate)',
    legalBasis: 'Animal Disease Control & Prevention Proclamation',
    estimatedTurnaround: '12–24 Hours at export abattoir',
    officialFee: '1,000–2,500 ETB per consignment',
    isMandatory: true,
    applicableCommodities: ['meat_livestock'],
    summary: 'Mandatory veterinary clearance certifying ante-mortem animal health, post-mortem carcass sanitation, and disease-free origin status.',
    keyRequirements: [
      'Animals sourced from designated disease-free quarantine zones (e.g. Borana, Afar, Somali)',
      'Ante-mortem veterinary inspection within 24 hours prior to slaughter',
      'Slaughter executed in MoA accredited export abattoir under resident vet supervision',
      'Chilling regime maintained at 0°C to +2°C carcass core temperature'
    ],
    commonPitfalls: [
      'Any breakdown in cold chain during airport tarmac transit at Bole causing carcass spoilage.',
      'Exporting from non-accredited slaughter facilities.'
    ],
    proTip: 'Chilled carcass flights to Dubai and Riyadh depart primarily between 11 PM and 3 AM; coordinate abattoir chilling and airport customs clearance to occur within 6 hours of flight takeoff.',
    sampleTemplateSnippet: `MINISTRY OF AGRICULTURE - VETERINARY HEALTH CERTIFICATE
Certificate No: ET/VET/MEAT/2026/7821
Product: Chilled Goat Carcass (Whole, Skin-off)
Quantity: 12,500 Kgs (Approx 1,150 Carcasses)
Source: Export Abattoir Bishoftu (Accreditation No: ET-AB-03)
Temperature at Loading: +1.2°C Core Carcass Temp
CERTIFICATION: Sourced from herds free from Foot and Mouth Disease (FMD) and Peste des Petits Ruminants (PPR).`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-ecc-tariff'
  },
  {
    id: 'doc-halal-certificate',
    name: 'Official Halal Slaughter & Processing Certificate',
    amharicName: 'የሀላል እርድና ዝግጅት ማረጋገጫ ሰርተፊኬት',
    stage: 'inspection',
    stageTitle: 'Phase 2: Technical Inspection, Quality & Quarantine Certificates',
    issuingAuthority: 'Ethiopian Islamic Affairs Supreme Council & Recognized Halal Bodies',
    legalBasis: 'GCC Standardization Organization (GSO 993: Halal Animal Slaughtering)',
    estimatedTurnaround: 'Same day with abattoir processing',
    officialFee: '500–1,000 ETB per batch',
    isMandatory: true,
    applicableCommodities: ['meat_livestock'],
    applicableDestinations: ['gcc_middle_east', 'standard_row'],
    summary: 'Certifies that slaughter was performed strictly in compliance with Islamic Shariah law by licensed Muslim slaughterers.',
    keyRequirements: [
      'Slaughter performed by certified Muslim slaughterman invoking "Bismillah Allahu Akbar"',
      'No stunning or mechanical severance of spinal cord prior to bleeding',
      'Sanitary knife hygiene and total drain of blood',
      'Signed and stamped Halal seal on every shipping box and carcass tag'
    ],
    commonPitfalls: [
      'Missing Halal seal on carton exterior; Middle Eastern customs (SFDA / Dubai Municipality) will reject entire air cargo consignment immediately!',
      'Using non-accredited private Halal stamps not recognized by UAE MoIAT or Saudi SFDA.'
    ],
    proTip: 'Ensure your export abattoir’s Halal license is pre-registered on the UAE National Halal System (halal.gov.ae) and Saudi Arabia’s Halal Center portal.',
    sampleTemplateSnippet: `ETHIOPIAN ISLAMIC AFFAIRS SUPREME COUNCIL - HALAL DIRECTORATE
HALAL SLAUGHTER CERTIFICATE
Certificate No: EIASC/HALAL/2026/1104
Slaughter Facility: Modjo Modern Export Abattoir
Slaughter Date: 14 Shawwal 1447 / April 2026
Consignment: 800 Chilled Sheep Carcasses (Wrapped in sterile stockinette)
Attestation: Slaughter conducted according to Islamic Sharia (GSO 2055-1 / GSO 993 standards).`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-ecc-tariff'
  },
  {
    id: 'doc-esw-esad-export',
    name: 'Ethiopian Single Window e-SAD Export Declaration',
    amharicName: 'የኢትዮጵያ ነጠላ መስኮት (ESW) የወጪ ጉምሩክ ዲክላራሲዮን (e-SAD)',
    stage: 'customs',
    stageTitle: 'Phase 3: Ethiopian Customs & Single Window Clearance',
    issuingAuthority: 'Ethiopian Customs Commission (ECC) via trade.esw.et',
    legalBasis: 'Customs Proclamation No. 859/2014 & Electronic Single Window Directives',
    estimatedTurnaround: '2–6 Hours online submission',
    officialFee: 'ECC Scanning & Processing Fee (approx 0.07% or 1,200 ETB)',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers', 'meat_livestock',
      'textiles_garments', 'leather_goods', 'spices_herbs', 'natural_gums',
      'minerals_precious', 'processed_manufactured'
    ],
    summary: 'The paperless Single Administrative Document (e-SAD) filed electronically on the national single window portal connecting customs, banks, and OGAs.',
    keyRequirements: [
      'Bank Foreign Exchange Permit matching proforma invoice and TIN profile',
      'Upload of Commercial Invoice, Detailed Packing List, and OGA clearance approvals',
      'Designated transit route (e.g. Indode/Mojo dry port to Port of Djibouti / Bole Cargo Hub)',
      'Customs channel routing assessment: Green (immediate e-release), Yellow (document check), Red (physical scan/tally)'
    ],
    commonPitfalls: [
      'FOB price in e-SAD not matching the bank proforma permit amount down to the exact cent.',
      'Gross weight discrepancy between e-SAD entry and truck weighbridge slip at Mojo or Galafi border.'
    ],
    proTip: 'Exports from Ethiopia enjoy 0% Customs Duty and 0% Surtax; verify your declarant selects the correct exemption regime code (e.g., EX1 for direct definitive export).',
    sampleTemplateSnippet: `ETHIOPIAN CUSTOMS COMMISSION - ELECTRONIC SINGLE ADMINISTRATIVE DOCUMENT (e-SAD)
Declaration No: ECC/AA/EXP/2026/041187
Declarant Code: DCA-0428 (Licensed Transit Clearing Agent)
Exporter TIN: 0048192014
Customs Station: INDODE MULTIMODAL FREIGHT TERMINAL
Customs Procedure: 10 00 (Definitive Commercial Export)
Duty & Tax Payable: 0.00 ETB (Exempt Under National Export Incentive Scheme)
Channel Routing: BLUE / GREEN (AUTOMATED CUSTOMS RELEASE ORDER GENERATED)`,
    courseChapterRef: 3,
    resourceDocRefId: 'res-esw-flowchart'
  },
  {
    id: 'doc-commercial-invoice',
    name: 'Final Commercial Export Invoice (FOB / C&F / CIF)',
    amharicName: 'የመጨረሻ የውጭ ንግድ የሽያጭ ደረሰኝ (ኮሜርሻል ኢንቮይስ)',
    stage: 'customs',
    stageTitle: 'Phase 3: Ethiopian Customs & Single Window Clearance',
    issuingAuthority: 'Exporter (on Official Corporate Letterhead)',
    legalBasis: 'International Commercial Law & ICC Incoterms 2020 Rules',
    estimatedTurnaround: 'Immediate by Exporter',
    officialFee: 'Internal corporate documentation (Free)',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers', 'meat_livestock',
      'textiles_garments', 'leather_goods', 'spices_herbs', 'natural_gums',
      'minerals_precious', 'processed_manufactured'
    ],
    summary: 'The fundamental commercial accounting instrument detailing the financial contract, unit price, quantity, total value in foreign currency, and delivery Incoterm.',
    keyRequirements: [
      'Exact seller details (TIN, registered address, telephone, email in Addis Ababa)',
      'Overseas buyer full name, corporate registration, and delivery destination',
      'Clear specification of Incoterms 2020 (e.g., "FOB Djibouti", "CIF Hamburg", "CPT Bole Airport")',
      'Full bank remittance coordinates matching the issuing L/C or authorized bank permit',
      'Itemized HS codes, unit measurements (MT, Kgs, Pcs), and currency denomination'
    ],
    commonPitfalls: [
      'Inconsistent Incoterm terms (e.g., listing "FOB Addis Ababa" when ocean freight is involved; maritime FOB applies strictly to port of loading like FOB Djibouti).',
      'Missing country of origin declaration: "Goods of Ethiopian Origin".'
    ],
    proTip: 'Always state on the bottom of the invoice: "We hereby certify that this invoice is true and correct and that the goods are wholly of Ethiopian origin."',
    sampleTemplateSnippet: `COMMERCIAL INVOICE #GRV-EXP-2026-004
Date: 14 April 2026 | Ref: L/C No. DC2026/HAMB/0814
Seller: Rift Valley Origin Exports PLC, Bole Subcity, Addis Ababa, Ethiopia (TIN: 0048192014)
Buyer: Hanseatic Coffee Importers GmbH, Am Sandtorkai 48, 20457 Hamburg, Germany
Commodity: Ethiopian Washed Arabica Coffee Beans, Grade 1 Guji Shakiso
Quantity: 19,200.00 Kgs (320 GrainPro-lined Jute Bags)
Unit Price: $6.85 USD / Kg FOB Djibouti
TOTAL AMOUNT PAYABLE: $131,520.00 USD
Payment Terms: 100% by Irrevocable Letter of Credit at Sight
Origin: Federal Democratic Republic of Ethiopia`,
    courseChapterRef: 14,
    resourceDocRefId: 'res-cost-template'
  },
  {
    id: 'doc-packing-list',
    name: 'Detailed Packing List & Container Tally Sheet',
    amharicName: 'ዝርዝር የማሸጊያና ጭነት ሉህ (ፓኪንግ ሊስት)',
    stage: 'customs',
    stageTitle: 'Phase 3: Ethiopian Customs & Single Window Clearance',
    issuingAuthority: 'Exporter & Warehouse Stuffing Supervisor',
    legalBasis: 'Standard Shipping Documentation Practice',
    estimatedTurnaround: 'Immediate upon container stuffing',
    officialFee: 'Internal corporate documentation (Free)',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers', 'meat_livestock',
      'textiles_garments', 'leather_goods', 'spices_herbs', 'natural_gums',
      'minerals_precious', 'processed_manufactured'
    ],
    summary: 'Specifies the exact dimensions, net weight, gross weight, tare weight, container numbers, seal numbers, and package marks for customs and port handlers.',
    keyRequirements: [
      'Itemized bag-by-bag or carton-by-carton breakdown',
      'Net weight, tare weight of packaging, and total gross weight in kilograms or metric tons',
      'Container number (e.g., MSKU-419205-2) and high-security bolt seal numbers',
      'Shipping marks clearly stenciled on outside of packaging matching the bill of lading'
    ],
    commonPitfalls: [
      'Discrepancy between gross weight on packing list and the certified gross mass (VGM) container weighbridge ticket.',
      'Forgetting to list individual carton piece counts for garments or footwear.'
    ],
    proTip: 'Always prepare the packing list simultaneously with the weighbridge weigh-in at the warehouse so your figures match customs scanning readouts exactly.',
    sampleTemplateSnippet: `EXPORT PACKING LIST & CONTAINER TALLY
Invoice Ref: GRV-EXP-2026-004 | Vessel: MSC BEATRICE V.2604
Container No: MSKU-419205-2 (20ft Dry Box) | Seal No: ETH-CUSTOMS-88192
Package: 320 Bags of 60 Kg Net each (Jute bags with GrainPro hermetic liners)
Net Weight: 19,200.00 Kgs
Tare Weight (Bags & Pallets): 352.00 Kgs
Container Tare Weight: 2,230.00 Kgs
VERIFIED GROSS MASS (VGM): 21,782.00 Kgs
Shipping Marks: "GRV / HAMBURG / GUJI G1 / BAGS 001-320 / ETHIOPIA"`,
    courseChapterRef: 14,
    resourceDocRefId: 'res-cost-template'
  },
  {
    id: 'doc-coo-eccsa',
    name: 'Certificate of Origin (Chamber of Commerce - ECCSA)',
    amharicName: 'የኢትዮጵያ ንግድና ዘርፍ ማህበራት ምክር ቤት የትውልድ አገር ሰርተፊኬት',
    stage: 'origin',
    stageTitle: 'Phase 4: Origin & Preferential Trade Documentation',
    issuingAuthority: 'Ethiopian Chamber of Commerce and Sectoral Associations (ECCSA)',
    legalBasis: 'International Chamber of Commerce & ECCSA Proclamation',
    estimatedTurnaround: 'Same day (2–4 hours)',
    officialFee: '300–800 ETB per certificate',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers', 'meat_livestock',
      'textiles_garments', 'leather_goods', 'spices_herbs', 'natural_gums',
      'minerals_precious', 'processed_manufactured'
    ],
    summary: 'The internationally recognized legal certificate verifying that the goods were produced, harvested, or manufactured inside the Federal Democratic Republic of Ethiopia.',
    keyRequirements: [
      'Copy of final Commercial Invoice and Packing List',
      'Renewed Chamber of Commerce enterprise membership',
      'Declaration of origin criteria (wholly produced or substantial transformation)',
      'Verification of producer origin within Ethiopian territory'
    ],
    commonPitfalls: [
      'Spelling discrepancies between exporter name on Chamber certificate and issuing bank L/C.',
      'Applying for standard Chamber COO when the buyer specifically requested a preferential scheme (EUR.1 or AfCFTA).'
    ],
    proTip: 'If exporting to the EU, UK, or COMESA, check whether a preferential certificate is required; standard Chamber COO does not grant preferential tariff reductions by itself.',
    sampleTemplateSnippet: `ETHIOPIAN CHAMBER OF COMMERCE AND SECTORAL ASSOCIATIONS
CERTIFICATE OF ORIGIN (Standard Form)
Certificate No: ECCSA/COO/2026/18420
1. Consignor: Rift Valley Origin Exports PLC, Addis Ababa, Ethiopia
2. Consignee: Hanseatic Coffee Importers GmbH, Hamburg, Germany
3. Means of Transport: Multimodal Sea Freight via Port of Djibouti
4. Description: 320 Bags of Washed Ethiopian Arabica Coffee Beans
CERTIFICATION: It is hereby certified that the goods originated in ETHIOPIA.`,
    courseChapterRef: 14,
    resourceDocRefId: 'res-coffee-checklist'
  },
  {
    id: 'doc-eur1-movement',
    name: 'EUR.1 Movement Certificate (EU Everything But Arms / EBA)',
    amharicName: 'የአውሮፓ ህብረት ከቀረጥ ነፃ የንግድ ሰርተፊኬት (EUR.1)',
    stage: 'origin',
    stageTitle: 'Phase 4: Origin & Preferential Trade Documentation',
    issuingAuthority: 'Ethiopian Customs Commission (ECC)',
    legalBasis: 'European Union Generalized System of Preferences (GSP / EBA)',
    estimatedTurnaround: '24 Hours with customs export declaration',
    officialFee: 'Government Stamp Fee (approx 200–500 ETB)',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers',
      'textiles_garments', 'leather_goods', 'natural_gums'
    ],
    applicableDestinations: ['eu'],
    summary: 'Preferential movement certificate enabling goods of Ethiopian origin to enter the European Union with 0% customs import duty under the Everything But Arms (EBA) agreement.',
    keyRequirements: [
      'Approved customs e-SAD export declaration at Ethiopian Customs',
      'Direct consignment rule: cargo must travel directly or under customs bond through Djibouti without being altered in third countries',
      'Evidence that goods meet rules of origin criteria (wholly obtained in Ethiopia)'
    ],
    commonPitfalls: [
      'Failing to obtain the official customs stamp in Box 11 of the EUR.1 form; European port customs will charge full MFN tariffs without the stamp!',
      'Altering shipping marks after certificate issuance.'
    ],
    proTip: 'Always get your EUR.1 stamped at the same time your customs release order is issued at Indode or Mojo dry port.',
    sampleTemplateSnippet: `MOVEMENT CERTIFICATE EUR.1
Certificate No: A 928410
1. Exporter: Rift Valley Origin Exports PLC, Addis Ababa
2. Certificate Used In Preferential Trade Between: ETHIOPIA and EUROPEAN UNION
3. Consignee: Hanseatic Coffee Importers GmbH, Hamburg
4. Country of Origin: ETHIOPIA | Country of Destination: GERMANY
CUSTOMS ENDORSEMENT: Declaration certified, goods inspected and origin approved.`,
    courseChapterRef: 14,
    resourceDocRefId: 'res-esw-flowchart'
  },
  {
    id: 'doc-afcfta-coo',
    name: 'AfCFTA Certificate of Origin (Intra-African Trade)',
    amharicName: 'የአፍሪካ አህጉራዊ ነፃ የንግድ ቀጠና (AfCFTA) የትውልድ አገር ሰርተፊኬት',
    stage: 'origin',
    stageTitle: 'Phase 4: Origin & Preferential Trade Documentation',
    issuingAuthority: 'Ministry of Trade & Regional Integration / Ethiopian Customs',
    legalBasis: 'AfCFTA Protocol on Trade in Goods & Rules of Origin Regulations',
    estimatedTurnaround: '1–2 Working Days',
    officialFee: '500 ETB per certificate',
    isMandatory: true,
    applicableCommodities: [
      'textiles_garments', 'leather_goods', 'processed_manufactured',
      'coffee', 'spices_herbs'
    ],
    applicableDestinations: ['afcfta_africa'],
    summary: 'The revolutionary continental certificate allowing Ethiopian manufactured and value-added goods to enter partner African nations at 0% or phased-down tariffs.',
    keyRequirements: [
      'Exporter registered under the national AfCFTA registry',
      'Value addition criteria: minimum local value addition or substantial transformation criteria fulfilled',
      'Verification of non-originating raw material thresholds'
    ],
    commonPitfalls: [
      'Exporting to an African country that has not yet deposited its AfCFTA operational instruments.',
      'Re-exporting imported finished goods without sufficient domestic transformation.'
    ],
    proTip: 'AfCFTA provides immense duty savings for Ethiopian garment and footwear exports into Kenya, Ghana, and South Africa compared to standard MFN tariffs.',
    sampleTemplateSnippet: `AFRICAN CONTINENTAL FREE TRADE AREA (AfCFTA)
CERTIFICATE OF ORIGIN
Certificate No: ET/AfCFTA/2026/00492
Exporter: Ethio-Industrial Apparel PLC, Hawassa Industrial Park
Originating Country: ETHIOPIA | Destination State: KENYA
Criterion: Wholly Obtained / Substantial Transformation (Textile Apparel)
Tariff Preference: 0% Duty under AfCFTA Phase 1 Schedule`,
    courseChapterRef: 14,
    resourceDocRefId: 'res-ecc-tariff'
  },
  {
    id: 'doc-ico-coffee-coo',
    name: 'International Coffee Organization (ICO) Certificate of Origin',
    amharicName: 'የአለም አቀፍ ቡና ድርጅት (ICO) የትውልድ አገር ሰርተፊኬት',
    stage: 'origin',
    stageTitle: 'Phase 4: Origin & Preferential Trade Documentation',
    issuingAuthority: 'Ethiopian Coffee & Tea Authority (ECTALE) on behalf of ICO',
    legalBasis: 'International Coffee Agreement & ECTALE Directives',
    estimatedTurnaround: '24 Hours after coffee cupping release',
    officialFee: 'Included in ECTALE export service fee',
    isMandatory: true,
    applicableCommodities: ['coffee'],
    summary: 'The universal international tracking certificate required by all ICO member importing countries (USA, EU, Japan, UK) for green coffee customs clearance.',
    keyRequirements: [
      'Unique ICO Identification Mark: Country Code (010 for Ethiopia) / Exporter ID / Lot Number (e.g., 010/412/0892)',
      'Specification of botanical variety (Arabica), processing method (Washed or Natural), and crop year',
      'Port of shipment (Djibouti) and port of discharge'
    ],
    commonPitfalls: [
      'Stenciling a different ICO mark on the jute bags than what is printed on the official ICO certificate.',
      'Attempting to clear coffee through European ports without this certificate will cause immediate impoundment.'
    ],
    proTip: 'The 3-digit prefix for Ethiopia on all ICO certificates is always "010". Double check that the ICO lot number is identical across your Bill of Lading, Invoice, and Phytosanitary Certificate.',
    sampleTemplateSnippet: `INTERNATIONAL COFFEE ORGANIZATION (ICO)
CERTIFICATE OF ORIGIN
ICO Mark: 010 / 0412 / 2026-004
Country of Production: ETHIOPIA (Code: 010)
Type: ARABICA (Green / Raw Beans) | Method: WASHED
Crop Year: 2025/2026 | Net Weight: 19,200 Kgs (320 Bags)
Port of Loading: PORT OF DJIBOUTI | Port of Discharge: HAMBURG`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-coffee-checklist'
  },
  {
    id: 'doc-bill-of-lading',
    name: 'Multimodal Ocean Bill of Lading (ESLSE / Shipping Carrier)',
    amharicName: 'የባህር ማጓጓዣ ሰነድ (ቢል ኦፍ ሌዲንግ - B/L)',
    stage: 'shipping',
    stageTitle: 'Phase 5: Transport, Shipping & Financial Settlement Documents',
    issuingAuthority: 'Ethiopian Shipping & Logistics Services Enterprise (ESLSE) / Ocean Carrier',
    legalBasis: 'Maritime Code & International Carriage of Goods by Sea Act',
    estimatedTurnaround: '24–48 Hours after container vessel departure from Djibouti',
    officialFee: 'Included in Freight contract',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'textiles_garments', 'leather_goods',
      'spices_herbs', 'natural_gums', 'processed_manufactured'
    ],
    applicableTransports: ['sea_multimodal'],
    summary: 'The supreme document of title in international maritime trade. Serves as a receipt of goods, evidence of the contract of carriage, and document of ownership.',
    keyRequirements: [
      'Clean On Board notation (no cargo damage or packaging defects noted by shipmaster)',
      'Shipped on board date falling strictly within the validity of the Letter of Credit',
      'Consignee clause: "To Order of [Issuing Bank]" for L/C or direct buyer name for CAD',
      'Freight clause clearly stated: "Freight Prepaid" (if CFR/CIF) or "Freight Collect" (if FOB)'
    ],
    commonPitfalls: [
      'Late shipment: Container loaded onto vessel 2 days after the L/C latest shipment date; bank will flag fatal discrepancy and delay payment!',
      'Dirty Bill of Lading: Mate’s receipt noting "stained jute bags" or "damaged seal".'
    ],
    proTip: 'Under Ethiopian practice, choose ESLSE multimodal service if you want to stuff containers directly in Mojo dry port and receive an inland multimodal B/L before arriving at Djibouti port.',
    sampleTemplateSnippet: `MULTIMODAL TRANSPORT BILL OF LADING
B/L No: ESLSE/DJI/HAM/2026/8912
Shipper: Rift Valley Origin Exports PLC, Addis Ababa, Ethiopia
Consignee: TO ORDER OF COMMERZBANK AG, HAMBURG (L/C REF: DC2026/0814)
Notify Party: Hanseatic Coffee Importers GmbH, Hamburg
Port of Loading: DJIBOUTI (DORALEH CONTAINER TERMINAL)
Port of Discharge: HAMBURG, GERMANY
Container: MSKU-419205-2 (1 x 20ft) / 320 Bags / 19,200 Kgs
CLEAN ON BOARD VESSEL MSC BEATRICE - FREIGHT PREPAID`,
    courseChapterRef: 8,
    resourceDocRefId: 'res-corridor-guide'
  },
  {
    id: 'doc-airway-bill',
    name: 'Air Waybill (AWB - Ethiopian Airlines Cargo)',
    amharicName: 'የአየር ጭነት ማጓጓዣ ሰነድ (ኤር ዌይ ቢል - AWB)',
    stage: 'shipping',
    stageTitle: 'Phase 5: Transport, Shipping & Financial Settlement Documents',
    issuingAuthority: 'Ethiopian Airlines Cargo & Logistics Services',
    legalBasis: 'IATA Master Air Waybill Standards & Warsaw/Montreal Conventions',
    estimatedTurnaround: 'Issued immediately at Bole Cargo Hub acceptance',
    officialFee: 'Included in Airfreight charges',
    isMandatory: true,
    applicableCommodities: [
      'horticulture_flowers', 'meat_livestock', 'minerals_precious', 'coffee'
    ],
    applicableTransports: ['air_cargo'],
    summary: 'Non-negotiable transport document covering air carriage from Bole International Airport to destination international airport.',
    keyRequirements: [
      '11-digit AWB number starting with prefix "071" (Ethiopian Airlines airline code)',
      'Temperature handling instructions (e.g. "+2°C to +4°C Keep Cool" for flowers and chilled meat)',
      'Flight number and scheduled date of departure',
      'Declared value for carriage and declared value for customs'
    ],
    commonPitfalls: [
      'Failure to specify temperature maintenance on the face of the AWB for perishables.',
      'Gross weight discrepancy between Bole cargo scale and commercial packing list.'
    ],
    proTip: 'Ethiopian Airlines flight prefix 071 allows real-time web tracking of cold-hub status from Addis Ababa to Amsterdam, Dubai, or Brussels.',
    sampleTemplateSnippet: `ETHIOPIAN AIRLINES CARGO - MASTER AIR WAYBILL
AWB No: 071 - 8492 1042
Shipper: Red Sea Flower Exporters PLC, Bishoftu, Ethiopia
Consignee: Floral Dutch Auction BV, Aalsmeer, The Netherlands
Airport of Departure: ADD (ADDIS ABABA BOLE INTL)
Airport of Destination: AMS (AMSTERDAM SCHIPHOL)
Flight: ET 702 / Date: 16 APR 2026
Cargo: 480 Boxes Fresh Cut Roses / 4,800 Kgs Gross
Special Handling: PERISHABLE CARGO - MAINTAIN TEMP +2°C TO +4°C`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-corridor-guide'
  },
  {
    id: 'doc-fumigation-cert',
    name: 'Gas Fumigation Treatment Certificate',
    amharicName: 'የመርዝ ጢስ ማጨስ (ፉሚጌሽን) የፀረ-ተባይ ሰርተፊኬት',
    stage: 'inspection',
    stageTitle: 'Phase 2: Technical Inspection, Quality & Quarantine Certificates',
    issuingAuthority: 'Licensed Pest Control Operator (Certified by MoA)',
    legalBasis: 'International Plant Protection Convention (ISPM No. 12)',
    estimatedTurnaround: '48–72 Hours (includes gas exposure time)',
    officialFee: '1,500–3,500 ETB per 20ft container',
    isMandatory: true,
    applicableCommodities: ['coffee', 'oilseeds_pulses', 'spices_herbs', 'natural_gums'],
    summary: 'Attests that containerized agricultural cargo has undergone hermetic gas fumigation to eliminate live insects, weevils, and larvae before ocean transit.',
    keyRequirements: [
      'Treatment chemical: Aluminium Phosphide (Phosphine gas @ 3g/m³) or Methyl Bromide',
      'Exposure duration: Minimum 72 hours gas containment',
      'Temperature during treatment (minimum 15°C)',
      'Post-treatment aeration safety clearance'
    ],
    commonPitfalls: [
      'Stuffing containers and opening doors before mandatory 72-hour gas exposure is completed.',
      'Using unapproved chemical dosages rejected by destination country customs.'
    ],
    proTip: 'Fumigation should be carried out after goods are stuffed inside the container and doors are closed, with gas warning warning placards affixed.',
    sampleTemplateSnippet: `CERTIFICATE OF FUMIGATION & PEST CONTROL
Certificate No: ET/PEST/2026/0412
Target Cargo: 1 x 20ft Container (MSKU-419205-2) / 320 Bags Coffee
Chemical Used: Aluminium Phosphide (Phostoxin Tablets)
Dosage: 3.0 g / m³ Active Phosphine Gas
Exposure Period: 72 Hours at Ambient Temperature 22°C
Result: Inspected and found 100% free of live insect infestation.`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-coffee-checklist'
  },
  {
    id: 'doc-bank-negotiation-notice',
    name: 'Bank Shipping Document Dispatch Advice & Courier Airwaybill',
    amharicName: 'የባንክ ሰነድ ማስተላለፊያ ማሳወቂያና የዲኤችኤል መላኪያ ደረሰኝ',
    stage: 'banking',
    stageTitle: 'Phase 5: Transport, Shipping & Financial Settlement Documents',
    issuingAuthority: 'Commercial Bank of Ethiopia / Authorized Negotiating Bank',
    legalBasis: 'ICC Uniform Customs and Practice for Documentary Credits (UCP 600)',
    estimatedTurnaround: '2–3 Working Days after document presentation',
    officialFee: 'SWIFT & Courier Fee (approx 3,000–6,000 ETB + VAT)',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers', 'meat_livestock',
      'textiles_garments', 'leather_goods', 'spices_herbs', 'natural_gums',
      'minerals_precious', 'processed_manufactured'
    ],
    summary: 'The negotiating commercial bank in Addis Ababa examines shipping documents for UCP 600 compliance and dispatches them via secure DHL courier to the foreign issuing bank.',
    keyRequirements: [
      'Full set of original shipping documents (3/3 original B/Ls, Commercial Invoice, Packing List, Certificates)',
      'Presented within the stipulated presentation period (typically 21 days from B/L date)',
      'Document schedule listing all enclosures and courier tracking number'
    ],
    commonPitfalls: [
      'Typographical discrepancy between invoice and L/C text (e.g., "Washed Guji" vs "Washed Arabica Guji").',
      'Late presentation past the 21-day limit.'
    ],
    proTip: 'Always request your bank officer to provide the DHL/FedEx tracking number within 24 hours of dispatch so you can monitor foreign bank receipt.',
    sampleTemplateSnippet: `COMMERCIAL BANK OF ETHIOPIA - TRADE SERVICE DEPARTMENT
DOCUMENTARY COLLECTION / L/C PRESENTATION SCHEDULE
Ref: EXP/DOC/2026/0912 | Date: 20 April 2026
To: COMMERZBANK AG, TRADE OPERATIONS, HAMBURG, GERMANY
Enclosures: 3/3 Original Ocean B/Ls, 3x Commercial Invoice, 3x Packing List, 1x EUR.1, 1x ICO COO, 1x Phyto
Courier Dispatch Ref: DHL EXPRESS AWB #4819-2041-92
Value: $131,520.00 USD under L/C No. DC2026/HAMB/0814`,
    courseChapterRef: 14,
    resourceDocRefId: 'res-nbe-forex'
  },
  {
    id: 'doc-fxd-retention-credit',
    name: 'NBE 50% Foreign Exchange Retention Account (FXD) Credit Voucher',
    amharicName: 'የብሔራዊ ባንክ የ50% የውጭ ምንዛሬ ማቆያ (ሪቴንሽን) ክሬዲት ቫውቸር',
    stage: 'banking',
    stageTitle: 'Phase 5: Transport, Shipping & Financial Settlement Documents',
    issuingAuthority: 'Commercial Bank Foreign Operations & NBE',
    legalBasis: 'National Bank of Ethiopia Directive No. FXD/83/2021 & Recent FX Reforms',
    estimatedTurnaround: '24 Hours after foreign currency repatriation',
    officialFee: 'Bank statutory retention crediting (Free)',
    isMandatory: true,
    applicableCommodities: [
      'coffee', 'oilseeds_pulses', 'horticulture_flowers', 'meat_livestock',
      'textiles_garments', 'leather_goods', 'spices_herbs', 'natural_gums',
      'minerals_precious', 'processed_manufactured'
    ],
    summary: 'The financial jackpot of Ethiopian export trade: 50% of your gross export proceeds are credited into your hard currency retention account for your own imports or authorized sale.',
    keyRequirements: [
      'Incoming foreign currency SWIFT wire (MT103) successfully settled',
      'NBE statutory distribution: 50% retained indefinitely in hard currency (USD/EUR) by exporter; 50% converted to ETB at prevailing daily benchmark rate',
      'Bank issues official FXD Credit Advice for company tax and accounting records'
    ],
    commonPitfalls: [
      'Failure to monitor bank exchange rates applied to the 50% ETB conversion portion.',
      'Not using retained hard currency to fund high-margin imports of capital goods or raw materials.'
    ],
    proTip: 'Your retained 50% foreign exchange balance can be utilized to open your own import L/Cs with ZERO queue time and ZERO currency risk!',
    sampleTemplateSnippet: `COMMERCIAL BANK OF ETHIOPIA - FX RETENTION CREDIT ADVICE
Account Name: Rift Valley Origin Exports PLC
Retention Account No: 1000-8491-0294 (USD FOREX RETENTION)
Incoming Remittance: $131,520.00 USD (from Commerzbank Hamburg)
1. 50% CREDITED TO HARD CURRENCY RETENTION: $65,760.00 USD
2. 50% CONVERTED TO ETB @ 160.05 ETB/USD: 10,524,888.00 ETB
STATUS: FUNDS AVAILABLE FOR IMPORT L/C OPENING OR STRATEGIC USE`,
    courseChapterRef: 14,
    resourceDocRefId: 'res-nbe-forex'
  },
  {
    id: 'doc-mines-export-permit',
    name: 'Ministry of Mines Export Permit & NBE Assay Certificate',
    amharicName: 'የማዕድን ሚኒስቴር የወጪ ንግድ ፈቃድና የብሔራዊ ባንክ የትንታኔ ሰርተፊኬት',
    stage: 'inspection',
    stageTitle: 'Phase 2: Technical Inspection, Quality & Quarantine Certificates',
    issuingAuthority: 'Ministry of Mines and Petroleum / National Bank of Ethiopia',
    legalBasis: 'Mining Operations Proclamation & Precious Minerals Directives',
    estimatedTurnaround: '3–5 Working Days',
    officialFee: 'Assay fee (approx 2,500–5,000 ETB) + Royalty verification',
    isMandatory: true,
    applicableCommodities: ['minerals_precious'],
    summary: 'Rigorous government assay laboratory valuation, weighing, and security sealing required for precious minerals, emeralds, opals, and industrial minerals.',
    keyRequirements: [
      'Mining license or authorized mineral dealer permit',
      'Laboratory assay analysis testing gold purity (carats/fineness) or gemstone carat weight',
      'Royalty tax payment receipt issued by Ministry of Mines',
      'Sealing of parcel in presence of federal customs and police escorts'
    ],
    commonPitfalls: [
      'Transporting rough gemstones to Bole airport without official tamper-evident Ministry seal; triggers immediate criminal confiscation.',
      'Valuation discrepancies between declared field weight and laboratory assay weight.'
    ],
    proTip: 'For commercial artisanal gold, sell directly to the National Bank of Ethiopia to benefit from the special premium bonus margin above international spot prices.',
    sampleTemplateSnippet: `MINISTRY OF MINES AND PETROLEUM - MINERAL EXPORT CERTIFICATE
Permit No: MOMP/MIN/EXP/2026/0192
Mineral Type: Natural Rough Emeralds (Shakiso / Seba Boru Deposit)
Total Weight: 4,250 Carats (Certified by Ministry Gemological Lab)
Assessed Export Valuation: $182,500.00 USD
Royalty Paid: 5% (Receipt #REV-MIN-99182)
Security Seal No: FDRE-MIN-SECURITY-0084 (Tamper-evident metal container)`,
    courseChapterRef: 13,
    resourceDocRefId: 'res-ecc-tariff'
  }
];
