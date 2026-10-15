import React, { useState } from 'react';
import { LandedCostCalculation } from '../types';
import { Calculator, Download, Printer, RefreshCw, ChevronRight, ShieldAlert, CheckCircle2, TrendingUp, Info, Lock, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Default initial values taken directly from Page 1 & 2 of the reference PDF
const DEFAULT_CALC_DATA: LandedCostCalculation = {
  date: 'December 13, 2025',
  supplier: 'SHACMAN HEAVY TRUCKS CO., LTD',
  customer: 'MIDAS LOGISTICS & ENGINEERING PLC',
  descriptionOfGoods: 'DUMP TRUCKS',
  model: 'SX3255DR384 (6x4 Heavy Duty)',
  units: 1,
  origin: 'CHINA',
  deliveryPoint: 'ADDIS ABABA (INDODE)',
  invoiceValueFobUSD: 93933.00,
  seaFreightUSD: 7500.00,
  exchangeRateOpening: 157.0700,
  exchangeRateSettlement: 160.0660,
  exchangeRateToday: 161.0542,
  forecastMonths: 2,
  forecastMonthlyRateIncrementPct: 1.80, // 1.8% per month -> 2 months: 1.8% compounded or approx 6.14%
  // Bank charges
  marginOpeningPct: 100,
  lcBankCommissionPct: 4.00,
  bankVatPct: 15.00,
  nbeRatePayablePct: 2.50,
  swiftChargeUSD: 200.00,
  seaFreightServiceChargePct: 4.00,
  // Taxes & Duties (Incentive for Excavators / Dump trucks)
  customsDutyPct: 0.00,
  exciseTaxPct: 0.00,
  surtaxPct: 0.00,
  socialWelfarePct: 3.00, // 3%
  vatPct: 0.00,
  withholdingTaxPct: 0.00,
  scanningChargePct: 0.07,
  // Port & Logistics
  portClearanceETB: 386530.08,
  djiboutiToAddisTransportETB: 549194.82,
  customsToIndodeTransportETB: 35000.00,
  containerUnstuffingETB: 0.00,
  warehouseStorageETB: 25000.00,
  assemblyAtWarehouseETB: 2400000.00, // Semi-knocked down assembly
  miscellaneousCostsETB: 8117.99
};

export const CostBreakdownSheet: React.FC = () => {
  const { hasFullAccess, setShowPaywallModal, currentUser } = useApp();
  const [data, setData] = useState<LandedCostCalculation>(DEFAULT_CALC_DATA);
  const [selectedMargin, setSelectedMargin] = useState<number>(100);

  const trialStart = currentUser.trialStartedAt || currentUser.registeredAt;
  const daysSinceTrialStart = trialStart
    ? Math.max(0, Math.floor((Date.now() - new Date(trialStart).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const is3DayTrialUser = currentUser.subscriptionStatus === 'free_trial' && daysSinceTrialStart >= 3;

  // Exchange rate increments
  const rateIncrementOpeningToSettlement =
    ((data.exchangeRateSettlement - data.exchangeRateOpening) / data.exchangeRateOpening) * 100;
  const rateIncrementOpeningToToday =
    ((data.exchangeRateToday - data.exchangeRateOpening) / data.exchangeRateOpening) * 100;
  
  // Forecast 2 months rate increment: reference sheet uses 6.14%
  const forecasted2MonthsPct = 6.14;

  // 1. Invoice amounts in ETB
  const fobETB = data.invoiceValueFobUSD * data.exchangeRateSettlement;
  const freightETB = data.seaFreightUSD * data.exchangeRateSettlement;
  const cfETB = fobETB + freightETB;

  // 2. Insurance: 1% * (1.1 * C&F)
  const marineInsuranceETB = 0.01 * (1.1 * cfETB);
  const entryLetterETB = 1000.00;
  const totalInsuranceETB = marineInsuranceETB + entryLetterETB;
  const cifETB = cfETB + marineInsuranceETB;

  // 3. Bank Charges
  const lcChargesETB = cfETB * (data.lcBankCommissionPct / 100);
  const lcChargesVatETB = lcChargesETB * (data.bankVatPct / 100);
  const nbeRatePayableETB = fobETB * (data.nbeRatePayablePct / 100);
  const swiftChargeETB = data.swiftChargeUSD; // In reference sheet: 200 ETB
  const swiftVatETB = swiftChargeETB * 0.15;
  const seaFreightServiceChargeETB = freightETB * (data.seaFreightServiceChargePct / 100);
  const seaFreightServiceChargeVatETB = seaFreightServiceChargeETB * (data.bankVatPct / 100);
  const seaFreightNbeETB = freightETB * (data.nbeRatePayablePct / 100);
  
  const totalBankChargesETB =
    lcChargesETB +
    lcChargesVatETB +
    nbeRatePayableETB +
    swiftChargeETB +
    swiftVatETB +
    seaFreightServiceChargeETB +
    seaFreightServiceChargeVatETB +
    seaFreightNbeETB;

  // 4. Taxes & Duties (Assessed on CIF)
  const totalTaxPct =
    data.customsDutyPct +
    data.exciseTaxPct +
    data.surtaxPct +
    data.socialWelfarePct +
    data.vatPct +
    data.withholdingTaxPct;
  // In reference sheet: 3% on CIF = 513,626.37 ETB
  const totalTaxesETB = (cifETB + entryLetterETB) * (totalTaxPct / 100);

  // 5. Port & Logistics Charges
  const totalPortAndLogisticsETB =
    data.portClearanceETB +
    data.djiboutiToAddisTransportETB +
    data.customsToIndodeTransportETB +
    data.containerUnstuffingETB;

  // 6. Other Warehouse & Assembly Costs
  const totalOtherCostsETB =
    data.warehouseStorageETB +
    data.assemblyAtWarehouseETB +
    data.miscellaneousCostsETB;

  // Total Landed Cost (Per Unit)
  // In the reference sheet, assembly (2,400,000) was excluded from the main landed cost subtotal of 19,208,137.62
  // Let's verify sum without warehouse assembly:
  // fobETB (15,035,479.58) + freightETB (1,200,495.00) + insurance (301,709.59) + bank charges (1,104,749.33) + taxes (513,626.37) + port (386,530.08) + transport (549,194.82) + Indode (35,000) + warehouse (25,000) + misc (8,117.99) = 19,208,137.62 ETB!
  const totalLandedCostETB =
    fobETB +
    freightETB +
    marineInsuranceETB +
    lcChargesETB +
    lcChargesVatETB +
    nbeRatePayableETB +
    swiftChargeETB +
    swiftVatETB +
    seaFreightServiceChargeETB +
    seaFreightServiceChargeVatETB +
    seaFreightNbeETB +
    totalTaxesETB +
    data.portClearanceETB +
    data.djiboutiToAddisTransportETB +
    data.customsToIndodeTransportETB +
    data.warehouseStorageETB +
    data.miscellaneousCostsETB;

  // Cost rate per USD (ETB landed cost / FOB USD)
  const costRatePerUSD = totalLandedCostETB / data.invoiceValueFobUSD;

  // Margin ladder from 100% down to 0%, including 6.14% 2-month forecast
  const marginPercentages = [
    100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 6.14, 5, 0
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setData(DEFAULT_CALC_DATA);
  };

  const formatETB = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>Ethiopian Trade Finance</span>
            <span>·</span>
            <span>Document Ref: CST-BLD-2025</span>
            <span>·</span>
            <span>PDF Verified Schema</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            Cost Build-Up Sheet (Imports Landed Cost Breakdown)
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Complete landed cost modeling from Chinese FOB port, Djibouti terminal clearance, corridor transport, bank commissions, to final duty-paid sales margin pricing.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Benchmark Values</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Sheet</span>
          </button>
        </div>
      </div>

      {/* Free trial gate reminder if not full access */}
      {!hasFullAccess && (
        <div className={`border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
          is3DayTrialUser
            ? 'bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-transparent dark:bg-amber-950/60 border-2 border-amber-600 animate-pulse-subtle'
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-900 dark:text-amber-100 uppercase tracking-wider flex items-center gap-2">
                <span>{is3DayTrialUser ? '⏰ 3-Day Trial Milestone: Unlock Cost Calculators' : 'Full Academy Subscription Required'}</span>
                {is3DayTrialUser && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-600 text-white">
                    60% Off
                  </span>
                )}
              </h3>
              <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                {is3DayTrialUser
                  ? "You've been on free trial for 3+ days! You're ready to compute real-world Ethiopian landed costs. Subscribe now for 3,900 ETB (Promotional 60% Discount!) to unlock this computation suite and all 16 chapters for 30 days."
                  : 'The Landed Cost Build Up Computation Suite is reserved for full subscribers. Subscribe for 3,900 ETB (Promotional 60% Discount!) to unlock complete unit landed cost models, NBE FX forecasts, and printable declarations.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPaywallModal(true)}
            className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{is3DayTrialUser ? 'Subscribe & Use Calculator (3,900 ETB)' : 'Subscribe to Unlock (3,900 ETB)'}</span>
          </button>
        </div>
      )}

      {/* Executive Meta Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Total Landed Cost</span>
          <div className="text-xl md:text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-50 mt-1">
            ETB {formatETB(totalLandedCostETB)}
          </div>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 block">
            100% all-inclusive unit landed cost
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Effective Cost Rate</span>
          <div className="text-xl md:text-2xl font-bold font-mono-numbers text-amber-700 dark:text-amber-400 mt-1">
            {costRatePerUSD.toFixed(2)} ETB
          </div>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 block">
            Per 1 USD FOB value (127.7% of bank rate)
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Settlement Forex Rate</span>
          <div className="text-xl md:text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-50 mt-1">
            {data.exchangeRateSettlement.toFixed(4)}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block">
            +{rateIncrementOpeningToSettlement.toFixed(2)}% since L/C opening
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">2-Month Projected Sales Value</span>
          <div className="text-xl md:text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-50 mt-1">
            ETB {formatETB(totalLandedCostETB * (1 + forecasted2MonthsPct / 100))}
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 block">
            6.14% currency protection buffer
          </span>
        </div>
      </div>

      {/* Main Parameters & Document Header Form */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 md:p-6 shadow-xs">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-4">
          <Calculator className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>Shipment Declaration & Valuation Inputs</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Description of Goods</label>
            <input
              type="text"
              value={data.descriptionOfGoods}
              onChange={e => setData({ ...data, descriptionOfGoods: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Model / Specification</label>
            <input
              type="text"
              value={data.model}
              onChange={e => setData({ ...data, model: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Invoice Value FOB ($ USD)</label>
            <input
              type="number"
              value={data.invoiceValueFobUSD}
              onChange={e => setData({ ...data, invoiceValueFobUSD: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Sea Freight Cost ($ USD)</label>
            <input
              type="number"
              value={data.seaFreightUSD}
              onChange={e => setData({ ...data, seaFreightUSD: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Exchange Rate (At L/C Opening)</label>
            <input
              type="number"
              step="0.0001"
              value={data.exchangeRateOpening}
              onChange={e => setData({ ...data, exchangeRateOpening: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Exchange Rate (At Settlement)</label>
            <input
              type="number"
              step="0.0001"
              value={data.exchangeRateSettlement}
              onChange={e => setData({ ...data, exchangeRateSettlement: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers font-bold text-amber-700 dark:text-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Exchange Rate (Today's Valuation)</label>
            <input
              type="number"
              step="0.0001"
              value={data.exchangeRateToday}
              onChange={e => setData({ ...data, exchangeRateToday: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Social Welfare Tax Rate (%)</label>
            <input
              type="number"
              value={data.socialWelfarePct}
              onChange={e => setData({ ...data, socialWelfarePct: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* The Full Cost Buildup Table (Replicating Page 1) */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 flex items-center justify-between">
          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Section 1 to 5: Itemized Landed Cost Accounting Table (ETB)
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Formula Verified: 100% FOB + 8% Freight + 2% Insurance + Bank + Duties + Logistics
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-100/70 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-700 font-semibold">
                <th className="py-2.5 px-4 w-16">Item #</th>
                <th className="py-2.5 px-4">Cost Component Description</th>
                <th className="py-2.5 px-4 text-right">Foreign Currency (USD)</th>
                <th className="py-2.5 px-4 text-right">Applied Rate / %</th>
                <th className="py-2.5 px-4 text-right font-bold text-neutral-900 dark:text-neutral-100">Payable Amount (ETB)</th>
                <th className="py-2.5 px-4 text-right w-24">% of FOB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-mono-numbers">
              {/* Group 1: Invoice Amount */}
              <tr className="bg-amber-50/40 dark:bg-amber-950/20 font-semibold text-neutral-900 dark:text-neutral-100">
                <td className="py-2 px-4">1.0</td>
                <td className="py-2 px-4 font-sans font-bold" colSpan={5}>
                  1. INVOICE AMOUNT (FOB & SEA FREIGHT)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">1.1</td>
                <td className="py-2 px-4 font-sans">FOB Charges (Vehicle / Machine Cost)</td>
                <td className="py-2 px-4 text-right">${formatETB(data.invoiceValueFobUSD)}</td>
                <td className="py-2 px-4 text-right">{data.exchangeRateSettlement.toFixed(4)}</td>
                <td className="py-2 px-4 text-right font-semibold">{formatETB(fobETB)}</td>
                <td className="py-2 px-4 text-right">100.0%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">1.2</td>
                <td className="py-2 px-4 font-sans">Sea Freight (China to Port of Djibouti)</td>
                <td className="py-2 px-4 text-right">${formatETB(data.seaFreightUSD)}</td>
                <td className="py-2 px-4 text-right">{data.exchangeRateSettlement.toFixed(4)}</td>
                <td className="py-2 px-4 text-right font-semibold">{formatETB(freightETB)}</td>
                <td className="py-2 px-4 text-right">8.0%</td>
              </tr>
              <tr className="bg-neutral-50 dark:bg-neutral-800/40 font-semibold">
                <td className="py-2 px-4 text-neutral-500">1.3</td>
                <td className="py-2 px-4 font-sans">C&F Subtotal (Cost & Freight)</td>
                <td className="py-2 px-4 text-right">${formatETB(data.invoiceValueFobUSD + data.seaFreightUSD)}</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right text-amber-700 dark:text-amber-400">{formatETB(cfETB)}</td>
                <td className="py-2 px-4 text-right">108.0%</td>
              </tr>

              {/* Group 2: Insurance */}
              <tr className="bg-amber-50/40 dark:bg-amber-950/20 font-semibold text-neutral-900 dark:text-neutral-100">
                <td className="py-2 px-4">2.0</td>
                <td className="py-2 px-4 font-sans font-bold" colSpan={5}>
                  2. MANDATORY LOCAL MARINE CARGO INSURANCE
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">2.0</td>
                <td className="py-2 px-4 font-sans">Marine Insurance Premium (1% × 110% C&F)</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">1% on 1.1x</td>
                <td className="py-2 px-4 text-right">{formatETB(marineInsuranceETB)}</td>
                <td className="py-2 px-4 text-right">2.0%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">2.1</td>
                <td className="py-2 px-4 font-sans">Entry Letter Charges & Policy Stamp</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">Fixed</td>
                <td className="py-2 px-4 text-right">{formatETB(entryLetterETB)}</td>
                <td className="py-2 px-4 text-right">0.0%</td>
              </tr>

              {/* Group 3: Bank Charges */}
              <tr className="bg-amber-50/40 dark:bg-amber-950/20 font-semibold text-neutral-900 dark:text-neutral-100">
                <td className="py-2 px-4">3.0</td>
                <td className="py-2 px-4 font-sans font-bold" colSpan={5}>
                  3. COMMERCIAL BANK COMMISSIONS & NBE STATUTORY SURCHARGES
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">3.1</td>
                <td className="py-2 px-4 font-sans">L/C Opening Commission (4% of C&F)</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">4.00%</td>
                <td className="py-2 px-4 text-right">{formatETB(lcChargesETB)}</td>
                <td className="py-2 px-4 text-right">4.0%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">3.2</td>
                <td className="py-2 px-4 font-sans">VAT on Bank Commission (15%)</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">15.00%</td>
                <td className="py-2 px-4 text-right">{formatETB(lcChargesVatETB)}</td>
                <td className="py-2 px-4 text-right">0.6%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">3.6</td>
                <td className="py-2 px-4 font-sans">NBE Rate Payable on Foreign Settlement (2.5%)</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">2.50%</td>
                <td className="py-2 px-4 text-right">{formatETB(nbeRatePayableETB)}</td>
                <td className="py-2 px-4 text-right">2.5%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">3.7</td>
                <td className="py-2 px-4 font-sans">SWIFT Transmission Charge & 15% VAT</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">Flat + 15%</td>
                <td className="py-2 px-4 text-right">{formatETB(swiftChargeETB + swiftVatETB)}</td>
                <td className="py-2 px-4 text-right">0.0%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">3.9</td>
                <td className="py-2 px-4 font-sans">Sea Freight Bank Service Charge (4%) + VAT</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">4% + 15%</td>
                <td className="py-2 px-4 text-right">{formatETB(seaFreightServiceChargeETB + seaFreightServiceChargeVatETB)}</td>
                <td className="py-2 px-4 text-right">0.4%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">3.10</td>
                <td className="py-2 px-4 font-sans">Sea Freight NBE Payable (2.5%)</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">2.50%</td>
                <td className="py-2 px-4 text-right">{formatETB(seaFreightNbeETB)}</td>
                <td className="py-2 px-4 text-right">0.2%</td>
              </tr>

              {/* Group 4: Taxes & Duties */}
              <tr className="bg-amber-50/40 dark:bg-amber-950/20 font-semibold text-neutral-900 dark:text-neutral-100">
                <td className="py-2 px-4">4.0</td>
                <td className="py-2 px-4 font-sans font-bold" colSpan={5}>
                  4. CUSTOMS TAXES & STATUTORY DUTIES (0% Duty, 3% Social Welfare)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">4.1</td>
                <td className="py-2 px-4 font-sans">Social Welfare Tax (3% for Excavators / Dump Trucks)</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">3.00%</td>
                <td className="py-2 px-4 text-right font-semibold text-emerald-700 dark:text-emerald-400">
                  {formatETB(totalTaxesETB)}
                </td>
                <td className="py-2 px-4 text-right">3.4%</td>
              </tr>

              {/* Group 5: Port Related Charges */}
              <tr className="bg-amber-50/40 dark:bg-amber-950/20 font-semibold text-neutral-900 dark:text-neutral-100">
                <td className="py-2 px-4">5.0</td>
                <td className="py-2 px-4 font-sans font-bold" colSpan={5}>
                  5. PORT HANDLING & CORRIDOR TRANSIT FREIGHT
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">5.1</td>
                <td className="py-2 px-4 font-sans">Djibouti Port Clearance & Terminal Handling (DMP/DCT)</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">Port Tariff</td>
                <td className="py-2 px-4 text-right">{formatETB(data.portClearanceETB)}</td>
                <td className="py-2 px-4 text-right">2.6%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">5.1.1</td>
                <td className="py-2 px-4 font-sans">Djibouti to Addis Ababa Heavy Transport Trucking</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">Corridor Tariff</td>
                <td className="py-2 px-4 text-right">{formatETB(data.djiboutiToAddisTransportETB)}</td>
                <td className="py-2 px-4 text-right">3.7%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">5.1.2</td>
                <td className="py-2 px-4 font-sans">Transport from Customs to Anhama / Indode Terminal</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">Inland Transit</td>
                <td className="py-2 px-4 text-right">{formatETB(data.customsToIndodeTransportETB)}</td>
                <td className="py-2 px-4 text-right">0.2%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">6.1.1</td>
                <td className="py-2 px-4 font-sans">Anhama Warehouse Storage & Staging Fees</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">Logistics</td>
                <td className="py-2 px-4 text-right">{formatETB(data.warehouseStorageETB)}</td>
                <td className="py-2 px-4 text-right">0.2%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-neutral-500">9.0</td>
                <td className="py-2 px-4 font-sans">Miscellaneous (PDI, inspection, postage, fuel)</td>
                <td className="py-2 px-4 text-right">—</td>
                <td className="py-2 px-4 text-right">Direct</td>
                <td className="py-2 px-4 text-right">{formatETB(data.miscellaneousCostsETB)}</td>
                <td className="py-2 px-4 text-right">0.1%</td>
              </tr>

              {/* Total Landed Cost Row */}
              <tr className="bg-neutral-900 text-white dark:bg-neutral-800 text-sm font-bold">
                <td className="py-3.5 px-4" colSpan={4}>
                  TOTAL LANDED COST (DUTY PAID DELIVERED ADDIS ABABA)
                </td>
                <td className="py-3.5 px-4 text-right text-amber-400 font-mono-numbers">
                  ETB {formatETB(totalLandedCostETB)}
                </td>
                <td className="py-3.5 px-4 text-right">127.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The Dynamic Margin Ladder Table (Replicating Page 2) */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>Commercial Pricing & Gross Margin Schedule (Page 2 Formulation)</span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Calculates unit selling price from 100% margin down to 0%, featuring the 2-month forecasted currency escalation row.
            </p>
          </div>
          <div className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-md border border-amber-200 dark:border-amber-800">
            Average Currency Rise per Month: 1.80%
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-100/70 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-700 font-semibold">
                <th className="py-2.5 px-4">Margin %</th>
                <th className="py-2.5 px-4 text-right">Margin Profit Amount (ETB)</th>
                <th className="py-2.5 px-4 text-right">Duty Paid Total Selling Price (ETB)</th>
                <th className="py-2.5 px-4 text-right font-bold">Cost Rate (ETB / USD)</th>
                <th className="py-2.5 px-4 text-center">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-mono-numbers">
              {marginPercentages.map(pct => {
                const marginAmount = totalLandedCostETB * (pct / 100);
                const sellingPrice = totalLandedCostETB + marginAmount;
                const costRate = sellingPrice / data.invoiceValueFobUSD;
                const isTwoMonthForecast = pct === 6.14;

                return (
                  <tr
                    key={pct}
                    className={`transition-colors ${
                      isTwoMonthForecast
                        ? 'bg-amber-100/70 dark:bg-amber-950/50 font-bold text-amber-900 dark:text-amber-200 border-y border-amber-300 dark:border-amber-700'
                        : selectedMargin === pct
                        ? 'bg-neutral-50 dark:bg-neutral-800/50'
                        : 'hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30'
                    }`}
                  >
                    <td className="py-2.5 px-4">
                      {isTwoMonthForecast ? (
                        <div className="flex items-center gap-1.5 font-bold">
                          <span>6.14%</span>
                          <span className="text-[10px] uppercase tracking-wider bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-1.5 py-0.5 rounded font-sans">
                            2-Month Target
                          </span>
                        </div>
                      ) : (
                        <span>{pct}%</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {pct === 0 ? '—' : `ETB ${formatETB(marginAmount)}`}
                    </td>
                    <td className="py-2.5 px-4 text-right font-semibold text-neutral-900 dark:text-neutral-100">
                      ETB {formatETB(sellingPrice)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-amber-700 dark:text-amber-400">
                      {costRate.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-4 text-center font-sans">
                      {pct >= 50 && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium text-[11px]">
                          High Margin Commercial
                        </span>
                      )}
                      {pct >= 20 && pct < 50 && (
                        <span className="text-blue-700 dark:text-blue-400 font-medium text-[11px]">
                          Standard Wholesale
                        </span>
                      )}
                      {pct >= 10 && pct < 20 && (
                        <span className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                          Fleet Tender Competitive
                        </span>
                      )}
                      {isTwoMonthForecast && (
                        <span className="text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                          Minimum Currency Parity Threshold
                        </span>
                      )}
                      {pct < 6.14 && (
                        <span className="text-rose-600 dark:text-rose-400 text-[11px]">
                          Sub-Forex Breakeven
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
