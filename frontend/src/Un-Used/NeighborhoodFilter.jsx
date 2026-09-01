import React, { useState } from 'react';
import { trackUserActivity } from './analytics';

const NEIGHBORHOODS = [
  { id: 'all', name: 'All Neighborhoods', count: 24 },
  { id: 'downtown', name: 'Downtown', count: 8 },
  { id: 'suburbs', name: 'Greenwood Suburbs', count: 10 },
  { id: 'waterfront', name: 'Waterfront District', count: 6 },
];

export default function NeighborhoodFilter({ onSelectArea }) {
  const [activeNeighborhood, setActiveNeighborhood] = useState('all');

  const handleFilterClick = (neighborhood) => {
    setActiveNeighborhood(neighborhood.id);

    // Track user interest in this neighborhood to Supabase
    trackUserActivity('filter_neighborhood', {
      neighborhood_id: neighborhood.id,
      neighborhood_name: neighborhood.name,
    });

    // Trigger parent callback (opens valuation modal with area pre-filled)
    if (onSelectArea) {
      onSelectArea(neighborhood.name);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      <h3 className="text-lg font-bold text-slate-800 mb-3">Explore Neighborhoods</h3>
      <div className="flex flex-wrap gap-2">
        {NEIGHBORHOODS.map((neighborhood) => {
          const isActive = activeNeighborhood === neighborhood.id;
          return (
            <button
              key={neighborhood.id}
              onClick={() => handleFilterClick(neighborhood)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 shadow-sm ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{neighborhood.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {neighborhood.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}