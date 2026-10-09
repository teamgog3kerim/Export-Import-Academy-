import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, Printer, RotateCcw, FileDown, ShieldCheck, HelpCircle } from 'lucide-react';

export const TaxAssessmentCalculator: React.FC = () => {
  const { hasFullAccess, setShowPaywallModal } = useApp();

  const [itemDescription, setItemDescription] = useState<string>('Toyota Spare Parts — 1 Container');
  const [units, setUnits] = useState<number>(1);
  const [fobUSD, setFobUSD] = useState<number>(35000);
  const [exchangeRate, setExchangeRate] = useState<number>(160.05);
  const [freightUSD, setFreightUSD] = useState<number>(4500);
  const [insuranceETB, setInsuranceETB] = useState<number>(75000);
  const [otherInlandETB, setOtherInlandETB] = useState<number>(45000);

  // Tax rates
  const [customsDutyRate, setCustomsDutyRate] = useState<number>(20); // 0%, 10%, 20%, 35%
  const [exciseTaxRate, setExciseTaxRate] = useState<number>(0); // 0% - 100%
  const [surtaxRate, setSurtaxRate] = useState<number>(10); // 10%
  const [socialWelfareRate, setSocialWelfareRate] = useState<number>(3); // 3%
  const [vatRate, setVatRate] = useState<number>(15); // 15%
  const [withholdingTaxRate, setWithholdingTaxRate] = useState<number>(3); // 3%
  const [scanningFeeRate, setScanningFeeRate] = useState<number>(0.07); // 0.07%

  // Calculations
  const fobETB = fobUSD * exchangeRate;
  const freightETB = freightUSD * exchangeRate;
  const totalCifETB = fobETB + freightETB + insuranceETB;
  const totalTaxableAmountETB = totalCifETB + otherInlandETB;

  // Ethiopian Customs Cascade Formulas:
  // Base 1: CIF
  const dutyValueETB = totalTaxableAmountETB * (customsDutyRate / 100);

  // Base 2 for Excise: Taxable + Duty
  const exciseBase = totalTaxableAmountETB + dutyValueETB;
  const exciseValueETB = exciseBase * (exciseTaxRate / 100);

  // Base 3 for Surtax: Taxable + Duty + Excise
  const surtaxBase = totalTaxableAmountETB + dutyValueETB + exciseValueETB;
  const surtaxValueETB = surtaxBase * (surtaxRate / 100);

  // Base 4 for Social Welfare: CIF / Taxable
  const socialWelfareValueETB = totalTaxableAmountETB * (socialWelfareRate / 100);

  // Base 5 for VAT: Taxable + Duty + Excise + Surtax + Social Welfare
  const vatBase = totalTaxableAmountETB + dutyValueETB + exciseValueETB + surtaxValueETB + socialWelfareValueETB;
  const vatValueETB = vatBase * (vatRate / 100);

  // Base 6 for Withholding: Taxable CIF
  const withholdingValueETB = totalTaxableAmountETB * (withholdingTaxRate / 100);

  // Base 7 for Scanning Fee: Taxable CIF
  const scanningFeeValueETB = totalTaxableAmountETB * (scanningFeeRate / 100);

  // Total Item Taxes
  const totalItemTaxesETB =
    dutyValueETB +
    exciseValueETB +
    surtaxValueETB +
    socialWelfareValueETB +
    vatValueETB +
    withholdingValueETB +
    scanningFeeValueETB;

  const totalAssessedAmountETB = totalItemTaxesETB;
  const taxPerUnitETB = units > 0 ? totalAssessedAmountETB / units : totalAssessedAmountETB;

  const formatETB = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const handleReset = () => {
    setItemDescription('');
    setUnits(1);
    setFobUSD(0);
    setExchangeRate(160.00);
    setFreightUSD(0);
    setInsuranceETB(0);
    setOtherInlandETB(0);
    setCustomsDutyRate(0);
    setExciseTaxRate(0);
    setSurtaxRate(10);
    setSocialWelfareRate(3);
    setVatRate(15);
    setWithholdingTaxRate(3);
    setScanningFeeRate(0.07);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            IMPORT · CUSTOMS
          </span>
          <h1 className="text-2xl md:text-3xl font-serif-title font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            Tax Assessment Calculator
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Compute CIF value, item taxes, and the total assessed amount for any import declaration.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-neutral-900 hover:bg-black dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Card: CIF & Taxable Amount */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
        <h2 className="text-base font-serif-title font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <span>CIF & Taxable Amount</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="md:col-span-3">
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">
              Item / Goods Description
            </label>
            <input
              type="text"
              value={itemDescription}
              placeholder="e.g. Toyota Spare Parts — 1 Container"
              onChange={e => setItemDescription(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Units</label>
            <input
              type="number"
              value={units}
              onChange={e => setUnits(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">FCY / FOB Value (USD)</label>
            <input
              type="number"
              value={fobUSD}
              onChange={e => setFobUSD(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">
              Exchange Rate (ETB / USD)
            </label>
            <input
              type="number"
              step="0.0001"
              value={exchangeRate}
              onChange={e => setExchangeRate(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Freight Value (USD)</label>
            <input
              type="number"
              value={freightUSD}
              onChange={e => setFreightUSD(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 dark:text-neutral-400 font-medium mb-1">Insurance Value (ETB)</label>
            <input
              type="number"
              value={insuranceETB}
              onChange={e => setInsuranceETB(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Total CIF Value Banner */}
        <div className="bg-neutral-50 dark:bg-neutral-800/60 p-4 rounded-xl flex items-center justify-between border border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              TOTAL CIF VALUE
            </span>
            <div className="text-[11px] text-neutral-400">FOB ETB + Freight ETB + Insurance ETB</div>
          </div>
          <div className="text-xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
            ETB {formatETB(totalCifETB)}
          </div>
        </div>

        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium mb-1">
            Other Inland Costs (ETB)
          </label>
          <input
            type="number"
            value={otherInlandETB}
            onChange={e => setOtherInlandETB(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg font-mono-numbers text-neutral-900 dark:text-neutral-100 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Inland transport, port handling, terminal charges, etc.
          </span>
        </div>

        {/* Total Taxable Amount Banner */}
        <div className="bg-neutral-900 dark:bg-neutral-950 text-white p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              TOTAL TAXABLE AMOUNT
            </span>
            <div className="text-[11px] text-neutral-400">CIF + Other Inland Costs — base for all item taxes</div>
          </div>
          <div className="text-xl md:text-2xl font-bold font-mono-numbers text-white">
            ETB {formatETB(totalTaxableAmountETB)}
          </div>
        </div>
      </div>

      {/* Card: Item Taxes */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
        <h2 className="text-base font-serif-title font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <span>Item Taxes</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 pb-2">
                <th className="py-2.5 px-3 w-16">Code</th>
                <th className="py-2.5 px-3">Tax Type</th>
                <th className="py-2.5 px-3 text-right w-36">Rate (%)</th>
                <th className="py-2.5 px-3 text-right w-44 font-bold text-neutral-900 dark:text-neutral-100">
                  Value (ETB)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-mono-numbers">
              {/* Code 01 */}
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-neutral-500">01</td>
                <td className="py-2 px-3 font-sans font-medium text-neutral-800 dark:text-neutral-200">
                  Import Customs Tax
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    value={customsDutyRate}
                    onChange={e => setCustomsDutyRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-right bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-xs font-mono font-semibold"
                  />
                </td>
                <td className="py-2 px-3 text-right font-medium">{formatETB(dutyValueETB)}</td>
              </tr>

              {/* Code 03 */}
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-neutral-500">03</td>
                <td className="py-2 px-3 font-sans font-medium text-neutral-800 dark:text-neutral-200">
                  Excise Tax
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    value={exciseTaxRate}
                    onChange={e => setExciseTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-right bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-xs font-mono font-semibold"
                  />
                </td>
                <td className="py-2 px-3 text-right font-medium">{formatETB(exciseValueETB)}</td>
              </tr>

              {/* Code 05 */}
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-neutral-500">05</td>
                <td className="py-2 px-3 font-sans font-medium text-neutral-800 dark:text-neutral-200">
                  Goods Liable to 10% Surtax
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    value={surtaxRate}
                    onChange={e => setSurtaxRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-right bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-xs font-mono font-semibold"
                  />
                </td>
                <td className="py-2 px-3 text-right font-medium">{formatETB(surtaxValueETB)}</td>
              </tr>

              {/* Code 12 */}
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-neutral-500">12</td>
                <td className="py-2 px-3 font-sans font-medium text-neutral-800 dark:text-neutral-200">
                  Goods Liable to 3% Social Welfare Tax
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    value={socialWelfareRate}
                    onChange={e => setSocialWelfareRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-right bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-xs font-mono font-semibold"
                  />
                </td>
                <td className="py-2 px-3 text-right font-medium">{formatETB(socialWelfareValueETB)}</td>
              </tr>

              {/* Code 04 */}
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-neutral-500">04</td>
                <td className="py-2 px-3 font-sans font-medium text-neutral-800 dark:text-neutral-200">
                  Value Added Tax (VAT)
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    value={vatRate}
                    onChange={e => setVatRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-right bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-xs font-mono font-semibold"
                  />
                </td>
                <td className="py-2 px-3 text-right font-medium">{formatETB(vatValueETB)}</td>
              </tr>

              {/* Code 15 */}
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-neutral-500">15</td>
                <td className="py-2 px-3 font-sans font-medium text-neutral-800 dark:text-neutral-200">
                  Goods Liable to 3% Withholding Tax
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    value={withholdingTaxRate}
                    onChange={e => setWithholdingTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-right bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-xs font-mono font-semibold"
                  />
                </td>
                <td className="py-2 px-3 text-right font-medium">{formatETB(withholdingValueETB)}</td>
              </tr>

              {/* Code 16 */}
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-neutral-500">16</td>
                <td className="py-2 px-3 font-sans font-medium text-neutral-800 dark:text-neutral-200">
                  Goods Liable to 0.07% Scanning Fee
                </td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    step="0.01"
                    value={scanningFeeRate}
                    onChange={e => setScanningFeeRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-right bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-xs font-mono font-semibold"
                  />
                </td>
                <td className="py-2 px-3 text-right font-medium">{formatETB(scanningFeeValueETB)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Item Taxes */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs">
          <span className="font-semibold text-neutral-600 dark:text-neutral-400">TOTAL ITEM TAXES</span>
          <span className="font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100 text-sm">
            ETB {formatETB(totalItemTaxesETB)}
          </span>
        </div>

        {/* Black & Brown Summary Cards (Exact UI match to Screenshot 3) */}
        <div className="space-y-2 pt-2">
          <div className="bg-neutral-900 text-white p-4 rounded-xl flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              TOTAL TAX ASSESSED AMOUNT
            </span>
            <span className="text-xl md:text-2xl font-bold font-mono-numbers text-white">
              ETB {formatETB(totalAssessedAmountETB)}
            </span>
          </div>

          <div className="bg-amber-900/90 text-white p-4 rounded-xl flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
              TAX ASSESSED PER UNIT ({units} {units === 1 ? 'UNIT' : 'UNITS'})
            </span>
            <span className="text-xl md:text-2xl font-bold font-mono-numbers text-amber-100">
              ETB {formatETB(taxPerUnitETB)}
            </span>
          </div>
        </div>
      </div>

      {/* Assessment Notice Preview (Matches Screenshot 3 bottom view) */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-base font-serif-title font-bold text-neutral-900 dark:text-neutral-100">
            Assessment Notice Preview
          </h2>
          <span className="text-[11px] text-neutral-400">Official Customs Format</span>
        </div>

        <div className="bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/80 rounded-xl p-5 text-xs font-mono-numbers space-y-3">
          <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700 pb-2">
            <div>
              <div className="font-serif-title font-bold text-base text-neutral-900 dark:text-neutral-100">
                Assessment Notice
              </div>
              <div className="text-neutral-500 text-[11px] font-sans">
                {itemDescription || '— No item description —'}
              </div>
            </div>
            <div className="text-neutral-500 font-sans font-medium">{units} units</div>
          </div>

          <div className="space-y-1.5 text-neutral-700 dark:text-neutral-300">
            <div className="flex justify-between">
              <span className="font-sans">FOB Value (ETB)</span>
              <span>{formatETB(fobETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">Freight (ETB)</span>
              <span>{formatETB(freightETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">Insurance (ETB)</span>
              <span>{formatETB(insuranceETB)}</span>
            </div>
            <div className="flex justify-between font-bold text-neutral-900 dark:text-neutral-100 pt-1 border-t border-neutral-200 dark:border-neutral-700">
              <span className="font-sans">Total CIF Value</span>
              <span>{formatETB(totalCifETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">Other Inland Costs</span>
              <span>{formatETB(otherInlandETB)}</span>
            </div>
            <div className="flex justify-between font-bold text-neutral-900 dark:text-neutral-100 pt-1 border-t border-neutral-200 dark:border-neutral-700">
              <span className="font-sans">Total Taxable Amount</span>
              <span>{formatETB(totalTaxableAmountETB)}</span>
            </div>
          </div>

          <div className="space-y-1 pt-3 border-t border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
            <div className="flex justify-between">
              <span className="font-sans">01 · Import Customs Tax ({customsDutyRate}%)</span>
              <span>{formatETB(dutyValueETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">03 · Excise Tax ({exciseTaxRate}%)</span>
              <span>{formatETB(exciseValueETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">05 · Goods Liable to 10% Surtax ({surtaxRate}%)</span>
              <span>{formatETB(surtaxValueETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">12 · Goods Liable to 3% Social Welfare Tax ({socialWelfareRate}%)</span>
              <span>{formatETB(socialWelfareValueETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">04 · Value Added Tax ({vatRate}%)</span>
              <span>{formatETB(vatValueETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">15 · Goods Liable to 3% Withholding Tax ({withholdingTaxRate}%)</span>
              <span>{formatETB(withholdingValueETB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans">16 · Goods Liable to 0.07% Scanning Fee ({scanningFeeRate}%)</span>
              <span>{formatETB(scanningFeeValueETB)}</span>
            </div>
          </div>

          <div className="space-y-2 pt-3">
            <div className="bg-neutral-900 text-white p-3 rounded-lg flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider font-sans">TOTAL ASSESSED AMOUNT</span>
              <span className="text-base font-bold text-amber-400">ETB {formatETB(totalAssessedAmountETB)}</span>
            </div>
            <div className="bg-amber-900/90 text-white p-3 rounded-lg flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider font-sans">TAX PER UNIT</span>
              <span className="text-base font-bold text-amber-200">ETB {formatETB(taxPerUnitETB)}</span>
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 text-center font-sans pt-2">
            System generated assessment notice · No signature required.
          </div>
        </div>
      </div>
    </div>
  );
};
