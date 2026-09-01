import React from 'react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-slate-900 text-slate-300 rounded-2xl border border-slate-800 shadow-md py-4 px-6 sm:px-8 space-y-3 text-xs">
        
        <div className="flex flex-wrap justify-center gap-6 font-semibold text-white uppercase tracking-wider text-xs">
          {['Home', 'Listings', 'Calculator', 'Admin', 'About Us', 'Contact'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className="cursor-pointer hover:text-indigo-400 transition"
            >
              {tab}
            </button>
          ))}
        </div>

        <hr className="border-slate-800 max-w-4xl mx-auto" />

        <div className="space-y-1.5 max-w-4xl mx-auto text-center leading-relaxed text-[10px] text-slate-400">
          <p className="flex items-center justify-center gap-2 font-semibold text-white">
            <span className="text-indigo-400">🏠 EQUAL HOUSING OPPORTUNITY</span> — All real estate information provided is deemed reliable but is not guaranteed.
          </p>

          <div className="flex flex-wrap justify-center gap-4 font-medium text-indigo-400">
            <a 
              href="https://www.trec.texas.gov/forms/consumer-protection-notice" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline hover:text-indigo-300"
            >
              TREC Consumer Protection Notice
            </a>
            <span>•</span>
            <a 
              href="https://www.trec.texas.gov/information-about-brokerage-services" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline hover:text-indigo-300"
            >
              Information About Brokerage Services (IABS)
            </a>
          </div>

          <p>
            Data relating to real estate comes in part from the Broker Reciprocity program of NTREIS. Properties listed with brokerage firms other than Eva Realty One at eXp Realty are marked with the Broker Reciprocity logo.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-2 text-center text-slate-500 font-medium text-[10px]">
          © 2026 Eva Realty One / eXp Realty. All rights reserved. Serving Frisco, Plano, McKinney, Prosper, and the Greater DFW Metroplex.
        </div>

      </div>
    </footer>
  );
}