 import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Live rotating ticker messages for urgency and high-end feel
  const announcements = [
    "🔥 Special Offer: Reduced listing commissions across Frisco, Plano, McKinney, and Prosper!",
    "📈 DFW Market Update: Spring buyer demand is peaking—lock in your home valuation today.",
    "⭐ Rated 5-Star DFW Real Estate Advisor — Dedicated to exceptional client results."
  ];
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Live Running Ad / Announcement Ticker */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white rounded-2xl py-3 px-6 mb-10 shadow-md flex items-center justify-between overflow-hidden border border-indigo-500/30">
        <div className="flex items-center gap-3">
          <span className="bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full animate-pulse">
            Live Update
          </span>
          <p className="text-xs sm:text-sm font-bold tracking-wide transition-all duration-500">
            {announcements[currentAdIndex]}
          </p>
        </div>
        <span className="hidden md:block text-indigo-300 text-xs font-semibold uppercase tracking-widest">
          Limited Time DFW Offer
        </span>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Info & Trust Badges */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border-4 border-indigo-200 p-8 shadow-xl space-y-6">
            <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] inline-block">
              Get in Touch
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Let's Discuss Your Real Estate Goals.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Whether you are listing your property with <strong>Eva Realty One</strong> or searching for your next luxury home in North Texas, Reena Chaudhary is ready to deliver.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">🏢</div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold uppercase">Brokerage Affiliation</span>
                  <span className="font-bold text-slate-900">Eva Realty One | eXp Realty</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">📍</div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold uppercase">Service Area</span>
                  <span className="font-bold text-slate-900">Frisco, Plano, McKinney, Prosper & DFW</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">⚡</div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold uppercase">Response Time</span>
                  <span className="font-bold text-slate-900">Within 2 Hours Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border-4 border-indigo-200 p-8 sm:p-10 shadow-xl">
            <div className="mb-8">
              <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-semibold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full inline-block mb-3">
                Secure Inquiry Form
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Send a Direct Message</h3>
              <p className="text-slate-500 text-xs mt-1">Fill out the details below and Reena Chaudhary will reach out directly.</p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <h4 className="font-bold text-lg">Thank You! Message Received.</h4>
                <p className="text-xs">Reena Chaudhary from Eva Realty One has received your inquiry and will contact you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl cursor-pointer hover:bg-emerald-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="(214) 555-0199" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Message or Inquiry Details *</label>
                  <textarea 
                    rows="4" 
                    required
                    placeholder="I am looking to buy a home in Frisco..." 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl transition duration-200 cursor-pointer shadow-md"
                >
                  Send Message &rarr;
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}