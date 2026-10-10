import {
  IncotermCode,
  IncotermDefinition,
  SupplyChainStage,
  SupplyChainStageId,
  IncotermCaseStudy
} from '../types';

export const SUPPLY_CHAIN_STAGES: SupplyChainStage[] = [
  {
    id: 'packaging',
    stepNumber: 1,
    title: '1. Export Packaging, Marking & Palletization',
    shortTitle: 'Packaging & Marking',
    iconName: 'Package',
    location: "Seller's Factory / Premises",
    description: 'Proper export-grade packing, moisture-proofing, crate marking, and preparation for international transport.',
    ethiopianCorridorDetail: 'For exports (e.g., Grade 1 washed coffee), involves GrainPro liner bags and jute outer sacks complying with Ethiopian Coffee & Tea Authority standards. For imports, sea-worthy containerized packing.'
  },
  {
    id: 'pre_carriage',
    stepNumber: 2,
    title: '2. Inland Pre-Carriage to Departure Point',
    shortTitle: 'Inland Pre-Carriage',
    iconName: 'Truck',
    location: 'Origin Country Road / Rail',
    description: 'Transport of goods from the production facility or seller warehouse to the departure port, airport, or inland container depot (ICD).',
    ethiopianCorridorDetail: 'For Ethiopian exports, trucking from regional washing stations (Sidama, Yirgacheffe, Jimma) or factories to Mojo Dry Port or Bole Airport Cargo Terminal.'
  },
  {
    id: 'export_clearance',
    stepNumber: 3,
    title: '3. Export Customs Clearance & Regulatory Formalities',
    shortTitle: 'Export Clearance',
    iconName: 'FileCheck',
    location: 'Origin Customs Border / Electronic Single Window',
    description: 'Filing export declaration, paying export levies, securing phytosanitary/quality inspection certificates, and customs gate-pass.',
    ethiopianCorridorDetail: 'In Ethiopia, processed through e-SW (Electronic Single Window). Requires NBE Export Permit (Form NBE-F-01), MoTRI clearance, and sector approvals. Foreign entities cannot execute this directly without an Ethiopian trade license.'
  },
  {
    id: 'origin_terminal',
    stepNumber: 4,
    title: '4. Origin Terminal Handling Charges (OTHC) & Port Gate',
    shortTitle: 'Origin Terminal (OTHC)',
    iconName: 'Building2',
    location: 'Port of Loading / Airport Cargo Terminal',
    description: 'Handling charges inside the port of origin, wharfage, container yard movement, and customs inspection staging.',
    ethiopianCorridorDetail: 'At Port of Djibouti (Doraleh Container Terminal) for maritime exports, or origin ports (Shanghai, Ningbo, Antwerp, Mumbai) for Ethiopian imports.'
  },
  {
    id: 'loading',
    stepNumber: 5,
    title: '5. Loading on Board Vessel / Aircraft',
    shortTitle: 'Loading On Board',
    iconName: 'Ship',
    location: 'Quayside at Departure Port',
    description: 'Hoisting container/cargo past the vessel rail or loading inside aircraft hold. The historical maritime point of risk transfer.',
    ethiopianCorridorDetail: 'Critical legal milestone under FOB/CFR/CIF. Once cargo is confirmed on board, the carrier issues the "Clean on Board" Bill of Lading required by Ethiopian banks to negotiate Letters of Credit.'
  },
  {
    id: 'main_carriage',
    stepNumber: 6,
    title: '6. Main International Freight / Carriage',
    shortTitle: 'International Freight',
    iconName: 'Globe',
    location: 'International Waters / Air Corridor',
    description: 'Long-haul ocean voyage or international air cargo transit from port of origin to destination gateway.',
    ethiopianCorridorDetail: 'For Ethiopian imports, Ethiopian Maritime Authority policy reserves sea freight to ESLSE (Ethiopian Shipping and Logistics Services Enterprise). Importers pay ESLSE in Ethiopian Birr (ETB).'
  },
  {
    id: 'transit_insurance',
    stepNumber: 7,
    title: '7. Cargo Transit / Marine Insurance',
    shortTitle: 'Marine Insurance',
    iconName: 'ShieldCheck',
    location: 'Transit Protection Coverage',
    description: 'Financial indemnity against physical loss or damage during transit under Institute Cargo Clauses (A, B, or C).',
    ethiopianCorridorDetail: 'STATUTORY RULE: Ethiopian law strictly requires import marine insurance to be contracted with a licensed domestic Ethiopian insurer (e.g. Ethiopian Insurance Corporation, Awash, Nyala) in ETB. Foreign insurance is barred for NBE L/C approval.'
  },
  {
    id: 'arrival_terminal',
    stepNumber: 8,
    title: '8. Port of Djibouti Discharge & Terminal Handling (DTHC)',
    shortTitle: 'Djibouti Discharge & DTHC',
    iconName: 'Anchor',
    location: 'Port of Djibouti (Doraleh DCT / DMPT) / Bole Airport',
    description: 'Discharge of container from vessel, container yard storage, and transit port handling charges at the maritime gateway.',
    ethiopianCorridorDetail: 'Doraleh Container Terminal (DCT) charges: 8 days free storage for Ethiopian cargo. Failure to clear multimodal documents in time incurs hefty container demurrage and storage penalties payable in USD/DJF.'
  },
  {
    id: 'transit_corridor',
    stepNumber: 9,
    title: '9. Transit Corridor Documentation & Inland Transport to Ethiopia',
    shortTitle: 'Djibouti-Ethiopia Corridor',
    iconName: 'Container',
    location: 'Djibouti-Addis Corridor (Ethio-Djibouti Railway / Trucking)',
    description: 'Cross-border transit bond (T1/transit declaration), overland transport via Ethio-Djibouti Railway or heavy trucks, and transit tracking to customs dry port.',
    ethiopianCorridorDetail: 'Under ESLSE Multimodal Transport System (MTS), cargo moves under a single through Bill of Lading directly to Mojo Dry Port or Indode without individual customs clearance at Djibouti.'
  },
  {
    id: 'import_clearance',
    stepNumber: 10,
    title: '10. Ethiopian Customs Clearance, Duties & Taxes',
    shortTitle: 'Customs Clearance & Duties',
    iconName: 'Coins',
    location: 'Ethiopian Inland Dry Port (Mojo, Kality, Semera, Gelan)',
    description: 'Customs declaration (IM4), physical/scanning inspection, and assessment of Duty, Social Welfare Tax (3%), Excise, VAT (15%), Surtax, and Withholding Tax.',
    ethiopianCorridorDetail: 'Executed under Ethiopian Customs Proclamation No. 859/2014. Duty assessment is strictly assessed on customs CIF value (even if imported under FOB or EXW, Customs converts to CIF base).'
  },
  {
    id: 'final_delivery',
    stepNumber: 11,
    title: "11. Inland On-Carriage & Unloading at Buyer's Warehouse",
    shortTitle: 'Final Warehouse Delivery',
    iconName: 'Warehouse',
    location: "Buyer's Facility (Addis Ababa, Industrial Parks, Regional)",
    description: 'Transportation from dry port gate to buyer facility and de-stuffing / unloading onto factory floor or warehouse.',
    ethiopianCorridorDetail: 'Final de-stuffing. CRITICAL: If container seals are broken or goods are wet/damaged, a Joint Survey Report (JSR) with EIC/insurer surveyor must be conducted before de-stuffing to preserve insurance claim validity.'
  }
];

export const INCOTERMS_2020: IncotermDefinition[] = [
  {
    code: 'FOB',
    name: 'Free on Board',
    amharicName: 'ፍሪ ኦን ቦርድ (እስከ መርከብ ጫፍ ነጻ)',
    category: 'sea_inland_waterway',
    summary: 'The seller delivers goods on board the vessel nominated by the buyer at the named port of shipment. The undisputed benchmark Incoterm for Ethiopian maritime trade.',
    riskTransferPoint: 'Port of Loading: Exactly when goods are loaded on board the vessel at origin port (e.g., Shanghai, Ningbo, or Djibouti).',
    costTransferPoint: 'Port of Loading: Seller pays all costs up to loading on board. Buyer pays international ocean freight, marine insurance, and all onward transit.',
    splitRiskAndCost: false,
    ethiopianStatus: 'standard_import',
    ethiopianStatusLabel: 'Standard & Mandatory for Ethiopian Multimodal Imports / Primary Export Term',
    ethiopiaRegulationNotes: 'Under Ethiopian Maritime Authority directives, state and private commercial imports financed by Ethiopian commercial bank Letters of Credit (L/C) are mandated to be contracted on FOB terms. This allows freight to be booked through ESLSE (or authorized partner) and paid in local Ethiopian Birr (ETB), safeguarding scarce foreign exchange reserves. For exports (coffee, oilseeds, pulses), FOB Port of Djibouti is the prevailing global trade contract standard.',
    insuranceRequirement: 'Buyer purchases marine cargo insurance locally in Ethiopia with licensed insurers (EIC, Awash, Nyala, etc.) in ETB before L/C opening.',
    eslseRelevance: 'Primary mechanism: Importer presents FOB proforma invoice to Ethiopian commercial bank, which issues foreign exchange approval; ESLSE issues Combined Transport Bill of Lading.',
    advantages: [
      'Complies 100% with NBE foreign currency allocation guidelines and CBE documentary credits.',
      'Ocean freight is billed in Ethiopian Birr (ETB) through ESLSE, conserving foreign exchange allocations.',
      'Allows Ethiopian importers to track shipment through ESLSE multimodal tracking system directly to Mojo Dry Port.',
      'For Ethiopian exporters (FOB Djibouti), risk ends once cargo is confirmed on board the ocean vessel at Doraleh.'
    ],
    disadvantages: [
      'Strictly applicable only to maritime transport (ocean vessel); not technically compliant for multimodal container terminals (where FCA is ICC-preferred).',
      'Buyer bears transit risk during ocean voyage, port transshipment, and Djibouti-Addis corridor.',
      'Requires buyer to coordinate booking through ESLSE overseas shipping agents.'
    ],
    ethiopianPracticalAdvice: [
      'Always state named loading port clearly: e.g. "FOB Qingdao Port, China, Incoterms® 2020".',
      'Notify your overseas supplier immediately with ESLSE overseas agent contact details for container booking.',
      'Ensure the proforma invoice clearly separates FOB product price from any auxiliary freight fees.'
    ],
    proformaClauseExample: 'Delivery Terms: FOB Shanghai Port, China (Incoterms® 2020). Sea Freight to be arranged and paid by Buyer via Ethiopian Shipping and Logistics Services Enterprise (ESLSE) in Addis Ababa.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller provides export packing and palletization.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller trucks cargo to departure port.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller obtains export customs release and permits.' },
      origin_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller pays origin terminal handling charges (OTHC).' },
      loading: { cost: 'seller', risk: 'seller', notes: 'Seller pays loading on board vessel. Risk transfers once goods are safely on board.' },
      main_carriage: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays ocean freight (booked with ESLSE in ETB for Ethiopian imports).' },
      transit_insurance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer procures mandatory local marine insurance with Ethiopian insurer in ETB.' },
      arrival_terminal: { cost: 'buyer', risk: 'buyer', notes: 'Buyer covers Port of Djibouti handling and terminal charges.' },
      transit_corridor: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays corridor rail/truck freight to Mojo/Indode dry port.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays Ethiopian Customs Commission duties, excise, VAT, surtax.' },
      final_delivery: { cost: 'buyer', risk: 'buyer', notes: 'Buyer handles final delivery and factory warehouse de-stuffing.' }
    },
    exampleScenario: {
      direction: 'import',
      commodity: 'Construction Excavators & Spare Parts (2 x 40ft FR)',
      route: 'FOB Ningbo Port, China to Mojo Dry Port, Ethiopia',
      breakdown: 'Chinese supplier bears all factory packing, Chinese export clearance, and crane loading on board vessel at Ningbo. Ethiopian contractor opens L/C at Awash Bank, buys EIC marine insurance in ETB, and pays ocean freight to ESLSE in Birr. Risk transferred to buyer at Ningbo quayside.'
    }
  },
  {
    code: 'FCA',
    name: 'Free Carrier',
    amharicName: 'ፍሪ ካሪየር (ለአጓጓዥ በነጻ ማስረከብ)',
    category: 'any_mode',
    summary: 'The seller delivers goods to the carrier or person nominated by the buyer at the seller’s premises or another named place. The most modern, versatile Incoterm recommended by the ICC for containerized and airfreight trade.',
    riskTransferPoint: 'Named Place: At seller premises when loaded on buyer vehicle, OR at designated terminal (e.g., Mojo Dry Port, Bole Cargo Terminal, or foreign CFS) when handed over to carrier.',
    costTransferPoint: 'Named Place: Seller pays all transport and export clearance up to handover to first carrier. Buyer pays all subsequent carriage.',
    splitRiskAndCost: false,
    ethiopianStatus: 'recommended_export',
    ethiopianStatusLabel: 'Highly Recommended for Containerized Multimodal Imports & Air Cargo / Ethiopian Exports',
    ethiopiaRegulationNotes: 'ICC 2020 strongly recommends FCA over FOB for container shipments, because in modern shipping containers are delivered to inland dry ports or container freight stations (CFS), NOT over the vessel rail. For Ethiopian exports (cut flowers, chilled meat, specialty coffee), FCA Bole International Airport or FCA Mojo Dry Port allows Ethiopian exporters to transfer risk inside Ethiopia immediately upon handing cargo to Ethiopian Airlines Cargo or ESLSE, avoiding remote Djibouti port liabilities.',
    insuranceRequirement: 'Buyer arranges marine/air cargo insurance from the handover point. For Ethiopian imports, contracted locally in ETB.',
    eslseRelevance: 'Ideal for ESLSE Multimodal booking: goods are handed to ESLSE consolidation hub at origin (e.g. Dubai, Guangzhou, Antwerp).',
    advantages: [
      'Eliminates the legal mismatch of using maritime FOB for containerized cargo handed over at dry depots.',
      'Under Incoterms 2020, FCA allows the parties to agree that the buyer instructs their carrier to issue an on-board Bill of Lading with notation to the seller, satisfying bank L/C requirements.',
      'For Ethiopian agricultural exporters, relieves the exporter of road accident risk on the hazardous 900km highway from Mojo to Port of Djibouti.',
      'Perfect for airfreight shipments via Ethiopian Airlines Cargo at Bole Airport.'
    ],
    disadvantages: [
      'Many Ethiopian commercial bank trade desk officers are conditioned to see "FOB" on proforma invoices and may initially question FCA.',
      'Buyer must coordinate collection promptly with the forwarder at the named foreign terminal.'
    ],
    ethiopianPracticalAdvice: [
      'Specify exact location: "FCA Mojo Dry Port Container Terminal, Ethiopia (Incoterms® 2020)" or "FCA Frankfurt Cargo City, Germany".',
      'For Ethiopian exports, specify that buyer provides carrier shipping instructions 7 days before cargo readiness.',
      'Utilize FCA 2020 Bill of Lading option if your payment is backed by a Letter of Credit.'
    ],
    proformaClauseExample: 'Delivery Terms: FCA Bole International Airport Cargo Terminal, Addis Ababa (Incoterms® 2020). Export customs formalities to be cleared by Seller via Ethiopian e-SW.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller provides export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays pre-carriage to named handover place.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears export customs formalities.' },
      origin_terminal: { cost: 'buyer', risk: 'buyer', notes: 'Buyer (via carrier) bears terminal charges after handover.' },
      loading: { cost: 'buyer', risk: 'buyer', notes: 'Buyer carrier handles vessel/aircraft loading.' },
      main_carriage: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays international freight.' },
      transit_insurance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer arranges cargo transit insurance.' },
      arrival_terminal: { cost: 'buyer', risk: 'buyer', notes: 'Buyer covers arrival terminal and discharge.' },
      transit_corridor: { cost: 'buyer', risk: 'buyer', notes: 'Buyer manages transit corridor carriage.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer clears import customs and duties.' },
      final_delivery: { cost: 'buyer', risk: 'buyer', notes: 'Buyer handles final delivery.' }
    },
    exampleScenario: {
      direction: 'export',
      commodity: 'Specialty Washed Arabica Coffee (Micro-lot, 1 x 20ft FCL)',
      route: 'FCA Mojo Dry Port, Ethiopia to Hamburg, Germany',
      breakdown: 'Ethiopian exporter cleans coffee, packs in GrainPro bags, clears e-SW export customs at Mojo, and delivers container to ESLSE terminal at Mojo. Risk and onward freight costs transfer to German green coffee importer at Mojo terminal gate.'
    }
  },
  {
    code: 'CIF',
    name: 'Cost, Insurance and Freight',
    amharicName: 'ኮስት፣ ኢንሹራንስ ኤንድ ፍሬይት (ዋጋ፣ መድንና የባህር ጭነት)',
    category: 'sea_inland_waterway',
    summary: 'The seller pays the cost, ocean freight, and marine cargo insurance to bring goods to the named port of destination. However, critical risk transfers at the port of origin once loaded on board!',
    riskTransferPoint: 'Port of Loading: Exactly when goods are placed on board the vessel at departure port! (Risk transfers BEFORE ocean transit, even though seller pays freight & insurance).',
    costTransferPoint: 'Named Port of Destination: Seller pays costs up to vessel arrival at destination port (e.g., Port of Djibouti). Buyer pays discharge port handling, transit, and import taxes.',
    splitRiskAndCost: true,
    ethiopianStatus: 'conditional_waiver',
    ethiopianStatusLabel: 'Conditional / Requires Maritime Authority Shipping Waiver & NBE Compliance',
    ethiopiaRegulationNotes: 'REGULATORY SENSITIVITY: Importing on CIF terms into Ethiopia requires careful handling. Because Ethiopian law reserves ocean freight for ESLSE and mandates domestic marine insurance in ETB, commercial banks will generally NOT open an L/C for CIF unless the importer presents an official ESLSE Shipping Waiver (issued when ESLSE cannot provide vessel space or route) AND an NBE waiver for foreign currency insurance payment. In contrast, for Ethiopian exporters, quoting CIF Rotterdam or CIF Tokyo is common when foreign buyers insist on delivered ocean freight.',
    insuranceRequirement: 'Seller is obligated to procure Institute Cargo Clauses (C) - minimum coverage. For Ethiopian exports under CIF, exporter buys policy from Ethiopian insurer.',
    eslseRelevance: 'Direct conflict with ESLSE reservation policy unless waiver certificate is obtained by the importer.',
    advantages: [
      'Foreign supplier manages complex international ocean shipping logistics and vessel booking.',
      'Fixed landed cost up to Port of Djibouti known in advance by the importer.',
      'Valuable for Ethiopian exporters seeking higher margins by controlling ocean freight routing for direct buyers.'
    ],
    disadvantages: [
      'High risk of split transfer confusion: Importers mistakenly believe seller bears transit loss during voyage. If ship sinks, importer must claim under insurance, NOT against seller!',
      'Under Incoterms 2020 CIF, seller only provides basic Clause C insurance (fire, sinking, collision), which excludes water damage and theft unless upgraded.',
      'Importers risk foreign exchange rejection by Ethiopian banks if proper waivers are not secured in advance.',
      'Seller does NOT pay Djibouti port storage or demurrage if documents are delayed.'
    ],
    ethiopianPracticalAdvice: [
      'For Ethiopian imports, do not sign a CIF contract before confirming with your commercial bank that a foreign exchange allocation for foreign freight and an ESLSE waiver are approved.',
      'Request seller to upgrade insurance to Institute Cargo Clauses (A) "All Risks" instead of standard Clause (C).',
      'Specify named port: "CIF Port of Djibouti (Doraleh), Incoterms® 2020". Note that inland transport to Mojo is NOT included!'
    ],
    proformaClauseExample: 'Delivery Terms: CIF Port of Djibouti (Doraleh), Incoterms® 2020. Marine Insurance to cover 110% of invoice value under Institute Cargo Clauses (A) All Risks.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller pays export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays origin pre-carriage.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears origin export customs.' },
      origin_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller covers origin terminal charges (OTHC).' },
      loading: { cost: 'seller', risk: 'seller', notes: 'Seller pays loading on vessel. RISK TRANSFERS HERE TO BUYER.' },
      main_carriage: { cost: 'seller', risk: 'buyer', notes: 'Seller pays ocean freight, but buyer bears voyage risk!' },
      transit_insurance: { cost: 'seller', risk: 'buyer', notes: 'Seller pays minimum Clause (C) cargo insurance for buyer benefit.' },
      arrival_terminal: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays Djibouti discharge, port storage, and DTHC.' },
      transit_corridor: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays Ethio-Djibouti corridor transport to Mojo.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays Ethiopian customs duties and taxes.' },
      final_delivery: { cost: 'buyer', risk: 'buyer', notes: 'Buyer handles inland delivery and unloading.' }
    },
    exampleScenario: {
      direction: 'import',
      commodity: 'Specialized Medical Diagnostic Imaging Equipment',
      route: 'CIF Port of Djibouti from Antwerp, Belgium',
      breakdown: 'Belgian manufacturer books sea freight and pays insurance to Port of Djibouti after Ethiopian hospital obtains ESLSE waiver. Hospital bears physical transit risk across the Red Sea; if container is damaged in transit, hospital claims with insurance company, not Belgian seller.'
    }
  },
  {
    code: 'CFR',
    name: 'Cost and Freight',
    amharicName: 'ኮስት ኤንድ ፍሬይት (ዋጋና የባህር ጭነት)',
    category: 'sea_inland_waterway',
    summary: 'The seller pays the cost and ocean freight to bring goods to the named port of destination, but the buyer must arrange their own marine insurance. Risk transfers at the port of origin once loaded on board.',
    riskTransferPoint: 'Port of Loading: Exactly when goods are loaded on board the vessel at origin port.',
    costTransferPoint: 'Named Port of Destination: Seller pays costs up to vessel arrival at destination port (e.g., Port of Djibouti). Buyer pays arrival port handling, inland transit, and import duties.',
    splitRiskAndCost: true,
    ethiopianStatus: 'conditional_waiver',
    ethiopianStatusLabel: 'Conditional / Frequently Used with Local Ethiopian Marine Insurance',
    ethiopiaRegulationNotes: 'Historically favored when foreign suppliers provide competitive ocean freight but the Ethiopian importer is legally obligated to buy marine insurance locally in Ethiopian Birr (ETB) from Ethiopian Insurance Corporation (EIC) or Awash/Nyala. Still requires ESLSE shipping waiver if imported under commercial bank L/C.',
    insuranceRequirement: 'Buyer is responsible for procuring marine insurance. Under Ethiopian law, policy must be issued by a domestic insurer in ETB.',
    eslseRelevance: 'Requires ESLSE shipping waiver certificate before bank issues Form NBE-F-02 import authorization.',
    advantages: [
      'Allows importer to satisfy Ethiopian statutory requirement of buying local ETB marine insurance while utilizing supplier shipping arrangements.',
      'Clear split: supplier manages ocean line logistics, importer controls insurance policy and claims.',
      'Common for bulk commodities (fertilizer, grain, steel billets) when bulk vessels are chartered by supplier.'
    ],
    disadvantages: [
      'Requires ESLSE shipping waiver in Ethiopia.',
      'Split risk and cost: Buyer assumes risk the second goods cross the ship rail at loading port, but carrier is appointed by seller, creating friction if damage occurs during discharge.'
    ],
    ethiopianPracticalAdvice: [
      'Ensure the local Ethiopian insurance policy takes effect BEFORE the goods are loaded at the overseas port, otherwise you have an uninsured risk gap!',
      'Demand immediate notification of vessel name, bill of lading number, and sailing date from supplier to endorse insurance certificate.'
    ],
    proformaClauseExample: 'Delivery Terms: CFR Port of Djibouti, Incoterms® 2020. Marine Cargo Insurance to be covered locally by Buyer in Ethiopia in accordance with NBE regulations.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller pays export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays origin pre-carriage.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears origin export customs.' },
      origin_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller covers origin terminal charges (OTHC).' },
      loading: { cost: 'seller', risk: 'seller', notes: 'Seller pays loading on vessel. RISK TRANSFERS TO BUYER HERE.' },
      main_carriage: { cost: 'seller', risk: 'buyer', notes: 'Seller pays ocean freight to Djibouti; buyer bears voyage risk.' },
      transit_insurance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer procures mandatory local ETB marine insurance.' },
      arrival_terminal: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays Djibouti discharge, port storage, and DTHC.' },
      transit_corridor: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays transit corridor transport to Mojo Dry Port.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays Ethiopian customs duties and taxes.' },
      final_delivery: { cost: 'buyer', risk: 'buyer', notes: 'Buyer handles inland delivery and unloading.' }
    },
    exampleScenario: {
      direction: 'import',
      commodity: 'Agricultural Urea Fertilizer (50,000 MT Bulk)',
      route: 'CFR Port of Djibouti from Sabic, Saudi Arabia',
      breakdown: 'Supplier charters bulk carrier to Djibouti. Ethiopian Agricultural Transformation Agency / Enterprise procures marine insurance with EIC in Addis Ababa in ETB. Risk transfers at loading port in Jubail; supplier pays sea freight.'
    }
  },
  {
    code: 'CPT',
    name: 'Carriage Paid To',
    amharicName: 'ካሬጅ ፔይድ ቱ (የትራንስፖርት ወጪ እስከ ተባለው ቦታ የተከፈለ)',
    category: 'any_mode',
    summary: 'The seller delivers goods to the carrier and pays the carriage to the named destination. Risk transfers to the buyer upon handover to the first carrier, while costs transfer at the named destination place.',
    riskTransferPoint: 'Handover to First Carrier: At origin country when goods are handed over to the first multimodal carrier/forwarder.',
    costTransferPoint: 'Named Destination: At the designated inland terminal or destination place (e.g., CPT Mojo Dry Port or CPT Bole Airport).',
    splitRiskAndCost: true,
    ethiopianStatus: 'recommended_export',
    ethiopianStatusLabel: 'Modern Multimodal Alternative to CFR / Great for Airfreight',
    ethiopiaRegulationNotes: 'CPT is the multimodal equivalent of CFR. Highly suitable for air shipments arriving at Bole International Airport (e.g., CPT Bole Airport) and containerized shipments arriving at Mojo Dry Port. For Ethiopian exports (textiles, garments from Hawassa Industrial Park), CPT destination airport allows Ethiopian garment makers to contract Ethiopian Airlines Cargo directly.',
    insuranceRequirement: 'Buyer arranges transit insurance from the origin handover point.',
    eslseRelevance: 'If named destination is Mojo Dry Port, seller must contract an MTO that connects with ESLSE or approved multimodal corridor operators.',
    advantages: [
      'Multi-modal: Applicable to air, road, rail, and sea transport.',
      'Preferred by international freight forwarders over outdated CFR for containerized cargo.',
      'Seller pays transport to the final inland dry port, simplifying corridor logistics for the buyer.'
    ],
    disadvantages: [
      'Split risk: Buyer bears risk during main carriage even though seller booked the transporter.',
      'Buyer must verify whether terminal handling charges at destination (DTHC) are included in seller freight.'
    ],
    ethiopianPracticalAdvice: [
      'Always clarify whether Mojo Dry Port terminal handling fees are prepaid or collect.',
      'Ensure your cargo insurance policy covers multimodal transport starting from the supplier factory gate.'
    ],
    proformaClauseExample: 'Delivery Terms: CPT Mojo Dry Port, Ethiopia (Incoterms® 2020). Freight prepaid by Seller to Mojo; import customs duties and taxes for Buyer account.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller pays export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays pre-carriage to first carrier.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears export customs.' },
      origin_terminal: { cost: 'seller', risk: 'buyer', notes: 'Seller pays terminal charges; buyer already bears transit risk.' },
      loading: { cost: 'seller', risk: 'buyer', notes: 'Seller covers loading.' },
      main_carriage: { cost: 'seller', risk: 'buyer', notes: 'Seller pays freight to named place; buyer bears transit risk.' },
      transit_insurance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer procures transit insurance.' },
      arrival_terminal: { cost: 'seller', risk: 'buyer', notes: 'Included in carriage if agreed; otherwise buyer pays.' },
      transit_corridor: { cost: 'seller', risk: 'buyer', notes: 'Seller covers corridor transit if named place is Mojo Dry Port.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer clears Ethiopian customs duties.' },
      final_delivery: { cost: 'buyer', risk: 'buyer', notes: 'Buyer handles final delivery.' }
    },
    exampleScenario: {
      direction: 'export',
      commodity: 'Export Apparel & Finished Garments (Air Cargo)',
      route: 'CPT Frankfurt Airport, Germany from Bole International Airport',
      breakdown: 'Hawassa apparel manufacturer books airfreight with Ethiopian Airlines Cargo to Frankfurt. Risk transfers when cargo is accepted by ET Cargo at Bole; exporter pays air freight to Frankfurt.'
    }
  },
  {
    code: 'CIP',
    name: 'Carriage and Insurance Paid To',
    amharicName: 'ካሬጅ ኤንድ ኢንሹራንስ ፔይድ ቱ (የትራንስፖርትና ኢንሹራንስ ወጪ የተከፈለ)',
    category: 'any_mode',
    summary: 'The seller delivers goods to the carrier, pays carriage to named destination, AND procures comprehensive Institute Cargo Clauses (A) "All Risks" insurance for the buyer.',
    riskTransferPoint: 'Handover to First Carrier: At origin country when goods are handed over to the first carrier.',
    costTransferPoint: 'Named Destination: At the named destination place (e.g., CIP Mojo Dry Port, Ethiopia).',
    splitRiskAndCost: true,
    ethiopianStatus: 'conditional_waiver',
    ethiopianStatusLabel: 'Multimodal Equivalent of CIF / Strict ICC 2020 All-Risk Insurance Rule',
    ethiopiaRegulationNotes: 'CRITICAL INCOTERMS 2020 CHANGE: Under Incoterms 2020, CIP now mandates Institute Cargo Clauses (A) "All Risks" insurance (unlike CIF which only mandates Clause C). For Ethiopian trade, if foreign seller quotes CIP, the insurance coverage is premium grade. However, like CIF, commercial banks opening L/Cs in Ethiopia will require an NBE/ESLSE waiver for foreign insurance and freight.',
    insuranceRequirement: 'Seller is legally obligated to procure Institute Cargo Clauses (A) "All Risks" insurance covering 110% of contract value.',
    eslseRelevance: 'Requires coordination with multimodal carriers authorized to operate along the Djibouti-Addis corridor.',
    advantages: [
      'Highest standard of automatic transit insurance protection (ICC A All Risks).',
      'True multimodal term: Seamlessly covers ocean voyage, Djibouti discharge, and inland rail/road to Mojo.',
      'Protects sensitive high-value machinery, telecommunications equipment, and pharmaceuticals.'
    ],
    disadvantages: [
      'Higher upfront invoice cost due to mandatory All Risks insurance premium.',
      'Split transfer: Importer carries physical loss risk from the moment seller hands cargo to forwarder in origin country.'
    ],
    ethiopianPracticalAdvice: [
      'Verify that the seller’s insurance certificate names the Ethiopian importer or bank as the loss payee.',
      'Check that the policy includes the Institute Institute Strikes Clauses and Institute War Clauses if transiting the Red Sea / Gulf of Aden.'
    ],
    proformaClauseExample: 'Delivery Terms: CIP Mojo Dry Port, Ethiopia (Incoterms® 2020). Seller to provide Institute Cargo Clauses (A) All Risks insurance certificate endorsed to Commercial Bank of Ethiopia.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller pays export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays origin pre-carriage.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears origin export customs.' },
      origin_terminal: { cost: 'seller', risk: 'buyer', notes: 'Seller covers origin terminal charges; risk with buyer.' },
      loading: { cost: 'seller', risk: 'buyer', notes: 'Seller pays loading.' },
      main_carriage: { cost: 'seller', risk: 'buyer', notes: 'Seller pays main freight.' },
      transit_insurance: { cost: 'seller', risk: 'buyer', notes: 'Seller MUST provide Institute Cargo Clauses (A) All-Risks insurance!' },
      arrival_terminal: { cost: 'seller', risk: 'buyer', notes: 'Seller covers arrival terminal handling.' },
      transit_corridor: { cost: 'seller', risk: 'buyer', notes: 'Seller pays corridor transport to Mojo Dry Port.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer clears Ethiopian customs duties and taxes.' },
      final_delivery: { cost: 'buyer', risk: 'buyer', notes: 'Buyer handles final delivery.' }
    },
    exampleScenario: {
      direction: 'import',
      commodity: 'High-Tech Telecommunications 5G Base Stations',
      route: 'CIP Mojo Dry Port from Stockholm, Sweden',
      breakdown: 'Telecom equipment manufacturer books end-to-end multimodal transit and purchases ICC (A) All Risks insurance covering the entire ocean and rail corridor to Mojo. Ethio Telecom clears customs at Mojo and takes delivery.'
    }
  },
  {
    code: 'DAP',
    name: 'Delivered at Place',
    amharicName: 'ዴሊቨርድ አት ፕሌስ (የተባለው ቦታ ሲደርስ ማስረከብ)',
    category: 'any_mode',
    summary: 'The seller delivers when the goods are placed at the disposal of the buyer on the arriving means of transport ready for unloading at the named place of destination, uncleared for import.',
    riskTransferPoint: 'Named Place of Destination: When goods arrive at named place (e.g., buyer warehouse in Addis Ababa or Mojo Dry Port) ready for unloading.',
    costTransferPoint: 'Named Place of Destination: Seller pays all transport up to arrival point. Buyer pays import customs duties, taxes, and unloading.',
    splitRiskAndCost: false,
    ethiopianStatus: 'conditional_waiver',
    ethiopianStatusLabel: 'Used for Turnkey Projects, Aid Cargo & Cross-Border Trucking',
    ethiopiaRegulationNotes: 'Under DAP, the seller bears all risks and costs of bringing goods into Ethiopia right up to the named destination gate, BUT does NOT clear import customs or pay Ethiopian customs duties. Frequently used for foreign aid shipments, NGO humanitarian relief, and EPC turnkey construction contracts where the Ethiopian government or project sponsor enjoys duty-free privileges under the Second Schedule of the Customs Tariff.',
    insuranceRequirement: 'Seller covers transit insurance to protect their own investment (since seller bears risk until destination arrival).',
    eslseRelevance: 'Seller must contract international forwarders with established transit agents in Djibouti and Ethiopia.',
    advantages: [
      'Maximum risk protection for Ethiopian buyer: If cargo is damaged at sea, in Djibouti port, or on the road, seller absorbs 100% of the loss.',
      'Buyer only pays Ethiopian customs taxes upon safe arrival of the vehicle at destination.',
      'Excellent for capital equipment delivered directly to industrial park job sites.'
    ],
    disadvantages: [
      'Seller must navigate complex Djibouti transit customs procedures and corridor trucking permits.',
      'Unloading at destination is buyer responsibility; if buyer delays unloading, demurrage disputes arise.'
    ],
    ethiopianPracticalAdvice: [
      'Specify the exact site: "DAP Hawassa Industrial Park Shed 14, Ethiopia (Incoterms® 2020)".',
      'Clarify timeline for customs clearance at the border dry port so seller trucks are not detained.'
    ],
    proformaClauseExample: 'Delivery Terms: DAP Kilinto Industrial Park, Addis Ababa (Incoterms® 2020). Import customs clearance and duties for Buyer account; unloading at job site by Buyer.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller pays export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays origin pre-carriage.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears export customs.' },
      origin_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller covers origin terminal charges.' },
      loading: { cost: 'seller', risk: 'seller', notes: 'Seller pays loading.' },
      main_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays international freight and bears voyage risk.' },
      transit_insurance: { cost: 'seller', risk: 'seller', notes: 'Seller procures insurance to protect own cargo risk.' },
      arrival_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller pays Djibouti port handling and transit fees.' },
      transit_corridor: { cost: 'seller', risk: 'seller', notes: 'Seller pays corridor transport to Ethiopia.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer clears Ethiopian customs duties, taxes, and permits.' },
      final_delivery: { cost: 'seller', risk: 'seller', notes: 'Seller pays delivery to site; buyer handles unloading.' }
    },
    exampleScenario: {
      direction: 'import',
      commodity: 'Solar Mini-Grid Power Generation Equipment',
      route: 'DAP Semera Solar Substation, Afar Region from Frankfurt, Germany',
      breakdown: 'German engineering contractor transports complete solar inverters and battery banks to the project site in Afar. Contractor bears all loss risk during sea transit and desert trucking. Ministry of Water and Energy processes duty-free clearance.'
    }
  },
  {
    code: 'DPU',
    name: 'Delivered at Place Unloaded',
    amharicName: 'ዴሊቨርድ አት ፕሌስ አንሎደድ (ዕቃው ወርዶ ሲረከብ)',
    category: 'any_mode',
    summary: 'The seller delivers when the goods, once unloaded from the arriving means of transport, are placed at the disposal of the buyer at a named place of destination. The ONLY Incoterm where the seller is responsible for unloading at destination!',
    riskTransferPoint: 'Named Destination Place: Exactly when goods are safely UNLOADED from the vehicle onto the ground or terminal floor.',
    costTransferPoint: 'Named Destination Place: Seller pays all transport, freight, transit, and destination unloading costs.',
    splitRiskAndCost: false,
    ethiopianStatus: 'conditional_waiver',
    ethiopianStatusLabel: 'Replaced DAT in 2020 / Applied at Mojo Dry Port CFS or Project Job Sites',
    ethiopiaRegulationNotes: 'Incoterms 2020 renamed DAT (Delivered at Terminal) to DPU (Delivered at Place Unloaded) to emphasize that delivery can occur anywhere, not just at a transport terminal. In Ethiopian trade, DPU Mojo Dry Port CFS is used when the foreign contractor agrees to un-stuff containerized machinery and position it safely inside the customs inspection warehouse before buyer acceptance.',
    insuranceRequirement: 'Seller must maintain insurance through to completion of unloading at destination.',
    eslseRelevance: 'Requires coordination with ESLSE dry port ground handling teams and crane operators.',
    advantages: [
      'The only Incoterm where seller bears unloading liability; buyer is protected against crane or forklift accidents during de-stuffing.',
      'Ideal for heavy oversized cargo (transformers, turbines) where specialized rigging is required.'
    ],
    disadvantages: [
      'Foreign sellers rarely accept DPU in Ethiopia due to unfamiliarity with local labor, crane hiring, and dry port handling logistics.',
      'Unloading delays by dry port congestion can cause severe demurrage for seller.'
    ],
    ethiopianPracticalAdvice: [
      'Specify exact unloading spot: "DPU Mojo Dry Port Heavy Cargo Staging Area, Ethiopia (Incoterms® 2020)".',
      'Confirm crane capacity with ESLSE Mojo Dry Port terminal management before contracting.'
    ],
    proformaClauseExample: 'Delivery Terms: DPU Mojo Dry Port CFS, Ethiopia (Incoterms® 2020). Seller responsible for offloading from truck at dry port yard; import duties for Buyer account.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller pays export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays origin pre-carriage.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears export customs.' },
      origin_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller covers origin terminal charges.' },
      loading: { cost: 'seller', risk: 'seller', notes: 'Seller pays loading.' },
      main_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays international freight.' },
      transit_insurance: { cost: 'seller', risk: 'seller', notes: 'Seller insures cargo through destination unloading.' },
      arrival_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller pays Djibouti discharge and transit fees.' },
      transit_corridor: { cost: 'seller', risk: 'seller', notes: 'Seller pays corridor transport to Ethiopia.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer clears Ethiopian customs duties.' },
      final_delivery: { cost: 'seller', risk: 'seller', notes: 'SELLER PAYS AND BEARS RISK OF UNLOADING AT DESTINATION.' }
    },
    exampleScenario: {
      direction: 'import',
      commodity: 'Hydroelectric Power Station Step-Up Transformer (85 Tons)',
      route: 'DPU Koysha Hydroelectric Project Staging Yard from Shanghai, China',
      breakdown: 'Chinese manufacturer delivers massive transformer on hydraulic multi-axle trailer directly to power station yard and unloads it onto foundation pad using mobile gantry cranes. Risk transfers only after transformer is safely on the ground.'
    }
  },
  {
    code: 'DDP',
    name: 'Delivered Duty Paid',
    amharicName: 'ዴሊቨርድ ዲዩቲ ፔይድ (ቀረጥና ታክስ ተከፍሎ ማስረከብ)',
    category: 'any_mode',
    summary: 'The seller delivers the goods to the buyer, cleared for import, and ready for unloading at the named place of destination. Maximum obligation and liability for the seller.',
    riskTransferPoint: "Buyer's Destination Warehouse: At buyer facility in Ethiopia, cleared of all customs duties, ready for unloading.",
    costTransferPoint: "Buyer's Destination Warehouse: Seller pays ALL costs including Ethiopian import customs duties, excise tax, VAT, surtax, and delivery.",
    splitRiskAndCost: false,
    ethiopianStatus: 'restricted_impractical',
    ethiopianStatusLabel: 'Strictly Discouraged / Legally Impractical for Foreign Sellers in Ethiopia',
    ethiopiaRegulationNotes: 'CRITICAL REGULATORY BARRIER: DDP is virtually impossible for a foreign overseas seller to execute legally in Ethiopia. Under Ethiopian Customs Proclamation No. 859/2014 and Ministry of Trade and Regional Integration (MoTRI) regulations, import declarations (IM4) and customs duty payments can ONLY be processed through the Electronic Single Window (e-SW) by a registered Ethiopian entity holding an Ethiopian Taxpayer Identification Number (TIN), valid commercial trade license, and registered customs declarant badge. Non-resident foreign sellers cannot register as importers of record or pay domestic taxes directly.',
    insuranceRequirement: 'Seller bears total risk throughout entire supply chain; must insure door-to-door.',
    eslseRelevance: 'Seller must hire local Ethiopian licensed clearing agent and partner with ESLSE.',
    advantages: [
      'Zero financial or operational risk for the Ethiopian buyer (if feasible).',
      'Turnkey convenience for e-commerce courier packages (DHL/FedEx express shipments with duty billed to shipper).'
    ],
    disadvantages: [
      'Legal deadlock: Foreign supplier cannot obtain Ethiopian customs declaration release without a local licensed partner.',
      'Foreign supplier cannot claim back Ethiopian 15% VAT or handle customs dispute valuation hearings.',
      'Banks cannot process import foreign exchange permits under NBE rules for DDP commercial imports.'
    ],
    ethiopianPracticalAdvice: [
      'Never agree to DDP for commercial containerized imports into Ethiopia; convert the contract to DAP or CIF/FOB with a local clearing agent.',
      'Only acceptable for small courier express sample packages where express couriers (DHL/FedEx) act as broker under clearance on behalf of shipper.'
    ],
    proformaClauseExample: 'NOT RECOMMENDED FOR COMMERCIAL IMPORTS IN ETHIOPIA. Use DAP + local clearing agent instead.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller pays export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays origin pre-carriage.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears origin export customs.' },
      origin_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller covers origin terminal charges.' },
      loading: { cost: 'seller', risk: 'seller', notes: 'Seller pays loading.' },
      main_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays international freight.' },
      transit_insurance: { cost: 'seller', risk: 'seller', notes: 'Seller insures door-to-door.' },
      arrival_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller pays Djibouti port handling and transit fees.' },
      transit_corridor: { cost: 'seller', risk: 'seller', notes: 'Seller pays corridor transport to Ethiopia.' },
      import_clearance: { cost: 'seller', risk: 'seller', notes: 'SELLER MUST PAY ETHIOPIAN CUSTOMS DUTY, EXCISE, VAT, SURTAX (requires local TIN!).' },
      final_delivery: { cost: 'seller', risk: 'seller', notes: 'Seller pays delivery to buyer door; buyer unloads.' }
    },
    exampleScenario: {
      direction: 'import',
      commodity: 'Urgent Aircraft Replacement Avionics Circuit Board (Courier Parcel)',
      route: 'DDP Ethiopian Airlines Maintenance Hangar, Bole Airport via DHL Express from Toulouse, France',
      breakdown: 'Airbus ships replacement sensor board via DHL Express. DHL acts as authorized customs broker, pays Ethiopian customs taxes under courier pre-clearance, and invoices Airbus directly in France. Only feasible for express courier samples.'
    }
  },
  {
    code: 'EXW',
    name: 'Ex Works',
    amharicName: 'ኤክስ ወርክስ (ከፋብሪካ በር መረከብ)',
    category: 'any_mode',
    summary: 'The seller makes goods available at their premises (factory, warehouse). The buyer incurs all costs and risks from the seller’s premises through to final destination, including origin export customs clearance.',
    riskTransferPoint: "Seller's Premises: When goods are placed at buyer disposal at the factory door (seller is not even obligated to load onto buyer's vehicle!).",
    costTransferPoint: "Seller's Premises: Buyer pays ALL loading, transport, export duties, sea freight, insurance, and import clearance.",
    splitRiskAndCost: false,
    ethiopianStatus: 'restricted_impractical',
    ethiopianStatusLabel: 'Strictly Discouraged for Both Ethiopian Importers & Exporters',
    ethiopiaRegulationNotes: 'SEVERE TRAP: For Ethiopian imports, buying on EXW means the Ethiopian importer must manage domestic trucking and customs clearance inside a foreign country (e.g. China, Turkey, India), which Ethiopian companies cannot do without expensive foreign logistics agents. Even worse, Ethiopian banks will NOT issue L/Cs for EXW because NBE requires proof of export clearance documentation. For Ethiopian exports, a foreign buyer cannot clear Ethiopian customs through e-SW without an Ethiopian trade license, making EXW practically unworkable.',
    insuranceRequirement: 'Buyer must arrange comprehensive transit insurance starting from the foreign factory floor.',
    eslseRelevance: 'ESLSE does not collect goods from remote inland foreign factories under standard multimodal booking.',
    advantages: [
      'Lowest unit purchase price on paper (no logistics markup by seller).'
    ],
    disadvantages: [
      'Buyer is legally responsible for foreign export customs clearance in origin country; if foreign authorities block export, buyer suffers total loss.',
      'Seller is NOT obligated to load goods onto the buyer truck at the factory; buyer bears damage risk during initial crane/forklift loading.',
      'Ethiopian banks and NBE strictly disallow EXW for commercial import letters of credit.'
    ],
    ethiopianPracticalAdvice: [
      'If a foreign supplier quotes EXW, counter-offer immediately with FCA (Free Carrier at supplier factory) so the seller is obligated to load the vehicle and clear export customs.',
      'Never sell Ethiopian agricultural commodities (coffee, sesame) on EXW terms to foreign buyers.'
    ],
    proformaClauseExample: 'AVOID IN ETHIOPIA. Replace with: FCA Supplier Factory, loaded and export cleared (Incoterms® 2020).',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller provides basic packaging only.' },
      pre_carriage: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays loading on truck and domestic transport in origin country.' },
      export_clearance: { cost: 'buyer', risk: 'buyer', notes: 'BUYER MUST CLEAR ORIGIN EXPORT CUSTOMS (almost impossible abroad!).' },
      origin_terminal: { cost: 'buyer', risk: 'buyer', notes: 'Buyer covers origin terminal handling.' },
      loading: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays vessel/aircraft loading.' },
      main_carriage: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays international freight.' },
      transit_insurance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer insures from factory floor.' },
      arrival_terminal: { cost: 'buyer', risk: 'buyer', notes: 'Buyer covers Djibouti discharge and port storage.' },
      transit_corridor: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays corridor transport to Mojo Dry Port.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer clears Ethiopian customs duties.' },
      final_delivery: { cost: 'buyer', risk: 'buyer', notes: 'Buyer handles final delivery.' }
    },
    exampleScenario: {
      direction: 'import',
      commodity: 'Textile Weaving Spare Parts',
      route: 'EXW Factory Floor in Istanbul, Turkey to Addis Ababa',
      breakdown: 'Ethiopian textile mill contracted EXW. Turkish factory refused to load pallets onto the forwarder truck or file Turkish export customs declaration. Cargo sat blocked in Istanbul for 3 months incurring warehouse storage until contract was renegotiated to FCA.'
    }
  },
  {
    code: 'FAS',
    name: 'Free Alongside Ship',
    amharicName: 'ፍሪ አሎንግሳይድ ሺፕ (መርከብ አጠገብ በነጻ ማስረከብ)',
    category: 'sea_inland_waterway',
    summary: 'The seller delivers when the goods are placed alongside the vessel (e.g., on a quay or barge) nominated by the buyer at the named port of shipment. Maritime only, typically for non-containerized bulk/breakbulk.',
    riskTransferPoint: 'Alongside Vessel at Quayside: When placed on the wharf or barge within reach of ship loading tackle at departure port.',
    costTransferPoint: 'Alongside Vessel: Seller pays up to quayside; buyer pays stevedoring crane loading onto vessel and onward carriage.',
    splitRiskAndCost: false,
    ethiopianStatus: 'conditional_waiver',
    ethiopianStatusLabel: 'Used for Breakbulk Cargo & Port of Djibouti Bulk Operations',
    ethiopiaRegulationNotes: 'FAS is never used for containerized cargo (containers go to container yards, not alongside ships). In Ethiopian trade, FAS is occasionally seen at Port of Djibouti or Port of Berbera for heavy minerals (potash, tantalum ore, granite blocks) or bulk export grain.',
    insuranceRequirement: 'Buyer arranges marine cargo insurance starting from quayside delivery.',
    eslseRelevance: 'Buyer must coordinate with port stevedoring operators for vessel loading.',
    advantages: [
      'Suitable for massive breakbulk or charter vessels where buyer manages shipboard crane loading.'
    ],
    disadvantages: [
      'Inappropriate for containerized trade.',
      'Seller bears risk of port wharf storage until vessel arrives.'
    ],
    ethiopianPracticalAdvice: [
      'Do not use FAS for container shipments; use FCA or FOB instead.',
      'Ensure berth availability at Port of Djibouti before dispatching bulk trucks.'
    ],
    proformaClauseExample: 'Delivery Terms: FAS Port of Djibouti (Doraleh Multipurpose Port DMPT), Incoterms® 2020. Stevedoring and loading on board by Buyer.',
    stageResponsibilities: {
      packaging: { cost: 'seller', risk: 'seller', notes: 'Seller pays export packing.' },
      pre_carriage: { cost: 'seller', risk: 'seller', notes: 'Seller pays transport to departure quay.' },
      export_clearance: { cost: 'seller', risk: 'seller', notes: 'Seller clears origin export customs.' },
      origin_terminal: { cost: 'seller', risk: 'seller', notes: 'Seller covers quayside wharfage.' },
      loading: { cost: 'buyer', risk: 'buyer', notes: 'BUYER PAYS AND BEARS RISK OF HOISTING ONTO VESSEL.' },
      main_carriage: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays ocean freight.' },
      transit_insurance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer insures cargo from quayside.' },
      arrival_terminal: { cost: 'buyer', risk: 'buyer', notes: 'Buyer covers arrival terminal handling.' },
      transit_corridor: { cost: 'buyer', risk: 'buyer', notes: 'Buyer pays corridor transport.' },
      import_clearance: { cost: 'buyer', risk: 'buyer', notes: 'Buyer clears import customs.' },
      final_delivery: { cost: 'buyer', risk: 'buyer', notes: 'Buyer handles final delivery.' }
    },
    exampleScenario: {
      direction: 'export',
      commodity: 'Rough Dimension Granite Blocks (15,000 MT Bulk)',
      route: 'FAS Port of Djibouti (DMPT) to Carrara, Italy',
      breakdown: 'Ethiopian quarrying enterprise transports granite blocks by flatbed truck to Port of Djibouti and unloads blocks alongside Italian charter vessel at berth. Buyer charters ship and pays crane stevedoring onto vessel hold.'
    }
  }
];

export const INCOTERMS_CASE_STUDIES: IncotermCaseStudy[] = [
  {
    id: 'case-01',
    title: 'The Doraleh Demurrage & Storage Crisis: FOB vs CIF',
    subtitle: 'Container Storage Fees at Port of Djibouti When Documents are Delayed',
    termInvolved: 'CIF',
    direction: 'import',
    background: 'An Ethiopian importer of industrial steel coils accepted a CIF Port of Djibouti contract from an Indian supplier. The supplier took 35 days after vessel arrival to send original Bills of Lading to Commercial Bank of Ethiopia due to discrepancies.',
    theDispute: 'During the 35-day document delay, the shipping line discharged 8 containers at Doraleh Container Terminal (DCT). Port of Djibouti only grants 8 free days for Ethiopian transit cargo. The container demurrage and port storage fee reached $24,600 USD. The Ethiopian importer demanded that the Indian supplier pay the demurrage because "the goods were CIF Djibouti and delivery was delayed by supplier fault."',
    keyQuestion: 'Under Incoterms® 2020 CIF rules, who is legally responsible for port storage and container demurrage after vessel discharge?',
    legalRuling: 'The BUYER (Ethiopian importer) is legally responsible for terminal storage and demurrage after discharge at destination port. Under CIF Incoterms® 2020, seller obligation finishes when goods are discharged. Even though the delay was triggered by banking paperwork, port costs at destination are contractually for the buyer account unless an explicit penalty clause was inserted in the commercial sales contract.',
    practicalTakeaway: 'Incoterms ONLY govern delivery, transport, and risk division—they DO NOT protect against document delays! Ethiopian importers must add a specific contract clause: "Seller shall be liable for all port storage and container demurrage incurred at Port of Djibouti arising from delayed transmission of negotiable Bills of Lading."'
  },
  {
    id: 'case-02',
    title: 'Rain Damage on the Ethio-Djibouti Railway: FCA Mojo vs FOB Djibouti',
    subtitle: 'Washed Yirgacheffe Coffee Damaged in Transit Before Ocean Loading',
    termInvolved: 'FOB',
    direction: 'export',
    background: 'An Ethiopian coffee exporter in Addis Ababa agreed to sell 2 containers of Grade 1 Washed Yirgacheffe Coffee to a Swiss buyer on "FOB Port of Djibouti" terms. The coffee was stuffed into containers at Mojo Dry Port and loaded onto the Ethio-Djibouti Railway freight train.',
    theDispute: 'En route to Djibouti near Dire Dawa, a severe flash flood derailed a rail wagon, tearing open container seals and soaking 300 bags of specialty coffee with mud and rain. The Swiss buyer refused to pay, stating: "We only assume risk after coffee is loaded on board the vessel at Port of Djibouti under FOB."',
    keyQuestion: 'Who bears the financial loss for the destroyed coffee?',
    legalRuling: 'The SELLER (Ethiopian exporter) bore 100% of the loss! Because the contract term was FOB Port of Djibouti, the exporter maintained risk throughout the entire 900 km Ethiopian transit corridor until cargo was hoisted over the vessel rail in Djibouti. If the exporter had negotiated FCA Mojo Dry Port instead, risk would have transferred upon delivery to the railway terminal at Mojo, and the Swiss buyer insurance would have compensated the loss.',
    practicalTakeaway: 'Ethiopian exporters should strongly advocate for FCA Mojo Dry Port (or FCA Addis Ababa) rather than FOB Djibouti whenever possible. Under FCA Mojo, your risk ends the moment ESLSE or Ethio-Djibouti Railway accepts the container inside Ethiopia!'
  },
  {
    id: 'case-03',
    title: 'The Missing All-Risks Insurance: CIP vs CIF Machinery Damage',
    subtitle: 'Container Water Ingress in the Indian Ocean',
    termInvolved: 'CIP',
    direction: 'import',
    background: 'A textile factory in Dukem imported spinning machines worth $380,000 USD from Italy. The initial proforma was CIF Djibouti, but the factory logistics consultant amended it to CIP Mojo Dry Port (Incoterms® 2020). During the Red Sea monsoon voyage, seawater penetrated rust pinholes in the container roof, corroding electronic control motherboards.',
    theDispute: 'The insurer initially attempted to reject the claim, citing standard sea transit limits. Under CIF, seller is only required to provide Institute Cargo Clauses (C) which EXCLUDES rainwater and rust damage.',
    keyQuestion: 'Why did the amendment to CIP Incoterms® 2020 save the Ethiopian textile factory?',
    legalRuling: 'Under Incoterms® 2020, CIP mandates Institute Cargo Clauses (A) "All Risks" insurance! Clause A explicitly covers water ingress, corrosion, rough handling, and concealed transit damage. The Italian supplier had been legally forced to purchase Clause (A) coverage, and the insurance underwriter was ordered to pay the full $140,000 USD replacement value of the electronic modules.',
    practicalTakeaway: 'Always know the 2020 insurance rule: CIF requires only basic Clause (C) (insufficient for electronics and machinery), while CIP mandates full Clause (A) All-Risks cover.'
  },
  {
    id: 'case-04',
    title: 'The DDP Import Trap at Kality Dry Port',
    subtitle: 'Why a Foreign Supplier Could Not Clear Ethiopian Customs',
    termInvolved: 'DDP',
    direction: 'import',
    background: 'A Turkish equipment manufacturer agreed to deliver packaging machinery "DDP Addis Ababa Factory" to an Ethiopian beverage bottler for a flat price of $120,000 USD inclusive of all duties and taxes.',
    theDispute: 'When the truck arrived at Kality Customs Station in Addis Ababa, the Turkish driver and forwarding agent attempted to process the import declaration (IM4). Ethiopian Customs Commission officers immediately impounded the truck because the Turkish company did not have an Ethiopian Tax Identification Number (TIN), an Ethiopian commercial trade license, or an Electronic Single Window (e-SW) registration. The goods sat at Kality for 60 days accumulating penalties.',
    keyQuestion: 'Can a non-resident foreign seller execute DDP in Ethiopia?',
    legalRuling: 'NO. Under Ethiopian Customs Proclamation No. 859/2014, only licensed resident Ethiopian corporate entities or registered branch offices can act as Importer of Record. The contract had to be cancelled and renegotiated to DAP Addis Ababa, with the Ethiopian beverage bottler stepping in to declare the customs entry and pay the duties using their own TIN.',
    practicalTakeaway: 'Never accept or offer DDP for commercial shipments entering Ethiopia. Non-resident companies cannot clear Ethiopian customs. Use DAP (Delivered at Place) instead, where seller manages transport to your gate, but the Ethiopian company handles local customs clearance.'
  }
];

export const ETHIOPIAN_REGULATORY_DIRECTIVES = [
  {
    title: 'Mandatory FOB Rule & ESLSE Multimodal Policy',
    authority: 'Ethiopian Maritime Authority (EMA) & Ministry of Transport and Logistics',
    summary: 'Commercial imports funded by Ethiopian banks must use FOB (Free on Board) terms to ensure sea freight is booked through ESLSE and paid in local Ethiopian Birr (ETB), preserving foreign exchange.',
    practicalImpact: 'Importers quoting CIF or CFR must obtain an official ESLSE Shipping Waiver certificate before bank L/C issuance.'
  },
  {
    title: 'Statutory Domestic Marine Cargo Insurance',
    authority: 'National Bank of Ethiopia (NBE) & Ministry of Finance',
    summary: 'Ethiopian law strictly forbids buying foreign marine insurance for imports destined for Ethiopia. Insurance must be contracted with an Ethiopian licensed insurer (e.g. EIC, Awash, Nyala) in ETB.',
    practicalImpact: 'Banks will not approve Form NBE-F-02 import permits without an original Marine Insurance Certificate issued in Ethiopia.'
  },
  {
    title: 'Customs Valuation (CIF Conversion Rule)',
    authority: 'Ethiopian Customs Commission (ECC) - Proclamation No. 859/2014',
    summary: 'Regardless of the Incoterm on the commercial invoice (e.g., FOB, EXW, FCA), Ethiopian Customs assesses duties and taxes on the customs CIF value at the Ethiopian border or inland dry port.',
    practicalImpact: 'If you import under FOB, Customs adds statutory freight and insurance percentages to determine the taxable CIF baseline.'
  },
  {
    title: 'Electronic Single Window (e-SW) & Importer of Record',
    authority: 'Ministry of Trade and Regional Integration (MoTRI) & ECC',
    summary: 'Customs declarations can only be filed by registered entities with valid Ethiopian TIN, trade license, and digital e-SW credentials, making DDP impossible for foreign companies.',
    practicalImpact: 'Foreign suppliers cannot act as the Importer of Record in Ethiopia; commercial contracts must allow the local buyer to clear customs.'
  }
];
