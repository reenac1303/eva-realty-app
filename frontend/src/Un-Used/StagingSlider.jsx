import React, { useState } from 'react';
import { trackUserActivity } from './analytics';

export default function StagingSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [selectedStyle, setSelectedStyle] = useState('Modern');

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderPosition(value);
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    
    // Log user interest to Supabase via analytics helper
    trackUserActivity('interacted_with_staging_slider', {
      preferred_style: style,
      slider_position: sliderPosition,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl bg-white p-6 shadow-sm my-8 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Virtual Staging Preview</h3>
      <p className="text-sm text-slate-500 mb-4">
        Slide to compare an empty room versus a virtually staged space.
      </p>

      {/* Before/After Image Comparison Container */}
      <div className="relative w-full h-80 overflow-hidden rounded-lg select-none">
        {/* After / Staged Image (Background) */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
          alt="Staged Home"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before / Empty Image (Foreground) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
            alt="Empty Home"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Slider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-md cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 font-bold text-xs">
            ↔
          </div>
        </div>

        {/* Range Input over the box */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
        />
      </div>

      {/* Style Selector Buttons */}
      <div className="mt-6 flex flex-wrap gap-2 items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Choose Staging Style:</span>
        <div className="flex gap-2">
          {['Modern', 'Minimalist', 'Luxury'].map((style) => (
            <button
              key={style}
              onClick={() => handleStyleSelect(style)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedStyle === style
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}