import { Module } from '../types';

export const COURSE_MODULES: Module[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Foundations of Ethiopian Foreign Trade & Legal Framework',
    subtitle: 'Regulatory Architecture, Licensing & Single Window (ESW)',
    description: 'Master the core macroeconomic architecture, key institutional actors, trade licensing, and the digital Ethiopian Single Window (ESW) workflow that governs every import and export transaction in Ethiopia.',
    chapters: [
      {
        id: 'ch-1',
        moduleId: 'mod-1',
        chapterNumber: 1,
        title: 'The Ethiopian Foreign Trade Ecosystem & Market Mechanics',
        description: 'Understand NBE foreign exchange regulations, priority allocation lists, foreign currency regimes, and key institutional stakeholders.',
        estimatedMinutes: 20,
        isFreeTrialAccessible: true,
        imageUrl: '/src/assets/images/esw_portal_interface_1791465102377.jpg',
        imageCaption: 'Ethiopian foreign trade specialist filing electronic import declarations and proforma clearances at the Ethiopian Single Window (ESW) terminal in Addis Ababa.',
        diagramType: 'esw_process',
        sections: [
          {
            id: 's1-1',
            title: '1. Macroeconomic Context & Foreign Exchange Regime',
            content: `Foreign trade in Ethiopia operates within a strictly supervised regulatory structure administered by the **National Bank of Ethiopia (NBE)**, the **Ministry of Trade and Regional Integration (MoTRI)**, and the **Ethiopian Customs Commission (ECC)**. 

Historically governed by fixed peg rationing, the transition into competitive forex determination and revised market policies means understanding currency valuation—and timing between L/C opening and settlement—is the single most decisive factor determining profitability.

Foreign currency allocation is managed through authorized commercial banks (such as Commercial Bank of Ethiopia, Awash, Dashen, Bank of Abyssinia, etc.). Goods are prioritized into distinct categories:
- **Priority Tier 1**: Essential pharmaceuticals, medical supplies, fuel, agricultural inputs (fertilizer, seeds, chemicals).
- **Priority Tier 2**: Industrial raw materials, manufacturing spare parts, export-oriented machinery.
- **Priority Tier 3**: General commercial capital goods, construction equipment (excavators, dump trucks).
- **Standard / Non-Priority**: Consumer goods, luxury vehicles, non-essential finished products.`,
            keyTakeaways: [
              'NBE sets the benchmark monetary directives and forex allocation priority rules.',
              'Forex rates fluctuate between the opening date of an L/C and the settlement date.',
              'Importers must factor in exchange rate increments (often 1.5%–2.5% monthly in projections).'
            ],
            callout: {
              type: 'regulation',
              title: 'NBE FX Directive Compliance',
              text: 'Commercial banks are mandated to verify valid trade licenses, tax clearance, and proforma registration before queueing forex requests or approving margin deposits.'
            }
          },
          {
            id: 's1-2',
            title: '2. The Institutional Map: Who Does What?',
            content: `A successful Ethiopian import or export specialist interacts seamlessly with five central pillars:

1. **National Bank of Ethiopia (NBE)**: Central bank issuing foreign exchange directives, setting mandatory retention thresholds, and collecting statutory fees (such as the 2.5% NBE fee on import settlements).
2. **Ministry of Trade and Regional Integration (MoTRI)**: Issues foreign trade licenses, regulates commodity standards, and verifies import compliance.
3. **Ethiopian Customs Commission (ECC)**: Enforces the Customs Proclamation No. 859/2014 (amended by 1160/2019), determines Duty Paying Value (DPV), and assesses taxes at dry ports and border checkpoints.
4. **Ethiopian Shipping & Logistics Services Enterprise (ESLSE)**: The national multimodal carrier operating container vessels, maritime logistics, and strategic inland dry ports including Mojo, Kality, and Semera.
5. **Commercial Banks**: Act as issuing and negotiating banks for Letters of Credit (L/C), Cash Against Documents (CAD), and TT wire transfers.`
          },
          {
            id: 's1-3',
            title: '3. Ethiopian Single Window (ESW) Platform',
            content: `All import and export transactions now flow through the paperless **Ethiopian Single Window (ESW)** portal (trade.esw.et). 

Instead of visiting dozens of ministries, traders submit electronic declarations that cross-reference:
- **Regulatory Agencies (OGA)**: Food and Drug Authority (EFDA), Agricultural Authority, Radiation Authority.
- **Commercial Bank Verification**: Proforma invoices submitted electronically to the bank for foreign exchange permit approval.
- **Customs Declaration (e-SAD)**: Single Administrative Document generated online before goods arrive at Djibouti or Mojo Dry Port.`
          }
        ],
        caseStudy: {
          title: 'Case Study: Prioritizing Capital Goods Import',
          commodity: 'Industrial Sino Dump Trucks for Infrastructure Construction',
          scenario: 'An Ethiopian contractor plans to import 10 heavy-duty dump trucks. They must decide whether to import under standard commercial queue or apply under an investment incentive certificate.',
          realWorldData: {
            'Estimated Total FOB': '$939,330 USD',
            'Target Exchange Rate': '157.07 ETB / USD',
            'Duty Category': 'Capital goods eligible for 0% Customs Duty under incentive, 3% Social Welfare, 0% Withholding'
          },
          logisticsWorkflow: [
            'Obtain MoTRI foreign trade license & Investment Commission capital goods duty-free privilege letter.',
            'Submit electronic proforma invoice on Ethiopian Single Window (ESW).',
            'Apply for Letter of Credit (L/C) at designated Commercial Bank with 30% margin hold.',
            'Route cargo via Djibouti corridor under ESLSE Multimodal Bill of Lading to Indode/Mojo.'
          ],
          solutionSummary: 'Securing the incentive certificate before L/C opening saved over 35% in customs duty and excise taxes, shifting total landed cost from 38.4M ETB per unit down to 19.2M ETB.'
        },
        quiz: [
          {
            id: 'q1-1',
            question: 'Which government institution in Ethiopia oversees foreign exchange directives, margin requirements, and collects the 2.5% statutory fee on settlements?',
            options: [
              'Ministry of Finance (MoF)',
              'National Bank of Ethiopia (NBE)',
              'Ethiopian Customs Commission (ECC)',
              'Ethiopian Shipping & Logistics Services Enterprise (ESLSE)'
            ],
            correctIndex: 1,
            explanation: 'The National Bank of Ethiopia (NBE) is the central monetary authority responsible for foreign exchange allocation, directives, and statutory settlement surcharges.'
          },
          {
            id: 'q1-2',
            question: 'What is the primary electronic portal through which Ethiopian traders submit import/export permits and customs declarations?',
            options: [
              'ASYCUDA World Standalone',
              'Ethiopian Single Window (ESW)',
              'ERCA Portal Direct',
              'Telebirr Trade Gateway'
            ],
            correctIndex: 1,
            explanation: 'The Ethiopian Single Window (ESW at trade.esw.et) connects traders, regulatory agencies, commercial banks, and customs into a unified paperless system.'
          },
          {
            id: 'q1-3',
            question: 'Why must an importer project an exchange rate increase between the L/C opening date and the settlement date?',
            options: [
              'Because foreign suppliers always increase product prices by 10% after shipping.',
              'Because in Ethiopia, the final ETB debit occurs at the prevailing bank exchange rate when shipping documents arrive at settlement, which is typically higher than at opening.',
              'Because customs duties are fixed in foreign currency.',
              'Because commercial banks refund excess margin in USD.'
            ],
            correctIndex: 1,
            explanation: 'In Ethiopian banking practice, when documents arrive for settlement (or retirement of L/C), the importer is debited at the settlement exchange rate of that day, creating currency exposure over the 60-90 day shipping lead time.'
          }
        ]
      },
      {
        id: 'ch-2',
        moduleId: 'mod-1',
        chapterNumber: 2,
        title: 'Trade Licensing, Investment Permits & Compliance Requirements',
        description: 'Step-by-step requirements for obtaining foreign trade licenses, TIN registration, Chamber of Commerce compliance, and tax clearings.',
        estimatedMinutes: 25,
        isFreeTrialAccessible: true,
        diagramType: 'esw_process',
        sections: [
          {
            id: 's2-1',
            title: '1. Commercial Registration & Sector-Specific Licensing',
            content: `Before engaging in cross-border trade, an individual enterprise or Private Limited Company (PLC) must satisfy specific Ethiopian statutory prerequisites:

- **Commercial Registration (TIN & VAT Certificate)**: Issued by the Ministry of Revenues. Traders with turnover exceeding 1,000,000 ETB annually must register for VAT.
- **Specific Import/Export License**: Issued by MoTRI. In Ethiopia, general import licenses are categorized into specific HS Code commodity groups (e.g., Code 451: Motor vehicles & machinery, Code 452: Industrial raw materials, Code 453: Food & agricultural products).
- **Competence Certificate (CoC)**: Mandatory for regulated items. For example:
  - Medical devices and pharmaceuticals require **EFDA (Ethiopian Food and Drug Authority)** clearance.
  - Telecommunication equipment requires **ECA (Ethiopian Communications Authority)** type-approval.
  - Agricultural chemicals require Ministry of Agriculture certification.`
          },
          {
            id: 's2-2',
            title: '2. Investment Permits & Second-Schedule Duty Incentives',
            content: `Investors registered under the Ethiopian Investment Commission (EIC) enjoy substantial privileges codified under the Customs Tariff Book's **Second Schedule**:

- **Capital Goods Duty Exemption**: Investors in manufacturing, commercial agriculture, and mining can import machinery, dump trucks, and construction equipment with **0% Customs Duty** and **0% Withholding Tax**.
- **Social Welfare Tax (3%)**: Even duty-free incentive consignments generally remain subject to the statutory 3% Social Welfare Tax unless explicitly exempted by a special Ministry of Finance waiver.
- **Guarantee Letter Process**: To clear incentive cargo through customs before final incentive books are audited, banks and customs utilize ministerial guarantee letters.`
          },
          {
            id: 's2-3',
            title: '3. Mandatory Bank Foreign Trade Profile & Tax Clearance',
            content: `Every Ethiopian commercial bank maintains a "Foreign Trade Profile" for its business clients. To keep your profile active for L/C processing:
- Annual renewed commercial license.
- Tax Clearance Certificate from the Ministry of Revenues valid for the current fiscal quarter.
- Audit report for the preceding fiscal year.
- Clean credit record from the NBE Credit Reference Bureau (CRB).`
          }
        ],
        caseStudy: {
          title: 'Case Study: Avoiding L/C Rejection Due to License Mismatch',
          commodity: 'Automotive Spare Parts vs Construction Machinery',
          scenario: 'An importer with a trade license for "General Construction Materials" attempted to open an L/C for 100 sets of heavy truck differentials and gearbox assemblies. The bank rejected the proforma invoice.',
          realWorldData: {
            'License Category': 'Building & Construction Supplies (MoTRI Code 458)',
            'Requested Proforma HS': '8708.50 - Axles and transmission parts',
            'Resolution Time Lost': '45 Days for license amendment'
          },
          logisticsWorkflow: [
            'Identify exact 8-digit HS Code of the intended goods from supplier.',
            'Cross-check HS Code with MoTRI licensed sector classification.',
            'Submit license category extension on eTrade.gov.et.',
            'Re-upload corrected proforma to commercial bank portal.'
          ],
          solutionSummary: 'Always align the proforma invoice HS code with your MoTRI license code prior to supplier contract finalization.'
        },
        quiz: [
          {
            id: 'q2-1',
            question: 'Under Ethiopian Investment Commission (EIC) incentives, what customs duty rate is applied to approved manufacturing machinery?',
            options: [
              '35%',
              '20%',
              '0%',
              '10%'
            ],
            correctIndex: 2,
            explanation: 'Approved capital goods under the Second Schedule incentive scheme enjoy 0% import customs duty to encourage domestic production.'
          },
          {
            id: 'q2-2',
            question: 'Even when capital goods enjoy a 0% customs duty incentive, which statutory tax is almost always still payable at Ethiopian customs?',
            options: [
              'Luxury Excise Tax',
              '3% Social Welfare Tax',
              '100% Surtax Penalty',
              'Djibouti Free Zone Levy'
            ],
            correctIndex: 1,
            explanation: 'Under current Ethiopian customs regulations, the 3% Social Welfare Tax applies to almost all import declarations including duty-exempt capital machinery, as demonstrated in the PDF dump truck breakdown.'
          }
        ]
      },
      {
        id: 'ch-3',
        moduleId: 'mod-1',
        chapterNumber: 3,
        title: 'The Ethiopian Single Window (ESW) Operational Masterclass (trade.esw.et)',
        description: 'Complete hands-on guide to filing electronic declarations (e-SAD), automated bank forex permit validations, Other Government Agencies (OGA) clearances, and digital customs release orders.',
        estimatedMinutes: 30,
        isFreeTrialAccessible: false,
        imageUrl: '/src/assets/images/esw_portal_interface_1791465102377.jpg',
        imageCaption: 'Foreign trade operator in Addis Ababa preparing and validating an electronic Single Administrative Document (e-SAD) on the national Ethiopian Single Window portal (trade.esw.et).',
        diagramType: 'esw_process',
        sections: [
          {
            id: 's13-1',
            title: '1. Architecture of the Ethiopian Single Window (trade.esw.et)',
            content: `The **Ethiopian Single Window (ESW)** is a centralized automated platform developed by the Ethiopian Customs Commission in collaboration with MoTRI, NBE, and 16 Other Government Agencies (OGAs). 

Before ESW, clearing cargo required physical visits to multiple ministries, resulting in 20 to 45 days of documentary turnaround. Today, the ESW enables traders to submit all regulatory documents once electronically.

**Key Integrated Entities in ESW**:
- **Commercial Banks**: Electronic approval and transmission of the Foreign Exchange Permit and proforma registration number directly into the customs valuation database.
- **Ethiopian Food and Drug Authority (EFDA)**: Electronic Import Permits for pharmaceuticals, medical equipment, cosmetics, and packaged food items.
- **Ministry of Trade and Regional Integration (MoTRI)**: Verification of annual trade license renewal and authorized commodity classification.
- **Ministry of Agriculture (MoA)**: Electronic Phytosanitary Certificates and veterinary release approvals.
- **Ethiopian Standards Agency (ESA)**: Quality compliance certificates (CoC) for mandatory regulated goods.`,
            keyTakeaways: [
              'ESW eliminates physical document delivery between banks, customs, and certifying agencies.',
              'Traders log in via digital TIN credentials with role-based access for declarant agents.',
              'Electronic notifications indicate clearance channel routing (Green, Blue, Yellow, Red) automatically.'
            ],
            callout: {
              type: 'pro_tip',
              title: 'Declarant Account Verification',
              text: 'Ensure your customs transit clearing agent is accredited with an active ESW Digital Certificate; expired digital tokens will block submission of assessment notices.'
            }
          },
          {
            id: 's13-2',
            title: '2. Step-by-Step e-SAD Declaration Workflow',
            content: `Filing an import declaration on ESW proceeds through five chronological stages:

1. **Pre-Arrival Registration**:
   - The clearing agent enters manifest and bill of lading details received from ESLSE or foreign shipping line.
2. **Uploading Commercial Invoices & Packing Lists**:
   - Every invoice item must be mapped to its precise 8-digit **Ethiopian Harmonized System (HS) Code**.
3. **Automated Duty & Tax Computation**:
   - The ESW engine automatically applies the 7-tier tax cascade (Duty, Excise, Surtax, Social Welfare, VAT, WHT, Scanning) based on the customs exchange rate of the declaration date.
4. **OGA Endorsements**:
   - If the HS code requires specialized approval (e.g., EFDA for medical supplies), the system automatically routes the application to the respective agency portal for electronic inspector sign-off.
5. **Issuance of the Customs Assessment Notice**:
   - Once all OGA clearances are confirmed, ESW generates the electronic Assessment Notice containing the government e-Payment reference slip.`
          },
          {
            id: 's13-3',
            title: '3. Connecting Bank Forex Permits & The "Bank Matching" Algorithm',
            content: `One of the most common bottlenecks in Ethiopian foreign trade is the **ESW-Bank Matching Mismatch**. 

When a commercial bank issues a Foreign Exchange Permit:
- The exact **Proforma Invoice Number**, **Supplier Legal Name**, **Currency (USD/EUR)**, and **Invoiced FOB/C&F Value** are registered in the NBE-linked database.
- When the clearing agent files the e-SAD on ESW, the system performs an automated cross-match.
- If there is even a minor discrepancy (e.g. Proforma written as "PI-2024-001" at the bank, but entered as "PI2024/001" on ESW, or a $5 USD variance), the declaration is locked in **"Bank Validation Pending"** status!

*Best Practice*: Always demand an exact digital PDF copy of the Bank Permit approval before filing the e-SAD.`
          }
        ],
        caseStudy: {
          title: 'Case Study: Resolving an ESW Electronic Declaration Lock',
          commodity: '15 Pallets of Diagnostic Laboratory Reagents',
          scenario: 'Cargo arrived at Addis Ababa Bole Cargo terminal. The e-SAD declaration was rejected by ESW with Error Code OGA-402 (Missing Health Regulatory Approval), incurring 12,000 ETB daily airport cold-storage charges.',
          realWorldData: {
            'Invoice Value': '$48,500 USD',
            'Airport Cold Storage Rate': '12,000 ETB / day',
            'Rejection Cause': 'HS Code entered in ESW did not match the HS Code listed on the EFDA Pre-Import Permit'
          },
          logisticsWorkflow: [
            'Log in to EFDA portal under eTrade Single Window module.',
            'Request HS Code harmonization amendment from EFDA valuation desk.',
            'Cancel erroneous e-SAD draft in ESW and re-generate declaration with the amended EFDA permit number.',
            'Obtain instant automated Green Channel clearance within 3 hours.'
          ],
          solutionSummary: 'Aligning OGA pre-clearance certificates with the customs e-SAD code saved 84,000 ETB in airport cold-chain storage fees.'
        },
        quiz: [
          {
            id: 'q13-1',
            question: 'What happens in the Ethiopian Single Window (ESW) portal if the proforma number on the customs declaration differs by one character from the bank foreign exchange permit?',
            options: [
              'Customs automatically overrides the error and clears the cargo.',
              'The system locks the declaration under "Bank Validation Pending", blocking tax assessment until amended.',
              'The supplier in China is charged a 10% penalty.',
              'The goods are automatically impounded by customs.'
            ],
            correctIndex: 1,
            explanation: 'The ESW system executes strict algorithmic validation; any variance between bank permit details and e-SAD fields locks the declaration until reconciled.'
          },
          {
            id: 'q13-2',
            question: 'Which online portal serves as the unified Ethiopian Single Window for international trade regulatory processing?',
            options: [
              'trade.esw.et',
              'customs.gov.et/single',
              'telebirr.et/trade',
              'eslse.et/declaration'
            ],
            correctIndex: 0,
            explanation: 'The official platform for Ethiopian Single Window operations is trade.esw.et.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Import Procedures, Payment Modes & Banking Mastery',
    subtitle: 'Letters of Credit (L/C), Margin Holds, Bank Charges & Settlement Debits',
    description: 'Master the financial mechanics of L/Cs in Ethiopian commercial banks: margin requirements (30% to 100%), bank commission (4%), VAT (15%), NBE 2.5% statutory fees, and partial vs full settlement debits.',
    chapters: [
      {
        id: 'ch-4',
        moduleId: 'mod-2',
        chapterNumber: 4,
        title: 'Letters of Credit (L/C) Lifecycle & Opening Payments Advice',
        description: 'Examine the exact banking cost structure at L/C opening: Margin debit, 4% bank commission, 15% VAT on commission, and SWIFT fees.',
        estimatedMinutes: 30,
        isFreeTrialAccessible: false,
        diagramType: 'lc_lifecycle',
        sections: [
          {
            id: 's3-1',
            title: '1. The Anatomy of an Ethiopian L/C Opening',
            content: `The Letter of Credit (L/C) is the dominant payment mechanism in Ethiopian import trade. Because foreign exchange is rationed, commercial banks demand cash security (the "Margin") when opening an irrevocable L/C.

According to bank and NBE rules:
- **Opening Margin %**: Ranges between 30%, 50%, or 100% depending on the importer’s creditworthiness and NBE directives.
- **Bank Commission**: Typically **4.00%** calculated on the C&F or FOB value in ETB.
- **VAT on Commission**: **15.00%** applied directly to the bank commission.
- **SWIFT Charges**: Fixed foreign wire fee (typically $100 to $200 USD converted to ETB, or 6,000 to 15,000 ETB) plus 15% VAT.
- **Unpaid Margin Service Charge**: If margin is less than 100% (e.g., 30% margin), banks charge a service charge (e.g., 5.00%) on the unheld balance plus 15% VAT.`
          },
          {
            id: 's3-2',
            title: '2. Real Ethiopian Example: L/C Opening Payments Advice',
            content: `Look at the real bank document figures from Page 3 of our reference sheets:
- **FCY Value (USD)**: $725,000.00
- **Exchange Rate at Opening**: 157.0655 ETB / USD
- **Total ETB Equivalent**: 113,872,487.50 ETB

**Debit Calculation at Opening**:
1. **Opening Margin (50%)**: $113,872,487.50 \\times 50\\% = 56,936,243.75$ ETB (Blocked in bank reserve).
2. **Bank Commission (4%)**: $113,872,487.50 \\times 4\\% = 4,554,899.50$ ETB.
3. **VAT on Commission (15%)**: $4,554,899.50 \\times 15\\% = 683,234.93$ ETB.
4. **SWIFT Charge ($100 USD @ 157.0655)**: 15,706.55 ETB.
5. **VAT on SWIFT Charge (15%)**: 2,355.98 ETB.
**TOTAL OPENING DEBITED FROM IMPORTER ACCOUNT**: **62,192,440.71 ETB**.`
          },
          {
            id: 's3-3',
            title: '3. Full Settlement Debit When Shipping Documents Arrive',
            content: `60 to 90 days later, the supplier ships the cargo, and original shipping documents arrive at the Ethiopian issuing bank via DHL. Now the bank must settle with the negotiating foreign bank!

Notice the exchange rate has moved from 157.0655 to **158.0655 ETB/USD**!
- **New Total FCY Value**: $725,000.00 \\times 158.0655 = 114,597,487.50$ ETB.
- **Margin Held from Opening**: 56,936,243.75 ETB (credited back against the liability).
- **Remaining Settlement Amount (50%)**: 57,661,243.75 ETB.
- **NBE 2.5% Statutory Fee**: $114,597,487.50 \\times 2.50\\% = 2,864,937.19$ ETB.
**TOTAL SETTLEMENT DEBIT**: **60,526,180.94 ETB**.

Combining Opening Debit (62.19M ETB) and Settlement Debit (60.52M ETB) plus Sea Freight gives the total banking cost of **88,066,446.71 ETB**!`
          }
        ],
        caseStudy: {
          title: 'Case Study: Full Settlement of 10 Machinery Units',
          commodity: '10 Units Heavy Industrial Equipment via Amhara Bank',
          scenario: 'The importer opened an L/C with 50% margin hold at 157.0655 rate. Upon document retirement, the rate was 158.0655.',
          realWorldData: {
            'L/C FCY Value': '$725,000.00 USD',
            'Sea Freight Value': '$78,000.00 USD @ 158.08 ETB',
            'Total Opening Paid': '62,192,440.71 ETB',
            'Total Settlement Paid': '60,526,180.94 ETB',
            'Sea Freight Paid': '13,205,687.04 ETB',
            'Grand Total Bank Disbursements': '88,066,446.71 ETB'
          },
          logisticsWorkflow: [
            'Verify Proforma Invoice meets NBE margin guidelines.',
            'Deposit 50% margin cash + 4% commission + 15% VAT on commission.',
            'Wait for DHL arrival of original Bill of Lading, Invoice, Packing List, and Certificate of Origin.',
            'Pay remaining 50% settlement debit + 2.5% NBE fee at retirement.'
          ],
          solutionSummary: 'The currency fluctuation of 1.00 ETB/USD added over 725,000 ETB to the final settlement balance. Importers must hold sufficient liquidity buffer.'
        },
        quiz: [
          {
            id: 'q3-1',
            question: 'What is the standard bank service commission rate charged by Ethiopian commercial banks on the C&F/FOB value of an import L/C?',
            options: ['1.00%', '2.50%', '4.00%', '8.00%'],
            correctIndex: 2,
            explanation: 'Ethiopian commercial banks standardly assess a 4.00% commission on the import value, plus 15% VAT on that commission.'
          },
          {
            id: 'q3-2',
            question: 'What rate does the National Bank of Ethiopia (NBE) charge as a statutory fee payable on foreign currency settlement?',
            options: ['0.5%', '1.5%', '2.5%', '5.0%'],
            correctIndex: 2,
            explanation: 'The NBE statutory rate payable on foreign currency settlement is 2.50% of the total foreign currency value converted at the settlement exchange rate.'
          }
        ]
      },
      {
        id: 'ch-5',
        moduleId: 'mod-2',
        chapterNumber: 5,
        title: 'Partial Shipment Financial Calculations & Staggered Debits',
        description: 'How to handle Case 2 partial shipments: Splitting 10 units into 6 units (1st partial) and 4 units (remaining partial) with proportional margin releases.',
        estimatedMinutes: 30,
        isFreeTrialAccessible: false,
        diagramType: 'lc_lifecycle',
        sections: [
          {
            id: 's4-1',
            title: '1. Why Partial Shipments Happen in Ethiopian Trade',
            content: `In large orders (such as fleet purchases of 10 or 20 dump trucks, or factory machinery sets), suppliers often cannot fit all items on a single vessel, or port congestion forces split voyages. 

When your L/C specifies **"Partial Shipment Allowed"**, Ethiopian commercial banks do not settle the entire L/C at once. Instead, they execute **Staggered Settlement Debits** based strictly on the shipping documents for each arrival lot!`
          },
          {
            id: 's4-2',
            title: '2. Real Reference Data: 10 Units Staggered 6 & 4',
            content: `From Page 5 & 6 of our reference sheets:
- **Total L/C Value (10 Units)**: $1,450,000.00 USD @ Opening Rate 155.1919 ETB.
- **Opening Margin (30%)**: 67,508,476.50 ETB.
- **Bank Commission (4%)**: 9,001,130.20 ETB + 15% VAT (1,350,169.53 ETB).
- **Unpaid Margin Service Charge (5% on 70%)**: 7,875,988.93 ETB + 15% VAT (1,181,398.34 ETB).
- **Total Debited at Opening**: **86,924,063.17 ETB**.

**Lot 1: First Partial Settlement (6 Units)**:
- FCY Value: $870,000.00 USD (60% of total) @ Settlement Rate **157.0700 ETB**.
- Total FCY in ETB: 136,650,900.00 ETB.
- Margin Held Proportional Credit (30%): 40,505,085.90 ETB.
- Settlement Amount (70%): 96,145,814.10 ETB.
- NBE 2.5% Rate: 3,416,272.50 ETB.
- **Total 1st Settlement Debit**: **99,562,086.60 ETB**.
- Sea Freight for 6 Units ($156,000 USD @ 160.01 ETB): **26,733,830.76 ETB**.

**Lot 2: Remaining Settlement (4 Units)**:
- FCY Value: $580,000.00 USD (40% of total) @ Settlement Rate **157.0700 ETB**.
- Total FCY in ETB: 91,100,600.00 ETB.
- Margin Held Proportional Credit (30%): 27,003,390.60 ETB.
- Settlement Amount (70%): 64,097,209.40 ETB.
- NBE 2.5% Rate: 2,277,515.00 ETB.
- **Total Remaining Settlement Debit**: **66,374,724.40 ETB**.
- Sea Freight for 4 Units ($104,000 USD @ 160.01 ETB): **17,822,553.84 ETB**.`
          },
          {
            id: 's4-3',
            title: '3. Proportional Margin Credit vs Final Settlement Liability',
            content: `The mathematical rule applied by commercial banks for partial shipment settlements is strictly proportional:

1. **Proportional Margin Release**:
   $$\\text{Margin Credit} = \\text{Total Margin Held at Opening} \\times \\left(\\frac{\\text{Partial FCY Value}}{\\text{Total L/C FCY Value}}\\right)$$
   For Lot 1 (6 units out of 10): $67,508,476.50 \\times 60\\% = 40,505,085.90$ ETB is deducted from your liability.

2. **NBE Statutory Settlement Surcharge**:
   $$\\text{NBE Fee} = \\text{Partial Lot Value in ETB} \\times 2.50\\%$$
   For Lot 1: $136,650,900 \\times 2.50\\% = 3,416,272.50$ ETB.

3. **Critical Banking Pro-Tip**:
   Commercial banks will never release original Bills of Lading or Commercial Invoices to your customs clearing agent until **both** the Partial Settlement Debit and the Sea Freight Debit are completely honored in cleared funds. Always coordinate with your treasury before documents arrive at the bank counter!`,
            keyTakeaways: [
              'Margin deposits are not refunded in cash; they are credited proportionally against each partial settlement debit.',
              'The 2.5% NBE statutory fee is debited separately on each arriving shipment lot.',
              'Documents are never released until settlement and freight debits are cleared in full.'
            ],
            callout: {
              type: 'pro_tip',
              title: 'Partial Settlement Cash Flow Rule',
              text: 'Ensure your domestic sales contracts allow delivery of partial lots so that proceeds from the first partial shipment finance the settlement of subsequent lots.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Cash Flow Management on Partial Shipments',
          commodity: '10 Dump Trucks Shipped in Two Lots',
          scenario: 'The importer had planned cash flow assuming a 90-day grace period for the full batch. However, the first lot of 6 arrived at day 35, requiring an immediate 99.56M ETB settlement debit.',
          realWorldData: {
            'Initial Margin Paid': '67,508,476.50 ETB',
            'Lot 1 Settlement Cash Required': '99,562,086.60 ETB',
            'Lot 1 Freight Cash Required': '26,733,830.76 ETB'
          },
          logisticsWorkflow: [
            'Ensure L/C contract explicitly allows partial shipments.',
            'Monitor supplier packing list dispatch notices.',
            'Arrange pre-settlement bridge loan before documents reach negotiating bank.',
            'Clear the first 6 units to generate domestic sales cash flow for lot 2!'
          ],
          solutionSummary: 'By clearing and selling the first 6 dump trucks immediately, the importer funded the 66.37M ETB settlement of the remaining 4 units without overdraft penalties.'
        },
        quiz: [
          {
            id: 'q4-1',
            question: 'When an import L/C is settled in partial shipments, how is the original margin held applied?',
            options: [
              '100% of the margin is released only after the final partial shipment clears.',
              'The margin is released proportionally to the units/FCY value shipped in each partial batch.',
              'The bank absorbs the margin as additional commission.',
              'The margin is converted into foreign currency cash.'
            ],
            correctIndex: 1,
            explanation: 'The margin is credited proportionally against the liability of each partial shipment batch (e.g. 60% for 6 units out of 10).'
          }
        ]
      },
      {
        id: 'ch-6',
        moduleId: 'mod-2',
        chapterNumber: 6,
        title: 'Foreign Exchange (FX) Risk Hedging & Market-Determined Spread Management',
        description: 'How to safeguard profit margins against foreign exchange rate volatility between L/C opening and document retirement under market-determined forex directives.',
        estimatedMinutes: 25,
        isFreeTrialAccessible: false,
        diagramType: 'fx_hedging',
        sections: [
          {
            id: 's16-1',
            title: '1. The Floating Currency Reality in Ethiopian Trade Finance',
            content: `Under recent landmark macroeconomic and monetary reforms enacted by the **National Bank of Ethiopia (NBE)**, Ethiopia transitioned from a tightly administered currency peg toward competitive, market-determined foreign exchange determination.

This paradigm shift fundamentally transformed import financial modeling:
- In previous decades, the exchange rate moved by minuscule fractions of a percent per month.
- Today, commercial banks set daily bid and ask exchange rates reflecting supply and demand.
- Over a standard **60 to 90-day L/C execution cycle** (manufacturing in China $\to$ voyage to Djibouti $\to$ transit to Mojo), currency depreciation can easily increase your final settlement debit by **5% to 12%**!

*Reference Sheet Proof*: As documented on Page 1 of our reference sheet:
- Opening Rate: **157.0700 ETB/USD**
- Settlement Rate: **160.0660 ETB/USD** (+1.91% rise)
- Today Rate: **161.0542 ETB/USD** (+2.54% rise)
- 2-Month Forecast: **+6.14%** rise!`,
            keyTakeaways: [
              'Exchange rate exposure is highest between the opening margin date and the document retirement date.',
              'Never lock fixed ETB selling contracts before original documents are retired from the issuing bank.',
              'Factor in a minimum 1.80% monthly currency escalation buffer in all landed cost proformas.'
            ]
          },
          {
            id: 's16-2',
            title: '2. Commercial Hedging Strategies in the Ethiopian Context',
            content: `How can an Ethiopian importer protect their capital against currency erosion?

1. **The 100% Margin Cash Lock (Margin Collateral Agreement)**:
   - Negotiate with your commercial bank to convert your ETB margin into a blocked foreign currency holding on day one. If the bank permits a full cash-backed hedge, the exchange rate is crystallized at opening.
2. **Back-to-Back Export Retention Matching (Natural Hedge)**:
   - Rather than queuing in the commercial bank forex allocation line, fund your import L/C directly from your company’s 50% NBE Forex Retention Account. Because the dollars are already owned, zero currency risk is incurred!
3. **Foreign Currency Price Indexing Clauses in Domestic Sales Contracts**:
   - When selling high-value capital goods (dump trucks, excavators, industrial generators) to local buyers, stipulate that final payment will adjust to the official NBE exchange rate published on the delivery handover date.`
          },
          {
            id: 's16-3',
            title: '3. Interbank FX Spreads, Bank Margin Accounts & The 2.5% NBE Settlement Levies',
            content: `Managing foreign exchange exposure in Ethiopia requires mastering the hidden banking costs beyond the nominal currency pair quote:

1. **The Commercial Bank Spread (Bid vs Ask)**:
   - Commercial banks in Ethiopia publish daily buying (bid) and selling (ask) rates.
   - For imports, banks sell foreign exchange at the **higher selling rate**. The spread between buying and selling is typically **1.5% to 2.5%**, which represents an immediate transaction cost for the importer.

2. **The Mandatory 2.5% NBE Settlement Levy**:
   - As demonstrated on Page 3 and Page 6 of our reference financial sheets, the National Bank of Ethiopia imposes a statutory **2.50% statutory fee** calculated on the gross ETB settlement value of the foreign exchange.
   - Example from reference sheet:
     - FCY Settlement: $725,000 USD @ 158.0655 ETB = 114,597,487.50 ETB.
     - **NBE 2.5% Fee**: $114,597,487.50 \\times 2.5\\% = \\mathbf{2,864,937.19\\text{ ETB}}$!
     - Importers who fail to budget this 2.86M ETB fee experience immediate cash-flow deficit upon document arrival.

3. **Managing Locked Margin Accounts**:
   - While the 30%–50% opening margin is held in a blocked non-interest bearing escrow account, commercial banks may charge an **unpaid margin service fee** (often 5% annually pro-rated) on the uncollected 50%–70% balance until final document retirement.`,
            keyTakeaways: [
              'Budget the 2.5% NBE statutory fee as an automatic add-on to your settlement liability.',
              'Factor in commercial bank bid/ask spreads when calculating landed cost proformas.',
              'Track blocked margin accounts to ensure commercial banks credit the exact opening deposit at settlement.'
            ],
            callout: {
              type: 'formula',
              title: 'Total Settlement Cash Equation',
              text: 'Settlement Cash Required = (Gross FCY × Settlement Rate) - Margin Held + (Gross FCY × Settlement Rate × 2.5% NBE Fee).'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Shielding a $500,000 Machinery Contract from a 7% Forex Shock',
          commodity: 'Factory Packaging Line from Italy',
          scenario: 'An Ethiopian packaging company opened an L/C for $500,000 USD at 155.00 ETB/USD. Over the 75-day delivery window, the rate depreciated to 165.85 ETB/USD (+7.0%), representing an unexpected 5,425,000 ETB cash shortfall.',
          realWorldData: {
            'L/C Amount': '$500,000 USD',
            'Opening Rate': '155.00 ETB (77.5 Million ETB liability)',
            'Settlement Rate': '165.85 ETB (82.9 Million ETB liability)',
            'Unhedged Exposure': '5,425,000 ETB loss'
          },
          logisticsWorkflow: [
            'Importer secured an advance sales agreement with an anchor local beverage client.',
            'Contract incorporated an NBE-pegged escalation clause adjusting the ETB selling price if the dollar rose above 158 ETB.',
            'Upon document retirement at 165.85 ETB, the client invoice was adjusted accordingly.'
          ],
          solutionSummary: 'The contractual currency indexation clause preserved the company’s operating gross margin and prevented an outright 5.4M ETB loss.'
        },
        quiz: [
          {
            id: 'q16-1',
            question: 'What is the most effective "natural hedge" against currency fluctuation available to integrated Ethiopian business groups?',
            options: [
              'Borrowing money from informal money lenders in Merkato.',
              'Funding import L/Cs directly from their own 50% NBE Export Retention Account.',
              'Delaying shipping of goods by 12 months.',
              'Converting bank margin deposits into gold bars.'
            ],
            correctIndex: 1,
            explanation: 'Using retained foreign currency earnings from export proceeds eliminates exchange rate volatility because the foreign currency is already held.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Logistics Corridor, Shipping & Dry Port Operations',
    subtitle: 'Djibouti Transit, ESLSE Multimodal, Demurrage & Mojo/Indode Dry Ports',
    description: 'Master corridor transit operations: port charges at Port of Djibouti (Doraleh), sea freight calculation, marine insurance (1% of 110% C&F), multimodal bills of lading, and inland transport tariffs to Addis Ababa and Indode.',
    chapters: [
      {
        id: 'ch-7',
        moduleId: 'mod-3',
        chapterNumber: 7,
        title: 'Incoterms 2020 & Mandatory Ethiopian Marine Insurance',
        description: 'Why FOB is standard for ESLSE multimodal shipments, and the strict statutory rule requiring marine insurance from Ethiopian insurers.',
        estimatedMinutes: 25,
        isFreeTrialAccessible: false,
        diagramType: 'corridor_flow',
        sections: [
          {
            id: 's5-1',
            title: '1. Why Ethiopian Importers Use FOB & ESLSE Multimodal',
            content: `Ethiopia is a landlocked economy conducting over 90% of its maritime trade through the Port of Djibouti. 

Under Ethiopian foreign exchange and trade regulations:
- **Mandatory FOB Rule**: Unless an explicit waiver is granted by the Ethiopian Maritime Authority or ESLSE, public and commercial importers are required to contract under **FOB (Free on Board)** terms.
- **Multimodal Bill of Lading**: ESLSE acts as the Multimodal Transport Operator (MTO). Goods are picked up at the port of origin (e.g., Shanghai, Ningbo, Antwerp) and moved under a **Single Bill of Lading** directly to an inland dry port in Ethiopia (Mojo, Kality, Semera, Indode) without requiring customs clearance at Djibouti!`
          },
          {
            id: 's5-2',
            title: '2. The Statutory Marine Insurance Formula',
            content: `Ethiopian law prohibits purchasing foreign marine insurance for goods destined for Ethiopia. Insurance must be purchased in Ethiopian Birr from licensed Ethiopian insurance companies (such as Ethiopian Insurance Corporation, Awash Insurance, Nyala Insurance, United Insurance, etc.).

**The Standard Insurance Formula**:
$$\\text{Marine Insurance} = 1\\% \\times (1.10 \\times \\text{C\\&F Value in ETB})$$

Why the 1.10 multiplier? The international maritime standard specifies coverage of **110% of CIF/C&F value** (the 10% represents anticipated buyer profit in the event of total loss at sea).

*Example from our Dump Truck Cost Sheet (Page 1)*:
- C&F Total = 16,235,974.58 ETB
- Insurable Value = $16,235,974.58 \\times 1.10 = 17,859,572.04$ ETB
- Marine Insurance Premium (approx 1.68%–2% effective with stamp/entry letter): **300,709.59 ETB**!`
          },
          {
            id: 's5-3',
            title: '3. Marine Cargo Claims, General Average & Survey Reports',
            content: `Understanding how marine insurance functions during maritime accidents or cargo damage:

1. **Institute Cargo Clauses (ICC A, B, C)**:
   - **Clause A ("All Risks")**: Mandatory for sensitive machinery, pharmaceuticals, and electronics. Covers rough sea water ingress, container loss overboard, theft, and pilferage.
   - **Clause C (Basic Cover)**: Only covers major vessel catastrophes (sinking, stranding, collision, fire). Avoid this for manufactured equipment.

2. **The Joint Survey Protocol at Mojo Dry Port**:
   - If containers arrive with broken customs seals, water marks, or container puncture holes:
   - **DO NOT de-stuff unilaterally!**
   - Importers must immediately summon an official **Joint Survey Committee** consisting of:
     1. The Insurance Underwriter’s accredited surveyor.
     2. The ESLSE Multimodal terminal superintendent.
     3. The Customs inspection officer.
   - The surveyor issues the **Joint Survey Report (JSR)** establishing the exact loss amount before cargo leaves the customs terminal gate.`,
            keyTakeaways: [
              'Always specify Institute Cargo Clauses (A) - All Risks for capital machinery.',
              'Never de-stuff damaged cargo without a joint survey involving the insurer and ESLSE.',
              'Insurance claims must be lodged within 30 days of container discharge.'
            ],
            callout: {
              type: 'warning',
              title: 'Critical Claim Invalidation Risk',
              text: 'Removing damaged goods from Mojo Dry Port premises before obtaining an official Joint Survey Report legally forfeits your insurance compensation rights under the Ethiopian Commercial Code.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Avoiding Transit Risk on FOB Sea Freight',
          commodity: 'Precision CNC Machining Equipment',
          scenario: 'An importer purchased equipment on CIF terms from a European vendor without obtaining an ESLSE shipping waiver. The commercial bank refused to issue the Foreign Exchange Permit.',
          realWorldData: {
            'Contract Term': 'CIF Djibouti ($450,000 USD)',
            'Bank Requirement': 'FOB Hamburg + Freight payable to ESLSE in ETB'
          },
          logisticsWorkflow: [
            'Request vendor to amend proforma invoice from CIF to FOB.',
            'Book sea freight through ESLSE liaison office in Europe or Djibouti.',
            'Issue Marine Insurance Certificate with Ethiopian Insurance Corporation.',
            'Submit endorsement to Commercial Bank of Ethiopia.'
          ],
          solutionSummary: 'Always verify whether an ESLSE waiver is required before signing foreign commercial contracts.'
        },
        quiz: [
          {
            id: 'q5-1',
            question: 'What is the statutory basis used by Ethiopian insurance companies to compute Marine Cargo Insurance?',
            options: [
              '50% of the FOB invoice value',
              '1% of 110% of the C&F value in ETB',
              'Fixed 10,000 ETB flat fee',
              '5% of CIF Djibouti'
            ],
            correctIndex: 1,
            explanation: 'Under standard Ethiopian marine underwriting, insurance is computed as approximately 1% of 110% of C&F value in ETB.'
          }
        ]
      },
      {
        id: 'ch-8',
        moduleId: 'mod-3',
        chapterNumber: 8,
        title: 'Djibouti Corridor, Demurrage & Inland Freight to Mojo / Indode',
        description: 'Port charges at Djibouti, transit corridor logistics, container demurrage traps, and inland transport tariffs to Addis Ababa and Indode.',
        estimatedMinutes: 30,
        isFreeTrialAccessible: false,
        imageUrl: '/src/assets/images/djibouti_ethio_corridor_1791465115861.jpg',
        imageCaption: 'Heavy commercial container trucks navigating the primary Djibouti to Ethiopia trade highway corridor past the Galafi border transit checkpoint.',
        diagramType: 'corridor_flow',
        sections: [
          {
            id: 's6-1',
            title: '1. The Djibouti to Addis Transit Corridor',
            content: `The 850 km corridor from the Port of Djibouti to central Ethiopia is the vital economic lifeline of the country:
- **Port Clearance (Djibouti Handling)**: Terminal handling charges (THC), port stevedoring, and transit documentation pass through Doraleh Container Terminal (DCT) or Doraleh Multipurpose Port (DMP).
- **Corridor Trucking**: Heavy trucks move cargo along the corridor (Djibouti → Galafi → Semera → Awash → Mojo → Addis Ababa).
- **Ethio-Djibouti Railway**: Electric rail transport connecting Nagad station in Djibouti to Mojo Dry Port and Indode Freight Terminal, reducing transit time from 4 days to 18 hours for containerized cargo.`
          },
          {
            id: 's6-2',
            title: '2. Real Freight & Port Figures from Reference Data',
            content: `Refer to Page 1 of our Cost Build-Up Sheet:
- **Port Charges (Djibouti Clearance)**: **386,530.08 ETB** per unit.
- **Djibouti to Addis Ababa Inland Transport**: **549,194.82 ETB** per unit.
- **Local Customs to Indode / Anhama Transport**: **35,000.00 ETB**.
- **Anhama Warehouse Storage & Logistics**: **25,000.00 ETB**.
- **Local Assembly & Unstuffing Costs**: **2,400,000.00 ETB** (for complete machinery knocked-down units).

**The Container Demurrage Trap**:
Shipping lines grant 14 to 21 free days for container return. If customs clearance at Mojo or Indode is delayed, demurrage fines escalate from **$30 to $120 USD per container per day**, payable in foreign exchange or steep ETB penalties!`
          },
          {
            id: 's6-3',
            title: '3. Demurrage Tariffs, Container Return & Bonded De-Stuffing Tactics',
            content: `Container demurrage is one of the most severe cash leaks for Ethiopian importers. 

1. **How the Demurrage Clock Operates**:
   - The free period (typically 14 days under standard bills of lading, or 21 days negotiated under ESLSE contracts) begins the moment the container is discharged from the vessel at Doraleh Port.
   - It takes 3 to 5 days for truck transit or 18 hours by train to reach Mojo Dry Port.
   - This leaves only **9 to 16 days** to clear customs, pay taxes, transport to your warehouse, unstuff, and return the empty container to the shipping line depot in Djibouti!

2. **The Bonded De-Stuffing Countermeasure**:
   - If customs clearance is stalled due to valuation doubts or missing bank endorsements, do not let the container sit unopened in the terminal yard!
   - Apply for **Customs Supervised De-Stuffing (Stripping)**:
     - The cargo is transferred directly into the Mojo Dry Port bonded customs warehouse.
     - The empty container is handed back to ESLSE for immediate railway backhaul to Djibouti.
     - Demurrage clocks stop immediately, replacing expensive USD detention fines ($100/day) with low domestic terminal storage fees (~250 ETB/day).`,
            keyTakeaways: [
              'Demurrage free time starts at Djibouti port vessel discharge, not upon arrival at Mojo.',
              'De-stuffing into bonded warehouses halts daily foreign currency demurrage fines.',
              'Always request 21 free days during initial freight booking with ESLSE.'
            ],
            callout: {
              type: 'pro_tip',
              title: 'Emergency Demurrage Defense',
              text: 'If day 10 of your 14 free days is reached without customs clearance, order container stripping into the dry port bonded shed immediately to halt dollar detention accumulation.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Eliminating 14-Day Container Demurrage Fines',
          commodity: '20 x 40ft Containers of Galvanized Steel Sheets',
          scenario: 'Cargo arrived at Mojo Dry Port during end-of-year tax audits, risking 2 weeks of detention penalties totaling over $28,000 USD.',
          realWorldData: {
            'Containers': '20 x 40ft HQ',
            'Demurrage Rate': '$100 USD / container / day after day 14',
            'Total Exposure': '$28,000 USD (Approx 4.5M ETB)'
          },
          logisticsWorkflow: [
            'Execute urgent container unstuffing at Mojo dry port warehouse.',
            'Return empty shipping line containers to Djibouti depot via backhaul rail.',
            'Store unstuffed cargo in customs bonded storage while awaiting final tax assessment.'
          ],
          solutionSummary: 'Unstuffing cargo into the bonded warehouse stopped container detention clocks immediately, saving 4.5M ETB in hard currency penalties.'
        },
        quiz: [
          {
            id: 'q6-1',
            question: 'What is the typical free period granted by international shipping lines for containers moving to Ethiopian dry ports before demurrage begins?',
            options: ['3 days', '14 to 21 days', '60 days', 'Unlimited for Ethiopian dry ports'],
            correctIndex: 1,
            explanation: 'Multimodal bills of lading typically provide 14 to 21 free days from arrival at Djibouti before daily container demurrage accrues.'
          }
        ]
      },
      {
        id: 'ch-9',
        moduleId: 'mod-3',
        chapterNumber: 9,
        title: 'Corridor Diversification & Regional Seaports (Djibouti, Berbera & Lamu)',
        description: 'Strategic comparison of maritime transit gateways: Port of Djibouti (Doraleh), DP World Berbera Port, and the Kenyan Lamu LAPSSET corridor, including road freight tariffs and transit agreements.',
        estimatedMinutes: 25,
        isFreeTrialAccessible: false,
        imageUrl: '/src/assets/images/djibouti_ethio_corridor_1791465115861.jpg',
        imageCaption: 'Cross-border container transit convoy traversing the Eastern trade corridor toward inland customs distribution hubs in Ethiopia.',
        diagramType: 'port_comparison',
        sections: [
          {
            id: 's14-1',
            title: '1. The Geopolitics of Landlocked Ethiopia’s Maritime Access',
            content: `With a population exceeding 120 million, Ethiopia is the most populous landlocked country in the world. Annually moving over 17 million metric tons of imports and exports, overreliance on a single maritime bottleneck creates existential economic risk.

**The Major Gateway Port Options**:
1. **Port of Djibouti (Doraleh Container Terminal - DCT & DMP)**:
   - *Share*: Handles ~90% of total Ethiopian foreign trade volume.
   - *Strengths*: High-capacity deepwater berths, modern gantry cranes, and the electrified 750km Ethio-Djibouti Railway to Mojo Dry Port.
   - *Challenges*: High port handling tariffs (e.g. 386,530 ETB/unit on machinery) and severe vessel congestion surcharges during peak harvest or fertilizer import windows.
2. **Port of Berbera (Somaliland - DP World)**:
   - *Strategic Fit*: Ideal for Eastern Ethiopia (Jigjiga, Dire Dawa Free Trade Zone, and Harar).
   - *Strengths*: $442 million DP World modernization, modern container gantry capacity, competitive container dwell fees.
   - *Challenges*: Separate bilateral customs transit protocols and road corridor upgrades.
3. **Port of Lamu (Kenya - LAPSSET Corridor)**:
   - *Strategic Fit*: Southern Ethiopia (Moyale, Hawassa Industrial Park, and Yabello).
   - *Strengths*: Deep-water natural harbor capable of docking Super-Post-Panamax vessels without tidal restrictions.`,
            keyTakeaways: [
              'Djibouti remains the primary heavy cargo and rail-connected corridor.',
              'Berbera offers up to 40% shorter transit distances for Eastern Ethiopian manufacturing clusters.',
              'LAPSSET provides resilience for agricultural exports originating in Southern Oromia and Sidama.'
            ]
          },
          {
            id: 's14-2',
            title: '2. Comparative Cost & Transit Time Matrix',
            content: `A comparative look at the three corridors:

| Feature | Djibouti Corridor | Berbera Corridor | Lamu (LAPSSET) Corridor |
|---|---|---|---|
| **Primary Inland Dry Port** | Mojo / Indode / Kality | Dire Dawa Free Trade Zone | Moyale / Hawassa |
| **Average Road Distance** | 850 km | 550 km (to Dire Dawa) | 1,050 km (to Addis) |
| **Transit Time (Truck)** | 3 - 5 Days | 2 - 3 Days (Eastern hub) | 4 - 6 Days |
| **Rail Connectivity** | Electric Railway (Nagad-Mojo) | Planned | Under feasibility |
| **Container Free Time** | 14 - 21 Days | 14 - 28 Days | 21 Days |
| **Average Trucking Rate** | ~500,000 - 550,000 ETB | ~380,000 - 440,000 ETB | Variable (KSh/ETB) |`
          },
          {
            id: 's14-3',
            title: '3. Electronic Cargo Tracking (ECTS) & Cross-Border Customs Bonds',
            content: `Moving transit goods across international land borders requires strict security protocols:

1. **Electronic Cargo Tracking System (ECTS)**:
   - At the border post (Galafi for Djibouti, Tog Wajaale for Berbera, Moyale for Kenya), customs officers attach an **electronic GPS padlock seal**.
   - The seal communicates in real-time with the Ethiopian Customs Commission command center in Addis Ababa.
   - Any deviation from designated corridor highways or unauthorized seal tampering triggers immediate customs enforcement alerts!

2. **Transit Bond (Guaranty)**:
   - To ensure imported goods are not diverted into local markets without paying taxes, logistics carriers lodge a **Customs Transit Bond**.
   - Under the COMESA Regional Customs Transit Guarantee (RCTG) scheme, a single bond covers the consignment from coastal port to inland terminal.

3. **Axle Load Regulations**:
   - The Ethiopian Roads Administration enforces strict weighbridge checkpoints (e.g. Awash, Mojo, Dire Dawa). Overloading penalties range from 50,000 to 200,000 ETB per infraction plus mandatory offloading delays!`,
            keyTakeaways: [
              'All cross-border transit containers are fitted with real-time GPS ECTS seals.',
              'COMESA RCTG transit bonds prevent illegal inland cargo diversion.',
              'Axle load compliance is strictly enforced at Ethiopian weighbridge stations.'
            ],
            callout: {
              type: 'regulation',
              title: 'ECTS Seal Tampering Penalty',
              text: 'Breaking or tampering with an Ethiopian customs electronic seal carries a statutory criminal fine and immediate seizure of the transport vehicle under Proclamation 859/2014.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Routing Textile Raw Materials via Berbera to Dire Dawa',
          commodity: '30 Containers of Synthetic Yarn & Dyes',
          scenario: 'A textile mill located in the Dire Dawa Industrial Park evaluated shipping via Djibouti versus the Berbera corridor during a peak congestion period at Doraleh.',
          realWorldData: {
            'Destination': 'Dire Dawa Industrial Park',
            'Transit via Djibouti': 'Distance: 680 km · Trucking: 480,000 ETB / container · Dwell time: 9 days',
            'Transit via Berbera': 'Distance: 310 km · Trucking: 340,000 ETB / container · Dwell time: 3 days',
            'Net Financial Savings': '140,000 ETB per container (4.2 Million ETB total)'
          },
          logisticsWorkflow: [
            'Secure ESLSE / DP World multimodal through bill of lading to Dire Dawa customs.',
            'Clear cargo through Tog Wajaale / Wajaale border post with electronic customs transit seal.',
            'Direct delivery into bonded warehouse inside Dire Dawa Free Trade Zone.'
          ],
          solutionSummary: 'Switching to the Berbera corridor reduced inland road transit by 370 km and saved 4.2M ETB in haulage and port demurrage costs.'
        },
        quiz: [
          {
            id: 'q14-1',
            question: 'Which modernized regional seaport offers the shortest overland road transit distance to Eastern Ethiopian cities like Jigjiga and Dire Dawa?',
            options: [
              'Port of Mombasa (Kenya)',
              'Port of Berbera (Somaliland)',
              'Port Sudan (Sudan)',
              'Port of Massawa (Eritrea)'
            ],
            correctIndex: 1,
            explanation: 'The Port of Berbera is only ~310 km from Dire Dawa, offering a significantly shorter overland route compared to the 850 km Djibouti-Addis corridor.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    moduleNumber: 4,
    title: 'Ethiopian Customs Tariff & Cascading Tax Assessment',
    subtitle: 'HS Codes, DPV/CIF Valuation, Customs Proclamation & Seven-Tier Tax Stacking',
    description: 'Learn the exact math behind Ethiopian Customs Commission tax assessments: Import Customs Duty (0%-35%), Excise Tax, Surtax (10%), Social Welfare (3%), VAT (15%), Withholding (3%), and Scanning (0.07%).',
    chapters: [
      {
        id: 'ch-10',
        moduleId: 'mod-4',
        chapterNumber: 10,
        title: 'Duty Paying Value (DPV/CIF) & Seven-Tier Tax Stacking Formula',
        description: 'Step-by-step mathematical derivation of Ethiopian customs taxes, cascading bases, and official customs codes (01, 03, 05, 12, 04, 15, 16).',
        estimatedMinutes: 35,
        isFreeTrialAccessible: false,
        diagramType: 'tax_cascade',
        sections: [
          {
            id: 's7-1',
            title: '1. Duty Paying Value (DPV / CIF Basis)',
            content: `In Ethiopian customs administration, taxes are not calculated merely on the purchase price. They are assessed on the **Duty Paying Value (DPV)**, which equals the **CIF Value (Cost, Insurance & Freight)** in Ethiopian Birr converted at the official customs exchange rate of the declaration day.

$$\\text{CIF Value (ETB)} = (\\text{FOB USD} + \\text{Freight USD}) \\times \\text{Customs Exchange Rate} + \\text{Insurance ETB}$$

If additional inland freight or terminal handling occurs before customs valuation, it is included in the **Total Taxable Amount** base.`
          },
          {
            id: 's7-2',
            title: '2. The Seven Cascading Item Taxes (Official Codes)',
            content: `The Ethiopian Customs Commission applies a strict cascading formula where subsequent taxes compound on prior duties:

1. **Code 01 - Import Customs Duty (0% to 35%)**:
   $$\\text{Duty} = \\text{CIF} \\times \\text{Duty Rate}$$
2. **Code 03 - Excise Tax (0% to 100%)**:
   Assessed on luxury goods, alcohol, tobacco, and high-emission vehicles:
   $$\\text{Excise Tax} = (\\text{CIF} + \\text{Duty}) \\times \\text{Excise Rate}$$
3. **Code 05 - Surtax (10%)**:
   $$\\text{Surtax} = (\\text{CIF} + \\text{Duty} + \\text{Excise Tax}) \\times 10\\%$$
4. **Code 12 - Social Welfare Tax (3%)**:
   $$\\text{Social Welfare} = \\text{CIF} \\times 3\\%$$
5. **Code 04 - Value Added Tax (VAT 15%)**:
   VAT compounds on the entire accumulated value:
   $$\\text{VAT} = (\\text{CIF} + \\text{Duty} + \\text{Excise} + \\text{Surtax} + \\text{Social Welfare}) \\times 15\\%$$
6. **Code 15 - Withholding Tax (3%)**:
   Advance income tax credit:
   $$\\text{Withholding Tax} = \\text{CIF} \\times 3\\%$$
7. **Code 16 - Scanning Fee (0.07%)**:
   Container X-ray scanning charge:
   $$\\text{Scanning Fee} = \\text{CIF} \\times 0.07\\%$$`
          },
          {
            id: 's7-3',
            title: '3. Real Case from Reference Sheet: Excavators & Dump Trucks',
            content: `Notice the tax calculation on Page 1 of our PDF:
- For construction excavators and dump trucks under capital goods status:
  - Duty = **0%**
  - VAT = **0%** (deferred under incentive)
  - Withholding = **0%**
  - Social Welfare = **3%**
  - Total Tax Rate = **3%**
- On a CIF valuation of 17,120,879 ETB, the payable tax is exactly **513,626.37 ETB**!
- Compare this with a non-incentive commercial import where cumulative taxes can exceed **75% to 120%** of CIF value!`
          }
        ],
        caseStudy: {
          title: 'Case Study: Comparing Commercial Import vs Incentive Duty',
          commodity: 'Single Commercial Dump Truck vs Incentive Dump Truck',
          scenario: 'A logistics firm calculates whether to clear a dump truck under standard commercial tariff (35% duty, 10% surtax, 15% VAT) or under an agro-industrial service permit.',
          realWorldData: {
            'CIF Value': '17,120,879 ETB',
            'Commercial Tax Total': '12,980,450 ETB (75.8% effective tax)',
            'Incentive Tax Total': '513,626 ETB (3.0% Social Welfare only)',
            'Net Savings': '12,466,824 ETB per truck!'
          },
          logisticsWorkflow: [
            'Verify HS Code: 8704.23 - Dumpers designed for off-highway use.',
            'Confirm tax breakdown using the Academy Tax Assessment Calculator.',
            'Submit documentation to Ethiopian Customs Commission at Kality Branch.'
          ],
          solutionSummary: 'The 12.4M ETB tax difference demonstrates why mastering customs classification and investment incentives is vital for Ethiopian business viability.'
        },
        quiz: [
          {
            id: 'q7-1',
            question: 'In the Ethiopian customs tax cascade, what is the calculation base for Value Added Tax (VAT 15%)?',
            options: [
              'Only the FOB value in USD',
              'Only the CIF value in ETB',
              'The accumulated sum of (CIF + Customs Duty + Excise Tax + Surtax + Social Welfare Tax)',
              'The difference between selling price and purchase price'
            ],
            correctIndex: 2,
            explanation: 'Under Ethiopian customs proclamations, VAT is assessed at 15% on the accumulated landed value including CIF and all preliminary taxes (Duty, Excise, Surtax, Social Welfare).'
          },
          {
            id: 'q7-2',
            question: 'What is the statutory code and percentage for the Ethiopian Customs Scanning Fee?',
            options: [
              'Code 01 at 5%',
              'Code 16 at 0.07%',
              'Code 12 at 3%',
              'Code 05 at 10%'
            ],
            correctIndex: 1,
            explanation: 'Code 16 designates the scanning fee assessed at 0.07% of the CIF / DPV valuation.'
          }
        ]
      },
      {
        id: 'ch-11',
        moduleId: 'mod-4',
        chapterNumber: 11,
        title: 'Customs Clearance Channels & The Assessment Notice',
        description: 'How Green, Blue, Yellow, and Red channels work, and how to verify an official Customs Assessment Notice.',
        estimatedMinutes: 20,
        isFreeTrialAccessible: false,
        diagramType: 'tax_cascade',
        sections: [
          {
            id: 's8-1',
            title: '1. Customs Risk Management Channels',
            content: `When a customs declaration (e-SAD) is registered in the Ethiopian Customs ASYCUDA/ESW system, the automated risk engine assigns one of four clearance channels:

- **Green Channel**: Immediate release without documentary check or physical inspection. Reserved for Authorized Economic Operators (AEO) and high-compliance manufacturers.
- **Blue Channel**: Post-clearance audit release. Goods exit dry port immediately; customs audits records within 3 years.
- **Yellow Channel**: Comprehensive documentary inspection. Customs officers verify invoice authenticity, certificates of origin, and bank payment permits before release.
- **Red Channel**: 100% physical examination. Containers are opened, unstuffed, and counted in presence of customs officers and clearing agents.`
          },
          {
            id: 's8-2',
            title: '2. The Official Assessment Notice Preview',
            content: `Once valuation is confirmed, customs issues the **Assessment Notice**. This document lists:
- Reference Number & Declarant TIN.
- FOB Value, Sea Freight, and Insurance in ETB.
- Itemized tax breakdown for Codes 01, 03, 05, 12, 04, 15, 16.
- Total Tax Assessed and Tax Per Unit.
- Bank payment slip instructions for payment via CBE Birr or bank transfer.`
          },
          {
            id: 's8-3',
            title: '3. Government e-Payment Settlement & The Customs Release Order (CRO)',
            content: `The final step to physically extract your goods from Ethiopian customs custody:

1. **The Electronic Payment Slip (e-Payment Voucher)**:
   - The Assessment Notice contains a unique **14-digit Government Payment Reference Number**.
   - Tax payment is executed digitally through **Commercial Bank of Ethiopia (CBE Birr / CBE CBO direct link)** or other designated commercial banks.
   - Cash payments at customs counters are obsolete; all remittances flow directly to the Ministry of Revenues treasury single account (TSA).

2. **Automated Electronic Receipting in ESW**:
   - The moment the bank processes the payment, an automated API trigger reconciles the transaction with the ESW system in real time.
   - The status updates from **"Assessment Issued"** to **"Payment Reconciled"**.

3. **Issuance of the Customs Release Order (CRO) & Gate Pass**:
   - The customs verification officer endorses the digital file and generates the **Customs Release Order (CRO)**.
   - The dry port terminal superintendent verifies the CRO against the container tally sheet, issues the physical **Gate Pass**, and permits the cargo transport truck to exit the dry port!`,
            keyTakeaways: [
              'Customs payments are executed via bank e-Payment reference numbers, not cash.',
              'The Customs Release Order (CRO) is generated automatically upon bank payment confirmation.',
              'Terminal gate passes require both the customs CRO and dry port handling fee receipts.'
            ],
            callout: {
              type: 'pro_tip',
              title: 'Terminal Storage Clock Warning',
              text: 'Once the CRO is issued, clear the cargo from the dry port yard within 24 hours to avoid punitive terminal overtime storage charges.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Resolving a Valuation Dispute on Yellow Channel',
          commodity: 'Electric Transformers from Turkey',
          scenario: 'Customs rejected the invoice value of $22,000 USD, claiming the regional price database benchmark was $34,000 USD, which would double the tax payable.',
          realWorldData: {
            'Declared CIF': '3,450,000 ETB',
            'Customs Proposed CIF': '5,338,000 ETB',
            'Disputed Tax Increment': '1,420,000 ETB'
          },
          logisticsWorkflow: [
            'Request formal written notice of valuation rejection from customs team leader.',
            'Provide bank swift transfer confirmation and manufacturer price list authenticated by Chamber of Commerce.',
            'File administrative review petition to the Customs Valuation Directorate within 10 working days.'
          ],
          solutionSummary: 'Submitting certified manufacturer test reports and bank wire statements successfully reversed the uplift, saving 1.42M ETB in unjustified duties.'
        },
        quiz: [
          {
            id: 'q8-1',
            question: 'Which customs channel requires 100% physical intrusive examination and container opening at Ethiopian dry ports?',
            options: ['Green Channel', 'Blue Channel', 'Yellow Channel', 'Red Channel'],
            correctIndex: 3,
            explanation: 'The Red Channel mandates full physical inspection by customs officers at the dry port terminal.'
          }
        ]
      },
      {
        id: 'ch-12',
        moduleId: 'mod-4',
        chapterNumber: 12,
        title: 'Customs Valuation Disputes, Post-Clearance Audits (PCA) & Penalty Defense',
        description: 'How to defend against arbitrary customs valuation uplifts, manage 3-year post-clearance audits under Proclamation No. 859/2014, and avoid severe misdeclaration penalties.',
        estimatedMinutes: 30,
        isFreeTrialAccessible: false,
        diagramType: 'pca_audit',
        sections: [
          {
            id: 's15-1',
            title: '1. The 6-Tier Customs Valuation Hierarchy (Proclamation 859/2014)',
            content: `Under the Ethiopian Customs Proclamation No. 859/2014 (amended by 1160/2019), customs officers cannot arbitrarily reject an importer’s declared price. They are legally mandated to evaluate goods using a strict sequential hierarchy:

1. **Method 1: Transaction Value (Primary Legal Standard)**: The actual price paid or payable as documented by commercial invoices, swift bank debits, and contracts.
2. **Method 2: Transaction Value of Identical Goods**: Exported to Ethiopia at or about the same time.
3. **Method 3: Transaction Value of Similar Goods**: Functionally interchangeable items.
4. **Method 4: Deductive Value**: Based on the unit selling price of the imported goods in the domestic Ethiopian wholesale market minus taxes and local markups.
5. **Method 5: Computed Value**: Based on foreign production costs, materials, and profit margins.
6. **Method 6: Fallback Method**: Reasonable means consistent with WTO principles.

*Crucial Defense*: Customs appraisers frequently attempt to jump straight to Method 6 reference price databases. Importers have the legal right to demand written justification explaining why Methods 1 through 5 were disqualified!`,
            keyTakeaways: [
              'Method 1 (Transaction Value) is the mandatory primary legal standard.',
              'Customs cannot uplift prices without issuing a formal Notice of Valuation Doubt.',
              'Importers have 15 working days to present bank payment receipts and supplier accounting evidence.'
            ]
          },
          {
            id: 's15-2',
            title: '2. The 3-Year Post-Clearance Audit (PCA) Regime',
            content: `Obtaining your cargo release at Mojo or Kality Dry Port does not mean your liability has ended! 

The **Post-Clearance Audit (PCA) Directorate** of the Ethiopian Customs Commission has the statutory authority to audit any import declaration within **3 years** of entry:
- **Mandatory Document Retention**: Importers must retain all commercial invoices, shipping manifests, bank swift advices, and inventory books for a minimum of **5 years**.
- **Audit Targets**: Undervaluation, transfer pricing between related foreign parent companies, and unauthorized disposal of duty-free capital goods.
- **Statutory Penalties**: Under-declaration of customs duty incurs retroactive tax repayment plus **100% to 200% penalty fines** and monthly compounding interest.`
          },
          {
            id: 's15-3',
            title: '3. Customs Grievance Redress, Appeals Tribunal & In-Bond Dispute Guarantees',
            content: `When a customs officer at Mojo, Kality, or Indode issues a disputed Assessment Notice uplifting your Duty Paying Value (DPV), you are not forced to forfeit your rights or incur destructive port demurrage while arguing:

1. **The In-Bond Release Guarantee (Proclamation 859/2014 Article 97)**:
   - Rather than leaving cargo at the port accruing $100/day container demurrage during a valuation dispute:
   - The importer pays the **uncontested portion of customs duty** in cash.
   - For the **disputed uplift amount**, the importer posts a **Bank Guarantee or Cash Deposit** with the customs branch cashier.
   - Customs is legally obligated to immediately issue the Customs Release Order (CRO), allowing cargo to be de-stuffed and put into commercial use while the dispute proceeds!

2. **The 3-Tier Administrative Appeal Hierarchy**:
   - **Tier 1: Branch Valuation Grievance Committee**: Submit written grievance within **15 calendar days** of the assessment notice. The committee must render a written ruling within 10 working days.
   - **Tier 2: Head Office Customs Review Board**: If unsatisfied with the branch decision, appeal to the National Review Board at the Customs Commission Head Office (Megenagna, Addis Ababa) within **30 days**.
   - **Tier 3: The Tax Appeal Commission**: An independent judicial tribunal outside the Customs Commission. If the dispute involves legal interpretation, filing before the tribunal freezes enforcement actions.

3. **Golden Rule of Valuation Defense**:
   - Always present three contemporaneous proofs: (1) The verified Bank SWIFT payment MT103 advice, (2) The manufacturer's official price list authenticated by the Ethiopian Embassy abroad, and (3) Price data from identical consignments cleared by competing importers in the ESW database.`,
            keyTakeaways: [
              'Never leave containers at port during valuation disputes; use Article 97 bank guarantee for immediate release.',
              'Submit written grievance within 15 calendar days to preserve your legal appeal rights.',
              'Bank SWIFT payment confirmations are the single most powerful legal proof of Method 1 Transaction Value.'
            ],
            callout: {
              type: 'pro_tip',
              title: 'Demurrage Protection Tactic',
              text: 'A 200,000 ETB bank guarantee fee is vastly cheaper than 2,000,000 ETB in container demurrage fines accrued while waiting for an appeal ruling.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Successfully Defending a 3.8M ETB Retroactive Valuation Audit',
          commodity: 'Industrial Polyethylene Plastic Granules',
          scenario: 'Two years after importation, the PCA directorate issued a demand notice claiming raw material prices were under-declared by $210 USD per ton compared to ICIS global indices, assessing 3,850,000 ETB in back-taxes and penalties.',
          realWorldData: {
            'Imported Volume': '400 Metric Tons',
            'Original Declared CIF': '$1,020 USD / ton',
            'Customs Benchmark Claim': '$1,230 USD / ton',
            'Penalty Exposure': '3,850,000 ETB'
          },
          logisticsWorkflow: [
            'Assemble audited bank swift transfer copies showing exact foreign currency remittances from CBE.',
            'Procure manufacturer raw material contract signed during international price slump.',
            'Submit petition to the Customs Grievance Review Committee within the statutory 30-day window.',
            'Provide warehouse inventory stock cards proving materials were converted directly into domestic packaging.'
          ],
          solutionSummary: 'Proving total banking cash reconciliation validated Method 1 Transaction Value, resulting in a 100% cancellation of the 3.85M ETB penalty notice.'
        },
        quiz: [
          {
            id: 'q15-1',
            question: 'Within how many years from the date of customs declaration release can the Ethiopian Customs Commission initiate a Post-Clearance Audit (PCA)?',
            options: ['6 months', '1 year', '3 years', '10 years'],
            correctIndex: 2,
            explanation: 'Under Customs Proclamation No. 859/2014, customs authorities have the statutory right to conduct post-clearance audits within 3 years of release.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    moduleNumber: 5,
    title: 'Ethiopian Export Trade & Forex Retention Management',
    subtitle: 'Coffee, Oilseeds, ECX Contracts & NBE Forex Retention Rules',
    description: 'Learn how to run a profitable Ethiopian export enterprise: ECX contracts, coffee grading, export contract registration at NBE, and maximizing the 50% NBE Forex Retention Account.',
    chapters: [
      {
        id: 'ch-13',
        moduleId: 'mod-5',
        chapterNumber: 13,
        title: 'Export Procedures for Coffee, Sesame & Agro-Commodities',
        description: 'End-to-end export mechanics: ECX bidding, quality grading at Coffee & Tea Authority, export permit approval, and shipment via Djibouti.',
        estimatedMinutes: 25,
        isFreeTrialAccessible: false,
        imageUrl: '/src/assets/images/ethiopian_coffee_grading_1791465129363.jpg',
        imageCaption: 'Specialty coffee cupping, physical defect grading, and moisture analysis at the Ethiopian Coffee and Tea Authority laboratory in Addis Ababa prior to export permit clearance.',
        diagramType: 'export_retention',
        sections: [
          {
            id: 's9-1',
            title: '1. Agricultural Commodities & The ECX Platform',
            content: `Ethiopia’s primary export revenue stems from agricultural commodities: Arabica coffee (Yirgacheffe, Sidama, Guji, Harar), sesame seeds (Humera, Wollega), soybeans, kidney beans, and spices.

- **Ethiopian Commodity Exchange (ECX)**: Provides standardized grading, warehouse receipts, and transparent electronic auction mechanisms.
- **Direct Export for Specialty Coffee**: Licensed coffee washing stations and growers can bypass ECX to export directly to specialty roasters worldwide, achieving higher premiums.`
          },
          {
            id: 's9-2',
            title: '2. Regulatory Approvals & Export Permits',
            content: `Before exporting:
1. **Contract Registration**: Register the sales contract with NBE within 24 hours of signing to lock in minimum export floor prices.
2. **Quality & Origin Certificates**: Inspection by Ethiopian Coffee & Tea Authority and Ministry of Agriculture (Phytosanitary Certificate).
3. **Customs Export Declaration**: Exports from Ethiopia are exempt from export duties (0% export tax) to promote foreign currency inflow.`
          },
          {
            id: 's9-3',
            title: '3. Coffee Cupping Quality Inspection & Container Stuffing SOP',
            content: `Ethiopian green coffee is a delicate organic commodity governed by stringent export handling protocols:

1. **Laboratory Liquoring & Defect Grading**:
   - Before obtaining the export release certificate, representative draw samples are dispatched to the **Ethiopian Coffee and Tea Authority Liquoring Directorate** in Addis Ababa.
   - Expert Q-graders assess:
     - **Physical defect count**: Primary and secondary defects per 350 grams (Grade 1 requires $\\le 3$ defects).
     - **Moisture content**: Must strictly measure between **10.5% and 11.5%**; moisture above 12.0% is rejected due to mold and fermentation risks.
     - **Cup score**: Clean cup, sweetness, acidity, floral aroma, and body.

2. **Stuffing into Food-Grade Containers**:
   - Coffee is packed in 60 kg clean jute bags lined with hermetic **GrainPro bags**.
   - Standard 20ft container accommodates **320 bags (19.2 Metric Tons)**.
   - Container floors and walls must be lined with corrugated kraft paper and industrial desiccant bags to prevent condensation ("container sweat") while sailing through the high-humidity Red Sea corridor!`,
            keyTakeaways: [
              'Coffee moisture must strictly adhere to the 10.5%–11.5% statutory band.',
              'Hermetic GrainPro bags prevent moisture migration during maritime transport.',
              'A standard 20ft export container accommodates exactly 19.2 tons (320 bags).'
            ],
            callout: {
              type: 'pro_tip',
              title: 'Red Sea Moisture Protection',
              text: 'Always install minimum 4 silica-gel pole desiccants in every 20ft container of green coffee to prevent condensation during monsoon shipping.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Exporting 2 Containers of Grade 1 Guji Coffee',
          commodity: 'Natural Washed Grade 1 Specialty Coffee (38.4 Metric Tons)',
          scenario: 'An Ethiopian export PLC signs a contract with a buyer in Germany at $6.80 USD / kg FOB Djibouti.',
          realWorldData: {
            'Total Contract Value': '$261,120.00 USD',
            'Domestic ECX Purchase Cost': '28,500,000 ETB',
            'Local Processing & Freight to Djibouti': '2,400,000 ETB',
            'Forex Retention Benefit': 'Eligible for 50% retention in foreign currency account'
          },
          logisticsWorkflow: [
            'Procure export coffee via ECX warehouse receipt in Hawassa.',
            'Transport to Addis Ababa processing mill for cleaning, sorting, and bagging into GrainPro sacks.',
            'Obtain Phytosanitary and ICO origin certificates.',
            'Stuff into 2 x 20ft food-grade containers and rail transit to Doraleh Port, Djibouti.'
          ],
          solutionSummary: 'The exporter generated $130,560 USD in hard currency retention, which was utilized to finance high-margin imports of industrial spare parts.'
        },
        quiz: [
          {
            id: 'q9-1',
            question: 'What is the standard customs export duty rate applied to most commercial manufactured and agro-commodities leaving Ethiopia?',
            options: ['15%', '35%', '0%', '5%'],
            correctIndex: 2,
            explanation: 'Ethiopia levies 0% export duty on most commodities to aggressively stimulate foreign currency earnings.'
          }
        ]
      },
      {
        id: 'ch-14',
        moduleId: 'mod-5',
        chapterNumber: 14,
        title: 'NBE Forex Retention Accounts & Strategic Cross-Trade',
        description: 'How to utilize NBE retention directives to retain foreign currency and fund your own import business seamlessly.',
        estimatedMinutes: 25,
        isFreeTrialAccessible: false,
        diagramType: 'export_retention',
        sections: [
          {
            id: 's10-1',
            title: '1. NBE Forex Retention Directive Mechanics',
            content: `Under current National Bank of Ethiopia foreign exchange retention directives:
- When export proceeds arrive in the commercial bank:
  - **50% of the proceeds** must be surrendered immediately to the commercial bank at the prevailing exchange rate for ETB.
  - **The remaining 50%** is credited directly into the exporter's **Foreign Currency Retention Account**.
- The retained forex can be held indefinitely to fund the exporter’s own imports or used to settle eligible international supplier obligations without waiting in bank forex queues!`
          },
          {
            id: 's10-2',
            title: '2. The Integrated "Export-to-Import" Business Model',
            content: `Top Ethiopian business groups operate as integrated **Export-Import Houses**:
1. Export commodities (even at breakeven domestic margins) to generate legal, immediate foreign exchange in their retention account.
2. Use the retained USD to open import L/Cs immediately for high-margin capital goods, machinery, or raw materials.
3. This completely bypasses the standard 6-to-12-month commercial bank forex waiting queues!`
          },
          {
            id: 's10-3',
            title: '3. Dual-Currency Accounting & Retention Account Bank Audits',
            content: `Managing a Foreign Currency Retention Account requires meticulous bookkeeping:

1. **Bank FX Account Segregation**:
   - Commercial banks maintain two ledgers for the exporter: the **ETB Current Account** (for the 50% surrendered proceeds) and the **USD/EUR Retention Account** (for the 50% retained earnings).
   - Under current directives, funds in retention accounts can be utilized for:
     - Payment of trade-related import L/Cs and CADs.
     - Foreign sea freight charges and air cargo bills.
     - External loan servicing approved by NBE.
     - International trade subscriptions, training, and business travel allowances.

2. **Annual NBE Forex Reconciliation**:
   - Every fiscal year, commercial banks report retention account turnovers to the NBE Foreign Exchange Monitoring Directorate.
   - Any unutilized balances can remain in the account indefinitely without mandatory surrender expiration under current market-based reforms!`,
            keyTakeaways: [
              'Retained foreign currency can be held indefinitely without forced conversion.',
              'Retention balances can be used for import L/Cs, sea freight, and external services.',
              'Dual-currency ledgers must be audited annually for NBE regulatory compliance.'
            ],
            callout: {
              type: 'pro_tip',
              title: 'Forex Priority Superpower',
              text: 'By funding import L/Cs through your own retention account, you skip all commercial bank forex allocation queues and receive immediate L/C issuance within 48 hours.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Leveraging Retention USD to Beat the Bank Queue',
          commodity: 'Soybean Export to Fund Construction Equipment Import',
          scenario: 'A contractor needed $300,000 USD to import construction equipment. Commercial bank waiting time was 10 months. Instead, they exported soybeans in 45 days.',
          realWorldData: {
            'Soybean Export Revenue': '$600,000 USD',
            'Surrendered to Bank (50%)': '$300,000 USD converted to ETB',
            'Retained in Forex Account (50%)': '$300,000 USD available immediately'
          },
          logisticsWorkflow: [
            'Fund local soybean harvest aggregation in Gojjam.',
            'Export via Djibouti to buyer in Mumbai.',
            'Utilize the $300,000 USD retained balance to open the import L/C same week.'
          ],
          solutionSummary: 'The project started 8 months ahead of competitors who remained stuck in bank forex allocation queues.'
        },
        quiz: [
          {
            id: 'q10-1',
            question: 'Under current NBE export retention rules, what percentage of foreign currency proceeds can an exporter typically retain in their foreign currency account?',
            options: ['10%', '30%', '50%', '100%'],
            correctIndex: 2,
            explanation: 'Under current NBE directives, 50% of export proceeds can be credited to the exporter’s foreign currency retention account, with the remaining 50% surrendered at the bank rate.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-6',
    moduleNumber: 6,
    title: 'Masterclass in Landed Cost Modeling & Profitability',
    subtitle: 'Step-by-Step Breakdown of the Reference Sheet & Multi-Tier Margin Analysis',
    description: 'Master the exact financial engineering from our reference PDF sheets: Landed cost buildup for Dump Trucks ($93,933 FOB -> 19.2M ETB landed cost), exchange rate forecasting, and profit margin matrices (0% to 100%).',
    chapters: [
      {
        id: 'ch-15',
        moduleId: 'mod-6',
        chapterNumber: 15,
        title: 'Complete Landed Cost Buildup: Real Reference Sheet Deconstruction',
        description: 'Examine every single row of Page 1 & 2 of the PDF: FOB, Freight, C&F, Marine Insurance, Bank Charges, Taxes, Port clearance, and Assembly.',
        estimatedMinutes: 35,
        isFreeTrialAccessible: false,
        imageUrl: '/src/assets/images/mojo_dry_port_machinery_1791465141249.jpg',
        imageCaption: 'Commercial fleet of heavy duty Sino dump trucks and excavators staged at Mojo Dry Port customs inspection yard following corridor transit from Djibouti.',
        diagramType: 'lc_lifecycle',
        sections: [
          {
            id: 's11-1',
            title: '1. Reviewing the Actual Reference Sheet Parameters',
            content: `Look at the real document header from Page 1:
- **Description of Goods**: DUMP TRUCKS
- **Units**: 1 Unit
- **Origin**: CHINA
- **Delivery Point**: ADDIS ABABA
- **Invoice Value (FOB)**: $93,933.00 USD
- **Sea Freight Cost**: $7,500.00 USD
- **Exchange Rate at Opening**: 157.0700 ETB
- **Exchange Rate at Settlement**: 160.0660 ETB (+1.91% increment)
- **Exchange Rate Today**: 161.0542 ETB (+2.54% increment)
- **Forecasted 2 Months Increment**: +6.14% (Average 1.80% monthly rise)

**Line-by-Line Breakdown**:
1. **FOB Value (ETB)**: $93,933 \\times 160.066 = 15,035,479.58$ ETB (100% of FOB).
2. **Freight**: $7,500 \\times 160.066 = 1,200,495.00$ ETB (8.0% of FOB).
3. **C&F Total**: 16,235,974.58 ETB.
4. **Marine Insurance (1% of 1.10*C&F)**: 300,709.59 ETB (2.0% of FOB) + 1,000 Entry Letter fee.
5. **CIF Total**: 16,536,684.17 ETB.`
          },
          {
            id: 's11-2',
            title: '2. Bank Charges & Port Logistics Lines',
            content: `Continuing down the reference sheet:
- **L/C Charges (4% of C&F)**: 601,419.18 ETB + 15% VAT (90,212.88 ETB).
- **NBE Rate Payable (2.5%)**: 375,886.99 ETB.
- **SWIFT Charge**: 200 ETB + 15% VAT (30 ETB).
- **Sea Freight Bank Service Charge (4%)**: 48,019.80 ETB + 15% VAT (7,202.97 ETB).
- **Sea Freight NBE Payable (2.5%)**: 30,012.38 ETB.
- **Taxes & Duties (3% Social Welfare for Excavator/Truck)**: 513,626.37 ETB.
- **Port Charges (Djibouti Clearance)**: 386,530.08 ETB.
- **Djibouti to Addis Ababa Transport**: 549,194.82 ETB.
- **Customs to Indode Transport**: 35,000.00 ETB.
- **Anhama Warehouse Costs**: 25,000.00 ETB.
- **Assembly at Warehouse**: 2,400,000.00 ETB (if semi-knocked down).
- **Miscellaneous Costs**: 8,117.99 ETB.
**TOTAL LANDED COST**: **19,208,137.62 ETB** (Cost Rate: **204.49 ETB/USD**)!`
          },
          {
            id: 's11-3',
            title: '3. Deriving the 204.49 ETB/USD Effective Landed Cost Conversion Factor',
            content: `The single most important practical number on Page 1 & 2 of the reference sheet is the **Cost Rate (204.49 ETB/USD)**:

1. **How the Multiplier is Derived**:
   $$\\text{Cost Rate} = \\frac{\\text{Total Landed Cost in ETB}}{\\text{Invoice Value in FOB USD}} = \\frac{19,208,137.62}{93,933.00} = 204.4876 \\approx 204.49 \\text{ ETB / USD}$$

2. **Comparing with the Bank Base Rate**:
   - The commercial bank settlement rate was **160.0660 ETB/USD**.
   - Dividing $204.49 \\div 160.0660 = 1.2775$ (or **127.75%**).
   - This proves that freight, insurance, bank commissions, statutory NBE fees, customs taxes, port clearance, trucking, and assembly add an extra **27.75% overhead** on top of the bare exchange rate!

3. **Fleet Pricing Application**:
   - If importing 10 identical Sino Dump Trucks ($939,330 USD total FOB):
   - Total landed cash requirement $= 939,330 \\times 204.4876 = 192,081,376.20$ ETB.
   - Using this single factor, financial analysts can quote accurate proformas to corporate clients within seconds!`,
            keyTakeaways: [
              'The Cost Rate equals Total Landed Cost ETB divided by Invoice FOB USD.',
              'For capital goods, the Cost Rate is typically 125% to 135% of the bank base rate.',
              'Never calculate selling prices by multiplying invoice USD by the daily bank rate!'
            ],
            callout: {
              type: 'formula',
              title: 'Executive Landed Cost Multiplier',
              text: 'Always benchmark your project multiplier: If your calculated Cost Rate is below 120% of bank rate, you have likely omitted port handling (386k ETB) or inland trucking (549k ETB).'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: The "Cost Rate" Metric Explained',
          commodity: 'Dump Truck Financial Conversion',
          scenario: 'The initial invoice was $93,933 USD. The total landed cost reached 19,208,137.62 ETB. What was the effective Cost Rate?',
          realWorldData: {
            'Invoice USD': '$93,933.00',
            'Bank Base Rate': '160.066 ETB / USD',
            'Total Landed ETB': '19,208,137.62 ETB',
            'Effective Landed Cost Rate': '204.49 ETB per 1 USD'
          },
          logisticsWorkflow: [
            'Formula: Cost Rate = Total Landed Cost ETB ÷ Invoice FOB USD.',
            '204.49 ÷ 160.066 = 1.277 (or 127.7% of initial bank rate).',
            'This means every dollar of cargo actually costs 204.49 ETB in total landed cash disbursements!'
          ],
          solutionSummary: 'Never price goods at bank rate; always calculate the full landed cost rate (204.49 ETB/USD) before quoting domestic selling prices.'
        },
        quiz: [
          {
            id: 'q11-1',
            question: 'In the reference Dump Truck cost sheet, what is the effective "Cost Rate" per USD after adding freight, insurance, bank commissions, taxes, Djibouti port clearance, and inland transport?',
            options: ['160.06 ETB / USD', '175.20 ETB / USD', '204.49 ETB / USD', '310.00 ETB / USD'],
            correctIndex: 2,
            explanation: 'As shown on Page 2 of the reference sheet, the Cost Rate is 204.49 ETB per USD (19,208,137.62 ETB ÷ $93,933 USD).'
          }
        ]
      },
      {
        id: 'ch-16',
        moduleId: 'mod-6',
        chapterNumber: 16,
        title: 'Profit Margin Matrix (0% to 100%) & 2-Month Forecasting',
        description: 'Examine the exact sales pricing ladder from Page 2: calculating unit margin amounts, duty-paid totals, and protecting against 6.14% currency inflation.',
        estimatedMinutes: 25,
        isFreeTrialAccessible: false,
        diagramType: 'tax_cascade',
        sections: [
          {
            id: 's12-1',
            title: '1. The Reference Sheet Margin Ladder',
            content: `On Page 2 of our reference sheet, an extensive pricing schedule is formulated to determine the selling price at different gross profit margins on top of the 19,208,137.62 ETB landed cost:

| Gross Margin % | Margin Amount (ETB) | Selling Price (Duty Paid Total) | Cost Rate After Margin |
|---|---|---|---|
| **0%** | 0.00 ETB | 19,208,137.62 ETB | 204.49 ETB/USD |
| **5%** | 960,406.88 ETB | 20,168,544.50 ETB | 214.71 ETB/USD |
| **6.14% (2-Mo Forecast)** | 1,178,721.97 ETB | 20,386,859.60 ETB | 217.04 ETB/USD |
| **10%** | 1,920,813.76 ETB | 21,128,951.39 ETB | 224.94 ETB/USD |
| **20%** | 3,841,627.52 ETB | 23,049,765.15 ETB | 245.39 ETB/USD |
| **30%** | 5,762,441.29 ETB | 24,970,578.91 ETB | 265.83 ETB/USD |
| **50%** | 9,604,068.81 ETB | 28,812,206.44 ETB | 306.73 ETB/USD |
| **70%** | 13,445,696.34 ETB | 32,653,833.96 ETB | 347.63 ETB/USD |
| **100%** | 19,208,137.62 ETB | 38,416,275.25 ETB | 408.98 ETB/USD |`
          },
          {
            id: 's12-2',
            title: '2. The 2-Month Currency Rise Projection',
            content: `Notice the row highlighted in orange on the reference sheet: **"Forecasted Sales Value for 2 Months >>> 20,386,859.60 ETB (at 6.14% increment)"**.

Why does the analyst include this row?
If a dump truck is imported today but will take 2 months to clear customs, assemble, and find a buyer, selling at a margin below 6.14% means **losing purchasing power in foreign currency terms**! 

The minimum breakeven target to restock inventory is therefore 217.04 ETB/USD.`
          },
          {
            id: 's12-3',
            title: '3. Commercial Sales Contracts & Domestic Currency Escalation Clauses',
            content: `When selling imported heavy machinery or industrial consignments in Ethiopia, cash contract terms must protect the seller against currency shocks:

1. **The NBE Daily Benchmark Escalation Clause**:
   - In contracts with local construction companies or mining contractors:
   - "The agreed ETB selling price is benchmarked against the National Bank of Ethiopia indicative exchange rate of [e.g. 160.06 ETB/USD]. If the official exchange rate rises by more than 2.0% between contract signing and final delivery handover, the buyer shall pay the adjusted ETB equivalent on the handover date."

2. **Down Payment vs Replacement Financing**:
   - Secure a minimum **50% to 70% advance down payment** upon contract signature.
   - Immediately allocate down payment funds toward opening the replacement L/C or depositing margin at your commercial bank, locking in replacement stock before currency drifts further.

3. **Managing Withholding & VAT Invoicing**:
   - The domestic buyer will deduct **2% withholding tax** on commercial goods if they are a registered withholding agent.
   - Importers must issue standard Ministry of Revenues cash-register fiscal receipts with **15% VAT** clearly itemized on top of the duty-paid selling price.`,
            keyTakeaways: [
              'Always insert an NBE exchange rate adjustment clause in high-value machinery sales contracts.',
              'Secure at least 50% cash advance to lock in replacement inventory margins.',
              'Account for domestic 2% withholding tax deductions by corporate buyers.'
            ],
            callout: {
              type: 'pro_tip',
              title: 'Master Trader Rule',
              text: 'A sale in Ethiopian Birr is only profitable if the proceeds can buy more foreign exchange tomorrow than you spent to import the inventory yesterday.'
            }
          }
        ],
        caseStudy: {
          title: 'Case Study: Setting Minimum Threshold Selling Price in Addis Ababa',
          commodity: 'Dump Truck Sales Strategy',
          scenario: 'A buyer offers 20,000,000 ETB cash for immediate purchase. The landed cost was 19,208,137 ETB. Should the manager accept?',
          realWorldData: {
            'Offered Price': '20,000,000 ETB',
            'Landed Cost': '19,208,137 ETB',
            'Nominal Profit': '+791,863 ETB (4.1% margin)',
            '2-Month Replacement Cost': '20,386,859 ETB'
          },
          logisticsWorkflow: [
            'Compare offered margin (4.1%) against projected currency depreciation (6.14%).',
            'At 20,000,000 ETB, the importer would be short 386,859 ETB when reopening an L/C for a replacement truck!',
            'Counter-offer at 21,500,000 ETB (approx 12% margin) to preserve capital value.'
          ],
          solutionSummary: 'Understanding the time value of money and currency replacement cost prevented an apparent accounting profit from becoming an actual business loss.'
        },
        quiz: [
          {
            id: 'q12-1',
            question: 'Why does the reference cost sheet highlight a specific 6.14% forecasted rate increment for sales value within 2 months?',
            options: [
              'Because the bank mandates a minimum 6.14% dividend to shareholders.',
              'To factor in the expected 1.8% monthly currency depreciation so the importer can preserve replacement capital when purchasing new stock.',
              'Because customs charges a 6.14% penalty on sold items.',
              'Because sea freight doubles every 60 days.'
            ],
            correctIndex: 1,
            explanation: 'The 6.14% factor protects against anticipated currency inflation over the 2-month sales cycle, ensuring sales proceeds can purchase equivalent replacement stock.'
          }
        ]
      }
    ]
  }
];
