import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function PropertyValuationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [sqft, setSqft] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(null);

  if (!isOpen) return null;

  const handleCalculate = (e) => {
    e.preventDefault();
    const baseValue = Number(sqft) * 250 + Number(bedrooms) * 15000;
    setEstimatedValue(baseValue);
    setStep(2);
  };

  const handleSaveLead = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Insert or update lead
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .upsert(
          {
            email,
            full_name: name,
            phone,
            lead_status: 'hot',
            source_feature: 'property_valuation_modal',
            estimated_property_value: estimatedValue,
            property_details: { address, sqft: Number(sqft), bedrooms: Number(bedrooms) },
          },
          { onConflict: 'email' }
        )
        .select()
        .single();

      if (leadError) throw leadError;

      // 2. Log activity
      if (leadData) {
        await supabase.from('lead_activity').insert({
          lead_id: leadData.id,
          action_type: 'submitted_valuation_form',
          metadata: { estimatedValue, address },
        });
      }

      alert('Valuation saved successfully! An expert will reach out soon.');
      onClose();
    } catch (error) {
      console.error('Error saving lead:', error.message);
      alert('Failed to save information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Instant Property Valuation</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, State"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Square Footage</label>
                <input
                  type="number"
                  required
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  placeholder="2000"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                >
                  <option value="1">1 Bed</option>
                  <option value="2">2 Beds</option>
                  <option value="3">3 Beds</option>
                  <option value="4">4+ Beds</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 transition"
            >
              Calculate Value
            </button>
          </form>
        ) : (
          <form onSubmit={handleSaveLead} className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">Estimated Property Value</p>
              <p className="text-3xl font-bold text-blue-900">
                ${estimatedValue?.toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Enter your details to unlock the full valuation report and connect with our team.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 transition"
            >
              {loading ? 'Saving...' : 'Get Full Report & Save'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}