import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, CheckCircle2, DollarSign, ArrowRight, Printer, RotateCcw, AlertTriangle, Layers } from 'lucide-react';

export const LCCalculator: React.FC = () => {
  const { hasFullAccess, setShowPaywallModal } = useApp();
  const [activeCase, setActiveCase] = useState<'case1' | 'case2'>('case2');

  // Case 1 State (Full Shipment - seeded with PDF Page 3 data)
  const [case1Units, setCase1Units] = useState<number>(10);
  const [case1Currency, setCase1Currency] = useState<string>('USD');
  const [case1OpeningFcy, setCase1OpeningFcy] = useState<number>(725000);
  const [case1OpeningRate, setCase1OpeningRate] = useState<number>(157.0655);
  const [case1OpeningMarginPct, setCase1OpeningMarginPct] = useState<number>(50);
  const [case1SwiftUSD, setCase1SwiftUSD] = useState<number>(100);
  const [case1OpeningPaid, setCase1OpeningPaid] = useState<boolean>(true);

  const [case1SettlementRate, setCase1SettlementRate] = useState<number>(158.0655);
  const [case1SettlementPaid, setCase1SettlementPaid] = useState<boolean>(true);

  const [case1IncludeFreight, setCase1IncludeFreight] = useState<boolean>(true);
  const [case1FreightFcy, setCase1FreightFcy] = useState<number>(78000);
  const [case1FreightRate, setCase1FreightRate] = useState<number>(158.0800);
  const [case1FreightPaid, setCase1FreightPaid] = useState<boolean>(true);

  // Case 2 State (Partial Shipment - seeded with PDF Page 5 & 6 data: 10 units -> 6 units -> 4 units)
  const [case2TotalUnits, setCase2TotalUnits] = useState<number>(10);
  const [case2TotalFcy, setCase2TotalFcy] = useState<number>(1450000);
  const [case2OpeningRate, setCase2OpeningRate] = useState<number>(155.1919);
  const [case2OpeningMarginPct, setCase2OpeningMarginPct] = useState<number>(30);
  const [case2UnpaidMarginFeePct, setCase2UnpaidMarginFeePct] = useState<number>(5);
  const [case2SwiftUSD, setCase2SwiftUSD] = useState<number>(38.66);
  const [case2OpeningPaid, setCase2OpeningPaid] = useState<boolean>(true);

  // 1st Partial Lot (6 units)
  const [case2Lot1Units, setCase2Lot1Units] = useState<number>(6);
  const [case2Lot1SettlementRate, setCase2Lot1SettlementRate] = useState<number>(157.0700);
  const [case2Lot1FreightFcy, setCase2Lot1FreightFcy] = useState<number>(156000);
  const [case2Lot1FreightRate, setCase2Lot1FreightRate] = useState<number>(160.0100);
  const [case2Lot1SettlementPaid, setCase2Lot1SettlementPaid] = useState<boolean>(true);
  const [case2Lot1FreightPaid, setCase2Lot1FreightPaid] = useState<boolean>(true);

  // Remaining Lot (4 units)
  const [case2Lot2SettlementRate, setCase2Lot2SettlementRate] = useState<number>(157.0700);
  const [case2Lot2FreightFcy, setCase2Lot2FreightFcy] = useState<number>(104000);
  const [case2Lot2FreightRate, setCase2Lot2FreightRate] = useState<number>(160.0100);
  const [case2Lot2SettlementPaid, setCase2Lot2SettlementPaid] = useState<boolean>(true);
  const [case2Lot2FreightPaid, setCase2Lot2FreightPaid] = useState<boolean>(true);

  const formatETB = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  // --- Calculations Case 1 ---
  const c1OpeningTotalETB = case1OpeningFcy * case1OpeningRate;
  const c1OpeningMarginETB = c1OpeningTotalETB * (case1OpeningMarginPct / 100);
  const c1BankCommETB = c1OpeningTotalETB * 0.04;
  const c1BankCommVatETB = c1BankCommETB * 0.15;
  const c1SwiftETB = case1SwiftUSD * case1OpeningRate;
  const c1SwiftVatETB = c1SwiftETB * 0.15;
  const c1TotalOpeningDebit =
    c1OpeningMarginETB + c1BankCommETB + c1BankCommVatETB + c1SwiftETB + c1SwiftVatETB;

  const c1SettlementTotalETB = case1OpeningFcy * case1SettlementRate;
  const c1SettlementRemainPct = 100 - case1OpeningMarginPct;
  const c1SettlementAmountETB = c1SettlementTotalETB * (c1SettlementRemainPct / 100);
  const c1NbeFeeETB = c1SettlementTotalETB * 0.025;
  const c1TotalSettlementDebit = c1SettlementAmountETB + c1NbeFeeETB;
  const c1TotalAmountPayableLC = c1TotalOpeningDebit + c1TotalSettlementDebit;

  const c1FreightTotalETB = case1FreightFcy * case1FreightRate;
  const c1FreightBankCommETB = c1FreightTotalETB * 0.04;
  const c1FreightBankCommVatETB = c1FreightBankCommETB * 0.15;
  const c1FreightNbeFeeETB = c1FreightTotalETB * 0.025;
  const c1TotalFreightDebit =
    c1FreightTotalETB + c1FreightBankCommETB + c1FreightBankCommVatETB + c1FreightNbeFeeETB;

  const c1GrandTotalPaid = c1TotalAmountPayableLC + (case1IncludeFreight ? c1TotalFreightDebit : 0);

  // --- Calculations Case 2 ---
  const c2OpeningTotalETB = case2TotalFcy * case2OpeningRate;
  const c2OpeningMarginETB = c2OpeningTotalETB * (case2OpeningMarginPct / 100);
  const c2BankCommETB = c2OpeningTotalETB * 0.04;
  const c2BankCommVatETB = c2BankCommETB * 0.15;
  const c2UnpaidMarginFeeETB =
    c2OpeningTotalETB * ((100 - case2OpeningMarginPct) / 100) * (case2UnpaidMarginFeePct / 100);
  const c2UnpaidMarginVatETB = c2UnpaidMarginFeeETB * 0.15;
  const c2SwiftETB = case2SwiftUSD * case2OpeningRate;
  const c2SwiftVatETB = c2SwiftETB * 0.15;
  const c2TotalOpeningDebit =
    c2OpeningMarginETB +
    c2BankCommETB +
    c2BankCommVatETB +
    c2UnpaidMarginFeeETB +
    c2UnpaidMarginVatETB +
    c2SwiftETB +
    c2SwiftVatETB;

  // Lot 1 (e.g. 6 units)
  const c2Lot1Ratio = case2TotalUnits > 0 ? case2Lot1Units / case2TotalUnits : 0.6;
  const c2Lot1Fcy = case2TotalFcy * c2Lot1Ratio;
  const c2Lot1TotalETB = c2Lot1Fcy * case2Lot1SettlementRate;
  const c2Lot1MarginHeld = c2Lot1TotalETB * (case2OpeningMarginPct / 100);
  const c2Lot1SettlementAmount = c2Lot1TotalETB * ((100 - case2OpeningMarginPct) / 100);
  const c2Lot1NbeFee = c2Lot1TotalETB * 0.025;
  const c2Lot1TotalSettlementDebit = c2Lot1SettlementAmount + c2Lot1NbeFee;

  const c2Lot1FreightTotalETB = case2Lot1FreightFcy * case2Lot1FreightRate;
  const c2Lot1FreightServiceCharge = c2Lot1FreightTotalETB * 0.04;
  const c2Lot1FreightVat = c2Lot1FreightServiceCharge * 0.15;
  const c2Lot1FreightNbe = c2Lot1FreightTotalETB * 0.025;
  const c2Lot1TotalFreightDebit =
    c2Lot1FreightTotalETB + c2Lot1FreightServiceCharge + c2Lot1FreightVat + c2Lot1FreightNbe;

  // Lot 2 (Remaining units, e.g. 4 units)
  const c2Lot2Units = Math.max(0, case2TotalUnits - case2Lot1Units);
  const c2Lot2Fcy = Math.max(0, case2TotalFcy - c2Lot1Fcy);
  const c2Lot2TotalETB = c2Lot2Fcy * case2Lot2SettlementRate;
  const c2Lot2MarginHeld = c2Lot2TotalETB * (case2OpeningMarginPct / 100);
  const c2Lot2SettlementAmount = c2Lot2TotalETB * ((100 - case2OpeningMarginPct) / 100);
  const c2Lot2NbeFee = c2Lot2TotalETB * 0.025;
  const c2Lot2TotalSettlementDebit = c2Lot2SettlementAmount + c2Lot2NbeFee;

  const c2Lot2FreightTotalETB = case2Lot2FreightFcy * case2Lot2FreightRate;
  const c2Lot2FreightServiceCharge = c2Lot2FreightTotalETB * 0.04;
  const c2Lot2FreightVat = c2Lot2FreightServiceCharge * 0.15;
  const c2Lot2FreightNbe = c2Lot2FreightTotalETB * 0.025;
  const c2Lot2TotalFreightDebit =
    c2Lot2FreightTotalETB + c2Lot2FreightServiceCharge + c2Lot2FreightVat + c2Lot2FreightNbe;

  const c2GrandTotalDisbursements =
    c2TotalOpeningDebit +
    c2Lot1TotalSettlementDebit +
    c2Lot1TotalFreightDebit +
    c2Lot2TotalSettlementDebit +
    c2Lot2TotalFreightDebit;

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>Commercial Bank of Ethiopia / Private Banks Standard</span>
            <span>·</span>
            <span>NBE Circular Compliant</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            LC & Freight Cost Breakdown Calculator
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Simulate Full Shipment vs. Partial Shipment debits, margin holdings, NBE 2.5% statutory rates, and sea freight charges.
          </p>
        </div>

        {/* Tab switch between Case 1 and Case 2 */}
        <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setActiveCase('case1')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeCase === 'case1'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            CASE 1 — FULL SHIPMENT
          </button>
          <button
            onClick={() => setActiveCase('case2')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeCase === 'case2'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            CASE 2 — PARTIAL SHIPMENT
          </button>
        </div>
      </div>

      {/* Case 1: Full Shipment View */}
      {activeCase === 'case1' && (
        <div className="space-y-6">
          {/* Document Header */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Document Header</span>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                Required
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  TOTAL UNITS (QTY)
                </label>
                <input
                  type="number"
                  value={case1Units}
                  onChange={e => setCase1Units(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-mono-numbers text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  CURRENCY TYPE
                </label>
                <select
                  value={case1Currency}
                  onChange={e => setCase1Currency(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="CNY">CNY (¥)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: LC Opening Payable — All Units */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="text-base font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                LC Opening Payable — All Units
              </h2>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Always</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  FCY VALUE (FOB) <span className="text-[11px] text-neutral-400">From proforma invoice</span>
                </span>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={case1OpeningFcy}
                      onChange={e => setCase1OpeningFcy(parseFloat(e.target.value) || 0)}
                      className="w-36 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded font-semibold text-neutral-900 dark:text-neutral-100"
                    />
                    <span className="absolute right-2 top-1 text-[11px] text-neutral-400">USD</span>
                  </div>
                  <span className="font-mono-numbers font-medium text-neutral-500 min-w-32 text-right">
                    ETB {formatETB(c1OpeningTotalETB)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">OPENING EXCHANGE RATE (ETB)</span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.0001"
                    value={case1OpeningRate}
                    onChange={e => setCase1OpeningRate(parseFloat(e.target.value) || 0)}
                    className="w-36 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100"
                  />
                  <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 min-w-32 text-right">
                    ETB {formatETB(c1OpeningTotalETB)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">OPENING MARGIN %</span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={case1OpeningMarginPct}
                    onChange={e => setCase1OpeningMarginPct(parseFloat(e.target.value) || 0)}
                    className="w-24 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100"
                  />
                  <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 min-w-32 text-right">
                    ETB {formatETB(c1OpeningMarginETB)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  BANK SERVICE CHARGE <span className="text-[11px] text-neutral-400">Fixed 4%</span>
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c1BankCommETB)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  VAT ON BSC <span className="text-[11px] text-neutral-400">Fixed 15%</span>
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c1BankCommVatETB)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">SWIFT CHARGE (IF ANY)</span>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={case1SwiftUSD}
                      onChange={e => setCase1SwiftUSD(parseFloat(e.target.value) || 0)}
                      className="w-24 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100"
                    />
                    <span className="absolute right-2 top-1 text-[11px] text-neutral-400">USD</span>
                  </div>
                  <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 min-w-32 text-right">
                    ETB {formatETB(c1SwiftETB)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  VAT ON SWIFT CHARGE <span className="text-[11px] text-neutral-400">Fixed 15%</span>
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c1SwiftVatETB)}
                </span>
              </div>
            </div>

            {/* Subtotal Banner */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-rose-50/60 dark:bg-rose-950/20 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="c1OpenPaid"
                  checked={case1OpeningPaid}
                  onChange={e => setCase1OpeningPaid(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <label htmlFor="c1OpenPaid" className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-200 cursor-pointer">
                  TOTAL LC OPENING DEBITED
                </label>
              </div>
              <span className="text-base font-bold font-mono-numbers text-rose-700 dark:text-rose-400">
                ETB {formatETB(c1TotalOpeningDebit)}
              </span>
            </div>
          </div>

          {/* Section: LC Settlement Payable — Full Shipment */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="text-base font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                LC Settlement Payable — Full Shipment
              </h2>
              <span className="text-[11px] font-semibold text-neutral-400">DOCUMENT RETIREMENT</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">SETTLEMENT EXCHANGE RATE (ETB)</span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.0001"
                    value={case1SettlementRate}
                    onChange={e => setCase1SettlementRate(parseFloat(e.target.value) || 0)}
                    className="w-36 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100 font-semibold"
                  />
                  <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 min-w-32 text-right">
                    ETB {formatETB(c1SettlementTotalETB)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">MARGIN HELD PAYABLE</span>
                  <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-1.5 py-0.5 rounded font-mono">
                    CARRIED {case1OpeningMarginPct}%
                  </span>
                </div>
                <span className="font-mono-numbers text-neutral-500 text-right">
                  - ETB {formatETB(c1OpeningMarginETB)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  SETTLEMENT AMOUNT % ({c1SettlementRemainPct}%)
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c1SettlementAmountETB)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  NBE 2.5% RATE <span className="text-[11px] text-neutral-400">Statutory foreign exchange fee</span>
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c1NbeFeeETB)}
                </span>
              </div>
            </div>

            {/* Subtotal Banner */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-rose-50/60 dark:bg-rose-950/20 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="c1SetPaid"
                  checked={case1SettlementPaid}
                  onChange={e => setCase1SettlementPaid(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <label htmlFor="c1SetPaid" className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-200 cursor-pointer">
                  TOTAL LC SETTLEMENT DEBITED
                </label>
              </div>
              <span className="text-base font-bold font-mono-numbers text-rose-700 dark:text-rose-400">
                ETB {formatETB(c1TotalSettlementDebit)}
              </span>
            </div>

            <div className="mt-2 text-right text-xs font-bold text-neutral-700 dark:text-neutral-300">
              TOTAL ETB AMOUNT PAYABLE ON THIS LC: <span className="font-mono-numbers text-neutral-900 dark:text-neutral-100">ETB {formatETB(c1TotalAmountPayableLC)}</span>
            </div>
          </div>

          {/* Section: Sea Freight Payable */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="text-base font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                Sea Freight Payable — Full Shipment
              </h2>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="c1IncFreight"
                  checked={case1IncludeFreight}
                  onChange={e => setCase1IncludeFreight(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <label htmlFor="c1IncFreight" className="text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                  Include Sea Freight in Calculation
                </label>
              </div>
            </div>

            {case1IncludeFreight && (
              <div className="space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">FREIGHT FCY VALUE (USD)</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={case1FreightFcy}
                      onChange={e => setCase1FreightFcy(parseFloat(e.target.value) || 0)}
                      className="w-36 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100"
                    />
                    <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 min-w-32 text-right">
                      ETB {formatETB(c1FreightTotalETB)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">FREIGHT EXCHANGE RATE (ETB)</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={case1FreightRate}
                    onChange={e => setCase1FreightRate(parseFloat(e.target.value) || 0)}
                    className="w-36 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">BANK SERVICE CHARGE (Fixed 4%)</span>
                  <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                    ETB {formatETB(c1FreightBankCommETB)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">VAT ON BSC (Fixed 15%)</span>
                  <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                    ETB {formatETB(c1FreightBankCommVatETB)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">NBE 2.5% RATE</span>
                  <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                    ETB {formatETB(c1FreightNbeFeeETB)}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-rose-50/60 dark:bg-rose-950/20 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="c1FreightPaid"
                      checked={case1FreightPaid}
                      onChange={e => setCase1FreightPaid(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <label htmlFor="c1FreightPaid" className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-200 cursor-pointer">
                      TOTAL FREIGHT PAYABLE DEBITED
                    </label>
                  </div>
                  <span className="text-base font-bold font-mono-numbers text-rose-700 dark:text-rose-400">
                    ETB {formatETB(c1TotalFreightDebit)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Grand Total Bar */}
          <div className="bg-neutral-900 dark:bg-neutral-800 text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-400">Grand Total — CFR & Bank Charges</span>
              <div className="text-sm font-medium text-neutral-300 mt-0.5">
                Total Cash Debited for 10 Units Full Settlement
              </div>
            </div>
            <div className="text-2xl font-bold font-mono-numbers text-amber-400">
              ETB {formatETB(c1GrandTotalPaid)}
            </div>
          </div>
        </div>
      )}

      {/* Case 2: Partial Shipment View (10 Units -> 6 Units Lot 1 -> 4 Units Lot 2) */}
      {activeCase === 'case2' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Partial Shipment Configuration</span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                10 Units Split: 6 Units + 4 Units
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  TOTAL CONTRACT UNITS
                </label>
                <input
                  type="number"
                  value={case2TotalUnits}
                  onChange={e => setCase2TotalUnits(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  1ST LOT UNITS (SHIPPED)
                </label>
                <input
                  type="number"
                  value={case2Lot1Units}
                  onChange={e => setCase2Lot1Units(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers font-bold text-amber-700 dark:text-amber-400"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  REMAINING LOT UNITS (AUTO)
                </label>
                <div className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers font-bold text-neutral-900 dark:text-neutral-100">
                  {c2Lot2Units} Units
                </div>
              </div>
            </div>
          </div>

          {/* Section: LC Opening Payable — All Units */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h2 className="text-base font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                  LC Opening Payments Advice — All 10 Units
                </h2>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Page 5 PDF Benchmark: $1,450,000 USD @ 155.1919 ETB
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded">
                DEBITED AT OPENING
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">FCY VALUE (10 UNITS)</span>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={case2TotalFcy}
                      onChange={e => setCase2TotalFcy(parseFloat(e.target.value) || 0)}
                      className="w-36 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded font-semibold text-neutral-900 dark:text-neutral-100"
                    />
                    <span className="absolute right-2 top-1 text-[11px] text-neutral-400">USD</span>
                  </div>
                  <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 min-w-36 text-right">
                    ETB {formatETB(c2OpeningTotalETB)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">OPENING EXCHANGE RATE</span>
                <input
                  type="number"
                  step="0.0001"
                  value={case2OpeningRate}
                  onChange={e => setCase2OpeningRate(parseFloat(e.target.value) || 0)}
                  className="w-36 px-2.5 py-1 text-right font-mono-numbers bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  MARGIN OPENING % ({case2OpeningMarginPct}%)
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c2OpeningMarginETB)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  BANK COMMISSION (4%) + VAT (15%)
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c2BankCommETB + c2BankCommVatETB)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  UNPAID MARGIN SERVICE CHARGE (5% on 70%) + VAT (15%)
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c2UnpaidMarginFeeETB + c2UnpaidMarginVatETB)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5">
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  SWIFT CHARGE ($38.66) + VAT (15%)
                </span>
                <span className="font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 text-right">
                  ETB {formatETB(c2SwiftETB + c2SwiftVatETB)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-rose-50/60 dark:bg-rose-950/20 p-3 rounded-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-200">
                TOTAL DEBITED AT OPENING (PAID)
              </span>
              <span className="text-base font-bold font-mono-numbers text-rose-700 dark:text-rose-400">
                ETB {formatETB(c2TotalOpeningDebit)}
              </span>
            </div>
          </div>

          {/* Section: 1st Partial Lot Settlement & Freight (6 Units) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1st Partial LC Settlement */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <h3 className="text-sm font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                      1st Partial — LC Settlement (6 Units)
                    </h3>
                    <span className="text-[11px] text-neutral-500">FCY: ${formatETB(c2Lot1Fcy)} USD</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded">
                    PARTIAL 1
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Settlement Rate</span>
                    <input
                      type="number"
                      step="0.0001"
                      value={case2Lot1SettlementRate}
                      onChange={e => setCase2Lot1SettlementRate(parseFloat(e.target.value) || 0)}
                      className="w-28 px-2 py-0.5 text-right font-mono bg-neutral-50 dark:bg-neutral-800 border rounded text-xs"
                    />
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Total Lot 1 ETB Value</span>
                    <span className="font-mono-numbers font-medium">ETB {formatETB(c2Lot1TotalETB)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Margin Held Release (30%)</span>
                    <span className="font-mono-numbers text-neutral-400">- ETB {formatETB(c2Lot1MarginHeld)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Remaining Settlement (70%)</span>
                    <span className="font-mono-numbers font-semibold">ETB {formatETB(c2Lot1SettlementAmount)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">NBE 2.5% Rate</span>
                    <span className="font-mono-numbers font-semibold">ETB {formatETB(c2Lot1NbeFee)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200">Total 1st Settlement Debit</span>
                <span className="text-sm font-bold font-mono-numbers text-amber-800 dark:text-amber-400">
                  ETB {formatETB(c2Lot1TotalSettlementDebit)}
                </span>
              </div>
            </div>

            {/* 1st Partial Sea Freight */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <h3 className="text-sm font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                      1st Partial — Sea Freight (6 Units)
                    </h3>
                    <span className="text-[11px] text-neutral-500">FCY: ${formatETB(case2Lot1FreightFcy)} USD</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                    FREIGHT 1
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Freight Rate</span>
                    <input
                      type="number"
                      step="0.0001"
                      value={case2Lot1FreightRate}
                      onChange={e => setCase2Lot1FreightRate(parseFloat(e.target.value) || 0)}
                      className="w-28 px-2 py-0.5 text-right font-mono bg-neutral-50 dark:bg-neutral-800 border rounded text-xs"
                    />
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Freight Converted</span>
                    <span className="font-mono-numbers font-medium">ETB {formatETB(c2Lot1FreightTotalETB)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Service Charge (4%) + VAT (15%)</span>
                    <span className="font-mono-numbers font-semibold">
                      ETB {formatETB(c2Lot1FreightServiceCharge + c2Lot1FreightVat)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">NBE Payable (2.5%)</span>
                    <span className="font-mono-numbers font-semibold">ETB {formatETB(c2Lot1FreightNbe)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-blue-50/50 dark:bg-blue-950/20 p-2.5 rounded-lg">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-200">Total 1st Freight Debit</span>
                <span className="text-sm font-bold font-mono-numbers text-blue-800 dark:text-blue-400">
                  ETB {formatETB(c2Lot1TotalFreightDebit)}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Remaining Lot Settlement & Freight (4 Units) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Remaining Units LC Settlement */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <h3 className="text-sm font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                      Remaining Units — LC Settlement (4 Units)
                    </h3>
                    <span className="text-[11px] text-neutral-500">FCY: ${formatETB(c2Lot2Fcy)} USD</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded">
                    PARTIAL 2
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Settlement Rate</span>
                    <input
                      type="number"
                      step="0.0001"
                      value={case2Lot2SettlementRate}
                      onChange={e => setCase2Lot2SettlementRate(parseFloat(e.target.value) || 0)}
                      className="w-28 px-2 py-0.5 text-right font-mono bg-neutral-50 dark:bg-neutral-800 border rounded text-xs"
                    />
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Total Lot 2 ETB Value</span>
                    <span className="font-mono-numbers font-medium">ETB {formatETB(c2Lot2TotalETB)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Margin Held Release (30%)</span>
                    <span className="font-mono-numbers text-neutral-400">- ETB {formatETB(c2Lot2MarginHeld)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Remaining Settlement (70%)</span>
                    <span className="font-mono-numbers font-semibold">ETB {formatETB(c2Lot2SettlementAmount)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">NBE 2.5% Rate</span>
                    <span className="font-mono-numbers font-semibold">ETB {formatETB(c2Lot2NbeFee)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200">Total Remaining Settlement</span>
                <span className="text-sm font-bold font-mono-numbers text-amber-800 dark:text-amber-400">
                  ETB {formatETB(c2Lot2TotalSettlementDebit)}
                </span>
              </div>
            </div>

            {/* Remaining Units Sea Freight */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <h3 className="text-sm font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
                      Remaining Units — Sea Freight (4 Units)
                    </h3>
                    <span className="text-[11px] text-neutral-500">FCY: ${formatETB(case2Lot2FreightFcy)} USD</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                    FREIGHT 2
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Freight Rate</span>
                    <input
                      type="number"
                      step="0.0001"
                      value={case2Lot2FreightRate}
                      onChange={e => setCase2Lot2FreightRate(parseFloat(e.target.value) || 0)}
                      className="w-28 px-2 py-0.5 text-right font-mono bg-neutral-50 dark:bg-neutral-800 border rounded text-xs"
                    />
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Freight Converted</span>
                    <span className="font-mono-numbers font-medium">ETB {formatETB(c2Lot2FreightTotalETB)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-500">Service Charge (4%) + VAT (15%)</span>
                    <span className="font-mono-numbers font-semibold">
                      ETB {formatETB(c2Lot2FreightServiceCharge + c2Lot2FreightVat)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">NBE Payable (2.5%)</span>
                    <span className="font-mono-numbers font-semibold">ETB {formatETB(c2Lot2FreightNbe)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-blue-50/50 dark:bg-blue-950/20 p-2.5 rounded-lg">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-200">Total Remaining Freight</span>
                <span className="text-sm font-bold font-mono-numbers text-blue-800 dark:text-blue-400">
                  ETB {formatETB(c2Lot2TotalFreightDebit)}
                </span>
              </div>
            </div>
          </div>

          {/* Grand Reconciliation Banner */}
          <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Case 2 Partial Shipment Financial Summary (10 Units Total)
              </div>
              <div className="text-xs text-neutral-300 mt-1 space-x-2">
                <span>Opening: {formatETB(c2TotalOpeningDebit)} ETB</span>
                <span>·</span>
                <span>Lot 1 (6 Units): {formatETB(c2Lot1TotalSettlementDebit + c2Lot1TotalFreightDebit)} ETB</span>
                <span>·</span>
                <span>Lot 2 (4 Units): {formatETB(c2Lot2TotalSettlementDebit + c2Lot2TotalFreightDebit)} ETB</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-400 block">Total Disbursed for All 10 Units</span>
              <span className="text-xl md:text-2xl font-bold font-mono-numbers text-amber-400">
                ETB {formatETB(c2GrandTotalDisbursements)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
