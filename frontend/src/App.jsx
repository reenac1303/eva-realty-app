import React, { useState } from 'react';
import HomeLayout from './HomeLayout';
import ListingsPage from './Listings';
import Calculator from './Calculator';
import AboutUs from './AboutUs';
import Admin from './Admin';
import Contact from './Contact';
import Footer from './Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const allListings = [
    { 
      id: 1,
      title: 'Modern Stone Villa', 
      price: '$1,250,000', 
      category: 'Frisco',
      beds: '4 Beds • 3.5 Baths • 3,850 Sq Ft', 
      location: 'Frisco, TX',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2,
      title: 'Suburban Executive Estate', 
      price: '$849,000', 
      category: 'Plano',
      beds: '5 Beds • 4 Baths • 4,120 Sq Ft', 
      location: 'Plano, TX',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3,
      title: 'Luxury Golf Course Home', 
      price: '$975,000', 
      category: 'Prosper',
      beds: '4 Beds • 3 Baths • 3,400 Sq Ft', 
      location: 'Prosper, TX',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 4,
      title: 'Historic Downtown Manor', 
      price: '$725,000', 
      category: 'McKinney',
      beds: '3 Beds • 2.5 Baths • 2,900 Sq Ft', 
      location: 'McKinney, TX',
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 5,
      title: 'Contemporary Urban Retreat', 
      price: '$1,100,000', 
      category: 'Frisco',
      beds: '4 Beds • 4 Baths • 3,600 Sq Ft', 
      location: 'Frisco, TX',
      img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 6,
      title: 'Lakeside Luxury Residence', 
      price: '$1,450,000', 
      category: 'Prosper',
      beds: '5 Beds • 5.5 Baths • 4,800 Sq Ft', 
      location: 'Prosper, TX',
      img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  const filteredListings = selectedFilter === 'All' 
    ? allListings 
    : allListings.filter(item => item.category === selectedFilter);

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-slate-950 flex flex-col justify-between font-sans">
      
      {/* TOP PROMO BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="text-indigo-400 font-semibold">✨ Eva Realty One • eXp Realty:</span> 
        <span>Spring Interest Rate Special & Free Home Valuation Available!</span>
        <button 
          onClick={() => setActiveTab('Contact')} 
          className="text-white underline font-bold cursor-pointer hover:text-indigo-300 ml-1"
        >
          Claim Offer &rarr;
        </button>
      </div>

      {/* NAVIGATION HEADER */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('Home')}>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              RC
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight block leading-tight">Eva Realty One</span>
              <span className="text-xs text-indigo-600 font-semibold uppercase tracking-widest block mt-0.5">at eXp Realty</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
            {['Home', 'Listings', 'Calculator', 'Admin', 'About Us', 'Contact'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`cursor-pointer transition py-2 border-b-2 ${
                  activeTab === tab 
                    ? 'border-indigo-600 text-indigo-600 font-extrabold' 
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT BODY */}
      <main className="flex-grow">
        {activeTab === 'Home' && <HomeLayout activeTab={activeTab} setActiveTab={setActiveTab} />}
        {activeTab === 'Listings' && (
          <ListingsPage 
            setActiveTab={setActiveTab}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            filteredListings={filteredListings}
          />
        )}
        {activeTab === 'Calculator' && <Calculator />}
        {activeTab === 'Admin' && <Admin setActiveTab={setActiveTab} />}
        {activeTab === 'About Us' && <AboutUs setActiveTab={setActiveTab} />}
        {activeTab === 'Contact' && <Contact />}
      </main>

      {/* FOOTER COMPONENT */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}