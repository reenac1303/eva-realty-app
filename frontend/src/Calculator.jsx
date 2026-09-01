import React, { useState } from 'react';

export default function Calculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(2.2);
  const [homeInsurance, setHomeInsurance] = useState(1500);
  const [hoaFee, setHoaFee] = useState(50);

  const downPayment = (homePrice * downPaymentPercent) / 100;
  const loanAmount = homePrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPrincipalAndInterest =
    monthlyInterestRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = homeInsurance / 12;
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyInsurance +
    Number(hoaFee);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-3 inline-block shadow-xs">
          Eva Realty One • Financial Tool
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Mortgage Calculator</h1>
        <p className="text-slate-600 mt-3 text-base">
          Estimate your monthly mortgage payments including principal, interest, taxes, insurance, and HOA fees across North Texas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Inputs Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-4 border-indigo-200 p-8 shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Loan Parameters</h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-slate-700">Home Price</label>
              <span className="font-extrabold text-indigo-600 text-base">${Number(homePrice).toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="100000" 
              max="2000000" 
              step="10000"
              value={homePrice} 
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-slate-700">Down Payment ({downPaymentPercent}%)</label>
              <span className="font-extrabold text-slate-900 text-base">${Number(downPayment).toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              step="1"
              value={downPaymentPercent} 
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <label className="font-bold text-slate-700 text-sm block">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.1" 
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-indigo-600"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 text-sm block">Loan Term (Years)</label>
              <select 
                value={loanTerm} 
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-indigo-600 cursor-pointer"
              >
                <option value={15}>15 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={30}>30 Years Fixed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="font-semibold text-slate-600 text-xs block mb-1">Property Tax (%)</label>
              <input 
                type="number" 
                step="0.1" 
                value={propertyTaxRate} 
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 text-xs block mb-1">Annual Insurance ($)</label>
              <input 
                type="number" 
                step="100" 
                value={homeInsurance} 
                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 text-xs block mb-1">Monthly HOA ($)</label>
              <input 
                type="number" 
                step="10" 
                value={hoaFee} 
                onChange={(e) => setHoaFee(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Results Breakdown Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl border-4 border-indigo-400 p-8 shadow-2xl flex flex-col justify-between space-y-8">
          <div>
            <span className="text-indigo-400 font-semibold text-xs uppercase tracking-widest block mb-1">Estimated Payment</span>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
              ${Math.round(totalMonthlyPayment).toLocaleString()}
              <span className="text-xs text-slate-400 font-normal uppercase tracking-normal ml-2">/ month</span>
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-800 pt-6 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span> Principal & Interest
              </span>
              <span className="font-bold text-white">${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> Property Taxes
              </span>
              <span className="font-bold text-white">${Math.round(monthlyPropertyTax).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-400 inline-block"></span> Home Insurance
              </span>
              <span className="font-bold text-white">${Math.round(monthlyInsurance).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span> HOA Fees
              </span>
              <span className="font-bold text-white">${Number(hoaFee).toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}