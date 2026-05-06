'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function FinancePage() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(8.5);

  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const n = tenure;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const banks = [
    { name: 'State Bank of India', logo: 'SBI' },
    { name: 'HDFC Bank', logo: 'HDFC' },
    { name: 'ICICI Bank', logo: 'ICICI' },
    { name: 'Axis Bank', logo: 'AXIS' },
    { name: 'Toyota Financial Services', logo: 'TFS' },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-32">
      <div className="main-container">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#ff2b2b] text-[10px] font-black uppercase tracking-[0.4em]">Ownership Simplified</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic">Insurance & <span className="text-[#ff2b2b]">Finance</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">Get competitive rates and instant approvals with our premium banking partners.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* EMI Calculator Section */}
          <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm space-y-12">
            <h2 className="text-2xl font-black uppercase italic text-gray-900 border-b border-gray-100 pb-6">EMI Calculator</h2>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Loan Amount</label>
                  <span className="text-xl font-black text-gray-900 italic">₹{(loanAmount).toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="100000" 
                  max="5000000" 
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-1 bg-gray-100 accent-[#ff2b2b] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Tenure (Months)</label>
                  <span className="text-xl font-black text-gray-900 italic">{tenure} Months</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="84" 
                  step="12"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-1 bg-gray-100 accent-[#ff2b2b] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Interest Rate (%)</label>
                  <span className="text-xl font-black text-gray-900 italic">{interestRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="7" 
                  max="15" 
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1 bg-gray-100 accent-[#ff2b2b] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Your Monthly EMI</p>
              <h3 className="text-5xl font-black text-[#ff2b2b] italic tracking-tight">₹{(calculateEMI()).toLocaleString()}</h3>
            </div>
          </div>

          {/* Partners & Inquiry Form */}
          <div className="space-y-8">
            {/* Partners */}
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Preferred Banking Partners</h4>
              <div className="grid grid-cols-3 gap-4">
                {banks.map(bank => (
                  <div key={bank.name} className="h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 hover:border-[#ff2b2b] transition-colors group">
                    <span className="text-xs font-black text-gray-400 group-hover:text-gray-900">{bank.logo}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl">
              <h3 className="text-2xl font-black uppercase italic mb-6">Finance Inquiry</h3>
              <form className="space-y-5">
                <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-[#ff2b2b] transition-all" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-[#ff2b2b] transition-all" />
                <select className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-[#ff2b2b] transition-all appearance-none">
                  <option className="bg-gray-900">Select Vehicle</option>
                  <option className="bg-gray-900">Fortuner</option>
                  <option className="bg-gray-900">Innova Hycross</option>
                  <option className="bg-gray-900">Hyryder</option>
                </select>
                <button className="w-full py-5 bg-[#ff2b2b] text-white font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">
                  Get Loan Offer
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Insurance Info Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h4 className="text-xl font-black uppercase italic">Cashless Claims</h4>
            <p className="text-gray-500 text-sm">Priority repairs at all Laxmi Toyota body shops with cashless facility.</p>
          </div>
          <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="text-xl font-black uppercase italic">Zero Dep Insurance</h4>
            <p className="text-gray-500 text-sm">Full coverage for all plastic and metal parts during claims.</p>
          </div>
          <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="w-12 h-12 bg-red-50 text-[#ff2b2b] rounded-full flex items-center justify-center">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h4 className="text-xl font-black uppercase italic">Instant Quotes</h4>
            <p className="text-gray-500 text-sm">Compare multiple insurance providers instantly for the best deal.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
