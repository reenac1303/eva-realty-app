import React from 'react';

export default function ListingsPage({ setActiveTab, selectedFilter, setSelectedFilter, filteredListings }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-3 inline-block shadow-xs">
          Eva Realty One • Curated Portfolio
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Featured Properties</h1>
        <p className="text-slate-600 mt-3 text-base">
          Explore exclusive residential opportunities across Frisco, Plano, McKinney, Prosper, and the DFW metroplex powered by eXp Realty.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {['All', 'Frisco', 'Plano', 'McKinney', 'Prosper'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer shadow-xs ${
              selectedFilter === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {filteredListings.map((property) => (
          <div key={property.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="h-60 overflow-hidden relative bg-slate-100">
              <img src={property.img} alt={property.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
                {property.price}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{property.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{property.beds}</p>
                <p className="text-xs font-semibold text-indigo-600 mt-1.5">{property.location}</p>
              </div>
              <button 
                onClick={() => setActiveTab('Contact')}
                className="mt-6 w-full bg-slate-900 hover:bg-indigo-600 text-white text-xs uppercase font-semibold tracking-wider py-3.5 rounded-xl transition duration-200 cursor-pointer shadow-xs"
              >
                Request Tour
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}