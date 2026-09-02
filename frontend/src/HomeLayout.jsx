import React from 'react';

export default function HomeLayout({
  activeTab,
  setActiveTab,
  onOpenValuation,
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFB] text-slate-900">
      {activeTab === 'Home' && (
        <div className="space-y-12 pb-16">
          
          {/* 1. Hero Section with Luxury DFW Background */}
          <div className="relative bg-slate-900 text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80" 
                alt="Luxury DFW Home" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/40"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="text-center md:text-left max-w-xl">
                  <span className="bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block shadow-md backdrop-blur-xs">
                    Eva Realty One • Powered by eXp Realty
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-md">
                    Exceptional Homes. <br />
                    <span className="text-indigo-400">Expert Guidance.</span>
                  </h1>
                  <p className="mt-6 text-lg text-slate-200 leading-relaxed drop-shadow">
                    Navigating luxury buying, selling, and market valuation across Frisco, Plano, McKinney, Prosper, Allen, Celina, and the greater DFW metroplex[cite: 4].
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                    <button
                      onClick={() => setActiveTab('Listings')}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition duration-200 text-xs uppercase tracking-wider cursor-pointer shadow-lg"
                    >
                      View Listings
                    </button>
                    {onOpenValuation && (
                      <button
                        onClick={onOpenValuation}
                        className="bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-xl transition duration-200 border border-white/30 text-xs uppercase tracking-wider cursor-pointer backdrop-blur-xs"
                      >
                        Get Valuation
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-2xl bg-slate-800">
                    <img 
                      src="/profile-dark.png" 
                      alt="Reena Chaudhary" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Stats Bar */}
          <div className="border-y border-slate-200/80 bg-white py-8 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="p-2">
                  <div className="text-3xl font-extrabold text-slate-900">DFW Metro</div>
                  <div className="text-xs text-indigo-600 uppercase tracking-widest font-bold mt-1.5">Coverage Area</div>
                </div>
                <div className="p-2 border-l border-slate-100">
                  <div className="text-3xl font-extrabold text-slate-900">Dedicated</div>
                  <div className="text-xs text-indigo-600 uppercase tracking-widest font-bold mt-1.5">Client Focus</div>
                </div>
                <div className="p-2 border-l border-slate-100">
                  <div className="text-3xl font-extrabold text-slate-900">eXp Realty</div>
                  <div className="text-xs text-indigo-600 uppercase tracking-widest font-bold mt-1.5">Global Network</div>
                </div>
                <div className="p-2 border-l border-slate-100">
                  <div className="text-3xl font-extrabold text-slate-900">5-Star</div>
                  <div className="text-xs text-indigo-600 uppercase tracking-widest font-bold mt-1.5">Rated Service</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Introduction / Advisor Teaser */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
            <div className="bg-white rounded-3xl border-4 border-indigo-200 p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-3 inline-block">
                  Eva Realty One Advisory
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  A seamless real estate experience tailored to your goals.
                </h3>
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  Whether you are buying your dream family home, selling a luxury property through Eva Realty One, or looking for accurate investment valuations backed by eXp Realty, Reena Chaudhary delivers uncompromised expertise[cite: 4].
                </p>
              </div>
              <button
                onClick={() => setActiveTab('About Us')}
                className="bg-slate-900 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl transition duration-200 text-xs uppercase tracking-wider cursor-pointer shadow-sm flex-shrink-0"
              >
                About Us &rarr;
              </button>
            </div>
          </div>

          {/* 4. Prime DFW Communities */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-3 inline-block">
                Local Specialization
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Prime DFW Communities</h2>
              <p className="text-slate-600 mt-2 text-base">Deep market knowledge across North Texas's most sought-after neighborhoods.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {[
                { name: 'Frisco', desc: 'Master-planned communities, top schools, and thriving commercial hubs.', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
                { name: 'Plano', desc: 'Established neighborhoods with mature trees and exceptional central convenience.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
                { name: 'McKinney', desc: 'Historic charm paired with modern luxury developments and scenic parks.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
                { name: 'Prosper', desc: 'Exclusive luxury estates offering spacious lots and privacy.', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
                { name: 'Allen', desc: 'Vibrant family-friendly neighborhoods with top-tier amenities and parks.', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80' },
                { name: 'Celina', desc: 'Rapidly growing community blending small-town charm with modern master-plans.', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-lg flex flex-col group hover:shadow-xl transition-shadow">
                  <div className="h-36 overflow-hidden relative bg-slate-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('Listings')}
                      className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                    >
                      Explore properties &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
