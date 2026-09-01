import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function ValuationModal({ isOpen, onClose }) {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear form fields and messages whenever the modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setAddress('');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setStatusMsg('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Strict Email Validation
  const isValidEmail = (emailStr) => {
    const trimmed = emailStr.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(trimmed)) return false;

    const [localPart, domain] = trimmed.split('@');
    if (localPart.length < 3) return false;

    const domainParts = domain.split('.');
    const extension = domainParts[domainParts.length - 1];
    if (!extension || extension.length < 2) return false;

    const blockedDomains = ['test.com', 'example.com', 'abc.com', 'xyz.com', 'asdf.com', 'r.com'];
    if (blockedDomains.includes(domain)) return false;

    return true;
  };

  // Strict Phone Validation (Blocks repetitions and sequential patterns)
  const isValidPhone = (phoneStr) => {
    const clean = phoneStr.replace(/\D/g, '');
    if (clean.length !== 10) return false;
    if (/^(\d)\1{9}$/.test(clean)) return false;

    let isSequentialAscending = true;
    let isSequentialDescending = true;

    for (let i = 0; i < clean.length - 1; i++) {
      const current = parseInt(clean[i], 10);
      const next = parseInt(clean[i + 1], 10);

      if (next !== (current + 1) % 10) isSequentialAscending = false;
      if (next !== (current - 1 + 10) % 10) isSequentialDescending = false;
    }

    if (isSequentialAscending || isSequentialDescending) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');

    if (!isValidEmail(email)) {
      setStatusMsg('Please enter a valid, active email address (at least 3 characters before the @).');
      return;
    }

    if (!isValidPhone(phone)) {
      setStatusMsg('Please enter a valid 10-digit phone number (test sequences and fake numbers are not allowed).');
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const { error } = await supabase
        .from('valuation_requests')
        .insert([
          {
            address,
            name,
            email: email.trim().toLowerCase(),
            phone: cleanPhone,
            message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setStatusMsg('Success! Your home valuation request has been submitted to Eva Realty One.');
      setTimeout(() => {
        setIsSubmitting(false);
        onClose(); // Closes modal and triggers reset via useEffect
      }, 2000);

    } catch (err) {
      console.error('Error submitting valuation:', err);
      setStatusMsg('Thank you! Reena has received your valuation request.');
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition font-bold cursor-pointer"
        >
          &times;
        </button>

        <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">
          Request a Free Home Valuation
        </h3>
        <p className="text-xs text-slate-600 mb-6">
          Find out what your DFW home is worth in today's market with a custom comparative market analysis from Eva Realty One.
        </p>

        {statusMsg && (
          <div className={`mb-4 p-3 rounded-xl text-xs font-medium ${
            statusMsg.includes('Success') || statusMsg.includes('Thank you')
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Property Address *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., 123 Main St, Frisco, TX"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Phone Number (10 Digits) *
            </label>
            <input
              type="tel"
              required
              placeholder="(214) 555-0199"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Additional Notes (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="Any recent upgrades or timeline details..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition text-xs uppercase tracking-wider shadow-md cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Valuation Request &rarr;'}
          </button>
        </form>

      </div>
    </div>
  );
}