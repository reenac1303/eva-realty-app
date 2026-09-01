import React from 'react';

export default function AboutUs({ setActiveTab }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-block shadow-xs">
          Eva Realty One • eXp Realty
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Meet Reena Chaudhary
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Dedicated luxury real estate advisor bringing uncompromised expertise, market intelligence, and a client-first philosophy to North Texas.
        </p>
      </div>

      {/* Bio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border-4 border-indigo-200 shadow-xl">
        <div className="md:col-span-5">
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg bg-slate-100">
            <img 
              src="/profile-light.png" 
              alt="Reena Chaudhary" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </div>

        <div className="md:col-span-7 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">
            Navigating North Texas Real Estate with Precision and Care
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            As the founder of Eva Realty One and proudly powered by eXp Realty, Reena Chaudhary specializes in premier residential properties across Frisco, Plano, McKinney, Prosper, Allen, Celina, and surrounding DFW communities. 
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether you are a first-time homebuyer looking for the ideal family neighborhood, a luxury seller aiming to maximize market equity, or an investor tracking high-growth areas, Reena combines sharp negotiation skills with comprehensive local market data to deliver exceptional results.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('Contact')}
              className="bg-slate-900 hover:bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition duration-200 cursor-pointer shadow-xs"
            >
              Get in Touch with Reena
            </button>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border-4 border-indigo-200 shadow-xl space-y-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">🎯</div>
          <h4 className="font-bold text-slate-900 text-lg">Local Mastery</h4>
          <p className="text-slate-600 text-sm leading-relaxed">In-depth neighborhood knowledge covering school districts, community developments, and micro-market trends in DFW.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border-4 border-indigo-200 shadow-xl space-y-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">🤝</div>
          <h4 className="font-bold text-slate-900 text-lg">Client-Centric Focus</h4>
          <p className="text-slate-600 text-sm leading-relaxed">Tailored communication, transparent advisory, and dedicated guidance structured entirely around your personal timeline and goals.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border-4 border-indigo-200 shadow-xl space-y-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">💡</div>
          <h4 className="font-bold text-slate-900 text-lg">Strategic Marketing</h4>
          <p className="text-slate-600 text-sm leading-relaxed">High-end staging advice, professional presentation, and targeted digital positioning designed to give your property a competitive edge.</p>
        </div>
      </div>

    </div>
  );
}