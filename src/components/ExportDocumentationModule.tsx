import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Printer,
  Sparkles,
  FileCheck2,
  Stamp,
  Layers,
  FileSpreadsheet,
  Package,
  Calendar,
  Globe,
  DollarSign,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface ExportDocDefinition {
  id: 'sales_contract' | 'proforma_invoice' | 'packing_list' | 'certificate_of_origin';
  title: string;
  amharicTitle: string;
  shortDesc: string;
  governingAuthority: string;
  legalProclamation: string;
  workflowStage: string;
  requiredFor: string;
  turnaroundTime: string;
  estimatedCost: string;
  mandatoryClauses: string[];
  rejectionPitfalls: string[];
  defaultValues: {
    exporterName: string;
    exporterTIN: string;
    exporterLicense: string;
    exporterAddress: string;
    exporterTel: string;
    exporterEmail: string;
    buyerName: string;
    buyerAddress: string;
    buyerCountry: string;
    commodityName: string;
    commodityGrade: string;
    hsCode: string;
    cropYear: string;
    incoterm: string;
    portOfLoading: string;
    portOfDischarge: string;
    quantity: string;
    unitPrice: string;
    currency: string;
    paymentTerms: string;
    bankName: string;
    bankSwift: string;
    bankAccount: string;
    containerNo: string;
    sealNo: string;
    marksAndNumbers: string;
    chamberCertificateNo: string;
  };
}

export const EXPORT_DOCUMENT_DEFINITIONS: ExportDocDefinition[] = [
  {
    id: 'sales_contract',
    title: 'International Export Sales Contract',
    amharicTitle: 'የዓለም አቀፍ የውጭ ንግድ ሽያጭ ውል',
    shortDesc: 'The legally binding international sales agreement registered with the National Bank of Ethiopia (NBE) and commercial banks to validate foreign exchange repatriation and floor prices.',
    governingAuthority: 'Ministry of Trade & Regional Integration (MoTRI) / National Bank of Ethiopia (NBE)',
    legalProclamation: 'Ethiopian Commercial Code & NBE Foreign Exchange Directive SBB/73/2020',
    workflowStage: 'Phase 1: Commercial Negotiation & NBE Contract Registration',
    requiredFor: 'All commercial exports from Ethiopia (Coffee, Sesame, Pulses, Flowers, Meat, Garments)',
    turnaroundTime: '24 hours within contract signing for NBE registration',
    estimatedCost: 'Free (Statutory contract registration at authorized Commercial Bank)',
    mandatoryClauses: [
      'Minimum NBE benchmark price compliance statement',
      'Incoterms® 2020 delivery rule with explicit loading terminal (e.g. FOB Port of Djibouti or FCA Indode)',
      '100% Repatriation clause adhering to NBE FX surrender directives (currently 50% NBE / 10% Bank / 40% Exporter)',
      'Pre-shipment inspection authority clause (ECTALE, Ministry of Agriculture, or SGS/Cotecna)',
      'Arbitration & Governing Law clause (Addis Ababa Chamber of Commerce Arbitration Center or ICC rules)'
    ],
    rejectionPitfalls: [
      'Stipulating an export price lower than the NBE daily floor price for coffee, sesame, or haricot beans.',
      'Using maritime FOB with an inland location (e.g., "FOB Addis Ababa"); must state FOB Port of Djibouti or FCA Indode Multimodal Freight Terminal.',
      'Failing to submit the contract for bank registration within 24 hours of signature date for coffee.',
      'Omitting exact crop harvest year and Ethiopian Coffee & Tea Authority (ECTALE) grade.'
    ],
    defaultValues: {
      exporterName: 'RIFT VALLEY SPECIALTY EXPORTS PLC',
      exporterTIN: '0048192014',
      exporterLicense: 'MTRI/EXP/AA/2022/09418',
      exporterAddress: 'Bole Subcity, Woreda 03, House 412, Addis Ababa, Ethiopia',
      exporterTel: '09 11 45 78 90',
      exporterEmail: 'info@riftvalleyexports.et',
      buyerName: 'HANSEATIC COFFEE IMPORTERS GMBH',
      buyerAddress: 'Am Sandtorkai 48, Speicherstadt, 20457 Hamburg, Germany',
      buyerCountry: 'Germany',
      commodityName: 'Ethiopian Washed Arabica Coffee Beans',
      commodityGrade: 'Grade 1 Guji Shakiso Specialty Lot',
      hsCode: '0901.11.00',
      cropYear: '2025/2026 Season',
      incoterm: 'FOB Port of Djibouti (Incoterms 2020)',
      portOfLoading: 'Indode Multimodal Terminal via Port of Djibouti',
      portOfDischarge: 'Port of Hamburg, Germany',
      quantity: '19,200.00 Kgs (320 GrainPro-lined Jute Bags)',
      unitPrice: '$6.85 USD / Kg',
      currency: 'USD',
      paymentTerms: '100% Irrevocable Letter of Credit (L/C) at sight confirmed by first-class European bank',
      bankName: 'Commercial Bank of Ethiopia (CBE), Finfine Branch',
      bankSwift: 'CBETETAA',
      bankAccount: '1000189204819',
      containerNo: 'MSKU-419205-2 (1 x 20ft FCL)',
      sealNo: 'ETH-CUSTOMS-88192',
      marksAndNumbers: 'RVE / HAMBURG / GUJI G1 / BAGS 001-320 / ETHIOPIA',
      chamberCertificateNo: 'ECCSA/COO/2026/08412'
    }
  },
  {
    id: 'proforma_invoice',
    title: 'Export Proforma Invoice',
    amharicTitle: 'የወጪ ንግድ ፕሮፎርማ ደረሰኝ',
    shortDesc: 'The essential preliminary invoice used by overseas buyers to open an Irrevocable Letter of Credit (L/C) and by Ethiopian commercial banks to issue the Foreign Exchange Permit.',
    governingAuthority: 'National Bank of Ethiopia (NBE) & Authorized Commercial Banks',
    legalProclamation: 'NBE Banking Business Proclamation & Directives on Export Bank Permits',
    workflowStage: 'Phase 1: Financing, LC Issuance & Bank Permit Approval',
    requiredFor: 'Bank Permit application, buyer import license, and customs valuation baseline',
    turnaroundTime: 'Immediate issuance by Exporter (Valid for 30–60 days)',
    estimatedCost: 'Free (Internal corporate issuance on official letterhead)',
    mandatoryClauses: [
      'Proforma validity date (mandatory for bank permit lifecycle)',
      'Clear itemized breakdown of unit prices, metric quantities, and total FOB/CFR value',
      'Exporter full corporate TIN, VAT registration, and Ministry of Trade export permit reference',
      'Exact bank coordinates including SWIFT BIC, IBAN/Account Number, and correspondent bank details',
      'Certification of Origin statement: "Goods of Ethiopian Origin wholly harvested and processed in Ethiopia"'
    ],
    rejectionPitfalls: [
      'Issuing a proforma that expires before the foreign buyer completes L/C application at their bank.',
      'Unit price mismatch against subsequent final Commercial Invoice or Single Window e-SAD entry.',
      'Missing bank swift coordinates, forcing overseas issuing banks to query and delay L/C transmission.'
    ],
    defaultValues: {
      exporterName: 'RIFT VALLEY SPECIALTY EXPORTS PLC',
      exporterTIN: '0048192014',
      exporterLicense: 'MTRI/EXP/AA/2022/09418',
      exporterAddress: 'Bole Subcity, Woreda 03, House 412, Addis Ababa, Ethiopia',
      exporterTel: '09 11 45 78 90',
      exporterEmail: 'info@riftvalleyexports.et',
      buyerName: 'HANSEATIC COFFEE IMPORTERS GMBH',
      buyerAddress: 'Am Sandtorkai 48, Speicherstadt, 20457 Hamburg, Germany',
      buyerCountry: 'Germany',
      commodityName: 'Ethiopian Washed Arabica Coffee Beans',
      commodityGrade: 'Grade 1 Guji Shakiso Specialty Lot',
      hsCode: '0901.11.00',
      cropYear: '2025/2026 Season',
      incoterm: 'FOB Port of Djibouti (Incoterms 2020)',
      portOfLoading: 'Indode Multimodal Terminal / Port of Djibouti',
      portOfDischarge: 'Port of Hamburg, Germany',
      quantity: '19,200.00 Kgs (320 Bags of 60 Kg Net)',
      unitPrice: '$6.85 USD / Kg',
      currency: 'USD',
      paymentTerms: '100% at sight by Irrevocable Letter of Credit',
      bankName: 'Commercial Bank of Ethiopia (CBE), Finfine Branch, Addis Ababa',
      bankSwift: 'CBETETAA',
      bankAccount: '1000189204819',
      containerNo: 'MSKU-419205-2 (20ft Dry Box)',
      sealNo: 'ETH-CUSTOMS-88192',
      marksAndNumbers: 'RVE / HAMBURG / GUJI G1 / BAGS 001-320 / ETHIOPIA',
      chamberCertificateNo: 'ECCSA/COO/2026/08412'
    }
  },
  {
    id: 'packing_list',
    title: 'Detailed Export Packing List & Container Tally Sheet',
    amharicTitle: 'ዝርዝር የወጪ ማሸጊያና ጭነት ሉህ (ፓኪንግ ሊስት)',
    shortDesc: 'Itemizes the physical breakdown of cargo, package types, piece counts, net and gross weights, container identification, and bolt seal numbers for customs scanning and shipping lines.',
    governingAuthority: 'Ethiopian Customs Commission (ECC) & Shipping Lines (ESLSE, Maersk, MSC)',
    legalProclamation: 'Customs Proclamation No. 859/2014 & IMO SOLAS Verified Gross Mass (VGM) Rules',
    workflowStage: 'Phase 3: Ethiopian Single Window e-SAD & Dry Port Terminal Stuffing',
    requiredFor: 'Customs green/yellow/red channel routing, container weighbridge ticket, and Bill of Lading issuance',
    turnaroundTime: 'Prepared upon completion of warehouse container stuffing and weighbridge tally',
    estimatedCost: 'Free (Warehouse stuffing and tally documentation)',
    mandatoryClauses: [
      'Bag-by-bag or carton-by-carton tally numbering (e.g. Package 001 to 320)',
      'Exact Net Weight, Tare Weight of packaging, and Total Gross Weight in Kilograms',
      'Container number (ISO standard format) and High Security bolt seal number',
      'Verified Gross Mass (VGM) calculation including container tare weight',
      'Prominent stenciled shipping marks matching Bill of Lading requirements'
    ],
    rejectionPitfalls: [
      'Discrepancy between gross weight on packing list and the certified weighbridge slip at Indode or Mojo dry port.',
      'Mismatched container or bolt seal numbers versus the customs e-SAD release order.',
      'Forgetting to list individual carton weights or inner polybag/GrainPro liner specifications.'
    ],
    defaultValues: {
      exporterName: 'RIFT VALLEY SPECIALTY EXPORTS PLC',
      exporterTIN: '0048192014',
      exporterLicense: 'MTRI/EXP/AA/2022/09418',
      exporterAddress: 'Bole Subcity, Woreda 03, House 412, Addis Ababa, Ethiopia',
      exporterTel: '09 11 45 78 90',
      exporterEmail: 'info@riftvalleyexports.et',
      buyerName: 'HANSEATIC COFFEE IMPORTERS GMBH',
      buyerAddress: 'Am Sandtorkai 48, Speicherstadt, 20457 Hamburg, Germany',
      buyerCountry: 'Germany',
      commodityName: 'Ethiopian Washed Arabica Coffee Beans (Grade 1 Guji)',
      commodityGrade: 'Export Grade 1 - Certified Cupping 87.5 Pts',
      hsCode: '0901.11.00',
      cropYear: '2025/2026 Harvest',
      incoterm: 'FOB Port of Djibouti',
      portOfLoading: 'Indode Multimodal Inland Port / Port of Djibouti',
      portOfDischarge: 'Port of Hamburg, Germany',
      quantity: '320 GrainPro-lined Jute Bags (60.00 Kg Net each)',
      unitPrice: '$6.85 USD / Kg',
      currency: 'USD',
      paymentTerms: 'Confirmed L/C No. DC-HAMB-2026-904',
      bankName: 'Commercial Bank of Ethiopia',
      bankSwift: 'CBETETAA',
      bankAccount: '1000189204819',
      containerNo: 'MSKU-419205-2 (1 x 20ft Standard Dry Container)',
      sealNo: 'ETH-CUSTOMS-88192 / MAERSK-092144',
      marksAndNumbers: 'RVE / HAMBURG / GUJI SPECIALTY G1 / 001-320 / ETHIOPIAN ORIGIN',
      chamberCertificateNo: 'ECCSA/COO/2026/08412'
    }
  },
  {
    id: 'certificate_of_origin',
    title: 'Certificate of Origin (C/O - ECCSA & Preferential Forms)',
    amharicTitle: 'የንግድና ዘርፍ ማህበራት የትውልድ አገር ሰርተፊኬት (C/O)',
    shortDesc: 'Official certification issued by the Ethiopian Chamber of Commerce and Sectoral Associations (ECCSA) or Customs proving that goods are wholly produced or manufactured in Ethiopia.',
    governingAuthority: 'Ethiopian Chamber of Commerce (ECCSA) / Ethiopian Customs Commission (EUR.1 / AfCFTA)',
    legalProclamation: 'Chambers of Commerce Proclamation & International Chamber of Commerce (ICC) Rules',
    workflowStage: 'Phase 4: Origin Certification & Preferential Tariff Qualification',
    requiredFor: 'Destination customs clearance, duty-free qualification (EBA / GSP / AfCFTA / COMESA), and L/C compliance',
    turnaroundTime: '2 to 4 hours at ECCSA Addis Ababa office or Single Window e-Origin module',
    estimatedCost: '300 – 800 ETB administrative authentication fee',
    mandatoryClauses: [
      'Consignor (registered Ethiopian exporter with active Chamber membership)',
      'Consignee name and destination country matching shipping documentation',
      'Wholly obtained declaration: "Wholly produced in the Federal Democratic Republic of Ethiopia"',
      'Chamber authorized stamp, signature of Secretary General or designated attestation officer',
      'Direct consignment transport coordinates (Port of Djibouti transit corridor)'
    ],
    rejectionPitfalls: [
      'Applying for a standard non-preferential Chamber COO when the European buyer’s L/C specifically requested an EUR.1 Movement Certificate for 0% duty under EBA.',
      'Spelling differences in exporter or consignee name compared to the Bill of Lading.',
      'Applying without renewed annual Chamber of Commerce membership certificate.'
    ],
    defaultValues: {
      exporterName: 'RIFT VALLEY SPECIALTY EXPORTS PLC',
      exporterTIN: '0048192014',
      exporterLicense: 'MTRI/EXP/AA/2022/09418',
      exporterAddress: 'Bole Subcity, Woreda 03, House 412, Addis Ababa, Ethiopia',
      exporterTel: '09 11 45 78 90',
      exporterEmail: 'info@riftvalleyexports.et',
      buyerName: 'HANSEATIC COFFEE IMPORTERS GMBH',
      buyerAddress: 'Am Sandtorkai 48, Speicherstadt, 20457 Hamburg, Germany',
      buyerCountry: 'Germany',
      commodityName: 'Ethiopian Washed Arabica Coffee Beans',
      commodityGrade: 'Grade 1 Guji Shakiso Specialty Lot',
      hsCode: '0901.11.00',
      cropYear: '2025/2026 Harvest',
      incoterm: 'FOB Port of Djibouti',
      portOfLoading: 'Indode Multimodal Terminal via Port of Djibouti',
      portOfDischarge: 'Port of Hamburg, Germany',
      quantity: '19,200.00 Kgs Net (320 Jute Bags with GrainPro liners)',
      unitPrice: '$6.85 USD / Kg',
      currency: 'USD',
      paymentTerms: 'L/C No. DC-HAMB-2026-904',
      bankName: 'Commercial Bank of Ethiopia',
      bankSwift: 'CBETETAA',
      bankAccount: '1000189204819',
      containerNo: 'MSKU-419205-2 (1 x 20ft Box)',
      sealNo: 'ETH-CUSTOMS-88192',
      marksAndNumbers: 'RVE / HAMBURG / GUJI G1 / BAGS 001-320 / ETHIOPIA',
      chamberCertificateNo: 'ECCSA/COO/2026/08412'
    }
  }
];

export const COMMODITY_PRESETS = [
  {
    id: 'coffee',
    name: 'Ethiopian Specialty Arabica Coffee (Guji Grade 1)',
    commodityName: 'Ethiopian Washed Arabica Coffee Beans',
    commodityGrade: 'Grade 1 Guji Shakiso Specialty Lot',
    hsCode: '0901.11.00',
    quantity: '19,200.00 Kgs (320 GrainPro Bags of 60kg net)',
    unitPrice: '$6.85 USD / Kg',
    incoterm: 'FOB Port of Djibouti (Incoterms 2020)',
    marksAndNumbers: 'RVE / HAMBURG / GUJI G1 / BAGS 001-320 / ETHIOPIA',
    destination: 'Port of Hamburg, Germany',
    buyer: 'HANSEATIC COFFEE IMPORTERS GMBH, Hamburg, Germany'
  },
  {
    id: 'sesame',
    name: 'Whitish Humera Sesame Seeds (Machine Cleaned 99.5%)',
    commodityName: 'Ethiopian Natural Whitish Humera Sesame Seeds',
    commodityGrade: 'Machine Cleaned 99.5% Purity, Max 6% Moisture, 52% Oil Content',
    hsCode: '1207.40.00',
    quantity: '38,000.00 Kgs (760 New Polypropylene Bags of 50kg)',
    unitPrice: '$1,920.00 USD / Metric Ton',
    incoterm: 'FOB Port of Djibouti (Incoterms 2020)',
    marksAndNumbers: 'ETHIO-OILSEEDS / QINGDAO / HUMERA SESAME / LOT 18 / 001-760',
    destination: 'Port of Qingdao, China',
    buyer: 'SHANDONG AGRO-COMMODITIES IMPORT CORP, Qingdao, China'
  },
  {
    id: 'flowers',
    name: 'Fresh Cut Roses (Bishoftu High-Altitude Stems)',
    commodityName: 'Fresh Cut Flowers (Highland Hybrid Tea Roses 50-70cm)',
    commodityGrade: 'First Class Export Quality, Cold-Chain Preserved (2°C - 4°C)',
    hsCode: '0603.11.00',
    quantity: '145,000 Stems (420 Master Telescopic Cartons)',
    unitPrice: '$0.34 USD / Stem',
    incoterm: 'CPT Amsterdam Schiphol Airport (Incoterms 2020)',
    marksAndNumbers: 'ETHIO-ROSE / AMS-FLOWER / AMSTERDAM / CARTONS 001-420',
    destination: 'Amsterdam Schiphol Cargo Hub (via Ethiopian Cargo ET 500)',
    buyer: 'ROYAL FLORAHOLLAND BUYERS COOPERATIVE, Aalsmeer, Netherlands'
  },
  {
    id: 'meat',
    name: 'Chilled Sheep Carcasses (Halal Export Abattoir)',
    commodityName: 'Fresh Chilled Whole Sheep Carcasses (Wrapped in Sterile Stockinette)',
    commodityGrade: 'Standard Halal Carcasses 8-12 Kg (GSO 2055-1 Compliant)',
    hsCode: '0204.10.00',
    quantity: '1,200 Carcasses (12,000.00 Kgs Net)',
    unitPrice: '$7.80 USD / Kg',
    incoterm: 'CPT Dubai International Airport (Incoterms 2020)',
    marksAndNumbers: 'MODJO-HALAL / DXB / ETHIO-LAMB / LOT 2026-90',
    destination: 'Dubai International Airport Cargo Village, UAE',
    buyer: 'AL-KHALEEJ MEAT & FOOD IMPORTS LLC, Deira, Dubai, UAE'
  }
];

export const ExportDocumentationModule: React.FC = () => {
  const { setSelectedChapterId, setActiveNavTab } = useApp();
  const [selectedDocId, setSelectedDocId] = useState<'sales_contract' | 'proforma_invoice' | 'packing_list' | 'certificate_of_origin'>('sales_contract');
  const [viewMode, setViewMode] = useState<'official_document' | 'raw_template' | 'statutory_guide'>('official_document');
  const [copied, setCopied] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Form customizer state
  const currentDocDef = EXPORT_DOCUMENT_DEFINITIONS.find(d => d.id === selectedDocId) || EXPORT_DOCUMENT_DEFINITIONS[0];
  const [formValues, setFormValues] = useState(currentDocDef.defaultValues);
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Handle doc switch
  const handleSelectDoc = (docId: 'sales_contract' | 'proforma_invoice' | 'packing_list' | 'certificate_of_origin') => {
    setSelectedDocId(docId);
    const def = EXPORT_DOCUMENT_DEFINITIONS.find(d => d.id === docId);
    if (def) {
      setFormValues(prev => ({
        ...def.defaultValues,
        exporterName: prev.exporterName || def.defaultValues.exporterName,
        exporterTIN: prev.exporterTIN || def.defaultValues.exporterTIN,
        exporterTel: prev.exporterTel || def.defaultValues.exporterTel,
        buyerName: prev.buyerName || def.defaultValues.buyerName
      }));
    }
  };

  // Apply preset
  const handleApplyPreset = (preset: typeof COMMODITY_PRESETS[0]) => {
    setFormValues(prev => ({
      ...prev,
      commodityName: preset.commodityName,
      commodityGrade: preset.commodityGrade,
      hsCode: preset.hsCode,
      quantity: preset.quantity,
      unitPrice: preset.unitPrice,
      incoterm: preset.incoterm,
      marksAndNumbers: preset.marksAndNumbers,
      portOfDischarge: preset.destination,
      buyerName: preset.buyer.split(',')[0],
      buyerAddress: preset.buyer
    }));
  };

  // Generate plain text template
  const generateTemplateText = (): string => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const refNum = `EXP-ET-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    if (selectedDocId === 'sales_contract') {
      return `================================================================================
INTERNATIONAL EXPORT SALES CONTRACT
FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA
Statutory Contract Ref: ${refNum} | Date: ${today}
Registered under NBE Directive SBB/73/2020 & Ethiopian Commercial Code
================================================================================

1. PARTIES TO THE CONTRACT:
--------------------------------------------------------------------------------
SELLER (EXPORTER):
  Company Name:    ${formValues.exporterName}
  TIN:             ${formValues.exporterTIN} | VAT Reg: 000-EXPORT-ZERO-RATED
  Trade License:   ${formValues.exporterLicense} (MoTRI Foreign Trade Permit)
  Registered Office:${formValues.exporterAddress}
  Tel / Mobile:    ${formValues.exporterTel} (Direct Export Desk)
  Email:           ${formValues.exporterEmail}

BUYER (IMPORTER):
  Company Name:    ${formValues.buyerName}
  Registered Office:${formValues.buyerAddress}
  Country:         ${formValues.buyerCountry}

2. COMMODITY SPECIFICATION & QUALITY STANDARDS:
--------------------------------------------------------------------------------
Commodity:         ${formValues.commodityName}
Grade / Quality:   ${formValues.commodityGrade}
Harmonized Code:   HS ${formValues.hsCode}
Crop / Harvest:    ${formValues.cropYear}
Country of Origin: Wholly Harvested & Processed in Ethiopia

3. QUANTITY & CONTRACT VALUE:
--------------------------------------------------------------------------------
Total Quantity:    ${formValues.quantity} (+/- 5% shipping tolerance at Seller option)
Unit Price:        ${formValues.unitPrice} ${formValues.incoterm}
Total Value:       Computed based on certified shipping weight at agreed unit price.
Floor Price Note:  Seller certifies agreed unit price is equal to or exceeds the 
                   National Bank of Ethiopia (NBE) official floor benchmark.

4. TERMS OF DELIVERY & LOGISTICS:
--------------------------------------------------------------------------------
Incoterms® 2020:   ${formValues.incoterm}
Port of Loading:   ${formValues.portOfLoading}
Port of Discharge: ${formValues.portOfDischarge}
Latest Shipment:   Within 60 calendar days from receipt of operative L/C
Transshipment:     Allowed with prior written notification
Partial Shipment:  Not Allowed / Subject to buyer agreement
Packaging:         Certified export packaging suited for multimodal tropical sea transit
Marks & Numbers:   "${formValues.marksAndNumbers}"

5. TERMS OF PAYMENT & BANKING COORDINATES:
--------------------------------------------------------------------------------
Payment Method:    ${formValues.paymentTerms}
Beneficiary Bank:  ${formValues.bankName}
SWIFT BIC:         ${formValues.bankSwift}
Account Number:    ${formValues.bankAccount}
Currency:          ${formValues.currency}
NBE FX Compliance: Exporter adheres to mandatory foreign exchange surrender and 
                   retention rules per National Bank of Ethiopia Directive.

6. INSPECTION & QUALITY CERTIFICATION:
--------------------------------------------------------------------------------
Pre-shipment quality and sensory evaluation shall be certified by the authorized
competent authority:
  - Coffee: Ethiopian Coffee & Tea Authority (ECTALE cupping & moisture certificate)
  - Agricultural/Horticultural: Ministry of Agriculture Phytosanitary Certificate
  - Weight & Tally: Port weighbridge Verified Gross Mass (VGM) container certificate

7. ARBITRATION & JURISDICTION:
--------------------------------------------------------------------------------
Any dispute arising out of or in connection with this contract shall be settled
amicably. Failing which, it shall be finally resolved under the Rules of Arbitration
of the Addis Ababa Chamber of Commerce and Sectoral Associations (ECCSA) Arbitration
Center, or the International Chamber of Commerce (ICC), Paris.

8. STATUTORY SIGNATURE & ATTESTATION:
--------------------------------------------------------------------------------
For and on behalf of SELLER:               For and on behalf of BUYER:

_____________________________________      _____________________________________
Authorized Signature & Corporate Seal      Authorized Signature & Corporate Seal
Date: ${today}                             Date: ${today}
`;
    }

    if (selectedDocId === 'proforma_invoice') {
      return `================================================================================
${formValues.exporterName}
OFFICIAL EXPORT PROFORMA INVOICE
TIN: ${formValues.exporterTIN} | MoTRI Export License: ${formValues.exporterLicense}
${formValues.exporterAddress} | Tel: ${formValues.exporterTel} | ${formValues.exporterEmail}
================================================================================
PROFORMA INVOICE NO:  PI-ET-2026-${Math.floor(1000 + Math.random() * 9000)}
Date of Issue:        ${today}
Validity:             30 Calendar Days (Mandatory for Bank Permit Processing)
NBE Permit Reference: CBE/EXP/FX/2026/04192 (Pending L/C Registration)
--------------------------------------------------------------------------------
BUYER / CONVOYEE:
  ${formValues.buyerName}
  ${formValues.buyerAddress}
  Country: ${formValues.buyerCountry}

SHIPPING & CORRIDOR DETAILS:
  Incoterms 2020:     ${formValues.incoterm}
  Place of Loading:   ${formValues.portOfLoading}
  Place of Delivery:  ${formValues.portOfDischarge}
  Estimated Dispatch: 45 Days from Confirmed L/C receipt
--------------------------------------------------------------------------------
ITEMIZED COMMERCIAL DESCRIPTION:
--------------------------------------------------------------------------------
Item No | HS Code    | Description & Grade               | Quantity        | Unit Price    | Total Amount (${formValues.currency})
01      | ${formValues.hsCode} | ${formValues.commodityName}
        |            | - ${formValues.commodityGrade}
        |            | - Crop Year: ${formValues.cropYear}
        |            | - Packaging: 60kg Export Bags     | ${formValues.quantity} | ${formValues.unitPrice} | Total Invoice Value
--------------------------------------------------------------------------------
TOTAL INVOICE AMOUNT (${formValues.incoterm}): Payable in ${formValues.currency}
--------------------------------------------------------------------------------

BANKING & PAYMENT INSTRUCTIONS:
  Payment Terms:     ${formValues.paymentTerms}
  Beneficiary Bank:  ${formValues.bankName}
  Bank Address:      Finfine Branch, Churchill Road, Addis Ababa, Ethiopia
  SWIFT BIC Code:    ${formValues.bankSwift}
  Account Number:    ${formValues.bankAccount}
  Correspondent Bank:Citibank N.A. New York / Commerzbank AG Frankfurt

STATUTORY DECLARATION:
"We hereby declare that this Proforma Invoice reflects the true and agreed price
for the stated Ethiopian export consignment, in strict adherence to National Bank
of Ethiopia foreign exchange guidelines. Goods are wholly of Ethiopian origin."

AUTHORIZED EXPORT SIGNATURE & OFFICIAL COMPANY STAMP:

________________________________________
Head of International Trade Division
${formValues.exporterName}
`;
    }

    if (selectedDocId === 'packing_list') {
      return `================================================================================
EXPORT PACKING LIST & CONTAINER TALLY SHEET
FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA
Document Ref: PL-ET-2026-${Math.floor(1000 + Math.random() * 9000)} | Date: ${today}
Accompanying Commercial Invoice & Ethiopian Single Window e-SAD
================================================================================
EXPORTER:                               CONSIGNEE:
${formValues.exporterName}              ${formValues.buyerName}
TIN: ${formValues.exporterTIN}          ${formValues.buyerAddress}
${formValues.exporterAddress}           Country: ${formValues.buyerCountry}
Tel: ${formValues.exporterTel}

SHIPMENT & VESSEL PARTICULARS:
--------------------------------------------------------------------------------
Vessel / Voyage:    MSC BEATRICE V.2614 (Connecting Port of Djibouti)
Ocean Carrier:      Mediterranean Shipping Company (MSC) / ESLSE
Port of Loading:    Indode Multimodal Terminal via Djibouti Port
Port of Discharge:  ${formValues.portOfDischarge}
Container Number:   ${formValues.containerNo}
Customs Bolt Seal:  ${formValues.sealNo}
Shipping Marks:     "${formValues.marksAndNumbers}"

CONTAINER TALLY & WEIGHT SPECIFICATIONS:
--------------------------------------------------------------------------------
Pkg Range | Package Type            | Commodity Description              | Net Wt (Kg)   | Gross Wt (Kg)
001 - 320 | Export Jute Bags with   | ${formValues.commodityName}
          | GrainPro Hermetic Liners| (${formValues.commodityGrade})
          | 320 Bags x 60.00 Kg Net | HS Code: ${formValues.hsCode}      | 19,200.00 Kg  | 19,552.00 Kg
--------------------------------------------------------------------------------
SUBTOTAL NET CARGO WEIGHT:         19,200.00 KGS
TOTAL PACKAGING TARE WEIGHT:          352.00 KGS
TOTAL CARGO GROSS WEIGHT:          19,552.00 KGS
EMPTY CONTAINER TARE WEIGHT:        2,230.00 KGS (20ft Steel Box)
--------------------------------------------------------------------------------
VERIFIED GROSS MASS (SOLAS VGM):   21,782.00 KGS
Weighbridge Station: Indode Multimodal Terminal Dry Port Weighbridge #02
Weighbridge Scale Ticket No: WB-INDODE-2026-99418
Date of Weighment: ${today}

DECLARATION & CERTIFICATION:
"I hereby certify that the contents, counts, weights, marks, and container/seal
numbers stated in this Packing List are true, correct, and verified during physical
stuffing in accordance with Ethiopian Customs Commission regulations."

_____________________________________        _____________________________________
Warehouse Stuffing Supervisor                Customs Transit Officer / Inspector
${formValues.exporterName}                    Indode Multimodal Freight Terminal
`;
    }

    // certificate_of_origin
    return `================================================================================
ETHIOPIAN CHAMBER OF COMMERCE AND SECTORAL ASSOCIATIONS (ECCSA)
CERTIFICATE OF ORIGIN (Standard Universal Export Form)
Certificate Serial No: ${formValues.chamberCertificateNo}
Issued at Addis Ababa, Federal Democratic Republic of Ethiopia
================================================================================

1. CONSIGNOR (EXPORTER):
   Name:     ${formValues.exporterName}
   TIN:      ${formValues.exporterTIN} | Chamber Membership No: ECCSA/MEM/2026/0419
   Address:  ${formValues.exporterAddress}
   Country:  ETHIOPIA

2. CONSIGNEE (IMPORTER):
   Name:     ${formValues.buyerName}
   Address:  ${formValues.buyerAddress}
   Country:  ${formValues.buyerCountry}

3. TRANSPORT DETAILS:
   Departure Date:   Estimated ${today}
   Route & Vessel:   Multimodal Sea Freight: Indode Dry Port -> Port of Djibouti -> ${formValues.portOfDischarge}
   Carrier:          ESLSE / Ocean Connecting Vessel

4. COUNTRY OF ORIGIN:
   FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA
   Origin Criterion: "P" (Wholly Obtained & Harvested in Ethiopia)

5. ITEM DESCRIPTION, MARKS & QUANTITIES:
--------------------------------------------------------------------------------
Marks & Numbers:  "${formValues.marksAndNumbers}"
Number & Pkg:     ${formValues.quantity}
Description:      ${formValues.commodityName}
                  - Grade: ${formValues.commodityGrade}
                  - HS Tariff Code: ${formValues.hsCode}
Gross Weight:     19,552.00 Kgs (Verified Cargo Gross Mass)
Commercial Inv:   Ref No. CI-ET-2026-0814 Dated ${today}

6. DECLARATION BY THE EXPORTER:
   "The undersigned exporter hereby declares that the above details and statements
   are correct; that all goods were produced in ETHIOPIA and that they comply with
   the origin requirements specified by international trade conventions."

   Signature of Exporter: ___________________________________
   Date: ${today}

7. CERTIFICATION BY COMPETENT AUTHORITY:
   "It is hereby certified, on the basis of control carried out, that the
   declaration by the exporter is correct and that the goods specified above
   originate in ETHIOPIA."

   [ OFFICIAL STAMP & EMBOSSED SEAL ]
   Ethiopian Chamber of Commerce and Sectoral Associations (ECCSA)
   Certification Directorate, Addis Ababa, Ethiopia

   Authorized Officer Signature: ____________________________
   Date of Attestation: ${today}
================================================================================
`;
  };

  const handleCopy = () => {
    const text = generateTemplateText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const text = generateTemplateText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ethiopian_${currentDocDef.id}_Template.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    setDownloadToast(`Downloaded ${currentDocDef.title} template.`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-neutral-700 animate-fade-in text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Module Header Card */}
      <div className="bg-gradient-to-br from-amber-900/15 via-stone-900/5 to-emerald-950/20 dark:from-amber-950/40 dark:via-neutral-900 dark:to-emerald-950/30 border border-amber-300/80 dark:border-amber-800/80 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-600 text-white uppercase tracking-wider shadow-2xs">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Ethiopian Export Documentation Master Module</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              Statutory Export Documents & Compliant Templates
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Standardized, legally vetted Ethiopian export documentation required by the <strong>National Bank of Ethiopia (NBE)</strong>, <strong>Ethiopian Customs Commission (Single Window e-SAD)</strong>, and <strong>Ethiopian Chamber of Commerce (ECCSA)</strong>.
            </p>
          </div>

          {/* Quick Commodity Preset Selector */}
          <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xs border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 shrink-0 max-w-sm space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Test With Real Commodity Preset</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {COMMODITY_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-left transition-colors bg-neutral-100 hover:bg-amber-100 dark:bg-neutral-700/60 dark:hover:bg-amber-950/60 text-neutral-800 dark:text-neutral-200 truncate border border-neutral-200 dark:border-neutral-600"
                  title={preset.name}
                >
                  {preset.id === 'coffee' ? '☕ Washed Coffee' :
                   preset.id === 'sesame' ? '🌱 Humera Sesame' :
                   preset.id === 'flowers' ? '🌹 Cut Roses' : '🥩 Chilled Sheep'}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
              Auto-fills realistic HS codes, pricing, packaging, and shipping marks.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Document Navigation Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {EXPORT_DOCUMENT_DEFINITIONS.map(doc => {
          const isSelected = selectedDocId === doc.id;
          return (
            <button
              key={doc.id}
              onClick={() => handleSelectDoc(doc.id)}
              className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-3 relative overflow-hidden ${
                isSelected
                  ? 'bg-neutral-900 text-white dark:bg-amber-950/40 dark:text-neutral-50 border-amber-600 ring-2 ring-amber-500/30 shadow-md'
                  : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:border-amber-400 dark:hover:border-neutral-700 shadow-2xs'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {doc.id === 'sales_contract' ? 'Step 1: Contract' :
                     doc.id === 'proforma_invoice' ? 'Step 2: Proforma' :
                     doc.id === 'packing_list' ? 'Step 3: Packing' : 'Step 4: Origin'}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
                <h3 className="text-sm font-bold tracking-tight">
                  {doc.title}
                </h3>
                <p className={`text-[11px] leading-tight ${
                  isSelected ? 'text-amber-200/90' : 'text-neutral-500 dark:text-neutral-400'
                }`}>
                  {doc.amharicTitle}
                </p>
              </div>

              <div className={`pt-2 border-t text-[10px] space-y-1 ${
                isSelected ? 'border-neutral-700 text-neutral-300' : 'border-neutral-100 dark:border-neutral-800 text-neutral-500'
              }`}>
                <div className="truncate font-semibold flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">{doc.governingAuthority.split('/')[0]}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Document Workspace */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xs overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="p-4 md:p-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-neutral-50/60 dark:bg-neutral-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 uppercase">
                {currentDocDef.workflowStage.split(':')[0]}
              </span>
              <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {currentDocDef.title}
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Authority: <strong>{currentDocDef.governingAuthority}</strong> · Basis: {currentDocDef.legalProclamation}
            </p>
          </div>

          {/* Action and View Toggle Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Modes */}
            <div className="flex bg-neutral-200 dark:bg-neutral-800 p-0.5 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('official_document')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'official_document'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                Official Form View
              </button>
              <button
                onClick={() => setViewMode('raw_template')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'raw_template'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                Plain Text / Code
              </button>
              <button
                onClick={() => setViewMode('statutory_guide')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'statutory_guide'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                Mandatory Clauses
              </button>
            </div>

            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-colors ${
                showCustomizer
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showCustomizer ? 'Hide Customizer' : 'Edit Template Data'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1.5 transition-colors border border-neutral-200 dark:border-neutral-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Template</span>
            </button>
          </div>
        </div>

        {/* Optional Collapsible Form Customizer */}
        {showCustomizer && (
          <div className="p-5 bg-amber-50/50 dark:bg-neutral-800/50 border-b border-amber-200/60 dark:border-neutral-800 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Customize Template Fields (Updates Live in Preview Below)</span>
              </span>
              <span className="text-[11px] text-neutral-500">
                Phone formatted without +251 (e.g. 09... or 07...)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Exporter Company Name
                </label>
                <input
                  type="text"
                  value={formValues.exporterName}
                  onChange={e => setFormValues({ ...formValues, exporterName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Exporter Mobile (09... or 07...)
                </label>
                <input
                  type="text"
                  value={formValues.exporterTel}
                  onChange={e => setFormValues({ ...formValues, exporterTel: e.target.value })}
                  placeholder="09 11 45 78 90"
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Exporter TIN Number (10 Digits)
                </label>
                <input
                  type="text"
                  value={formValues.exporterTIN}
                  onChange={e => setFormValues({ ...formValues, exporterTIN: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Buyer Corporate Name
                </label>
                <input
                  type="text"
                  value={formValues.buyerName}
                  onChange={e => setFormValues({ ...formValues, buyerName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Commodity Description & Grade
                </label>
                <input
                  type="text"
                  value={formValues.commodityGrade}
                  onChange={e => setFormValues({ ...formValues, commodityGrade: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Incoterms® 2020 Delivery Term
                </label>
                <input
                  type="text"
                  value={formValues.incoterm}
                  onChange={e => setFormValues({ ...formValues, incoterm: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Total Quantity
                </label>
                <input
                  type="text"
                  value={formValues.quantity}
                  onChange={e => setFormValues({ ...formValues, quantity: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Unit Price (Complies with NBE Floor)
                </label>
                <input
                  type="text"
                  value={formValues.unitPrice}
                  onChange={e => setFormValues({ ...formValues, unitPrice: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Port of Discharge & Country
                </label>
                <input
                  type="text"
                  value={formValues.portOfDischarge}
                  onChange={e => setFormValues({ ...formValues, portOfDischarge: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 1: OFFICIAL STYLED DOCUMENT FORMAT */}
        {viewMode === 'official_document' && (
          <div className="p-6 md:p-10 space-y-8 bg-stone-50/70 dark:bg-neutral-950/70 font-sans">
            {/* The Document Canvas (Mimicking real paper document) */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl p-8 md:p-12 shadow-md space-y-8 relative">
              {/* Document Header with Seal Watermark vibe */}
              <div className="border-b-2 border-neutral-900 dark:border-neutral-100 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400">
                    Federal Democratic Republic of Ethiopia
                  </div>
                  <h1 className="text-xl md:text-2xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 uppercase tracking-tight">
                    {currentDocDef.title}
                  </h1>
                  <p className="text-xs font-serif text-neutral-500 italic">
                    {currentDocDef.amharicTitle}
                  </p>
                </div>

                <div className="text-right font-mono text-[11px] space-y-0.5 text-neutral-600 dark:text-neutral-400 shrink-0">
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">
                    Ref: EXP-ET-2026-09418
                  </div>
                  <div>Date: {new Date().toLocaleDateString('en-GB')}</div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                    Statutory e-SAD Compliant
                  </div>
                </div>
              </div>

              {/* Parties Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs">
                <div className="space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 dark:text-amber-400 block border-b border-neutral-200 dark:border-neutral-700 pb-1">
                    Exporter (Consignor / Seller)
                  </span>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                    {formValues.exporterName}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    {formValues.exporterAddress}
                  </div>
                  <div className="font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
                    TIN: <strong>{formValues.exporterTIN}</strong> | License: {formValues.exporterLicense}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    Direct Mobile: <strong>{formValues.exporterTel}</strong> | {formValues.exporterEmail}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 dark:text-amber-400 block border-b border-neutral-200 dark:border-neutral-700 pb-1">
                    Buyer (Consignee / Importer)
                  </span>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                    {formValues.buyerName}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    {formValues.buyerAddress}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    Destination Country: <strong>{formValues.buyerCountry}</strong>
                  </div>
                  <div className="text-neutral-500 italic text-[11px]">
                    Authorized foreign trade registration verified
                  </div>
                </div>
              </div>

              {/* Commodity & Pricing Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  <span>COMMERCIAL SPECIFICATIONS & VALUATION:</span>
                  <span className="text-[11px] font-mono font-normal text-amber-700 dark:text-amber-400">
                    NBE Floor Price Verified
                  </span>
                </div>

                <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-700 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold border-b border-neutral-200 dark:border-neutral-700">
                      <tr>
                        <th className="p-3">HS Code</th>
                        <th className="p-3">Commodity & Grade</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Unit Price ({formValues.currency})</th>
                        <th className="p-3">Delivery Terms</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-[11px]">
                      <tr>
                        <td className="p-3 font-bold text-amber-700 dark:text-amber-400">
                          {formValues.hsCode}
                        </td>
                        <td className="p-3 font-sans">
                          <div className="font-bold text-neutral-900 dark:text-neutral-100">
                            {formValues.commodityName}
                          </div>
                          <div className="text-neutral-500 text-[10px]">
                            {formValues.commodityGrade} ({formValues.cropYear})
                          </div>
                        </td>
                        <td className="p-3">{formValues.quantity}</td>
                        <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">
                          {formValues.unitPrice}
                        </td>
                        <td className="p-3 font-sans font-bold">{formValues.incoterm}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shipping & Logistics Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs bg-neutral-50/50 dark:bg-neutral-800/30">
                <div>
                  <span className="text-[10px] text-neutral-500 font-semibold block uppercase">
                    Port of Loading
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    {formValues.portOfLoading}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-semibold block uppercase">
                    Port of Discharge
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    {formValues.portOfDischarge}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-semibold block uppercase">
                    Payment Terms
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    {formValues.paymentTerms}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-semibold block uppercase">
                    Container & Seal
                  </span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">
                    {formValues.containerNo} · {formValues.sealNo}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-semibold block uppercase">
                    Remittance Bank & SWIFT
                  </span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">
                    {formValues.bankSwift} ({formValues.bankAccount})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-semibold block uppercase">
                    Stenciled Shipping Marks
                  </span>
                  <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200">
                    {formValues.marksAndNumbers}
                  </span>
                </div>
              </div>

              {/* Official Attestation & Seal Stamp Section */}
              <div className="pt-6 border-t-2 border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-xs max-w-md">
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Statutory Compliance Attestation</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Certified in accordance with Proclamation No. 859/2014, National Bank of Ethiopia Foreign Exchange Directives, and Ethiopian Single Window specifications.
                  </p>
                </div>

                {/* Simulated Ethiopian Chamber / Exporter Stamp */}
                <div className="border-2 border-amber-700/80 dark:border-amber-500/80 rounded-xl p-3 text-center space-y-1 text-amber-900 dark:text-amber-300 font-mono text-[10px] uppercase w-48 rotate-[-2deg] bg-amber-500/5">
                  <div className="font-bold tracking-wider">
                    {selectedDocId === 'certificate_of_origin'
                      ? 'ETHIOPIAN CHAMBER ECCSA'
                      : 'OFFICIAL EXPORTER STAMP'}
                  </div>
                  <div className="text-[9px] text-neutral-500">
                    TIN: {formValues.exporterTIN}
                  </div>
                  <div className="border-t border-amber-700/30 pt-1 text-[9px] font-bold">
                    VALIDATED & RELEASED
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: RAW TEXT / CLERK COPY FORMAT */}
        {viewMode === 'raw_template' && (
          <div className="p-6 space-y-3 bg-neutral-900 text-neutral-100 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Ready-to-copy Plain Text Template ({currentDocDef.id}.txt)</span>
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-bold flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Full Text'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] leading-relaxed whitespace-pre-wrap text-emerald-400/90 overflow-x-auto max-h-[600px] overflow-y-auto">
              {generateTemplateText()}
            </pre>
          </div>
        )}

        {/* VIEW 3: MANDATORY LEGAL CLAUSES & REJECTION PITFALLS */}
        {viewMode === 'statutory_guide' && (
          <div className="p-6 md:p-8 space-y-8 bg-neutral-50 dark:bg-neutral-900 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mandatory Elements */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <h4>Statutory Mandatory Clauses in Ethiopia</h4>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                  These exact clauses must be verbatim or substantive in every document submitted to commercial banks and customs:
                </p>
                <ul className="space-y-2 pt-2">
                  {currentDocDef.mandatoryClauses.map((clause, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{clause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Pitfalls & Rejection Reasons */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-rose-200 dark:border-rose-900/50 space-y-3">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <h4>Common Errors & Regulatory Rejection Pitfalls</h4>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                  Frequent causes of delay, customs fines, and bank permit rejection reported by Ethiopian exporters:
                </p>
                <ul className="space-y-2 pt-2">
                  {currentDocDef.rejectionPitfalls.map((pitfall, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                      <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        !
                      </span>
                      <span className="leading-relaxed">{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Regulatory Flowchart Footer */}
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                  Want to practice end-to-end export documentation with real case studies?
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                  Chapter 13 and Chapter 14 of the curriculum cover ECTALE coffee grading, phytosanitary quarantine, and single-window e-SAD filing in detail.
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedChapterId('ch-13');
                  setActiveNavTab('curriculum');
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
              >
                <span>Study Chapter 13 & 14</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
