import React from 'react';

export default function Navbar({ activeTab, setActiveTab, onOpenValuation }) {
  const navLinks = ['Home', 'Listings', 'About', 'Contact', 'Admin'];

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Promotional Claim Offer Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-900 text-white text-xs py-2 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2">
        <span className="bg-white/20 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Special Offer</span>
        <span>List your home with Reena Chaudhary and enjoy reduced listing commissions across DFW!</span>
        <button 
          onClick={() => setActiveTab('Contact')}
          className="underline hover:text-blue-200 font-black ml-2 cursor-pointer"
        >
          Claim Offer &rarr;
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand / Logo */}
          <div 
            onClick={() => setActiveTab('Home')}
            className="cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-lg shadow-md">
              RC
            </div>
            <div>
              <span className="font-black text-white text-base tracking-tight block leading-none">Reena Chaudhary</span>
              <span className="text-[11px] text-blue-400 font-black uppercase tracking-wider mt-1 block">DFW Real Estate Advisor</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
            {navLinks.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {tab === 'About' ? 'About Me' : tab}
                </button>
              );
            })}
          </nav>

          {/* Action Button: Get Valuation */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenValuation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black px-5 py-2.5 rounded-xl transition text-xs uppercase tracking-wider shadow-md cursor-pointer border border-blue-500/30"
            >
              Get Valuation
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-900 border-t border-slate-800 py-2.5 px-2 text-white">
        {navLinks.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition ${
                isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              {tab === 'About' ? 'About' : tab}
            </button>
          );
        })}
      </div>
    </header>
  );
}