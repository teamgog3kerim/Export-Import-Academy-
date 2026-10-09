import { ResourceDocument } from '../types';

export const RESOURCE_LIBRARY: ResourceDocument[] = [
  {
    id: 'res-01',
    title: 'NBE Foreign Exchange Directive FXD/01/2024: Operational Master Guide',
    category: 'regulation',
    authority: 'National Bank of Ethiopia (NBE)',
    description: 'Comprehensive operational synthesis of current NBE directives governing foreign currency market determination, mandatory 50% export retention rules, margin hold limits, and statutory 2.5% settlement fees.',
    format: 'PDF',
    fileSize: '2.4 MB',
    keyHighlights: [
      'Transition from administrative forex allocation to market-based bid-offer determination.',
      'Mandatory 50% export retention in foreign currency accounts; 50% surrendered at bank rate.',
      'Statutory 2.5% NBE fee calculated on total settlement ETB value at document retirement.',
      'Rules governing 100% margin lock agreements and foreign currency forward contracts.'
    ],
    samplePreviewText: `NATIONAL BANK OF ETHIOPIA (NBE) DIRECTIVE SUMMARY:
1. Foreign Exchange Allocation: Commercial banks are authorized to conduct foreign exchange transactions based on market pricing without administrative queues.
2. Retention Accounts: Exporters shall retain 50% of foreign exchange proceeds in their Retention Account. The remaining 50% shall be converted into Birr immediately at the prevailing market exchange rate.
3. Import Margin Holdings: Banks may require margin cash deposits between 30% and 100% depending on the importer credit risk profile.
4. Statutory Remittances: Banks shall credit NBE with 2.50% statutory fee upon foreign currency retirement of trade documents.`
  },
  {
    id: 'res-02',
    title: 'Ethiopian Customs Tariff Schedule & Duty Exemption Incentive Guide',
    category: 'tariff',
    authority: 'Ethiopian Customs Commission (ECC)',
    description: 'Standard customs tariff schedule including First Schedule standard import duties (0% to 35%) and Second Schedule duty-free capital goods investment incentives.',
    format: 'PDF',
    fileSize: '4.8 MB',
    keyHighlights: [
      'Tariff Code 01: Customs Duty rates ranging from 0% (machinery) to 35% (consumer goods).',
      'Tariff Code 03 & 05: Luxury Excise Tax and 10% Surtax applicability rules.',
      'Tariff Code 12: Statutory 3% Social Welfare Tax application on capital equipment and dump trucks.',
      'Second Schedule: Duty-free investment incentive eligibility criteria for manufacturing and construction.'
    ],
    samplePreviewText: `ETHIOPIAN CUSTOMS COMMISSION (ECC) CLASSIFICATION GUIDE:
Section XVII: Vehicles, Aircraft, Vessels and Associated Transport Equipment
- HS 8704.23.00: Dumpers designed for off-highway use with gross vehicle weight exceeding 20 tons.
- First Schedule Duty: 10% - 20% standard rate.
- Second Schedule Incentive: 0% Duty privilege with valid Ethiopian Investment Commission certificate.
- Mandatory Statutory Taxes: Social Welfare Tax (Code 12) @ 3.00% on CIF value.
- Scanning Fee: Code 16 @ 0.07% on CIF valuation.`
  },
  {
    id: 'res-03',
    title: 'Commercial Bank Import Letter of Credit (L/C) Checklist & Margin Protocols',
    category: 'checklist',
    authority: 'Commercial Bank of Ethiopia (CBE) & Private Banks',
    description: 'Practical checklist required by Ethiopian commercial banks before opening an import Letter of Credit, verifying proforma invoices, and computing margin cash debits.',
    format: 'DOCX',
    fileSize: '850 KB',
    keyHighlights: [
      'Valid MoTRI commercial trade license matching the proforma invoice 8-digit HS code.',
      'Quarterly Tax Clearance Certificate from the Ministry of Revenues.',
      'Commercial bank commission schedule (4.00% flat commission + 15% VAT).',
      'Mandatory Marine Cargo Insurance certificate issued by a licensed Ethiopian insurer.'
    ],
    samplePreviewText: `IMPORT L/C DOCUMENTARY SUBMISSION CHECKLIST:
[ ] 1. Three (3) original Proforma Invoices with valid supplier quotation validity (min. 60 days).
[ ] 2. Description of goods, HS code, payment term (FOB / C&F / CIF), and shipment origin.
[ ] 3. Marine Insurance Certificate covering 110% of C&F value from an Ethiopian insurance company.
[ ] 4. Current fiscal quarter Tax Clearance Certificate from Ministry of Revenues.
[ ] 5. Cash margin deposit: Minimum 30% margin hold + 4% bank commission + 15% VAT on commission.
[ ] 6. NBE foreign exchange declaration permit form verified via Ethiopian Single Window.`
  },
  {
    id: 'res-04',
    title: 'Djibouti-Addis Corridor Logistics Tariff & Demurrage Free-Time Handbook',
    category: 'guideline',
    authority: 'ESLSE & Port of Djibouti (Doraleh)',
    description: 'Official tariff benchmark for container stevedoring, terminal handling (THC), container demurrage penalty tiers, and overland heavy-haulage rates from Djibouti to Mojo Dry Port.',
    format: 'PDF',
    fileSize: '3.1 MB',
    keyHighlights: [
      'Port Doraleh Terminal Handling Charges (THC) and customs transit escort fees.',
      'Free time matrix: 14 to 21 free days from vessel discharge before container detention fines begin.',
      'Demurrage escalation penalty rates: $30 to $120 USD per container per day after free period.',
      'Ethio-Djibouti Railway freight tariffs vs highway trucking freight tariffs (~540,000 ETB/container).'
    ],
    samplePreviewText: `CORRIDOR TRANSIT & PORT CLEARANCE SUMMARY:
- Port Discharge: Port of Djibouti (Doraleh Container Terminal / DMP).
- Standard Terminal Dwell: 14 free days for Ethiopian multimodal transit cargo.
- Demurrage Charges (Days 15-21): $30 USD / 20ft, $60 USD / 40ft per day.
- Demurrage Charges (Days 22+): $60 USD / 20ft, $120 USD / 40ft per day.
- Overland Trucking: Djibouti -> Galafi -> Mojo Dry Port (approx. 500,000 - 550,000 ETB per heavy vehicle lot).
- Railway Transit Option: Nagad (Djibouti) to Mojo Dry Port (transit time: 18 hours).`
  },
  {
    id: 'res-05',
    title: 'Imports Landed Cost Buildup Excel Modeling Template (PDF Replicated)',
    category: 'template',
    authority: 'Ethiopian Trade Finance & Logistics Academy',
    description: 'Complete calculation spreadsheet mirroring the official reference sheet: FOB, freight, insurance 1%*(1.1*C&F), bank commission, NBE fee, customs, port handling, and 0% to 100% margin matrices.',
    format: 'XLSX',
    fileSize: '1.2 MB',
    keyHighlights: [
      'Automatic calculation of C&F, CIF, bank commission (4%) and VAT (15%).',
      'Dynamic exchange rate increment projection (1.80% monthly rise protection).',
      'Complete gross margin table (0% to 100%) generating unit cost rate and duty-paid prices.',
      'Ready-to-use formulas configured in ETB and USD for any commercial equipment or vehicles.'
    ],
    samplePreviewText: `EXCEL WORKBOOK SHEET STRUCTURE:
Tab 1: Valuation Inputs (Supplier, Customer, FOB USD, Freight USD, Exchange Rates: Opening, Settlement, Today).
Tab 2: Bank & Regulatory Charges (LC Commission 4%, VAT 15%, NBE 2.5%, SWIFT fees).
Tab 3: Customs & Port Logistics (Taxes, Djibouti Clearance, Trucking to Addis/Indode, Assembly).
Tab 4: Commercial Margin Matrix (0% - 100% markup, Cost Rate ETB/USD, 2-Month Breakeven Threshold).`
  },
  {
    id: 'res-06',
    title: 'Ethiopian Single Window (ESW) e-SAD Declaration Submission Protocol',
    category: 'checklist',
    authority: 'Ministry of Trade & Ethiopian Customs Commission',
    description: 'Standard operating procedure for creating electronic Single Administrative Documents (e-SAD), linking bank forex permits, and resolving OGA clearance locks on trade.esw.et.',
    format: 'DOCX',
    fileSize: '920 KB',
    keyHighlights: [
      'Digital TIN registration and declarant digital token authentication.',
      'Bank permit electronic matching rules (matching proforma numbers, supplier names, values).',
      'Routing through the 16 Participating Government Agencies (EFDA, MoTRI, Agriculture, Radiation).',
      'Interpreting customs clearance channel risk colors: Green, Blue, Yellow, Red.'
    ],
    samplePreviewText: `ESW SUBMISSION PROTOCOL (trade.esw.et):
1. User Authentication: Access portal with valid TIN and declarant security credentials.
2. Document Pre-Registration: Input Bill of Lading, Carrier Code, and Port of Loading.
3. Bank Permit Association: Enter Bank Permit Number; verify automated value verification.
4. OGA Electronic Clearance: Attach digital certificates for regulated commodities.
5. Assessment Generation: Review 7-tier tax cascade and export e-Payment government voucher.`
  },
  {
    id: 'res-07',
    title: 'Arabica Coffee & Sesame Export Contract Registration Guide',
    category: 'guideline',
    authority: 'Ethiopian Coffee and Tea Authority & ECX',
    description: 'Official procedure for purchasing export commodities through ECX auctions or direct washing station contracts, registering floor prices with NBE, and claiming 0% export duty privileges.',
    format: 'PDF',
    fileSize: '2.9 MB',
    keyHighlights: [
      'Coffee cupping laboratory grading protocols (Grade 1 to Grade 5 physical defect standards).',
      'Mandatory NBE sales contract registration within 24 hours of execution.',
      'Issuance of Phytosanitary Certificates and International Coffee Organization (ICO) Certificates of Origin.',
      'Opening and managing the 50% NBE Foreign Exchange Retention Account.'
    ],
    samplePreviewText: `EXPORT COMPLIANCE STANDARD:
- Commodity: Ethiopian Arabica Coffee (Washed & Natural: Sidama, Yirgacheffe, Guji, Jimma).
- Quality Grading: Evaluated by Coffee & Tea Authority Liquoring Unit for cup score, aroma, and moisture (10.5% - 12.0%).
- Minimum Floor Pricing: Export contract price must meet or exceed daily NBE export minimum benchmark.
- Customs Treatment: 0% export customs duty and 0% withholding tax on foreign outbound shipments.`
  },
  {
    id: 'res-08',
    title: 'Customs Valuation Dispute & Penalty Defense Petition Template',
    category: 'template',
    authority: 'Ethiopian Customs Commission Valuation Directorate',
    description: 'Legal appeal template for importers challenging arbitrary customs price benchmark uplifts under Customs Proclamation No. 859/2014, defending Method 1 Transaction Value.',
    format: 'DOCX',
    fileSize: '650 KB',
    keyHighlights: [
      'Statutory legal grounds citing Proclamation No. 859/2014 Article 91-98 (Valuation hierarchy).',
      'Documentary evidence annex list: Swift advices, audited contracts, manufacturer test certificates.',
      'Procedure for filing petition within the 30-day statutory grievance review window.',
      'Guidelines for avoiding or appealing 100% to 200% under-invoicing penalty assessments.'
    ],
    samplePreviewText: `FORMAL VALUATION APPEAL PETITION (Proclamation 859/2014):
To: The Valuation Grievance Committee, Ethiopian Customs Commission
Subject: Petition against Valuation Uplift on Declaration No. [e-SAD-Reference]
1. Factual Background: The importer imported [Goods Description] under commercial invoice value of [$ USD].
2. Legal Grounds: Under Article 91 of Proclamation 859/2014, customs valuation shall primarily be determined based on Transaction Value (Method 1).
3. Documentary Proof: Attached find authenticated Bank Swift Debit Advice and Manufacturer Contract confirming true price paid.
4. Prayer: We respectfully request the reversal of the uplifted benchmark assessment.`
  }
];
