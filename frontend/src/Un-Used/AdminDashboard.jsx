import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [activeTableTab, setActiveTableTab] = useState('lead_activity');
  const [leadActivityList, setLeadActivityList] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [leadsList, setLeadsList] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [dbNotice, setDbNotice] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'EvaRealty2026!') {
      setIsAuthenticated(true);
      setAuthError('');
      fetchAllTables();
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const fetchAllTables = async () => {
    setLoading(true);
    setDbNotice('');
    try {
      const { data: actData, error: actErr } = await supabase
        .from('lead_activity')
        .select('*')
        .order('created_at', { ascending: false });

      if (actErr) {
        console.error('lead_activity error:', actErr);
      } else {
        setLeadActivityList(actData || []);
      }

      const { data: clientData, error: clientErr } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (clientErr) {
        console.error('clients error:', clientErr);
      } else {
        setClientsList(clientData || []);
      }

      const { data: leadData, error: leadErr } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadErr) {
        console.error('leads error:', leadErr);
      } else {
        setLeadsList(leadData || []);
      }

    } catch (err) {
      console.error('Unexpected error fetching tables:', err);
      setDbNotice('Failed to connect to Supabase tables.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 bg-slate-50 min-h-[70vh] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 w-full">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xl mx-auto mb-3 shadow-md">
              ERO
            </div>
            <h2 className="text-xl font-black text-slate-900">Admin Portal</h2>
            <p className="text-xs text-slate-600 mt-1">Enter your secure password to view records for Eva Realty One.</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition text-xs uppercase tracking-wider shadow-md cursor-pointer"
            >
              Access Dashboard &rarr;
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Eva Realty One Leads & Client Portal</h1>
          <p className="text-xs text-slate-600 mt-1">Manage database records, tracking activity, and active client portfolios.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllTables}
            className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer shadow-sm"
          >
            Refresh Data
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer border border-rose-200"
          >
            Lock Admin
          </button>
        </div>
      </div>

      {dbNotice && (
        <div className="mb-4 p-3 rounded-xl text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
          ⚠️ {dbNotice}
        </div>
      )}

      {/* DISTINCT TABLE SUB-TABS */}
      <div className="flex flex-wrap gap-2.5 mb-5">
        <button
          onClick={() => setActiveTableTab('lead_activity')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'lead_activity' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>Lead Activity Log</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTableTab === 'lead_activity' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
            {leadActivityList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTableTab('clients')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'clients' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>Converted Clients</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTableTab === 'clients' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
            {clientsList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTableTab('leads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'leads' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>Leads Registry</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTableTab === 'leads' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
            {leadsList.length}
          </span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold animate-pulse">Loading table records from Supabase...</div>
        </div>
      ) : activeTableTab === 'lead_activity' ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Table: lead_activity ({leadActivityList.length} tracking records loaded)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/70 border-b border-slate-200 uppercase font-extrabold text-slate-500 tracking-wider text-[10px]">
                <tr>
                  <th className="px-3 py-2">Timestamp</th>
                  <th className="px-3 py-2">Action Type</th>
                  <th className="px-3 py-2">Visitor / Contact Info</th>
                  <th className="px-3 py-2">Details / Message</th>
                  <th className="px-3 py-2">Auto Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {leadActivityList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-3 py-8 text-center text-slate-400 font-medium">
                      No activity logs recorded yet.
                    </td>
                  </tr>
                ) : (
                  leadActivityList.map((row, idx) => {
                    const meta = row.metadata || {};
                    const name = meta.name || meta.full_name || 'Anonymous Visitor';
                    const email = meta.email || '—';
                    const phone = meta.phone || '—';
                    const msg = meta.message || meta.notes || (typeof meta === 'object' ? JSON.stringify(meta) : meta);
                    const isFormSubmission = row.action_type === 'contact_form_submission' || row.action_type === 'valuation_request';

                    return (
                      <tr key={row.id || idx} className="hover:bg-slate-50/80 transition">
                        <td className="px-3 py-1.5 text-slate-500 whitespace-nowrap text-[11px]">
                          {row.created_at ? new Date(row.created_at).toLocaleString() : '—'}
                        </td>
                        <td className="px-3 py-1.5 whitespace-nowrap">
                          <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-indigo-200">
                            {row.action_type || 'Activity'}
                          </span>
                        </td>
                        <td className="px-3 py-1.5 leading-snug">
                          <div className="font-bold text-slate-900 text-[11px]">{name}</div>
                          <div className="text-blue-600 underline text-[10px]">{email}</div>
                          <div className="text-slate-500 text-[10px]">{phone}</div>
                        </td>
                        <td className="px-3 py-1.5 text-slate-600 max-w-xs truncate text-[11px]">
                          {msg}
                        </td>
                        <td className="px-3 py-1.5 whitespace-nowrap">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            isFormSubmission 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {isFormSubmission ? 'Verified Lead' : 'Site Activity'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTableTab === 'clients' ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Table: clients ({clientsList.length} records loaded)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/70 border-b border-slate-200 uppercase font-extrabold text-slate-500 tracking-wider text-[10px]">
                <tr>
                  <th className="px-3 py-2">Date Added</th>
                  <th className="px-3 py-2">Client Name</th>
                  <th className="px-3 py-2">Contact Details</th>
                  <th className="px-3 py-2">Client Type</th>
                  <th className="px-3 py-2">Notes</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {clientsList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-3 py-8 text-center text-slate-400 font-medium">
                      No converted clients stored in this table yet.
                    </td>
                  </tr>
                ) : (
                  clientsList.map((row, idx) => (
                    <tr key={row.id || idx} className="hover:bg-slate-50/80 transition">
                      <td className="px-3 py-1.5 text-slate-500 whitespace-nowrap text-[11px]">
                        {row.created_at ? new Date(row.created_at).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-3 py-1.5 font-bold text-slate-900 text-[11px]">{row.name || '—'}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap leading-snug">
                        <div className="text-blue-600 font-semibold underline text-[10px]">{row.email || '—'}</div>
                        <div className="text-slate-500 text-[10px]">{row.phone || '—'}</div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-purple-200">
                          {row.type || 'Buyer/Seller'}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-slate-600 max-w-xs truncate text-[11px]">{row.notes || '—'}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                          Active Client
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Table: leads ({leadsList.length} records loaded)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/70 border-b border-slate-200 uppercase font-extrabold text-slate-500 tracking-wider text-[10px]">
                <tr>
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Full Name</th>
                  <th className="px-3 py-2">Contact Info</th>
                  <th className="px-3 py-2">Source Feature</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {leadsList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-3 py-8 text-center text-slate-400 font-medium">
                      No rows found in leads table.
                    </td>
                  </tr>
                ) : (
                  leadsList.map((row, idx) => (
                    <tr key={row.id || idx} className="hover:bg-slate-50/80 transition">
                      <td className="px-3 py-1.5 text-slate-900 font-bold whitespace-nowrap text-[11px]">
                        #{row.id || idx + 1}
                      </td>
                      <td className="px-3 py-1.5 text-slate-500 whitespace-nowrap text-[11px]">
                        {row.created_at ? new Date(row.created_at).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-3 py-1.5 font-bold text-slate-900 text-[11px]">{row.full_name || '—'}</td>
                      <td className="px-3 py-1.5 whitespace-nowrap leading-snug">
                        <div className="text-blue-600 font-semibold underline text-[10px]">{row.email || '—'}</div>
                        <div className="text-slate-500 text-[10px]">{row.phone || '—'}</div>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                          {row.source_feature || 'General'}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                          {row.lead_status || 'New'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}